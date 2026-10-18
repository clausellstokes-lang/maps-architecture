# Fix-all round 4 — PIPELINE area verification (fixall/verify-pipeline-r4)

> PENDING FABLE REVIEW — Opus-produced (fixall/verify-pipeline-r4), not yet checked by a Fable seat; queued in docs/FABLE-REVIEW-QUEUE.md.

Status: COMPLETE (2026-09-26). Verifier seat for the PIPELINE area after integration round 4.

## 0. In plain words

I checked the nine items round 4 set out to fix in the part of the design that builds the town. **All nine are
accepted.** For each, the design now states a concrete mechanism that removes the failure the checker described, with
no postponement:

* The map's outer edge is drawn with the land and water, and the printed frame line with the first streets, so every
  step that builds the town has a named first writer (VK3-8).
* A building's roof wings now move with its outline when the ground is dragged, and the move is refused and halved if
  they would stop fitting (NP3-1). I re-ran the measurement behind it and got the same numbers.
* A canal dug through a town wall, or a river moved across one, now names in advance every block it rebuilds, the
  wall's strips included, so it stays local (NP3-2).
* After a canal crosses the town's edge, the countryside on both banks stays countryside (NP3-3).
* River crossing places that no road uses are kept as invisible "sites", and a bridge added later has one stated way of
  being built (NP3-4).
* Removing a lane now undoes its small change on the neighbouring street edge completely (NP3-5).
* A town with no gates still gets its one harbour gate, and every rule a builder follows says so (NP3-6).
* A walled port always gets a gate on its harbour side, with a measurement at the first milestone and a pre-decided
  fallback (NP3-7).
* Four wording slips are corrected (NP3-8).

I also re-checked the 181 earlier items this area accepted in rounds 1–3, because their sections were rewritten. All
of them still hold.

The rewrite introduced or exposed **seven new problems, all minor**:

* One paragraph (II.4) still lists the neighbour changes a district reroll may make without the roof wings, so a test
  written from it would fail (NP4-1).
* A stage-3 building composition that a user has edited is stored as fixed coordinates and would not follow a drag of
  the ground (NP4-2).
* The wing-following step is not run after the greenery step during generation, so regenerating a block could differ
  from generating it (NP4-3).
* A rare kind of multi-centre port town can still end up without a harbour-side gate (NP4-4).
* Three test sentences still count gates without the harbour gate (NP4-5).
* The extra time the wing check adds to a warp is not budgeted (NP4-6).
* Three small wording slips about unused bridge sites (NP4-7).

Each has a stated fix and an owning area. Nothing is deferred.

**What a Fable reviewer should re-check first:** NP4-3 (whether S12b's L4 batch really splits footprint rings — if it
never does, the finding reduces to a one-line guarantee); NP3-7 with NP4-4 (the forced harbour pick on polycentric
forms); and C-2's frame levels, which this lane accepted by reading every `margin` / `border` reader (§4 "Considered
and not raised" (2)).

## 1. Scope and method

* **Items checked (the lane's list):** VK3-8, NP3-1, NP3-2, NP3-3, NP3-4, NP3-5, NP3-6, NP3-7, NP3-8. Sources:
  `r3-verify-kernel.md` §4 (VK3-8), `r3-verify-pipeline.md` §4 (NP3-1–NP3-8), the §R4.1 rows and §R4.2 conflicts of
  `docs/ARCHITECTURE-VALIDATION.md`, the draft `r4-pipeline.md` (§0, §1, §3 requests, §4 judgment rows, §5) and the
  integration record `r4-integration-log.md` (C-2 frame lines and C-4 crossing sites reshaped VK3-8 and NP3-4).
  `index.json` holds none of these ids (they are round-3 verifier findings), so the verifier files are the sources.
* **Read line by line** in the integrated `docs/ARCHITECTURE.md` (10 723 lines): the title, the one-page summary and
  §0.10; §2.2 whole (rules 1, 3, 5, 7 carry the pipeline's companions); §2.5–§2.7; all of §4 (§4.1–§4.12); §10
  (§10.1–§10.4); PART II (II.1–II.6); PART III; the staged list; and the sections the fixes lean on — §3.2 (9), §3.3
  whole (clear regions, kept content, the pool's five steps, the index paragraph, J-K33), §3.4's signatures, §3.6's move
  semantics, §5.2's F-ROUTE / F-WALL / F-REDERIVE rows, §5.3's wing, bridge and gate rows, §7.3 items 1–2 and (b) 1–9,
  §7.4's warp paragraph and its "draw bridges" and warp rows, §8.6's per-wing roof sentence, §8.2's wall-symbol sentence,
  §11.1's GeoJSON row, §12.4's critical path, §12.6's warp line, §13.1 and §13.2's fixtures for these items, §14's
  stage-registration paragraph, §16's M1 and M3a rows, and the J-P, J-K33 and J-I16–J-I17 judgment rows.
* **Searched by grep, not re-read:** the rest of the file, for every reader of the terms the fixes touch (`margin`,
  `border`, `site`, `carryWings`, `SlotPlan`, `BaseWing.corners`, `Enceinte.ditch`, `N = 0`, `sealed`, `harbour gate`,
  `detour guard`, every stored `Polygon` / `Point` field in the schemas).
* **Acceptance rule.** FIXED is ACCEPTED only when the text holds a concrete mechanism that defeats the item's failure
  scenario (quoted in §2). Deferral wording counts as UNRESOLVED. No item was claimed INVALID or STAGED-BY-OWNER.
* **Executed checks (this lane; scripts and outputs under the session scratchpad `vp4/`):**
  1. `vp4/quotecheck.py` (round 3's script extended to round 3's own rows) re-found the quoted mechanism of every row
     this area accepted in rounds 1–3 — 181 rows (§3).
  2. `docs/validation/bench/fixall_pipeline_r4_wings.py` (NP3-1's receipt) re-run: output byte-identical to the
     committed `.out` (13.9 s).
  3. `docs/validation/bench/fixall_pipeline_r2_quarters.out` still carries the two lines VP2-7's acceptance quoted.
  4. §12.4's critical path read as ≈ 255 ms p50, the figure J-P27 (§4.1) now builds on.
  5. A deferral-word scan over the 2 631 lines of the pipeline sections and J-P rows (§5).
* **Parallel round-4 verifications** were not available to this lane; overlap with kernel, determinism, rendering and
  scope findings is therefore not de-duplicated here — each finding names its owning area.

## 2. Verdict table — the round-4 items

| id | verdict | quoted evidence (ARCHITECTURE.md) | required change |
|---|---|---|---|
| VK3-8 | ACCEPTED | §4.1 batch table, S1 row: "L0: first the arena's outer ring — the frame plus its context margin (§3.2 (9)), one closed chain carrying the structural `margin` role on the arena's `Terrain` entity, so every L0 face has a boundary before any water exists"; S3 row: "then L1: the **map border** — the frame rectangle of §3.2 (9), one closed chain carrying the structural `border` role on the arena's `Terrain` entity, laid across land and water alike as a deck span lies across its water"; the writer sentence "L0 is therefore written by S1, S3, S4 (F-ROUTE's extra bridge only) and S5a (an outer moat's carve, §4.4), and L1 by S3 — the map border first — S4, S5, S6, S7, S7b and S8, in that order"; §2.2 rule 1 (the outer ring an L0 chain; the border an L1 edge "written first by S3's L1 batch after S3's L0 batch"); §3.2 (9) "The arena's outer ring is an L0 chain carrying `margin` and the frame rectangle an L1 chain carrying `border`"; the kernel part, §3.3 `rederivesFrom`: "the first stage of §4.1's order for a warp or smoothing batch, which keeps nothing (§3.6; Judgment J-K33)", so no first-writer list exists to go stale; §3.3 rule 2 prepares "the map's `border` line … (the arena's outer ring is L0, so new water meets it at its own level)"; §2.7 `Tunnel` "where it falls (its invert profile, a `ChainProfile` on its centreline, §2.2 rule 5)"; J-P46, J-K33, J-I16. Every reader of `margin` / `border` (grep: §2.2 rules 1 and 7, §3.2 (9), §3.3 rules 2–3 and pool step 3, §4.1, §4.11 (1), §7.3 (b) 3, II.1's `frame` type) agrees with the two levels. | — |
| NP3-1 | ACCEPTED | §2.6 "**Wings follow their footprint — the wing-carrying rule (NP3-1; Judgment J-P42).**" rules 1–5: "(a) each boundary run is re-read from the rings after the change between its two end vertices … matched by identity"; "(b) every other wing vertex … takes its mean-value coordinates with respect to the footprint's rings (outer and holes) before the change, applied to the rings after it with `+ − × ÷` and `sqrt` only (§6.5) and rounded to the lattice"; rule 3 (a de-rectangled rect "becomes a `quad` with its four corners recorded and its `ridgeAxis` swapped"); rule 4 "For a `warp` or a `moveVertex` this check is part of the step's whole-step validation, which halves the step when it fails"; rule 5 "The edit's undo record keeps the former rings (§7.4)"; `declare function carryWings(…)`; §4.7 S11 "**The first carry (NP3-1).**"; §2.5 `BuildingSlot` "persisted: no polygon (NP3-1)"; §2.2 rule 5's named exception; §3.4 `ChainInsert.placed` and `warp(…, recordCheck?)`; §3.6 whole-step validation "every building whose footprint the step moves valid under §2.6's wing-carrying rule"; §5.3 row "every building's wing rings are simple and counter-clockwise and unite to its footprint face exactly"; §7.3 item 1 and item 7 (ii) "footprint and wing ring"; §7.4 "**A building's stored wing rings** … are carried with its footprint face in the same pass"; §13.2 B-EDIT "§2.6's test"; J-P42. Receipt re-run byte-identical (§1 check 2): 48 000 / 48 000 tiled carries exact at 0.25–3 m. The verifier's scenario (a warp over houses leaves roofs and the 3-D export behind) is defeated: the rings move with the face and the union is checked in the step. | — (residual gaps, each a new finding in §4: a stored stage-3 `Composition` is not carried, NP4-2; generation batches after S11 do not call the carry, NP4-3; the check's cost is unbudgeted, NP4-6; II.4's exception omits wing rings, NP4-1) |
| NP3-2 | ACCEPTED | §4.11 "**The footprint (VP2-1, NP3-2).** `C` is the set of L1 cells … that (a) the channel ⊕ (`attractCm` + bank setback) meets; (b) border a removed stretch or a pruned remainder, or a stretch the new strips' cuts remove; (c) border a kept way's replaced stretch or are crossed by its new route; (d) where the channel crosses a wall, border the old run or the stretches of its strip lines that batch (1) removes with it, or meet the re-traced run ⊕ (half its band + its setback, and + its glacis or berm on the field side) … The **footprint** is `R` = ⋃ `C`, exactly"; "every cell whose plots use a strip line batch (1) removes as a ring edge is in `C` by (d), so batch (1) removes no edge a kept face uses (no `E_KEPT`)"; "**Other crossings (J-I13, NP3-2).** … Every way that the re-traced run's new strips … will meet, other than a kept way through a gate of the run …, takes the `cut` fate at the strip's boundary"; batch (1) "the old run leaving with the stretches of its strip lines alongside it (each through its `StretchRef`, its ends placed by `splitThrough` at the feet of the end towers' perpendiculars"; batch (3) re-cuts them "from the feet (1) left"; §3.3's footprint sentence adds "the cells bordering the old run or the strip-line stretches it removes with it and the cells the re-traced run's new strips will take"; §7.3 (b) 2 (iii), (b) 3, (b) 7 mirror it; §13.1 fixture "a canal crossing a walled CITY's wall between two towers — no `E_KEPT` and no `E_LEVEL`"; §13.2 B-EDIT "a river moved across a wall between two towers"; §16 M3a; J-P34. Both halves of the verifier's scenario ((i) the strip-line cells, (ii) the 26 cm fringe) are inside `R`. | — |
| NP3-3 | ACCEPTED | §4.11 (4) "each land face of `R` takes the district — or the hinterland pseudo-district, or the `wall_strip` typing — of the pre-edit L1 cell that held the larger part of its area (ties by id) (NP3-3). A boundary stretch removed under the water lies between its two bank anchors, so the L0 batch re-separates the land on either bank … a canal across the settlement perimeter leaves the land outside it with the hinterland on both banks"; "The same rule settles a boundary stretch removed on land — a cut way that carried a district boundary … by the larger part"; "*Test (§13.2):* a canal across the perimeter leaves 0 district faces outside the perimeter"; §7.3 (b) 6 the same rule for S1's water operator; §13.2 fixture "a canal across the settlement perimeter — 0 district faces outside the perimeter, the land on both banks the hinterland's"; J-P43. | — |
| NP3-4 | ACCEPTED | §2.7 `Bridge.state: 'site' \| 'built'` "site: two pinned bank vertices, no span, no way, no furniture, not drawn"; `way: Id \| null`; `over: … 'added'`; the Bridges paragraph "A site no way uses by the end of S5 stays a site: not drawn, named, labelled or exported … and available to an epoch's growth, to a drawn bridge within `crossing.snapM` of it and to F-ROUTE's move rung"; §4.2 S1 (5) "**A site becomes a bridge only when a way uses it**" and "**A deck where no site stands** … is placed by **one L0 batch of two same-level shore splits**"; S3 (13) the town bridge the one destination site; §4.1 S4 and edits rows; §4.3 "F-ROUTE's move rung takes another crossing site on the same reach … and its extra-bridge rung, where no site serves, places a new deck by one L0 batch"; §4.4 S5c "snaps to it and continues across that deck to the far bank vertex, which builds the bridge"; §4.8 "S7 builds the furniture of every `built` bridge … and none for a `site`"; §4.11 "an epoch's growth uses the crossing sites S1 and S3 left unused"; §2.2 rule 7 `deck` parenthesis; §5.2 F-ROUTE ladder; §5.3 "every built bridge within ± 10° …; a `site` has no span and is outside every deck row"; §7.3 (b) 2, 4, 9 (C-4: old unused sites matched like decks, new unused sites inserted with the shores, a site over land removed); §7.4 "draw bridges" row; §11.1 "a crossing `site` is not exported"; §13.2 fixture; J-P44, J-I17. Both halves of the scenario ((a) sites' form, (b) the batch that places a new deck after L1 exists) now have one stated mechanism. | — |
| NP3-5 | ACCEPTED | II.1 (3) "Removing the street reverses the step, whether by an undo, by the district's reroll or by any later edit: `removeEdges` takes the `corridor_split` out, … and a plot-line end or footprint corner the step promoted returns to its level by demotion — it kept its `split` flag — so the kerb's L2 route, index and digest, and every ring the step touched, are those before the step (§2.2 rule 3; VK3-3)"; "every ring of the vertex's own level and finer stays as it was, and each coarser ring along the kerb gains it — the neighbour's block at L2, and its plot at L3 when the promoted vertex is an L4 footprint corner"; §2.2 rule 3's demotion step (c) "split restoration"; §4.6 step 7 "(a promoted plot-line end or footprint corner, which returns to its level by demotion when the lane is removed by any edit, §2.2 rule 3; NP3-5)"; §13.1 fixture "by an undo and by a reroll — at a promoted plot-line end and at a promoted footprint corner, the kerb's L2 route and digest, the block's and the plot's rings and the wing rings equal to those before the step". | — |
| NP3-6 | ACCEPTED | §4.2 S3 (4) "`N = 0` produces no main gate and no external arterial through the wall — a harbour outside the stage-1 region still gets the harbour gate of (7) (NP3-6)"; §4.3 "roads leaving the walled stage = N (plus a harbour gate of §4.2 S3 (7) where one was placed: a sealed town's, or the detour guard's; NP3-6)"; §4.8 water gates "and at a **harbour gate** (§4.2 S3 (7): a sealed town's, or the detour guard's; NP3-6)" and "`N = 0` was honoured in S3 (no main gate and no external arterial; a harbour outside the stage-1 region still gets the harbour gate of §4.2 S3 (7))"; §5.2 F-WALL ladder "(N = 0 adds no main gate: a declared sealed circuit, whose harbour outside the stage-1 region still gets its harbour gate, §4.2 S3 (7))"; §5.3 gate row "(its N main gates, plus a harbour gate of §4.2 S3 (7) where one was placed — a sealed town's, or the detour guard's)". Every rule a builder follows now admits the gate; only test wording lags (NP4-5). | — (three test statements still count gates without the harbour gate: NP4-5) |
| NP3-7 | ACCEPTED | §4.2 S3 (4) "**The harbour pick (NP3-7; J-P45).** … When that node lies outside the pick contour, that nucleus's first unforced pick is **forced** at `L*`'s first node beyond the contour … Its gate route's inward part is `L*`'s own prefix (a subpath of a least-cost path is least-cost), so a walled port has a main gate on its harbour side and the harbour route (11) leaves through it. *Measurement (M1):* … p99 of the ratio ≤ 1.5 … *Pre-decided fallback:* the **detour guard** of (7)"; (7) "the **detour guard**: should M1's measurement of the harbour pick fail, a town with gates gets it whenever its best gate-bound harbour route … is longer than 1.5 × `L*`"; (11)'s test "the harbour route is at most 1.5 × `L*` long (4)"; §16 M1 "the harbour pick's measurement on B-CITY walled coastal seeds — p99 … ≤ 1.5, and if it fails the detour guard becomes the default"; §13.2 fixture; J-P45 ("a declared design change to `T` and the gates of harbour towns (no golden exists yet)"). Chosen mechanism, confirming measurement and pre-decided fallback are all stated. | — (an edge case where no unforced pick remains: NP4-4) |
| NP3-8 | ACCEPTED | (a) §4.2 S3 (2) "they are committed in (10) and (12) (NP3-8)"; (b) §4.1 J-P27 "(§12.4's sum, ≈ 255 ms with round 4's counted index copies, to ≈ 267 ms; NP3-8)", and §12.4's critical path reads "≈ 255 ms p50"; (c) §4.5 S7b (3) "*Judgment (J-P41; VP2-3, NP3-8):* chose to exclude the strips from the claim candidates" and the table row J-P41; (d) §2.7 `Enceinte.moat?: Id /* the wet moat WaterBody along the trace, named as `Castle.moat` is … a dry ditch is residue, never this field */`, §4.8 "`ditch` names only this dry residue — a wet moat is a `WaterBody`, named by `Enceinte.moat` and `Castle.moat`", §8.2 "(over the berm, the moat or the glacis)"; grep: 0 hits for `Enceinte.ditch`, `ditch?:`, "(10) and (11)", "257 ms". | — |

**Totals:** 9 ACCEPTED, 0 UNRESOLVED.

## 3. Re-check of earlier FIXED items whose sections changed this round

This round replaced §2.5, §2.6, §2.7, §4.1–§4.8, §4.11 and II.1 by area blocks and edited §4.10, §10.4 and the staged
list at integration; §4.9, §4.12, §10.1–§10.3, II.2–II.6 and PART III are unchanged. `vp4/quotecheck.py` re-found the
quoted mechanism of every row this area accepted before — the 128 ACCEPTED rows of `r1-verify-pipeline.md` §2, the 18
rows of `r2-verify-pipeline.md` §2 and its 18 hand re-checks (§3), and the 11 rows of `r3-verify-pipeline.md` §2 and
its 6 hand re-checks (§3): **181 rows. 123 survive verbatim. 24 carry no double-quoted text** — they cite schema names
and rows (`waterfront: 'open'`, `semiFan`, `outlineTemplate`, `'bandstand'`, `SiteResources`, `interface FamilyUnit`,
`buildingScale: number`, `treatment: 'none'`, `keepShape`, `innerWard`, `street_trees`, `species:`, `enceintes:
Enceinte[]`, `reason: 'prosperity'`, the 0.53 fillet, `IslandRule`, `SewerStrategy`, `EpochInputs`, `contractWall`,
`compose(input`, and the NF-P2 / N-21 / GEO-21 / GEO-38 / COV-FTG-C01 / COV-FTG-G07 citations), each found present
by grep. **34 have a fragment that no longer matches:** 23 are the same round-1 wording round 3 already re-checked
(their round-2 and round-3 re-check quotes still match), and 11 changed this round, each re-checked by hand:

| id | where the mechanism stands now | still holds |
|---|---|---|
| GEO-17 | §4.3 "F-ROUTE's move rung takes another crossing site on the same reach within its search band — one S1 or S3 already emitted, a `site` no way uses yet"; §5.2 F-ROUTE ladder | yes (strengthened by NP3-4) |
| MFP-4 | §4.2 S3 (4) "`N = 0` produces no main gate and no external arterial"; §4.3 "roads leaving the walled stage = N (plus a harbour gate …) and each gate carries one road out and one street in" | yes (NP3-6 wording) |
| NF-P6 | §4.6 step 7 "its end vertex loses its `portal` role (`removeEdges` on its `VertexRef`, §3.4) and is dissolved and its portal and amendment leave the `Seam` record" | yes |
| NF-P7 (r2 and r3 re-check) | §4.1 "L1 by S3 — the map border first — S4, S5, S6, S7, S7b and S8, in that order, and by no generation stage after S9"; "separate L1 transaction" still absent (0 hits) | yes (VK3-8 wording) |
| DEF-10 | §10.4 "recorded in the recipe, or in the `adjust` that adds it, by id, version and content hash" | yes (VD3-3 pack set) |
| VP2-1 | §4.11 footprint (a)–(d) with `R` = ⋃ `C` exactly (NP3-2) | yes (strengthened) |
| VP2-2 | §5.3 "(its N main gates, plus a harbour gate of §4.2 S3 (7) where one was placed — a sealed town's, or the detour guard's)"; §4.2 S3 (11) unchanged | yes |
| VP2-5 | §2.6 `corners?` "S11 records them when it clips a row (VP2-5) or when a rect's sides carry other vertices, and every carry re-indexes them" | yes |
| VP2-7 | the two quoted lines are in the receipt `fixall_pipeline_r2_quarters.out` (2 of 2 found), not the architecture; §2.5, §4.5 and §9.4 still read `min(N_q, L)` | yes |
| VP2-8 | the quoted text was an absence: "later SHADOW" / "later 3-D" still 0 hits; the one-page summary now reads "the optional shadow pass and the 3-D export read real heights" (NP3-9) | yes |

The 13 STAGED-BY-OWNER items keep concrete hooks: stage 2 (`Seam` / `SeamContract`, the `reserve` type, the neighbour
step now reversed exactly by demotion), stage 3 (`outline` / `compose`, `fixedWings`, `BaseWing.corners`, now
`carryWings`), islands and sewers (`SkyIsland`, `Tunnel` with its invert profile, `IslandRule`, `SkyStrategy`,
`SewerStrategy`), evolution (`EpochInputs`, `EvolutionStrategy`, the `ConversionOp` kinds; epochs now build unused
crossing sites) and the village (PART III items 1–5). None regressed to deferral wording; the staged list names only
the seven roadmap subjects. The one hook weakness found is NP4-2 (a stored stage-3 composition is outside the carry).

## 4. New findings

Seven, all minor; none is a blocker or major. Each names its owning area; "introduced" says whether round 4 created the
defect. Every one is PLAUSIBLE (reasoned on the text; no engine exists), except that NP4-1's and NP4-5's contradictions
are read directly from the quoted sentences.

| id | sev. | owner | the defect and its failure scenario | required change |
|---|---|---|---|---|
| NP4-1 | minor | pipeline (II.4) | **II.4's statement of the seam exception omits the wing rings** (introduced: NP3-1 added wing rings to the exception in §4.6 step 7, §7.3 items 1 and 7 (ii) and II.1 (3), but II.4 was not revised). II.4 reads "the neighbouring cells, plots and footprints whose rings pass through those vertices, which change only by them … and the `Seam` records D is party to", while II.1 (3) now says the kerb split adds the vertex "by §2.6's wing-carrying rule, to the wing ring of a building whose footprint fronts that stretch of kerb", and §7.3 item 7 (ii) checks "each excepted neighbour cell, plot, footprint and wing ring". **Scenario:** II.5's M1 exit test — "a New random on each of 20 districts per city changes nothing outside its seam exception (II.4)" — written from II.4 flags the neighbour's `Building` record (its `wings` gained the kerb vertex) as a locality violation on every reroll whose lane lands beside a row house; the same holds for the reroll-isolation acceptance of stage 2 (II.5, M5). | II.4: "the neighbouring cells, plots and footprints whose rings pass through those vertices, and the wing rings of the buildings on them (§2.6's wing-carrying rule), which change only by them … — a promoted vertex returning to its level when the lane goes (§2.2 rule 3)", so II.4, §4.6 step 7 and §7.3 item 1 state one set. |
| NP4-2 | minor | pipeline (§2.6; companions kernel §2.2 rule 5 wording, determinism §7.4) | **A stored stage-3 `Composition` holds world polygons that no rule carries** (exposed by NP3-1: its fix names wing rings as "the one entity record that stores positions of vertices", and the staged list now offers `carryWings` as the stage-3 hook). `Building.composition?: Composition` is "stored only when edited", and `Composition` holds `wings: Wing[]` with `footprint: Polygon`, `courts: Polygon[]`, `towers: Tower[]` with `centre: Point`, and `rooms`. `carryWings` takes only `BaseWing[]`; §2.2 rule 5's exception and §7.4's warp paragraph name only the base wing rings. **Scenario:** at stage 3 a user edits a manor's composition (so it is stored), then warps the street in front of it: the footprint and its base wings move, the stored composition does not — the contract test "the union of the composed wings equals the outline's union exactly" fails, the neighbourhood-LOD roofs and rooms are drawn where the house stood, and the 3-D export disagrees with the map — the NP3-1 failure again, one level down. | §2.6: `carryWings` (or a sibling called in the same pass) also carries a stored `Composition` — each composed wing's and court's ring by rules 1–3 against the moved footprint (boundary runs re-read, inner vertices by mean-value coordinates), each tower centre and room ring by mean-value coordinates — and rule 4's check also requires the composed wings to unite to the footprint; §2.2 rule 5 and §7.4 name the stored composition beside the wing rings and the undo record keeps its former rings; the stage-3 intake runs §2.6's test on a stored composition. |
| NP4-3 | minor | pipeline (§2.6, §4.9 S12b) | **The carry is triggered by S11 and by the edit layer only, so a generation batch after S11 that splits a footprint ring leaves wing rings behind — and generation then differs from Regenerate (keep settings)** (introduced by NP3-1's trigger wording). §2.6: `carryWings` is "called by S11 after its block batch, by the edit layer after every commit that changes a footprint face its building's own S11 batch did not write, and inside a warp's whole-step validation". S12b's L4 batch — per district in the pool and in the hinterland unit — "types yard-planting parts", including `formal_garden` yard parts in a grid layout and a compound's orchard part; an edge of such a part that ends on a footprint wall adds a vertex to that footprint's ring. **Scenario:** at generation no carry runs after S12b, so the manor's wing ring lacks the vertex; a Regenerate (keep settings) of that block re-runs S11 and S12b inside an edit, whose commits do trigger the carry, so the wing ring gains it — the building's leaf digest differs and O9 (c)'s byte identity of Regenerate (keep settings) fails (§16 M3a exit). Rule 1 ("*Boundary runs are footprint runs.*" — "runs of the footprint's rings vertex for vertex") also fails after generation until the next carry. | §2.6: make the trigger stage-agnostic — "`carryWings` runs after every committed batch, in generation or in an edit, that changes a footprint face other than its building's own S11 batch (S12b's and the hinterland unit's L4 batches included)" — and add to §13.2 a Regenerate (keep settings) byte-identity fixture on a rich compound with a formal-garden grid and an orchard part. (The alternative — S12b's L4 edges never end on a footprint ring, checked by a §5.3 row — is acceptable if the pipeline prefers it; one of the two must be stated.) |
| NP4-4 | minor | pipeline (§4.2 S3 (4)) | **The forced harbour pick has no rule when the nucleus has no unforced pick left** (introduced by NP3-7). S3 (4): "that nucleus's first unforced pick is **forced** at `L*`'s first node beyond the contour, after any polycentric forced picks". A polycentric nucleus's first picks are forced at the bearings of its adjacent nuclei; when those forced picks already equal its `N₁` (a nucleus under about 10 ha with two neighbours in a three-nucleus form, whose law gives `N₁` = 2, or a requested `N₁` = 1 in a twin town), there is no pick to force. **Scenario:** a coastal `polycentric` TOWN whose smallest nucleus is nearest the harbour: its only gate faces the neighbouring nucleus, the harbour route wraps round its wall, and nothing bounds the detour — the NP3-7 failure on this form — while the detour guard applies only "should M1's measurement of the harbour pick fail", which a p99 over B-CITY seeds (few polycentric coastal towns) may not reveal. | S3 (4): "If that nucleus has no unforced pick left, the detour guard's harbour gate of (7) applies to it unconditionally"; add a polycentric coastal fixture to §13.2's walled coastal harbour fixtures (harbour route ≤ 1.5 × `L*`). |
| NP4-5 | minor | pipeline (§4.2 S3 (11) test); companions determinism (§5.2 F-WALL test column), scope (§13.2 fixture) | **Three test statements still count gates without the harbour gate** (NP3-6's class, left in test columns; introduced where NP3-7's detour guard adds a harbour gate to towns with gates). §4.2 S3 (11)'s test: "the roads leaving the walled stage equal N (plus the harbour gate when `N = 0`)" — while the prose above it reads "stay N, plus a harbour gate of (7) where one was placed"; §5.2 F-WALL's test column: "`gates = N` exact, 0 non-gate crossings … MFCG baseline: sealed cities at `gates = 0` without fallback"; §13.2's fixture: "roads leaving = N, plus the harbour gate at `N = 0` (VP2-2)". **Scenario:** if M1's harbour-pick measurement fails and the detour guard becomes the default, every walled port that takes the guard's gate fails these three tests though the design requires the gate; a sealed port (one harbour gate) fails "`gates = N` exact" and "`gates = 0`" today. | Word all three as §4.3 and §5.3 do: "N main gates, plus a harbour gate of §4.2 S3 (7) where one was placed (a sealed town's, or the detour guard's)"; in F-WALL, "main gates = N exact" and "sealed cities at 0 main gates". |
| NP4-6 | minor | pipeline (§2.6 rule 4); companion rendering (§12.6) | **The wing check inside a warp's whole-step validation has no stated cost or budget** (introduced by NP3-1). Rule 4 runs, for every building whose footprint a warp step moves, a carry and a union of its wings, and a failed check halves the step (up to 8 halvings), each halving re-running the checks; §12.6 bounds a warp only by "Apply ≤ the scoped-regeneration budget of the touched faces", and neither §2.6 nor §12.6 counts this work. **Scenario:** a 150 m brush over a CITY core moves several hundred buildings; a union per building per step, repeated at each halving, is time the Apply budget never measured — a speed regression the owner cannot see (improvements must be measurable, legibility and speed must not regress). | §2.6 rule 4: skip the union for a building whose every wing is re-read whole by rule 2 (a) (a one-wing house, a row's quad), whose ring is the footprint ring by construction, and state the remaining cost per building; §12.6: count the carry and check in the warp's Apply budget, measured at M3a on a 150 m brush over a CITY core, with a pre-decided fallback (run the union check once, after the final step, and re-derive a failing building by F-REDERIVE instead of halving). |
| NP4-7 | minor | pipeline (§4.2 S3 (10), §4.4); companion determinism (§5.2 F-REDERIVE row) | **Three wording slips about sites and furniture** (introduced by NP3-4). (a) S3 (10): "Every deck has the form of S1 (5)'s: … its span carrying the structural `deck` role. … and S7 builds the bridge furniture on them (§4.8)" — read literally, every canal site at the 150 m spacing gets a span and furniture, against §4.8 "none for a `site`". (b) §4.4 outer moats: "S7 builds its `Bridge` (§4.8)" — the carve's batch (1) places the deck ends "under a fresh `Bridge`" (§3.3 rule 2) and S7 builds its furniture. (c) §5.2 F-REDERIVE's detection and ladder name only "a deck span no longer crosses water" and "A deck over land", not the removal of a `site` left over land that §7.3 (b) 9 states. | (a) "…its span, once a way is laid through it, carrying the structural `deck` role … and S7 builds the furniture of the built ones (§4.8)"; (b) "S7 builds its bridge furniture (§4.8)"; (c) F-REDERIVE: add "a `site` left over land is removed (its `deck_end` rows by `removeEdges`, its record a tombstone; §7.3 (b) 9)". |

**Considered and not raised.** (1) Whether the round-4 typing rule (NP3-3) can hand `wall_strip` to a land face outside a
re-traced run's new strips: a remaining face is the old strip's remnant merged with the block behind it (batch (1)
removes the strip line between them), so the block's larger area decides — no finding. (2) Whether the L1 map border
across water or across hinterland land breaks a reader: both sides of it belong to one overlay (the hinterland) or are
water, §3.3 pool step 3 and II.1's `frame` type read it correctly — no finding (C-2's Fable question answered by
reading, PLAUSIBLE). (3) Whether clearing a strip cell in the carve footprint dissolves vertices on a setback line that
a block outside the footprint shares: the vertices there are the block's own plot-line ends, which keep their incident
edges — no finding.

## 5. Deferral-language scan

**What was scanned.** Every line of §2.5–§2.7, §4 (§4.1–§4.12), §10, PART II, PART III and the J-P rows of the
judgment table — 2 631 lines — for TBD, "to be decided / defined / determined", defer, postpone, later, "at M0", "open
question", "left open", future, eventually, "not yet", "for now", TODO, revisit, "if needed", "as needed", "out of
scope" and "open" (scratchpad `vp4/deferral-hits.txt`: 61 lines).

**Result: no deferral wording.** Every hit is one of three kinds:
* ordinary sequence — "a later `compose()` call", "a later batch that adds a vertex", "each later stage's boundary", "a
  lane a user adds later", "every later smoothing", "pick … later-scored";
* a domain term — an "open" chain or waterfront, "open-field strips", "typed open spaces", "gate passages stay open";
* an owner-staged subject whose hooks are concrete — "the later sewer rules (II.6)", "the evolution engine is the
  owner's later stage (DEF-8); its hooks are concrete now", "PART III — What a later village product needs",
  §10.4's "setting packs later" (D-6, an owner-adopted default whose pack format and loader are decided).

The choices that only an experiment can confirm carry their measurement and pre-decided fallback in the text: the
harbour pick (M1, p99 ≤ 1.5, fallback the detour guard), the wing carry's rare failures (halving inside the warp;
F-REDERIVE after any other batch), the pool (M1 / M2b with the single worker as fallback) and §3.3's clear-region
fixtures (M3a, fallback the plain rule).

## 6. CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed in this lane):** the 181-row quote re-check of the earlier accepted items (123 verbatim, 24 by
name, 34 hand-checked or covered by later re-check quotes; scratchpad `vp4/quotecheck.py` → `.json`); the NP3-1 receipt
`fixall_pipeline_r4_wings.py` re-run, output byte-identical to its committed `.out`; VP2-7's receipt lines present; the
greps behind every "0 hits" claim above (`Enceinte.ditch`, `ditch?:`, "(10) and (11)", "257 ms", "later SHADOW",
"separate L1 transaction"); §12.4's "≈ 255 ms p50" line against J-P27; the deferral scan's 61 hits read in context.
**PLAUSIBLE (reasoning on the text; no engine exists):** that each accepted mechanism defeats its failure scenario in
an implementation, and the seven new findings' scenarios — NP4-1 and NP4-5 rest on quoted sentences that contradict
each other, NP4-2–NP4-4, NP4-6 and NP4-7 on reasoning about paths the text does not state.

## Fable review (2026-09-27) — B-fixall/verify-pipeline-r4

**Verdict: CONFIRMED.** Reviewed by Fable (lane fable-review/main/pipeline, `docs/fable-review/main/pipeline.md`) on the live design (`docs/ARCHITECTURE.md` sha256 1c23190f…, 13 026 lines). The 9 ACCEPTED hold; the 7 new findings were real and every one stands fixed in the live text (NP4-1 II.4; NP4-2 → J-P48; NP4-3 → J-P47; NP4-4 the unconditional detour guard; NP4-5 test wording; NP4-6 → J-P49; NP4-7 wording). NP4-4's law check re-derived (`round(1 + 0.47·√A)` = 2 for 1.1–10.2 ha). No correction.
