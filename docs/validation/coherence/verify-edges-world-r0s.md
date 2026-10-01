# Verify — edge cases and combinations across the physical world (coherence/verify-edges-world-r0s)

> PROGRESS (kill-safe ledger): DONE — catalogue, §5 and every member's edge section read; homes read; extremes and
> same-unit combinations walked; 21 issues written (1 blocker, 16 major, 4 minor); result saved to
> `docs/validation/coherence/results/coherence_verify-edges-world-r0s.json`. Design files untouched.

Members: model, kernel, pipeline, rendering, V01, V02, V03, V04, V05, V07 — the live text after assemble-r0
(`docs/ARCHITECTURE.md`, `docs/volumes/V0[1-5,7]-*.md`).

## Method

* Read the catalogue's head, method and owner-named combinations (`edges.md`), and the machine twin (`edges.json`) for
  the ten members: 1 483 member edges (822 of them UNDEFINED or UNTESTED at the catalogue) and 617 combinations owned by
  a member (222 UNDEFINED, 395 DEFINED "to confirm"); the canon's per-unit edge routing and its dated rulings for items
  114–119; and every member's rewrite report edge section (where each catalogue row was closed).
* Read §5 whole (§5.1's principles and seven tiers, §5.2's two class tables, §5.3's invariant suite, §5.4's report) and
  every member's edge section whole: base §3.11, §4.13 (EP-01 – EP-19 and the combination table), §8.11 (T-ER-01 – 12),
  §9.7 (T-ER-13 – 18), §11.6 (T-ER-19 – 21) and §13.2's B-EDGE registration; V01 §3.18; V02 §3.18; V03 §3.13; V04 §3.11
  (its ladders, UE1 – UE31, UC1 – UC18); V05 §3.23; V07 §3.17.
* Read the CURRENT homes those rows and cells point to, whole subsections: §1.1's ladder, §2.3, §2.7 (walls, the
  support step, the clearance and span rules, retaining walls, deck plots, *At the frame*), §3.2 (9), §4.2 S0 – S3,
  §4.3 (lattice, routes, raised ways), §4.4 (S5a – S5d), §4.6's opening, §4.7 *Levelling* and *Deck plots*, §4.8, §4.9's
  *No land left*, II.7.2, II.7.4 (*Limits*), V01 §3.17, V04 §3.2 (N0 – N8, N11) and the shallow-element rule, V07 §3.8a
  and §3.12a (4); spot-checked the homes of EP-05 – EP-07, EP-13, the pipeline's eight inventory edges (EI-EDGE-PIPE-01 –
  08, closed at J-P53 and their homes), V03's storey-height edges and V05's four inventory edges (closed).
* Walked the physical world at its limits — all water, all cliff, no water, an island town, the steepest ground, the
  smallest thorp, the metropolis cap — and every pair of world features, including the SAME-UNIT pairs the catalogue
  never formed: its combinations pair features of different units only, so pipeline's cliff, steep ground, river,
  coast, harbour, moat, wall, bridge, square, hinterland and oasis were never crossed with each other, nor model's raised
  way, retaining wall and deck plot with each other or with the base's own plots.
* Confirmed the catalogue's DEFINED combinations owned by members against the members' edge tables: 284 have no row
  naming both features and rest on the scan's quote, which is often an unrelated sentence (C-river-sewer and
  C-bridge-sewer quote S0's blueprint; C-river-terraced-ward a test-registry line). Each was triaged against the general
  rules (§5.1 (9), the shallow-element rule, the water and public-ground rules, the hole rules): all hold except the
  river and bridge × sewer pair (VEW-01).
* A mechanical check: every volume test id an edge row cites resolves to a definition row (0 dangling).
* Peers' findings (the other r0s seats' result files) were read first and are not repeated: VV12-09 (C-oasis-tiers),
  VV34-16 (the catacomb meeting a sewer), VV78-08 (V07 §3.17's omitted classes), VRC0S-25 (rendering rung slots),
  VK0-08, VK0-12, VK0-24, VK0-25 / VM-R0S-14, VPC-23, and the F-MISSING findings for items 114–119 (VM-R0S-03, VDC0-04,
  VDC0-07, VRC0S-01/02/04, VPC-01/03, VCS-01/02/03, VV12-02, VV34-02) — the edges of those new mechanisms are theirs to
  write with the parts.

## Issues

### VEW-01 — BLOCKER, EDGE-UNDEFINED, owner V04

* **Claim.** River or bridge × the sewer (the catalogue's C-river-sewer and C-bridge-sewer are marked DEFINED on an unrelated S0 sentence; neither V04 §3.11's UC rows nor U-NET states the case). V04 §3.2 N3 takes as way edges 'every way spine between consecutive junctions' and excludes only `pier` and `ford` ('`pier` and `ford` never carry a sewer'); the `NetworkRule` table makes `bridge` a main class in both presets ('classes.historical | main: through, primary, quay, bridge'; classCost 'bridge 1.0'), so a run may follow a street across a bridge's deck span over a river or canal. N7 then reads h(v) at those knots from the terrain under the water (the carved bed) and lays the invert below it — a cut-and-cover main under a flowing river, which the table itself forbids ('coverMinCm / coverMaxCm | 50 / 800 | cut-and-cover, never mined'). It is likely, not exotic: N3 keeps at most `outfall.maxOutfalls` (historical 3) roots, so when the kept roots lie on one bank the other bank's whole subtree is routed across the bridges. UC8 even expects gratings on decks ('an access's ground point on a bridge deck over water is no candidate (N11 slides it off …)'). No rule bars it and no test catches it (T-V4-1 – T-V4-3, T-V4-64 do not): a silent wrong result.
* **Required change.** V04 §3.2 N3: no way edge lies over a water face — a bridge's deck span, a `bridge`-class way and a pier, mole or quay over water are excluded from the `SewerGraph` (drop `bridge` from `classes.historical`, `classes.navigable` and `classCost`); a run reaching a bank ends at an admitted outfall on its own bank, and a bank whose subtree has no admitted root takes N2's moat or field rung or F-NET's truncate rung (gutters and pits, reported) — never a crossing. Add a V04 §3.11 UC row 'a river or canal (a bridge) × the sewer' with that outcome, rung F-NET, and extend T-V4-3 (or T-V4-80) with '0 sewer edges, knots or gratings over a water face' on a river-town fixture whose kept outfalls lie on one bank.

### VEW-02 — MAJOR, CATALOGUE-GAP, owner pipeline

* **Claim.** The site holds less reachable land than a stage demands — an island town whose island is smaller than the town (FTG-19, §4.2 S3 (13)), a narrow coast, fjord or valley site, the METROPOLIS cap on high relief. S3 (6) chooses t_1,i 'so that nucleus i's nodes with T ≤ t_1,i hold its land A_1,i (exact to one cell)' and S5a chooses t_k so that 'the land of {T ≤ t_k} ∪ the enclosure of stage k − 1 equals the land of stages 1…k from S2 (… exact to one cell)'; neither says what t is when every reachable lattice node is taken. §4.9 already presumes the case ('No land left: where the perimeter meets the frame on every side (or an island town's land is all built)'), and §4.13's frame cell asserts 'the trace stays inside the frame (S3's lattice)', but nothing defines the boundary that then runs along the shore and the frame or margin band, the trace and gates there (a gate's outward arterial 'gate ↔ frame edge' of zero length), the ribbon stage with no land beyond the last wall, or F-BUDGET-STAGE's top-up when 'the level set grows' can grow no further. The catalogue's S3 and S5a E3 rows were marked DEFINED on unrelated sentences.
* **Required change.** §4.2 S3 (6) and §4.4 S5a state the outcome: t is capped at the largest T over the reachable land inside the frame less the margin band; the shortfall is the stage's, reported (`requestedVsBuilt`) and carried to S5d, whose top-up is skipped when no land remains and whose remainder goes to the exact check after S10 and F-SITING; a boundary arc that would meet the margin band follows the band's inner line and is a closed arc for the trace (no wall, no gate; its gate picks fall on the remaining arcs, the reduced N reported as the waterfront reduction is); the extramural stages with no land fold into the last walled stage, as `N = 0` folds them. Add an EP row to §4.13 and a B-EDGE fixture each: an island town on an island of half the stage-1 land, a fjord site, a METROPOLIS at the cap in a narrow valley.

### VEW-03 — MAJOR, CATALOGUE-GAP, owner pipeline

* **Claim.** Gates and the enceinte where a barrier closes the arcs a gate falls on, or every arc (a river loop walled across its neck, a cliff-backed or mesa town, an island town filling its island under the default `open` waterfront). S3 (4)'s gate law and nested picks ignore barrier closure (only a sea or lake shore reduces N; 'a river takes water gates, not this reduction'), and the closure is decided after the picks, at the trace ('The trace walls only the approachable arcs'). So picks can fall on arcs no wall will stand on — T106-1's river loop 'walls only the neck and is sealed' while N₁ gates are picked round the whole contour — and with every arc closed there is no walled stretch at all. Undefined: whether such a gate exists (an unwalled road entry, a water gate, re-picked on a walled arc, or dropped and reported), the enceinte record of a wholly closed stage, how §5.3's rows 'the roads leaving each walled stage equal its gate count' and 'a sealed enclosure only when declared' and F-WALL's 'fewer arterial crossings than N' read it, and an `on_enceinte` castle whose weld vertices fall on an unwalled arc.
* **Required change.** §4.2 S3 (4) and (7) and §4.4 S5a state: the gate picks are made on the arcs the closure leaves approachable (the closure classified on the pick contour before the picks), N reduced to the land law over the walled share of the boundary and reported as the waterfront reduction is; a route that must leave across a closed arc does so through a gate on the nearest walled arc or, where none exists, as a road entry without a gate (`Gate` absent, reported); a stage whose every arc closes records its enceinte with `closure: 'barrier'`, no walled stretch and no main gate, the §5.3 gate-count and sealed rows counting it as declared-sealed; an `on_enceinte` castle on a closed arc is re-sited by F-CASTLE's ladder. Add the EP row and B-EDGE fixtures: a river loop with N₁ = 5, a mesa town, an island town filling its island.

### VEW-04 — MAJOR, CATALOGUE-GAP, owner pipeline

* **Claim.** A wet moat on sloping, high or dry ground (moat × steep slope and moat × no water: same-unit pairs the catalogue never formed). §4.2 S3 (10) carves a city moat 'when the blueprint's `moat` is `inner` or `all` — a channel of the era row's width along the (9) trace' with no test of water or ground, and S5a carves outer moats the same way; the trace is pulled to 'local ridges, slope breaks' (§4.4 S5a (2)), exactly where a wet moat cannot hold water. `WaterBody` has no level field and the water surface is read from the shore's terrain (V04 N7: 'the terrain's height at the shore stands for the water surface'), so a moat whose banks rise and fall has a sloping water surface; T-ER-10 draws 'water at its level', which is then undefined. The castle moat's condition 'when water is within reach' names no cell, and `moat: 'auto'` has no resolution (S0's feature table lists no P(moat)).
* **Required change.** §4.2 S0, S3 (10) and §4.4's outer moats state: `moat: 'auto'`'s resolution (a feature-table row by rung and era); the castle's and the city's moat 'water within reach' as a cell (`moat.waterReachM`) naming the sources a moat may take (river, lake, spring, sea); a wet stretch only where the trace's ground stays within `moat.maxFallCm` of that source's level, every other stretch laid as the dry `ditch` residue S10 (0) already builds for a castle's town side (reported); and the wet moat's level (the source's, one per moat or per stretch between sluices) as the value §8.4, V04 N2/N7 and §2.6's water table read. Add B-EDGE fixtures: a hill town with `moat: 'all'`, an arid town with no river with `moat: 'inner'`.

### VEW-05 — MAJOR, EDGE-UNDEFINED, owner pipeline

* **Claim.** The owner's named combination 'a retaining wall on a cliff edge' is defined only for a shore cliff and a closure arc: §4.7 *Levelling* raises no wall 'along a bank of kind `cliff` or a closure arc of kind `cliff` or `sheer`'. A cliff inside the settlement — S1's `cliff` site primitive or any terrain over the barrier table's cliff threshold (V11 §3.16.1: slope ≥ 60 % over ≥ 6 m) inside a district — is neither, and no stage keeps plots off it (S8, S10 and S11 read no cliff line), although V02 §3.18 (f) relies on 'the massing stays inside `H` (V02 §3.4), which the base's plot model keeps off the cliff face'. Two units levelled at its top and foot then differ by the cliff's height, and the rule covers only one intermediate terrace ('above `stepMaxCm` an intermediate terrace of at least `minTerraceDepthM` and a second wall'), so a step above 2 × `stepMaxCm` has no outcome; nor does a levelled unit's edge against ground that is not a levelled unit (a way corridor at another level, a square, an under-deck strip, a field), since walls are raised only where 'two units' datums differ'.
* **Required change.** §4.7 *Levelling* states: (a) a cliff inside a district (terrain over V11's `cliff` threshold, or an S1 `cliff` feature) is a no-wall line like a cliff bank — no `RetainingWall` on it, plots back onto it at the `cliff` shore setback and S10 cuts none across it (which makes V02 §3.18 (f)'s reading true); (b) a step between two levelled units above 2 × `stepMaxCm` takes as many intermediate terraces as fit at `minTerraceDepthM` inside the two units, else those units are not levelled on that line (skirts and stepped wings, reported); (c) a levelled unit's edge against unlevelled ground takes one wall where the step exceeds `stepMinCm`, or none (state which). Add the cells to §4.13's cliff row and B-EDGE fixtures: a cliff primitive across a district, two plots at a cliff's top and foot.

### VEW-06 — MAJOR, EDGE-UNDEFINED, owner pipeline

* **Claim.** §4.13's combination cell 'cliff or steep slope × a deck plot' states 'no deck host on a cliff bank', but no home produces it: §4.8 lays 'piers as `pier` ways at 12–20 m spacing … on the harbour and on the open coast' with no bank-kind filter, while S1 (7) draws cliff banks on headlands ('headlands to rock and cliff'), and §4.7 *Deck plots* offers plots 'on every built ground-part-0 deck — a bridge …, a pier, a mole or a quay platform' with no cliff clause. B-EDGE runs 'the home's stated outcome', so the cell is either untrue of the generator or untested.
* **Required change.** §4.8's pier and mole rule states the cliff case (no pier or mole rooted on a bank of kind `cliff`; a quay only where the bank class is `quay`), or §4.7 *Deck plots* withholds the offer on a pier or mole rooted on a cliff bank — one home, cited by §4.13's cell — and the B-EDGE cell's fixture is a cliff-headland coast with the harbour-wall rows on.

### VEW-07 — MAJOR, EDGE-UNDEFINED, owner pipeline

* **Claim.** A settlement with no water outfall (the no-water site) has two outcomes. II.7.2 *Depth and fall*: 'A settlement with no outfall (no water body and no frame edge the flow leaves by) drains every run to its lowest frame cell, reported' — which also implies a frame-edge outfall is admitted. V04 §3.2 N2 admits only `into` ∈ {river, sea, lake, canal, ditch}, then moat candidates, then 'one field outfall … beyond the outermost enceinte's outer strip, … the cess field of a dry town'; §5.2's F-NET agrees with V04 ('outfalls: the moat → one cess-field outfall'). A frame outfall is never admitted by V04, and a run drained 'to its lowest frame cell' would cross the whole hinterland.
* **Required change.** II.7.2's sentence reads as V04 §3.2 N2 and F-NET: with no admitted water outfall, a moat outfall at its penalty, else one field outfall (V04 §3.2 N2), reported; a `frame` outfall is never a sewer outfall (or, if the base keeps it, V04 N2 and F-NET admit it with its rung — one rule at both homes). The no-water fixture of T-V4-2 names the case.

### VEW-08 — MAJOR, CATALOGUE-GAP, owner pipeline

* **Claim.** A raised way over the base's own plots and buildings (raised way × S8–S11; same-unit pair, uncatalogued). Only V01 §3.17.3 (2) makes the under-deck strip and its piers a hole ('no plot, block interior, seed or hood pin lies in it'); the base's S8 makes only reservations holes ('a reservation inside a face is a hole', §4.6), and S10's plots and S11's footprints read no strip or pier — while §4.5 S7b (1) already subtracts the strip from capacity. §16 lands raised-way generation at M3a and stage 2 at M5, so from M3a to M5 (and in any run without `@plat/hood`) plots are cut and buildings stand under viaduct decks and over pier footprints, with no soffit or clearance check. The pier's arena is also stated two ways: §4.3 'its supports are footprints on its part' versus §2.7 and §5.3 'its piers footprints on ground part 0'.
* **Required change.** §4.6's S8 hole list adds every committed raised part's under-deck strip and pier footprints (§2.7), as V01 §3.17.3 (2) words it, so S8, S10 and S11 never cut a plot or stand a footprint in them with or without stage 2 (V01 then cites the base); §4.3 reads 'its piers are footprints on ground part 0'. Add a §4.13 cell (a raised way × plots and buildings) and a B-EDGE fixture at M3a: a CITY viaduct with stage 2 unregistered, 0 plots or footprints in a strip.

### VEW-09 — MAJOR, EDGE-UNDEFINED, owner pipeline

* **Claim.** A harbour on a site with a river but no coast. §4.2 S1 (6) defines harbour candidates as 'coast faces with depth ≥ threshold' only, so S3 (2)'s basin has no candidate; V08 §2.6 asks for one ('`deep_harbour` the harbour chance 1 on the site's coast, else on its river') and V08's combination row implies a river admits one ('a harbour record on a site with no coast or river has no admissible site'). The base states no river-harbour outcome and no B-EDGE row; a blueprint `harbour` request on such a site is covered only by §5.1 (7)'s generic omission.
* **Required change.** §4.2 S1 (6) states the candidates on a site without a coast: either a river or lake harbour (a basin on a reach whose width and depth pass the harbour rows, its mouth on the reach, the outfall and mill rules reading it as a basin) or none — the request omitted (tier 6) and reported — and V08 §2.6 (the `deep_harbour` line) and its combination row are aligned to that one rule. Add the B-EDGE fixture: a river-only site with `harbour: 'on'` and with `deep_harbour`.

### VEW-10 — MAJOR, EDGE-UNDEFINED, owner pipeline

* **Claim.** The steepest ground: a way class's slope limit has no home. S5c's legality says 'Slope ≤ class limit', F-ROUTE's third rung 'relax[es] the slope limit one class', and §7.3 (a) 5 reports 'a way now steeper than its class's limit', but S4's lattice cost is 'length × (1 + k_slope · slope²) × …' with no limit, and neither `ways.widths` nor any V11 row holds a per-class grade (V11's `ways.crossing.rampMaxGrade` is the stair-or-ramp threshold at a retaining-wall crossing, V11 §3.24.5, which V01 reads only for stair-stepped lanes). On a mountainous or cliff site S4 lays arterials at any grade, and the relaxation rung relaxes a value that does not exist.
* **Required change.** Name the limit once (a `maxGrade` column per class and rung on `ways.widths`, or `ways.crossing`'s `rampMaxGrade` for cart classes, stated as the routing limit), make S4's lattice treat an edge steeper than the routed class's limit as impassable (or state its pricing), F-ROUTE's rung relax it to the next class's value, and S5c and §7.3 (a) 5 cite the same cell. Add an EP row and a mountainous B-EDGE fixture (arterials within their grade or `unserved`, reported).

### VEW-11 — MAJOR, EDGE-UNDEFINED, owner model

* **Claim.** §2.7's support step clears piers only off ways and water: '(3) a station whose pier would meet a part-0 way's corridor or a water face slides …'. §4.3 says a raised part 'stands no support on a square, a reservation or an oasis's water' and §4.13's cells add 'no support in a wall strip' (wall row) and 'no support … on its grove' (oasis row). The step that places every pier never reads squares, other reservations, wall strips or groves, so a station landing there keeps its pier and the §4.3 / §4.13 outcomes are never produced.
* **Required change.** §2.7's support step (3) lists every obstacle a station slides off — a part-0 way's corridor, a water face, a square or other reservation, a wall strip and an oasis's grove (and a deck face) — with the same slide-or-omit rule; T110-2 gains a viaduct over a square and an aqueduct across a wall strip: 0 piers in either.

### VEW-12 — MAJOR, EDGE-UNDEFINED, owner model

* **Claim.** The longest span over water has no bound. §2.7's support step (3) slides a station off water only 'to the nearest clear position at which both neighbouring spans stay ≤ `raisedWays.structure.slideMaxFactor` × the band's upper bound, else it is omitted and the merged span is `open`'; consecutive stations in a wide river are all omitted, so a viaduct or aqueduct crosses a 200 m river on one clear arch, bounded only by `viaduct.maxSpanM` (600 m, §4.13: 'within `viaduct.maxSpanM`'). The step's own slide bound (masonry 15 m × the factor) shows a span limit is intended; at the limit the rule yields a physically impossible arch (the realism tiebreaker), with no report and no test.
* **Required change.** §2.7's support step states the bound: a merged clear span longer than a new `raisedWays.structure.maxClearSpanM` cell by material (calibratable) drops a generated course (`raised_too_long`, waiting as `raised_too_tall` does, V06 §3.19 (5)) and bends a declared one at its dry run to the nearest course whose crossings fit (item 101 R2) — or states that piers then stand in the water as river piers with cutwaters — one rule, cited by §4.3 and §4.13's river cell; T110-2 gains a viaduct and an aqueduct over a 200 m river.

### VEW-13 — MAJOR, EDGE-UNDEFINED, owner model

* **Claim.** The owner's named combination 'a deck plot on a bridge over a moat' has two outcomes in the base. §4.7 *Deck plots* offers 'on no moat deck at a gate (a gate's approach stays clear; realism tiebreaker)' and §4.13's cell says 'none on a ford, a drawbridge or a gate's moat deck', while §2.7's record rule says only 'A `Bridge` of kind `ford` or `draw`, or with no `deckCm`, offers no deck plot' — so a fixed gate moat bridge offers plots by §2.7. Every generated moat deck stands at a gate (S3 (10): 'one deck at every main gate and at a harbour gate'; the castle gate; S5a's outer moats).
* **Required change.** §2.7's *Deck plots* sentence adds 'nor a moat deck at a gate (§4.7: the gate's approach stays clear)', so the record's rule, §4.7's offer and §4.13's cell agree; T110-5 gains a walled moated fixture with stone moat bridges: 0 deck plots on a gate's moat deck.

### VEW-14 — MAJOR, EDGE-UNDEFINED, owner V01

* **Claim.** V01 §3.17.6 (1) states the moat case against the base: 'A bridge over a moat offers deck plots only by item 246's rule (none on a `ford` or `draw` bridge, none without a `deckCm`); a fixed moat bridge with a deck belongs by this rule (its intramural end …)', i.e. a fixed gate moat bridge carries deck plots owned by a district, while §4.7 and §4.13 offer none on a gate's moat deck — the owner's named combination 'a deck plot on a bridge over a moat'.
* **Required change.** V01 §3.17.6 (1) reads: 'A bridge over a moat offers no deck plots at a gate (§4.7) and otherwise only by item 246's rule; a fixed moat bridge away from a gate (a carve's or a drawn bridge's deck) belongs by this rule …', and T-V1-53's fixture holds a gate's stone moat bridge with 0 deck plots.

### VEW-15 — MAJOR, EDGE-UNDEFINED, owner V02

* **Claim.** V02 §3.18 (f)'s row 'a bridge (over a river or a moat) and a composed building | a deck plot's building by V02 §3.16 …; a ford or a drawbridge carries no deck plot' gives a fixed moat bridge deck-plot buildings, contradicting §4.7 *Deck plots* ('on no moat deck at a gate') and §4.13's cell — the owner's named combination 'a deck plot on a bridge over a moat' — since every generated moat deck stands at a gate.
* **Required change.** V02 §3.18 (f)'s row reads 'a bridge over a river, or over a moat away from a gate, and a composed building | … ; a ford, a drawbridge or a gate's moat deck carries no deck plot (§4.7)', and T-V2-47's deck sub-fixture includes a gate's moat bridge with no deck building.

### VEW-16 — MAJOR, EDGE-UNDEFINED, owner V07

* **Claim.** The owner's named combination 'a retaining wall on a cliff edge' has the opposite outcome at village rungs: V07 §3.17 (b) says 'the house platform's wall stands on the cliff's bank segment', while the base's levelling, whose output V07's platforms publish through ('published as levelled ground through the base's S10/S11 levelling output'), raises none 'along a bank of kind `cliff` or a closure arc of kind `cliff` or `sheer` … — the cliff face holds the ground' and §4.13's cell repeats it. V07 §3.8a (the home) says nothing of cliffs, so the outcome lives only in the edge table, against the base, and T-V7-47 does not test it.
* **Required change.** V07 §3.8a (2) states the cliff case as the base does — no `RetainingWall` on a house platform's edge along a bank of kind `cliff` or a cliff or sheer arc; the platform keeps the cliff setback and the cliff holds the ground — and V07 §3.17 (b)'s row cites it; T-V7-47 gains '0 walls on a cliff bank segment' on a cliff-edge village fixture.

### VEW-17 — MAJOR, EDGE-UNDEFINED, owner determinism

* **Claim.** A way crossing a breached or dismantled wall run (item 114's openings; wall × growth at their limits). §5.3's batch-local row 'walls not crossed by ways except at gates' runs at every rung (§5.1 (10)) and S5c's legality says 'A wall is never crossed except at a gate'; a dismantled run keeps its line ('the old line persists', §4.11's `DeclineOp`). V07 §3.12a (4) (d) has a refounded village's trackers cross a ruined enceinte 'freely at a gate gap or a `breached` or `dismantled` run (item 114's openings)', which that hard row would abort. At TOWN–METROPOLIS nothing says whether an epoch's growth or a drawn way may pass a breach in a decayed wall.
* **Required change.** §5.3's row (and NF-P5) states the openings: a way crosses an enceinte only at a gate, or over a `breached` or `dismantled` run where V07 §3.12a (4) (d) admits it (and at base rungs where the determinism and pipeline editors rule it — state yes or no for an epoch's growth and a drawn way, S5c's legality reading the same); add the fixture pair (a refounded village crossing a breach; a TOWN epoch beside a breached run).

### VEW-18 — MINOR, EDGE-UNDEFINED, owner pipeline

* **Claim.** §4.13's combination table ('Where features meet') gives each cell's outcome and its test (B-EDGE) but no ladder rung, although several cells are failure handling — 'a generated course drops, `raised_too_tall`; a declared one bends', 'a stroke across bends to its last ground vertex', 'steeper not levelled (reported)', 'clipped at the arena's outer ring'. Principle (11) asks each edge for its fallback on §5's ladder; the EP table above it carries a rung column.
* **Required change.** Give each combination cell its rung (e.g. a rung line under each cell, or a rung per column: 'drop / bend — simpler shape; leave out and report' for the raised way, '— (defined)' where the cell is a rule with no failure), as the EP rows do.

### VEW-19 — MINOR, EDGE-UNDEFINED, owner V01

* **Claim.** V01 §3.18 (f)'s combination table has columns 'combination | outcome | test' and no rung, while (e) carries one; cells such as 'steep ground and a terraced ward' ('level 0 unlaid → F-TEMPLATE to `bent-cut`', '(reported)') are ladder outcomes whose rung is not named.
* **Required change.** Add a rung column to V01 §3.18 (f) — the §5 rung for each failure cell (simpler shape, substitute, leave out and report), '—' for a cell that is a rule with no failure.

### VEW-20 — MINOR, EDGE-UNDEFINED, owner V02

* **Claim.** V02 §3.18 (f)'s combination table ('combination | outcome | test') names no rung, while (e) does; cells such as 'a raised way and a composed building …' (the add path clears buildings, a dossier crypt's use relocated) and 'a lock and a composed building' (refused with the lock named) are ladder or refusal outcomes.
* **Required change.** Add a rung column to V02 §3.18 (f), each failure cell naming its §5 rung and each rule cell '—'.

### VEW-21 — MINOR, EDGE-UNDEFINED, owner V07

* **Claim.** V07 §3.17 (b)'s combination table ('combination | defined outcome | test') names no rung, while (a) does; cells such as 'a raised way beside the fair field' ('slides clear … by F-V-FAIR') and 'a dossier removing what an edit pinned' ('the pin lapses …, reported') are ladder outcomes.
* **Required change.** Add a rung column to V07 §3.17 (b), each failure cell naming its rung (F-V-FAIR's, leave out and report, …) and each rule cell '—'.

## Checked and holding

* **The owner's named combinations (world).** *A raised way over a harbour mouth* — §4.3 *Where it may not go* excludes
  the basin and its mouth, a stroke bent to its last ground vertex, named; §4.13's harbour cell; B-EDGE. *A raised way
  under an island's shade* — V05 §3.9 (5)'s re-clearance of every caster an epoch commits under an island, §3.23's
  "item 110 under the island" row, T-V5-31. *A catacomb growing into a sewer* — peer VV34-16. *A settlement that grows
  over a sealed void* (V04's side) — V04 §3.5.7 (d)'s dig draw, V02 §3.18 (f), V07 §3.17 (b). *A deck plot on a bridge
  over a moat* and *a retaining wall on a cliff edge* — defined in §4.7 and §4.13 but contradicted elsewhere (VEW-13 –
  VEW-16) and incomplete for interior cliffs (VEW-05).
* **The smallest thorp.** V07 §3.17 (a): P = 1 runs every stage on `territory.minKm2`; T-ER-15's THORP and empty-site
  fixtures; V02 §3.18 (b)'s village rows; V03's rung-independent plan; the base's stages do not run below TOWN (§5.1 (10)).
* **The metropolis cap.** §3.11's caps (the range invariant at the cap and extreme aspect, a frame that grows no
  further); T-ER-01 at the cap; T-ER-19's export sizes; V04 UE7 E3; V05's at most three islands; V02's cap row; §1.1's
  clamp and the port's refusal above it.
* **The kernel at its limits** (§3.11): every class (no input, one item, caps, degenerate, missing data, every rung,
  every toggle, lifecycle) has its outcome and tier, each a case of §13.1's constructive set; EI-KERNEL-001 – 008 are
  closed at their homes.
* **The pipeline's edge table** (§4.13 EP-01 – EP-19): the homes spot-checked state their outcomes (S5d's floor at 0,
  the grower's single coarse face, S7b's zero-capacity district, S13a's nameless feature, history-first (7), II.7.4's
  *Limits*); the combination cells match §4.3's raised-way rules, §4.7's levelling and deck-plot rules and §2.7's
  frame clauses except where VEW-06, VEW-08 and VEW-11 say otherwise.
* **Rendering** (§8.11, §9.7, §11.6): degenerate marks left out and counted, the light at every rung and over every
  physical feature (T-ER-10), labels and exports over every feature (T-ER-11, T-ER-12), the frame's edge.
* **V01** §3.18: the four whole-class rules and the per-mechanism table carry outcome, rung and test; the combination
  table's outcomes agree with the base's hard-run, frame and levelling rules (rung column: VEW-19).
* **V02** §3.18 and **V03** §3.13: every mechanism row has outcome, rung and test; V03's storey-height edges (E ≤ 0,
  G + (n − 1) × U = 0, a basement under ground wings of different `baseCm`) are stated at V03 §3.3.
* **V04** §3.11: the ladders and UE1 – UE31, UC1 – UC18 carry outcome, rung and test; the water, cliff, frame, deck-plot,
  oasis and terraced-ward meetings hold (the shallow-element rule, UC1's drop at a cliff, UC7's moat, UC9, UC12) — except
  the river and bridge crossing of the sewer (VEW-01).
* **V05** §3.23: every mechanism and combination row carries outcome, rung and test; V05-EDGE-1 – 4 are closed (the lock
  clauses, the landfall on another island's landing, the hand-placed cap).
* **V07** §3.17 (a): every village mechanism at P = 1 to 1 499, its rung and T-V7-60 (the omissions are peer VV78-08's);
  the combinations hold except the cliff wall (VEW-16) and the missing rung column (VEW-21).

## Counts

* Issues: 21 — 1 blocker, 16 major, 4 minor. Kinds: EDGE-UNDEFINED 17, CATALOGUE-GAP 4. Owners: pipeline 10, model 3,
  V01 2, V02 2, V07 2, V04 1, determinism 1.
* By extreme site: all water / island town — VEW-02, VEW-03; all cliff and the steepest ground — VEW-05, VEW-10,
  VEW-04; no water — VEW-04, VEW-07, VEW-09; the smallest thorp and the metropolis cap — hold.
* By combination: the ground × walls and their barrier closure — VEW-03, VEW-04, VEW-17; harbours and decks — VEW-06,
  VEW-09, VEW-13 – VEW-15; raised ways — VEW-08, VEW-11, VEW-12; retaining walls — VEW-05, VEW-16; the underground —
  VEW-01, VEW-07; edge-table form — VEW-18 – VEW-21.
* Catalogue gaps found by walking the mechanisms (same-unit pairs and limits the scan could not form): VEW-02, VEW-03,
  VEW-04, VEW-08.
