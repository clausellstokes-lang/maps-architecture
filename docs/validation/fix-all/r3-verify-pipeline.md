# Fix-all round 3 — PIPELINE area verification (fixall/verify-pipeline-r3)

> PENDING FABLE REVIEW — Opus-produced (fixall/verify-pipeline-r3), not yet checked by a Fable seat; queued in docs/FABLE-REVIEW-QUEUE.md.

Status: COMPLETE (2026-09-25). Verifier seat for the PIPELINE area after integration round 3.

## 0. In plain words

I checked the eleven pipeline items that round 3 set out to fix. **All eleven are accepted.** For each one the design now
contains a concrete mechanism that removes the failure the checker described, with no deferral wording:

* A hand-dug canal now names, before it starts, every block its road rule will touch, and promises to change nothing
  outside those blocks (VP2-1).
* A walled port's harbour road leaves through a gate and crosses a moat only on that gate's bridge (VP2-2).
* Parks and institutions can no longer be placed in the strip along a wall (VP2-3).
* Row houses on bent plots record exactly where their four sides begin (VP2-5).
* The margin band has one width everywhere (VP2-6), and the quarter count's receipt prints the numbers the text cites (VP2-7).
* The shadow drawing is no longer called a later stage (VP2-8).
* A castle on the town wall gets water only on its field side and a dry ditch on its town side (VP2-10), and the wall test
  allows the castle's bulge (R3-P1).
* A plaza's edge shared by two districts has its own seam type (VK2-10).
* A new lane ending on a boundary street adds one small edge on the neighbour's side instead of rebuilding the neighbour's
  plots (VK2-11).

I also re-checked the 164 earlier items this area accepted in rounds 1 and 2, because their sections were rewritten.
All of them still hold.

The rewrite introduced or exposed **nine new problems: two major, seven minor.**

* **Major 1.** Each building stores its wings (the rectangles and quads its roof is drawn on) as fixed coordinates. When a
  user drags the town with the warp tool, the building outlines move but the stored wings do not. After any warp over
  houses, roofs are drawn in the wrong place and the 3-D export disagrees with the map.
* **Major 2.** A canal or a moved river that crosses the town wall removes and redraws the wall's strip lines along a
  stretch of about 70–120 m. The blocks behind those lines are not in the list of blocks the edit names. So the edit
  either fails or falls back to rebuilding the whole town.
* **The seven minor ones:**
  * After a canal cuts the town edge, land on the countryside side can be handed to a district.
  * Crossing points that no road uses, and bridges added later, have no stated form.
  * Removing a lane does not fully undo the small change it made on the neighbour's side (the kernel checker found the
    same thing).
  * The "sealed town" wording ignores the new harbour gate.
  * The harbour road may take a long detour round the walls.
  * There is a small set of editorial slips.
  * The one-page summary still says shadows and 3-D come later.

Each problem has a stated fix and an owning area. Nothing is deferred.

## 1. Scope and method

* **Items checked:** VK2-10, VK2-11, VP2-1, VP2-2, VP2-3, VP2-5, VP2-6, VP2-7, VP2-8, VP2-10 (the lane's list) and R3-P1
  (found and fixed by the pipeline draft itself). Their sources: `r2-verify-pipeline.md` §4 (VP2-*), `r2-verify-kernel.md`
  §4 (VK2-10, VK2-11), the §R3.1 rows of `docs/ARCHITECTURE-VALIDATION.md`, the draft `r3-pipeline.md` §1 and §4, and the
  integration log `r3-integration-log.md` (C-1 deck form, C-2 one preparation list, which reshaped VP2-1).
* **Read line by line** in the integrated `docs/ARCHITECTURE.md` (9 546 lines):
  * the pipeline sections: §2.5–§2.7, all of §4 (§4.1–§4.12), §10, PART II and PART III, the J-P rows and the staged list;
  * the title, the one-page summary and §0.8–§0.9;
  * the sections the items and fixes lean on: §2.2, §3.3, §3.4, §3.6's attraction steps, §3.7's kerb paragraph, §5.2,
    §5.3, §7.3, §7.4's warp paragraphs and named-action table, §7.6, §12.4's table, and §13.1–§13.2's pipeline fixtures.
* **Searched by grep, not re-read:** the rest of the file, for every pointer into the pipeline sections.
* **Acceptance rule.** FIXED is ACCEPTED only when the text now holds a concrete mechanism that defeats the item's
  failure scenario (quoted below). Deferral wording counts as UNRESOLVED. No item was claimed INVALID or STAGED-BY-OWNER.
* **Executed checks (this lane; scripts under the session scratchpad `vp3/`):**
  1. `quotecheck.py` re-found every quoted mechanism of the 164 earlier accepted rows (§3).
  2. `fixall_pipeline_r2_quarters.py` was re-run, and its output diffed byte-identical against the cited `.out`.
  3. §12.4's critical-path total (253 ms) was read against the J-P27 figure.
  4. Every J-P id the pipeline sections cite has a row.
  5. A deferral-word scan covered the 2 343 pipeline-section lines (§5).
* **The parallel round-3 verifications** (`r3-verify-{kernel,determinism,rendering}.md`) were read for overlap. One of my
  findings, NP3-5, has the same root as the kernel verifier's VK3-3 (a), and the text says so. No other finding repeats
  theirs.

## 2. Verdict table — the round-3 items

| id | verdict | quoted evidence (ARCHITECTURE.md) | required change |
|---|---|---|---|
| VP2-1 | ACCEPTED | §4.11 "**The footprint (VP2-1).** `C` is the set of L1 cells … that (a) `S` meets, (b) border a removed stretch or a pruned remainder, (c) border a kept way's replaced stretch or are crossed by its new route, or (d) border a re-traced wall run … The footprint is `R` = (the channel ⊕ (`attractCm` + bank setback)) ∪ ⋃ `C`, and it is the carve's one clear region everywhere: batches (1) and (2) declare it as `KernelTx.clearRegion`, step (4) re-derives exactly its cells, the fate report lists exactly the protected entities inside it, and the locality checks … require byte identity outside it, less the seam exception"; "every cell bordering a removed, pruned or replaced stretch is in `C` by (b) or (c), so no plot outside `R` loses its access"; §3.3 "united with every L1 cell the edit's way rule touches"; §7.3 carve row "every way and every finer face outside the carve's footprint"; §13.1 "a canal across a CITY district that cuts a lane whose remainder is pruned and re-routes a `primary` — every face outside its footprint … byte-identical"; J-P34. The verifier's scenario (the pruned stub and the re-routed arterial outside the buffer) is inside `R` by (b) and (c). | — (coverage gaps that remain for runs crossing a wall and for the `attractCm` fringe: NP3-2) |
| VP2-2 | ACCEPTED | §4.2 S3 (5) "The harbour ↔ plaza route is **not** among them and never enters `T`'s road set … so it is solved in (11)"; (11) "A harbour outside the region is reached **through a gate**: one multi-source Dijkstra from every gate's exit — the far bank vertex of its moat deck where (10) carved a city moat, the gate itself otherwise — … finds the **serving gate** … So the harbour road leaves through a gate, crosses a moat only on that gate's deck and adds no road through the wall"; (7) the sealed town's harbour gate; (10) "one deck at every main gate and at a harbour gate (7)"; §4.4 "S4's remaining routes and S3's harbour route (§4.2 S3 (11)) are not in `T`'s road set"; §5.3 gate-count row "(its N main gates, plus a sealed town's harbour gate …) … a coastal town's harbour is joined to its plaza through a gate and crosses a moat only on a deck"; §13.2 walled coastal harbour fixtures; J-P35. | — (wording elsewhere still says a sealed town has no gate: NP3-6; detour unbounded: NP3-7) |
| VP2-3 | ACCEPTED | §4.5 S7b (3) "cut out of the district's coarse faces **other than its `wall_strip` faces** with `claimSubFace` (its `within` is that face list, §3.4) … only S7's own gate plazas use a strip's setback zone … A castle's esplanade is therefore claimed beyond the bailey's outer strip … Test: … 0 S7b claims meeting a wall strip"; §3.4 `claimSubFace` "`within: FaceRef \| FaceId[]` … S7b passes a district's coarse faces less its wall_strip faces"; §13.2 "0 S7b claims meeting a wall strip (VP2-3)". | — (the choice has no J-row: NP3-8 (c)) |
| VP2-5 | ACCEPTED | §2.6 `BaseWing.ring` "sides 1 and 3 are the party-wall chains (straight, or with the lot cut's one bend, §4.7 S10 (4))"; `corners?: [0, number, number, number]` "S11 records them when it clips the row"; "a bent party-wall chain has one well-defined midpoint (on whichever of its two segments half its length falls) … No reader asserts that a party-wall side is straight"; §4.7 S11 row "stored as one `quad` wing with its four corners recorded"; §3.8 and §8.6 "the four sides delimited by `BaseWing.corners`"; J-P39. | — (the stored ring itself goes stale under a warp: NP3-1) |
| VP2-6 | ACCEPTED | One number everywhere: §4.1 S10 row, §4.5 Perimeter and §4.7 S10 (0) all read "half-width 2 m (2 m on each side; a table value ≥ the residue class's minimum width)"; §3.3 pool step 3 "`bandUnion` of half-width 2 m — 2 m on each side"; §12.4 "(half-width 2 m: 2 m on each side)". | — |
| VP2-7 | ACCEPTED | §2.5 "the min(N_q, L) nodes of its city cut"; §9.1 "one of the `min(N_q, L)` quarters of the city cut"; §9.4 "the `min(N_q, L)` nodes of §4.5's city cut". **Receipt re-run here:** `fixall_pipeline_r2_quarters.py` output is byte-identical to the committed `.out`. It is headed "chosen rule J-P28: city cut = min(N_q, N_d)" and prints 8 / 13 / 17 at the matched sizes and "TOWN band … J-P28 cut: from 5 to 11", the numbers §4.5 cites. | — |
| VP2-8 | ACCEPTED | §2.6 "The shadow pass is §8.4's (optional, off by default, timed at M2b); the base populates every height and keeps the display list's shadow hook (§8.1) and its budget"; grep: 0 hits for "later SHADOW" and "later 3-D" in §2. | — (the one-page summary repeats the old claim: NP3-9) |
| VP2-10 | ACCEPTED | §4.2 S3 (10) "for an `on_enceinte` castle, **only its outer arc** (8): the channel along the shared stretch between the weld vertices, outside the trace's outer half-band and a berm — the city moat's own stretch there when the town has one …, otherwise a channel clipped at each end by the trace ⊕ (outer half-band + berm) … while the bailey's town-side arc takes its castle template row's `townSide`, a dry ditch or nothing"; "No castle moat crosses the city trace"; (8) the hard filter keeps every (5) route off a planned castle moat; (9) the pull treats a planned ring moat as water; §4.8 "`townSide: 'dry_ditch' \| 'none'` … (default `dry_ditch`; VP2-10)"; §4.7 S10 (0) "`ditch` in place of `glacis`"; §8.2 "**The dry ditch (VP2-10).**"; §13.2 on_enceinte fixtures; J-P36. | — (a field-name collision it creates: NP3-8 (d)) |
| VK2-10 | ACCEPTED | II.1 `SeamEdge.type: 'way'\|'water'\|'wall'\|'reserve'\|'field'\|'cliff'\|'frame'\|'sky', reservation?: Id`; "**Seam edge types (VK2-10).** An edge's type is the first its role rows give … `reserved` → `reserve` … A **`reserve`** run is a reservation boundary two districts share with no way on it … its shared geometry is the `reserved` chain and the two parts of the margin band that S10's step (0) lays along it"; `hard` by reservation kind; II.5 "every seam edge carries one of II.1's types (a way-less reservation boundary between two districts as `reserve`, with its two margin-band parts)"; §7.1 "must be typed street, water, wall, reservation boundary (`reserve`), field, cliff or frame"; J-P37. | — |
| VK2-11 | ACCEPTED | II.1 (3) "**The neighbour step (VK2-11)** … one L2 batch whose only face is the neighbour's half-corridor strip along the split spine edge inserts one `corridor_split` edge from the junction vertex to the foot of its perpendicular on the neighbour's kerb … A half-corridor strip holds no L3 content …, so the batch clears nothing and re-derives nothing: the neighbour's blocks, plots, footprints and greenery are neither in its face nor re-derived — never its plots"; §3.3 "**A batch's faces are the faces it names or creates** (K4, VK2-11)"; §3.7 the straight-through `corridor_split`; §4.6 step 7, II.4, §7.3 item 1; J-P38. This is exactly the verifier's required change. | — (removal does not undo a promotion: NP3-5, same root as VK3-3 (a)) |
| R3-P1 | ACCEPTED | §4.2 S3 (9) "the trace departs from the boundary by ≤ 40 m everywhere except along an `on_enceinte` castle's shared stretch, which is the bailey's own outer arc and may bulge up to the bailey's width beyond the boundary"; §5.3 row "except along an `on_enceinte` castle's shared stretch (the bailey's outer arc, §4.2 S3 (9))". | — |

**Totals:** 11 ACCEPTED, 0 UNRESOLVED.

## 3. Re-check of earlier FIXED items whose sections changed this round

This round the pipeline sections were rewritten in two ways:

* **Replaced by blocks:** §2.5, §2.6, §4.1, §4.2, §4.4–§4.8, §4.11, II.1, II.4 and II.5.
* **Edited at integration:** §2.7, §4.9, §4.10 and §10.4.

`quotecheck.py` re-found the quoted mechanism of every row this area accepted before:

* the 128 ACCEPTED rows of `r1-verify-pipeline.md` §2;
* the 18 rows of `r2-verify-pipeline.md` §2;
* the 18 hand re-checks of `r2-verify-pipeline.md` §3.

That is 164 rows. **116 survive verbatim.**

**24 rows carry no double-quoted text.** They cite schema names and rows, for example "`PlotBound.treatment` …", "§4.9
rows: street trees …" or "II.6 `IslandRule`, `SkyStrategy` …". Each of those names and rows was found present by hand.

**24 rows have a fragment that no longer matches.** Nineteen of them are round-1 quotes that round 2 had already
re-checked by hand, and their round-2 re-check quotes survive. Every one of the remaining rows still holds:

| id | where the mechanism stands now | still holds |
|---|---|---|
| FTG-3 (dup of MFP-3) | §4.5 S7b (3) "cut out of the district's coarse faces **other than its `wall_strip` faces** with `claimSubFace` … Test: 100 % of institutions and parks larger than one block placed at their requirement (O18 f)" | yes (strengthened by VP2-3) |
| NF-P4 | §4.2 S3 (10) "one deck at every main gate and at a harbour gate (7), where the gate's route … crosses the channel"; §4.4 "the L1 batch places each deck's two pinned bank vertices on its arterial where the channel's banks will cross it" | yes (deck form per J-I12) |
| NF-P7 | the stray "separate L1 transaction" clause is still absent (0 hits); §4.1's batch table and "L1 is therefore written by S3, S4, S5, S6, S7, S7b and S8" stand | yes |
| NF-P8 | §4.1 diagram "S12a Hinterland siting (no geometry)"; §4.9 "S12a Hinterland siting (eager, no geometry; after S7b, before S8 …)"; the hinterland unit "on the generation worker while the pool workers run the districts" | yes |
| NF-P14 | §4.11 "**`carve` … its way rule and its footprint (NF-P14, VP2-1)**"; cut ways "its stretch inside the channel ⊕ max(bank setback, 1 m) is removed … a remainder that now dangles shorter than one block depth is pruned" | yes (strengthened) |
| GEO-30 (r2 re-check) | II.1 (3) the T-junction "recorded as a `SeamAmendment` (kind `tJunction`) and a new portal in the shared `Seam` record that both districts' contracts read"; the neighbour's re-derivation is now the one-edge neighbour step | yes (strengthened by VK2-11; see NP3-5) |

The 13 STAGED-BY-OWNER items keep concrete hooks:

* **stage 2:** `Seam` / `SeamContract` and `FabricStrategy`, now with the `reserve` type and the neighbour step;
* **stage 3:** `outline` / `compose`, `fixedWings` and `BaseWing.corners`;
* **islands and sewers:** `SkyIsland`, `Tunnel`, `IslandRule`, `SkyStrategy` and `SewerStrategy`;
* **evolution:** `EpochInputs`, `EvolutionStrategy` and the `ConversionOp` kinds;
* **village:** PART III items 1–5.

None regressed to deferral wording. The staged list (end of file) names only the seven roadmap subjects.

## 4. New findings

Two are major and seven minor. Each names its owning area. "Introduced" says whether round 3 created the defect.

| id | sev. | owner | the defect and its failure scenario | required change |
|---|---|---|---|---|
| NP3-1 | major | pipeline (§2.6); companions determinism (§7.4 "Warp and what stands on the ground"), kernel (§2.2 rule 5, §3.9) | **Stored wing rings go stale under a warp** (exposed by round 3: VP2-5 now indexes `corners` into the stored ring, and §7.4's round-3 list of moved records omits wings). §2.6 stores each building's `wings: BaseWing[]` with `ring: Polygon` (world coordinates), and "the footprint is their union". But §2.2 rule 5 says "no entity record stores a position of a vertex", and §3.9 says "Entities carry no slots and no vertex positions". A warp "moves vertices of every level ≥ its own" (default `fromLevel = 1`, so L4 footprints move). §7.4's list says "Four kinds of record hold a world point instead of a vertex … and move with the ground" — pins, decorations, instance overrides and pinned labels, **not wings** — and moved buildings are only "re-based". **Scenario:** a user warps a street with houses on it. The L4 footprint faces move; every moved building keeps its old wing rings. The per-wing roofs (§8.2, "runs per stored wing"), the 3-D export, the stage-3 union contract ("the union of the composed wings equals the outline's union exactly") and O17 (i)'s identical footprint hash at every LOD all read wings that no longer match the footprint. `BuildingSlot.hint: Polygon` has the same form. | Carry wings through every move, in §7.4's paragraph and §2.6. After the kernel's commit, each building whose footprint has a moved vertex gets new wing rings: (1) a wing vertex that coincides with a footprint vertex takes that vertex's new position, matched by vertex identity; (2) every other wing vertex takes its mean-value coordinates in the footprint's outer ring before the move, applied after it and rounded to the lattice (`+ − × ÷`, `sqrt` only); (3) a `quad` keeps its `corners` indices; (4) a `rect` that no longer passes the near-rectangle test becomes a `quad` with its four mapped corners recorded. The undo record keeps the old rings. Treat `BuildingSlot.hint` the same way, or drop it after S11. Add the B-EDIT test: after a warp and a `moveVertex` over a built block, every building's wing union equals its footprint face (integer equality) and every drawn roof line lies inside its footprint. |
| NP3-2 | major | pipeline (§4.11 footprint `C`, J-P34); companions determinism (§7.3 (b) 4), kernel (§3.3's footprint list) | **The footprint misses cells that a run crossing a wall and the `attractCm` fringe touch** (introduced at integration: C-2/J-I13 added the carve's wall re-trace, and C(d) was worded narrowly). (i) Batch (1) removes "the old run … with its strips' setback and glacis lines", and (3) re-cuts them "along each re-traced run". The run spans "between the nearest unaffected towers" (towers every 35–60 m), so the strip lines of roughly 70–120 m of wall are removed. C(d) holds only cells that "border a re-traced wall run", and the blocks behind the old setback and glacis lines border those lines, not the run. Their kept plots use the removed lines as ring edges, so batch (1) cannot remove the lines without `E_KEPT`. Where the re-traced run moves, the new lines of (3) also cross cells outside `R`. **Scenario:** a canal drawn into a walled town, or a river moved across its wall, hits `E_KEPT` → §3.3's fallback, a town-wide re-derivation. §7.3 (b) 4's list ("cells bordering a stretch (3) cut, pruned or replaced") has the same gap. (ii) C(a) is the cells `S` = channel ⊕ bank setback meets, but `R` adds `attractCm`, and §3.3 and §7.3 (b) 4 use "the cells that buffer meets". A cell met only by the 26 cm fringe has finer faces removed by rule 1 ("each finer face whose interior meets the region — whole"), but it is not among the cells step (4) re-derives. The result is a hole, or a change outside the cells. (iii) §3.3's enumeration and J-P34's parenthesis omit the wall-run cells entirely. | §4.11: (a) "the cells the channel ⊕ (`attractCm` + bank setback) meets", so that `R` = ⋃ `C` exactly. (d) "every cell bordering the old run or the setback and glacis lines (1) removes with it, and every cell the re-traced run ⊕ (band half + setback, or + glacis) meets". The way rule also cuts every lane the new strips meet, with F-REDERIVE on plots inside the new strips (as `drawWall` does, §7.4). Mirror (a)–(d) in §3.3's footprint sentence, J-P34 and §7.3 (b) 4. Add a §13.1 / §13.2 fixture: a canal crossing a walled CITY's wall between two towers and a river moved across a wall each commit with no `E_KEPT` or `E_LEVEL`, and every face outside `R` stays byte-identical less the seam exception. |
| NP3-3 | minor | pipeline (§4.11 (4)); companion determinism (§7.3 (b) 6) | **District assignment after a boundary cut under the new water** (introduced at integration C-2, the `anchor` cuts). Batch (1) removes the stretch of a perimeter, district-boundary, setback or glacis line between its two bank points. The cells on both sides then merge, and the L0 batch re-separates their land parts along the remaining boundary parts that end at the anchors. Step (4) then applies "a cell merged across a removed district-boundary stretch joins the district holding the larger part of it", and split faces inherit their owner. **Scenario:** a canal crossing the settlement perimeter. The hinterland land beside the channel on both banks joins the district, against §4.5 "every coarse face outside it belongs to the hinterland pseudo-district". Or a block part beside a crossed glacis line inherits the strip's `wall_strip` type. | §4.11 (4) and §7.3 (b) 6: "after the L0 batch, each land face of `R` takes the district (or the hinterland, or the `wall_strip` typing) of the pre-edit cell holding its larger area; the merge rule applies only to a boundary stretch removed on land (a cut way), where no boundary re-separates the parts." Add a fixture: a canal across the perimeter leaves 0 district faces outside the perimeter. |
| NP3-4 | minor | pipeline (§4.2 S1 (5), S3 (2), §4.3); companions kernel (§2.2 rule 7), determinism (§5.2 F-ROUTE row, §7.4 "draw bridges" row) | **Decks outside the three paths J-I12 names** (introduced by C-1/J-I12: a deck's span is now "laid by the way … through them", and §2.2 rule 7 lists only generation's S1/S3 decks and an edit's preparation batch). (a) S1 emits every crossing site (40 m spacing along the band) and S3 every canal deck (every 150 m, or 600 m outside the built extent) as two pinned `deck_end` vertices with a `Bridge`. A site that no way uses has no span, no way (`Bridge.way: Id` is required) and no class, yet "S7 builds the bridge furniture on them". (b) F-ROUTE's rungs at S4, "move the crossing site along its reach" and "allow one bridge at extra cost", and §7.4's "draw bridges" (`drawWay` class `bridge`, "a `Bridge` on §4.2 S1 (5)'s perpendicular deck") need new `deck_end` vertices at L0 after L1 exists. An L1 stage or edit cannot place them (§2.2 rule 3, `E_LEVEL`), and no text names the batch that does. | (a) `Bridge.way: Id \| null` with `state: 'site' \| 'built'`: a site no way uses by the end of S5 stays `site` — no span, no furniture, not drawn, not in §5.3's deck rows — and growth, epochs and drawn bridges may use it. (b) At generation, F-ROUTE's move rung selects another emitted site on the reach within the band. A new deck (F-ROUTE's extra bridge, a drawn bridge) is placed by one L0 batch of two same-level shore splits — `deck_end`, pinned, nothing cleared, the faces whose rings run along the shore gaining the vertex as §3.3's same-level-split rule states — before the L1 way is laid through them. This is J-I12's one structure. Add both to §2.2 rule 7's list and to §5.2 and §7.4. |
| NP3-5 | minor | pipeline (II.1 (3) wording, §4.6 step 7); the mechanism is the kernel's VK3-3 (a) — one fix | **The neighbour step's reversal does not undo its promotion** (introduced with VK2-11; the same root the kernel verifier reports as VK3-3 (a)). II.1 (3): "Removing the street reverses the step … a kerb vertex the step created dissolves". A plot-line end or footprint corner the step **promoted** stays at L2 with its `split` flag cleared (§2.2 rule 3; only undo restores birth levels). So a removal by a later reroll leaves the neighbour's L2 route, index and digest with a vertex they did not have. §13.1's "the street removed again (the kerb restored exactly)" fails on the promoted case, and every later S10 / S11 re-derivation of that block keeps an orphan L2 kerb vertex. II.1 (3)'s "every ring stays as it was" is also false when an L4 footprint corner is promoted: the plot's L3 ring gains it. §4.6 step 7 names only "a promoted plot-line end". | Adopt VK3-3's demotion rule (the reversal restores the vertex's former level and `split` flag; commit and undo records list it). Reword II.1 (3) as "every ring at its own level stays as it was; a promoted L4 corner joins the plot's L3 ring, which is the seam exception's ring-with-the-vertex-removed", and §4.6 step 7 as "(a promoted plot-line end or footprint corner)". §13.1: the promoted case, then removal by a reroll, restores the kerb's L2 route and digest. |
| NP3-6 | minor | pipeline (§4.2 S3 (4), §4.3, §4.8); companion determinism (§5.2 F-WALL row) | **"Sealed town" wording contradicts the new harbour gate** (introduced by VP2-2). S3 (7) gives a sealed town (`N = 0`) with an outside harbour one harbour gate, and §5.3 and §13.2 count it. But S3 (4) still says "`N = 0` produces no gate and no external arterial through the wall", §4.8 "`N = 0` was honoured in S3 (no gate, no external arterial)", §4.3 "roads leaving the walled stage = N exactly", and F-WALL "N = 0 adds no gate: a declared sealed circuit". §4.8's list of water gates omits the harbour gate. A reader or implementer following §4.8 would refuse the gate that S3 (7) and the fixture require. | S3 (4) and §4.8: "no main gate and no external arterial (a harbour outside the stage-1 region still gets the harbour gate of (7))"; §4.8's water-gate list adds "and a sealed town's harbour gate (§4.2 S3 (7))"; §4.3: "= N (plus a sealed town's harbour gate)"; F-WALL: "N = 0 adds no main gate". |
| NP3-7 | minor | pipeline (§4.2 S3 (4), (11)) | **The serving gate is unbounded in detour** (introduced by VP2-2; the draft names it as its own open risk; PLAUSIBLE). The gate picks score angular gap, requested bearings and terrain, never the harbour. The harbour route then leaves through the least-cost gate. **Scenario:** a walled coastal town whose harbour lies outside the stage-1 region, beside the wall's shore anchor, and whose picks all face inland. The harbour road leaves an inland gate and wraps round the wall — a detour no reference town shows. No test bounds it. | S3 (4): when a harbour candidate exists, its bearing from the plaza counts as a requested bearing for one pick (N unchanged). §13.2's walled coastal harbour fixtures assert a harbour-route length ≤ 1.5 × the plaza → harbour least-cost lattice path with the wall ignored. The change to `T` and the gates on harbour towns is a declared design change (no golden exists yet). |
| NP3-8 | minor | pipeline (§4.2, §4.1, §4.5, §2.7) | **Editorial slips from the round-3 rewrite.** (a) S3 (2) says the planned reservations and water "are committed in (10) and (11)", but after renumbering the land reservations are (12) and (11) is the harbour route. (b) §4.1's J-P27 says an eager field partition "would add its ≈ 12 ms to CITY's critical path (≈ 257 ms p50)"; §12.4 now sums to 253 ms, so the figure is ≈ 265 ms. (c) VP2-3's choice ("*Chose to exclude the strips from the claim candidates …*", §4.5 S7b (3)) has no row in the Judgment calls table, against the standing rule that every nontrivial choice is recorded there. (d) VP2-10's new residue kind `ditch` (a dry ditch) collides with the existing field `Enceinte.ditch?: Id`, which means the wet moat `WaterBody`. | (a) "(10) and (12)"; (b) "(≈ 265 ms p50)"; (c) add J-P41 for the strip exclusion; (d) rename the field `Enceinte.moat` (as `Castle.moat`) or the residue `dry_ditch`, in §2.7, §4.7, §4.8, §8.2 and §14. |
| NP3-9 | minor | scope (the one-page summary) | **The summary still calls shadows and 3-D "later"** (the VP2-8 defect, surviving outside §2.6). The summary says "every building carries its floors and roof heights even though the map is drawn from above, so shadows and 3-D can be added later", while §8.4 builds the optional shadow pass (timed at M2b) and §11.1 the glTF and CityJSON exports — and the same page lists "exports to … 3-D". | "…so the optional shadow pass and the 3-D export read real heights." |

## 5. Deferral-language scan

**What was scanned.** Every pipeline section, including banner-free lines, was grepped: §2.5–§2.7, §4, §10, PART II and
PART III, 2 343 lines in all. The search terms were TBD, "to be decided / defined / determined", defer, postpone, later,
"at M0", "open question", "left open", future, eventually, "not yet", "for now", TODO, "out of scope" and "open".

**What the hits are.** Every hit falls into one of these kinds:

* **Sequence wording:** "every later stage", "a lane a user adds later", "each later stage's boundary".
* **Owner-staged subjects with concrete hooks:**
  * "the later sewer rules (II.6)";
  * "The evolution engine is the owner's later stage (DEF-8); its hooks are concrete now";
  * "What a later village product needs";
  * "setting packs later" — the owner's adopted default D-6, with the pack format and loading hook built now.
* **"Open" in its ordinary sense:** open chains, open waterfront, open-field strips, open spaces.

**Result.** There is no TBD, no "at M0" promise and no open item in the pipeline sections. The one deferral-shaped phrase
left in the document is in the one-page summary ("can be added later"), which is NP3-9.

## 6. CONFIRMED versus PLAUSIBLE; what a Fable reviewer should re-check first

**CONFIRMED (executed here).**

* The 164 earlier accepted rows were re-found: 116 verbatim, and the rest by hand, per §3.
* The quarters receipt was re-run and is byte-identical to the committed file, with 8 / 13 / 17 and "from 5 to 11".
* §12.4 sums to 253 ms, against J-P27's 257-ms figure.
* Every J-P id cited in the pipeline sections has a row.
* These strings were found by grep: the stale "(10) and (11)" pointer, the `Enceinte.ditch` field, "Four kinds of record
  hold a world point", "Entities carry no slots and no vertex positions", and the summary's "can be added later".
* The deferral scan is §5.

**PLAUSIBLE (reading only).** Every verdict of §2 and every new finding of §4, because the design is unexecuted. NP3-7 is
a realism judgement.

**Re-check first:**

1. **NP3-1:** whether any path — S11 re-derivation after a warp, the terrain operator's re-split, or `moveFootprint` —
   already refreshes the wing rings of moved buildings. I found none.
2. **NP3-2:** whether batch (1) can keep the setback and glacis lines outside the channel instead of removing the whole
   run's lines, which would shrink the fix to the new-strip case.
3. **NP3-4:** whether the canal decks outside the built extent ever carry a way, since the hinterland's driveways are
   faces, not ways.

## Fable review (2026-09-27) — B-fixall/verify-pipeline-r3

**Verdict: CONFIRMED.** Reviewed by Fable (lane fable-review/main/pipeline, `docs/fable-review/main/pipeline.md`) on the live design (`docs/ARCHITECTURE.md` sha256 1c23190f…, 13 026 lines). The 11 ACCEPTED hold; the 9 new findings were real and every one stands fixed in the live text (NP3-1 → J-P42; NP3-2 → the footprint's (a) and (d); NP3-3 → J-P43; NP3-4 → J-P44; NP3-5 → demotion; NP3-6 wording; NP3-7 → J-P45; NP3-8 (a)–(d) incl. `Enceinte.moat`; NP3-9 in the summary). The three check-first questions were resolved by round 4 the right way. No correction.
