# Verify — DETERMINISM part (§5, §6, §7) after the amendments-b blocks (r0)

> PENDING FABLE REVIEW — Opus verifier seat `amendments-b/verify-determinism-r0` (2026-09-27).

## PROGRESS (kill-safe ledger)
- READ: route.json (home 20, 22, 23; referencing 8, 10–19, 25, 28–31) | done
- READ: owner's words, docs/AMENDMENTS-2026-09-25b.md items 8–32 | done
- READ: amend-determinism.md whole (§1–§8) and every CROSS-PART note to determinism in the nine other amend-*.md | done
- READ: assemble-r0.md (changed-section list) | done
- READ: §5, §6, §7 whole (ARCHITECTURE.md l. 5276–7127, sha256 87d89692…) | done
- READ: citing subsections — §0.2 rows 8–31, §2.3 slow change, §2.5 Passage, §2.6 interior ladder, §2.8 record + registry, §2.9 one-source, §4.1 click policy, §4.2 S3 (12) + dossier-at-creation, §4.6 reach, §4.7 S10b + S11 mutator, §4.11 ladder/floor/epoch order/ConversionOp/TerrainWaterOp/HiddenOp, §8.5, §8.6, §11.2, §11.3, §11.4, §12.6, §13.2 T20/T22/T25/T28/T31, §14, II.4, II.7.2, §17.1 (6), J-index + Part A rows of my part | done
- ITEM verdicts | done (section 2)
- SINGLE-SOURCE / STALE / CROSS-PART / DEFERRAL / BROKEN-REF / NEW-PROBLEM | done (section 3)
- ISSUES table | done (section 4)
- LANDED line | done

## 1 Outcome

Every item routed to this part has landed as mechanism in the design's own terms, and the three homes (20 and 22 in
§7.7, 23 in §7.6) are complete as statements. The verification still finds **45 issues: 0 blockers, 15 major and 30
minor.** Of these, 28 are this part's to repair (10 major, 18 minor) and 17 belong to other parts: pipeline 12 (4
major), rendering 1 (major), scope 3 and model 1.

The majors that sit in this part are these.
* **Text corruption.** §6.3's survival sentence was split mid-parenthesis by the inserted sub-bullet (VD-01).
* **The plan rung's rerolls.** They cannot work as specified: §6.1 reads the reroll from the elaboration record, which
  §2.8 and §6.2 say holds none (VD-02). One `<building id>#plan` counter cannot keep "re-roll the roles" from moving
  walls, and the wings and rooms rungs have no key at all (VD-03). §5.1 (6)'s content check cannot see an unstored
  rung, so a rung re-roll would be a reported no-op (VD-04).
* **Three different lapse rules for a placement rejection.** They sit in §7.7, §7.4 and §4.11 / §13.2 T20-2, and the
  test those two use needs a field `Rejection` lacks (VD-05).
* **Two dossier mechanisms without a data path.** The creation-time dossier rows that S2 counts are log events, which
  the fold may not read ahead (VD-07). "A dossier event with the epoch's inputs" has no carrier in `EpochInputs`
  (VD-08).
* **Two concerns missing from the registry.** `reserve.market` and `cut.interior` are named by §4.2, §4.6 and §0.2 but
  are not in §6.1's registry (VD-09).
* **The epoch invariant is too strong.** §5.3's epoch row, checked "against … leaf digests", fails on rung 1's own
  writes, on rung 2's back courts and on decline conversions (VD-12).
* **No report entry shapes.** §5.4 declares none of the entries §11.2's `report.changed` promises (VD-13).

Other parts' majors:
* **Stale cache wording.** "Mutating the cached state" remains in §4.1, II.4, J-A28.42, §8.5 and §8.6, against the
  canonical prior (VD-14a, VD-14b).
* **F-EDIT for dossier requests.** §4.7 S10b returns F-EDIT for a `dossier` request no plot satisfies, against §7.7's
  precedence (VD-15).
* **Two ops named `silt`.** The union has a tunnel `silt` and a water `silt`, while §7.1 cites a `siltReach` that no
  union declares (VD-10a, VD-10b).
* **No field for the epoch's dossier events.** `EpochInputs` has none (VD-08b).

**Rulings needed:** two, both recommended below and vetoable. The first is which lapse test the home adopts (VD-05;
recommended: J-A20.41's population-target test, which the pipeline step and T20-2 already use). The second is how the
fold reads the creation prefix (VD-07; recommended: one declared read-ahead of the flagged `assign` events at
positions 0…k).

## 2 Per item — PRESENT / PARTIAL / MISSING in this part (quotes from ARCHITECTURE.md as assembled)

### Home items

| item | verdict | where | the mechanism, quoted | issues |
|---|---|---|---|---|
| 20 one-way flow; the dossier is the authority | PARTIAL | §7.7 contract items 1–8, precedence; §7.1 `rejectSite`, `placeAt`, `EditBase.dossier`; §7.2; §7.3 item 1, 8, table; §7.4 rows; §5.2 F-SITING / F-EDIT; §5.3; §5.4 `dossier` | "**Dossier existence** sits below the lock and above every assignment, drawn shape and rule: a dossier-backed element is never removed by anything on the map … the best-scoring site with the rows it fails reported (§5.2 F-SITING), never omitted (J-A20.71)"; "A map "delete" of a dossier-backed element is the `rejectSite` event … lapses … at the first `epoch` event, or dossier event whose effective scope holds the site's block, that folds after it" | VD-05, VD-06, VD-13, VD-15, VD-33, VD-34, VD-36 |
| 22 dossier changes mutate the map, never re-roll it | PARTIAL | §7.7 One path, items 5–6, `DisruptionBudgetRow`; §6.2 "Histories, not states"; §6.5 (9) history determinism; §7.1 dry run; §7.3 item 1 | "A dossier change after the first map is a mutation of the CURRENT map, never a reshuffle … the budget bounds the search … and the effective scope (§7.3 item 1), never the dossier's authority"; "the map is a function of the seed, the ordered history of dossier events and the map's own edits" | VD-07, VD-07b, VD-08, VD-08b, VD-16, VD-31 |
| 23 emulation-first defaults | PRESENT (with minor gaps) | §7.6 "Emulation first" bullet | "a cell that extends the references carries `extension: { over: 'MFCG'\|'FTG'\|'both'\|'none'; mode: 'chance'\|'weight'\|'option' }` … the **parity presets** `MFCG` and `FTG` … set every `extension` cell's chance or weight to 0 and its option off … **The reading rule for absolutes:** … 'by default, as a table value that can be changed per region, era and setting'" | VD-26, VD-35a, VD-35b |

### Referencing items (the route's duties for this part)

| item | verdict | where (quote) | issues |
|---|---|---|---|
| 8 decline and regrowth | PRESENT | §6.3 "the standing fabric of an epoch — a vacant, derelict, ruined, cleared or reused building, a neglected, breached or superseded enceinte … — survive in exactly this sense"; §6.1 "`epoch.transform` also draws the decline lottery's `u` and each entity's dwell spans"; §7.1 buildings / walls rows `convert` (vacate, reoccupy, reuse; neglect, breach, dismantle, contractWall); §7.4 convert row with undo; §5.3 "a `cleared` building's footprint face persists" | VD-01 (the sentence carrying it is broken) |
| 10 islands by prosperity | PRESENT | §7.1 sky-islands row `convert` (resizeIsland … raiseIsland); §7.4 "`fallIsland` lays the ruin face through the carve path"; §6.1 "`island.place` draws the island count … and the sky allocations' supported-area fills and outlines" | — |
| 11 the underground fades | PRESENT | §7.1 tunnels row `convert` (silt, caveIn, seal, reopen), `delete` kept; §5.3 "no `EvolutionStrategy` plan contains `demolish` on a tunnel" | VD-20, VD-37 |
| 12 underground neighbourhoods | PARTIAL | §5.2 F-UNDER row; F-PLOT "the rung is skipped on the underground arena (II.7.3 U2)"; §5.3 U1–U3, access, cross-arena writes; §6.1 "the underground stage reads the ordinary `plot.*`, `siting`, `siteplan` and `heights` concerns keyed from the underground pseudo-district's lineage"; §7.3 staged-layers row | VD-20, VD-27, VD-28, VD-29 |
| 13 islands only at CITY and METROPOLIS | PRESENT | §7.8 "at TOWN and at every village rung the control is disabled with the reason 'islands only at CITY and METROPOLIS (II.6)'" | — |
| 14 sewers by tier | PRESENT | §7.8 "at TOWN a model feature (auto / on / off; consuming stage S0 …), at CITY and METROPOLIS a view control"; §6.1 "the existence draw being S0's on `blueprint.features`" (J-A14.41) | — |
| 15 not every city has islands | PRESENT | §7.8 view control vs `recipe.layers.islands`; §6.1 count on `island.place` | — |
| 16 relation and supply rules | PRESENT | §7.7 "`PlacementCriteria = RelationRule[]` … per-assignment overrides"; "PlacementSolver … are §4.7 S10b's"; §5.2 F-SITING ladder and F-EDIT closest sites; §7.3 designation row "a displaced use re-placed by the same solver, one displacement level" | VD-15, VD-16 (pipeline side) |
| 17 uses move | PARTIAL | §7.7 "an assignment is a stable identity that moves with its use … unless `pinned`"; §7.1 uses row, `swapUse` = two `relocateUse`; §6.3 use anchor "(plot address, role)"; §6.1 `use.relocate` | VD-13 ("every such change is reported" has no report shape) |
| 18 designation mutation | PRESENT | §7.3 item 8 "runs §4.7 S11's designation mutator … reversal applies the inverse record"; §7.1 "A designation change is neither"; `EditBase.mutations`; §7.4 assign row "the inverse mutation from the undo record"; §6.1 `siteplan.mutate`; §6.3 "the parts a mutation adds are user-created entities minted from the causing event's `seq`"; §5.3 mutation row | — |
| 19 designation scales with prosperity | PRESENT | §7.7 `drift` "read against §4.7 S11's designation template (item 19)" | — |
| 25 terrain and water change slowly | PARTIAL | §6.1 conversions on `epoch.transform` (J-A25.61); §7.3 (b) "run through this operator as their local repair"; §7.1 row `convert (reclaim, siltReach, shiftCourse …)`; §7.4 convert row | VD-10a, VD-10b, VD-11, VD-11b, VD-32 |
| 28 plan rung and elaboration by click (with (f)) | PARTIAL | §6.1 `plan.*` concerns "keyed with the rung's own reroll"; §6.2 "The elaboration cache is outside both digests"; §6.5 (9) click-order identity with the interior-ladder case; §7.1 plan events, `regenerate.rung`, "a click on a building or a neighbourhood logs nothing"; §7.3 canonical-prior row and stored-plan row; §7.4 rows; §5.2 F-PLAN, F-SKELETON; §5.3 plan and interior-ladder rows; §6.3 room anchor; §7.5 `Room.unit`; §7.6 interior-ladder rows; §7.7 (5) `relet` first | VD-02, VD-03, VD-04, VD-14a, VD-14b, VD-17, VD-25, VD-30 |
| 29 entrances and basements | PRESENT (minor gap) | §6.1 `siteplan.entrance` (J-A29.61); §7.1 `setEntrance` "never removes the main entrance", `setAttr(basement)`; §7.3 (a) 4 basement re-derivation; §7.4 row; §5.3 entrance and basement rows; §6.3 entrance anchor; §7.5 single `entrance` → `entrances` | VD-27 |
| 30 hidden plots | PARTIAL | §5.2 F-PLOT "A hidden plot passes with a chain of access edges"; §5.3 reachability walk; §7.1 `drawPassage`, `sealPassage` / `openPassage`, `setAttr(knownTo)`; §7.4 item-30 row; §7.7 (7) knowledge as a dossier fact | VD-09, VD-18, VD-19, VD-21, VD-28, VD-29 |
| 31 wealth ladder and geometry floor | PARTIAL | §6.3 "JOIN and SPLIT — the address by the anchor, the lineage continued (item 31 (c); J-A31.73)"; §7.1 `split` / `join` as fusion and splitting, "never `builtBand`"; §7.2 "A brush is authorial"; §7.3 fusion row; §7.4 `builtBand` paths row; §7.5 backfill; §7.6 ladder tables; §5.2 F-PLOT after re-cuts, F-EDIT; §5.3 epoch rows | VD-12, VD-12b, VD-12c, VD-18, VD-22, VD-23, VD-24 |

## 3 The checks

* **SINGLE-SOURCE.**
  * *In this part.* §7.3's click row restates §2.6's re-cut rule and drops its guard (VD-30).
  * *Other parts that restate this part's homes.* §4.11's lineage bullet with J-A31.48 (VD-23), §4.11 (h)'s lapse test
    (VD-06), §4.1's and §1.4's item-23 paragraphs (VD-35a, VD-35b), and §4.7 S10b's disruption weights (VD-16).
* **STALE.**
  * *In this part.* J-DET-2's index row and Part A entry (VD-24); §7.2's "refused and offered as `rejectSite`" (VD-33).
  * *Elsewhere, citing this part.* "Mutating the cached state" in §4.1, II.4, J-A28.42, §8.5 and §8.6 (VD-14a, VD-14b);
    §0.2 row 25's single repair operator (VD-11b).
  * *The probes named in the task.* Lots as buildings, binary wealth, size fixed by tier, one central market, the map
    editing the dossier, a proprietary-licence default, and terrain and water that never change: none occurs in §5–§7.
    Also 0 occurrences of "Epochs keep placed members", "claims-first re-derivation", "dependants re-derived" (for plots),
    §7.7's old `PlacementSolver`, and "a field brush or an epoch compares".
* **CROSS-PART.**
  * *Reflected.* Every note addressed to this part was read. The notes of the evolution-islands, assignments and kernel
    seats are reflected in full.
  * *Not reflected.* emulation-hidden (a) concerns (VD-09), (b) `Block.reach`, the reservation `rank` and the terrain
    kinds' names (VD-19, VD-10b), (c) and (d) the terrain operator for marsh (VD-11), and (e) the tables (VD-26);
    prosperity-change's lapse rule (VD-05) and `densify` / `thin` (VD-18); the model's `Passage.sealed` (VD-21),
    `Room.scope` (VD-25), the basement being "smaller than" (VD-27) and institutions' `knownTo` (VD-19); sewers'
    tunnel draw and access add (VD-20); rendering's §5.4 entries (VD-13); the kernel's underground exclusion row (VD-27).
* **DEFERRAL-WORDING.** None. "Staged" occurs only as the roadmap's hooks (F-PLAN, F-UNDER, the staged-layer rows,
  §7.7 item 8), which rule (4) allows.
* **BROKEN-REFERENCE.**
  * *Mechanical references.* `docs/validation/amendments-b/refs.py` on the assembled document reports 2 broken, both
    the pre-existing external citations, and 0 in §5–§7. Every sub-item pointer the part adds resolves (§4.7 S10 (7),
    S11 rule 5, §4.5 S7b (3)/(5), §7.3 item 7 (vii) and item 8, §6.5 (9)).
  * *Semantic references that do not resolve.* `reserve.market` and `cut.interior` (VD-09), `siltReach` (VD-10b),
    and the reroll "from its elaboration record" (VD-02).
* **NEW-PROBLEM.**
  * VD-01: the sentence broken in assembly.
  * VD-03 and VD-04: rung rerolls.
  * VD-07: the creation prefix against "nothing is hoisted".
  * VD-08: dossier events inside an epoch.
  * VD-10a: two `silt` ops in one union.
  * VD-12: the epoch invariant against rung 1, rung 2 and decline.
  * VD-31: the budget bound against over-budget events that land.
  * VD-32: the terrain operator's τ re-derivation inside an epoch.

## 4 Issues (owner · severity · kind · item) — each with its exact required change

### 4.1 This part's (determinism)

**VD-01 · determinism · major · new-problem · items 8, 17, 18, 20, 28 (f) — §6.3 Carry-over.** The survival bullet
now reads "…**survives**: it keeps its address and its lineage (so its draws do not" (l. 5776). Then comes the inserted
sub-bullet "- the kept parts of a designation mutation … under it (§7.7);" (l. 5777–5787), and only after it
"change); only its `parent` field and a `reparent` lifecycle event change;" (l. 5788). The block itself
(blocks-determinism.md l. 309–321) spliced its sub-bullet into the parenthesis, so the core survival rule is broken
mid-sentence. *Required:*
1. Restore l. 5776 + l. 5788 as one sentence: "it keeps its address and its lineage (so its draws do not change); only
   its `parent` field and a `reparent` lifecycle event change;".
2. Place the sub-bullet directly after that sentence, as its indented sub-bullet, text unchanged.

**VD-02 · determinism · major · conflict · item 28 — §6.1 reroll component.** §6.1 (l. 5510–5512): "For the plan rung's
concerns … they take the rung's own reroll from its elaboration record (§2.8, item 28)". §2.8's `ElaborationRecord`
(l. 1626) says "no reroll here: a rung's reroll count is what the log's regenerate events with rung give it". §6.2
(l. 5733–5735) and J-A28.62 say the same, and the record is a droppable cache outside both digests. A stream read from
it would break replay after an eviction. *Required:* in §6.1 replace "they take the rung's own reroll from its
elaboration record (§2.8, item 28)" with "they take the rung's own reroll — the absolute count the log's `regenerate`
events with `rung` give the building (§6.2, §7.1), never a field of the elaboration record (§2.8)".

**VD-03 · determinism · major · new-problem · item 28 — §6.1, §7.1 `regenerate.rung`, §7.4 rung row, J-A28.61.** The
problem, in five parts:
* *One counter.* All four `plan.*` concerns are "keyed with the rung's own reroll", and that one count lives under the
  single key `<building id>#plan` (§6.1 l. 5513, §7.1 l. 6134, §7.4 l. 6647).
* *What is promised.* "New random on `plan.roles` … moves no wall" (§2.6 step 7), and §7.4 says "`plan.roles` every wall
  and opening position".
* *Why the promise fails.* A roles re-roll advances the counter that `plan.layout` also reads, so the partition
  re-rolls with it.
* *The other rungs.* `rung` also admits `'wings'` and `'rooms'`, for which §6.1 defines no counter or key, although §2.6
  (l. 969) says each rung's streams take "each rung's own reroll (§6.1)".
* *The key type.* `rerolls: Record<Id, number>` cannot key `<id>#plan`, which is not an `Id`.

*Required:*
1. **§6.1.** Replace the plan-rung sentence with this text: "The stage-3 rungs are their own derivation units, with one
   reroll counter per `regenerate.rung` value. Each counter is an absolute count, stored in the log's `regenerate` event
   under the key `<building id>#<rung>` (`#wings`, `#rooms`, `#plan`, `#plan.layout`, `#plan.roles`, `#plan.furnish`).
   A stage-3 concern's stream key mixes, through the one mixer (§14 `Rng.stream`), the counters at its own level and
   every level above it:
   * `plan.program`: `#plan`;
   * `plan.layout`: `#plan` and `#plan.layout`;
   * `plan.roles`: `#plan`, `#plan.layout` and `#plan.roles`;
   * `plan.furnish`: all four;
   * the composition's concerns: `#wings` and `#rooms` the same way.

   So a finer re-roll leaves every coarser concern's stream unchanged, and a coarser one re-rolls everything below it."
2. **§7.1.** Type the event's map as `rerolls: Record<Id | RungKey, number>`, with `type RungKey = string /*
   `${Id}#${rung}` */`. Change the comment to "the map's key is `<building id>#<rung>`".
3. **§7.4.** In the regenerate-with-rung row, read column, write "the rung's counter (§6.1; the event's map under
   `<building id>#<rung>`)".
4. **J-A28.61.** Amend its index row and its Part A entry to match.

**VD-04 · determinism · major · new-problem · item 28 — §5.1 (6) and §7.4 rung row.**
* *The rule.* New random's check compares "each scope entity's **content digest** — the Merkle node of its subtree
  (§6.2)" (l. 5327).
* *Why it cannot see a plan.* An unstored rung is outside every digest (§6.2 l. 5725–5731), so a `regenerate` with
  `rung` on an unstored plan always reads "unchanged".
* *The result.* It advances to `reroll.maxAdvance`, keeps the original reroll and reports "no alternative within the
  ladder", so the plan re-roll can never take effect. §7.4 (l. 6647) runs it "under §5.1 (6)'s content check".

*Required:* add to §5.1 (6): "For a `regenerate` with `rung`, the content compared is the rung's own derived result,
before and after, with identity left out: its cached content hash (`ElaborationChunk.hash`, §2.9) for an unstored rung,
the stored composition's subtree for an edited one. An unstored rung lies outside the model subtree (§6.2)." Then have
§7.4's rung row cite it.

**VD-05 · determinism · major · conflict · item 20 — §7.7 item 3, `Rejection`, §7.4 `rejectSite` and `epoch` rows,
J-A20.74 (with pipeline §4.11 (h) / J-A20.41 and scope §13.2 T20-2).** Three lapse rules are in force.
* **§7.7** (l. 7025–7026): lapse "at the first `epoch` event, or dossier event whose effective scope holds the site's
  block, that folds after it". Any epoch lapses it. J-A20.74 says the same.
* **§7.4's epoch row** (l. 6658): "a rejection whose site's block the epoch touches lapses (§7.7)". Only an epoch that
  touches the block lapses it.
* **§4.11 (h)** (l. 4892–4894), **J-A20.41** and **§13.2 T20-2** (l. 9827–9828): lapse when "the epoch's population
  target differs from the target recorded with it". But `Rejection.held = { epoch; blockSeq }` records no target, and
  no rule reads `blockSeq`.

The owner's words tie the lapse to "if a settlement grows or declines". *Required* (ruling recommended, vetoable: adopt
J-A20.41's test, which the pipeline step and T20-2 already use):
1. **The record.** `interface Rejection { element: Id; site: Id; seq: number; held: { epoch: number; populationTarget:
   number /* the target in force when the rejection was made: the recipe's, else the last folded epoch's
   EpochInputs.populationTarget */ }; lapsedAt?: number }`, with `blockSeq` removed.
2. **§7.7 item 3.** It reads: "…it holds while the settlement stays in the state it was made in, and **lapses** — the
   site eligible again under the ordinary rules, the element staying where it is — at the first `epoch` event folded
   after it whose `populationTarget` differs from `held.populationTarget` (the settlement has grown or declined), or at
   the first dossier event whose effective scope holds the site's block. The lapsing event writes `lapsedAt` into the
   record inside its own touched set…".
3. **§7.4.** In the `rejectSite` row write "the hold lapses by §7.7's rule". In the epoch row write "every live
   rejection is re-checked by §7.7's lapse rule". Neither row restates the rule.
4. **J-A20.74.** Amend its index row and Part A entry to this rule, citing J-A20.41.

**VD-07 · determinism · major · new-problem · item 22 (d) — §7.7 One path, §7.4 replay semantics, §6.2, §7.1
`EditBase`.**
* *The claim.* §7.7 (l. 6993–6995) says every element of the creation dossier becomes an `assign` event at log positions
  0…k and "the dossier's elements are counted in S2's demand as well" (J-A22.72, and J-A22.41 in the pipeline).
* *Where they live.* §2.9 (l. 1756) says the blueprint's assignments "enter as the log's first events". `Recipe` has no
  field for them, and §11.4 passes them to `generate` as blueprint fields.
* *The gap.* In a session S2 has them in hand. A replay, `model = G(outputVersion, base, log)`, can give them to S2 only
  by reading events ahead of the fold, which §7.4 (l. 6628, "nothing is hoisted") and J-DET-6 forbid.
* *A false claim.* §4.2 (l. 3597–3598) says "a replay reproduces them because the run reads the same recipe", but the
  recipe does not hold them.

*Required* (ruling recommended: one declared read-ahead, keeping the log the one source of truth for assignments,
LC-24):
1. **§7.1.** `EditBase` gains `creation?: true /* set by `generate` on the blueprint's and the creation dossier's
   assign events at positions 0…k */`.
2. **§7.4, under Replay semantics.** Add: "The one read-ahead: the base derivation's S2 reads the log's **creation
   prefix** — the `creation` events at positions 0…k — as fixed rows before it runs. Folding those events afterwards
   records the generation run's placements and places nothing a second time (§4.2; J-A22.41, J-A22.72)."
3. **§6.2.** One line: the base derivation reads the creation prefix (§7.4).
4. **J-DET-6.** Its index row and Part A entry gain "*(amended by amendments b: the creation prefix is the fold's one
   declared read-ahead, J-A22.72)*".

**VD-08 · determinism · major · new-problem · item 22 (e) — §7.7 item 6 and §7.4 epoch row.** §7.7 (l. 7052–7053) says a
dossier event arriving mid-history is "a mutation at that epoch, folded at its log position after the epoch's use step
(§4.11, item 22 (e))". A log event folds at its own position, so it cannot also run inside the epoch after the use step.
§4.11 (e) and J-A22.42 apply "a dossier event that arrives with the epoch's inputs" at step (e). But
`EpochInputs = { years; populationTarget; circumstances; events: { kind: string; params: Record<string, number> }[] }`
(l. 5038) cannot carry an `assign`, `unassign` or `setAttr` event with a `DossierRef`. *Required:* §7.7 item 6 reads:
"Inside the evolution stage the same rules apply. A dossier change the host sends with an epoch rides in that epoch's
`EpochInputs.dossier` and is applied at §4.11's step (e), after the use step and the ladder and before siting
(J-A22.42). One sent between epochs folds at its own log position, as a mutation of the map the last epoch left." §7.4's
epoch row carries the same pointer. The field itself is VD-08b (pipeline).

**VD-09 · determinism · major · broken-reference · items 24, 30 (route: 30) — §6.1 concern registry.** Two concerns are
used but not registered:
* `reserve.market`: §4.2 S3 (12) (l. 3554–3555) says "a controlled random term of share 0.1 from the `reserve.market`
  concern (§6.1)".
* `cut.interior`: §4.6 (l. 4138–4139) says "the draw is the block's interior draw (`cut.interior`, one pair: treatment,
  reach)", and §0.2 row 30 says "the concern `cut.interior` in §6.1".

Neither is in §6.1's registry, although the emulation-hidden seat's cross-part note (a) asked for both. *Required:*
append to §6.1's list "Appended by the amendments": "`reserve.market` (a geometry concern, non-rerollable, attempt cap 0;
read by §4.2 S3 (12)'s trade-convergence score, keyed by the town root's entity key) and `cut.interior` (a geometry
concern, non-rerollable, attempt cap 0; read by §4.6's deep-interior rule, one (treatment, reach) pair per deep block,
keyed by the block's lineage)". Each takes an append-only u16 id.

**VD-10b · determinism · minor · broken-reference · item 25 — §7.1 terrain-and-water row, §7.4 convert row.** Two
defects:
* The rows cite `siltReach`, but no union declares it: §4.11's `TerrainWaterOp` says `'silt'` (see VD-10a).
* §7.1's row omits `digCanal` ("`convert` (reclaim, siltReach, shiftCourse — …)").

*Required:*
1. §7.1's row reads "`convert` (`reclaim`, `siltReach`, `shiftCourse`, `digCanal` — the slow conversions the evolution
   engine will schedule, usable by hand now), repaired through S1's terrain or water operator (§7.3 (a), (b)) or the carve (§4.11)".
2. §7.4's convert row adds "`digCanal` is the carve (§4.11)".
3. Keep `siltReach` once VD-10a renames the water kind. If VD-10a is vetoed instead, write `silt` here.

**VD-11 · determinism · minor · conflict · item 25 — §7.3 (b) lead, §7.1 row, §7.4 convert row, J-A25.61.** Four places
route every terrain and water conversion through the water operator:
* §7.3 (b) (l. 6450–6452): "The terrain and water conversions of §4.11 (item 25: reclamation, silting, a course shift)
  run through this operator".
* §7.4: "`reclaim`, `siltReach` and `shiftCourse` run S1's water operator".
* §7.1: "repaired through S1's water operator".
* J-A25.61: "repair through S1's water operator".

The home, §4.11 (l. 5205–5207), says "`reclaim` runs S1's terrain operator (§7.3 (a)) … and, for a foreshore, S1's water
operator". A marsh is a `LandUse` face, not water. *Required:*
1. **§7.3 (b).** "(item 25: silting, a course shift and a foreshore's reclamation) run through this operator …; a marsh's
   reclamation runs the terrain operator (a), and `digCanal` the carve (§4.11)".
2. **§7.1 and §7.4.** The same wording. §7.4's undo cell adds "a terrain or water conversion's chain scope (§2.3)".
3. **J-A25.61.** Its index row and Part A entry read "repaired through S1's terrain or water operator or the carve".

**VD-12 · determinism · major · new-problem · item 31 (with 8, 17, 18, 30) — §5.3 epoch row.** The row (l. 5410)
requires two things across the epoch:
* "a plot without a rung-3 event keeps its ring and its buildings' shells across the epoch";
* checked "against their pre-epoch rings and leaf digests".

The epoch's own operations fail this:
* **Rung 1 writes leaf attributes.** It sets `Building.condition` and `households`, and a completed upward
  refurbishment raises `Plot.builtBand` (§4.11 l. 4866–4868).
* **Rung 1 can add wings.** Growing rich runs "renovation and extension by `mutate`'s adapt and add steps" (§4.11
  l. 4790).
* **Rung 2 re-cuts the plot.** `densify … back_court` cuts the plot's yard into rear plots through S10's re-cut (§4.11
  l. 5229–5231), so the ring changes without a rung-3 event.
* **The use step changes shells.** Its `mutate` may add a wing or storey (item 18 (a)).
* **Decline conversions change geometry.** `clear` zeroes heights, `reuse … build` raises a successor, and
  `plotToGarden` / `amalgamate` merge plots, all at epochs.

As written, this hard invariant aborts ordinary epoch batches.

*Required:* restate the row as follows.
* *Invariant cell:* "the epoch rows (item 31, §4.11). No occupied building is removed by a band change: a redevelopment
  first vacates through item 17's relocation. Across the epoch, the ladder's rungs 1 and 2 change no frontage edge.
  They shrink or re-cut no building shell toward a poorer band; a shell is the subtree the interior-ladder row names:
  wings, heights, entrances, roof, basement. Rung 2 moves plot lines only inside a yard. Every other change of a plot's
  ring or a building's shell is caused by one of these, each with its lifecycle event: a rung-3 event; a designation
  or renovation mutation (item 18; the use step; rung 1 growing rich); or a decline, terrain-and-water, island or carve
  conversion (§4.11). Every plot's geometry band is at or above its floor."
* *Scope:* stage-end (each epoch).
* *Check:* "the touched plots' frontage edges and their buildings' shell subtrees against their pre-epoch values, each
  difference matched to one of those lifecycle events; every plot's band pair".

**VD-13 · determinism · major · missing · items 17 (d), 20, 22 (b) — §5.4.** §11.2 (l. 8867) makes `report.changed`
carry "the report's new entries, §5.4: placement rejections and positive placements with their lapses, use openings,
closings and relocations, mutation records and disruption reports". §7.7 promises "every move, closing and reopening is
reported (§11.3)". But §5.4's `GenerationReport` declares only the standing `dossier` list, and no entry shape exists
for lapses, uses, mutations or disruptions. The rendering seat's note is unreflected. *Required:*
1. Add a field to `GenerationReport`: `changes: ReportEntry[] /* derived from the lifecycle events of the latest fold,
   in seq order; what report.changed sends (§11.2) */`.
2. Declare the type:

```
type ReportEntry = { seq: number; epoch: number } & (
    { kind: 'reject' | 'lapse' | 'place'; element: Id; site: Id }
  | { kind: 'open' | 'close' | 'relocate'; use: Id; from?: Id; to?: Id }
  | { kind: 'mutate'; plot: Id; mutation: number /* index into the event's EditBase.mutations */ }
  | { kind: 'disruption'; overBudget: boolean /* the event's EditBase.disruption holds the detail */ });
```

3. Add one line to §5.4's prose naming the list.

**VD-18 · determinism · minor · partial · items 31, 30 — §7.1 edit targets, §7.4 convert row.** Three `LadderOp` kinds
of §4.11 (l. 4921–4923) are on no edit-target row and in no §7.4 lifecycle cell: `densify` (`infill` or `back_court`),
`thin`, and `subdivide`. §7.1's plots row lists only `plotToGarden`, `amalgamate`, `sealPassage` and `openPassage`. Yet
three places say §7.1 carries them: §0.2 row 31 ("`relet`, `densify`, `thin`, split and join … (§7.1, §7.2, §7.4)"),
§13.2 and §14 (l. 10498: "… relet, densify, thin … are §7.1's"). *Required:*
1. §7.1's blocks/plots row reads "`convert` (`plotToGarden`, `amalgamate`, `subdivide`, `densify`, `thin`,
   `sealPassage`, `openPassage`; §4.11)".
2. §7.4's convert row adds: "`densify … infill` and `thin … infill` add or clear yard buildings by S11's mutator;
   `densify … back_court` and `thin … back_court` re-cut the plot's yard by S10 (7) with its neighbours fixed, adding or
   removing a rear row and its passage face (§4.6, §4.11); `subdivide` and `amalgamate` are rung 3's re-cuts, whose hand
   forms are §7.1's `split` and `join`".
3. §7.4's undo cell adds "a ladder conversion's former rings, records and passage face".

**VD-19 · determinism · minor · missing · items 30, 24 — §7.1 edit targets, §7.4 item-30 row.** §2.8 (l. 1697–1698)
requires that "every new attribute has its edit kind or is declared derived (§7.1)". Three attributes fail it:
* `Block.reach` (§2.5 l. 854, S8's draw) has no edit kind; the emulation-hidden seat's note (b) asked for
  `setAttr(reach)`.
* `Institution.knownTo` is edited in §7.1's prose and in §7.7 (7), but no institutions row exists.
* `Reservation.rank` (item 24) has no edit kind.

*Required:*
1. The blocks/plots row adds "`setAttr` on a block's `reach` (open, passage, gated), which re-derives the block's
   interior by S10's re-cut with its neighbours fixed".
2. Add a row "institutions (§2.7) | `setAttr` (`knownTo`, name), `assign` / `unassign` (§7.7)".
3. Add a row "reservations | `setAttr` (a market's `rank`), which re-derives from §4.2 S3 (12)'s batch with the fate
   report".
4. §7.4's item-30 row read column adds `Block.reach` and `Institution.knownTo`.

**VD-20 · determinism · minor · missing · items 11, 12 — §7.1 tunnels and access-points row, §7.4.** Four defects:
* **No draw event.** Tunnels are "drawn as a `tunnel` chain on the underground arena" (l. 6273), but no `EditEvent` kind
  draws one, and `drawWay` writes `way` chains, which U2 forbids underground.
* **No create event.** Access points are "add, move, remove through `setAttr` on the `AccessPoint` record", but
  `setAttr` cannot create a record.
* **No lifecycle row.** §7.4 has no row for either.
* **A derived value edited directly.** `setAttr` (… condition) writes what §2.7 (l. 1513) declares a derived reading of
  `existence` and `closure`, and §7.4 says tunnel conversions "change `Tunnel.condition`".

*Required:*
1. **§7.1.** Add `| { t: 'drawTunnel'; points: PointCm[]; kind: Tunnel['kind']; widthCm?: Cm }` and `| { t:
   'placeAccess'; kind: AccessPoint['kind']; ground: PointCm; tunnel: Id }`. Moving uses `moveVertex` on the
   `access_point` vertex and removing uses `delete`.
2. **§7.4.** Add a row for both: create from the underground tools; regenerate by II.7's network and underground stages
   re-deriving the blocks the edges bound (§7.3's staged-layers row); undo through the replaced scope.
3. **Condition.** Drop `condition` from the tunnels' `setAttr` list, because the condition changes only through `silt`,
   `caveIn`, `seal` and `reopen`. In §7.4 write "tunnel conversions change the tunnel's `existence` and `closure` (its
   condition reads them, §2.7)".
4. **Preset.** Change `preset` in that list to `widthCm` and `headroomCm`: `Tunnel` (§2.7 l. 1510–1513) has no preset
   field, and the preset is II.7.2's network choice.

**VD-21 · determinism · minor · conflict · item 30 — §7.4 item-30 row and convert row, §5.3 wording, J-A30.71.** This
part names the stored fact behind sealing differently from the model:
* This part: "the access rows' `sealed` flag" (§7.4 l. 6645), "`sealPassage` / `openPassage` mark the access row"
  (l. 6640), and J-A30.71: "a flag on the access row".
* The model, §2.5 (l. 875, l. 933) and J-A30.21: `Passage.sealed` is "the one stored fact behind a sealed access edge
  and exposure `sealed`".

*Required:*
1. §7.4's read column: "the passage face and its `Passage.sealed` bit (§2.5)".
2. §7.4's convert row: "`sealPassage` / `openPassage` set `Passage.sealed`, change no geometry, and vacate or reoccupy
   the plots behind it (§4.11)".
3. J-A30.71's index row and Part A entry: "a sealed passage is `Passage.sealed`, §2.5's one stored fact (J-A30.21); its
   access edges read sealed and §5.3's walk skips them".

**VD-22 · determinism · minor · partial · item 31 (c) — §6.3 JOIN and SPLIT.** §6.3 says two things about the children
of a split:
* "A SPLIT keys each child by the parent's lineage key with the child's index as its creation index";
* "the child that keeps the parent's frontage anchor keeps the address and the lineage, the others take fresh
  addresses and the continued lineage" (l. 5887–5889).

The second can be read as the anchor child keeping the parent's key unchanged. That contradicts the first, J-A31.73 ("a
split child the parent's key with its child index") and the owner's (c). *Required:* "…the child that keeps the parent's
frontage anchor keeps the address and the others take fresh addresses; every child takes the continued lineage, the
parent's lineage key with its child index".

**VD-24 · determinism · minor · stale · item 31 — J-DET-2.** The index row (l. 11997) and Part A entry (rationale l. 102)
still read "lineage kept only for entities surviving un-derived; successors get the address only". §6.3 (l. 5893–5894)
now says "A mutation continues lineage; only a New random takes a fresh one (J-DET-2, amended so)". *Required:* add to
both, in the consistency pass's convention: "*(amended by amendments b: a mutation — a fusion, a splitting, a ladder
step, an interior re-cut — continues lineage; only New random takes fresh lineage; J-A31.73, J-A28.63, J-A8.61)*".

**VD-25 · determinism · minor · partial · items 28 (f), 20, 17 — §7.5 schema transforms.** The transforms give a stored
plan's rooms their `unit` but not their `scope`, which the model seat asked for. They also state no defaults for the new
required `Assignment` fields: `existence`, `pinned` and `use`. *Required:* add these two clauses.
1. "Each room's `scope` comes from its role's programme row, `circulation` for corridors and stair halls."
2. "An older assignment gets `existence: 'map'` and `pinned: false`, and its `use` is linked at first load to the `Use`
   its member's building received above."

**VD-26 · determinism · minor · partial · item 23 — §7.6.** Three gaps:
* **The cell schema.** The literal "`{value, unit, provenance: {source, date, note}, calibratable}`" (l. 6894) lacks the
  `extension` field the emulation bullet adds.
* **The source values.** "names the reference behaviour … (`ref:⟨reference⟩ ⟨behaviour⟩`) or `own`" omits §17.1 (6)'s
  other values: `owner`, `owner-eye`, `architecture ⟨date⟩`, `corpus`, `host`. Most amendment rows carry "architecture
  2026-09-26".
* **The enumeration.** It lacks tables the amendments add: `prosperity.bands` (§4.5), `market.siting` (§4.2 S3 (12)),
  `FarmModeRow` (§4.9) and the reach weights (§4.6). The emulation-hidden seat's note (e) asked for them.

*Required:*
1. The cell becomes `{value, unit, provenance: {source, date, note}, calibratable, extension?: {over, mode}}`.
2. The source clause reads "…in §17.1 (6)'s grammar: `ref:⟨reference⟩ ⟨behaviour⟩` for an emulated default, otherwise
   `own`, `architecture ⟨date⟩` or another of its values".
3. Add the four tables to the enumeration.

**VD-27 · determinism · minor · partial · items 29, 12 — §5.3.** Two rows need more:
* **The basement row** (l. 5405) says "lies inside its ground storey's wings". The home, §2.6 and §0.2 row 29, says
  "inside and smaller than", and the model's note agrees.
* **The surface exclusion.** The kernel's note asked that "no underground face lies under a ground water, wall, gate,
  keep or reservation face" be a §5.3 row. The rule exists only in F-UNDER's test column (§5.2).

*Required:*
1. The basement row reads "a basement lies inside and is smaller than its ground storey's wings…".
2. The staged-layers row adds "no committed underground plot has a sample in an excluded ground face (II.7.3's list;
   F-UNDER, §5.2)". Its scope is batch-local on the touched underground plots, and its check reads by `pointLocate` on
   the ground's `PlatKey`.

**VD-28 · determinism · minor · partial · items 8, 12, 17, 20, 30 — §6.2 root layout.** Six records the amendments put
in the model digest have no named subtree: `Use` (§2.7), `Rejection` ("model data, in the digest"), `MaterialLedger`
("inside the model digest"), `Passage`, `AccessPoint` and `Tunnel`. The layout names site, network, districts,
hinterland, content, names, closeups, identity and plats. *Required:* extend the layout.
* content: "(`Allocation`, `FieldBands`, institutions, factions, relations, `Use` records, `Rejection` records, the
  `MaterialLedger`)".
* districts: "… plot → buildings, yards, households, pins, its `Passage` records".
* A new layer "underground — `Tunnel` and `AccessPoint` records". The underground's plots already fall under districts
  through their pseudo-district.

**VD-29 · determinism · minor · partial · items 30, 12, 10 — §6.3 anchor table.** Four new entity kinds have no anchor
row: `Passage`, `AccessPoint`, `Tunnel` and `SkyIsland`. §2.8's registry declares "anchor encoding, hysteresis radius
and class family (§6.3)" for every type, and one routine hands addresses on in every re-derivation. *Required:* add
these rows.

| kind | anchor | radius | class family |
|---|---|---|---|
| passage | its face's two ends on the front building's side line | 0.5 m | kind |
| access point | its position | 1 m | `AccessPoint.kind` |
| tunnel | its end junctions' addresses, else overlap ≥ 50 % of its length | — | tunnel kind family |
| sky island | (town lineage, slot index) — its minted key, J-A8.61 | same slot | kind |

**VD-30 · determinism · minor · duplicate · item 28 (f) — §7.3 click row.** The row (l. 6415) restates §2.6's re-cut rule:
the fixed set, least disruption, and "a room whose ring fits a role of the new programme kept with its ring and address".
It drops the home's guard "whose wing ring is unchanged" (§2.6 l. 1414–1417; J-A28.26). After an item 18 shell mutation
of an unstored plan, the two statements disagree. *Required:* replace the restatement with "each step §2.6's re-cut rule
— its fixed set and kept-room rule, J-A28.26 — with its draws keyed by the step (§6.1)", keeping the as-built pointer.

**VD-31 · determinism · minor · new-problem · item 22 — §7.3 item 1.** The item's scope is "bounded by the request
kind's disruption budget (§7.7)". But §7.7 item 5 and §7.1 say "an event no rung fits within budget still lands … and
is reported over budget", so an over-budget dossier event's scope exceeds that bound. *Required:* "…bounded by the
request kind's disruption budget (§7.7), except a dossier event over budget, whose scope is the touched set of its
least-disruptive placement, reported over budget".

**VD-32 · determinism · minor · new-problem · items 25, 31 — §7.3 (a) 3 vs §7.2.** The terrain operator's step 3
re-derives "blocks whose plot samples moved beyond τ … as for a field brush", which is authorial and resets
`builtBand`. When the engine's `reclaim` runs it inside an `epoch`, that contradicts §7.2's "an epoch never re-derives
a block by τ — it acts on survivors only through §4.11's ladder". *Required:* append to (a) 3: "inside an `epoch` event
the re-evaluated drivers only mark due blocks for §4.11's ladder and re-derive nothing by τ (§7.2)".

**VD-33 · determinism · minor · conflict · item 20 — §7.2 Protection.** §7.2 says "a `delete` on it is refused and
offered as `rejectSite`", a two-step. §7.1 says it "becomes `rejectSite`" and §7.7 item 3 that it "is the `rejectSite`
event". *Required:* §7.2 reads "a map `delete` of it is recorded as `rejectSite` (§7.7)".

**VD-34 · determinism · minor · missing · item 20 (c) — §7.7 item 2, §5.2 F-EDIT.** "Only a dossier event removes, adds
or re-designates it" gives no mechanism for a map `unassign`, or a map `setAttr` of use or class, on a dossier-backed
element, meaning an event without `EditBase.dossier`. *Required:*
1. §7.7 item 2 adds: "a map `unassign`, or a map `setAttr` of its use or class, on a dossier-backed element is refused
   as F-EDIT, with the actions `rejectSite` (move it) and `placeAt` (designate the plot for something else, the element
   re-placed)".
2. F-EDIT's detection column gains that case.

### 4.2 Other parts' (found while checking what cites this part)

**VD-06 · pipeline · minor · duplicate · item 20 — §4.11 epoch order (h).** Step (h) (l. 4892–4894) restates a lapse
test, "the epoch's population target differs from the target recorded with it", and calls it "§7.7's lapse rule",
while §7.7 states another. *Required:* after VD-05, (h) reads "every live placement rejection is re-checked by §7.7's
lapse rule (J-A20.74, J-A20.41), the epoch writing `lapsedAt` inside its touched set", with no restated condition.

**VD-07b · pipeline · minor · conflict · item 22 (d) — §4.2 "Dossier-backed elements at creation".** The sentence "a
replay reproduces them because the run reads the same recipe" (l. 3598) is false: the recipe holds no assignments.
*Required:* "…because the base derivation reads the same creation prefix of the log (§7.4)", once VD-07 lands.

**VD-08b · pipeline · major · missing · item 22 (e) — §4.11 `EpochInputs` and step (e).** J-A22.42 applies "a dossier
event that arrives with the epoch's inputs" at step (e). But `EpochInputs` (l. 5038) has no field that can hold an
`assign`, `unassign` or `setAttr` event with a `DossierRef`; `events` are `{ kind: string; params: Record<string,
number> }`. *Required:* `interface EpochInputs { …; dossier?: EditEvent[] /* the host's dossier events (author 'host',
EditBase.dossier set), in the host's order, applied at step (e) (§7.7 item 6) */ }`. Step (e) then names the field.

**VD-10a · pipeline · major · new-problem · item 25 (with 11) — §4.11 `ConversionOp`.** The one union holds two members
with the same discriminant: `DeclineOp`'s tunnel `{ op: 'silt' …; tunnel: Id }` (l. 5185) and `TerrainWaterOp`'s
`{ op: 'silt'; water: Id … }` (l. 5200). A dispatch on `op` is ambiguous. The determinism seat's note asked for
`siltReach`, and §7.1 and §7.4 already use it. *Required:* rename `TerrainWaterOp`'s kind to `'siltReach'` in §4.11's
union, repair bullet and trigger rows, and carry the name to the places that cite it:
* §2.3 "Slow change";
* §0.2 row 25 (scope);
* §12.6 (rendering);
* §13.2 T25-1 (scope).

`DeclineOp`'s tunnel `silt` stays.

**VD-12b · pipeline · minor · conflict · item 31 — §4.11 rung 2 and the floor paragraph.** Two sentences deny changes
that §4.11's own rungs make:
* Rung 2 says "Rung 2 moves plot lines only inside the yard; the plot's ring and its main shells stand" (l. 4801–4802),
  yet `densify … back_court` re-cuts the plot through S10 (l. 5229–5231).
* The floor paragraph says the rich ↔ middle cycle runs "with no plot or shell change" (l. 4861), yet rung 1 growing
  rich extends shells by `mutate`'s add steps (l. 4790).

*Required:*
1. Rung 2 reads "the plot's frontage and its main shells stand".
2. The floor paragraph reads "with no frontage change and no shell falling toward a poorer band (renovation may extend
   a shell, item 18)".

Both must match §5.3's restated row (VD-12).

**VD-14a · pipeline · major · conflict · item 28 (canonical prior) — §4.1, II.4, J-A28.42.** Three places say a stale
rung is re-derived from the cache:
* §4.1 (l. 3202): "until the next click re-derives it by mutating the cached state (§7.3, item 18)";
* II.4 (l. 11264): "the click re-derives it by mutating the cached state (§7.3, item 18)";
* J-A28.42 (index l. 12327 and Part A rationale l. 432): "a stale one re-derived by mutating the cached state".

All three contradict §7.3's canonical-prior row, §6.2 and J-A28.71: "committed state, never the cache". *Required:* in
each, replace the phrase with "as a mutation from its canonical prior — the stored plan, else the as-built plan carried
along §2.6's interior ladder, never the cache (§7.3; J-A28.71)". For II.4's close-ups use "as a pure function of the
district's committed state (§6.2), never from the cache".

**VD-14b · rendering · major · conflict · item 28 — §8.5, §8.6.** Two places repeat the cache-as-prior wording:
* §8.5 (l. 7745): "the click re-derives the rung by mutating the cached state (§7.3)";
* §8.6 (l. 7765–7766): "served from the cache until the click re-derives it by mutating the cached result (§7.3; item 28
  (c))".

Both contradict §7.3 and J-A28.71. *Required:* in both write "…until the click re-derives it from its canonical prior —
never the cache (§7.3)". Serving the stale result from the cache until the click stands.

**VD-15 · pipeline · major · conflict · item 20 — §4.7 S10b Reconcile and infeasibility.** S10b says "a post-build
request that no plot satisfies returns the same closest options as an F-EDIT action (§5.2) — choose one, relax a named
row for this item, or withdraw" (l. 4343–4345). This applies to `dossier` requests too. It contradicts §7.7's precedence
(J-A20.71: "when no site passes them, the best-scoring site with the rows it fails reported … never omitted") and §7.1
("a dossier event … still lands"). A host event cannot "withdraw". *Required:* append "— except a `dossier` request,
which places at the best-scoring site with the hard rows it fails reported (§7.7's precedence, J-A20.71)".

**VD-16 · pipeline · minor · duplicate · item 22 — §4.7 S10b least-disruption order.** S10b states its own "disruption
cost (a table weight per displaced use, per join and per subtracted part)" and "one further level of displacement at
most — a table depth, default 1" (l. 4328–4333). This restates §7.7's `DisruptionBudgetRow` (`weights`,
`displacementDepth`) without naming it and omits `vacated`; the determinism seat's note asked for the pointer.
*Required:*
1. "disruption cost — §7.7's `DisruptionBudgetRow` weights for the request kind (displaced use, join, subtracted part,
   vacated plot)";
2. "one further level of displacement at most — the row's `displacementDepth`".

**VD-17 · pipeline · minor · conflict · item 28 (f) — §4.11 rung 1 and the `LadderOp.relet` comment.** "the plan rung
re-cuts … when next clicked" (l. 4784, l. 4920) is true only of an unstored plan. A STORED plan is re-cut inside the
`relet` (§7.3's stored-plan row; J-A28.72). *Required:* "…when next clicked, or inside this event for a stored plan
(§7.3; J-A28.72)".

**VD-23 · pipeline · minor · duplicate · item 31 (c) — §4.11 "Lineage survives" bullet and J-A31.48.** The bullet
(l. 4874–4879) restates §6.3's JOIN and SPLIT lineage rule, whose home is R5. J-A31.48 (index l. 12321) records the same
choice as J-A31.73 (l. 12241). *Required:*
1. The bullet reads "Fusion and splitting continue lineage by §6.3's JOIN and SPLIT rule (J-A31.73), so one seed with
   one history gives one town and an undo is exact (§7.4)".
2. J-A31.48's index row and Part A entry say "the pipeline's reading of J-A31.73 (§6.3)", or fold into J-A31.73.

**VD-35a · pipeline · minor · duplicate · item 23 — §4.1 "Emulation-first defaults" bullet.** The bullet (l. 3172–3178)
restates §7.6's reading rule for absolutes almost word for word: "Where a stage rule in this part says 'always', 'never'
or 'first … then', it states that row's default value … engineering invariants (planarity, 'never re-rolled', 'never
stored', work limits) are not settlement rules". *Required:* "Emulation-first defaults (item 23): every stage rule's
default and its extensions follow §7.6's rule and marker (J-A23.71); `RelationRule.extension` and
`placement.extensionWeight` are the placement family's form of the marker", with no restated reading rule.

**VD-37 · pipeline · minor · conflict · items 11, 12 — II.7.2 Editing.** "`setAttr` on its condition and preset"
(l. 11525–11526) edits what §2.7 declares a derived reading of `existence` and `closure`. A preset is also not a `Tunnel`
field. *Required:* "`setAttr` on its kind, bore and headroom; its condition changes only through the conversions
`silt`, `caveIn`, `seal` and `reopen` (II.6), and the preset is the network's", matching VD-20.

**VD-11b · scope · minor · stale · item 25 — §0.2 row 25.** The row says "repaired by S1's water operator … through the
water operator of §7.3 (b)". The home, §4.11, repairs a marsh's reclamation by the terrain operator and `digCanal` by
the carve. *Required:* "repaired by S1's terrain or water operator or the carve (§7.3 (a), (b); §4.11)".

**VD-12c · scope · minor · conflict · item 31 — §13.2 T31-9.** The test says "after any run of epochs with no rung-3
event on a plot, its ring and its buildings' shells are unchanged" (l. 9904–9905). It fails on rung 2's back courts and
rung 1's extensions, as VD-12 shows. *Required:* "…its frontage edges are unchanged and no shell of its buildings has
shrunk or been re-cut toward a poorer band, every other change matched to a rung-3, mutation or conversion lifecycle
event (§5.3)".

**VD-35b · scope · minor · duplicate · item 23 — §1.4 paragraph and J-A23.01.** J-A23.01's index row says "§1.4 states
the principle once". Item 23's home is §7.6 (route; J-A23.71), and §1.4's paragraph restates the marker and the parity
presets. *Required:*
1. §1.4 keeps one sentence with its pointer: "Defaults emulate MFCG and FTG, the tiebreaker choosing between them, and
   extensions ride on top as table values (§7.6, the rule's home; §17.1 (6))".
2. J-A23.01's index row reads "§1.4 points to the principle's home, §7.6".

**VD-36 · model · minor · conflict (PLAUSIBLE) · item 20 — §2.8 `Identity.dossier`.** The field (l. 1571) marks "the
dossier element this entity exists for … such an entity is never removed by a map edit, only rejected from a site".
§7.7's `Assignment.dossier` holds the same id. §2.8 does not say which entity carries it. A `rejectSite` re-places the
element (its `Use` moves, item 17), so a building that carried the field would keep a stale dossier claim after its use
left. *Required:* §2.8 reads "carried by the entity the element is — its `Use` (§2.7) or assignment member — and moved
with it on every re-placement; a building never carries it".

## 5 CONFIRMED versus PLAUSIBLE

**CONFIRMED (read on disk and checked by grep; line numbers are the assembled `docs/ARCHITECTURE.md`, 12 417 lines).**
* *The texts, quoted.* Every quoted sentence and every contradiction between two quoted texts. That covers VD-01 (the
  archive l. 4352–4353 against blocks-determinism.md l. 309–321), VD-02, VD-03, VD-05, VD-06, VD-07 (the `Recipe`
  declaration holds no assignment field) and VD-08 (the `EpochInputs` declaration). It also covers VD-09 (a grep of §6.1
  finds neither concern), VD-10a/b, VD-11, VD-11b, VD-12c, VD-13 to VD-24, VD-26 to VD-31, VD-33 to VD-35 and VD-37.
* *The reference resolver.* `refs.py` on the assembled document: 2 broken references, both external, and 0 in §5–§7.
* *Rows, sub-items and seat notes.* Every J-row named exists in the index and Part A. Every new sub-item pointer of
  §5–§7 resolves. Each other seat's cross-part note to determinism was matched to the §5–§7 text.

**PLAUSIBLE (reasoning on the texts).**
* *Consequences.* That VD-04's content check makes a rung re-roll a reported no-op in practice. That VD-12's check fires
  on ordinary epoch batches. That VD-32's path runs when the engine exists. That VD-36's building would keep a stale
  dossier claim.
* *The recommended rulings.* VD-03 (the counter mixing), VD-05 (J-A20.41's test at the home), VD-07 (the creation-prefix
  read-ahead), VD-08 (`EpochInputs.dossier`) and VD-10a (renaming the water kind) are vetoable; each alternative is named.
* *Severity labels.* They are this seat's judgment.

**Not done by this seat.** It ran no document checks: they are the assembler's. It edited no design text: repairs go
to the repair round's block files.

