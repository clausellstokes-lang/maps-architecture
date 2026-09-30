# verify-pipeline-r1 — lane amendments-b/verify-pipeline-r1 (re-verify the PIPELINE part after repair round 1)

> PENDING FABLE REVIEW — Opus-produced (amendments-b/verify-pipeline-r1).

> PROGRESS (kill-safe ledger; a seat that continues this lane reads it first):
> STEP 0 skeleton: done (2026-09-27)
> STEP 1 inputs read (assemble-r1, verify-pipeline-r0, repair-pipeline-r1 report, the 30 other-part issues routed to pipeline): done
> STEP 2 part diff (pre-repair archive vs live): done (18 replaced subsections, 87 hunks; unreplaced §4.3/4.4/4.8/4.10/4.12/10.1/10.3/II.2/II.5 byte-identical); repaired subsections read whole: done
> STEP 3 per-issue re-check of the 56 pipeline-routed repairs + r0 issues owned elsewhere: done (§2, §3)
> STEP 4 per-item verdicts re-judged for the repaired items: done (§4)
> STEP 5 checks (single-source, stale, cross-part, deferral, references, new problems): done (§5)
> STEP 6 issue list: done (18 issues, all minor: pipeline 13, determinism 3, scope 1, kernel 1)
> STEP 7 Fable queue row + LANDED line: done (row B-amendments-b/verify-pipeline-r1 appended; LANDED line written)

Lane `amendments-b/verify-pipeline-r1`, 2026-09-27. Part verified: PIPELINE (`## §4 `, `## §10 `, `# PART II`, `## II.`,
`# PART III`) of `docs/ARCHITECTURE.md` at sha256 `365e19f24743c88a5814e5cfddcc086ee961b03c0cd4697fab9afe5f23d0a2b3`
(assemble-r1's installed hash, unchanged from the first read to the last).

## 0 Outcome

The repair holds. All 56 issues routed to the pipeline (57 §Ab.1 rows, V-MAB-29's wording included) are fixed in the
live text, each quoted in §2; the 13 r0 issues of this part's report owned by other parts are fixed too, except that
§7.4's `builtBand` row and §7.6's table list trail the repair (§3). Every home item is now PRESENT except 26 and 31,
which are PARTIAL on minor contradictions the repair introduced; every referencing item is PRESENT (§4). The retired
texts are gone (25 probes, §5), the resolver finds 0 broken references in the part, and no deferral wording entered.

**18 issues remain, all minor (0 blocker, 0 major):** 13 pipeline, 3 determinism, 1 scope, 1 kernel (§6). They cluster
where the repair wrote new mechanism: rung 2's back court (the front plot's lineage against §6.3's SPLIT rule, VP1-01;
an `amalgamate` that builds nothing has no `builtBand` rule, VP1-04; "moves it only through rung 3", VP1-02, VP1-03),
the farm modes (farm households still placed by the hinterland unit under `perimeter`, a `farmsteads` field-system
preset beside a farmstead-free mode, VP1-06; no shortfall rule for `rivers`, VP1-07; T26-2, VP1-08), `portRef`'s
maintenance pointing at the staged corpus interface (VP1-09), the dossier fallback's "first closest option" against
§7.7's "best-scoring site" (VP1-10, VP1-11) and the condition table read per record while the tunnel conversions take a
stretch (VP1-12). One cross-part note addressed to the pipeline was not reflected: the determinism seat's rung-1 roof
loss (VP1-05). Every issue has a mechanical required change; none needs a new ruling beyond the vetoable directions
named in §7.

## 1 Inputs read

* The route objects of items 8, 10–20, 22–31 (`route.json`) and the owner's words of items 8–31
  (`docs/AMENDMENTS-2026-09-25b.md`, re-read for items 20, 24 and 26 whose mechanism the repair changed).
* `assemble-r1.md` whole (the 18 pipeline REPLACE blocks, the hand-offs, §8's notes), the §Ab.1 changelog rows,
  `repair-pipeline-r1-report.md` whole, my `verify-pipeline-r0.md` whole, and the 30 other-part issues the repair
  answered (verify-model-r0 V-MAB-05, -07, -10, -11, -13, -20, -29, -39, -40, -42; verify-kernel-r0 VK-05, -27, -28,
  -29; verify-determinism-r0 VD-06, -07b, -08b, -10a, -12b, -14a, -15, -16, -17, -23, -35a, -37; verify-scope-r0 VS-02,
  -17, -29), extracted verbatim (scratchpad `vp1/other-issues.txt`).
* The cross-part notes addressed to the pipeline: determinism's "Cross-part dependencies", model's "Cross-part
  follow-ups", rendering's "Cross-part notes", scope's §3 (4), kernel's preamble (3), and the pipeline seat's own §3.
* The part diff against `docs/archive/ARCHITECTURE-pre-amendments-b-repair-r1-2026-09-27.md` (sha256 `87d89692…`), by a
  per-subsection script (`vp1/secdiff.py`, output `vp1/part-diff.txt`, 87 hunks, read whole): exactly the 18 replaced
  subsections changed; §4.3, §4.4, §4.8, §4.10, §4.12, §10.1, §10.3, II.2, II.5 and the §4, §10, PART II and II.7
  introductions are byte-identical to the archive.
* Read whole in the live document: §4.1, §4.2, §4.5, §4.6, §4.7, §4.9, §4.11, §10.2, §10.4, II.1, II.3, II.4, II.6,
  II.7.1–II.7.4 and PART III. Read for the cross-part checks: §2.2 rule 2, §2.5 `knownTo` and `ContextVector.arena`,
  §2.6 cellar and condition sentences, §2.7 `Tunnel`, §2.8 `Existence`, §3.4's arena paragraph, §3.7 l. 2936–2942,
  §5.3's epoch row, §6.1's appended concerns, §6.3's JOIN and SPLIT bullet, §7.1's edit-target rows, §7.3's
  canonical-prior and stored-plan rows, §7.4's convert, `builtBand` and epoch rows, §7.6's table list, §7.7's
  precedence, `Rejection` and item 6, §8.5 and §8.6's stale-rung sentences, §12.6, §13.2's T8-7, T24-1, T25-1, T26,
  T31-9, §13.7's item-24 row, §13.9, §14's `@plat/plots` and `@plat/tables` lines, the Staged sewers row, and the index
  rows and Part A entries of J-A20.41, J-A20.74, J-A23.41, J-A24.43, J-A26.43, J-A26.44, J-A28.42, J-A28.71, J-A28.72,
  J-A31.40, J-A31.43, J-A31.44, J-A31.48, J-A31.72, J-A31.75.

## 2 The repair, issue by issue (the 57 §Ab.1 rows the pipeline seat answered)

FIXED = the required change (or an equivalent the verifier accepts) is in the live text; the quote is the live wording.
"+ VP1-n" names a residue this round raises.

| issue | verdict | where; the live wording |
|---|---|---|
| VP-01, VK-05 | FIXED | II.6 l. 11636–11650: "A settlement has 0–3 islands by the island rule below — with the model setting on, the rung, the count slots and the supply decide them, and the view toggle only shows them"; "Its hook interfaces, `IslandRule` and `SkyStrategy`, have one declaration each, after the island rule below"; the retired code block gone (fences 110 → 108); one `interface IslandRule`, one `interface SkyStrategy` in the part |
| VP-02, V-MAB-10, VK-29 (2) | FIXED + VP1-12 | II.6 l. 11731–11743: "**The condition table** — the one statement of a tunnel's condition …", columns condition · `existence` · `Tunnel.closure` · `open` · reached by, five rows; "never a second stored state (J-A11.21)"; II.7.3 l. 11916 and l. 11968 read "the `open` column of II.6's condition table" |
| VK-29 (1) | FIXED | II.7.1 l. 11808: "(§2.2 rule 2)"; rule 2 (l. 495–503) states that cross-arena links are entity ids |
| VP-03, VK-27, VD-14a | FIXED | §4.1 l. 3280–3285: "(an unstored rung; a stored plan is re-cut inside the changing event instead, §7.3, J-A28.72) … re-derives it from its canonical prior — committed state, never the cache (§6.2)"; II.4 l. 11597–11599 a pointer; J-A28.42 index l. 12676 and Part A read "from its canonical prior (J-A28.71), never from the cache"; "by mutating the cached" occurs 0 times |
| VP-31 | FIXED | §4.1 l. 3286–3288: "town-wide by S2, S7b and S10a …, and per plot by S10b, which the first paint runs for every district ahead of S11" |
| VD-35a | FIXED | §4.1 l. 3257–3260: the bullet is a pointer to §7.6's rule, reading rule and marker (J-A23.71); J-A23.41 restated |
| VP-23 | FIXED | §4.2 l. 3443–3444 (S2), l. 3524 (S3 (2)), l. 3676–3677 (S3 (12)): every secondary market is S7b's "except a polycentric nucleus's plaza, which S3 (12) ranks secondary" |
| VS-02 | FIXED + VP1-09 | §4.2 l. 3650–3654 "kind 1.0, trade 0.6 × min(1.5, p ÷ `portRef`)"; l. 3658–3666 "**The defaults compared** … 1.6 at the median port … the two equal at `p` = ⅚ `portRef`"; J-A24.43 new. Arithmetic checked: 1.0 + 0.6x = 1.5 at x = 5⁄6 |
| VD-07b | FIXED | §4.2 l. 3695: "because the base derivation reads the same creation prefix of the log (§7.4)"; §7.4 l. 6815 states the one read-ahead |
| VS-17 | FIXED + VP1-06, VP1-07, VP1-08 | §4.9 l. 4728–4751: "FTG has four farmland settings: three layouts — `Farmsteads`, `Around perimeter` and `Around rivers` — and a `Default`"; `FarmModeRow { …; mode: 'fill'\|'perimeter'\|'rivers'; riverBandM: M }`; `ClimateTable.farmLayout`; §4.2 S2 l. 3452–3453; J-A26.43 restated, J-A26.44 new |
| VP-13 | FIXED | §4.5 l. 4097–4102: the paragraph follows S7b (6) and reads "§4.11's geometry floor reads `FieldBands.middle` as the band-set bullet above designates it (J-A27.42, J-A31.45)" |
| VP-26 | FIXED | §4.5 l. 3974–3975: "replaces the typing of the districts of lowest mean pass-1 band, as many as its demand fills" |
| V-MAB-07 | FIXED | §4.6 l. 4252: "`knownTo` … takes §2.5's default"; §2.5 l. 860 holds the default |
| VP-08, VD-12b (§4.6 half) | FIXED | §4.6 l. 4279–4280: "`thin … back_court` clears one — its households re-homed and its buildings vacated first, as §4.11's rung 2 states" |
| VP-14 | FIXED | §4.7 l. 4571–4574: one pins statement "by rank: the principal one per ≈ 150 m² of square (≤ 40), a secondary one per ≈ 200 m² (≤ 20)"; l. 4578–4580 a pointer; "the market square's" 0 |
| VP-15 | FIXED | §4.7 l. 4478–4479 "the material rule, texture and colour only, is §2.6's (J-A19.42)"; l. 4514 "(COV-FTG-F20; §2.6)" |
| VP-25 | FIXED + VP1-15 | §4.11 l. 4969–4972: "A **block-level read** … `max(block band, the floor of its standing plots' area-weighted median)` … the floor at which their cumulative area first reaches half their total; a plot-level read takes the plot's own (J-A31.43)"; §4.7 S10 (2) l. 4330–4331 and II.3 l. 11563–11564 point to it |
| VP-28, VD-16 | FIXED | §4.7 l. 4424–4429: "§7.7's `DisruptionBudgetRow.displacementDepth`, default 1" and "§7.7's `DisruptionBudgetRow.weights` for the request's kind: per displaced use, per join, per subtracted part and per vacated plot" |
| VD-15 | FIXED + VP1-10, VP1-11 | §4.7 l. 4440–4442: "except a `dossier` request, which places at its first closest option with the hard rows it fails reported (§7.7's precedence, J-A20.71)" |
| VP-05, VD-17 | FIXED | §4.11 l. 4895–4897 "inside the `relet` event itself for a stored plan (§7.3's stored-plan row; J-A28.72), otherwise when next clicked"; `LadderOp.relet` l. 5043; step (c) l. 5007 |
| VP-27 | FIXED | §4.11 l. 4891 "(its one capacity function, J-A28.23)"; `LadderOp.relet` "(J-A28.23)" |
| VP-08, VP-09, VD-12b | FIXED + VP1-01, VP1-04 | §4.11 l. 4911–4921: `thin … back_court` "its households re-homed … and its buildings vacated (`vacate`), then the rear buildings cleared (`clear`) … a court whose households cannot be re-homed within the epoch's churn cap waits"; "Rung 2 keeps every frontage and every main shell; its one plot-line change is `densify … back_court`"; floor paragraph l. 4983–4984 "no frontage change and no shell falling toward a poorer band"; `LadderOp.thin` l. 5045; hidden plots l. 5357; J-A31.40 new |
| VP-32, VS-29 | FIXED + VP1-02 | §4.11 l. 4986–4995: writers add rung 2's rear plots, `fill` and "a New random of the block"; "Nothing else lowers it: rungs 1 and 2 never lower a standing plot's `builtBand`"; J-A31.44 index "lowered only by those writers … never by rungs 1 and 2" |
| VD-23 | FIXED | §4.11 l. 5000–5001: "Fusion and splitting continue lineage by §6.3's JOIN and SPLIT rule (J-A31.73)"; J-A31.48 restated as "the pipeline's reading of J-A31.73" |
| VP-06, VD-06 | FIXED | §4.11 l. 5016–5017: "re-checked by §7.7's lapse rule (J-A20.74, J-A20.41), the epoch writing `lapsedAt` inside its own touched set"; the condition's one statement is §7.7 l. 7230 with `Rejection.held.populationTarget` (l. 7180); J-A20.41 restated to point there |
| VD-08b | FIXED | §4.11 l. 5161–5162 `dossier?: EditEvent[] /* … applied at step (e) (§7.7 item 6) */`; step (e) l. 5010–5011 names `EpochInputs.dossier`; §7.7 item 6 cites it |
| VP-20 | FIXED | §4.11 l. 5250–5251 (lottery), l. 5267–5268 (lag), §10.2 l. 8798–8800: a `relet` down, `vacate` at a building's last household |
| VP-21 | FIXED | §4.11 l. 5272–5273 "(0) standing shells … relet up within §2.6's capacity"; step (f) "from its step (0)" |
| VP-29 | FIXED + VP1-13 | §4.11 l. 5277–5278: "where `Features.sewers` is on, the underground crowding hook first takes its table share of the residual (II.7.3 (c), §4.5 S7b (6))" |
| VP-22 | FIXED | §4.11 l. 5281: "**Test:** §13.2's T8-2 (M4)." |
| VP-07, V-MAB-13, VD-10a | FIXED | §4.11 l. 5325, 5333, 5340: `siltReach` in the union, the repair and the trigger rows; the tunnel ladder keeps `silt` (l. 5310); `siltReach` also at §0.2, §2.3, §7.1, §7.3, §7.4, §12.6, T25-1, J-A25.61 |
| V-MAB-39, V-MAB-29 | FIXED | §4.11 l. 5308 "the trace drawn as that kind (Building.reusedAs, §2.6)"; ladders l. 5223–5225 |
| V-MAB-40 | FIXED | §4.11 l. 5331–5332: "drained by a ditch water body and its `LandUse` faces re-typed with `reclaimed` set, as §2.3 states" |
| V-MAB-05 | FIXED | §4.11 l. 5350–5351: "`sealPassage` sets `Passage.sealed` (§2.5), so the access edges on its face read as sealed" |
| VP-16 | FIXED | §10.2 l. 8729–8740: one `DesignationTemplateRow` (one `programme` field); `BuildingClassRow` declares `secondaryChance`, `salvageM3`, `drain`, `underground`, `undergroundAccess` (l. 8716–8717) |
| VP-17 | FIXED | §10.2 l. 8740 `cellar` gains `depthCm` (220) and `insetCm` (60); `RoomRuleRow.scope` l. 8813 "the use's or the staff's rooms (a forge, a shop, a store, a staff chamber)" |
| V-MAB-20 | FIXED | §10.2 l. 8811: `circulation: { num: number; den: number }` |
| V-MAB-42 | FIXED in §10.2; §7.6 half open (VP1-17) | §10.2 l. 8710 `basementGate: BasementGateRow`, l. 8817–8819 `BasementGateRow { waterTableM; freeboardCm; drainageAccumCells }`; §7.6's list does not name it |
| VP-30 | FIXED | §10.4 l. 8944: "classes, districtKinds, resources, institutions, government, religions, households, professions, farm, roomProgram, basementGate (§10.2)" |
| VP-18 | FIXED + VP1-16 | II.1 l. 11447: `layer: 'ground' \| 'sky' \| 'underground'`; the paragraph l. 11523–11525 no longer restates the type; II.7.3 l. 11991 points to it |
| VK-28 | FIXED | II.7.3 l. 11925–11927: "every transaction it opens is keyed to the underground arena (§3.4's isolation), and §13.2's reroll-isolation fixture proves the ground byte-identical"; §3.4's arena paragraph and §13.2 l. 10114 exist |
| VD-37 | FIXED | II.7.2 l. 11869–11871: "`setAttr` on its kind, bore and headroom; its condition changes only through the conversions `silt`, `caveIn`, `seal` and `reopen` of II.6's condition table"; II.7.3 l. 11971 "the `reopen` conversion"; §7.1's tunnels row agrees |
| VP-24 | FIXED | II.7.3 l. 11908–11912 (`UndergroundRule` `depthScale`, `vacancyRunShare`, `arrangements`), II.7.4 l. 12007 (`arrangements` declared) and l. 12019, PART III l. 12033 "the designation templates (§4.7 S11, §10.2)" |
| VP-19, V-MAB-11 | FIXED | II.7.4 l. 12005: `('access_point', id) on the tunnel's kerb, §2.2 rule 7` and "§2.8's entity registry" |

## 3 The r0 issues of this part's report owned by other parts

| issue (owner) | verdict | the live wording |
|---|---|---|
| VP-04 (rendering) | FIXED | §8.5 l. 7997 "the click re-derives the rung from its canonical prior"; §8.6 l. 8020 "until the click re-derives it from its canonical" prior |
| VP-10 (determinism) | FIXED | §5.3 l. 5543: "rung 2 moves plot lines only inside a yard, its one ring change the `densify … back_court` split or its `thin … back_court` reversal (§4.11)"; J-A31.75 |
| VP-11 (scope) | FIXED | T31-9 l. 10232–10235: "its frontage edges are unchanged … matched to a lifecycle event … rung 2's back court" |
| VP-12 (determinism) | FIXED | §6.1 l. 5739–5740: `reserve.market` and `cut.interior` registered |
| VP-33 (determinism) | PARTIAL → VP1-03 | §7.4 l. 6839 points to §4.11's list but keeps an enumeration that omits rung 2's rear plots and says "an epoch changes it only by a rung-3 event" |
| VP-34 (determinism) | FIXED | §7.1 l. 6447 `convert` (… `densify` (`infill`, `back_court`), `thin` (`infill`, `back_court`) …); §7.4 l. 6831 "incl. the ladder kinds" |
| VP-35 (determinism) | FIXED | §7.6 l. 7090–7091 "the entrance and cellar columns of the designation templates (§10.2, read by §2.6's rules)" |
| VP-36 (model) | FIXED | §2.3 l. 791 `siltReach`; §2.6 l. 1306, 1319 `depthCm`, `cellar.insetCm`; §2.5 l. 886 "the granularity table and of the designation templates' arrangement"; "site-plan tables" 0 in §2 |
| VP-37 (rendering) | FIXED | §12.6 l. 9560 `siltReach` |
| VP-38 (scope) | FIXED | §0.2 l. 156 and T25-1 l. 10165 `siltReach` |
| VP-39 (scope) | FIXED | §14 l. 10818 "PlacementSolver and DesignationMutator are §4.7's, RelationRule and SupplyEdge §10.2's"; l. 10727 names `basementGate` |
| VP-40 (scope) | FIXED | T8-7 l. 10095–10096 "marks an unstored plan rung `stale` and re-cuts a stored plan inside its own event" |
| VP-41 (scope) | FIXED | Staged sewers row: "`UndergroundRule`'s depth scale, vacancy share and arrangement restriction" |

Pipeline issues of r0 not routed to repair (none): every VP-01 … VP-41 is in §2 or §3. The r0 findings outside the
repaired subsections keep their r0 verdict (`verify-pipeline-r0.md` §2–§3).

## 4 Per-item verdicts (re-judged where the repair changed the item's text; the rest keep r0's)

| item | r0 | r1 | the quote that carries it now; open issues |
|---|---|---|---|
| 8 decline and regrowth | PRESENT | PRESENT | §4.11 "Regrowth-first — built now": "(0) standing shells … relet up within §2.6's capacity (`relet`; J-A28.45); (1) vacant buildings reoccupied"; the lottery "the suffix leaves in reverse ordinal order as the epoch's step (c) states"; "**Test:** §13.2's T8-2 (M4)" |
| 10 islands by prosperity | PARTIAL | PRESENT | II.6 (3)–(5) and "an altitude from the supply law (5)"; one `IslandRule`, one `SkyStrategy` |
| 11 the underground fades | PARTIAL | PRESENT | II.6's condition table, "never a second stored state (J-A11.21): it changes only by these conversions"; VP1-12 (a stretch-level conversion has no per-record reading) |
| 12 underground neighbourhoods | PRESENT | PRESENT | II.7.3 U1–U3; `UndergroundRule.arrangements`; II.1's `layer` admits `'underground'`; VP1-13, VP1-16 |
| 13 islands only in cities | PARTIAL | PRESENT | II.6 (2) with the retired "toggle creates 1–3 islands" gone |
| 14 sewers by tier | PRESENT | PRESENT | II.7.1 unchanged but for the rule-2 pointer |
| 15 not every city has islands | PARTIAL | PRESENT | II.6 "A settlement has 0–3 islands by the island rule below … the view toggle only shows them"; (4)'s slots |
| 16 assignments by rule | PRESENT | PRESENT | §4.7 S10b; `DisruptionBudgetRow` by pointer; VP1-10 |
| 17 uses move | PRESENT | PRESENT | §4.11 "Uses across epochs" unchanged |
| 18 buildings mutate | PRESENT | PRESENT | §4.7 S11's mutator unchanged |
| 19 designations scale with prosperity | PRESENT | PRESENT | §4.7 S11 with the material rule by pointer; one `DesignationTemplateRow`; VP1-14, VP1-15, VP1-18 (stale "site plans") |
| 24 several markets | PRESENT | PRESENT | §4.2 S3 (12) "**The defaults compared** … in a port the harbour scores 1.0 + 0.6 × min(1.5, p ÷ `portRef`)"; VP1-09 |
| 25 terrain and water change slowly | PARTIAL | PRESENT | `TerrainWaterOp { op: 'siltReach' … }`, one name in every part |
| 26 hinterland decided with the town | PRESENT | PARTIAL | §4.9 "FTG has four farmland settings …" with `fill` / `perimeter` / `rivers`; the farm households are still placed by the hinterland unit in three sentences, a `farmsteads` field-system preset sits beside the farmstead-free modes (VP1-06), `rivers` has no shortfall rule (VP1-07), T26-2 tests neither (VP1-08) |
| 27 prosperity maps onto the references | PRESENT | PRESENT | §4.5's band set; the due-mark paragraph a pointer; the shanty rule by lowest mean pass-1 band |
| 30 hidden plots | PRESENT | PRESENT | §4.6 with `knownTo` by §2.5's default; `sealPassage` sets `Passage.sealed`; `cut.interior` registered |
| 31 prosperity change, ladder, floor | PARTIAL | PARTIAL | §4.11 rungs 1–3, the back court as the one ring change below rung 3 (J-A31.40), the block-level read, the writer list; residual contradictions: the front plot's lineage against §6.3 (VP1-01), "moves it only through rung 3" (VP1-02, VP1-03), no `builtBand` rule for an `amalgamate` that builds nothing (VP1-04), rung 1's roof loss (VP1-05) |
| ref 20 the dossier is the authority | PARTIAL | PRESENT | §4.11 (h) defers to §7.7's rule (J-A20.74); S10b's `dossier` exception; VP1-10, VP1-11 |
| ref 22 dossier changes mutate | PRESENT | PRESENT | §4.2 "reads the same creation prefix of the log (§7.4)"; `EpochInputs.dossier` |
| ref 23 emulation-first | PRESENT | PRESENT | §4.1's pointer bullet (J-A23.41) |
| ref 28 plans by click; (f) | PARTIAL | PRESENT | §4.1's canonical prior; `relet` re-cuts a stored plan in the event; II.4 a pointer |
| ref 29 entrances and basements | PRESENT | PRESENT | §10.2 `cellar.depthCm` / `insetCm`, `BasementGateRow`; VP1-17 (§7.6 does not list the gate row) |

## 5 Checks

**Retired texts (CONFIRMED by grep on the live document, count after the colon).** "creates 1–3" 0; "maxIslands" 0;
"toggle creates" 0; "when the toggle is on" 0; "calls modest" 0; "reads the same recipe" 0; "by mutating the cached" 0;
"the market square's" 0; "a table depth, default 1" 0; "lower-class district" 0; "vacates its buildings" 0; "its uses
leave (`vacate`)" 0; "('access', id)" 0; "§2.2 rule 1), read back" 0; "E_SCOPE otherwise" 0; "setAttr` on its
condition" 0; "Rung 2 moves plot lines only inside the yard" 0; "with no plot or shell change" 0; "lowered by rung 3
only" 0; "drainage` ditch trace" 0; "a yard part of the plot over" 0; the r0 test sentence of §4.11 0. "FTG's two" 2
(both FTG's two market squares, correct); "site-plan table" 2 (J-A19.41, which records the fold, and §3.7 l. 2940,
VP1-18); "defaults from exposure (hidden" 1 (§2.5, the home).

**SINGLE-SOURCE (kind duplicate).** r0's duplicates are gone: the middle band (VP-13), the stall rules (VP-14), the
material rule (VP-15), `DesignationTemplateRow` (VP-16), the capacity formula (VP-27), the regrowth test (VP-22), II.4's
stale-click rule (VP-03), the island interfaces (VP-01), the lapse condition (VP-06, VD-06), the lineage rule (VD-23),
the `knownTo` default (V-MAB-07), the emulation rule (VD-35a), the disruption weights (VD-16). One second enumeration
remains outside the part: §7.4's `builtBand` writers beside §4.11's (VP1-03). No new duplicate in the part.

**STALE.** No sentence of the part keeps lots as buildings, binary wealth, size fixed by tier, one central market, the
map editing the dossier, a licence default or immutable terrain and water (r0's greps re-run: the `licence` field of
`SettingPack` is a per-pack attribute, not a default). Stale: §4.5's "site plans" as a band-keyed table (VP1-14), and
outside the part §7.6's "site plans" (VP1-17) and §3.7's "site-plan table" (VP1-18) — item 19 folded that table into the
designation templates; the farm households of the `fill` mode stated for every mode (VP1-06).

**CROSS-PART.** Every pointer the repaired text adds resolves to a home that states what it assumes: §6.3's SPLIT rule
(but see VP1-01), §7.3's stored-plan and canonical-prior rows, §7.4's creation prefix, §7.7's `Rejection.held.
populationTarget` and item 6, `DisruptionBudgetRow`, §3.4's arena isolation, §13.2's reroll-isolation fixture and
T8-2, §2.2 rule 2 and rule 7, §2.5's `knownTo` default and `Passage.sealed`, §2.6's `Building.reusedAs` and capacity
function (J-A28.23), §2.8's entity registry. Notes addressed to the pipeline: the model seat's §10.2 and §4.11 notes,
the kernel's, rendering's and scope's are reflected; the determinism seat's list is reflected except its rung-1 roof
note (VP1-05). The pipeline seat's own asks of other parts: §7.4's `builtBand` row not updated (VP1-03), §7.6's
`basementGate` not listed (VP1-17); §14's `basementGate`, §8.5/§8.6, §12.6, T25-1, §0.2, T31-9, T8-7 and the Staged row
are done.

**DEFERRAL-WORDING.** None. The added lines' "later" are temporal ("later epochs", "a later rise"); `portRef`'s "0.12
(PLAUSIBLE) until M1's receipt" is a measured default with its receipt, not a deferral. No "TBD", "open", "not yet
decided" or unresolved choice in the part (scratchpad `vp1/part-*.txt` grepped).

**BROKEN-REFERENCE.** `refs.py` on the live document: 139 heading keys, 35 D ids, 459 J ids, 2 broken — the two
pre-existing external citations (`os-geometry.md` §2.1.4 at l. 2635, RFC 7946 §3.1.6 at l. 9012), none in the part.
Semantic breaks the resolver cannot see: `portRef`'s maintenance "(§13.9)" (VP1-09); S11's "(S10 (2))" for the plot's
manifested band (VP1-15).

**NEW-PROBLEM.** The repair's new mechanism meets existing rules in five places: rung 2's front plot "keeping its …
lineage" against §6.3's SPLIT (VP1-01); "wealth change over epochs moves it only through rung 3" against the same
paragraph's upward refurbishment (VP1-02); rung 3's `amalgamate` of a thinned rear row with no new stock (VP1-04); the
`perimeter` / `rivers` modes against three placement sentences and the `farmsteads` preset (VP1-06) and a `rivers`
band too small for the arable demand (VP1-07); the dossier fallback's "first closest option" against §7.7's
"best-scoring site" (VP1-10, VP1-11). Two older gaps the new text exposes: the condition table's per-record reading
against stretch-level tunnel conversions (VP1-12), and II.7.3 (c)'s "S5d's ground shortfall" against §4.11 (6)'s
"residual" (VP1-13).

## 6 Issues (owner part, severity, exact required change)

Ranked by part and then by item; all minor. Counts:

| owner | blocker | major | minor | total |
|---|---|---|---|---|
| pipeline | 0 | 0 | 13 | 13 |
| determinism | 0 | 0 | 3 | 3 |
| scope | 0 | 0 | 1 | 1 |
| kernel | 0 | 0 | 1 | 1 |
| **all** | 0 | 0 | 18 | 18 |

Line numbers are the live document's (sha256 `365e19f2…`); a quoted string that wraps in the file is quoted as one line.

### VP1-01 — pipeline · minor · conflict · item 31 (§4.11 rung 2, J-A31.40)

**Claim.** §4.11 rung 2 (l. 4917–4918) says `densify … back_court` leaves "the front plot, the child that keeps the
frontage anchor, keeping its address, lineage and `builtBand`, the rear plots keyed as §6.3's split children"; J-A31.40's
index row (l. 12741: "the front plot keeps its address, lineage and `builtBand`") and Part A entry say the same. §6.3's
SPLIT rule, the lineage home (l. 6058–6060), gives every child — the anchor child included — "the continued lineage, the
parent's lineage key with its child index"; only the address stays with the anchor child. The two statements give the
front plot different stream keys for every later draw.

**Required change.** §4.11 rung 2: replace "keeping its address, lineage and `builtBand`, the rear plots keyed as §6.3's
split children" with "keeping its address and `builtBand`, every child's lineage continued by §6.3's SPLIT rule (the
parent's key with its child index)". J-A31.40 index row: replace "the front plot keeps its address, lineage and
`builtBand`" with "the front plot keeps its address and `builtBand`, every child's lineage continued by §6.3's SPLIT
rule". Part A entry: replace "keeping its address, lineage and `builtBand`" with "keeping its address and `builtBand`,
its lineage continued by §6.3's SPLIT rule as every child's is".

### VP1-02 — pipeline · minor · new-problem · item 31 (§4.11 floor paragraph, J-A31.44 Part A)

**Claim.** §4.11 l. 4994–4995 ends the writer list "Nothing else lowers it: rungs 1 and 2 never lower a standing plot's
`builtBand`, and wealth change over epochs moves it only through rung 3", and J-A31.44's Part A entry repeats "wealth
change over epochs moves it only through rung 3". The same list names two epoch writers that are not rung 3: "a
completed upward refurbishment — a `mutate` whose result meets a higher band's shape template raises `builtBand`" (rung
1 growing rich) and "rung 2's `densify … back_court`, for the rear plots it creates".

**Required change.** §4.11: replace "and wealth change over epochs moves it only through rung 3" with "and wealth change
over epochs lowers it only through rung 3 (a completed upward refurbishment raises it, and rung 2's rear plots take
their stock's band)". J-A31.44 Part A: replace "and wealth change over epochs moves it only through rung 3" with "and
wealth change over epochs lowers it only through rung 3".

### VP1-03 — determinism · minor · conflict · item 31 (§7.4 `builtBand` row; VP-33's residue)

**Claim.** §7.4's `builtBand` row (l. 6839) still enumerates the writers beside its pointer — "the writers §4.11's floor
paragraph lists (J-A31.44): generation, rung-3 events, the hand edits of rung 3's kind, the authorial re-derivations
(§7.2; J-A31.72) and a completed upward refurbishment" — which omits the rear plots rung 2's back court writes (J-A31.40,
J-A31.44), and its regenerate cell says "an epoch changes it only by a rung-3 event", which the upward refurbishment and
the rear plots contradict. The pipeline seat's cross-part note (b) asked for this change; no seat applied it.

**Required change.** §7.4 `builtBand` row: in the create cell replace the enumeration after "(J-A31.44)" by nothing, so
it reads "the writers §4.11's floor paragraph lists (J-A31.44)"; in the regenerate cell replace "an epoch changes it
only by a rung-3 event" with "an epoch lowers it only by a rung-3 event (rung 2's new rear plots take their stock's band
and a completed upward refurbishment raises it, §4.11)".

### VP1-04 — pipeline · minor · new-problem · item 31, 8 (§4.11 writer list)

**Claim.** The writer list sets `builtBand` at "a rung-3 event, to the band of the new stock" (l. 4986). J-A31.40 routes
a thinned court's vacant rear row back "to the front plot's garden by rung 3's `amalgamate`" (l. 4919–4921), and
decline's `amalgamate` merges a cleared plot "into its occupied neighbour" (l. 5232–5233): rung-3 events that build no
new stock, so the joined plot's `builtBand` is undefined (§6.3's JOIN states its address and lineage only).

**Required change.** §4.11 writer list: after "a rung-3 event, to the band of the new stock" insert "(an `amalgamate`
that builds nothing — a thinned rear row or a cleared plot returned to its neighbour — keeps the `builtBand` of the
member whose frontage anchor the joined plot keeps)".

### VP1-05 — pipeline · minor · conflict · item 31 (§4.11 rung 1; determinism's cross-part note)

**Claim.** Rung 1 steps condition down with "wear, patched roofs and, late, the roof lost through `RoofSpec.kind
'none'`; rendering classes of §8.2, never a shape change, item 19" (l. 4900–4902). A roof is part of the shell subtree
§5.3's epoch row checks ("wings, heights, entrances, roof, basement"), and that row matches a shell change toward a
poorer band only to a rung-3 event, a mutation or a decline conversion; a roofless building is §2.8's derelict
(`decayed`, `RoofSpec.kind 'none'`), a decline state of a vacant building. The determinism seat's note — "Rung 1's
'late, the roof lost' must be issued as `decay` (a decline conversion), or §5.3's epoch row has no event to match it" —
was not reflected.

**Required change.** §4.11 rung 1: replace "(§2.6: wear, patched roofs and, late, the roof lost through `RoofSpec.kind
'none'`; rendering classes of §8.2, never a shape change, item 19)" with "(§2.6: wear and patched roofs, rendering
classes of §8.2, never a shape change, item 19; a roof is lost only through the decline ladder's `decay` once the
building is vacant, §2.8's derelict)".

### VP1-06 — pipeline · minor · new-problem · item 26 (§4.1, §4.7 S10b, §4.9)

**Claim.** J-A26.44 made `perimeter` and `rivers` farmstead-free — "the farm households live in the settlement (S2
demands them as households of their band, which S7b allocates with the town's)" (§4.9 l. 4737–4738) — but three
sentences still place every farm household on the hinterland's outside plots: §4.1 l. 3246 "S10b (outside classes and
farm households), S11 (farmstead and outside site plans)"; §4.7 l. 4418–4420 "**Outside classes and farm households**
are placed by the hinterland unit's own S10b — the same solver over the outside plots its S10 built"; §4.9 l. 4762 "The
unit's S10b places the allocated outside classes and farm households on the outside plots." And §4.9's field-system
presets still list "**farmsteads** with driveways" (l. 4697) beside "the field-system preset … lays the fields inside
every mode" (l. 4749–4750), although two of the three modes have no farmsteads; J-A26.44 folded the `along rivers`
preset into the modes but left this one.

**Required change.** §4.1: "S10b (outside classes and farm households)" → "S10b (outside classes and, under §4.9's
`fill` farm mode, the farm households)". §4.7: "**Outside classes and farm households** are placed by the hinterland
unit's own S10b" → "**Outside classes, and under §4.9's `fill` farm mode the farm households,** are placed by the
hinterland unit's own S10b (under `perimeter` and `rivers` the farm households are town households, placed by their
districts' S10b)". §4.9 l. 4762: "places the allocated outside classes and farm households on the outside plots" →
"places the allocated outside classes and, under the `fill` mode, the farm households on the outside plots". §4.9
l. 4695–4699: delete "**farmsteads** with driveways (an L3 `driveway` face from each farmstead lot to the nearest way
corridor), or the" and write "or the" before "MFCG/VG **sector look**"; then, in the `fill` bullet (l. 4735–4736),
after "the lots larger where land is plentiful" add "; each farmstead lot takes an L3 `driveway` face to the nearest
way corridor".

### VP1-07 — pipeline · minor · missing · item 26 (§4.9 `rivers` mode)

**Claim.** `rivers` lays "the fields … only on the land within the row's `riverBandM` … of a river's banks" (l. 4741–
4743) and falls back to `perimeter` only "where the frame has no river". A river band holding less land than the arable
demand has no rule, while §4.9's farm-table test and O14 (a) require farmland per capita within ± 20 % of the era row —
the mode the repair added lacks its failure handling.

**Required change.** §4.9 `rivers` bullet: after "the mode reads as `perimeter`, FTG's rule" add "; where the band holds
less land than the arable demand, the remaining fields are laid as `perimeter` lays them, beyond the band, and the band's
shortfall is reported (never a failure)". J-A26.44's Part A entry gains "(amended by verify-pipeline-r1: a band too
small for the demand continues as `perimeter`, reported)".

### VP1-08 — scope · minor · partial · item 26 (§13.2 T26-2)

**Claim.** T26-2 (l. 10158–10159) checks only "the `fill` mode at TOWN and CITY on flat fertile fixtures and
`perimeter` at METROPOLIS or on hilly fixtures". The behaviour J-A26.44 changed — no farmstead plots under `perimeter`
and `rivers`, the farm households in town, the `rivers` band, the climate override — has no bar.

**Required change.** T26-2: after "`perimeter` at METROPOLIS or on hilly fixtures" add "; under `perimeter` and `rivers`
no farmstead plot exists and every farm household is allocated to a town district; on an arid river fixture the mode is
`rivers` and every field lies within `riverBandM` of a bank (beyond it only the reported shortfall), and on an arid
fixture without a river the mode reads as `perimeter`".

### VP1-09 — pipeline · minor · broken-reference · item 24 (§4.2 S3 (12), J-A24.43)

**Claim.** `portRef` is "the median `p` over B-CITY's harbour seeds, which S2 alone computes (the roster needs no
geometry): the table-calibration script sets it when the shipped roster rows are set and re-sets it whenever they change
(§13.9)" (l. 3651–3653). §13.9 is the owner-staged corpus-calibration interface (`CorpusAdapter`, `CalibrationRun`) and
holds no such script, and S2's roster reads S1's `SiteResources` (resource gates), so S0–S2 are needed, not S2 alone.
The value that keeps T24-1's port bar attainable has no stated maintenance path.

**Required change.** §4.2 S3 (12): replace "which S2 alone computes (the roster needs no geometry): the table-calibration
script sets it when the shipped roster rows are set and re-sets it whenever they change (§13.9), 0.12 (PLAUSIBLE) until
M1's receipt" with "a stored cell of `market.siting` (§7.6) computed by running S0–S2 alone on every B-CITY harbour seed
(no layout is needed): a scripted pass sets it at M1 and re-runs whenever a shipped roster row changes, the new value
shipped as a table-version bump with its declared shift (§13.3), and a contract test recomputes the median and fails on
a stored value that differs (§13.2); 0.12 (PLAUSIBLE) until the M1 receipt". J-A24.43 index row and Part A entry:
"computed from S2 alone" / "which S2 alone computes because the roster needs no geometry" → "computed by running S0–S2
alone".

### VP1-10 — pipeline · minor · conflict · item 20 (§4.7 S10b closest options)

**Claim.** S10b now places a `dossier` request that no plot satisfies "at its first closest option" (l. 4441), the
closest options being "the best-scoring plots that fail the fewest hard rows" (l. 4438) — an order the text never
fixes (fewest failures first, or score first). §7.7's precedence, the home, and §5.2's F-SITING row say "the
best-scoring site" (VP1-11). Two statements of where a dossier element lands can pick different plots.

**Required change.** §4.7 S10b: replace "its **closest options** (the best-scoring plots that fail the fewest hard rows,
each with the rows it fails)" with "its **closest options** (the plots in order of the number of hard rows they fail,
then score descending, then plot id — each with the rows it fails)".

### VP1-11 — determinism · minor · conflict · item 20 (§7.7 precedence, §5.2 F-SITING)

**Claim.** §7.7's "Dossier existence" sentence (l. 7190–7191) places an unplaceable dossier element at "the best-scoring
site with the rows it fails reported", and §5.2's F-SITING row (l. 5509) at "the best-scoring site with the hard rows it
fails reported", while §4.7 S10b, the solver that executes it, places it "at its first closest option" (VP1-10).

**Required change.** §7.7: replace "when no site passes them, the best-scoring site with the rows it fails reported" with
"when no site passes them, the first of §4.7 S10b's closest options (fewest hard rows failed, then score) with the rows
it fails reported". §5.2 F-SITING row: replace "is placed at the best-scoring site with the hard rows it fails reported"
with "is placed at the first of its closest options (fewest hard rows failed, then score) with the hard rows it fails
reported".

### VP1-12 — pipeline · minor · new-problem · items 11, 12 (II.6 condition table)

**Claim.** II.6's new condition table reads a tunnel's condition from the record's `existence` and `closure` ("never a
second stored state"), and II.7.3 closes or reopens the frontage plots of "a tunnel run" by its `open` column; but "the
conversions `silt`, `caveIn` and `seal` act on a tunnel or on one of its stretches" (l. 11730–11731; `DeclineOp`'s
`stretch?: StretchRef`, l. 5310). A stretch-level cave-in has no per-record reading: either the whole record closes
(every plot along the tunnel abandoned) or the table cannot say which stretch is open.

**Required change.** II.6: replace "the conversions `silt`, `caveIn` and `seal` act on a tunnel or on one of its
stretches, and `reopen` undoes them" with "the conversions `silt`, `caveIn` and `seal` act on one tunnel record — a
conversion given a `stretch` first splits the tunnel at the stretch's two ends into its own records, keyed by §6.3's
SPLIT rule, so that stretch changes condition alone — and `reopen` undoes them; a run below is one `Tunnel` record".
§4.11 `DeclineOp` tunnel comment: after "the underground's ladder (II.6)" add "; a `stretch` splits the record first".

### VP1-13 — pipeline · minor · conflict · item 12 (II.7.3 (c) against §4.11 (6))

**Claim.** II.7.3 (c) sends "a table share of S5d's ground shortfall" underground "before the boundary widens (§4.11)"
(l. 11898–11899); §4.11's regrowth-first step (6), the new pointer (VP-29), takes "its table share of the residual"
before S5a grows the boundary. S5d's shortfall is measured after a stage has grown; the residual is what steps (0)–(5)
leave before any growth — two quantities.

**Required change.** II.7.3 (c): replace "a table share of S5d's ground shortfall goes underground before the boundary
widens (§4.11)" with "a table share of the epoch's residual demand — what §4.11's regrowth-first steps (0)–(5) leave —
goes underground before the boundary widens (§4.11 (6))".

### VP1-14 — pipeline · minor · stale · item 19 (§4.5 band-set bullet)

**Claim.** The band-set bullet lists the tables that key rows by band as "granularity, site plans and designation
templates (§4.7)" (l. 3995); item 19 folded the site-plan table into the designation templates (J-A19.41).

**Required change.** §4.5: replace "granularity, site plans and designation templates (§4.7)" with "granularity and the
designation templates (§4.7; the site-plan table folded into them, J-A19.41)".

### VP1-15 — pipeline · minor · broken-reference · items 31, 19 (§4.7 S11)

**Claim.** S11's "Geometry columns read the plot's manifested band (S10 (2))" (l. 4472) points to S10 (2), which now
states the block's manifested band by §4.11's block-level reading; the plot-level read S11 needs is §4.11's ("a
plot-level read takes the plot's own").

**Required change.** §4.7 S11: replace "Geometry columns read the plot's manifested band (S10 (2))" with "Geometry columns
read the plot's manifested band (§4.11's plot-level read)".

### VP1-16 — pipeline · minor · partial · item 12 (II.1 `NeighbourhoodRequest.key`)

**Claim.** `layer` now admits `'underground'`, but the one declaration's `key` comment still reads "/* the ground, or the
sky island's arena */" (l. 11445), while the paragraph below gives `key` as "the underground arena's `PlatKey`".

**Required change.** II.1: replace "key: PlatKey /* the ground, or the sky island's arena */" with "key: PlatKey /* the
ground, the sky island's arena, or the underground arena (layer 'underground') */".

### VP1-17 — determinism · minor · partial · items 29, 19 (§7.6 table list; V-MAB-42's second half)

**Claim.** V-MAB-42 required the basement gate row "named in §7.6's enumeration"; §10.2 declares
`RosterTables.basementGate`, but §7.6's list (l. 7082–7092) names only "the entrance and cellar columns of the
designation templates". The same list still names "site plans" among the rule tables, a table item 19 folded into the
designation templates (J-A19.41).

**Required change.** §7.6: replace "granularity, site plans, class rules and class families" with "granularity, class
rules and class families"; after "the entrance and cellar columns of the designation templates (§10.2, read by §2.6's
rules)" insert ", the basement gate row `RosterTables.basementGate` (§10.2)".

### VP1-18 — kernel · minor · stale · item 19 (§3.7 l. 2940)

**Claim.** §3.7's S11 bar describes "S11's rule evaluation (site-plan table, heights, materials, entrance)"; item 19
folded the site-plan table into the designation template (J-A19.41), which is what S11 evaluates (§4.7 S11).

**Required change.** §3.7: replace "S11's rule evaluation (site-plan table, heights, materials, entrance)" with "S11's rule
evaluation (the designation template, heights, materials, entrance)".

## 7 CONFIRMED versus PLAUSIBLE

**CONFIRMED (read on disk or executed; the document's sha256 `365e19f2…` unchanged from the first read to the last).**
The part diff against the pre-repair archive (18 subsections changed, 87 hunks, the other pipeline subsections
byte-identical); every quotation and line number in §2–§6; the 25 retired-text counts of §5; the resolver's 2
pre-existing external breaks and none in the part; the index rows and Part A entries quoted; §6.3's SPLIT wording
against J-A31.40; §7.4's and §7.6's rows as quoted; §13.9's contents (no calibration script); the determinism seat's
unreflected roof note.

**PLAUSIBLE (judgment, vetoable).** The severities (all minor: each is a wording or pointer repair inside a mechanism that
otherwise holds); the verdicts PRESENT versus PARTIAL of §4 (26 and 31 PARTIAL because of contradictions, the rest
PRESENT with minor issues noted); the recommended directions — aligning rung 2's front plot with §6.3's SPLIT rather than
adding an exception there (VP1-01), keeping the anchor member's `builtBand` on a no-build `amalgamate` (VP1-04), roof
loss only through `decay` (VP1-05), `rivers` continuing as `perimeter` past its band (VP1-07), ordering closest options
by failures first (VP1-10, VP1-11), splitting a tunnel record for a stretch conversion rather than dropping `stretch`
(VP1-12), the residual as the crowding hook's quantity (VP1-13); and that VS-02's ⅚ break-even gives T24-1's ≥ 50 % at
the defaults before penalties (arithmetic; the seed shares are M2b's measurement). The owner's words are quoted from
`docs/AMENDMENTS-2026-09-25b.md`; no reference code, corpus content or `partitioned/` file was read or used.
