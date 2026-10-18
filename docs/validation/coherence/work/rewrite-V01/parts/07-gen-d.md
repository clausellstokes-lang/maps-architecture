### 3.10 The unit run — a close-up with no base under it (II.1 (5), II.6)

A request whose boundary has no committed fabric (`laid` empty) runs the pipeline itself as a **unit** on its own arena:
its own overlay, no other writer on that arena, merged in lineage order (§4.1's unit sense, item 280). Its request carries
no `seam`, `context`, `params` or `closeup` (V01 §2.4): the runner builds each unit district's `DistrictContext` and
`SeamContract` once its partition exists — after S6 from the `HoodRecipe` (standalone), after V01 §3.10.3's step 2 from
the island's unit inputs (sky) — and returns the districts it made in partition order (`NeighbourhoodResult.districts`).
Two callers exist at generation; V01 §3.10.3 (6) names those after it.

#### 3.10.1 The standalone neighbourhood document (`Recipe.product = 'hood'`)

The one-click standalone neighbourhood document (IMPROVEMENTS S6, NG-UX-1). Its recipe is `Recipe.hood` (V01 §2.6).
1. **S0.** Resolve the recipe, drawing on `blueprint.features` (appended after S0's existing draws, §6.1) in this order:
   * **the kind** when absent — `hood.kinds` weights over `DistrictKind` values only: central 0.25, craft 0.25, market
     0.15, temple 0.15, riverbank 0.05 (with a river edge only), docks 0.05 (with a sea or canal edge only), gate 0.05
     (with a wall edge only), shanty 0.05 (only when `intent.wealth ≤ 0.2`); rows a recipe does not admit drop out and the
     rest renormalise. Wealth is the slider's, never a kind: T1's "great houses" card is any kind at `intent.wealth` 0.9
     with `planned` 0.5, its "slum" card `shanty` at wealth 0.1; the title's identity stays item 72's derived one.
   * **the size** — the `size` chip sets `buildings` to about 85, 700 or 1 050 (NG C8's small, medium and large bands);
     else `buildings`; else `areaHa`; else uniform in the kind row's `areaHa` band (defaults 6–20 ha; shanty 4–12). A
     `buildings` target sets `areaHa = buildings × plotArea(band) ÷ 0.62 ÷ 10 000` (0.62, §4.2 S2's dense-core plot
     share).
   * **the fabric** when `auto` (V01 §3.3.5).
   * **the outline** — a drawn polygon as given; a named template as given; `'auto'` **by the fabric** (NG B1: the
     outline belongs to the template; J-V1.42): `bent-cut` → `star`; `ring` → `star_round`; `street` → `street_strip`,
     whose main-street course S0 draws first and S8 then lays as the main spine; `square` → `plaza_frame`; a context row →
     the kind row's `outline` weights (default `star` 0.6, `disc` 0.15, `lozenge` 0.1, `d_shape` 0.1, `spindle` 0.05;
     `crescent` only by request). The rows are V01 §3.10.2's, scaled to the area.
   * **the tags** — `leafy`: greenery 0.9 and court greening × 1.5; `secular`: no landmark anchors and `manorBlockShare` 0
     (NG's two tags).
2. **S1.** The arena's frame: the outline's box + `hood.frameMargin` a side. Flat terrain at datum 0 (NG is flat) unless
   `edges.slope` is given: then S1 lays a plane tilted at `pct` along the bearing plus S0's `rolling` fBm amplitude (§4.2
   S1 (1)), and the hood's relief class reads `hilly` when `pct ≥ 100 × terrace.slopeMin`, else `rolling`, so
   `terraceState` and the base's walls follow; a `pct` outside [0, `hood.hillsideMaxPct`] is clamped, with its one-line
   bend. **Choosing Terraces with no slope** (T1's Terraces card, or `fabric: 'stepped'`) sets `edges.slope` to
   `hood.hillsidePct` falling toward the outward normal of the outline's longest side (for an `auto` outline, the side of
   the outline S0 drew), named in one line ("laid on a hillside falling south, so the terraces have a slope to climb"), so
   the card always lays its contour series and is never bent to organic for want of slope (J-V1.71). With `edges.water`,
   the boundary run of the outline whose outward normal lies within ± `hood.edgeDeg` of the bearing becomes a shore: for a
   `sea` or `canal` body the L0 water face fills the frame beyond it (§4.2 S1 (2)'s routine, a straight base curve along
   the run); for a `river` a channel of the river row's width at the context rung runs along the run, its far bank inside
   the frame. An edge whose bearing no run faces within the tolerance takes the nearest run, named in one line.
3. **S2.** The **virtual host town**: S2's roster for a town of `contextRung`'s target population with the recipe's
   intent (never materialised; its demand per class × band only). The **one-district allocation** — computed by S7b (step
   6), once field pass 1 has given the capacity per band —: with `L_hood` the outline face's built land (area × 0.62) and
   `L_town` the virtual town's plot land (S2's own estimate), each `dispersed` class takes `round(demand_c × L_hood ÷
   L_town × affinity[family(c)] ÷ Σ̄)` (Σ̄ normalising the affinities over the dispersed demand so the total stays
   `L_hood ÷ L_town` of it); households fill the residential capacity by band from field pass 1's shares; `singular` and
   `district-defining` classes enter only through the kind row's `anchors` (a temple hood its church and its priest's
   house; a market hood its market claim and hall; none when `secular` for the religious ones). The hood's population is
   the households' members (reported, and the title's subtitle).
4. **S3-lite.** The outline, from §4.2 S1 (2)'s closed-outline routine with the template row scaled to the area (a drawn
   polygon as given), inserted as the arena's L1 border chain (`border` role, as S3's map border) — its seams type
   `frame`, hard (II.1); `edges.wall` makes the run facing that bearing an open `Enceinte` chain (kind `inner`) whose
   strips S7 cuts (§4.8), typing that run `wall`. **An outline below `4 × eLo²`** (not one block's worth) is scaled up
   about its centroid to that area, and the bend is named in one line ("drawn too small for one block; enlarged to 0.4
   ha") — never refused (item 101 R2). A drawn polygon that is not simple, has fewer than three distinct vertices or zero
   area is repaired by the routine's simplicity clamp (F-OUTLINE, §5.2) and, failing that, replaced by the kind row's
   `auto` outline at the requested area, named in one line.
5. **S6.** One district: the outline face; kind from S0; field pass 1 with `characterOffset = intent.wealth − 0.5` plus
   the kind's offset, the kernels of what exists (anchors' reservations, the water edge) and `ε`; its `FieldBands` cuts
   are the band set's **default cuts** — one cut per band boundary at the cumulative default household shares `c_i` of the
   band set's rows (item 27), mapped linearly by `c → 0.1 + 0.75 c` onto [0.1, 0.85]; the six-band default set keeps its
   authored row 0.12, 0.25, 0.45, 0.62, 0.80 (ours) — a standalone neighbourhood document has no town whose land shares
   could set them, and a rich hood must be rich (J-V1.9).
6. **S7** only with a wall edge; **S7b**: the one-district allocation (3) persisted as the district's `Allocation` (less
   the void part below), its claims (anchors larger than a block, D's green quota) cut by `claimSubFace`, S7c inside it
   (the recipe's fabric, or V01 §3.3.5) with its template land; then **S7b (6) and (7)** as the base runs them, with
   volume 4's forecast (V04 §3.3) at the hood's `contextRung` — after the one-district allocation rather than before it
   as in a town, the hood's demand being its own capacity, and with P7's cap reading the one-district allocation's
   poorest-band households in place of the virtual host town's (J-V1.92). With `Features.sewers` false and the undercity
   `forbid` (step 7), only (6) (d)'s void-dwelling part can allocate: P7's `voidDwellingHouseholds` of the poorest band,
   capped at `forecastSafety` × the forecast, **taken from** the one-district allocation's poorest-band households into the
   underground pseudo-district's `Allocation` (S7b (6) (d)) and placed below by volume 4's T3 F6. The hood's population
   is unchanged; the surface capacity freed is surplus that S10b's reconcile types as yards, greens or vacant plots (§4.7
   S10b), and a household F6 cannot seat goes to T8 (V04 §3.7a), reported; **S8** (V01 §3.4, `axis` anchors or the street
   course, V01 §3.4.8); **S9**; **S10a (i)**; **S9b**; **S10a (ii)–(iii)**; **S10 (0)** lays the margin band along the
   whole border as along a settlement perimeter (§4.5's margin band; a backland strip inside) — so no plot fronts the
   outline, NG's rule that no house faces out of the hood, by construction; **S10–S12b** (the one district in the pool);
   **S12c**; **S13a** (the district's name is the hood's name, its `title` label's text); **S14**.
7. **Layers and history** (J-V1.36 as amended by J-V1.77). `Recipe.product = 'hood'` fixes the layers **through the
   inputs volumes 4 and 5 read**, which the hood's S0 writes — besides S0, only V04 §3.1's hood line reads
   `Recipe.product`:
   * **islands off** — S0 resolves `recipe.layers.islands` to `off` whatever the recipe holds (T1's hood card writes
     `off`; any other value is resolved to it and reported), so V05 §3.2 (1)'s gate fails and S7b (5) makes no allocation
     (a standalone neighbourhood document is neither a city nor a metropolis — the owner's "limited only to cities and
     metropolises");
   * **sewers off** — S0 writes `Features.sewers = false`, so volume 4's U-NET commits nothing (N0), its P1–P4 forecast
     nothing and U-FRONT's sewer-front steps commit nothing — its F6 alone runs, over step 6's void part;
   * **undercity never** — S0 resolves the document's circumstance slice (§7.7 layer 2) with `undercity: 'forbid'`, so
     volume 4's P6 finds none and U-CITY never runs;
   * **the rest of the tail and the one catacomb** are V04 §3.1's hood line (J-V4.105), cited, never restated; the
     decision here is the absence of quarries, the generated vaults and the buried town (J-V1.77);
   * **epochs** are not offered for a standalone neighbourhood document: its time card is absent, and `advance` and a
     skeleton's `history` bend to none with their line (V06 §4.1, J-V6.102; J-V1.36); **raised ways**: none generated (the unit run has no route solver and no water balance), a declared one honoured
     (V01 §3.17.7).
   V04 §3.1's hood line is the matching rule (J-V4.105, T-V4-75). T1's hood card shows no layer toggles.
The standalone neighbourhood document is an ordinary document: every edit, export, undo and the close-up work on it as
on a town.

#### 3.10.2 The standalone outline rows (item 285)

NG 1.2.2's hood outline family, restated in our words and metres (provenance `ref:NG 1.2.2 hood outline (code)`;
`code-neighbourhood.md` §2.1), each drawn on `blueprint.features` and scaled to the area:
* **`star`** (an `area` hood's): `n = 4 + ⌊8 (1 − bell4)⌋` vertices (4–12, mostly 9–12); vertex i at angle `2π (i +
  m3) ÷ n` and radius `hood.starRadiusFloor + (1 − hood.starRadiusFloor) × m3` (the floor ours, keeping the star simple
  for F-OUTLINE); one corner-cutting pass; rotated so its minimum-area box is axis-aligned; stretched to aspect `0.4 +
  0.6 u`; turned by ± 45° (+ at 0.3); the routine's fBm detail is `none` (the star is its own organic shape); its
  simplicity clamp and repair (F-OUTLINE) apply.
* **`star_round`** (a `ring` hood's): as `star` with radius `0.5 + 0.5 × m3`, aspect `1 − 0.6 × bell4` (peaked at 1),
  and a random subset of 3 … n − 1 corners kept sharp by the corner-cutting pass.
* **`street_strip`** (a `street` hood's): the main-street course first — V01 §3.4.3's course law (its segments, jitter
  and corner-cutting passes) over the chord from `−L/2` to `+L/2` at bearing ± 45° (+ at 0.3) plus a centred bell of up
  to ± 45°, its middle control point within `L/2` of the centre; then the strip of width `L × (0.3 + 0.5 × bell4)` round
  it, its vertices jittered, the two end vertices on each side pulled toward the course's ends by an `m3` share; `L` is
  solved so the strip's area is the target.
* **`plaza_frame`** (a `square` hood's): the plaza (V01 §3.4.5, its coin drawn here) at the centre; the outline, at 0.3,
  a jittered rectangle three to four plaza sides wide plus one `eHi`, offset from the plaza; else a star of 4–6 vertices
  (a rectangular plaza) or 4–7 (a round one) at the plaza's radius × `(2 + u)` (round: `(4 + u)`) + `eHi`, one
  corner-cutting pass.

#### 3.10.3 A sky island's districts (J-V1.49)

Inputs: **`skyUnitInput(doc, island)`** (V05 §2.3), the island's unit inputs — the land face, the rim strip, the claims
(the institution's and every landing's reservation), the landings with their `attach` vertices, the river, the sky
`Allocation`, the field, and the context (`districtKind`, `districtHa`, `fabricHint`, `fabricPrior`). This runner is its
one caller. On the generation worker, after the ground's S10 (0), beside the hinterland unit, each island in slot order:
1. **No S1**: SKY already wrote the island's L0 land, water and terrain (V05 §3.8).
2. **The unit's outline** is the land face less the rim strip; the claims are holes. **District partition:** `k =
   skyDistrictCount(the sky allocation's plot land, context.districtHa)` (V01 §3.16), `districtHa` volume 5's (V05
   §2.3; J-V5.45). For k > 1 the outline face is cut by §4.6's bent cut with its stop test replaced by "stop when the
   arena holds k faces, cutting the largest first"; the cuts are `secondary` ways (the island's streets, soft `way` seams
   between its districts). Each district's kind is `context.districtKind` (`sky-island`, or the institution row's on the
   face that receives its claim). An outline face below one district's size (an island whose land is all rim strip and
   claims) makes no district: the run returns `districts` empty and the island's allocation goes to volume 5's
   F-SKY-UNIT, reported.
3. **The field** is the unit inputs' `field` (its raster, mean, density and greenery) — never recomputed from
   `h(S_carried)`; the town's `FieldBands` cuts apply (the island belongs to the town's band set).
4. **S7b split**: the island's allocation divided among its districts in proportion to capacity less each one's template
   land (V01 §3.3.7), its institution claim cut in its face; **S7c** per district, each row's weight × `fabricPrior` when
   the row is `fabricHint`, else × 1 (a prior, never a forced strategy); **S8** with each landing's `attach` vertex a
   gate-ranked portal (+ 2) and each laid crossing site's deck end a bridge portal (+ 1; **Crossing sites** below), each
   of which a seed or a lane must reach — an unreached attach or deck end is a validation failure of F-TEMPLATE, whose
   last rung lays a lane to it; S9, S10a (i), S9b, S10a (ii)–(iii), S10 (0) (a margin band only on land-face runs
   **without** a rim strip; the rim strip itself is never cut and never plotted), S10–S12b in the island's own overlay.
   **Crossing sites** (V05 §3.8 (4), §3.12; §4.2 S1 (5) as item 580 extends it; J-V1.91). An island crossing site
   **qualifies** when both its `deck_end` vertices lie on the boundary of the unit's outline face — both banks border the
   island's built land, neither a claim nor the rim strip. After S7c and before any district's seeds, one L1 batch on the
   island's overlay lays, for each qualifying site in site order (the `Bridge` records' address order), its **span**: its
   own L1 edge between the two deck ends, carrying the structural `deck` role beside `way`, the way `secondary` at 0.9 ×
   the top of the `secondary` class's width band (the mean of `w_tpl`'s range, V01 §3.4.2 (b); no draw, so the span is
   the same whichever district's streams run first). No S4 or S5 runs on an island, so this batch is the way that uses
   the site (§4.2 S1 (5)). Each deck end is then a template portal of kind `bridge` of the district whose face it bounds
   (on a vertex two districts share, the smaller address's), ranked as a `secondary` bridge portal (3 + 1, V01 §3.4.2
   (a)), read by `portal:bridge` and `portal:best`, and — like a landing's attach — a seed or a lane must reach it,
   F-TEMPLATE's last rung laying a lane to it. **After S8 and before S9**, one L1 batch on the island's overlay removes
   the span of every site with a deck end no rung reached (the site stays a `site`, reported as below) and **builds**
   every other span by §4.8's bridge rule — `deckCm` from its two bank elevations by §2.6's datum step (the sampler it
   reads, `levelledGroundCm` on the island's key: the island's own raster there, since S10 has levelled no plot yet — the
   key's dispatch and raster fallback built in W8, item 309) plus the clearance row, `kind` and `piers` as S7 sets them on
   the ground — so S10's deck-plot rule and S11's `DeckContext` (V02 §3.16 (1), (5)) read a built deck. So a street runs
   from one bank over the deck to the other and the site becomes a built `Bridge` with that way, its furniture laid by
   §4.8's bridge rule in the unit's closing L1 batch (the unit run has no S7). Its deck plots, where item 110 (d)'s row
   lays them on the built deck (none on a `ford`), belong to the district V01 §3.17.6 (1) names (on an island neither
   end lies inside the town's outermost enceinte, so `Bridge.deck[0]`'s), and the S7b split above counts the row's
   expected deck capacity in that district's capacity, as S7b (1) does on the ground — the capacity counted for a span
   the after-S8 batch removes, or for a site built as a `ford`, is surplus, typed by §4.7 S10b's reconcile. A site whose
   deck end no rung reaches has its span removed in the after-S8 batch and stays a `site` (a street that reached the
   other end stays, ending at the bank), reported in `requestedVsBuilt` ("the river crossing at {site} left unbridged: no
   street reaches its far bank"); a site that does not qualify stays a `site`, unlaid. The landfall fates of the
   island's bridges and their deck plots are volume 5's (V05 §3.16 (7), §3.22 (6)).
   **Cross-arena pulls**: its S10b reads a class on another arena by the route distance (`skyRoute`, V05 §3.20 (1);
   item 308) and, at generation, reads a ground provider at the block its S10a allocation holds (V05 §3.20 (1), (12)
   (a)), never the pool's placed plots, so its placements are the same whatever the pool's size and interleaving; after
   generation (post-build requests, epochs) it reads both arenas' placed plots (V05 §3.20 (12) (a)).
   **The rim walk** (J-V1.81, J-V1.90): one island-level function plants the rim strip's face (block interior
   `rim_strip`, item 213) as volume 5's rim walk (J-V5.26). **`plantRimWalk(doc, island)`** (`@plat/hood`, V01 §3.16) is
   pure over the committed rim strip — its `rim_strip` face and its inner setback line, the strip's boundary with the
   island's built land — and §4.9's street-tree row, and draws nothing (the trees are instanced at render at the row's
   spacing, §8.10). It writes the island's one `esplanade` `Greenery` on the strip's face and one `street_trees`
   `Greenery` along the inner setback line, its `along` naming the strip with no way (§4.9's rim-walk row, item 313),
   a tree every 10–14 m by the street-tree row, and lays no way on the strip. The pair is keyed by the island's
   derivation unit and the strip (V01 §2.8); the pair the call finds is retired by §6.3's carry-over in the same batch —
   succeeded where the new record's anchor lies within its kind's hysteresis radius, else tombstoned — so after every call
   the island holds exactly one pair, and a call on an unchanged strip rewrites nothing (J-DET-2). **Its callers:** the
   unit run, **once**, after its districts' S12b and before step 5's S12c — at generation and in every run of (6) (a) (a
   raise, New random on the island, a Re-derive); and every event that re-lays the strip (V05 §4.2: a resize, a rim
   reshape), **once** in its commit, after volume 5's island L1 batch and any district re-derivation ((6) (c)). A
   district's S12b — in the unit run or in any scoped re-derivation, a replace close-up's included — never plants the rim
   strip, whose face lies in no district (step 2). A rim strip of zero length (an island with no rim) is planted with no
   pair. Households the unit cannot house go to volume 5's F-SKY-UNIT.
5. The town's S12c and S13a include the island's districts (district names unique town-wide, §9.6). The run returns its
   district ids in partition order (`NeighbourhoodResult.districts`), which SKY-F writes to `SkyIsland.districts` (V05
   §3.12), and its `SeamReport` with `portalsTotal` 0 and `landingsReached` (V01 §3.11 (6)).
6. **After generation** (J-V1.90). The runner has no scoped mode — every run partitions the whole island (step 2) — so
   it runs only where the whole island is laid anew.
   (a) **Callers.** Volume 5's `raiseIsland` — at an epoch by its `sky.islands` participant (V05 §3.15 (5)), and after
   generation by a `convert raiseIsland`, the expansion of T5's `sky` declaration included (V05 §4.2) — and **New random
   on an island** (`regenerate` with the island's scope, `newRandom`; V05 §4.2) run steps 1–5 inside the calling commit,
   on the island's own overlay, where volume 5's sequence for that event calls `skyUnitInput` (V05 §3.12), step 4's
   cross-arena pulls reading both arenas' placed plots. Their draws carry the calling commit's key components — the
   epoch's at an epoch, the island's advanced reroll for New random (§6.1; V01 §3.12) — so a replay reproduces the same
   districts. A Re-derive from SKY, from S7b or from any earlier stage runs the unit run at generation's slot (above).
   Each run belongs to its calling commit, so that event's undo restores the island's districts whole (§7.4). A raise at
   an epoch is priced per event in V06 §6.2 at V05 §6's rows and V01 §6's sky row.
   (b) **Carry-over.** A run over an island that already holds content (New random; a Re-derive) re-derives it as a
   replace close-up re-derives a district (V01 §3.9): §6.3's carry-over; the locked, pinned, assigned, declared and
   dossier-backed entities and V01 §3.5.12's fixed inputs kept, their faces holes in the partition and in the template
   faces (V01 §3.4.1); one the re-drawn outline no longer covers carried or orphaned by §6.3 and listed among the event's
   fates, never silently dropped; the successions in `SeamReport.superseded` (V01 §3.11 (6)). The districts keep their
   derivation unit (the island, stage S6, the partition's face order; V01 §2.8), so a partition that comes out the same
   keeps its districts' lineages. A newly raised island holds nothing, so its run only mints.
   (c) **Faces added or moved at the rim are no unit run.** Each face a growing resize adds, or a rim reshape adds with a
   stretch it moves outward (V05 §4.2), joins the district whose rim stretch is nearest to it (ties by district
   address), after volume 5's operator has moved the rim and re-laid the rim strip, and every district that receives a
   face is re-derived by its own scoped re-derivation from S8 under its committed fabric — §7.3's district scope,
   V01 §3.9's `keep` path with its fixed inputs and carry-over, the district's `Allocation` unchanged (the new capacity is
   surplus, typed by §4.7 S10b's reconcile as yards, greens or vacant plots); `plantRimWalk` re-plants the rim walk whole
   in the same commit (step 4). A resize dilates or erodes the whole rim (V05 §4.2), so a growing resize gives faces to
   every district bordering the rim strip, at most k ≤ 3, and a reshape only to those whose stretch it moves outward;
   the receiving districts re-derive in district-address order inside the one commit, which the event's undo restores
   whole.
   **A shrinking resize, and each stretch a reshape moves inward,** gives no face and re-derives no district but the
   claim's, where volume 5 re-searches the claim (below): volume 5's operator clears and re-cuts the plots the eroded
   rim, the re-laid strip or a re-claimed yard takes (§4.7 S10 (7); V05 §4.2) and cuts each way that crosses the re-laid
   strip line back to it, and `plantRimWalk` then re-plants the walk (step 4). A reshape re-derives only the districts
   that receive faces from a stretch it moved outward, and the claim's district where the claim is re-searched.
   **A re-searched institution claim** (V05 §4.2; J-V5.77). Where the island's institution claim no longer fits the land
   face less the re-laid strip and yards and volume 5 re-searches it inside the district that holds it, that district is
   re-derived by its scoped re-derivation from S8, as above, with **one exception to V01 §3.9's fixed inputs: the island
   institution's use and building are released for the event**. The solver relocates the use to the new claim (its
   `dossier` request for a dossier-backed one, V05 §4.4; the use keeps its address as it moves, §6.3, so its assignment or
   dossier binding follows it), S10b places the institution on the new claim (V05 §3.12) and S11 builds its one building
   there; the old building is demolished, a listed fate, and the old claim's face joins the district's land, the new
   claim a hole (V01 §3.4.1). Every other fixed input holds, and the use is a fixed input again once the event commits. A
   district that both receives faces and holds a re-searched claim is re-derived once, with both; one that receives none
   is re-derived for the claim alone, in the same district-address order.
   **Yards.** The plots a new landing yard covers (V05 §4.2's `placeSkyAccess`), and the plots covered by each yard a
   resize or a reshape re-claims at its re-seated top (V05 §4.2), are likewise re-derived by §7.3's local operator on the
   island's arena. **Order in the one commit:** volume 5's island L1 batch and its plot, yard and way steps (V05 §4.2),
   then the re-derived districts in district-address order, then `plantRimWalk`. The district count is re-read only by a
   unit run, so a resize or a reshape never adds or removes an island district.
At generation the ground is byte-identical to a run without the island (§3.4's isolation); every landing is reached and
the rim strip is untouched (T-V1-21). Item 110 on the island's districts is V01 §3.17.7 (1)–(2): no raised way, the
terrace rule at the island's relief class, no wall on or along the rim (V05 §3.22 (3)–(4)). Volume 5's water on an island
is its own: item 111's oasis, water pull and climate cell do not reach an island's districts (V05's sentence).

#### 3.10.4 An arbitrary outline inside a town

**Seeing** any area at the neighbourhood band — a field cemetery, a quarry, a stretch of suburb — is the outline close-up
(V01 §3.8.9), a view action. **Making** a new neighbourhood inside a town is the `quarter` declaration (§7.1: a
`drawBoundary` with its kind, an `assign`, a name and its `fabric`, item 349, and `terrace`, item 350), which makes a base
district; its fabric is then the declared one, S7c's, or T8's later (V01 §4.2). No unit run.

