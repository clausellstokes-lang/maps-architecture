# Verify — DETERMINISM part (§5, §6, §7) after repair round 1 (r1)

> PENDING FABLE REVIEW — Opus-produced (amendments-b/verify-determinism-r1).

## PROGRESS (kill-safe ledger)
- READ: route.json (home 20, 22, 23; referencing 8, 10–19, 25, 28–31) and the owner's words, items 8–31 | done
- READ: my r0 report, repair-determinism-r1-report.md, assemble-r1.md, the cross-part sections of the five sibling repair reports and the kernel preamble (3) | done
- READ: §5, §6, §7 whole (live docs/ARCHITECTURE.md sha256 365e19f2…, l. 5402–7335) and the citing text: §0.2 rows 19–25, §1.4, §2.6 (plan rung, condition, Materials), §2.7 Tunnel, §2.8 (Identity.dossier, ladder, registry), §4.1, §4.2 creation, §4.7 S10b, §4.11 whole, §8.5, §8.6, II.4, II.7.2, II.7.4, §11.2, §13.2 T12-1 / T20-2 / T31-9, the J index rows and Part A entries of this part | done
- ITEM verdicts | done (section 2)
- RE-CHECK of the 45 r0 issues and the 13 other verifiers' determinism-owned issues | done (section 3)
- CHECKS (single-source, stale, cross-part, deferral, broken-ref, new-problem) | done (section 4)
- ISSUES (new in r1) | done (sections 5, 6, 7)
- FABLE queue row + LANDED line | done (row B-amendments-b/verify-determinism-r1 appended to docs/FABLE-REVIEW-QUEUE.md; LANDED line in docs/lane-events.log)

## 1 Outcome

Repair round 1 fixed the determinism part as its report claimed. Of the 45 r0 issues, 44 are FIXED in the assembled text
and one is PARTIAL (VD-36, model). Of the 13 determinism-owned issues the other verifiers raised, 12 are FIXED and one
is PARTIAL (VP-33). The three home items (20, 22 and 23) now carry their mechanisms whole: the lapse test, the creation
prefix, `EpochInputs.dossier`, the `changes` report and the emulation marker's cell schema.

The re-check still finds **18 issues: 0 blockers, 3 major and 15 minor.** Twelve belong to this part (2 major, 10
minor). The other six belong to pipeline (3, 1 major), model (2) and scope (1).

The majors are these.
* **VD1-01 (determinism).** §5.3's restated epoch row matches every ring or shell change to a closed list of events.
  The list leaves out the epoch's own growth step (the declared `demolish` and the re-cut of plots a new corridor
  cuts, the regrowth builds, `wallToWay`) and rung 1's yard infill. So ordinary growth epochs would still abort the
  batch, the same defect VD-12 fixed for rung 2.
* **VD1-02 (determinism).** The creation prefix is now the fold's one read-ahead, but an `undo`, a `revert` or a
  truncation can still target a creation event. Undoing it has nothing to restore, because the placement came from the
  base derivation and not from the event's fold. Truncating it changes what S2 reads ahead, so truncation identity
  (§6.5 (9)) fails.
* **VD1-03 (pipeline).** §4.11 rung 1 still takes an occupied building's roof ("late, the roof lost through
  `RoofSpec.kind 'none'`"). That is a shell change §5.3 cannot match to any event, and it contradicts §2.8's ladder, in
  which a roofless building is `decayed` and so already vacant. The determinism repair handed this to the pipeline,
  and the pipeline did not apply it.

**No ruling is needed.** Every required change follows an existing decision (J-A31.75, J-A22.74, J-DET-2, J-A31.44,
J-A20.71 and §2.8's ladder). The owner may still want to see one ruling carried from r1: J-A20.74 counts only a changed
population target as "grows or declines", so an epoch that changes prosperity alone does not lapse a rejection. The
program's drafted consequence for item 20 said that any epoch lapses it. The ruling is recorded and vetoable.

## 2 Per item — PRESENT / PARTIAL / MISSING (quotes from the assembled docs/ARCHITECTURE.md, sha256 365e19f2…)

### Home items

| item | verdict | the mechanism, quoted (line) | open issues |
|---|---|---|---|
| 20 one-way flow; the dossier is the authority | PRESENT (minor gaps) | §7.7 item 3 (l. 7228–7233): the rejection "lapses — the site eligible again under the ordinary rules, the element staying where it is — at the first `epoch` event folded after it whose `populationTarget` differs from `held.populationTarget` … or at the first dossier event folded after it whose effective scope holds the site's block"; `Rejection.held = { epoch; populationTarget }` (l. 7180); item 2 (l. 7218–7220): "A map `unassign`, or a map `setAttr` of its use or class … is refused as F-EDIT (§5.2), with the actions `rejectSite` … and `placeAt`"; §5.3 (l. 5539); §5.4 `dossier` and `changes` (l. 5592–5599) | VD1-05, VD1-06, VD1-08, VD1-17 |
| 22 dossier changes mutate the map, never re-roll it | PARTIAL | §6.2 (l. 5765–5766): the fold's "one declared read-ahead being the base derivation's S2, which reads the log's **creation prefix**"; §7.1 `EditBase.creation` (l. 6262); §7.4 Replay semantics (l. 6815–6818); §7.7 item 6 (l. 7258–7261): "A dossier change the host sends with an epoch rides in that epoch's `EpochInputs.dossier` (§4.11) and is applied at §4.11's step (e)"; §7.3 item 1 (l. 6545–6546): "except a dossier event over budget, whose scope is the touched set of its least-disruptive placement" | VD1-02 (major), VD1-06, VD1-12 |
| 23 emulation-first defaults | PRESENT (minor gap) | §7.6 (l. 7093–7094): cells carry "`{value, unit, provenance: {source, date, note}, calibratable, extension?: {over, mode}}`"; (l. 7105–7106): "`ref:⟨reference⟩ ⟨behaviour⟩` for an emulated default, otherwise `own`, `architecture ⟨date⟩` or another of its values"; the parity presets and the reading rule for absolutes (l. 7108–7116); §1.4 (l. 310) and §4.1 (l. 3257–3260) now point here | VD1-13 |

### Referencing items (the route's duties for this part)

| item | verdict | where (quote) | open issues |
|---|---|---|---|
| 8 decline and regrowth | PRESENT | §6.3 survival (l. 5940–5953), the sentence restored whole: "it keeps its address and its lineage (so its draws do not change); only its `parent` field and a `reparent` lifecycle event change"; §7.1 buildings and walls rows; §7.4 convert row | VD1-01 |
| 10 islands by prosperity | PRESENT | §7.1 sky-islands row (l. 6453); §6.3 anchor "sky island … its slot" (l. 6021); §6.2 root "sky — SkyIsland records" (l. 5800) | — |
| 11 the underground fades | PRESENT | §7.1 tunnels row (l. 6452): "a tunnel's condition is no `setAttr` path: it reads `existence` and `closure`, so a condition change is the matching `convert` (J-A11.21)"; §7.4 convert row | — |
| 12 underground neighbourhoods | PRESENT (minor gap) | §7.1 `drawTunnel`, `placeAccess` (l. 6299–6300); §7.4 row (l. 6829); §5.3 surface exclusion "no committed underground plot has a sample in an excluded ground face" (l. 5544); §6.3 anchors (l. 6019–6020) | VD1-11 |
| 13, 14, 15 islands and sewers by tier | PRESENT | §7.8 (l. 7294–7301); §6.1 `island.place` count and `sewer` readers (l. 5715–5721) | — |
| 16 relation and supply rules | PRESENT (minor gap) | §7.7 `PlacementCriteria = RelationRule[]` (l. 7178); §5.2 F-SITING (l. 5509) and F-EDIT (l. 5517); §7.3 designation row (l. 6596) | VD1-05 |
| 17 uses move | PRESENT | §7.7 Epochs (l. 7202–7205): "every move, closing and reopening is reported (§5.4's `changes`, §11.3)"; §5.4 `ReportEntry` `open` / `close` / `relocate` (l. 5597) | — |
| 18 designation mutation | PRESENT | §7.3 item 8 (l. 6801–6809); §7.4 assign row (l. 6833) | — |
| 19 designation scales with prosperity | PRESENT | §7.7 `drift` "read against §4.7 S11's designation template (item 19)" (l. 7173) | — |
| 25 terrain and water change slowly | PRESENT | §7.1 row (l. 6454): "a marsh's `reclaim` by the terrain operator (§7.3 (a)), a foreshore's `reclaim`, `siltReach` and `shiftCourse` by the water operator (§7.3 (b)), `digCanal` by the carve"; §7.3 (a) 3 (l. 6615–6617): "Inside an `epoch` event … the re-evaluated drivers only mark due blocks"; J-A25.61 | — |
| 28 plan rung and elaboration by click (with (f)) | PRESENT | §6.1 (l. 5653–5671): "one reroll counter per `regenerate.rung` value … stored in that event's map under the key `<building id>#<rung>` … never a field of the elaboration record"; §5.1 (6) (l. 5460–5465): "For a `regenerate` with `rung` … the content compared is the rung's own derived result"; §7.3 click row (l. 6598), "each step §2.6's re-cut rule — its FIXED set, its re-derived set and its kept-room rule, stated there (J-A28.26)" | — |
| 29 entrances and basements | PRESENT | §5.3 (l. 5538): "a basement lies inside and is smaller than its ground storey's wings"; §7.6 (l. 7090–7091) the entrance and cellar columns | VD1-13 |
| 30 hidden plots | PRESENT (minor gap) | §6.1 `cut.interior` (l. 5740–5742); §7.1 blocks/plots row `setAttr` of a block's `reach` (l. 6447); institutions row (l. 6451); §7.4 item-30 row "`Passage.sealed` bit" (l. 6836); §6.3 passage anchor (l. 6018) | VD1-10 |
| 31 wealth ladder and geometry floor | PARTIAL | §5.3 epoch row (l. 5543); §6.3 JOIN and SPLIT (l. 6051–6066): "every child takes the continued lineage, the parent's lineage key with its child index"; §7.1 plots row `subdivide`, `densify`, `thin` (l. 6447); §7.4 `builtBand` row (l. 6839) | VD1-01 (major), VD1-03 (major, pipeline), VD1-04, VD1-07, VD1-14, VD1-15, VD1-16, VD1-18 |

## 3 Re-check of the issues the repair claimed to fix

Each row gives the verdict in the assembled text, with the line where the fix stands. FIXED means the required change,
or the repair's recorded equivalent, is present and consistent. PARTIAL means a residue remains, and the r1 issue that
carries it is named.

### 3.1 My r0 issues (verify-determinism-r0.md §4)

| r0 id | owner | verdict | evidence (line) |
|---|---|---|---|
| VD-01 | determinism | FIXED | §6.3 l. 5940–5942: the survival sentence reads whole; the mutation sub-bullet follows it (l. 5943) |
| VD-02 | determinism | FIXED | §6.1 l. 5657–5658: "never a field of the elaboration record (§2.8)" |
| VD-03 | determinism | FIXED | §6.1 l. 5653–5671 (per-rung counters, coarser counters folded into the key); §7.1 `RungKey` l. 6267 and `rerolls: Record<Id \| RungKey, number>` l. 6310; §7.4 rung row l. 6838; J-A28.61 index l. 12581 and Part A l. 337 |
| VD-04 | determinism | FIXED | §5.1 (6) l. 5460–5469, with the one-room `plan.roles` fixture; §7.4 rung row cites it |
| VD-05 | determinism | FIXED | `Rejection.held.populationTarget` l. 7180; §7.7 item 3 l. 7228–7233; §7.4 rows l. 6834 and 6849 point to §7.7; J-A20.74 l. 12574 and Part A l. 330 |
| VD-07 | determinism | FIXED (new VD1-02 on its undo path) | `EditBase.creation` l. 6262; §7.4 l. 6815–6818; §6.2 l. 5765–5766; J-A22.74 l. 12725; J-DET-6 l. 12350 |
| VD-08 | determinism | FIXED (new VD1-12 on the carried events' `seq`) | §7.7 item 6 l. 7258–7261; §7.4 epoch row l. 6849 |
| VD-09 | determinism | FIXED | §6.1 l. 5738–5742 registers `reserve.market` and `cut.interior` |
| VD-10b | determinism | FIXED | §7.1 l. 6454; §7.4 l. 6831 (`digCanal` is the carve) |
| VD-11 | determinism | FIXED | §7.3 (b) lead l. 6635–6638; the S1 terrain and water rows l. 6587–6588; §7.1 l. 6454; §7.4 l. 6831; J-A25.61 l. 12579 |
| VD-12 | determinism | FIXED as required (new VD1-01: the list it asked for is itself incomplete) | §5.3 l. 5543; J-A31.75 l. 12729 |
| VD-13 | determinism | FIXED | §5.4 `changes: ReportEntry[]` and the union l. 5593–5599; prose l. 5611–5615; J-A22.75 |
| VD-18 | determinism | FIXED | §7.1 plots row l. 6447; §7.4 convert row l. 6831 (the ladder kinds and their undo) |
| VD-19 | determinism | FIXED (residue VD1-09) | §7.1 `reach` l. 6447, reservations row l. 6446, institutions row l. 6451; §7.4 item-30 row l. 6836 |
| VD-20 | determinism | FIXED (residue VD1-11) | §7.1 `drawTunnel` / `placeAccess` l. 6299–6300 and tunnels row l. 6452; §7.4 row l. 6829; J-A12.71 |
| VD-21 | determinism | FIXED | §7.4 l. 6831 and 6836; §5.3 l. 5545; J-A30.71 l. 12587 |
| VD-22 | determinism | FIXED | §6.3 l. 6058–6060 |
| VD-24 | determinism | FIXED as required (new VD1-04: the amendment note overstates) | J-DET-2 l. 12346 and Part A l. 102 |
| VD-25 | determinism | FIXED (residue VD1-10) | §7.5 l. 7054–7058 (`Room.scope`, the `Assignment` defaults) |
| VD-26 | determinism | FIXED (residue VD1-13) | §7.6 l. 7091–7094 and 7105–7106 |
| VD-27 | determinism | FIXED | §5.3 basement row l. 5538; surface exclusion l. 5544 |
| VD-28 | determinism | FIXED | §6.2 root layout l. 5796–5800 |
| VD-29 | determinism | FIXED | §6.3 anchor rows l. 6018–6021; matching routine l. 6035–6041 |
| VD-30 | determinism | FIXED | §7.3 click row l. 6598 points to §2.6's re-cut rule (J-A28.26) |
| VD-31 | determinism | FIXED | §7.3 item 1 l. 6545–6546 |
| VD-32 | determinism | FIXED | §7.3 (a) 3 l. 6615–6617 |
| VD-33 | determinism | FIXED | §7.2 l. 6491–6492: "a map `delete` of it is recorded as `rejectSite`" |
| VD-34 | determinism | FIXED (residue VD1-08) | §7.7 item 2 l. 7217–7220; §5.2 F-EDIT l. 5517; §7.1 l. 6480–6481; J-A20.75 |
| VD-06 | pipeline | FIXED | §4.11 (h) l. 5015–5017 points to §7.7's rule |
| VD-07b | pipeline | FIXED | §4.2 l. 3695: "reads the same creation prefix of the log (§7.4)" |
| VD-08b | pipeline | FIXED | `EpochInputs.dossier?: EditEvent[]` l. 5161–5162; step (e) l. 5010–5011 |
| VD-10a | pipeline | FIXED | `TerrainWaterOp` `siltReach` l. 5325; §2.3 l. 791; §0.2 row 25 l. 156; T25-1 l. 10165 |
| VD-12b | pipeline | FIXED | rung 2 l. 4915–4921; floor paragraph l. 4982–4984 |
| VD-14a | pipeline | FIXED | §4.1 l. 3282; II.4 l. 11597–11599; J-A28.42 l. 12676 |
| VD-15 | pipeline | FIXED (new VD1-05 on the wording) | §4.7 S10b l. 4440–4442 |
| VD-16 | pipeline | FIXED | §4.7 S10b l. 4424 and 4428–4429 cite `DisruptionBudgetRow` |
| VD-17 | pipeline | FIXED | §4.11 rung 1 l. 4895–4896; `LadderOp.relet` l. 5043 |
| VD-23 | pipeline | FIXED (new VD1-15 on the wording) | §4.11 l. 5000–5003; J-A31.48 l. 12670 |
| VD-35a | pipeline | FIXED | §4.1 l. 3257–3260; J-A23.41 |
| VD-37 | pipeline | FIXED | II.7.2 Editing: "`setAttr` on its kind, bore and headroom; its condition changes only through the conversions …" |
| VD-14b | rendering | FIXED | §8.5 l. 7997; §8.6 l. 8016–8017 |
| VD-11b | scope | FIXED | §0.2 row 25 l. 156 |
| VD-12c | scope | FIXED as required (new VD1-18: the growth step) | T31-9 l. 10232–10236 |
| VD-35b | scope | FIXED | §1.4 l. 310; J-A23.01 l. 12714 |
| VD-36 | model | PARTIAL (VD1-17) | §2.8 l. 1619 |

### 3.2 The other verifiers' determinism-owned issues

| id | verdict | evidence (line) |
|---|---|---|
| VK-22 | FIXED | §7.1 `moveWall` "(… on the rung's transient arena, §3.4)" l. 6302; F-PLAN tier 1 `E_DEGENERATE` (`seed`, `fixed`, `overlap`; §3.4) l. 5511, matching §3.4 l. 2564 |
| VK-23 | FIXED | §7.3 click row l. 6598 |
| VP-10 | FIXED | §5.3 epoch row l. 5543 (the back-court split and its reversal) |
| VP-12 | FIXED | §6.1 l. 5738–5742 |
| VP-33 | PARTIAL (VD1-07) | §7.4 `builtBand` row l. 6839 points to §4.11's list but restates it incompletely, and its regenerate cell still says "an epoch changes it only by a rung-3 event" |
| VP-34 | FIXED | §7.1 l. 6447; §7.4 l. 6831 |
| VP-35 | FIXED | §7.6 l. 7090–7091 |
| VS-15 | FIXED | §5.3 l. 5544 (the `cellar_stair` a surface building II.7.3 admits); T12-1 l. 10111–10112 agrees |
| VR-03 | FIXED | §5.4 l. 5593–5599; §11.2's `subscribe` row (l. 9165) names §5.4's entries |
| V-MAB-03 | FIXED | §7.4 l. 6836; J-A30.71 l. 12587 and Part A l. 343 |
| V-MAB-36 | FIXED (residue VD1-09) | §7.1 buildings row l. 6448 (`condition`; `nextEntrance`, `reusedAs` and slot `frontage` derived); plots row (`due` derived); reservations and institutions rows |
| V-MAB-37 | FIXED | §6.3 l. 6018–6019 |
| V-MAB-38 | FIXED | §7.4 warp paragraph l. 6945–6952 (the basement ring carried; rooms inside the face united with the span rings) |

## 4 The checks

* **SINGLE-SOURCE.**
  * *Resolved.* The duplicates r0 found are gone: §7.3's click row (VD-30), §4.11 (h)'s lapse test (VD-06), the §4.1
    and §1.4 item-23 paragraphs (VD-35a, VD-35b), §4.7 S10b's disruption weights (VD-16) and the §4.11 lineage bullet
    (VD-23).
  * *Remaining restatements that disagree with their home.*
    * §7.4's `builtBand` row restates §4.11's writer list and drops a writer (VD1-07).
    * §7.7 and §5.2 restate the dossier fallback site as "the best-scoring site", while §4.7 S10b, the solver's home,
      now says "its first closest option" (VD1-05).
    * The other restatements in this part (§7.1's dry run, §7.2's protection, and §7.4's rejection and epoch rows)
      point to §7.7 and agree with it.
* **STALE.**
  * *The task's probes.* A grep of l. 5402–7335 finds none of them: lots as buildings, binary wealth, size fixed by tier,
    one central market, the map editing the dossier, a licence default, terrain and water that never change.
  * *"Later".* Every "later" in the part is ordinary prose, apart from §7.7 item 8's "the owner's later stage", which is
    the roadmap's staging and so allowed.
  * *Stale rows.* J-A31.71's index row and Part A entry still give the pre-J-A31.44 writer list (VD1-07). The r0 stale
    items VD-24, VD-33, VD-14a, VD-14b and VD-11b are fixed.
* **CROSS-PART.**
  * *Notes reflected.* These cross-part notes to this part are reflected:
    * the model's V-MAB-38, VK-04 (4) and V-MAB-36 family, and `swapUse` moving households;
    * the kernel's preamble (3) on F-PLAN's detail names;
    * rendering (§7.1 needs nothing).
  * *Not reflected.* Two notes from the pipeline repair (report §3) are not:
    * `RosterTables.basementGate` is absent from §7.6's enumeration (VD1-13);
    * §7.4's `builtBand` row still says "an epoch changes it only by a rung-3 event" (VD1-07).
  * *The determinism repair's own hand-off.* The pipeline did not apply it: rung 1's roof loss is still no event
    (VD1-03).
  * *The assembler's §8 (1) note.* It concerns model §2.6's bars pointer, which is outside this part.
* **DEFERRAL-WORDING.** None. "Staged" occurs only as the roadmap's hooks, which rule (4) allows: F-PLAN, F-UNDER, the
  staged-layer rows, the composition's concerns "appended to the registry … when stage 3 registers them", and §7.7
  item 8.
* **BROKEN-REFERENCE.**
  * *The resolver.* `docs/validation/amendments-b/refs.py` on the live document reports 139 heading keys, 35 D ids, 459
    J ids and 2 broken references. Both are the pre-existing external citations (l. 2635, l. 9012); §5–§7 have 0.
  * *Sub-item pointers.* The pointers the repair added resolve: §7.7 items 2, 3, 5 and 6; §4.7 S10 (7); §4.7 S11 rule 5;
    §3.4's `E_DEGENERATE` details; §7.3's staged-layers row; J-A30.23; J-A11.21; J-A31.44.
  * *Semantic references.* The ones r0 found now resolve: `siltReach`, `reserve.market`, `cut.interior`, and the rung
    counters' key.
* **NEW-PROBLEM** (the repair's mechanisms against this part's existing rules):
  * the epoch row against the epoch's own growth step and rung 1's infill (VD1-01);
  * the creation prefix against undo, `revert` and truncation (VD1-02);
  * J-DET-2's amendment against the succession rule (VD1-04);
  * Enter against items 20 (b) and 22 (d) (VD1-06);
  * the carried dossier events' `seq` (VD1-12).

## 5 Issues found in r1 (owner · severity · kind · item) — each with its exact required change

### 5.1 This part's (determinism)

**VD1-01 · determinism · major · new-problem · items 31, 8 (with 17, 30) — §5.3 epoch row (l. 5543) and J-A31.75
(index l. 12729, Part A l. 485).**
* *The rule.* The repaired row (VD-12, VP-10) says: "Every other change of a plot's ring or a building's shell is
  caused by one of these, each with its lifecycle event: a rung-3 event; a designation or renovation mutation …; a
  decline, terrain-and-water, island or carve conversion". Its check matches "every ring change to a rung-3,
  back-court, mutation or conversion event".
* *What the list misses.* It is closed, and the epoch itself makes changes outside it:
  * the growth step's built-face legality (§4.11 l. 4864–4868): "a declared `demolish` conversion … Plots cut by a new
    corridor are re-cut through the conversion path — buildings that still fit are kept, the others demolished";
  * `wallToWay`, which clips "plots meeting the new corridor" (l. 5053–5056);
  * regrowth's `build` on vacant old-plan plots (l. 5275);
  * rung 1's own `densify … infill` and `thin … infill`, which add or clear yard buildings (l. 4898–4905; §7.4
    l. 6831).
* *The result.* None of these is a rung-3, back-court, mutation or decline / terrain / island / carve event, so an
  ordinary growth epoch, or rung 1 growing poor, fails a hard stage-end invariant. This is the same defect VD-12 fixed
  for rung 2. r0's required text (mine) had the same gap, and the repair copied it. §13.2 T31-9 already reads "a
  mutation or a conversion", so the two now disagree.
* *Required change.* Replace the row's invariant cell and check cell.
  * *Invariant cell:* "the epoch rows (item 31, §4.11): no occupied building is removed by a band change — a
    redevelopment first vacates through item 17's relocation. Across the epoch the ladder's rungs 1 and 2 change no
    frontage edge and shrink or re-cut no building shell toward a poorer band — a shell being the subtree the
    interior-ladder row names: wings, heights, entrances, roof, basement. Their only geometry is rung 1's yard
    buildings (`densify … infill`, `thin … infill`) and rung 2's one ring change, the `densify … back_court` split or
    its `thin … back_court` reversal (§4.11). Every other change of a plot's ring or a building's shell in the epoch
    carries the lifecycle event of the step that made it. Those steps are:
    * a rung-3 event;
    * a designation or renovation mutation (item 18: the use step, rung 1 growing rich);
    * any other conversion of §4.11's `ConversionOp` — a decline, terrain-and-water, island, carve, `wallToWay` or
      `contractWall` conversion among them;
    * the growth step's own changes — regrowth's builds and the built-face legality's declared `demolish` and
      corridor re-cuts (§4.11).

    Every plot's geometry band is at or above its floor (`max(field band, geometryFloor)`, §4.11) (J-A31.75)".
  * *Check cell:* "the epoch's touched plots' frontage edges and their buildings' shell subtrees against their
    pre-epoch values: every difference matched to a lifecycle event recorded in the epoch, and none matched only to a
    rung-1 or rung-2 `LadderOp` other than the yard buildings and the back court named above; every plot's band pair".
  * *J-A31.75.* Restate its index row and Part A entry to this list, keeping the id.

**VD1-02 · determinism · major · new-problem · item 22 (d) (with 20) — §7.4 Replay semantics (l. 6815–6818), Undo
(l. 6880–6893), Truncation (l. 6910–6920), `revert` (§7.1 l. 6309, §7.4 l. 6844), J-A22.74 (l. 12725, Part A l. 481).**
* *How the prefix works.* The creation prefix's `assign` events are read ahead by the base derivation's S2, and
  "folding those events afterwards records the generation run's placements and places nothing a second time". So a
  creation event's fold owns no placement and no mutation: generation made both, as the mutation from the empty design
  (§4.7 S11 rule 7).
* *What goes wrong.* Nothing stops such an event from being an `undo` target (the session's latest live event right
  after `generate`), a `revert` target (it targets the assigned entity) or a truncated pair.
  * *Undo.* §7.4's assign row undoes by "the inverse mutation from the undo record … and the former placements", which
    the fold never recorded. The undo therefore either leaves the element placed with its assignment gone or has
    nothing to restore.
  * *Truncation.* An unshared document drops "both from the log" when the undo targets the event just before it. The
    replay's S2 then no longer reads that event ahead, S7b claims different land, and the town differs from the fold
    with the pair kept. That breaks §6.5 (9)'s truncation identity (the same model and records digest both ways).
* *Required change.*
  1. **§7.4, after the read-ahead sentence.** Add: "A `creation` event is part of the base derivation it feeds, not an
     edit of the map it made: it is never an `undo`, `redo` or `revert` target — the undo key and `revert` skip it,
     and an `undo(h, of)` naming it returns F-EDIT offering `unassign` — and it is never truncated. A blueprint
     assignment is removed by `unassign` (§7.3 item 8's mutation), a dossier element only by a dossier event (§7.7
     item 2)."
  2. **§7.1.** The `creation` comment gains "never an undo or revert target (§7.4)".
  3. **§5.2 F-EDIT.** Its detection cell gains "an `undo` naming a `creation` event".
  4. **J-A22.74.** Restate its index row and Part A entry with the clause.

**VD1-04 · determinism · minor · new-problem · item 31 (c) — §6.3 JOIN and SPLIT (l. 6065–6066), J-DET-2's amendment
note (index l. 12346, Part A l. 102).**
* *The texts.* §6.3 ends "A mutation continues lineage; only a New random takes a fresh one (J-DET-2, amended so)". The
  note reads "only New random takes fresh lineage".
* *The contradiction.* Two bullets above, the succession rule (l. 5954–5958) gives every re-derived entity's successor
  "its own fresh lineage". That rule applies "whenever a scope is re-derived (regenerate, Adjust, re-derive from Sk, a
  local operator of §7.3, template replacement, migration, an epoch)". So "only New random" contradicts the rule it
  amends, and leaves open whether F-REDERIVE's re-cut plot, say, continues or refreshes its lineage.
* *Required change.*
  1. **§6.3.** "A mutation continues lineage; only a re-derivation takes a fresh one — New random, and the successors
     the matching above gives in any re-derived scope (Adjust, Re-derive from Sk, §7.3's tree scoping, template
     replacement, migration) (J-DET-2, amended so)".
  2. **J-DET-2's note, index and Part A.** "*(amended by amendments b: a mutation — a fusion, a splitting, a ladder
     step, an interior re-cut — continues lineage; only a re-derivation takes fresh lineage; J-A31.73, J-A28.63,
     J-A8.61)*".

**VD1-05 · determinism · minor · conflict · items 20, 16 — §7.7 precedence (l. 7189–7191), §5.2 F-SITING (l. 5509).**
* *The texts.* Both say a dossier element no site passes is placed at "the best-scoring site with the hard rows it
  fails reported". After VD-15, §4.7 S10b (l. 4440–4442), the solver's home, says a `dossier` request "places at its
  first closest option". Closest options are "the best-scoring plots that fail the fewest hard rows".
* *The difference.* A site that scores best while failing three hard rows wins under §7.7 and loses under S10b to one
  failing a single row.
* *Required change.* In both places write "at its first closest option — the fewest hard rows failed, then the best
  score (§4.7 S10b) — with the rows it fails reported".

**VD1-06 · determinism · minor · new-problem · items 20 (b), 22 (d) — §6.1 Enter (l. 5756–5758), §7.1 "Same kind, new
seed" (l. 6355).**
* *The rule.* Enter makes a new document "with the same recipe … without edits, locks, assignments or salts".
* *The conflict.* The dossier's elements are assignments: the creation prefix, and the dossier events after it. So
  Enter on a dossier-backed map returns a map without the dossier's content. That breaks item 20 (b), "exists on every
  map the module returns", and item 22 (d), "every dossier element present from the start".
* *Required change.*
  1. **§6.1's Enter.** It reads "…without edits, locks, map assignments or salts. The dossier is kept: the new document's
     creation prefix holds one `creation` `assign` event, with its `DossierRef`, per live dossier-backed assignment of
     the current document — its criteria and `pinned`, never its placement — so every dossier element is present from
     the start (item 22 (d), §7.7 One path). Rejections and positive placements, which are map edits, are not
     carried."
  2. **J-DET-53.** Its index row gains the clause.

**VD1-07 · determinism · minor · stale · item 31 — §7.4 `builtBand` row (l. 6839), J-A31.71 (index l. 12588, Part A
l. 344).**
* *The row's two cells.*
  * The create cell enumerates §4.11's writers without rung 2's `densify … back_court` for the rear plots it creates
    (J-A31.40).
  * The regenerate cell says "an epoch changes it only by a rung-3 event". Under §4.11 (l. 4985–4995) an epoch also
    writes it through that back court and through "a completed upward refurbishment". The pipeline repair's
    cross-part note asked for this correction.
* *J-A31.71.* Its index row and Part A entry still say "written only by the rung-3 kinds (`join`, `split`, `rebuild`, a
  redevelopment) and the redevelopment-class edits", against J-A31.44's list.
* *Required change.*
  1. **Create cell.** "the writers §4.11's floor paragraph lists (J-A31.44)", with no enumeration.
  2. **Regenerate cell.** "…an epoch writes it only through §4.11's writers (a rung-3 event, rung 2's back court for
     its new rear plots, a completed upward refurbishment)".
  3. **J-A31.71, index and Part A.** "the attribute is written only by the paths §4.11 lists (J-A31.44), each of which
     re-derives or re-sets the stock to the band it records".

**VD1-08 · determinism · minor · partial · items 20 (b), (c) — §7.7 item 2 (l. 7217–7220), §5.2 F-EDIT (l. 5517),
§7.1 dry run (l. 6480–6481), J-A20.75.**
* *What the refusal covers.* Only a map `unassign` and a map `setAttr` of use or class.
* *The other routes.* A map event reaches the same removal or re-designation by other routes. None of them has an
  action; §5.3's dossier row catches only the removals, as a bare invariant failure.
  * `convert` `closeUse` on the element's `Use`;
  * `convert` `mutate` of its plot to another designation;
  * a building-removing conversion (`demolish`, `abandon`, `ruin`, `clear`, `robStone`) of the building that houses it.
* *Required change.* In all three places write "a map event — one without `EditBase.dossier` — that would close,
  remove or re-designate a dossier-backed element is refused as F-EDIT with `rejectSite` and `placeAt` offered: an
  `unassign`, a `setAttr` of its use or class, a `convert` `closeUse` of its use or `mutate` of its plot to another
  designation, or a building-removing conversion of the building that houses it (a `delete` of it is recorded as
  `rejectSite`)". J-A20.75's index row reads the same.

**VD1-09 · determinism · minor · partial · items 8, 17, 25, 31 — §7.1 edit targets (l. 6446–6456).**
* *The rule.* §2.8 (l. 1747) requires that "every new attribute has its edit kind or is declared derived (§7.1)".
* *The gap.* The repair covered V-MAB-36's list. These amendment attributes still have neither an edit kind nor a
  derived declaration: `Building.formerUses` and `Building.predecessor` (§2.6 l. 960, 966), `Plot.builtProsperity`
  (§2.5 l. 865), `Enceinte.supersededBy` (§2.7 l. 1503) and `LandUse.reclaimed` (§2.7 l. 1529).
* *Required change.* Declare each derived where §7.1 lists attributes:
  1. **Buildings row, the derived list.** Add "`formerUses` (written by the use conversions, §4.11) and `predecessor`
     (written by `reuse … build`)".
  2. **Plots row.** "never `builtBand` or `builtProsperity`".
  3. **Walls row.** "`supersededBy` derived, written by `contractWall`".
  4. **Terrain and water conversions row.** "`LandUse.reclaimed` derived, written by `reclaim`".

**VD1-10 · determinism · minor · partial · items 28–31 — §7.5 schema transforms (l. 7048–7060).**
* *The gap.* The list names items 17, 20, 28, 29 and 31, but omits required fields the amendments added:
  * item 30's `Block.reach`, `Plot.exposure`, `Plot.knownTo` and `Building.knownTo` (§2.5 l. 853, 859–860; §2.6 l. 966);
  * item 31's `Building.condition` (l. 965);
  * item 29's `Building.nextEntrance`;
  * the retirement of `occupants` for `Building.households` (J-A28.29);
  * an older `Tunnel`'s `headroomCm` and `navigable` (§2.7 l. 1559).
* *Why it matters.* An older snapshot fails the new schema on these fields, and this is the migrate path of the
  lifecycle.
* *Required change.* Add to the transforms: "(item 30) every block gets `reach: 'open'`, the parity presets' value;
  every plot's `exposure` is derived at first load from its access rows (§4.6) and its `knownTo` defaulted from it, as
  is every building's; (item 31) every building gets `condition: 'kept'`; (item 29) `nextEntrance` = the length of
  the new `entrances`; (J-A28.29) a building's `occupants` becomes `households` from the households whose `building`
  names it, and the field is dropped; (items 11, 12) a stored tunnel without `headroomCm` takes II.7.2's profile row for
  its kind and preset, and its `navigable` is derived from them". Add item 30 to the list's lead.

**VD1-11 · determinism · minor · partial · item 12 (d) — §7.1 `placeAccess` (l. 6300) and the access-points cell of
the tunnels row (l. 6452).**
* *The gap.* An access point is "moved by `moveVertex` on that vertex", which is the tunnel-side `access_point` vertex,
  and its `setAttr` covers only `kind` and `role`. Neither says what happens to `ground.at`, the opening in the street,
  yard or cellar, so the ground end has no edit path. Everything must stay editable (rule 3).
* *Required change.* "…moved by `moveVertex` on that vertex (the tunnel end) or by `setAttr` on `ground.at` (the
  opening, re-hosted by `pointLocate` on the ground's `PlatKey` and refused as F-EDIT outside II.7.3's admitted
  ground), removed by `delete`". §7.4's `drawTunnel` / `placeAccess` row names both.

**VD1-12 · determinism · minor · new-problem (PLAUSIBLE) · item 22 (e) — §7.7 item 6 (l. 7258–7261), §7.1
`EditBase.seq` (l. 6258).**
* *The gap.* `EpochInputs.dossier` carries whole `EditEvent`s, each with a `seq` "from the document's nextSeq". Nothing
  says who assigns those seqs, or how many the epoch consumes, yet a dossier event's draws and mints are keyed by "its
  own `seq`" (§6.2 l. 5886; §6.1 l. 5722–5723).
* *The risk.* Two hosts, or a host and the module, could number the carried events differently, and §7.4's truncation
  arithmetic ("advances `nextSeq` by one") assumes one seq per event.
* *Required change.* §7.7 item 6 adds: "The events an epoch carries take their `seq` from `nextSeq` when the `epoch`
  event is appended — the epoch's own first, then the carried events' in the host's order — so their draws and minted
  addresses are keyed as a standalone event's are. They fold only inside the epoch, are undone with it, and are never
  undo targets on their own."

**VD1-13 · determinism · minor · missing (a cross-part note unreflected) · item 29 — §7.6's enumeration (l. 7082–7092).**
The pipeline repair's note (V-MAB-42) asked that §7.6's enumeration name `RosterTables.basementGate` (§10.2 l. 8807–8817;
§2.6 l. 1313 reads it). It is absent. *Required change:* after "the entrance and cellar columns of the designation
templates (§10.2, read by §2.6's rules)" insert "the basement-gate row `RosterTables.basementGate` (§10.2)".

### 5.2 Other parts' (found while checking what cites this part)

**VD1-03 · pipeline · major · conflict · item 31 (with 8) — §4.11 rung 1 (l. 4900–4902).**
* *The text.* Rung 1 growing poor steps an occupied building's condition down "`kept → worn → neglected` (§2.6: wear,
  patched roofs and, late, the roof lost through `RoofSpec.kind 'none'`…)".
* *Why it cannot stand.*
  * The roof is in the shell subtree, and a condition step is no lifecycle event, so §5.3's epoch row can match the
    change to nothing (VD1-01's check).
  * The model ties the roofless state to the decline ladder: `RoofSpec.kind 'none'` is "a ruined building's roofless
    state (§2.8 decline hooks)" (§2.6 l. 972); §2.8's ladder is occupied → vacant → derelict (`decayed`, roofless)
    (l. 1653); §8.2's `decayed` row draws it (l. 7684). An occupied roofless building contradicts all three.
  * The determinism repair's hand-off asked for this change ("must be issued as `decay`"). It was not applied.
* *Required change.* Rung 1's condition clause reads: "the fabric's **condition** steps down — `Building.condition`
  `kept → worn → neglected` (§2.6: wear and patched roofs, rendering classes of §8.2, never a shape change, item 19);
  the roof is lost only by the decline ladder's `decay`, after the building's last household has left (`vacate`, §2.8)".

**VD1-14 · pipeline · minor · conflict · item 31 (with 17) — §4.11 rung 1 growing rich (l. 4905) and
`LadderOp.thin` (l. 5045).**
* *The gap.* `thin … infill` clears "sheds, hovels and a workshop in the yard" that rung 1 growing poor filled with
  households, with no re-homing. `thin … back_court` re-homes its households and vacates first (l. 4911–4914).
* *The conflict.* Clearing an occupied hovel by a band change breaks item 31's "NO OCCUPIED BUILDING IS DEMOLISHED BY A
  BAND CHANGE" and §5.3's first clause.
* *Required change.*
  1. **The `thin` comment.** It reads "the inverse: infill cleared and re-gardened (§4.9) after its uses relocate and its
     households are re-homed (item 17's relocation, or a `relet` up in a standing shell within §2.6's capacity) and its
     buildings vacated; a back court likewise, its passage sealed".
  2. **Rung 1 growing rich.** It reads "…infill cleared once its households are re-homed and the garden reclaimed
     (`thin … infill`)…".

**VD1-15 · pipeline · minor · new-problem · item 31 (c) — §4.11 "Lineage survives" (l. 5002–5003), J-A31.48 (l. 12670
and Part A).** The texts say "only New random takes fresh lineage", as §6.3 and J-DET-2 do (VD1-04), against §6.3's
succession rule. *Required change:* "…Every ladder event is a mutation that continues lineage; only a re-derivation
takes fresh lineage (§6.3)"; J-A31.48's index row and Part A entry read the same.

**VD1-16 · model · minor · conflict · item 31 (with 8) — §2.6 Materials paragraph (l. 1229–1230).** The paragraph says
"Wear (`Building.condition`, item 31) and a roof lost late (`RoofSpec.kind 'none'`) are rendering classes over the same
geometry". `RoofSpec.kind` is a model field in the shell's leaf digest, and 'none' is the derelict state (l. 972). It is
no rendering class of an occupied building (VD1-03). *Required change:* "Wear (`Building.condition`, item 31) is a
rendering class over the same geometry; a roof is lost only in the decline ladder's derelict state (`decay`,
`RoofSpec.kind 'none'`, §2.8)".

**VD1-17 · model · minor · conflict (VD-36's residue) · item 20 — §2.8 `Identity.dossier` (l. 1619).**
* *The text.* The field is "carried by the entity the element is — its Use (§2.7) or the assignment's placed member
  (§7.7) — … so a building, which only houses a use, never carries it".
* *The conflict.* A `granularity: 'building'` assignment's placed member is a building: `Assignment.target` is "one
  building / plot", and `placed` holds the solver's placements. So the two clauses contradict each other for the
  commonest dossier element.
* *Required change.* "carried by the entity the element is — its `Use` (§2.7); for an element that is no use (a named
  feature: a bridge, a well, a gate), the feature the assignment placed — and moved with it on every re-placement; a
  building or a plot, which only houses a use, never carries it (a `rejectSite` relocates the use, item 17)".

**VD1-18 · scope · minor · conflict · item 31 — §13.2 T31-9 (l. 10232–10236).**
* *The text.* "after any run of epochs with no rung-3 event on a plot, its frontage edges are unchanged".
* *Why it fails.* Several epoch steps that are no rung-3 event change a plot's frontage:
  * the growth step's corridor re-cut of a plot a new corridor cuts (§4.11 l. 4867–4868);
  * `wallToWay`'s clip of the plots meeting the new ring road (l. 5053–5056);
  * a terrain-and-water conversion's F-REDERIVE re-cut.

  §5.3's row limits the frontage guarantee to rungs 1 and 2, and T31-9 does not.
* *Required change.* "(T31-9) across any run of epochs, no rung-1 or rung-2 event changes a plot's frontage edge or
  shrinks or re-cuts a shell of its buildings toward a poorer band — every change of its ring or its buildings' shells
  matched to a lifecycle event the epoch recorded (§5.3's epoch row: a rung-3 event, rung 1's yard buildings, rung 2's
  back court, a mutation, a conversion or the growth step's `demolish` and corridor re-cuts) — and its geometry band is
  at or above its floor".

## 6 Issue table

| id | owner | severity | kind | item | section |
|---|---|---|---|---|---|
| VD1-01 | determinism | major | new-problem | 31, 8 | §5.3 epoch row; J-A31.75 |
| VD1-02 | determinism | major | new-problem | 22 (d), 20 | §7.4 (read-ahead, undo, truncation), §7.1, §5.2; J-A22.74 |
| VD1-03 | pipeline | major | conflict | 31, 8 | §4.11 rung 1 |
| VD1-04 | determinism | minor | new-problem | 31 (c) | §6.3; J-DET-2 |
| VD1-05 | determinism | minor | conflict | 20, 16 | §7.7 precedence; §5.2 F-SITING |
| VD1-06 | determinism | minor | new-problem | 20 (b), 22 (d) | §6.1 Enter; J-DET-53 |
| VD1-07 | determinism | minor | stale | 31 | §7.4 `builtBand` row; J-A31.71 |
| VD1-08 | determinism | minor | partial | 20 (b), (c) | §7.7 item 2; §5.2 F-EDIT; §7.1; J-A20.75 |
| VD1-09 | determinism | minor | partial | 8, 17, 25, 31 | §7.1 edit targets |
| VD1-10 | determinism | minor | partial | 28–31 | §7.5 transforms |
| VD1-11 | determinism | minor | partial | 12 (d) | §7.1 `placeAccess`, tunnels row; §7.4 |
| VD1-12 | determinism | minor | new-problem | 22 (e) | §7.7 item 6; §7.1 |
| VD1-13 | determinism | minor | missing | 29 | §7.6 enumeration |
| VD1-14 | pipeline | minor | conflict | 31, 17 | §4.11 rung 1; `LadderOp.thin` |
| VD1-15 | pipeline | minor | new-problem | 31 (c) | §4.11 lineage bullet; J-A31.48 |
| VD1-16 | model | minor | conflict | 31, 8 | §2.6 Materials paragraph |
| VD1-17 | model | minor | conflict | 20 | §2.8 `Identity.dossier` |
| VD1-18 | scope | minor | conflict | 31 | §13.2 T31-9 |

The totals are 18 issues: 3 major and 15 minor, 0 blockers. By owner: determinism 12 (2 major), pipeline 3 (1 major),
model 2 and scope 1.

## 7 CONFIRMED versus PLAUSIBLE

**CONFIRMED (read on disk and checked by grep).** Line numbers are those of the live `docs/ARCHITECTURE.md`: sha256
`365e19f2…`, 12 793 lines, unchanged since assemble-r1 installed it at 07:00.
* *The re-check.* Every FIXED verdict in section 3 was read at the cited line, as was every quoted text in section 5.
* *The resolver.* `refs.py` on the live document: 2 broken references, both pre-existing and external; 0 in §5–§7.
* *The stale probes.* A grep over l. 5402–7335 finds none of the task's stale phrases and no deferral wording.
* *The J rows.* Every J row and Part A entry named exists. The 14 ids this part's repair wrote are present in both
  tables.
* *The textual contradictions.* These rest on two quoted texts disagreeing:
  * VD1-01: §5.3's closed list against §4.11's built-face legality, `wallToWay` and rung 1's infill;
  * VD1-03 and VD1-16: rung 1's roof against `RoofSpec` 'none', §2.8's ladder and §8.2's `decayed` row;
  * VD1-04 and VD1-15: "only New random" against the succession rule;
  * VD1-05: "best-scoring" against "first closest option";
  * VD1-07: the `builtBand` row and J-A31.71 against J-A31.44;
  * VD1-17: the placed member against "a building never carries it";
  * VD1-18: T31-9 against the growth step.

**PLAUSIBLE (reasoning on the texts).**
* *Consequences.* That VD1-01's closed list aborts ordinary growth epochs in practice. That VD1-02's truncation of a
  creation event changes S2's read and so the digest. That VD1-06's Enter is offered on a host-bridged, dossier-backed
  document. That VD1-12's carried events could be numbered differently by two parties.
* *The required changes' own choices.* Each is vetoable: creation events are not undo targets (VD1-02, over giving
  them an unassign-like undo); Enter keeps the dossier (VD1-06); the access point's ground end is edited by `setAttr`
  (VD1-11); the carried events are numbered after the epoch's `seq` (VD1-12).
* *Severity labels.* They are this seat's judgment.

**Not done by this seat.** It ran no document checks (they are the assembler's) and edited no design text (repairs go to
the repair round's block files).
