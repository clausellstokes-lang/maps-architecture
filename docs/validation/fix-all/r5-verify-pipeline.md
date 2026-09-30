# Fix-all round 5 — PIPELINE area verification (fixall/verify-pipeline-r5)

> PENDING FABLE REVIEW — Opus-produced (fixall/verify-pipeline-r5), not yet checked by a Fable seat; queued in docs/FABLE-REVIEW-QUEUE.md.

Status: COMPLETE (2026-09-26). Verifier seat for the PIPELINE area after integration round 5.

## 0. In plain words

I checked the eight items round 5 set out to fix in the part of the design that builds the town. **All eight are
accepted.** For each, the design now states a concrete mechanism that removes the failure the checker described, with
no postponement:

* When a river is moved or a canal dug, an extra bridge the road needs is placed together with the new water, never
  on the old banks the move is about to remove (VD4-10).
* The rule for what a district re-roll may change next door now includes the roof outlines of the neighbouring
  houses, the same list everywhere it appears (NP4-1).
* A manor-style building layout that a user has edited (a later-stage feature) now moves with its house when the
  ground is dragged, and is checked to still fit it (NP4-2).
* The roof outlines are re-fitted after every step that changes a house outline — gardens included — so regenerating
  a block gives exactly the town that generating it gave (NP4-3).
* A multi-centre port town whose harbour-side centre has no gate left to point at the harbour now always gets the
  harbour gate (NP4-4).
* Every test now counts the harbour gate (NP4-5).
* The time the roof-outline check adds to a drag of the ground is measured, budgeted and has a fallback; I re-ran the
  measurement and got the same numbers (NP4-6).
* Three wording slips about unused bridge sites are corrected (NP4-7).

I also re-checked the 200 earlier items this area accepted in rounds 1–4, because their sections were rewritten. All
of them still hold.

The rewrite exposed **four new problems, all minor**:

* The step that saves an edited building layout lists only the next-door house as affected, but the garden beside the
  house is changed too, so a locality test would fail; and it describes the change at the wrong level of detail
  (NP5-1).
* When a later ring of the town adds a main road that must cross a river, the design does not say whether the usual
  "find another crossing or build an extra bridge" steps apply (NP5-2).
* Two sentences, one about renaming streets from a chosen name list, read the wrong way round (NP5-3).
* Two parts of the edited building layout (rooms and porches) have no written shape, and two different things are both
  called "Tower", so the rule that moves the layout cannot be checked as complete (NP5-4).

Each has a stated fix and an owning area. Nothing is deferred.

**What a Fable reviewer should re-check first:** NP5-1 (the faces the storing edit changes), J-P49's exactness argument
for the tiered wing check, and NP5-2 (whether the main-road step was meant to inherit the road router's fallbacks).

## 1. Scope and method

* **Items checked (the lane's list):** VD4-10, NP4-1, NP4-2, NP4-3, NP4-4, NP4-5, NP4-6, NP4-7, and every earlier FIXED
  item of this area whose sections changed. Sources: `r4-verify-determinism.md` §4 (VD4-10), `r4-verify-pipeline.md`
  §4 (NP4-1–NP4-7), the §R5.1 rows and §R5.2 conflicts of `docs/ARCHITECTURE-VALIDATION.md`, the draft `r5-pipeline.md`
  (§1 disposition, §5) and the integration record `r5-integration-log.md` (C-1 reshaped VD4-10's deck writers).
  `index.json` holds none of these ids (they are round-4 verifier findings), so the verifier files are the sources.
* **Read line by line** in the integrated `docs/ARCHITECTURE.md` (11 477 lines, md5 `bac60dd7ecb828b0f7926a06efa36c74`):
  the title, the one-page summary and §0.11; §2.2 whole (rules 3, 5 and 7 carry the pipeline's companions); §2.6 and
  §2.7; all of §4 (§4.1–§4.12); §10 (§10.1–§10.4); PART II (II.1–II.6); PART III; the staged list; and the sections the
  fixes lean on — §3.3's commit record, same-level-split rule and clear-region rule 2, §3.6's whole-step validation and
  `split`-flag rules, §3.9's stored-positions sentence, §5.2 (every class's "where", and the F-ROUTE, F-WALL and
  F-REDERIVE rows), §5.3's wing, deck and gate rows, §7.3 items 1–7 and (b) 1–9, §7.4's warp paragraph and its
  draw-bridges row, §12.6's warp line, §13.2's fixtures for these items, §13.5's gates row, §16's M3a row and effort
  lines, and the J-P and J-I18 judgment rows.
* **Searched by grep, not re-read:** the rest of the file, for every reader of the terms the fixes touch (`carryWings`,
  `CarriedShapes`, `composition`, `pairing`, `site`, `extra cost`, `extra-bridge`, `added deck`, `gates = N`,
  `roads leaving`, `harbour gate`, `detour guard`, `party_wall`, `interface Tower`, `Room`, `Porch`, `fabricParams`).
* **Acceptance rule.** FIXED is ACCEPTED only when the text holds a concrete mechanism that defeats the item's failure
  scenario (quoted in §2). Deferral wording counts as UNRESOLVED. No item was claimed INVALID or STAGED-BY-OWNER; NP4-2
  is stage-3 subject matter whose hook the fix makes concrete, so it is judged as FIXED.
* **Executed checks (this lane; scripts and outputs under the session scratchpad `vp5/`):**
  1. `vp5/secdiff.py` and `vp5/secwdiff.py`: per-section and word-level diffs of the integrated file against
     `r5i/ARCHITECTURE.pre-r5.md` (md5 `2661eb6826ea537ddcd524941c003e14`); every hunk of the area's sections read.
  2. `docs/validation/bench/fixall_pipeline_r5_wingcost.mjs` (NP4-6's receipt) re-run: non-timing output identical to
     the committed `.out`, timings within 5 % (4.3 s).
  3. `vp5/quotecheck.py` (round 4's script extended to round 4's rows) over the 200 rows accepted in rounds 1–4 (§3).
  4. `vp5/defscan.py`, a deferral-word scan over the 2 672 lines of the area's sections and J-P rows (§5).
* **Parallel round-5 verifications** were not available to this lane; overlap with kernel, determinism, rendering and
  scope findings is not de-duplicated here — each finding names its owning area.

## 2. Verdict table — the round-5 items

| id | verdict | quoted evidence (ARCHITECTURE.md) | required change |
|---|---|---|---|
| VD4-10 | ACCEPTED | §4.2 S1 (5) "**Inside an operator whose water is not yet inserted (VD4-10)** — S1's water operator (§7.3 (b)), which chains S4's, and a carve (§4.11), whose kept ways S4's operator re-routes — the new shores do not exist when the rung fires, so the rung only **sites** the deck, as data, with every other crossing of that operator (§7.3 (b) 2): its two `deck_end` vertices are placed on the way's new route at the new bank points, under a fresh `Bridge`, by the operator's L1 batch (§7.3 (b) 3; §4.11 batch (1)), and promoted to L0 by its L0 batch when the water is inserted through them (§7.3 (b) 4; §4.11 batch (2)); no shore split runs"; the standing-water case now reads "S4 at generation, after S1 and S3 committed every shore; S4's operator in an edit that moves no water"; §4.1 S4 row "L0, only when F-ROUTE's "one bridge at extra cost" rung fires on standing water … inside S1's water operator or a carve … the rung only sites the deck"; §4.1 edits row, §4.3, §5.2 F-ROUTE ladder, §2.2 rule 7 and rule 3's writer list ("S4's or an edit's added deck on standing water … a deck F-ROUTE's rung sites inside a water operator or a carve has L1 rows"), §2.7 `Bridge.over` and Bridges, §7.3 (b) 2–4, J-P44, J-I18. The verifier's scenario (L0 shore splits on the old shores during a river move) cannot be built from the text: every statement of the rung names the operator exception. §3.3 rule 2 ("on each way the operator keeps across the new water, a deck's two bank vertices") already covers the rung's deck. | — (S5b's main-road step, the same router, is outside every enumeration of where the rung fires: NP5-2) |
| NP4-1 | ACCEPTED | II.4 "the neighbouring cells, plots and footprints whose rings pass through those vertices, and the wing rings of the buildings on them (§2.6's wing-carrying rule), which change only by them — the same polygon point for point, checked by comparing the rings with the vertices removed, and a promoted vertex returning to its level when the lane goes (§2.2 rule 3; NP4-1) — and the `Seam` records D is party to. This is the set §4.6 step 7 and §7.3 item 1 state, and the one II.5's reroll-isolation tests check." §4.6 step 7 and §7.3 item 1 carry the same set word for word on the wing rings; §2.6 adds that a stored composition's rings are included wherever II.4 names wing rings. A test written from II.4 now excepts the neighbour's wing ring. | — |
| NP4-2 | ACCEPTED (stage-3 subject; hook concrete) | §2.6 `interface CarriedShapes { wings: BaseWing[]; composition?: Composition /* only when stored … its wing, court and room rings and its tower centres (NP4-2) */ }` in `carryWings`'s signature; "**A stored composition is carried with its wings (NP4-2; Judgment J-P48).** … its world geometry — each composed `Wing.footprint`, each court, each room ring and each tower's centre — is carried in the same `carryWings` call as the base wings, by the same rules: (1) the edit that stores it establishes rule 1 for it in the same batch … (2) boundary runs are re-read by identity and every other point takes its mean-value coordinates … (4) the check adds every carried composition ring simple and counter-clockwise, the composed wings uniting to the footprint face (the stage-3 contract, by rule 4's tiers), every room ring inside the face and every tower centre inside or on it … (5) the undo record keeps the former composition with the former wing rings"; a warp failure halves the step, a rare non-warp failure orphans the record visibly; §2.2 rule 5 "save a building's wing rings and its stored stage-3 composition's rings and tower centres (§2.6)"; §3.6, §3.9, §5.3, §7.3 item 7 (ii), §7.4 ("and, when a stage-3 composition is stored, its wing, court and room rings and its tower centres (§2.6; NP4-2) — are carried with its footprint face in the same pass"); the stage-3 intake "also runs §2.6's test (B-EDIT) with every fixture building's composition stored"; §13.2 hand-built `Composition` fixture; the staged list's stage-3 row. The scenario (a warp leaves an edited manor's composition behind) is defeated: the composition moves in the carry and its union is checked in the step. | — (residual gaps, each a new finding in §4: the faces the storing edit changes besides a row neighbour's footprint, and the level wording, NP5-1; the carried set rests on undefined `Room` / `Porch` types and a clashing `Tower` name, NP5-4) |
| NP4-3 | ACCEPTED | §2.6 "**When it runs is stage-agnostic (NP4-3; Judgment J-P47).** After every committed batch — in generation or in an edit; in the derivation pool, in the hinterland unit or in the generation worker — whose commit record lists a footprint face among the L4 faces it changed, or a vertex of one among the vertices it moved (§3.3), the batch's writer runs `carryWings` for that face's building before its next batch"; §3.3's `CommitRecord.faces` is "the dirty set, per level ≥ the batch's level", so S12b's L3 and L4 batches report the footprints they change; §4.1 S12b row "each batch whose commit record changes a footprint face's rings — a formal-garden grid line or an orchard part's edge ending on a house wall — is followed by §2.6's carry"; §5.3 wing row "after the carry that follows every later committed batch changing a footprint face, in generation or in an edit"; §13.2 "and of a block holding a rich compound whose yard has a formal-garden grid and an orchard part with edges ending on the house wall — byte-identical to the one-click result, the wing rings after generation already carrying those wall vertices"; J-P47. Generation and Regenerate (keep settings) now run the same carries. | — |
| NP4-4 | ACCEPTED | §4.2 S3 (4) "**If that nucleus has no unforced pick left (NP4-4)** — its `N₁` taken by polycentric forced picks: a nucleus of under about 10 ha between two neighbours, whose law gives `N₁` = 2, or a twin town's requested `N₁` = 1 — no pick is forced and its forced picks stay; the detour guard of (7) applies to that town unconditionally, whatever M1's measurement finds, so its harbour route is bounded by 1.5 × `L*`"; (7) "and, whatever that measurement finds, when the nucleus nearest the harbour had no unforced pick left to force ((4); NP4-4)"; (11)'s test and §13.2's walled coastal fixtures add "a polycentric coastal town whose nucleus nearest the harbour has no unforced pick left (NP4-4)" with "the harbour route at most 1.5 × `L*`"; J-P35, J-P45. Checked the law: `N₁` = round(1 + 0.47·√A) = 2 for 1.1–10.2 ha, so the stated case is the real one. | — |
| NP4-5 | ACCEPTED | §4.2 S3 (11) test "the roads leaving the walled stage equal its N main gates, plus a harbour gate of (7) where one was placed (a sealed town's, or the detour guard's; NP4-5)"; §5.2 F-WALL test "main gates = N exact, and the roads leaving each walled stage equal its N main gates, plus a harbour gate of §4.2 S3 (7) where one was placed … MFCG baseline: sealed cities at 0 main gates without fallback"; §13.2 "roads leaving = the N main gates, plus a harbour gate of §4.2 S3 (7) where one was placed"; §13.5's towers-and-gates row the same (a fourth statement the area found). Grep: "gates = N" survives only in MFCG descriptions (l. 430, §13.5's reference cell). | — |
| NP4-6 | ACCEPTED | §2.6 rule 4 "It is decided exactly, at the least cost, by the building's **pairing** … (i) a building whose every wing is re-read whole by rule 2 (a) — a one-wing house, a row's quad — needs no union … (ii) a building whose pairing holds … needs only every carried ring simple and counter-clockwise … (iii) a building whose pairing fails … is checked by the kernel's boolean union"; "*Cost (NP4-6; measured …)*: ≈ 0.06 µs for a row's quad, ≈ 0.4 µs for a one-wing rect … ≈ 0.4 ms per pass and ≈ 3.6 ms in the worst case of a step and eight halvings, inside §12.6's warp Apply budget, which counts it and which M3a measures on that brush"; "*Pre-decided fallback* if M3a finds that budget exceeded: the wing check leaves the whole-step validation — it runs once, after the final step, and a building that fails it is re-derived by S11 on its plot (F-REDERIVE, reported)"; §12.6 warp line with measurement and fallback; §16 M3a exit "the warp cost measurement — a 150 m brush over a CITY core on B-CITY-lite seeds … (NP4-6)"; §3.6, §5.3, J-P49. Receipt re-run (§1 check 2): non-timing lines identical, timings within 5 %; the winding-number argument for (ii) checked by hand (a pairing that cancels every inner edge makes the rings' winding numbers sum to the face's; simple counter-clockwise rings then cover each interior point once). | — |
| NP4-7 | ACCEPTED | (a) §4.2 S3 (10) "Every deck has the form of S1 (5)'s, and its two states: … its span, once a way is laid through it, carrying the structural `deck` role beside `way` — a `site` until then. … and S7 builds the furniture of the built ones (§4.8; NP4-7)"; (b) §4.4 outer moats "the `deck_end` rows of a fresh `Bridge`, `built` with that arterial as its way (§2.7)" and "S7 builds its bridge furniture (§4.8; NP4-7)"; (c) §5.2 F-REDERIVE detection "a crossing `site` whose bank vertices no longer stand on a shore of its reach" and ladder "**A site over land** … the site is removed — its `deck_end` rows by `removeEdges` on their `VertexRef`s, its record a tombstone (§2.7; §7.3 (b) 9; NP3-4, NP4-7)". | — |

## 3. Re-check of earlier FIXED items whose sections changed this round

This round replaced §2.6, §2.7, §4.1–§4.4 and II.4 by the pipeline area's blocks and edited §10.4, II.1, II.2, the
staged list and the J-P rows at integration (a word diff of every one of these sections against the pre-integration
file, `r5i/ARCHITECTURE.pre-r5.md`, was read in full: `vp5/wd1.txt`, `vp5/wd2.txt`); §4.5–§4.12, §10.1–§10.3, II.3,
II.5, II.6 and PART III are unchanged. Every change in the area's sections is an addition or a qualification — the
operator exception of VD4-10, the stage-agnostic trigger, the stored composition, the pairing tiers, the harbour-gate
wording, the site/built wording — and none removes a mechanism an earlier row relied on.

`vp5/quotecheck.py` (round 4's script extended to round 4's own rows) re-found the quoted mechanism of every row this
area accepted before — the 128 ACCEPTED rows of `r1-verify-pipeline.md` §2, round 2's 18 rows and 18 re-checks, round
3's 11 rows and 6 re-checks, and round 4's 9 rows (§2) and 10 re-checks (§3): **200 rows. 134 survive verbatim. 26
carry no double-quoted text** (schema names and citations — `waterfront: 'open'`, `semiFan`, `outlineTemplate`,
`'bandstand'`, `SiteResources`, `interface FamilyUnit`, `buildingScale`, `treatment: 'none'`, `keepShape`, `innerWard`,
`street_trees`, `species:`, `enceintes: Enceinte[]`, `reason: 'prosperity'`, the 0.53 fillet, `IslandRule`,
`SewerStrategy`, `EpochInputs`, `contractWall`, `compose(input`, and round 4's VP2-1 footprint and VP2-7 `min(N_q, L)`
re-checks), each found present by grep (1–7 hits each; `min(N_q, L)` 7, "is `R` = ⋃ `C`, exactly" 1). **40 have a
fragment that no longer matches:** the 34 of round 4, whose missing fragments are exactly those round 4 re-checked
(0 newly missing for any round-1–3 row), and 6 of round 4's own rows, each re-checked by hand:

| id | where the mechanism stands now | still holds |
|---|---|---|
| NP3-1 | §5.3 "every building's wing rings — and a stored composition's composed wings — are simple and counter-clockwise and unite to its footprint face exactly (integer equality), after S11's first carry and after the carry that follows every later committed batch changing a footprint face" | yes (strengthened by NP4-2, NP4-3) |
| NP3-5 | II.1 (3) "a plot-line end or footprint corner the step promoted returns to its level by demotion — it kept its `split` flag, which only a warp that has since moved it or the kerb vertices beside it clears … — so the kerb's L2 route, index and digest, and every ring the step touched, are those before the step" | yes (VK4-3's amendment) |
| NP3-7 | §4.2 S3 (7) "the **detour guard**: should M1's measurement of the harbour pick fail — and, whatever that measurement finds, when the nucleus nearest the harbour had no unforced pick left to force ((4); NP4-4) — a town with gates gets it whenever its best gate-bound harbour route … is longer than 1.5 × `L*`" | yes (extended by NP4-4) |
| NP3-8 | the quoted fragment "(10) and (11)" was an absence; still 0 hits, and S3 (2) still reads "committed in (10) and (12) (NP3-8)" | yes |
| NF-P7 (r4 re-check) | "separate L1 transaction" was an absence; still 0 hits; §4.1 "L1 by S3 — the map border first — S4, S5, S6, S7, S7b and S8, in that order, and by no generation stage after S9" | yes |
| VP2-8 (r4 re-check) | "later SHADOW" was an absence; still 0 hits | yes |

Receipts the earlier rows rest on: `fixall_pipeline_r4_wings.py` / `.out` unchanged since round 4 (13.9 s re-run then,
byte-identical); `fixall_pipeline_r2_quarters.out` unchanged (27 lines). The **13 STAGED-BY-OWNER items** keep concrete
hooks: stage 2 (`Seam` / `SeamContract`, the `reserve` type, the neighbour step reversed by demotion), stage 3
(`outline` / `compose`, `fixedWings`, `BaseWing.corners`, `carryWings`, now `CarriedShapes` with the stored
composition), islands and sewers (`SkyIsland`, `Tunnel`, `IslandRule`, `SkyStrategy`, `SewerStrategy`), evolution
(`EpochInputs`, `EvolutionStrategy`, the `ConversionOp` kinds) and the village (PART III items 1–5). The staged list
still names only the seven roadmap subjects; round 5's one staged subject (stage 3) gained its hook and nothing
regressed to deferral wording.

## 4. New findings

Four, all minor; none is a blocker or major. Each names its owning area; "introduced" says whether round 5 created the
defect, "exposed" that round 5's text made a pre-existing gap load-bearing. All are PLAUSIBLE (reasoned on quoted text;
no engine exists) except NP5-3, whose wording defects are read directly off the text.

| id | sev | owner (sections) | finding and failure scenario | required change |
|---|---|---|---|---|
| NP5-1 | minor | pipeline (§2.6 NP4-2 rule (1); §4.1 S11 row); companion determinism (§7.3 item 7 (ii) reads the set) | **The edit that stores a composition names only a row neighbour's footprint among the faces its new boundary vertices change, and calls every such insertion an L4 same-level split** (introduced by NP4-2's rule (1); the party-wall level contradiction it leans on is pre-existing and exposed). Rule (1) inserts every boundary point of the composition's rings into the footprint ring "as a shape vertex (an L4 same-level split, which never dissolves, §2.2 rule 3 …)" and states that "a footprint that shares the split edge — a row neighbour's party wall — gains the same collinear vertex, and that neighbour's footprint and wing rings are in the edit's effective scope". But a footprint's walls are shared with other L4 faces too — the building's own yard parts beside every wall of a set-back house, and across a plot line the neighbouring plot's yard part — and §3.3 says a same-level split "adds that vertex to the outside faces' rings". **Scenario:** B-EDIT's own fixture (§2.6's Test: "its composed wings the base wings each cut in two") on a set-back house: each cut ends on the footprint wall, the yard part beside that wall gains the vertex, and §7.3 item 7 (ii) — "every entity outside the effective scope keeps its leaf digest" — flags the yard part (or its `yard_planting` greenery) as a locality violation, or an implementer widens the scope ad hoc. Second, the level wording holds only on an L4 edge: a row house's party wall is the plot's side line, an L3 edge (§4.7 S10 "Party walls are shared L3 edges carrying the `party_wall` role"; S11 "every party wall is the plot side line"), and its front lies on the L2 kerb, so there the L4 batch places a Steiner vertex by `splitThrough`, which carries the `split` flag and is dissolvable (§2.2 rule 3) — not "a same-level split, which never dissolves"; and §4.1's S11 row still says "a row's party walls are one shared L4 edge, §4.7", contradicting §4.7. | §2.6 rule (1): "every face that shares a split edge — the building's own yard parts, a row neighbour's footprint across a party wall, a neighbouring plot's L4 face across the plot line — gains the vertex and is in the storing edit's effective scope, each ring equal to its prior ring with those vertices removed (§3.3's same-level-split rule; the check of §7.3 item 7 (ii))"; state the level: a same-level L4 split on an L4 edge, an L4 Steiner vertex placed by `splitThrough` on a plot line or kerb (the composition's point re-read at the placed vertex), and give each inserted vertex an indexed vertex role row of the building while the composition is stored, so no dissolution removes it (§2.2 rule 7: a vertex with a live role row never dissolves), the row leaving with the composition on undo or orphaning; §4.1's S11 row: "a row's party wall is the plot's shared L3 side line carrying the `party_wall` rows (§4.7)". |
| NP5-2 | minor | pipeline (§4.4 S5b, §4.1 S5 row and L0-writer sentence); companions determinism (§5.2 F-ROUTE "where" column), scope (J-I18's L0-writer list) | **S5b's main-road step routes with the S4 router but no failure ladder covers it, so whether F-ROUTE's move and extra-bridge rungs — and the extra bridge's L0 batch — run there is unstated** (pre-existing; exposed by VD4-10, whose fix enumerates where the rung fires: "S4 at generation, after S1 and S3 committed every shore; S4's operator in an edit that moves no water"). S5b (generation stages k ≥ 2 and every epoch) "routes each with the incremental S4 router … to the frame at its bearing" (§4.4), and §4.3 says it "runs this same router incrementally"; but F-ROUTE's "where" is "S4, S4's local operator (§7.3)", no other class of §5.2 names S5b, §4.1 says "L0 is therefore written by S1, S3, S4 (F-ROUTE's extra bridge only) and S5a", its S5 row lists no L0 batch for S5b, and J-I18's L0 `deck_end` writers omit it. **Scenario:** a CITY whose stage-2 primary must cross the river beyond the inner wall where the sites within the search band cannot be approached within the primary's minimum radius (a tight meander): an implementation either marks the destination `unserved` without trying another site or an extra bridge (a missing main road the ladder exists to prevent, O4 (a)), or writes an L0 shore-split batch during S5b that §4.1 and J-I18 say never happens — two implementations, two towns. | Pre-decide and state it: add S5b (and the epoch's S5b) to F-ROUTE's "where"; §4.1's S5 row "k ≥ 2 — S5b L0, only when F-ROUTE's extra-bridge rung fires on standing water: the new deck's two `deck_end` vertices by two same-level shore splits, before S5b's L1 batch"; add S5b to the L0-writer sentence and to J-I18's L0 rows; §4.4 S5b a pointer to F-ROUTE. (Or, if the pipeline prefers, state that S5b's ladder is F-ROUTE's move rung, then the slope rung, then `unserved`, with no extra bridge — one of the two must be stated.) |
| NP5-3 | minor | pipeline (§10.4); determinism (§7.4) | **Two sentences whose modifiers attach to the wrong thing** (introduced at integration: §10.4's VD4-5 coherence edit; §7.4's X-D4 fold). (a) §10.4: "selecting it therefore re-draws exactly the unedited names drawn from that field — never the row's other names, listed for confirmation (§6.3 case (4))" reads as though the names that are *not* re-drawn are the ones listed for confirmation. (b) §7.4's warp paragraph ends "… halving the step when it fails, as for a held pin (§3.6) — the composed wings uniting to the moved face, its rooms inside and its tower centres inside or on it, by §2.6's stored-composition rule", a dangling clause whose "its" has no antecedent (the composition is not named in the sentence). **Scenario:** a reader — the owner, or a builder working from §10.4 alone — takes the confirmation list to hold the untouched names; legibility regresses where the owner reads the naming rules. | (a) "re-draws exactly the unedited names drawn from that field, listed for confirmation (§6.3 case (4)), and never the row's other names"; (b) "… as for a held pin (§3.6); for a stored composition the check also requires its composed wings to unite to the moved face, its rooms to lie inside it and its tower centres inside or on it (§2.6)". |
| NP5-4 | minor | pipeline (§2.6 schemas; stage-3 hook) | **The carried set of a stored composition rests on two undefined types and a clashing name** (exposed by NP4-2, which makes "each composed `Wing.footprint`, each court, each room ring and each tower's centre" the whole of a stored composition's world geometry). `Composition.rooms?: Room[]` and `Wing.porch?: Porch` name types defined nowhere in the document (grep: 0 definitions), so whether a room is one ring and whether a porch stores world points is unstated; and §2.6's `interface Tower { centre: Point; … }` shares its name with §2.7's wall `interface Tower { id; enceinte; vertex: VertexRef; … }` in the one `@plat/model` schema set, where two `interface Tower` declarations merge silently into one type. **Scenario:** a stage-3 generator stores a porch as a world polygon — a porch stands outside the wall line, beyond the union the contract checks — and a warp then moves the house, its composed wings, courts, rooms and towers, but leaves the porch where the house stood: NP4-2's failure for one field, which neither rule 4's check nor the intake test would see. | §2.6: define `Room { ring: Polygon /* world lattice points inside its wing */; wing: number; subLocation?: Id }` and `Porch` in relative form (its wing's side index, the offset and width along that side, its depth — no world point), or add the porch's ring to the carried set and the check; rename the composition's tower (e.g. `ComposedTower`) so "a tower centre" in the carry names one type. |

**Considered and not raised.** (1) §4.8's "roads leaving each walled stage = its gate count" is prose whose count §5.3
defines ("its N main gates, plus a harbour gate … where one was placed"); every test statement now carries the full
wording (NP4-5). (2) NP4-6's fallback with a stored composition or a locked building: under the fallback a failing
building is re-derived by F-REDERIVE, whose ladder returns a locked entity to the dry run as F-EDIT and whose
re-derivation makes the stored composition fail its own check, orphaned visibly by §2.6 — covered. (3) NP4-3's cost at
generation: the carries after S12b touch only the footprints a garden grid or orchard edge meets (compounds), at
≈ 1–3 µs a building (the r5 bench) — negligible beside S12b's own work. (4) A carry after a batch that only adds or
dissolves vertices needs no snapshot of the "before" rings: rule 1 makes the stored wings' union boundary equal to
them. (5) `Bridge.over` for a rung's deck inside an operator with no other deck: the operator's kind fixes the value
(S1's water operator, a carve). (6) §2.7's Bridges paragraph lists an outer moat's arterial among the operators inside
which the rung may site a deck; the rung never fires there (a moat deck is fixed at its gate, §4.3), so the entry is
harmless over-inclusion.

## 5. Deferral-language scan

`vp5/defscan.py` scanned the 2 672 lines of the area's sections (§2.6–§2.7, §4, §10, PART II, PART III, the staged
list) and the J-P rows for TBD, TBC, "to be decided / determined", defer\*, postpon\*, later, future, eventually,
"not yet", revisit, follow-up, "for now", "open question", "at M0", undecided and pending (banners excluded): **50
hits, none a deferral.** 40 × "later" are order words ("a later batch", "every later smoothing", "each later stage's
boundary", "a later `outline()` call", "a later table edit") or name owner-staged subjects (the evolution engine,
"a later village product", the staged layers "adding them later is a registration"); 4 × "not yet" are VD4-10's
"whose water is not yet inserted" (an order inside an operator); "pending claims" (§4.6) is the allocation's queue;
"defers / defer / deferrals / deferred" are the staged list's own negations ("this document defers nothing",
"staged by the owner, not deferred"). One phrase was read closely: §10.4's "the owner's adopted default 'setting packs
later' (D-6)" names the owner's decision on pack *content*; the pack format, loader, override layer and one shipped
pack are decided and built (§10.4, §7.6), and adding a pack is a file — not a deferred mechanism. The measurements
the round-5 fixes depend on each carry a pre-decided fallback: the wing check's cost (M3a; one check after the final
step and F-REDERIVE) and the harbour pick (M1; the detour guard, now unconditional for a nucleus with no unforced pick).

## 6. CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed in this lane):** the pipeline sections and the sections the fixes lean on were read line by line
in the integrated file (md5 `bac60dd7ecb828b0f7926a06efa36c74`, 11 477 lines; §1); every changed section of the area
was word-diffed against `r5i/ARCHITECTURE.pre-r5.md` and every hunk read; `vp5/quotecheck.py` re-found the quoted
mechanism of all 200 rows this area accepted in rounds 1–4 (134 verbatim, 26 by grep of their schema anchors, 40 with
fragments whose changes were each re-checked — 34 by round 4, 6 here); the NP4-6 receipt
`docs/validation/bench/fixall_pipeline_r5_wingcost.mjs` re-run in 4.3 s: every non-timing line identical to the
committed `.out` (pass rates, pairing verdicts, 20 000 / 20 000 agreements at 1 m, 75 884 / 75 884 at 8 m with 3 574
failing) and the timings within 5 % (mix 385 ns against 381 ns per building per pass; 0.17 ms per pass for 450
buildings), matching §2.6's ≈ 0.4 ms per pass and ≈ 3.6 ms worst case once the overlapping unions' ≤ 25 µs bound is
added; §3.3's `CommitRecord.faces` lists changed faces "per level ≥ the batch's level" (NP4-3's trigger reads it);
`N₁` = round(1 + 0.47·√A) = 2 exactly for 1.1–10.2 ha (NP4-4's case); `Room` and `Porch` have no definition and
`interface Tower` is declared twice (NP5-4); no failure class of §5.2 names S5b (NP5-2); the deferral scan (§5).
**PLAUSIBLE (reasoning on the text; no engine exists):** that each accepted mechanism defeats its failure scenario in
an implementation — in particular J-P49's winding-number argument (checked by hand and by the bench, not proved for
every ring shape) and that a warp step never adds or removes a vertex, so the pairing holds through its halvings; and
the four new findings' scenarios, which rest on paths the text does not state (NP5-1's yard part, NP5-2's meander,
NP5-4's porch) or, for NP5-3, on reading.

**What a Fable reviewer should re-check first:** (1) NP5-1 — whether the storing edit's effective scope should be the
building's whole plot plus the faces across its plot lines, and whether the Steiner-vertex case needs the role-row
guard or only the wording; (2) J-P49's exactness claim for tiled wings, which now carries the warp budget; (3) NP5-2 —
whether S5b was meant to inherit S4's ladder by "the same router", in which case the fix is a pointer and §4.1's L0
list.

## Fable review (2026-09-27) — B-fixall/verify-pipeline-r5

**Verdict: CONFIRMED.** Reviewed by Fable (lane fable-review/main/pipeline, `docs/fable-review/main/pipeline.md`) on the live design (`docs/ARCHITECTURE.md` sha256 1c23190f…, 13 026 lines). The 8 ACCEPTED hold; the 4 new findings were real and every one is fixed in the live text (NP5-1: J-P48 (1) names the yard parts and the neighbouring plot's L4 face, states the level per edge and the `composition` vertex role row, and §4.1's S11 row is corrected; NP5-2: S5b routes under F-ROUTE's ladder with its L0 shore-split batch in §4.1's S5 row and L0-writer sentence; NP5-3 (a) §10.4 re-ordered; NP5-4: `Room`, `Porch` and `ComposedTower` defined). No correction.
