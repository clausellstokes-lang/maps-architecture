# Verify — edge cases and combinations across the physical world, round 1 (coherence/verify-edges-world-r1t)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-edges-world-r1t; covered by the
> whole-design retrovalidation (J84).

> PROGRESS (kill-safe ledger)
> - P0 resume check (no output, no LANDED line): fresh start — done
> - P1 brief whole; r0 report and result; assemble-r1 (live sha256 = its "after" column, all 15); canon dated rulings
>   114–125; g items 114–125 read — done
> - P2 VEW-01 … VEW-21 re-checked against the live text — done (19 fixed, VEW-04 and VEW-07 partly)
> - P3 repaired subsections in scope walked for new edge problems — done (7 new)
> - P4 g items 120–125: the parts of this lane's members — done (23 F-MISSING)
> - P5 report, result JSON, LANDED — done. Design files untouched.

Members: model, kernel, pipeline, rendering, V01, V02, V03, V04, V05, V07. Text checked: the live files after assemble-r1,
each equal to assemble-r1's "after" hash — `docs/ARCHITECTURE.md` `137ecc0e…`, V01 `1480993b…`, V02 `a11f04cc…`,
V03 `eda87a1c…`, V04 `47c14477…`, V05 `b5f310b6…`, V07 `02f8dbb4…`. The pre-round text for the diffs is HEAD `3f0e02b2d7b9`'s
(base `484af066…`, the repairs' declared source).

## Method

* **The round-0 findings.** Each of VEW-01 … VEW-21 was re-checked against the current text of every home its required
  change named, whole subsections: V04 §3.2 (N0–N12) and §3.11; II.7.2; §4.2 S0–S3 (S1 (1)–(10), S3 (1)–(13)); §4.3;
  §4.4; §4.6; §4.7 (S10 (0), the class floors, *Levelling and retaining walls*, *Deck plots*); §4.8; §4.13; §2.7 (the
  raised-way support step, the span rule, *Deck plots*, *At the frame*, the condition paragraph); §5.2's F-ROUTE, F-WALL,
  F-CASTLE and F-NET rows; §5.3's wall-crossing row; V01 §3.17.3, §3.17.6 and §3.18; V02 §3.18; V07 §3.8a and §3.17;
  V11 §3.24.5's `ways.crossing`, which the new grade limit reads. Each repair file's disposition was read
  (repair-r1-pipeline, -model, -V01, -V02, -V04, -V07, -V08, -V11; determinism's covers VEW-17 without naming it).
* **The repaired subsections in scope.** Nearly every base subsection was replaced this round, so the walk followed the
  word-level diff of each physical-world subsection (old HEAD text against live) and then read the changed rules whole
  at their limits. Base: §2.3, §2.5, §2.6, §2.7, §3.2, §4.2–§4.9, §4.11, §4.13, II.7.2, §5.3, §8.4, §8.8, §8.11, §9.5,
  §9.7, §11.6. Volumes: V01 §3.18 and §5.4; V02 §3.18; V03 §3.13 and §5.5; V04 §3.2, §3.11 and §5.1's Find; V05 §3.23
  and §5.6; V07 §3.8a, §3.17 and §5.5. The new rules were walked at the extremes (the steepest site, a mesa, an island
  town, the METROPOLIS cap, a dry site) and crossed with one another: the grade limit × closed arcs; wall condition × the
  castle weld; the support step's new obstacles × the clear-span bound × the wall strip; levelling's terraces × the
  datum records; a cliff inside a district × S8; the moat's derived level × its readers; item 116's limit × the
  pyramid's coarsest stop.
* **Owner items 120–125.** The canon's dated rulings (J133–J139) and file g's texts (a)–(k) were read, and each member's
  part was looked up. Item 120: V01 §5.4, V03 §5.5, V04 §5.1 (*Find on Below*), V05 §5.6 and V07 §5.5 carry theirs; the
  model's and rendering's are absent, as the brief expected. Items 121–125 (with 122 (h)–(i)): no member carries a part.
  A term census over the base, V01–V04 and V07 found no `crisis`, damage layer, weather effects, ultra tier or Resolution
  ladder, and `HostContext.week` still read at §4.11 *The clock*, DR42, §13.2 and §14.
* **Peers.** The twelve landed r1t result files were read first (193 issues), so as not to repeat them. Related open
  findings are cross-referenced where they touch this lane's edges: VPC-R1-02, VPC-R1-15, VPC-R1-16, VM-R1T-08,
  VM-R1T-10, VDC1-18, VKr1-02, VV34-r1-08 to -10. The F-MISSING ids are raised for every member the rulings name, as the
  brief requires; some coincide with peers' ids by design (the same id, the same finding).
* **No document checks were run.** This seat writes no design text. Scratch is under
  `scratchpad/coherence/edw1/` (diffs, notes, the result builder).

## Round-0 findings re-checked

| id | owner | verdict | where it stands now |
|---|---|---|---|
| VEW-01 | V04 | **fixed** | V04 §3.2 N2/N3: no edge over a water face (a `Bridge`'s deck span, `bridge`, `pier`, `ford` and `aqueduct` ∞ in `classCost`), banks, fallbacks per bank, the outfall cap keeping each bank's largest root; UC19; T-V4-80 (j). The N2/N3 ordering question is peer VV34-r1-08's. |
| VEW-02 | pipeline | **fixed** | §4.2 S3 (6)'s capped `t_1,i` and the frame arc (inset, walled and gated, its arterial across the margin); §4.4 S5a's capped `t_k` and the folded stage; S5d's top-up skipped without land; EP-20. |
| VEW-03 | pipeline | **fixed** | S3 (4)'s closed-arc reduction; (7)'s land-barrier arcs impassable in a walled stage; (9)'s every-arc-closed stage (no `Enceinte`, unwalled for §5.3); S5a for k ≥ 2; F-CASTLE's re-site; EP-21. Wall grading is peer VPC-R1-02's; the routes' grade at a mesa is VEW-r1-01. |
| VEW-04 | pipeline → model | **partly fixed** | S0's P(moat); S3 (10)'s `moat.waterReachM`, `moat.maxFallCm`, the derived level and the dry `ditch`; S5a's outer moats; S10 (0); EP-22 — all at the pipeline's homes. But §2.6's water table and V04 N7, which S3 (10) names as the level's readers, still read the shore's terrain (re-raised, owner model; V04's part VEW-r1-07). V11's registry rows are peer VPC-R1-15's. |
| VEW-05 | pipeline | **fixed** | §4.7 *Levelling*: a cliff inside a district a hard line; terraces above `stepMaxCm`; a unit against unlevelled ground; EP-24. New gaps it opened: VEW-r1-04 (the terraces' datum), VEW-r1-06 (S8's lanes). |
| VEW-06 | pipeline | **fixed** | §4.8: no pier, mole or breakwater arm rooted on a `cliff` bank; a quay only on a `quay` bank; §4.13's cell and named fixture. |
| VEW-07 | pipeline → V04 | **partly fixed** | II.7.2 now agrees with V04 N2 and F-NET (no frame outfall). Its pointer 'V04's T-V4-2 no-water fixture' dangles: the hand-off was not applied (re-raised, owner V04). Per-bank wording is peer VPC-R1-16's. |
| VEW-08 | pipeline | **fixed** | §4.6: the under-deck strip and pier footprints are S8's holes with or without stage 2 (`raised.stripMarginM` from `hood.constants`, which ships at M1); §4.3 'its supports are footprints on ground part 0'; §4.13's plots row and the M3a fixture. |
| VEW-09 | pipeline | **fixed** | §4.2 S1 (6): the river or lake harbour, else omitted (tier 6) and reported; EP-25; V08 aligned (repair-r1-V08). |
| VEW-10 | pipeline | **fixed** | §4.3 *The class grade limit* (`ways.crossing`'s `rampMaxGrade`, F-ROUTE's slope rung down `through`, `primary`, `track`, `path`, then `unserved`); S5c cites it; EP-23. V11 row 81's readers are peer VPC-R1-15's. |
| VEW-11 | model | **fixed** (text) | §2.7's support step (3) lists every obstacle (corridors incl. decks, water incl. moats and an oasis, squares and reservations, wall strips, groves); the span rule's `clear`. Its T110-2 bar is peer VM-R1T-10's (scope). New combination: VEW-r1-03. |
| VEW-12 | model | **fixed** (text) | §2.7's clear-span bound (`maxClearSpanM`, `raised_too_long`, a declared course bent); V11 holds the cells. §4.3 and §4.13 not yet aligned: peer VM-R1T-08; its test: VM-R1T-10. |
| VEW-13 | model | **fixed** (text) | §2.7: no deck plot on a moat deck whose way is a `Gate.way` (a castle's gate included: its curtain is an `Enceinte` with gates). T110-5: VM-R1T-10. |
| VEW-14 | V01 | **fixed** | V01 §3.17.6 (1), V01 §3.18 (e) and (f); T-V1-53's moated fixture. |
| VEW-15 | V02 | **fixed** | V02 §3.18 (f)'s bridge row; T-V2-47 (V02 §7's deck sub-fixture). |
| VEW-16 | V07 | **fixed** | V07 §3.8a (2) *No wall on a cliff*; V07 §3.17 (b)'s row; T-V7-47. |
| VEW-17 | determinism | **fixed** (text) | §5.3's row: a way crosses only at a gate; a drawn way across a `breached` or `dismantled` run makes its gate; the refounded village's tracker the one exception; NF-P5 declares the crossing removed. Its fixtures in §13.2: peer VDC1-18 (scope). |
| VEW-18 | pipeline | **fixed** | §4.13: every combination cell carries its rung. |
| VEW-19 | V01 | **fixed** | V01 §3.18 (f) has its rung column. |
| VEW-20 | V02 | **fixed** | V02 §3.18 (f) has its rung column. |
| VEW-21 | V07 | **fixed** | V07 §3.17 (b) has its rung column. |

No RULING REQUEST touched any VEW id, and assemble-r1 skipped no block that carried one.

## Issues

### VEW-04 — MAJOR, EDGE-UNDEFINED, owner model

Partly fixed. The pipeline repair now gives the moat one water level, derived from its `flowFrom` source (§4.2 S3 (10): 'the source's surface at its shore point nearest the moat … which every reader of the moat's water reads (§8.4's water at its level, V04 §3.2 N2 and N7, §2.6's water table)'), and carves a wet stretch only where the ground stands 0 to `moat.maxFallCm` (400 cm) above that level. But §2.6's water table, one of the named readers, still reads 'the nearest water body's surface elevation (its shore's terrain sample)'. For a carved moat that sample is the bank top, up to 4 m above the derived level. So two base homes give two values for one water surface. A plot beside a wet moat on a slope reads a water table up to 4 m too high, and its cellar or crypt takes the half-sunk or crawl-space rung where a full one is lawful. That is a silent wrong result at the moat × slope edge EP-22 names. (V04 N7's own wording is VEW-r1-07.)

**Required change.** §2.6, the water-table sentence: 'The water table is the nearest water body's surface elevation — a moat's the one level §4.2 S3 (10) derives from its `flowFrom` source, every other body's shore terrain sample — plus the freeboard …'. Add to EP-22's hill-town fixture (§4.13; B-EDGE): 'a plot within `waterTableM` of a wet moat reads the derived level + `freeboardCm` as its water table'.

### VEW-07 — MINOR, EDGE-UNTESTED, owner V04

Partly fixed. II.7.2 now reads as V04 §3.2 N2 and F-NET: no frame outfall, and a moat outfall, then a field outfall, where no water outfall is admitted. It closes on 'V04's T-V4-2 no-water fixture names the case'. T-V4-2 (V04 §7) is a stage invariant over the seed sets and names no fixture. The pipeline repair's hand-off ('V04: T-V4-2's no-water fixture names the field outfall (VEW-07)') was not applied. So the base points at a test fixture that does not exist. The plain dry site — no river, lake, sea, canal or oasis, and `moat: 'none'` — is tested only indirectly, through T-V4-80 (e)'s oasis town and (j)'s per-bank river towns.

**Required change.** V04 §7, T-V4-2: append 'on a no-water fixture (a TOWN and a CITY with no river, lake, sea, canal or oasis, `moat: 'none'`): every run reaches the one field outfall beyond the outermost enceinte's outer strip, `requestedVsBuilt` naming the cess field, 0 `frame` outfalls'. II.7.2's pointer then resolves as written.

### VEW-r1-01 — MAJOR, EDGE-UNDEFINED, owner pipeline

Two round-1 repairs disagree at the steepest site (VEW-03 × VEW-10). §4.2 S3 (9), *Every arc closed* (a mesa town, an island town filling its island): 'the stage walls nothing … its routes (5), picked by the land law on the whole contour as an unwalled town's are, enter across the barriers'. §4.3's new *class grade limit* makes 'an edge steeper than the routed class's grade limit … impassable to that route'. The steepest limit is `path`'s `rampMaxGrade` of 0.15 (V11 §3.24.5), on a lattice of about 25 m. So any lattice edge across a cliff, sheer or gorge face taller than about 3.75 m is impassable to every class, and F-ROUTE's last rung leaves the destination `unserved`. A mesa girt by such faces therefore gets no route in, against S3 (9)'s 'enter across the barriers'. EP-21 names 'a mesa town' as a B-EDGE fixture but gives no outcome that matches the generator. VPC-R1-02 (the wall grade of cliff-class arcs) is a different gap: its fix still leaves the sheer and gorge case, and any walled cliff-class mesa, to this rule.

**Required change.** §4.2 S3 (9), the *Every arc closed* sentence: replace 'enter across the barriers' with 'enter across the barriers where §4.3's class grade limit admits an edge — a marsh, a cleft or ramp in a cliff, an island town's landings ((13)) — and otherwise take F-ROUTE's last rung (`unserved`, reported; §5.2), so a mesa girt by faces steeper than `path`'s `rampMaxGrade` over one lattice step has no road in at generation and says so'. Write the same outcome into EP-21's mesa fixture: 'every route in within its class grade, or `unserved` reported; 0 routes steeper than `path`'s limit'.

### VEW-r1-02 — BLOCKER, EDGE-UNDEFINED, owner model

An `on_enceinte` castle × item 114's wall condition (walls × the castle at their limits; not in the catalogue). The castle's curtain is its own `Enceinte` of kind `bailey` (§2.7 `Castle.curtain`). Along `Castle.cityWeld` the bailey's outer arc and the town wall are 'one wall carrying both enceintes' `wall` roles' (§2.7; §4.8: 'the shared edge is one wall'). Each `Enceinte` carries its own `condition`, `conditionMaterial` and `conditionEpoch` profiles, and every writer works per enceinte: S7's generation row 'writes each run's `Enceinte.condition` and material' for every enceinte it furnishes, the bailey included (§4.8 *Condition at generation*; DR41: 'the enceintes and their stretches'); V06 §3.7.7 decays and repairs each ring on `stream(EVO_FORT, enceinte)` with its own local weight λ; `DeclineOp`'s `breach`/`dismantle` and `wearWall`/`repairWall` name one enceinte. No text says which profile governs the welded stretch. So the one wall is routinely `breached` on the town's profile and `standing` on the castle's, or patched in two materials. §8.2 then draws a whole wall line over a breach, and §11.1 exports the same edge as a wall and as an opening (a battle map's line of sight through a standing curtain). That is a silent contradictory result at TOWN and above wherever the castle sits on the wall and `walls.condition.atGeneration` is on, and at every epoch.

**Required change.** §2.7, *An enceinte's condition by run*: add 'Along an `on_enceinte` castle's shared stretch (`Castle.cityWeld`) the town enceinte's three profiles are the stretch's one condition, material and epoch: the bailey's profiles there mirror them, written in the same batch by every writer — S7's generation row (one draw for the stretch, on the town enceinte), `DeclineOp`'s `breach` and `dismantle`, `wearWall`, `repairWall` and V06 §3.7.7's transitions, whichever of the two enceintes the op names — and never written apart.' §4.8 *Condition at generation* and V06 §3.7.7 (2)–(3) cite it (V06: the stretch decays and is repaired on the town ring's draws and λ). Add to §13.2's item-114 group a CITY fixture with an `on_enceinte` castle at a vulnerable, poor town's generation shares and over 10 epochs: the welded stretch's two profiles equal at every commit; §8.2 draws one state; §11.1's VTT gives one wall-or-opening answer per edge.

### VEW-r1-03 — MAJOR, EDGE-UNDEFINED, owner model

A raised way crossing a city wall × the round-1 support step (VEW-11 × VEW-12, both repairs). §2.7's support step (3) now makes 'an enceinte's wall strip (`Enceinte.strips`)' an obstacle that no pier may stand in. It also adds the clear-span bound: a merged clear span longer than `raisedWays.structure.maxClearSpanM` (masonry 30 m, timber 20 m; V11 §3.24.2) drops a generated course (`raised_too_long`) and bends a declared one. The only crossings of a wall allowed are 'on a gate's line or as the aqueduct's wall arch' (§4.3 *Where it may not go*; §4.13's wall row: '… no support in a wall strip'). The strips are band 2–3 m + inner setback 6–10 m + outer setback and glacis 10–20 m: 18–33 m (§4.8). With a moat it is band + inner setback + berm + the channel (c14 `era.moatWidthM` 8–16 m, c15 10–18 m), and the intervallum lane or a gate plaza is a further obstacle. So the span over a wall runs about 18–42 m. Every timber viaduct, and a large share of masonry aqueducts and viaducts, that must cross the wall is dropped. Two things then contradict it: §4.3, which carries a generated aqueduct 'crossing the wall through an arch', and V06 §3.7's raised gate, 'a gate whose tower carries the deck' — 'the deck's support' standing in the strip.

**Required change.** §2.7's support step (3): add 'Where the course crosses an enceinte's trace — on a gate's line or as the aqueduct's wall arch (§4.3) — one station stands on the trace: the raised gate's tower (a viaduct or elevated road; V06 §3.7) or the curtain under the aqueduct's arch carries the deck there, its pier the wall's band (no footprint of its own); the strip's setback and glacis parts, the berm and the moat stay clear, and the clear-span bound reads the spans on either side of that station.' §4.13's wall cell reads 'no support in a wall strip but the crossing's station on the band'. V06 §3.7's 'a wall opening under an aqueduct is no support' is amended to match: the opening carries the span, and its stretch is taken as a raised gate's stretch is, after the aqueduct goes. T110-2 gains: a CITY masonry aqueduct across a moated c15 wall with an intervallum, and a timber viaduct on a gate's line — both built, 0 piers in a setback, glacis, berm or moat, every clear span ≤ its bound.

### VEW-r1-04 — MAJOR, EDGE-UNDEFINED, owner pipeline

The intermediate terraces of §4.7 *Levelling and retaining walls* have no record and no datum. The repair (VEW-05) widened the rule: 'A step above `stepMaxCm` takes ⌈step ÷ `stepMaxCm`⌉ − 1 intermediate terraces, each at least `minTerraceDepthM` deep and each edge a wall of at most `stepMaxCm`, laid inside the two units'. The same applies to a levelled unit's edge against unlevelled ground. A levelled unit holds one datum (`Plot.platformCm`, `Block.platformCm`, §2.5), and 'the one reader of levelled heights', `levelledGroundCm`, returns 'the datum of the levelled plot, block or ward holding p'. A terrace laid inside a unit therefore has no height of its own anywhere. On both sides of an intermediate wall `levelledGroundCm` reads the same unit datum, so `stepProfile(wall)` derives a step of 0 for a wall raised to hold up to `stepMaxCm`. A building, V04 knot or shadow on the terrace reads the wrong level. EP-24's fixture 'a step above 2 × `stepMaxCm`' has no stated heights to check.

**Required change.** §4.7 *Levelling*: state that an intermediate terrace splits the unit it is laid in along the contour into two levelling units, each with its own datum (as V07 §3.8a (2) splits a house platform: 'each levelled at its own datum, the footprints split with it by the base's stepped-wing rule'). For a plot, add a stepped datum to §2.5 — `Plot.platformSteps?: { line: ChainRef /* the intermediate wall */; datumCm: Cm }[]`, written by S11's levelling, in the plot's leaf digest; likewise `Block.platformSteps` for S10's — and have `levelledGroundCm` return the datum of the step region holding p. Add to EP-24 / B-EDGE: 'on a step of 2.5 × `stepMaxCm`, `levelledGroundCm` on each terrace equals its datum and every wall's `stepProfile` lies in (`stepMinCm`, `stepMaxCm`]'.

### VEW-r1-05 — MAJOR, EDGE-UNDEFINED, owner rendering

Item 116's zoom-out limit at the METROPOLIS cap. §8.8 defines k_min = max(0, k_fit − `view.zoomOutMarginStops`), with k_fit 'the largest k ≤ 34 with max(the bounds' width, height) ≤ the short side in CSS px × m_k'. The coarsest stop, k = 0, is m_0 ≈ 11.97 m per CSS px. The cap's frame is 17.53 km × 8.76 km (§3.2), so it fits only on a short side of at least ≈ 1 465 CSS px; the METROPOLIS target's 11.31 km needs ≈ 945. On a laptop or desktop window, and always on a phone, no k satisfies the test, so k_fit is undefined, and the max(0, …) clamp does not define it. T-ER-08's bar ('it stops at k_min, where the whole `bounds` fits the short side'), §9.5's *Fit the town* ('frames the whole `bounds` at the limit's stop') and item 116 (e)'s 'at every rung from THORP to the cap the zoom-out limit shows the whole bounds' cannot hold there. Item 116's §12.5 clause ('fewer stops, never more') forbids the obvious repair of adding coarser stops. Item 122 (i)'s widened limit, town plus camps, makes it larger still.

**Required change.** §8.8: state the case. 'Where no stop k ≥ 0 fits — `bounds` wider than the short side × m_0 — k_fit is 0 and k_min is 0: the limit is the pyramid's coarsest stop, the view at it showing as much of `bounds` as fits, centred by §9.5's framing, the view status saying ‘the whole map is wider than this window’.' T-ER-08 and §9.5's *Fit* read 'the whole `bounds`, or stop 0 where it does not fit'. Add a METROPOLIS-cap fixture on a 900 × 1 600 and a 390 × 844 CSS-px viewport to T-ER-08. Because this narrows item 116 (e)'s bar at the cap, record it as a judgment row naming that clause. The alternative — stops below 0 for such maps — must be ruled against item 116's 'fewer stops, never more' before it is written.

### VEW-r1-06 — MAJOR, CATALOGUE-GAP, owner pipeline

A cliff inside a district × S8's bent-cut lanes (and V01's seeds, fans and lanes). The VEW-05 repair made such a cliff — an S1 `cliff` `SiteFeature` or ground over `walls.barriers`' `cliff` threshold — 'a hard line' for S10 and S11 only: no `RetainingWall`, no unit levelled across it, plots ending at the `cliff` setback from top and foot (§4.7). Nothing upstream of S10 reads it. S6 does not split districts or faces at it (§4.5). S8's recursive bent cut has only a slope term that turns the cut axis toward the contours (§4.6), and every intramural lane comes from S8's cuts (§4.4 S5c). So a cut, and the lane laid along it, can run straight down a cliff face that S10 refuses to plot. §4.3's class grade limit governs routed ways only, never S8's lanes. V01's fabrics read only a cliff that is a district's boundary run ('a hard `cliff` run', V01 §3.6 (7); V01 §3.18 (f)), never one inside the face. EP-24 names 'a cliff primitive across a district' but tests only the levelling cell. The outcome is a lane down a cliff, silently.

**Required change.** §4.6 S8, the face preparation, before the first cut: 'each district face is split along every cliff inside it (an S1 `cliff` feature, or ground over `walls.barriers`' `cliff` threshold — §4.7's hard line), the split edge carrying the hard `cliff` role and no way, so no cut, lane, seed or plot crosses it; each side is cut as a face of its own, and V01's fabrics read the edge as V01 §3.6 (7)'s hard `cliff` run'. Point §4.7's *A cliff inside a district* at it. EP-24's 'cliff primitive across a district' fixture adds: '0 lanes, seeds or way spines crossing the cliff line; the two sides' plots backing onto it at the `cliff` setback'.

### VEW-r1-07 — MINOR, EDGE-UNDEFINED, owner V04

V04 §3.2 N7 (1) and N2 do not read the moat level §4.2 S3 (10) now derives. N7 says 'the terrain's height at the shore stands for the water surface, as §2.6's water table reads it, so the mouth sits `outfall.freeboardCm` above the water it discharges into'. The base, after its VEW-04 repair, says the moat's water level is one derived value — the `flowFrom` source's shore height — 'which every reader of the moat's water reads (… V04 §3.2 N2 and N7 …)', and the moat's banks stand up to `moat.maxFallCm` (400 cm) above it. On a moat outfall (N2's per-bank fallback) N7 therefore puts the mouth's floor up to 4 m above the moat's water, and the 'mouth sits `freeboardCm` above the water' rule (T-V4-2's 'every outfall invert ≥ the shore height + `freeboardCm`') is checked against the bank, not the water.

**Required change.** V04 §3.2 N7 (1): 'Each outfall knot's floor is `low = s + freeboardCm`, `s` the receiving water's surface as §2.6's water table reads it — a moat's the derived level of §4.2 S3 (10), every other body's terrain height at the shore'. T-V4-2's outfall clause reads the same `s`; T-V4-80 (j)'s walled-core-in-a-wet-moat fixture adds a moat on sloping ground.

### G120-model — MAJOR, F-MISSING, owner model

Item 120 (Find; J133) names model §2.9: 'the per-viewer view key `find` — chips and the gaps switch — outside the document, its hash and the log; kept in view pins'. The live §2.9 has no `find` key. The base mentions item 120 nowhere, while V01 §5.4, V03 §5.5, V04 §5.1, V05 §5.6 and V07 §5.5 all cite '§2.9's per-viewer view key `find`'.

**Required change.** §2.9's view state: declare `find?: { chips: FindChip[]; showGaps: boolean }` (a chip: its kind, class, area, place or person target, colour index and glyph). It is per viewer, never in the document, its hash or the log. It is kept across zoom, band, layer, season, epoch and edit (item 120 (a)), persisted only in view pins, and ended only by Clear or closing the panel. Undo and redo never touch it; migration reads an absent key as no chips. A chip whose target the document no longer holds stays at count 0, dark (the volumes' rule).

### G120-rendering — MAJOR, F-MISSING, owner rendering

Item 120 (J133) names rendering's parts: §8.2 (the veil, halo, outline, pin and count-bubble rows, and each chip's colour and second cue), §9.5 (Find among the tools), §11.1 (picture exports draw Find as shown, chips in the legend; battle maps off unless asked), §11.2 (the gazetteer's class counts and its match listing by class, area and layer under knowledge admission) and §12.5 (suggestions ≈ 50 ms, glow ≈ 100 ms, base tiles never re-rendered). None is in the live base, yet the five volume parts cite them ('§8.2's veil, halo, outline, pin and count-bubble rows', '§11.2's match listing').

**Required change.** Write each at its home at build depth, from item 120 (a)–(k). §8.2: the veil (paper colour at α 0.55), the halo (an ≈ 8 px glow in the chip's colour inside a 2 px outline, labels kept above the veil), an area's lift, the pin for a match under ≈ 6 px at the city band, count bubbles merging pins closer than ≈ 24 px, ghost pins for other layers, Show gaps' dashed 'none here' outline, eight chip colours then glyphs, item 112's second cues. §9.5: the tool. §11.1: export rules. §11.2: `query({ kind: 'gazetteer' })`'s class counts and match listing by class, area and layer under admission. §12.5: the two interaction budgets, the overlay-only redraw and the per-commit index. Write the edges as T-ER rows: no chip; a match under 6 px at the city band and at item 116's limit; the METROPOLIS cap; the halo at the device pixel ratio under item 121; above item 124's effects layer.

### G121-rendering — MAJOR, F-MISSING, owner rendering

Item 121 (the resolution adjuster; J134) names rendering's §8.8, §8.4 (g), §12.1, §12.5 and §12.8. None is in the live base: no Resolution ladder, no steps below 1, no ultra tier, no 4K live-view ceiling, no live Auto loop.

**Required change.** §8.8: the setting's ladder 3 · 2 · 1.5 · 1 · 0.75 · 0.5 (the two steps below 1 drawn under CSS density and scaled up); a manual level's tile DPR = min(the device ratio, the level's height ÷ the screen's CSS height), rounded down the ladder; the 4K live-view ceiling (≈ 8.3 M device px; larger screens drawn at the 4K-equivalent DPR and scaled); the ultra tier (512 MB, DPR cap 3); the live Auto loop (p95 over the frame budget for 2 s → one rung down; under 60 % for 10 s with the canvas fitting → one up; applied only at settle, at most once per 10 s; a device-pixel-ratio change re-evaluates). §8.4 (g): Auto's give-up order, with labels, text, chrome and every overlay always at the device ratio. §12.1: calibration picks ultra. §12.5: the budgets the loop holds. §12.8: memory per tier. Edges and their tests: a manual level the device cannot hold (the nearest that fits, said — never a refusal); a 5K–8K screen; a monitor change mid-gesture (applied at settle); exports byte-identical across settings.

### G122-model — MAJOR, F-MISSING, owner model

Item 122 (crisis looks; J135) names model §2.7: '`ConditionOverlay` read for the look; nothing added to the model'. §2.7's `ConditionOverlay` names no crisis-look reader. Its readers are still item 67's Works share only.

**Required change.** §2.7 `ConditionOverlay`: its readers gain the crisis look. It is drawn while the view's week (item 117's year position) lies in [sinceWeek, untilWeek], by §7.7's look row and §10.2's table, with no field added and nothing written. State the edges: a condition with no `untilWeek` (shown until its status ends); a week outside every window (no look); the hash identical with crises on and off.

### G122-pipeline — MAJOR, F-MISSING, owner pipeline

Item 122 (J135) names pipeline §10.2: the crisis look table — kinds by archetype, scale by severity and tier, placement rules and priorities, the density cap. §10.2 has none of it.

**Required change.** §10.2: the closed table — every SettlementForge stressor type and condition archetype → a look kind or 'no look' (item 122 (b)'s defaults: siege camps beyond bowshot ≈ 300 m with trenches, engines facing the gates or the weakest stretch by item 114's condition, burned farmsteads, blockade camps on an unwalled place's approach roads; a refugee camp on common or fallow land by a gate on the main approach road, at V06's growth frontier; a fenced quarantine camp outside; famine's bare fields over item 117's crop stage; disaster whole neighbourhoods by severity — fire downwind through contiguous blocks, flood on the low ground by water, earthquake scattered — the calamity's `targets` winning; occupation, rebellion, boom, bust; the regional_* rows 'no look'). Placement is keyed (seed, condition id, place). Priorities: siege, then quarantine, then refugees, under the density cap. Never on water, a gate's passage or a label's keep-out. Edges at their limits: no outskirts land left in the frame and margin; an island town; THORP to the METROPOLIS cap; two crises at once; a condition with no severity.

### G122-rendering — MAJOR, F-MISSING, owner rendering

Item 122 (J135) names rendering §8.2 (the look rows by tier and band; second cues), §11 (pictures draw them; battle maps image only) and §12.5 (lazy per-tile budget). None is in the live base.

**Required change.** §8.2: the crisis look rows by band — city: camp clusters, the siege line, smoke, the ruined neighbourhoods' tone; district: engines, tents, fences; neighbourhood: marked doors, rubble, detail — with item 112's second cues and the Show crises switch. §11.1: picture exports draw the looks; battle maps draw them in the image only, never as walls or obstacles. §12.5: drawn lazily per visible tile. T-ER rows: no condition and no preview (byte-identical tiles); a condition the key withholds (not drawn); every week of a condition's window and none outside it.

### G122-V01 — MAJOR, F-MISSING, owner V01

Item 122 (J135) names V01: neighbourhoods as disaster targets, and the outskirts' common land. V01 has no crisis part.

**Required change.** V01: the disaster look's unit is the close-up neighbourhood (a district, J-V1.35). State the share of whole neighbourhoods drawn ruined by severity, the pattern by disaster (fire through contiguous blocks downwind, flood on the low ground by the water, earthquake scattered) and the calamity's `targets` naming a place. The outskirts' common and fallow land is the ground the refugee and quarantine camps take. Edges: a town of one district; the hinterland pseudo-district; a standalone neighbourhood document.

### G122-V02 — MAJOR, F-MISSING, owner V02

Item 122 (J135) names V02: the ruined look of a disaster's buildings. V02 has no crisis part.

**Required change.** V02: a building in a disaster look's neighbourhood draws a temporary ruined exterior (a look over the same composition, never a change of wings, `MassingRef` or hash), agreeing with item 123's damage at the look's decay level (V03). Edges: a deck building; a tiered stack; a building under Works.

### G122-V03 — MAJOR, F-MISSING, owner V03

Item 122 (J135) names V03: item 123's damage as a look inside a disaster's buildings. V03 has no crisis part.

**Required change.** V03: inside a disaster look's building the plan draws item 123's damage layer at the decay level the look sets, while the look lasts; nothing is stored, and the plan's ids and digest are unchanged.

### G122-V07 — MAJOR, F-MISSING, owner V07

Item 122 (J135) names V07: the village and smaller rungs. V07 has no crisis part.

**Required change.** V07: the looks at THORP, HAMLET and VILLAGE — a war band's camp, a blockade on an unpalisaded village's approach tracks, refugee tents on the green or the commons, famine's bare strips over item 117's crop stage, beasts' torn palisade sections with watch-fires — under §10.2's table and the density cap; never on the green's pond, a gate gap or a label's keep-out.

### G123-model — MAJOR, F-MISSING, owner model

Item 123 (a ruined building's floor plans; J136) names model §2.6: 'step 7: the damage layer over the same plan; the decay level read'. §2.6 step 7 still draws a decayed or ruined plan uniformly.

**Required change.** §2.6 step 7: a building's plan is derived once from its as-built band and era and never re-derived because it decays. Ruin is a damage layer over the same plan, shown by the building's decay level (0–1, from its existence state and the years since it was abandoned; V06). A building first met already ruined still gets its as-built plan; restoration lowers the level. No id is added. Edges: a building never decayed is byte-identical (the no-op pin); `reused` reverses the damage in order.

### G123-rendering — MAJOR, F-MISSING, owner rendering

Item 123 (J136) names rendering §8.6 (the damaged plan's drawing) and §11.1 (battle maps: fallen wall runs leave line of sight, openings, rubble and holes in the image). Neither is in the live base.

**Required change.** §8.6: the damaged plan's drawing by state — `abandoned`: debris, doors off; `decayed`: floor holes, partitions down, roof holes; `ruined`: outer walls broken, upper storeys floorless, rubble. §11.1: battle-map walls, portals and line of sight follow the damage (a fallen run leaves line of sight, a doorless opening is a gap, rubble and holes are drawn in the image, never invented as walls).

### G123-V02 — MAJOR, F-MISSING, owner V02

Item 123 (J136) names V02: the exterior agreeing with the plan's damage. V02 has no such part.

**Required change.** V02: the building band's exterior draws the plan's damage — a roof bay whose threshold the decay level has passed is a hole in the roof seen from above; a broken outer-wall run is a gap in the footprint's outline — reading V03's keyed thresholds, never its own.

### G123-V03 — MAJOR, F-MISSING, owner V03

Item 123 (J136) names V03: the damage layer, its drawing at every state (abandoned, decayed, ruined, restored with patches), the plan's exports and the panel lines. V03 §5.1 still draws a ruined plan uniformly ('a drawing of the same plan').

**Required change.** V03: the damage layer. One keyed threshold per plan element (wall run, floor area, door, window, stair, roof bay, furniture piece) by lineage and element id (§6.3's), monotone in the decay level (higher ⊇ lower) and never relocated. Restoration removes it in reverse, a repaired element in patch material (item 114). The states' looks, the plan exports and the panel lines. Edges: a ground floor the only walkable storey when `ruined`; a plan stored, cached or absent; ids identical intact and damaged.

### G123-V04 — MAJOR, F-MISSING, owner V04

Item 123 (J136) names V04: cellars, crypts and underground buildings by their own thresholds. V04 has no item-123 part.

**Required change.** V04: a ruined building's cellar, crypt and an underground building take their own keyed thresholds (a ruined church keeps its crypt or loses part of it by its threshold; V03 §5.1). They agree with V04's existing `collapsed` and `flooded` states, which stay the underground's model facts while the damage is a look.

### G124-model — MAJOR, F-MISSING, owner model

Item 124 (light weather effects; J137) names model §2.9: 'the effects switch as device state; the spell in force as session-transient view state; `weather` kept as the cover'. §2.9 has neither.

**Required change.** §2.9: `AppPrefs.weatherEffects` (device state; default on with headroom, off on the low tier, on phones and under reduced motion) and the session-transient spell in force (never saved, never in the document or hash). The `weather` key stays the seasonal cover.

### G124-rendering — MAJOR, F-MISSING, owner rendering

Item 124 (J137) names rendering §8.2, §8.4, §8.8, §11 and §12.5 (the effects' marks, the per-frame light terms, the layer above tiles and below labels, never in the tile key; exports without them; ≈ 1 ms per frame). None is in the live base.

**Required change.** §8.2: the effect marks per style family. §8.4: the shower's dimming, fog's scattering and night halos as per-frame light terms; the vector rung's wash. §8.8: the layer above the tiles and below labels and overlays, never in the tile key. §11: exports leave it out (byte-identical on and off). §12.5: ≈ 1 ms per frame at the densest spell; first to go under item 121 (e). Edges: no falling or lying snow where the climate's winter does not freeze; arid rain within its row; no luminance step faster than the photosensitivity limit; labels never covered.

### G122h-model — MAJOR, F-MISSING, owner model

Item 122 (h)–(i) (J138) names model §2.9: 'the default framing and the widened zoom-out limit as view state while a look stands'. §2.9 has neither.

**Required change.** §2.9: while a crisis look stands, the opening view and Fit take in the town and its camps, and item 116's limit widens to their joint bounds; both return when the crisis ends. A view the user has moved is never changed. Nothing is written to the document or the frame (see VEW-r1-05 for the limit at the cap).

### G122h-pipeline — MAJOR, F-MISSING, owner pipeline

Item 122 (h)–(i) (J138) names pipeline §10.2: the area per head, the engine rate and the coalition's spread round the town. §10.2 has none of these.

**Required change.** §10.2's crisis look table gains: camped area 45 m² a head (one camp per army, so two armies make twice the ground); travelling groups at the same rate; engines ≈ 1 per 1 500 besiegers, capped by the gates and wall stretches they can face; a coalition's camps spread round the town; item 122 (b)'s scale by severity and tier where the dossier gives no size. Camps stay on the frame and margin; a force too large spills to §8.8's ring. Edges: an island town; a force larger than the margin; zero headcount.

### G122h-rendering — MAJOR, F-MISSING, owner rendering

Item 122 (h)–(i) (J138) names rendering §8.8: massed camp marks on the surrounding ring for a force too large for frame and margin. §8.8 has none.

**Required change.** §8.8: the surrounding ring's massed camp marks at the city band (the count beyond the margin's capacity, with the panel's full number), and their interplay with item 116's widened limit at the METROPOLIS cap (VEW-r1-05).

### G125-model — MAJOR, F-MISSING, owner model

Item 125 (the dossier the only input; J139) names model §2.9: 'the week's source: the dossier's latest stamped tick, else the user's season control'. §2.9's `yearWeek` under `seasonFollow` still defaults to §7.7's DR42 ('the campaign week mod 52'), whose input is `HostContext.week`; the dossier's stamped ticks are not its source.

**Required change.** §2.9: the view's week follows the dossier's latest stamped tick (its conditions' `triggeredAt`, its calamities' and history's ticks), else the user's season control (standalone midsummer); `HostContext.week` is no input.

### G125-pipeline — MAJOR, F-MISSING, owner pipeline

Item 125, routing completed (canon, 2026-10-01; VPC-R1-27) names pipeline §4.11 *The clock* (1)–(2) and `EpochInputs.week`. The live §4.11 still reads 'its creation week is the port's `HostContext.week`' and dates a change by '… then `HostContext.week`, then none'.

**Required change.** §4.11 *The clock* (1)–(2) and `EpochInputs.week`: the dossier-bound map's present week comes from the dossier's own stamped ticks (item 125 (b)). Remove the `HostContext.week` rung, and give each dating rung its standalone fallback.

### G125-rendering — MAJOR, F-MISSING, owner rendering

Item 125 (J139) names rendering §11.3 and §11.4: 'the dossier the only data input; the view commands kept as commands'. §11.4 still has the host pass 'the whole dossier and, when it has them, the optional fields of `HostContext` — the week, the realm block, the audience, display names, the product line', so the week and the realm block remain data inputs beside the dossier; §11.3 states no dossier-only rule, and §14's `HostContext` still declares `week` ('the last dating rung') and `realm`.

**Required change.** §11.3 and §11.4: the dossier is the port's only data input; `HostContext.week` and `HostContext.realm` are retired as inputs; every used field has its standalone fallback (V08's digest column); the embedding API's view commands (a week, a layer, a selection) stay commands the map never needs. Bar (item 125 (e)): a static check that the adapter reads nothing but the dossier.

## Checked and holding

* **Water and the sewer (VEW-01's repair).** V04 §3.2 N3's banks hold for a river town, a walled core in a wet moat, an
  island quarter and a dry ditch. A dry stretch is no water face, so it divides no bank. A bank whose stretch of `R`'s
  boundary lies wholly on water and holds no candidate drains by gutter and pit, reported. UC1–UC20 each carry a rung and a
  test clause in T-V4-80 (a)–(k).
* **The frame arc (VEW-02).** A gate on a frame arc has an outward arterial of positive length (§4.3 *Result*: through-roads
  continue to the context margin). A folded stage carries no outer moat. §4.13's frame × wall cell agrees with S3 (6).
* **Closed arcs at a river loop (VEW-03).** A loop's river banks are not in (7)'s impassable list, but no generated road
  leaves a walled stage across them. S3 (5)'s routes go through picks on approachable arcs. S4's other routes reach
  outside 'through the nearest gate, never through a new wall crossing' (§4.3). The town bridge exists only where a river
  passes through the region. S5c grows inside the boundary and trims what runs beyond it. §5.3's gate-count row therefore
  holds.
* **The dry moat (VEW-04).** A gate on a dry stretch takes no deck. The ditch residue is part of the strip, so it ends at
  the gate's corridor (§4.8), as the castle's town-side ditch does. The moat `WaterBody` may own several wet faces
  (`FaceRef` is the view of every face it owns), so a moat broken into wet stretches keeps one record and one level.
* **The grade limit's ladder (VEW-10).** `through` 0.08 → `primary` 0.10 → `track` 0.12 → `path` 0.15 (V11 §3.24.5).
  F-ROUTE's 'relax the slope limit one class' reads the same order. A gate route left `unserved` short of the boundary
  gives fewer crossings than N, which F-WALL's ladder already handles (posterns added and reported).
* **The strip hole at M3a (VEW-08).** `raised.stripMarginM` sits in `hood.constants`' row, which ships at M1 (§16), so the
  base's strip is defined before stage 2. V01 §3.17.3 (2) states the same strip.
* **Deck plots at a castle (VEW-13).** A castle gate is a `Gate` of its bailey `Enceinte` (§2.7 `Castle.curtain`), so the
  `Gate.way` test covers the castle-moat deck as well as the town's.
* **Wall condition and closure (item 114).** The enclosed and sealed tests read the trace whatever a run's condition, so a
  breach opens no enclosure (§2.7). §5.3's row lets an epoch's growth cross only at gates. A drawn way makes its gate.
  T-ER-19 and T-ER-22 treat a `worn` or `patched` run as wall and a `breached` or `dismantled` run as an opening. The
  castle-weld gap is VEW-r1-02.
* **The volumes' combination tables.** V01 §3.18 (f), V02 §3.18 (f), V05 §3.23 and V07 §3.17 (b) each now give every row a
  rung. Their new rows hold: V05's season, pennant and Find rows, V07's hand-off rows and V02's grandeur-ceiling rows. V02's
  cliff row now rests on a true base rule (§4.7's cliff hard line).
* **Item 116 at the small end.** T-ER-08 and §8.8 cap `k_fit` at 34, the view never settles coarser than `k_min`, and
  V07 §5.2's township view is the limit's view less its margin. The large end is VEW-r1-05.

## Counts

32 issues: **1 blocker, 29 major, 2 minor**.
* Round-0 findings: 19 of 21 fixed. VEW-04 (now owner model) and VEW-07 (now owner V04) are partly fixed and re-raised
  under their round-0 ids. No RULING REQUEST touched a VEW id.
* New this round: 7 — VEW-r1-01 to VEW-r1-07. One is a blocker (VEW-r1-02, the castle weld × wall condition). One is a
  CATALOGUE-GAP (VEW-r1-06). Four came from two round-1 repairs meeting at a limit: r1-01, r1-03, r1-04 and r1-06.
* F-MISSING for owner items 120–125 (with 122 (h)–(i)): 23 — G120 model, rendering; G121 rendering; G122 model,
  pipeline, rendering, V01, V02, V03, V07; G123 model, rendering, V02, V03, V04; G124 model, rendering; G122h model,
  pipeline, rendering; G125 model, pipeline, rendering. Item 120's volume parts (V01, V03, V04, V05, V07) are present.
* By owner: model 9, rendering 8, pipeline 6, V04 3, V02 2, V03 2, V01 1, V07 1.
* By kind: F-MISSING 23, EDGE-UNDEFINED 7, EDGE-UNTESTED 1, CATALOGUE-GAP 1.

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (read or executed):**
* The 15 live hashes equal assemble-r1's "after" column.
* The word diffs of every subsection named in *Method*, against HEAD `3f0e02b2d7b9`.
* Each quoted sentence at its cited line.
* The arithmetic:
  - m_0 = 0.132 29 × 2^6.5 ≈ 11.97 m per CSS px, so the cap's 17.53 km frame needs a ≈ 1 465 px short side.
  - The strip widths of §4.8 and the moat widths of V11 §3.19.1 against `maxClearSpanM` (V11 §3.24.2).
  - `path`'s 0.15 × a 25 m lattice step ≈ 3.75 m.
* The absence of items 121–125's parts (term census), and of a weld rule in §2.7, §4.8, DR41 and V06 §3.7.7.

**PLAUSIBLE:**
* That a literal implementation of the per-enceinte condition writers produces two states on the welded stretch. This is
  the text's direct reading, but untested.
* The share of wall crossings the clear-span bound would drop. This depends on the drawn widths, the intervallum chance and
  the material draw.
