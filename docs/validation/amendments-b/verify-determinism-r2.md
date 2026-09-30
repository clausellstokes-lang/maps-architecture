# Verify — DETERMINISM part (§5, §6, §7) after repair round 2 (r2)

> PENDING FABLE REVIEW — Opus-produced (amendments-b/verify-determinism-r2).

## PROGRESS (kill-safe ledger)
- READ: verify-determinism-r1.md, repair-determinism-r2-report.md, assemble-r2.md | done
- READ: the r2 reports of the other five seats (their cross-part notes to this part) and the other verifiers' r1 issues this part owned (V-MAB1-10, V-MAB1-15, VK1-02, VK1-07, VP1-03, VP1-11, VP1-17, VS1-08) | done
- READ: §5, §6, §7 whole (live docs/ARCHITECTURE.md sha256 831efd42…, 12 942 lines; the part is l. 5477–7443) and the citing text: §2.5 `fieldBand`, §2.6 (`spans`, carry trigger, plan steps 2–4 and 7, capacity, the stored re-cut), §2.8 (band memories, registry, `Identity.dossier`), §3.4 seed clip, §4.7 households per building, §4.11 whole, II.6 tunnel split, II.7.4, §13.2 T20 and T31-9, the J index rows and Part A entries of this part | done
- RE-CHECK of the r1 issues (VD1-01..VD1-18) and the other verifiers' determinism-owned r1 issues | done (section 3)
- ITEM verdicts | done (section 2)
- CHECKS (single-source, stale, cross-part, deferral, broken-ref, new-problem) | done (section 4)
- ISSUES (new in r2) | done (sections 5, 6, 7)
- FABLE queue row + LANDED line | done (row B-amendments-b/verify-determinism-r2 appended to docs/FABLE-REVIEW-QUEUE.md; LANDED line in docs/lane-events.log)

## 1 Outcome

Repair round 2 fixed what it claimed. All 18 of my r1 issues are FIXED in the assembled text, the 12 this part owned and
the 6 the pipeline, model and scope lanes owned. All 8 determinism-owned issues the other verifiers raised in r1 are
FIXED too. The three home items (20, 22, 23) now carry their mechanisms whole, and item 22 moves from PARTIAL to PRESENT:
creation events are no undo, revert or truncation target, and the carried dossier events have their own `seq`. Item 31
moves from PARTIAL to PRESENT: the epoch row's list is complete for every step §4.11 defines.

The re-check finds **15 new issues: 0 blockers, 2 major and 13 minor.** Ten belong to this part (1 major, 9 minor).
The other five belong to pipeline (3, 1 major), model (1) and scope (1).

The majors are these.
* **VD2-01 (determinism).** Repair round 2 widened §7.7 item 2's refusal list to the conversions that empty or remove
  a building (`vacate`, `abandon`, `decay`, …), `closeUse` and `mutate`. The rule applies to "a map event — one without
  `EditBase.dossier`". An `epoch` event is such an event, and those are exactly the conversions an epoch's steps issue.
  The part never says how the rule applies inside an epoch. So an epoch whose use step closes a dossier-backed use, or
  whose population fall vacates the building that houses one, is either refused whole or fails §5.3's hard dossier row.
* **VD2-02 (pipeline).** The companion gap in §4.11 has three places. The use step closes a use on low demand with no
  dossier exemption. A redevelopment's purchase closes or relocates uses. Step (c)'s `vacate` fires when the last
  household leaves. None of the three spares a dossier-backed use.

**No ruling is needed.** Each required change follows an existing decision: J-A20.75, J-A20.72, J-A28.46, J-A28.26,
J-A28.73, J-A28.29, J-A30.23 and J-A12.47. Four r2 rulings stay open to the owner's veto, as the determinism seat flagged
them: J-A28.73 (which refusals abort), J-A20.75's widened list, J-A22.74 (creation events not undoable) and J-A22.76
(the carried events' numbering).

## 2 Per item — PRESENT / PARTIAL / MISSING (quotes from the live docs/ARCHITECTURE.md, sha256 831efd42…)

### Home items

| item | verdict (r1 → r2) | the mechanism, quoted (line) | open issues |
|---|---|---|---|
| 20 one-way flow; the dossier is the authority | PRESENT → PRESENT (one new gap) | §7.7 item 2 (l. 7317–7324): "A map event — one without `EditBase.dossier` — that would close, remove or re-designate a dossier-backed element is refused as F-EDIT (§5.2), with the actions `rejectSite` … and `placeAt` …: an `unassign`; a `setAttr` of its use or class; a `convert` `closeUse` of its use or `mutate` of its plot …; a conversion that empties or removes the building that houses it …"; item 3's lapse (l. 7332–7337); `Rejection.held` (l. 7279); precedence "its first closest option — the fewest hard rows failed, then the best score, in §4.7 S10b's order" (l. 7289–7291) | VD2-01 (major), VD2-02 (major, pipeline), VD2-03 (scope), VD2-13 |
| 22 dossier changes mutate the map, never re-roll it | PARTIAL → PRESENT | §7.4 (l. 6904–6908): "A `creation` event belongs to the base derivation it feeds, not an edit of the map it made: it is never an `undo`, `redo` or `revert` target … and it is never truncated"; §7.7 item 6 (l. 7365–7369): "The events an epoch carries take their `seq` from `nextSeq` when the `epoch` event is appended — the epoch's own first, then the carried events' in the host's order"; §6.1 Enter (l. 5835–5839): "The dossier is kept: the new document's creation prefix holds one `creation` `assign` event … per live dossier-backed assignment" | VD2-13 |
| 23 emulation-first defaults | PRESENT → PRESENT | §7.6 (l. 7192–7193, 7204–7211): cells "`{value, unit, provenance: {source, date, note}, calibratable, extension?: {over, mode}}`", `ref:⟨reference⟩ ⟨behaviour⟩`, the parity presets; the list now names "the basement-gate row `RosterTables.basementGate` (§10.2)" (l. 7189) | VD2-12 (the list) |

### Referencing items (the route's duties for this part)

| item | verdict (r1 → r2) | where (quote, line) | open issues |
|---|---|---|---|
| 8 decline and regrowth | PRESENT → PRESENT | §6.3 survival (l. 6022–6035); §7.1 buildings row's derived `formerUses` and `predecessor` (l. 6532); §5.3 epoch row (l. 5618) | — |
| 10 islands by prosperity | PRESENT | §7.1 sky-islands row (l. 6537); §6.3 anchor (l. 6103) | — |
| 11 the underground fades | PRESENT | §7.1 tunnels row (l. 6536) "a tunnel's condition is no `setAttr` path" | — |
| 12 underground neighbourhoods | PRESENT (VD1-11 fixed) | §7.1 `placeAccess` (l. 6383): "its tunnel end moved by `moveVertex` on that vertex, its opening by `setAttr` on `ground.at` (re-hosted by `pointLocate` …)"; §7.4 row (l. 6919) | VD2-12, VD2-15 (pipeline) (`UndergroundRule` not declared a rule table, nor in §7.6's list) |
| 13, 14, 15 islands and sewers by tier | PRESENT | §7.8 (l. 7402–7409); §6.1 `island.place`, `sewer` (l. 5793–5800) | — |
| 16 relation and supply rules | PRESENT (VD1-05 fixed) | §7.7 `PlacementCriteria` (l. 7277); §5.2 F-SITING (l. 5584) | — |
| 17 uses move | PRESENT | §7.7 Epochs (l. 7302–7305); §5.4 `changes` (l. 5668–5674) | VD2-01, VD2-02 (a dossier-backed use closed by the use step) |
| 18 designation mutation | PRESENT | §7.3 item 8 (l. 6887–6895); §7.3 designation row (l. 6682) | — |
| 19 designation scales with prosperity | PRESENT | §7.7 `drift` (l. 7272) | — |
| 25 terrain and water change slowly | PRESENT | §7.1 row (l. 6538), `LandUse.reclaimed` derived; §7.3 (a) 3 (l. 6701–6703) | — |
| 28 plan rung and elaboration by click (with (f)) | PRESENT (six new minor gaps) | §6.1 rung counters (l. 5728–5749) and their stage id (l. 5730–5733): "carry S11's stage id, the stage that made the building"; §5.1 (6) (l. 5535–5544); §5.2 F-PLAN tier 2 (l. 5586): "answer a refusal of the rung's transient arena (tier 1) by the ring it refused"; §5.3 interior-ladder row (l. 5616) | VD2-04, VD2-07, VD2-08, VD2-09 (model), VD2-10, VD2-11 |
| 29 entrances and basements | PRESENT | §5.3 basement row (l. 5613); §7.6 (l. 7188–7189); §7.5 "(ordinal 0, `nextEntrance` 1)" (l. 7143) | — |
| 30 hidden plots | PRESENT (VD1-09, VD1-10 fixed; one cross-part gap) | §7.5 (l. 7147–7150): "a block's `reach` is `open`, the parity presets' value, and each plot's `exposure` is derived at the first load by §4.6's rule"; §7.1 blocks/plots row (l. 6531) | VD2-05 (`BaseWing.spans`), VD2-06 |
| 31 wealth ladder and geometry floor | PARTIAL → PRESENT | §5.3 epoch row (l. 5618), whose list now includes "rung 1's yard buildings (`densify … infill`, `thin … infill`) … any other conversion of §4.11's `ConversionOp` — a decline, terrain-and-water, island, carve, `wallToWay` or `contractWall` conversion among them; or the growth step's own changes"; §6.3 (l. 6147–6149): "A mutation continues lineage; only a re-derivation takes a fresh one"; §7.4 `builtBand` row (l. 6929) | VD2-04, VD2-05 (`fieldBand`, item 28 (f)'s band memory), VD2-14 (pipeline) |

## 3 Re-check of the issues the repair claimed to fix

FIXED means the required change, or the repair's recorded equivalent, is present at the line given and consistent.

### 3.1 My r1 issues (verify-determinism-r1.md §5)

| r1 id | owner | verdict | evidence (line in the live document) |
|---|---|---|---|
| VD1-01 | determinism | FIXED (new VD2-04 on how the shell is read) | §5.3 epoch row l. 5618, the invariant cell and check cell as required; J-A31.75 index l. 12868, Part A l. 485 |
| VD1-02 | determinism | FIXED | §7.4 l. 6904–6908 and Targets l. 6970–6972 ("other than a `creation` event"); §7.1 `creation` comment l. 6345, `revert` l. 6392; §5.2 F-EDIT l. 5592 (detection and action); J-A22.74 l. 12864, Part A l. 481 |
| VD1-03 | pipeline | FIXED | §4.11 rung 1 l. 4968–4971: "the roof is lost only by the decline ladder's `decay`, after the building's last household has left" |
| VD1-04 | determinism | FIXED | §6.3 l. 6147–6149; J-DET-2 index l. 12485, Part A l. 102 |
| VD1-05 | determinism | FIXED | §7.7 l. 7289–7291; §5.2 F-SITING l. 5584 |
| VD1-06 | determinism | FIXED (residue VD2-13) | §6.1 Enter l. 5834–5840; §7.1 l. 6438–6439; J-DET-53 index l. 12536, Part A l. 153 |
| VD1-07 | determinism | FIXED | §7.4 `builtBand` row l. 6929 (the create cell is the pointer alone; "a standing plot's `builtBand` is lowered only by a rung-3 event"); J-A31.71 index l. 12727, Part A l. 344 |
| VD1-08 | determinism | FIXED (new VD2-01 on the epoch) | home §7.7 item 2 l. 7317–7324; pointers §5.2 l. 5592, §7.1 l. 6564–6566, §7.2 l. 6577–6578, §5.3 l. 5614; J-A20.75 index l. 12863, Part A l. 480 |
| VD1-09 | determinism | FIXED (new VD2-05 for the model's r2 fields) | §7.1 buildings row l. 6532 (`nextEntrance`, `reusedAs`, `formerUses`, `predecessor`, slot `frontage`), plots row l. 6531, walls row l. 6533, terrain-and-water row l. 6538 |
| VD1-10 | determinism | FIXED (new VD2-05: `fieldBand`) | §7.5 l. 7139–7158 |
| VD1-11 | determinism | FIXED | §7.1 l. 6383 and l. 6536; §7.4 l. 6919; J-A12.71 index l. 12862, Part A l. 479 |
| VD1-12 | determinism | FIXED | §7.7 item 6 l. 7365–7369; §7.1 `seq` l. 6341; J-A22.76 index l. 12890, Part A l. 507 |
| VD1-13 | determinism | FIXED | §7.6 l. 7189 |
| VD1-14 | pipeline | FIXED | §4.11 rung 1 l. 4974–4975; `LadderOp.thin` l. 5120 |
| VD1-15 | pipeline | FIXED | §4.11 l. 5076–5078; J-A31.48 l. 12809 |
| VD1-16 | model | FIXED | §2.6 l. 1237–1238: "Wear (`Building.condition`, item 31) is a rendering class over the same geometry (§8.2); a roof is lost only in the decline …" |
| VD1-17 | model | FIXED | §2.8 `Identity.dossier` l. 1643: "a building or a plot, which only houses a use, never carries it, a building-granularity assignment's placed member included"; J-A20.22 l. 12892 |
| VD1-18 | scope | FIXED | §13.2 T31-9 l. 10359–10364, its list equal to §5.3's row |

### 3.2 The other verifiers' determinism-owned r1 issues

| id | verdict | evidence (line) |
|---|---|---|
| V-MAB1-10 | FIXED | §5.3 interior-ladder row l. 5616: "its rings read with the `composition`-role vertices a stored plan's re-cut adds removed (§2.6, J-P48 (1))" |
| V-MAB1-15 | FIXED | §7.5 l. 7139–7158 (lead "(items 11, 12, 17, 20, 28, 29, 30, 31)", `nextEntrance`, `households` from `Household.building` with `occupants` dropped, `condition`, `reusedAs`, `reach`, `exposure`, `knownTo`) |
| VK1-02 | FIXED (residues VD2-09, VD2-10, VD2-11) | §5.2 F-PLAN tier 2 l. 5586; J-A28.73 index l. 12889, Part A l. 506 |
| VK1-07 | FIXED | §6.1 l. 5730–5733 |
| VP1-03 | FIXED | §7.4 `builtBand` row l. 6929 |
| VP1-11 | FIXED | §7.7 l. 7289–7291; §5.2 F-SITING l. 5584 |
| VP1-17 | FIXED | §7.6 l. 7180–7189: "site plans" is gone and `RosterTables.basementGate` is named |
| VS1-08 | FIXED | §5.2 F-PLAN test cell l. 5586: "every household of the building (`Building.households`, §2.6)" |

## 4 The checks

* **SINGLE-SOURCE.**
  * *Resolved.* VD1-08's list is now stated once, at §7.7 item 2, and §5.2, §7.1, §7.2 and §5.3 point to "§7.7 item
    2's list". VD1-07's enumeration in §7.4 is gone.
  * *Glosses that agree with their home.* §5.2 F-SITING and §7.7's precedence both gloss S10b's order as "fewest hard
    rows failed, then best score", and each cites "§4.7 S10b's order". §4.7 S10b's full order (J-A20.42) adds "then
    plot id". The glosses are consistent and carry the pointer, so this is no duplicate.
  * *No second statement.* None was found in the part.
* **STALE.**
  * *The task's probes.* A grep of l. 5477–7443 finds no stale phrase: lots as buildings, binary wealth, size fixed by
    tier, one central market, the map editing the dossier, a licence default, terrain and water that never change.
  * *Retired wordings.* "only New random", "best-scoring site", "an epoch changes it only by", "moves it only through
    rung 3" and "site plans," each occur 0 times in the part.
  * *One stale phrase remains.* F-PLAN tier 6's "S10b's fill" (l. 5586) is VD2-08.
* **CROSS-PART.** The r2 seats' notes to this part are listed below; assemble-r2 §8 (1), (4) and (5) repeat three of
  them.
  * *Reflected.* The model's §5.3 row (V-MAB1-10) and scope's T31-9 list.
  * *Not reflected.*
    * pipeline and model: F-PLAN tier 6's "S10b's fill" (VD2-08);
    * model: §7.1 does not declare `spans` or `fieldBand` derived, and §7.4 and §7.5 lack `fieldBand` (VD2-05);
    * model: §7.3 item 1 does not state the passage-face scope that §2.6 cites it for (VD2-06);
    * model: §7.3's stored-plan row does not say how the shell is read (VD2-04);
    * model, the new observation: capacity can fall below households with no path back (VD2-07);
    * kernel: the seed clip's holed piece reaches F-PLAN's abort clause (VD2-09, VD2-10).
  * *Considered; no issue.*
    * Pipeline's note on §6.3 and the linear-record SPLIT. II.6 (l. 11863–11865) states the tunnel's split at its home
      and cites §6.3's SPLIT rule "the first vertex standing for a plot's frontage anchor". §6.3's general "A mutation
      continues lineage" (l. 6147) covers it.
    * Model's "§6.2: add `fieldBand` to the leaf column order". §6.2's leaf takes "attributes in schema order"
      (l. 5873) and keeps no column list, so nothing is missing there.
* **DEFERRAL-WORDING.** None. Every "later" in the part is ordinary prose. §7.7 item 8's "the owner's later stage"
  (l. 7374) is the roadmap's staging, which rule (4) allows.
* **BROKEN-REFERENCE.** `refs.py` on the live document finds 139 heading keys, 35 D ids, 469 J ids and 2 broken
  references. Both are the pre-existing external citations (l. 2679 `os-geometry.md` §2.1.4; l. 9123 RFC 7946 §3.1.6).
  §5–§7 have 0. Semantic references that do not resolve to a stated fact:
  * §2.8 (l. 1734–1735) and §2.5 (l. 866) say §7.5 fills `fieldBand` and §7.1 declares it derived; neither does
    (VD2-05);
  * §2.6 (l. 1093–1094) says §7.3 item 1 takes the front building into the scope; it does not (VD2-06).
* **NEW-PROBLEM** (the r2 mechanisms against this part's existing rules):
  * the widened refusal list against the epoch's own steps (VD2-01, with VD2-02);
  * the stored re-cut's `composition`-role vertices against the epoch row's shell comparison (VD2-04);
  * F-PLAN tier 2's "next `attempt`" against §5.1's deterministic tier 2 and §6.1's attempt caps (VD2-11);
  * Enter's copy against the dossier's `setAttr` events (VD2-13).

## 5 Issues found in r2 (owner · severity · kind · item) — each with its exact required change

### 5.1 This part's (determinism)

**VD2-01 · determinism · major · new-problem · item 20 (with 17, 8) — §7.7 item 2 (l. 7317–7324), §5.2 F-EDIT
(l. 5592), §7.1 dry run (l. 6564–6566), §5.3 dossier row (l. 5614), J-A20.75 (index l. 12863, Part A l. 480).**
* *The rule.* Round 2 (VD1-08) refuses "a map event — one without `EditBase.dossier` — that would close, remove or
  re-designate a dossier-backed element". The list now includes "a `convert` `closeUse` of its use or `mutate` of its
  plot …; a conversion that empties or removes the building that houses it (`vacate`, `abandon`, `decay`, `ruin`,
  `robStone`, `clear`, `demolish`)".
* *The collision.* An `epoch` event (author `'epoch'`) carries no `EditBase.dossier`, so it is a "map event" by this
  definition. Its own steps issue exactly these conversions (§4.11):
  * the use step closes a use whose catchment demand stays low (l. 5257–5260);
  * a redevelopment's purchase closes or relocates the plots' uses (l. 4997–4998);
  * step (c) fires `vacate` "when its last household leaves" (l. 5081–5082).

  Nothing in §7.7, §5.2 or §5.3 says how the rule applies inside an epoch. An ordinary declining epoch that reaches a
  dossier-backed use is therefore either refused whole as F-EDIT, or fails §5.3's hard batch-local dossier row and
  aborts its batch. That is the same failure class as r1's VD1-01.
* *Required change.*
  1. **§7.7 item 2, the definition.** "A map event — one without `EditBase.dossier` —" becomes "A map event — one a
     user, or a host's map edit, appends without `EditBase.dossier` —". Make the same substitution in §5.2 F-EDIT's
     detection cell and in §7.1's dry-run sentence.
  2. **§7.7 item 2, a new sentence.** Insert after "(J-A20.75).": "An `epoch` is bound by the same rule without being
     refused by it: its steps never choose such a conversion — the use step and a redevelopment's purchase relocate a
     dossier-backed use and never close it, and step (c)'s `vacate` and the decline lottery reach the building that
     houses one only after its use has moved (§4.11) — so every dossier-backed element is live and placed after every
     epoch (§5.3's row)."
  3. **J-A20.75.** Its index row and Part A entry gain "; an epoch's steps never choose such a conversion (§4.11), so
     the refusal applies to the events a user or a host's map edit appends".

**VD2-04 · determinism · minor · conflict · item 28 (f) with 31 — §5.3 epoch row (l. 5618), §7.3 stored-plan row
(l. 6685).**
* *The rule.* A stored plan's re-cut "establishes J-P48 (1) for its new walls in the same event — a same-level split
  that moves nothing — so the shell's identity across a re-cut is read on its rings with the `composition`-role vertices
  removed" (§2.6 l. 1500–1503). §5.3's interior-ladder row reads the shell that way after V-MAB1-10 (l. 5616).
* *Where it is missing.*
  * *The epoch row.* It compares "their buildings' shell subtrees against their pre-epoch values: every difference
    matched to a lifecycle event …, and none matched only to a rung-1 or rung-2 `LadderOp`". Rung 1's `relet`
    re-cuts a stored plan inside the epoch (§4.11 l. 4963–4964; §7.4 epoch row l. 6939). The vertices that re-cut adds
    to the wing rings are then a difference matched only to a rung-1 `LadderOp`, and the check fails on a legal epoch.
  * *§7.3's stored-plan row.* It lists "the shell — wing rings, entrances, heights, roof, basement —" as pinned, with no
    qualifier.
* *Required change.*
  1. **§5.3 epoch row, the invariant cell.** After "a shell being the subtree the interior-ladder row names: wings,
     heights, entrances, roof, basement" insert ", its rings read as that row reads them (without the
     `composition`-role vertices a stored plan's re-cut adds, §2.6, J-P48 (1))".
  2. **§5.3 epoch row, the check cell.** "their buildings' shell subtrees against their pre-epoch values" becomes
     "their buildings' shell subtrees, so read, against their pre-epoch values".
  3. **§7.3 stored-plan row, the pinned cell.** "the shell — wing rings, entrances, heights, roof, basement —" becomes
     "the shell — wing rings (read without the `composition`-role vertices the re-cut adds, §2.6, J-P48 (1)),
     entrances, heights, roof, basement —".

  J-A31.75 is unchanged, because J-A28.26 already records the reading.

**VD2-05 · determinism · minor · conflict (cross-part note unreflected) · items 28 (f), 30 — §7.1 edit targets (plots
row l. 6531, buildings row l. 6532), §7.4 (after the `builtBand` row, l. 6929), §7.5 transforms (l. 7139–7158).**
* *What the model says.* Model round 2 added `Plot.fieldBand` (§2.5 l. 866: "derived — no setAttr (§7.1)") and
  `BaseWing.spans` (§2.6 l. 959: "written and cleared only by S11"). §2.8 says "a document written before these
  attributes existed gets `builtBand` and `fieldBand` from `DerivationRecord.band` … (§7.5)" (l. 1734–1735). Its
  registry names "the plot's `builtBand`, `builtProsperity` and `fieldBand` with their migration hook (§7.5)" and "its
  base wings' `spans`" (l. 1771–1772).
* *What this part lacks.*
  * Neither attribute is declared derived in §7.1, which §2.8's completeness rule requires (l. 1773–1774).
  * §7.5 fills `builtBand` only.
  * §7.4 has a lifecycle row for `builtBand` and none for the second band memory.
* *Required change.*
  1. **§7.1 plots row.** After "J-A31.44, J-A31.71;" insert "never `fieldBand`, derived — set by every derivation that
     reads the current field and re-banded after S6 at every epoch (§2.5, J-A28.29);".
  2. **§7.1 buildings row.** After "`predecessor` (written by `reuse … build`, §4.11)" insert ", each base wing's
     `spans` (written and cleared only by S11, §2.6)".
  3. **§7.5, first change.** After "…and, for one with epochs, the band its last derivation read;" insert " its
     `fieldBand` is that same band (§2.8);".
  4. **§7.5, second change.** The last sentence reads "no rejection, positive placement, `DossierRef`, `Passage` or
     `BaseWing.spans` exists in an older document, so none is invented".
  5. **§7.4, a new row after the `builtBand` row.** "| `fieldBand` (a plot attribute, item 28 (f) — not an event
     kind: its paths) | every derivation that reads the current field, and the epoch's re-banding after S6 (§2.5,
     §4.11) | §2.6's interior ladder, `ClassRules.pick`, the plan rung's recorded inputs | the plot's attribute columns
     (§2.9), in the leaf digest | Regenerate (keep settings) keeps it; `Adjust` and a brush set it in their scope
     (§7.2); an epoch re-bands it | restored by the undo record of whichever event wrote it | a document written before
     the attribute existed gets `fieldBand` = its plot's `DerivationRecord.band` (§7.5) |".

**VD2-06 · determinism · minor · conflict (a cited rule not stated) · item 30 × 28 — §7.3 item 1 (l. 6626–6639).**
* *What the model cites.* §2.6's carry trigger (l. 1089–1094) now runs `carryWings` when a spanned passage's face
  changes. It states "an edit that changes the passage face takes the building into its effective scope, as J-P48
  (1)'s split faces are, §7.3 item 1".
* *What §7.3 item 1 states.* It has no such rule. So §7.3 item 7 (ii)'s byte-identity check would flag the front
  building's carried stored rings as a change outside the scope.
* *Required change.* §7.3 item 1, before "**The seam exception** (NF-P6)", insert: "**A spanned passage** (item 30): an
  edit whose batches change a `Passage` face (L3) or move one of its vertices holds the passage's front building
  (`Passage.frontBuilding`, §2.5) in its effective scope when that building has a stored composition with a wing
  spanning the passage — §2.6's carry trigger carries its stored rings with the span ring — as item 7 (ii) holds the
  faces §2.6's composition rule (1) splits."

**VD2-07 · determinism · minor · new-problem (PLAUSIBLE) · item 28 (f) — §7.1 "Entrances, basements, passages and
plans" (l. 6498–6500).**
* *The rule.* §2.6's capacity sums, storey by storey, the area of the wings' extents (l. 1460–1466). §4.7 re-homes a
  shell's excess households only "wherever S11's operator later builds or changes a residential shell" (l. 4655–4659;
  J-A28.46).
* *The gap.* Three hand edits change the extents without S11's operator:
  * a `setAttr` of a building's heights (§7.1 buildings row), which removes storeys;
  * a `warp` or `moveVertex` that carries a footprint smaller (`carryWings`, §2.6);
  * a move of a spanned passage's face, which shrinks the span ring above the ground.

  Each can drop the capacity below `Building.households`. §2.6 promises that `households` is "never above the capacity"
  (l. 965), and F-PLAN's tier 6 treats a count it cannot house as a bug that aborts the rung (l. 5586). The model seat
  raised this as its new observation and routed it to the verifiers.
* *Required change.* In §7.1, after "…re-cuts a stored one inside the event (§7.3);" insert "an edit that lowers a
  residential building's capacity (§2.6) below its `Building.households` — a `setAttr` of its heights, or a `warp` or
  `moveVertex` that carries its footprint or its spanned passage's face — re-homes the excess by §4.7's overflow pass
  inside the event, each move a lifecycle event (§2.8) listed in its fate report (§7.3 item 4), as S11's operator does
  (§4.7; J-A28.46);". §5.2 follows through VD2-08.

**VD2-08 · determinism · minor · stale (cross-part note unreflected) · item 28 (f) — §5.2 F-PLAN tier 6 (l. 5586).**
* *The text.* It reads "the count the rung must house is bounded upstream by §2.6's capacity, which S10b's fill and
  `relet` keep to (§4.7 S10b, §4.11)".
* *Why it is stale.* After J-A28.46, S10b places the households but S11 writes the clamped count (§4.7 l. 4642–4647;
  §2.6 l. 965, 1470–1472). The pipeline and model seats both asked for this change, and assemble-r2 §8 (1) repeats it.
* *Required change.* The clause reads "…bounded upstream by §2.6's capacity, which the generation fill (S10b's
  placement, S11's clamped write), `relet` and every later change of the shell keep to (§4.7, §4.11, §7.1)".

**VD2-10 · determinism · minor · conflict (cross-part note unreflected) · item 28 (f) — §5.2 F-PLAN tier 2 (l. 5586),
with VD2-09.**
* *The kernel's rule.* Kernel round 2 made §3.4's seed clip refuse "a piece left with a hole — an earlier ring wholly
  inside a later one" as `overlap` (l. 2615–2617).
* *The conflict.* F-PLAN's tier 2 sends every refused seed ring ("detail `seed`, or `overlap` naming a seed ring's
  vertex") to the bug abort, "the shell §2.6's composition contract guarantees". Overlapping wings are legal (§2.6
  rule 4 (iii)), so a composition with one wing's extent wholly inside a later one's aborts its plan on a legal input.
  The kernel's cross-part note asked F-PLAN to include the case or cite the rule that prevents it.
* *Required change.* After "any other refused ring — a seed ring (detail `seed`, or `overlap` naming a seed ring's
  vertex), the passage room or a composer's room — is the shell §2.6's composition contract guarantees" insert "(its
  step 4's storey order leaves no seed piece with a hole, §3.4's `tileRings`)". This depends on VD2-09.

**VD2-11 · determinism · minor · new-problem · item 28 (f) — §5.2 F-PLAN tier 2 (l. 5586), J-A28.73 (index l. 12889,
Part A l. 506).**
* *The text.* Tier 2 re-places a refused stair bay or chimney stack "onto the side it came near or at least `minEdge`
  from it, §3.4, at its next `attempt`".
* *Why "next attempt" cannot hold.*
  * Tier 2 is "a deterministic geometric fix" (§5.1's table, l. 5553), and retries on the next attempt are tier 3's.
  * §6.1 gives attempts only to `plan.layout` ("attempt cap 3 for `plan.layout`, 0 for the rest", l. 5808–5810).
  * A layout re-roll "keeps … the stair core by construction" (l. 5747–5748; §2.6 l. 1405–1406), so the core is placed
    on no stream that has a next attempt.
* *Required change.*
  1. **§5.2.** "at its next `attempt`" becomes "in the same attempt — a deterministic move that reads no stream, as
     every tier-2 repair is (§5.1)".
  2. **J-A28.73's index row.** "re-placed at its next attempt" becomes "re-placed in the same attempt by a
     deterministic move".
  3. **J-A28.73's Part A entry.** "at its next `attempt`" becomes "in the same attempt, by a deterministic move".

**VD2-12 · determinism · minor · missing · item 12 (with 23) — §7.6 rule-table list (l. 7180–7191).**
* *The gap.* The list names "the island rule and the sewer existence law (II.6, II.7)" but not `UndergroundRule`
  (II.7.4 l. 12145). That rule's values — the underground and crowding shares, the depth scale, the vacancy share, the
  depth bands — are "our own, calibratable" (the new `crowdingShare` among them, J-A12.47). Everything must stay
  editable (rule 3; owner amendment 5).
* *Required change.* After "the island rule and the sewer existence law (II.6, II.7)" insert ", the underground rule
  `UndergroundRule` (II.7.4)". Its declaration follows through VD2-15.

**VD2-13 · determinism · minor · new-problem (PLAUSIBLE) · items 20, 22 (d) — §6.1 Enter (l. 5835–5839), J-DET-53
(index l. 12536, Part A l. 153).**
* *The text.* Enter copies each live dossier-backed assignment "as the dossier gave it".
* *What it drops.* A dossier also speaks through `setAttr` events:
  * the dossier events are "`assign`, `unassign` and `setAttr` events" (§7.7 item 1, l. 7309–7311);
  * the creation dossier becomes "`assign` and edit events at log positions 0…k" (One path, l. 7293–7295);
  * a dossier event sets an institution's `knownTo` (item 7, l. 7370–7373).

  Enter carries none of these. So a dossier's later re-designation, name or `knownTo` reverts on the new map, against
  item 20's authority and item 22 (d)'s "every dossier element present from the start".
* *Required change.*
  1. **§6.1.** "— the assignment as the dossier gave it, without `placed`, `target` or `use`, which name the old
     town's entities —" becomes "— the assignment as the dossier's live events leave it (each live dossier `setAttr`
     on the element written into the copy's matching `Assignment` field: `name`, `function`, `shapeClass`, `knownTo`,
     `drift`), without `placed`, `target` or `use`, which name the old town's entities —".
  2. **J-DET-53's amendment note, index and Part A.** It gains "with the dossier's later `setAttr` values".

### 5.2 Other parts' (found while checking what cites this part)

**VD2-02 · pipeline · major · missing · item 20 (with 17, 8) — §4.11 use step (l. 5257–5265), redevelopment
(l. 4997–4999), epoch order (c) (l. 5081–5082).**
* *The texts.* None of the three spares a dossier-backed use:
  * the use step "closes only when its catchment's demand … has been below `closeShare` for `closeAfterEpochs`, or a
    hard supply edge has had no provider …", and its assignment clause (4) protects only a `pinned` one;
  * a redevelopment's purchase closes or relocates "the plots' uses … a pinned assignment or a lock stops it";
  * step (c) fires `vacate` at a building's last household.

  So an epoch closes a dossier-backed use or empties its building, which §7.7 item 2 and §5.3 forbid (VD2-01). The
  decline table's exemption row (l. 5322, "an assigned entity only through the use-relocation rule") covers the lottery
  only.
* *Required change.*
  1. **Use step (2).** After "…no provider in reach for `starveAfterEpochs`;" insert "a dossier-backed use (its
     assignment's `existence: 'dossier'`, §7.7 item 2) never closes by this rule — where its catchment fails it
     relocates to (1)'s best alternative, counted in the cap, else stays —;".
  2. **Redevelopment.** "(the plots' uses closed or relocated by the use step under item 17's rules; a pinned
     assignment or a lock stops it)" becomes "(the plots' uses closed or relocated by the use step under item 17's
     rules — a dossier-backed use relocated, never closed; a pinned assignment or a lock stops it)".
  3. **Step (c).** After "`vacate` fires only when its last household leaves" insert "— on a building that houses a
     dossier-backed use only once the use step has relocated that use (§7.7 item 2)".

**VD2-14 · pipeline · minor · missing (cross-part note unreflected) · item 28 (f) — §4.11 epoch order (a)
(l. 5079–5080).**
* *The gap.* §2.5 (l. 866) and §2.8 (l. 1733) say `Plot.fieldBand` is "re-banded after S6 at every epoch (§4.11)". §4.11
  never names `fieldBand` (0 occurrences in l. 4919–5445). The model seat's note to the pipeline asked for it.
* *Required change.* "(a) S6 re-evaluates the drivers and the bands and marks the due blocks" becomes "(a) S6
  re-evaluates the drivers and the bands, re-bands every plot's `fieldBand` against its own column (§2.5, J-A28.29) and
  marks the due blocks".

**VD2-15 · pipeline · minor · missing · item 12 — II.7.4 `UndergroundRule` (l. 12145).**
* *The gap.* `IslandRule` is declared "a rule table (§7.6)" (l. 11843). `UndergroundRule`, whose values are "our own,
  calibratable", has no such declaration, so nothing makes it editable.
* *Required change.* The interface's comment gains "a rule table (§7.6)". §7.6's list follows through VD2-12.

**VD2-09 · model · minor · missing (cross-part note unreflected) · item 28 (f) — §2.6 plan step 4 (l. 1376–1378).**
* *The gap.* Step 4 clips the extents "where wings overlap, rule 4 (iii), each extent less the union of the extents
  before it in wing order: §3.4's seed contract". It neither names `tileRings` nor rules on the case §3.4 now refuses:
  an earlier wing's extent wholly inside a later one's at a storey (l. 2615–2617). The kernel seat's note asked §2.6 to
  rule on it, and assemble-r2 §8 (5) repeats it.
* *Required change.* The clause reads "clipped to tile by §3.4's seed clip `tileRings` (where wings overlap, rule 4
  (iii), each extent less the union of the extents before it in the storey's wing order — an order that puts a wing
  whose extent lies wholly inside another's after that one, so the container takes the enclosed rooms and no piece is
  left with a hole, which §3.4 refuses)". J-A28.26's Part A entry gains the sentence.

**VD2-03 · scope · minor · missing (the bar for VD2-01 / VD2-02) · item 20 — §13.2 dossier bars (l. 10257–10268).**
* *The gap.* No bar exercises dossier existence across epochs.
* *Required change.* After T20-5 add: "(T20-6, from M4, J-A17.01) on a B-CITY dossier fixture with a dossier-backed
  shop in a declining quarter, epochs whose use step, redevelopment and population fall reach it relocate it and never
  close it or empty its building, and §5.3's dossier row holds after every epoch".

## 6 Issue table

| id | owner | severity | kind | item | section |
|---|---|---|---|---|---|
| VD2-01 | determinism | major | new-problem | 20 (17, 8) | §7.7 item 2; §5.2 F-EDIT; §7.1 dry run; J-A20.75 |
| VD2-02 | pipeline | major | missing | 20 (17, 8) | §4.11 use step, redevelopment, step (c) |
| VD2-03 | scope | minor | missing | 20 | §13.2 T20-6 |
| VD2-04 | determinism | minor | conflict | 28 (f), 31 | §5.3 epoch row; §7.3 stored-plan row |
| VD2-05 | determinism | minor | conflict | 28 (f), 30 | §7.1 plots and buildings rows; §7.4 new `fieldBand` row; §7.5 |
| VD2-06 | determinism | minor | conflict | 30 × 28 | §7.3 item 1 |
| VD2-07 | determinism | minor | new-problem | 28 (f) | §7.1 plans paragraph |
| VD2-08 | determinism | minor | stale | 28 (f) | §5.2 F-PLAN tier 6 |
| VD2-09 | model | minor | missing | 28 (f) | §2.6 plan step 4; J-A28.26 Part A |
| VD2-10 | determinism | minor | conflict | 28 (f) | §5.2 F-PLAN tier 2 |
| VD2-11 | determinism | minor | new-problem | 28 (f) | §5.2 F-PLAN tier 2; J-A28.73 |
| VD2-12 | determinism | minor | missing | 12, 23 | §7.6 list |
| VD2-13 | determinism | minor | new-problem | 20, 22 (d) | §6.1 Enter; J-DET-53 |
| VD2-14 | pipeline | minor | missing | 28 (f) | §4.11 epoch order (a) |
| VD2-15 | pipeline | minor | missing | 12 | II.7.4 `UndergroundRule` |

The totals are 15 issues: 2 major and 13 minor, 0 blockers. By owner: determinism 10 (1 major), pipeline 3 (1 major),
model 1 and scope 1. Two pairs are coupled and should be applied together: VD2-01 with VD2-02 (and the bar VD2-03), and
VD2-09 with VD2-10.

## 7 CONFIRMED versus PLAUSIBLE

**CONFIRMED (read on disk and checked by grep).** Line numbers are those of the live `docs/ARCHITECTURE.md`: sha256
`831efd42…`, 12 942 lines, as assemble-r2 installed it at 08:29, unchanged while this seat read it.
* *The re-check.* Every FIXED verdict in section 3 was read at the cited line, and so was every quoted text in section 5.
* *The resolver.* `refs.py` on the live document gives 139 heading keys, 35 D ids, 469 J ids and 2 broken references,
  both pre-existing and external. §5–§7 have 0.
* *The stale probes.* A grep of l. 5477–7443 finds none of the task's stale phrases, none of the retired r1 wordings and
  no deferral wording; the one remaining stale phrase is VD2-08's.
* *The J rows.* Every J row and Part A entry named exists. The nine ids this part's r2 repair wrote or restated are
  present in both tables and agree with the section text.
* *The textual conflicts.* These rest on two quoted texts disagreeing:
  * VD2-01: §7.7 item 2's definition and list against §4.11's use step, redevelopment and step (c);
  * VD2-04: §2.6's J-P48 (1) sentence against the epoch row's "every difference";
  * VD2-05, VD2-06, VD2-14: pointers in §2.5, §2.6 and §2.8 to rules §7.1, §7.3, §7.5 and §4.11 do not state;
  * VD2-08: "S10b's fill" against §4.7 and J-A28.46;
  * VD2-10 with VD2-09: §3.4's refusal of a holed piece against F-PLAN's bug clause;
  * VD2-11: "next `attempt`" against §5.1's tier table and §6.1's attempt caps;
  * VD2-12, VD2-15: `IslandRule`'s "a rule table (§7.6)" against `UndergroundRule`'s silence.

**PLAUSIBLE (reasoning on the texts).**
* *Consequences.* That VD2-01's epoch is refused or aborts in practice rather than being tolerated by an unstated
  reading. That VD2-07's hand edits lower the capacity below the housed count often enough to reach F-PLAN's abort.
  That VD2-13's dossier `setAttr` values are not already folded into the assignment record by the host door.
* *The required changes' own choices.* Each is vetoable:
  * a dossier-backed use relocates rather than closes under the use step (VD2-02);
  * the wing order at a storey puts a contained wing after its container (VD2-09);
  * hand shell edits re-home the excess by §4.7's pass (VD2-07);
  * Enter writes the dossier's `setAttr` values into the copied assignment (VD2-13).
* *Severity labels.* They are this seat's judgment.

**Not done by this seat.** It ran no document checks (they are the assembler's) and edited no design text (repairs go
to the next repair round's block files).
