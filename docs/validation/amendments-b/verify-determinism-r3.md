# Verify — DETERMINISM part (§5, §6, §7) after repair round 3 (r3)

> PENDING FABLE REVIEW — Opus-produced (amendments-b/verify-determinism-r3).

## PROGRESS (kill-safe ledger)
- READ: verify-determinism-r2.md, validate.md (§1–§6), repair-determinism-r3-report.md, assemble-r3.md | done
- READ: the other five r3 reports' cross-part notes to this part (model: re-homing bar + §5.3 row, locked households; pipeline: refinements 1–4; kernel, rendering, scope) | done
- READ: §5, §6.1, §6.3, §7.1–§7.7 whole (live docs/ARCHITECTURE.md sha256 1a861c72…, 13 028 lines; the part is l. 5530–7519) and the citing text: §2.6 capacity bullet, clip order, plan steps 3–4, canonical chain; §4.7 households per building; §4.11 epoch order (a), use step (2), redevelopment, *Dossier content across epochs*, exemptions row; II.6 stretch split; §10.2 roster note; §13.2 T19-4, T20-6, T28-13–T28-18; the restated J rows and Part A entries | done
- RE-CHECK of the 12 issues repair r3 claimed and the merged ids | done (section 3)
- ITEM verdicts | done (section 2)
- CHECKS (single-source, stale, cross-part, deferral, broken-ref, new-problem) | done (section 4)
- ISSUES (new in r3) | done (sections 5, 6)
- FABLE queue row + LANDED line | done (row B-amendments-b/verify-determinism-r3 appended to docs/FABLE-REVIEW-QUEUE.md; LANDED line in docs/lane-events.log)

## 1 Outcome

Repair round 3 fixed what it claimed. All 12 determinism issues that validate.md §6 assigned to this part are FIXED in
the installed text, and so are the 5 ids merged into them (VD2-05, VD2-08, VD2-10, VP2-06, V-MAB2-05 (b)). The 5 issues
of other parts that I raised in r2 are fixed or withdrawn: VD2-02, VD2-03, VD2-09 and VD2-14 are FIXED, and VD2-15 was
withdrawn by the validator. Every item routed here stays PRESENT.

The re-check finds **12 new issues: 0 blockers, 2 major and 10 minor.** Nine belong to this part (1 major, 8 minor).
The other three belong to pipeline (1 major), model (1) and scope (1).

The majors are one pair. The pair must be applied together.
* **VD3-01 (determinism) with VD3-02 (pipeline).** Round 3's F-SITING clause (VP2-07) drops from the manifest a
  household that S11's overflow pass cannot house. But §7.7 item 2 lists the population as dossier content, which
  "F-SITING never drops". The owner's item 20 (b) says the population exists on every map, and (e) says its housing is
  re-provided. So an overflow that its district cannot absorb removes dossier content. A §7.6 edit that lowers
  `households.max` across a class can cause such an overflow. The determinism repair seat flagged this for Fable, and
  assemble-r3 §8 (4) repeats it. It is a conflict with an owner rule, not an open question.

**No owner ruling is needed.** Each required change follows an existing decision: item 20 (b), (c) and (e), J-A20.71,
J-A20.72, J-A20.75, J-A20.43, J-A22.74, J-A28.23, J-A28.46, J-A28.73 and J-A11.43. Three of the changes amend recorded
rows, and each amendment stays open to the owner's veto: J-A28.46 (VD3-02), J-A20.75 (VD3-03) and J-A22.76 (VD3-04).

## 2 Per item — PRESENT / PARTIAL / MISSING (quotes from the live docs/ARCHITECTURE.md, sha256 1a861c72…)

### Home items

| item | verdict (r2 → r3) | the mechanism, quoted (line) | open issues |
|---|---|---|---|
| 20 one-way flow; the dossier is the authority | PRESENT → PRESENT (the epoch gap closed; one new conflict) | §7.7 item 2 (l. 7390–7400): "A map event — one a user, or a host's map edit, appends without `EditBase.dossier` — that would close, remove or re-designate a dossier-backed element is refused as F-EDIT … An `epoch` is bound by the same rule without being refused by it: no step of an epoch closes a dossier-backed use or leaves one without its building"; §5.3 dossier row (l. 5667): "stage-end (each `epoch` event: every dossier-backed assignment)"; home of the epoch rule §4.11 *Dossier content across epochs* (l. 5315–5327) | VD3-01, VD3-02 (major); VD3-03, VD3-04 |
| 22 dossier changes mutate the map, never re-roll it | PRESENT → PRESENT | §6.1 Enter (l. 5889–5894): "the assignment as the dossier's live events leave it (each live dossier `setAttr` on the element written into the copy's matching `Assignment` field: `name`, `function`, `shapeClass`, `knownTo`, `drift`)"; §7.7 item 6 (l. 7441–7445); §7.4 creation events (l. 6972–6976) | VD3-04 (an epoch's undo takes carried dossier events off the map) |
| 23 emulation-first defaults | PRESENT → PRESENT | §7.6 (l. 7272–7283): `ref:⟨reference⟩ ⟨behaviour⟩`, `extension: { over, mode }`, the parity presets; the table list now names "the underground rule `UndergroundRule` and the tunnel profile table `TunnelProfileRow` (II.7.2, II.7.4)" (l. 7259–7260); the static baseline "every residential building houses what §4.7's generation fill gives it — at least one household and never above its capacity" (l. 7289–7291) | — |

### Referencing items (the route's duties for this part)

| item | verdict (r2 → r3) | where (quote, line) | open issues |
|---|---|---|---|
| 8 decline and regrowth | PRESENT | §6.3 survival (l. 6080–6090); §5.3 epoch row (l. 5671) | — |
| 10 islands by prosperity | PRESENT | §7.1 sky-islands row (l. 6598); §6.3 anchor (l. 6158) | — |
| 11 the underground fades | PRESENT (VP2-05 fixed) | §6.3 (l. 6202–6205): "A **tunnel record** split by a stretch conversion (II.6, J-A11.43) follows the same rule, the centreline's first vertex standing for the frontage anchor"; §7.1 tunnels row (l. 6597) | VD3-10 (`Frontage` parts) |
| 12 underground neighbourhoods | PRESENT (VD2-12 fixed) | §7.6 (l. 7259–7260); §7.1 `placeAccess` (l. 6441) | — |
| 13, 14, 15 islands and sewers by tier | PRESENT | §7.8 (l. 7478–7485); §6.1 `island.place`, `sewer` (l. 5846–5851) | — |
| 16 relation and supply rules | PRESENT | §7.7 `PlacementCriteria` (l. 7350); §5.2 F-SITING (l. 5637), now with "S11's overflow pass (§4.7, item 28 (f)) finds no residential building of the district with room for a household" | VD3-01 |
| 17 uses move | PRESENT | §7.7 Epochs (l. 7375–7378); §5.4 `changes` (l. 5721) | VD3-03 (§7.7's gloss of §4.11) |
| 18 designation mutation | PRESENT | §7.3 item 8 (l. 6955–6963); §7.3 designation row (l. 6749) | — |
| 19 designation scales with prosperity | PRESENT | §7.7 `drift` (l. 7345) | — |
| 25 terrain and water change slowly | PRESENT | §7.1 row (l. 6599); §7.3 (a) 3 (l. 6766–6770) | — |
| 28 plan rung and elaboration by click (with (f)) | PRESENT (VD2-04, 06, 07, 11, V-MAB2-05, VK2-06 fixed; new gaps around the re-homing) | §5.2 F-PLAN (l. 5639): tier 1 "a seed or fixed ring the rung's seed clip or transient arena refuses", tier 2 "in the same attempt, at the next candidate of that step's filtered placement order — a deterministic move that reads no stream", tier 6 "§2.6's re-homing on every change that lowers a capacity"; §7.3 item 1 (l. 6693–6699) "an edit that lowers a building's capacity below its households holds the buildings §2.6's capacity rule re-homes them into"; §7.1 (l. 6558–6560) | VD3-05, VD3-06, VD3-07, VD3-08, VD3-09; VD3-11 (model); VD3-12 (scope) |
| 29 entrances and basements | PRESENT | §5.3 basement row (l. 5666); §7.6 (l. 7261); §7.5 (l. 7212–7214) | — |
| 30 hidden plots | PRESENT (V-MAB2-04 fixed) | §7.1 buildings row (l. 6593): "each base wing's `spans` (written and cleared only by S11 when it builds or re-fits a passage's front building, §2.6)"; §7.5 (l. 7218–7219): "no older document has a passage, so no base wing carries `spans`"; §7.3 item 1 spanned passage (l. 6696–6698) | — |
| 31 wealth ladder and geometry floor | PRESENT (VD2-04 fixed) | §5.3 epoch row (l. 5671): "its rings read as that row reads them (without the `composition`-role vertices a stored plan's re-cut adds, §2.6, J-P48 (1))" and "shell subtrees, so read"; §7.4 `builtBand` row (l. 6997); §7.4 `fieldBand` row (l. 6998) | — |

## 3 Re-check of the issues the repair claimed to fix

FIXED means that the validator's required change, or the repair's recorded equivalent, is present at the line given and
is consistent with its home.

### 3.1 The 12 issues assigned to this part (validate.md §6), with their merged ids

| id (merged) | verdict | evidence (line in the live document) |
|---|---|---|
| VD2-01 (major) | FIXED (residues VD3-03, VD3-04) | (1) the new definition at §7.7 item 2 l. 7390–7391, §7.1 dry run l. 6625–6627 and §5.2 F-EDIT l. 5645; (2) the epoch sentence at l. 7397–7400; §5.3 dossier row l. 5667 (the epoch clause and a stage-end check per `epoch`); J-A20.75 index l. 12948, Part A l. 480 (item 17 (d) yielding to item 20). The home is §4.11 l. 5315–5327 (pipeline, J-A20.43). |
| V-MAB2-04 (+VD2-05) | FIXED | §7.1 plots row l. 6592 ("never `fieldBand`, derived state written only by a derivation that reads the current field and by the epoch's re-banding"); buildings row l. 6593 (`spans`); §7.4 `fieldBand` row l. 6998; epoch row l. 7008 ("each plot's `fieldBand` re-banded after S6"); §7.5 l. 7211–7212 and l. 7218–7219; J-A31.76 index l. 12954, Part A l. 486 |
| V-MAB2-05 (a) (+VP2-06, VD2-08) | FIXED | §5.2 F-PLAN tier 6 l. 5639: "the generation fill (§4.7: S10b's placement, S11's clamped write and its overflow pass), `relet` (§4.11) and §2.6's re-homing on every change that lowers a capacity keep to" |
| VD2-06 (+V-MAB2-05 (b)) | FIXED | §7.3 item 1 l. 6693–6699 (stored compositions, spanned passages, re-homed households); oracle (ii) l. 6923–6926 extended to a re-cut |
| VD2-07 | FIXED (residue VD3-06) | §7.1 l. 6558–6560, a pointer to §2.6's capacity rule |
| VP2-05 | FIXED (residue VD3-10) | §6.3 l. 6202–6205; II.6 l. 11948 points to it ("each part keyed by §6.3's SPLIT rule for a tunnel record") |
| VP2-07 | FIXED (new conflict VD3-01) | §5.2 F-SITING l. 5637: the where cell "S10b; S11's overflow pass (§4.7)", the detection clause, the ladder's last-rung clause and the test cell "(§13.2 T19-4)" |
| VD2-04 | FIXED | §5.3 epoch row l. 5671 (invariant and check cells); §7.3 stored-plan row l. 6752 |
| VK2-06 (+VD2-10) | FIXED | §5.2 F-PLAN tier 1 and tier 2 l. 5639; the cited clip order is stated at §2.6 l. 1263–1266 and step 4 l. 1385–1388 |
| VD2-11 | FIXED (residue VD3-09) | §5.2 F-PLAN tier 2 l. 5639; J-A28.73 index l. 12974, Part A l. 506 |
| VD2-12 | FIXED | §7.6 l. 7259–7260; `TunnelProfileRow` is declared at l. 12226 |
| VD2-13 | FIXED | §6.1 l. 5889–5894; each named field is an `Assignment` field (§7.7 l. 7345–7349); J-DET-53 index l. 12621, Part A l. 153 |

Two same-shape stale fixes the repair made beyond the validator's list also check out. §7.6 l. 7289–7291 no longer says
"built count". §7.3's canonical prior (l. 6751) reads the as-built count "clamped into [1, capacity]", which matches
§2.6's canonical chain (l. 1514–1516).

### 3.2 The other parts' issues I raised in r2

| r2 id | owner | verdict | evidence |
|---|---|---|---|
| VD2-02 | pipeline | FIXED | §4.11 *Dossier content across epochs* l. 5315–5327; use step (2) l. 5299; redevelopment l. 5034–5035; exemptions row l. 5375 |
| VD2-03 | scope (→ VS2-03) | FIXED | §13.2 T20-6 l. 10346 |
| VD2-09 | model (→ V-MAB2-09) | FIXED | §2.6 l. 1263–1266, step 4 l. 1385–1388 |
| VD2-14 | pipeline (→ VP2-02) | FIXED | §4.11 epoch order (a) l. 5116–5119 |
| VD2-15 | pipeline | WITHDRAWN by the validator, confirmed | II.7.4 l. 12233: "II.7.1's and II.7.3's tables as one editable rule record (§7.6)" |

My other r2 findings keep their r2 verdicts (verify-determinism-r2.md §3–§4).

## 4 The checks

* **SINGLE-SOURCE.**
  * *Stated once.* Round 3's new rules are stated at their homes, with pointers elsewhere:
    * the dossier-across-epochs rule at §4.11, pointed to from §7.7 item 2 and §5.3;
    * the capacity re-homing at §2.6, pointed to from §7.1, §7.3 item 1 and §5.2;
    * the tunnel SPLIT at §6.3, pointed to from II.6.
  * *Two lagging copies.* §7.7 item 2 glosses §4.11 more strongly than §4.11 states it (VD3-03). §7.1's pointer lists
    three of §2.6's paths as if the list were complete (VD3-06).
  * *The map-event definition.* It is stated three times, at §7.7, §7.1 and §5.2, as validate.md required. The three
    copies are word-identical, and §5.2 cites "§7.7 item 2's list". This is accepted as a gloss.
* **STALE.**
  * *The task's probes.* A scripted grep of l. 5530–7519 finds none of the task's stale phrases: lots as buildings,
    binary wealth, size fixed by tier, one central market, the map editing the dossier, terrain and water that never
    change. The part has no licence text. §17.3's proprietary default is item 21's ruling, not a stale rule.
  * *Retired wordings.* Each occurs 0 times: "S10b's fill", "built count", "as the dossier gave it" and "one without
    `EditBase.dossier`". "next `attempt`" remains once, in tier 3, which is correct.
  * *Stale by this round.* §7.3's stored-plan row lists the events that change a stored plan's inputs, and the list
    omits the household moves round 3 adds (VD3-07).
* **CROSS-PART.**
  * *Reflected.*
    * The pipeline's §4.11 paragraph and its refinement 1 (step (e)'s dossier events excepted) agree with §5.3's
      dossier row.
    * §2.6's clip order is what F-PLAN tier 2 cites.
    * §4.11 (a)'s re-banding matches §7.4's epoch row.
    * II.6 points to §6.3.
    * T20-6's wording ("emptied or removed only after the use has moved — a pinned use keeping its building") matches
      §4.11.
  * *Not reflected.*
    * Model's note 1 asked for a §5.3 capacity row, which §5.3 lacks (VD3-05), and for a bar with the undo (VD3-12,
      scope).
    * Model's note 2, on locked households under re-homing (VD3-11). §5.2 F-EDIT already refuses a hand edit that
      moves a protected entity ("the effective scope holds protected entities whose fate is not *kept*"), so this
      part needs nothing once §2.6 passes over locked households.
    * Determinism's own flag to Fable, VP2-07 against item 20 (b), is ruled a conflict (VD3-01, VD3-02).
    * Pipeline refinement 2 (a dossier-backed use with no candidate stays in its building) is not reflected in §7.7's
      gloss (VD3-03).
    * Pipeline refinement 4 keys a split `Frontage` "as the tunnel's parts are", which §6.3 does not state (VD3-10).
  * *Considered; no issue.* Model's note 3 (capacity on base or composed wings) is a §2.6 question with no
    determinism side. It is left to the model verifier.
* **DEFERRAL-WORDING.** None. The probes for "TBD", "to be decided", "later pass", "left open", "deferred", "TODO" and
  "open question" all return 0. F-PLAN's "stage 3, staged — this row is its hook" and §7.7 item 8 are the roadmap's
  staging, which rule (4) allows.
* **BROKEN-REFERENCE.**
  * *The resolver.* `refs.py` on the live document gives 139 heading keys, 35 D ids, 470 J ids and 2 broken
    references. Both are the pre-existing external citations (l. 2708, l. 9200), and §5–§7 have 0.
  * *Semantic.* §2.6 says the re-homing's undo "restores them (§7.4)", but §7.4's rows for those edits do not say so
    (VD3-08). II.6's `Frontage` keying relies on a §6.3 rule that names only the tunnel record (VD3-10).
* **NEW-PROBLEM** (round 3's mechanisms against this part's existing rules):
  * F-SITING's last-rung household drop against §7.7 item 2's dossier population (VD3-01, VD3-02);
  * tier 2's "next candidate" with no rule for an exhausted order (VD3-09);
  * the dossier's authority against undo, `revert` and an epoch's undo (VD3-04). This is older than round 3, and it is
    found now because §7.7 item 2 and §7.4 were re-read whole.
  * The narrowed map-event definition leaves out an upgrade's re-imposed constraint (`author: 'migration'`). I judged
    this no issue: an upgrade is the user's confirmed action, its re-imposed constraints are shown in its diff, and the
    predicate "that would close, remove or re-designate" still reads on it through "a user … appends".

## 5 Issues found in r3 (owner · severity · kind · item) — each with its exact required change

### 5.1 Majors (one pair; apply together)

**VD3-01 · determinism · major · conflict · item 20 (b), (e) with 28 (f) — §5.2 F-SITING ladder and test cells
(l. 5637).**
* *The texts.*
  * §5.2 F-SITING says "a household S11's overflow pass cannot house takes the last rung alone — the manifest reduced by
    it, reported with the capacities that refused it, no re-cut after S11".
  * §7.7 item 2 (l. 7387–7389) says "Everything the dossier specifies — … the population (the roster's demand, §10.2)
    … — is a dossier-backed assignment … F-SITING never drops it". §5.3's dossier row agrees.
  * §10.2 (l. 9020–9021) says the households follow "the dossier's roster where one exists".
  * The owner's item 20 (b) says the population "EXISTS on every map", and (e) says "housing for its population … is
    re-provided elsewhere".
* *How the drop is reached.* It happens whenever a district's residential capacity falls below its households. That
  includes a §7.6 edit of `households.max` or a band-set edit that lowers capacities across a class (§2.6's list), so it
  is not only a generation edge. The textual conflict is CONFIRMED; the frequency is PLAUSIBLE.
* *Required change.*
  1. **§5.2 F-SITING ladder cell.** After "no re-cut after S11" insert " — never a household of a dossier's roster
     (§7.7 item 2), whose housing §4.7's overflow pass re-provides (J-A20.72)".
  2. **The test cell.** "every household S2 demanded housed or reported unplaced (§13.2 T19-4)" becomes "every
     household S2 demanded housed or reported unplaced, and every household of a dossier's roster housed (§13.2 T19-4)".
  3. The mechanism is VD3-02's, at its home.

**VD3-02 · pipeline · major · conflict · item 20 (b), (e) with 28 (f) — §4.7 "Households per building" (l. 4687–4689);
J-A28.46 (index l. 12981, Part A).**
* *The text.* §4.7 reads "a household no building of the district has room for is an unplaced item of F-SITING (§5.2),
  reported with the capacities that refused it". J-A28.46's Part A says F-SITING's last rung "takes off the manifest a
  household no building of its district can hold". Both drop a dossier-roster household (VD3-01).
* *Required change.*
  1. **§4.7.** After "reported with the capacities that refused it" insert " — except a household of a dossier's roster
     (§7.7 item 2), which is never dropped: its housing is re-provided in its district as J-A20.72 states. S10b's
     `dossier` request places one residential slot for it on the district's best vacant plot or yard ground — a
     fixed-point placement, every other plot kept — and S11's operator builds that slot in the same derivation or
     causing event. Where the district holds no such ground, the household takes F-SITING's ladder from its first rung,
     as every dossier-backed item does, and never its last; and a hand edit whose re-homing cannot so house one returns
     F-EDIT (§7.7 item 2's refusal)".
  2. **J-A28.46's index row.** "else an F-SITING item" becomes "else an F-SITING item — a dossier-roster household
     re-provided in its district, never dropped (J-A20.72)".
  3. **J-A28.46's Part A entry.** Add the sentence: "A household of a dossier's roster is never taken off the manifest:
     item 20 (b) makes the population exist on every map and (e) re-provides its housing, so the overflow re-provides a
     residential slot in its district, and where it cannot, a hand edit is refused and a derivation takes F-SITING's
     first rungs (verify-determinism-r3, VD3-01/02)."
  4. The choice of in-district re-provision is PLAUSIBLE and vetoable. The alternative, a town-wide widening, would
     break the rule that the result never depends on "the order lazy districts are placed in" (§5.2 F-SITING).

### 5.2 This part's minors (determinism)

**VD3-03 · determinism · minor · conflict (a gloss stronger than its home) · items 20, 17 (d) — §7.7 item 2
(l. 7398–7399); J-A20.75 index (l. 12948) and Part A (l. 480).**
* *The conflict.* §7.7 says "§4.11's *Dossier content across epochs* relocates the use first wherever a step would
  close it or empty or remove the building that houses it". But §4.11 (l. 5318–5320) keeps a use whose catchment holds
  no candidate plot "in its building", and a pinned one keeps its building (pipeline refinement 2, J-A20.43). T20-6
  already follows §4.11, not §7.7.
* *Required change.*
  1. **§7.7 item 2.** "— §4.11's *Dossier content across epochs* relocates the use first wherever a step would close
     it or empty or remove the building that houses it —" becomes "— §4.11's *Dossier content across epochs* relocates
     it first, or keeps it in its building, wherever a step would close it or empty or remove that building —".
  2. **J-A20.75's index row.** "— it relocates it first (§4.11) —" becomes "— §4.11 relocates it first or keeps it in
     its building (J-A20.43) —".
  3. **J-A20.75's Part A entry.** "§4.11 relocates the use first" becomes "§4.11 relocates the use first, or keeps it
     in its building where no candidate plot exists (J-A20.43)".

**VD3-04 · determinism · minor · conflict · item 20 (c) with 22 — §7.4 Replay semantics (l. 6972–6976), the assign /
unassign row's undo cell (l. 6991) and Targets (l. 7039–7041); §7.1 `revert` comment (l. 6450); §7.7 item 6
(l. 7443–7444); §5.2 F-EDIT (l. 5645); J-A22.76 (l. 12975 and Part A).**
* *The conflict.* The owner's item 20 (c) says only a dossier instruction removes, adds or re-designates a
  dossier-backed element. The document lets the map undo dossier events three ways:
  * §7.4's assign / unassign row, "(a dossier event among them)", gives every such event the ordinary undo, "the
    inverse mutation";
  * `revert` applies "the inverses of every logged event whose target is this entity", excluding only `creation`
    events;
  * §7.7 item 6 and J-A22.76 say an epoch's carried dossier events "are undone with it".

  An owner-role `undo(h, of)`, a ctrl-click reset, or the undo of an epoch that carried a dossier addition therefore
  removes, restores or re-designates dossier content with no dossier instruction. That contradicts §7.7 item 2's
  predicate and F-EDIT. The textual conflict is CONFIRMED; its reachability is PLAUSIBLE.
* *Required change.* Every dossier event gets J-A22.74's creation-event treatment.
  1. **§7.4 Replay semantics.** After "…a dossier element only by a dossier event (§7.7 item 2)." insert: "Every later
     dossier event (`EditBase.dossier` set, §7.7 item 1) is likewise no `undo`, `redo` or `revert` target of a map
     event. `revert` skips it, and an `undo(h, of)` naming it returns F-EDIT offering `rejectSite` and `placeAt`. An
     `epoch` that carried one in `EpochInputs.dossier` is refused as an `undo` target the same way. Undoing either would
     change dossier content without a dossier instruction (item 20 (c))."
  2. **§7.4 Targets.** "other than a `creation` event (above)" becomes "other than a `creation` event, a dossier event
     or an epoch that carried one (above)".
  3. **§7.1 `revert` comment.** "never a `creation` event, §7.4" becomes "never a `creation` or dossier event, §7.4".
  4. **§7.7 item 6.** "they fold only inside the epoch, are undone with it and are never undo targets on their own,
     and a truncated epoch that a `redo` re-appends keeps them (§7.4)" becomes "they fold only inside the epoch and are
     never undo targets, and neither is the epoch that carries them (§7.4)".
  5. **§5.2 F-EDIT detection.** "an `undo` naming a `creation` event (§7.4)" becomes "an `undo` naming a `creation`
     event, a dossier event or an epoch that carried one (§7.4)".
  6. **J-A22.76.** In the index row and the Part A entry, "are undone with it, are never undo targets on their own,
     and keep their `seq`s when a `redo` re-appends a truncated epoch" becomes "are never undo targets, and the epoch
     that carries them is none either (item 20 (c); verify-determinism-r3, VD3-04)".

**VD3-05 · determinism · minor · missing (cross-part note unreflected) · item 28 (f) — §5.3 (after the interior-ladder
row, l. 5669).**
* *The gap.* §2.6 promises that "the bound holds through every change" (l. 1484–1493), but no §5.3 row checks
  `Building.households ≤ capacity`. The model seat's note 1 asked for one, and assemble-r3 §8 (1) repeats it; "re-hom"
  occurs 0 times in §5.3.
* *Required change.* Insert the row: "| no building houses more households than its capacity: `Building.households ≤
  capacity(b)` (§2.6's one capacity function) after every committed change — the generation fill (§4.7), `relet`
  (§4.11) and every change §2.6's capacity rule lists, whose excess §4.7's overflow pass re-homes inside the causing
  event (J-A28.23, J-A28.46) | batch-local (the buildings whose wings, heights, class, plot `builtBand` or household
  count the batch wrote, and the receivers of its re-homing); stage-end (S11 per district after the overflow pass; each
  `epoch` event; a §7.6 table edit's re-derived set) | the capacity function recomputed on the touched buildings against
  `Building.households` |".

**VD3-06 · determinism · minor · duplicate (a partial list) · item 28 (f) — §7.1 "Entrances, basements, passages and
plans" (l. 6558–6560).**
* *The gap.* The pointer reads "an edit that lowers a building's capacity below its households — a `setAttr` of its
  heights, a `warp` or `moveVertex` that carries its footprint or its spanned passage's face — re-homes the excess by
  §2.6's capacity rule". §2.6's list also has a `setAttr` of the building's class and a §7.6 table edit, both of them
  hand edits (l. 1484–1489). The copy lags its home.
* *Required change.* Replace it with "an edit that lowers a building's capacity below its households — any change §2.6's
  capacity rule lists — re-homes the excess by that rule, each move among its fates (§7.3 item 4);".

**VD3-07 · determinism · minor · stale · item 28 (f) — §7.3 stored-plan row (l. 6752).**
* *The gap.* The row lists what re-cuts a STORED plan inside the event: "— a `relet`, an occupants' band change at an
  epoch, a designation mutation (item 28 (f))". The home is general: "A STORED plan is instead re-cut inside the event
  that changes its inputs" (§2.6 l. 1521–1522). §2.8's stale gloss includes the households. Round 3's re-homing, and
  §4.7's overflow pass, move households into a building with a stored plan, and the row does not name that change.
* *Required change.* The cell reads "— a `relet`, a household moved in or out (§4.7's overflow pass, §2.6's capacity
  re-homing, item 17's relocation, §10.3), an occupants' band change at an epoch, a designation mutation (item 28
  (f))".

**VD3-08 · determinism · minor · broken-reference (a cited fact not stated) · item 28 (f) — §7.4 rows setAttr
(l. 6983), moveVertex / warp (l. 6984), editTable / editPreset (l. 7000).**
* *The gap.* §2.6 says the re-homing's "undo restores them (§7.4)" (l. 1492–1493). But the setAttr row's undo cell is
  "inverse (old values in the undo record)", which read literally restores the heights and leaves the households moved.
  The warp row's undo record lists no households, and neither does the editTable row. The general "Application" bullet
  (l. 7046–7050) covers the case only through its "otherwise" branch.
* *Required change.*
  1. **setAttr row, undo cell.** Append "; a `setAttr` of heights or class that re-homed households keeps their former
     buildings in its undo record, which its undo restores (§2.6)".
  2. **moveVertex / warp row, undo cell.** After "former bases of re-based entities" insert ", and the households
     §2.6's capacity rule re-homed, with their former buildings".
  3. **editTable / editPreset row, undo cell.** After "restored from the undo record, never re-drawn" insert "; the
     households its capacity re-homing moved restored to their former buildings".

**VD3-09 · determinism · minor · new-problem (PLAUSIBLE) · item 28 (f) — §5.2 F-PLAN tier 2 (l. 5639); J-A28.73 Part
A (l. 506).**
* *The gap.* Round 3 re-places a refused stair bay or chimney stack "at the next candidate of that step's filtered
  placement order". Nothing says what happens when that order holds no further candidate. Tier 3 cannot help, because a
  layout re-roll keeps the core by construction (§6.1 l. 5800–5801).
* *Required change.*
  1. **§5.2.** After "as every tier-2 repair is (§5.1)" insert "; where that order holds no further candidate, the
     anchor goes to tier 6 — a chimney stack omitted, its hearth room kept and reported; a stair bay's upper storeys
     left unreached — the bar failing and the building flagged".
  2. **J-A28.73's Part A.** Gains "An anchor whose filtered order is exhausted takes tier 6, reported and flagged,
     never an abort (verify-determinism-r3, VD3-09)." The choice of tier 6 over an abort is vetoable.

**VD3-10 · determinism · minor · partial (cross-part pointer without a home statement) · item 11 — §6.3 JOIN and SPLIT
(l. 6202–6205).**
* *The gap.* II.6 (l. 11951–11952) splits a block's `Frontage` record where it spans a stretch end, "keyed as the
  tunnel's parts are". `Frontage` is an addressed record (`id: Id`, §2.5 l. 855). §6.3, the identity home (canon R5),
  names the tunnel record only. So it does not say which `Frontage` part keeps the address or whose lineage the parts
  continue.
* *Required change.* §6.3, after "…every part continues the tunnel's lineage with its part index." insert: "A block's
  `Frontage` record (§2.5) that the same split cuts at a stretch end follows the rule too. The part holding the record's
  first kerb edge in the centreline's order keeps the address; the other takes an address minted from the causing
  event's `seq` and ordinal; and each part continues the record's own lineage with its part index."

### 5.3 Other parts' (found while checking what cites this part)

**VD3-11 · model · minor · new-problem (PLAUSIBLE; the model seat's own note 2) · item 28 (f) — §2.6 capacity bullet
(l. 1490–1493).**
* *The gap.* The bullet re-homes "the households past the capacity, the last in address order". A household may be
  locked or pinned (§7.1 people row l. 6604; §7.2), and moving it breaks §7.2's "regeneration never changes it".
* *Required change.*
  1. "the last in address order" becomes "the last unlocked and unpinned ones in address order (a locked or pinned
     household keeps its building, §7.2)".
  2. "No such change is refused for it; only a hand `relet` above the capacity is (F-EDIT)." becomes "No such change is
     refused for it, except a hand edit that would leave a building's locked or pinned households alone above its new
     capacity, which returns F-EDIT (§5.2: a protected entity whose fate is not *kept*); a hand `relet` above the
     capacity is refused too."

  §4.7's overflow pass already re-places only "the overflow households", so it follows by the pointer. §5.2 and §7.2
  need no change.

**VD3-12 · scope · minor · missing (the bars for VD3-01 / VD3-05) · items 20, 28 (f) — §13.2 T28-18 (l. 10409–10411),
T19-4 (l. 10336–10337); §16 M3a exit.**
* *Required change.*
  1. **T28-18.** Append "; a `setAttr` of heights that lowers a building's capacity below its households, and a §7.6
     edit of its template row's `households.max` that does the same, each re-home the households past the capacity by
     §4.7's overflow pass inside the event — every move among the dry run's fates, the receiving buildings in its
     effective scope, no building above its capacity (§5.3) — and the undo of each returns every household to its former
     building byte-identically (the re-homing clause)".
  2. **T19-4.** After "is housed or reported unplaced by F-SITING (§4.7, J-A28.46)" insert "; on a dossier fixture
     whose district cannot hold its households, no household of the dossier's roster is unplaced (§5.2 F-SITING,
     VD3-01)".
  3. **§16 M3a exit.** Add "T28-18's re-homing clause".

## 6 Issue table

| id | owner | severity | kind | item | section |
|---|---|---|---|---|---|
| VD3-01 | determinism | major | conflict | 20 (b), (e) × 28 (f) | §5.2 F-SITING |
| VD3-02 | pipeline | major | conflict | 20 (b), (e) × 28 (f) | §4.7 households per building; J-A28.46 |
| VD3-03 | determinism | minor | conflict | 20, 17 (d) | §7.7 item 2; J-A20.75 |
| VD3-04 | determinism | minor | conflict | 20 (c), 22 | §7.4; §7.1 `revert`; §7.7 item 6; §5.2 F-EDIT; J-A22.76 |
| VD3-05 | determinism | minor | missing | 28 (f) | §5.3 new capacity row |
| VD3-06 | determinism | minor | duplicate | 28 (f) | §7.1 plans paragraph |
| VD3-07 | determinism | minor | stale | 28 (f) | §7.3 stored-plan row |
| VD3-08 | determinism | minor | broken-reference | 28 (f) | §7.4 setAttr, warp, editTable rows |
| VD3-09 | determinism | minor | new-problem | 28 (f) | §5.2 F-PLAN tier 2; J-A28.73 |
| VD3-10 | determinism | minor | partial | 11 | §6.3 JOIN and SPLIT |
| VD3-11 | model | minor | new-problem | 28 (f) | §2.6 capacity bullet |
| VD3-12 | scope | minor | missing | 20, 28 (f) | §13.2 T28-18, T19-4; §16 M3a |

The totals are 12 issues: 2 major and 10 minor, 0 blockers. By owner: determinism 9 (1 major), pipeline 1 (major),
model 1 and scope 1.

**Apply order.** VD3-01 with VD3-02, then VD3-12 (2). VD3-05, VD3-06 and VD3-08 go with VD3-11, then VD3-12 (1). VD3-03
and VD3-04 each stand alone.

## 7 CONFIRMED versus PLAUSIBLE

**CONFIRMED (read on disk and checked by grep or script).** Line numbers are those of the live `docs/ARCHITECTURE.md`:
sha256 `1a861c72…`, 13 028 lines, as assemble-r3 installed it at 10:18. It was unchanged at this seat's start and end,
and so was the rationale file (`8a24a5a7…`).
* *The re-check.* Every FIXED verdict in section 3 was read at the cited line, and so was every quoted text in section 5.
* *The resolver.* `refs.py` gives 2 broken references, both pre-existing and external; §5–§7 have 0 (receipt:
  scratchpad `vd3/refs-live.txt`).
* *The probes.* The stale and deferral probes over l. 5530–7519 were scripted (scratchpad `vd3/part.md`).
* *The J rows.* The four restated rows (J-A20.75, J-A31.76, J-A28.73, J-DET-53) agree with their sections in the index
  and in Part A.
* *The textual conflicts.* Each rests on two quoted texts disagreeing:
  * VD3-01/02: F-SITING's drop against §7.7 item 2's population;
  * VD3-03: §7.7's "relocates … first" against §4.11's "stays in its building";
  * VD3-04: §7.4's dossier-event undo against §7.7 item 2's predicate;
  * VD3-06, VD3-07, VD3-08, VD3-10: a copy or pointer against its home;
  * VD3-05: the absence of any capacity row, checked by grep.

**PLAUSIBLE (reasoning on the texts).**
* *Reachability.* That VD3-01's overflow and VD3-04's undo paths are reached in practice, and VD3-09's exhausted order.
* *The required changes' own choices.* Each is vetoable:
  * the in-district re-provision with a refusal for hand edits (VD3-02);
  * refusing the undo of dossier events and of epochs that carried them (VD3-04);
  * tier 6 for an exhausted anchor order (VD3-09);
  * the `Frontage` part that keeps the address (VD3-10);
  * passing over locked households (VD3-11).
* *Severity labels.* They are this seat's judgment. The two majors follow the precedent of VD2-01 and VD2-02: a path
  that breaks item 20's existence rule.

**Not done by this seat.** It ran no document checks (they are the assembler's) and edited no design text (repairs go
to the next repair round's block files).
