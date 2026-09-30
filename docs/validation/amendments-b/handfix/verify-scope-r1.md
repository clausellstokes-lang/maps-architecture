# handfix-b/verify-scope-r1 — the SCOPE part's fixes after repair round 1, verified

> PENDING FABLE REVIEW — Opus-produced (handfix-b/verify-scope-r1).

PROGRESS (kill-safe ledger; a seat that continues this lane reads it first)
ITEM inputs: planned closing-report §2 (scope-owned and scope-section issues) and §3, handfix/apply.md, repair-r1-*.md, assemble-r1.md, verify-*-r0 issue texts, archives pre-handfix-b and pre-handfix-b-repair-r1 | done
ITEM presence: planned per-section check archive(pre-repair-r1) + filed r1 changes == live for §13.1, §13.2, index, Part A J-A16.01; §0.2, §13.8, §16, Staged unchanged; closing §2 texts still present or deliberately superseded | done (all EQUAL but recorded deviations)
ITEM read: planned touched subsections whole, the homes they cite (§2.5, §2.6, §3.4, §6.3, §7.3, §7.4, §7.7, §10.2, II.6, §16, §13.8, §0.2) | done
ITEM checks: planned single source, references, deferral probe, item 20, bars for r1's new mechanisms, doc checks (three copies) | done
ITEM issues: planned exact required changes, anchors counted once, applied together on a scratch copy | done (3 minor: VSR-01..03, all scope)
ITEM close-out: planned queue row, LANDED line | done

Lane `handfix-b/verify-scope-r1`, 2026-09-27, opus verifier. Judged: `docs/ARCHITECTURE.md` sha256 `e9c0b828…` and
`docs/ARCHITECTURE-RATIONALE.md` `dcabf14b…` (assemble-r1's output, unchanged through this lane), against the read-only
archives `docs/archive/ARCHITECTURE(-RATIONALE)-pre-handfix-b-repair-r1-2026-09-27.md` (`5d752c9b…` / `61477508…`, the
"A1" text) and `…-pre-handfix-b-2026-09-27.md` (`1a861c72…` / `8a24a5a7…`, the "A0" text). This seat edited no design
text.

## Outcome

* **Every fix in the scope part is PRESENT, once, at its anchor; none is PARTIAL, MISSING or MISAPPLIED.** Round 1's
  eleven changes in §13.1 and §13.2 (VKH-03, VHM-07 (1) and (2), VPH-05 (1), VSH-01, VDH-02, VSH-04, VSH-05 (1) and (2),
  the carried VHM-01 (3), and the model seat's H2) and VSH-02 in Part A J-A16.01 were checked by script. For each
  touched section, A1 with the filed changes applied, compared whitespace-collapsed, equals the live section. The only
  difference is VSH-04's pointer, which the repair seat recorded as a deviation; it is sound (§1).
* **The closing report's scope fixes still stand.** #4, #13, #20, #29 and #30 are verbatim. #17, #23 and #31, and
  the other parts' #7 (4), #5 (iii) and #15 (2), were amended or superseded by round 1's filed changes. Each amended
  text is present, and every retired string occurs 0 times.
* **Nothing else changed.** §0.2, §13.8, §16 and Staged are byte-identical to A1. The index changed only in the seven
  restated rows and the appended J-A30.26, and its text outside the rows is unchanged. In Part A, J-A16.01 changed
  exactly as filed and J-A28.01 is unchanged. VPH-05 (2) is not present; VSH-01 superseded it. H2 landed once.
* **References resolve.** `refs.py` found 2 broken, the same 2 pre-existing external citations as A1. **No deferral
  wording** was found in the new texts or in the eight changed index and Part A rows (probe: 0). **Item 20 holds**: no
  touched text lets an epoch, an edit or a solver rung remove a dossier element or a dossier-roster household.
* **Three new issues, all minor, all owned by scope, none needing the owner** (§3). Each is a missing bar under
  amendments-b rule (2), for a mechanism that repair round 1 added and §13.2 does not yet prove:
  * VSR-01: the new composed-tower clip order (model, J-A28.26).
  * VSR-02: the brush's undo of re-homed households (determinism VDH-03).
  * VSR-03: a hand edit's dossier re-provision, its scope and fates (VDH-04), and its undo (verify-determinism-r1 VDR-02).
* **Document checks.** A1 to live adds exactly the 3 foreseen C3 hits, each covered by an allow row; the live file
  exits 0. My proposals add 0 hits (§2).

## 1 The fixes, one by one (live line numbers, doc `e9c0b828…`)

| fix | owner | where | verdict | evidence (live text) |
|---|---|---|---|---|
| #31 VS3-06 + VKH-03 | scope | §13.1 l. 10080 | PRESENT (as filed) | "a refusal — detail `overlap` — exactly where that result has a hole on a case whose rings keep §2.6's composition contract, at least `attractCm` apart except at their joints, so the overlay moves no vertex (§3.4); on any other case a refusal only where that result has a hole or two of its boundary parts lie within `attractCm` of each other, which attraction may join (§3.7))" |
| H2 (VHM-02) | model → scope's block | §13.2 T8-3 l. 10282 | PRESENT, once | "demolished or succeeded, and a front building made a footprint trace or demolished leaves its passage with no `frontBuilding` and no base wing spanning it, the undo restoring both (§2.6's `BaseWing.spans`);" |
| #23 VS3-03 → VSH-01 | scope | §13.2 T11-1 l. 10296 | PRESENT (as filed; supersedes VPH-05 (2)) | "split there (each part beyond an end a new record with its kerb edges' rows, one spanning both ends of an interior stretch split in three, … re-pointed to the part it fronts) — closes only the plots … its undo restores the one tunnel record and each split `Frontage`'s one record;" |
| #4 VS3-04 + VPH-05 (1) | scope | §13.2 T19-4 l. 10329 | PRESENT (as filed) | "— every building S11 builds for a slot without `houses` (§10.2) houses none, no plot's site plan holds a `required` structure below its least `count`, and every household S2 demanded …"; the dossier clause "on a dossier fixture whose squalid district's shells …" unchanged |
| VDH-02 | scope | §13.2 T20-2 l. 10333 | PRESENT (as filed) | "and an undo of a lapsing epoch that carried no dossier event restores the hold, while an `undo` naming a lapsing dossier event returns F-EDIT (§7.4);" |
| VSH-05 (1), (2) | scope | §13.2 T20-6 l. 10338 | PRESENT (as filed) | "and a `revert` of it skips every later dossier event (`EditBase.dossier` set) that placed or re-designated it, its dossier content unchanged (§7.4; item 20 (c)) (the refusal clause)"; "and an `undo` naming an epoch that carried a dossier event in `EpochInputs.dossier` returns F-EDIT and changes nothing (§7.4) (the epoch clause, from M4; J-A17.01)" |
| VSH-04 | scope | §13.2 §2.6's test l. 10207 | PRESENT (recorded deviation) | "its wings reaching every storey the base wings reach with at least their area at each (the storey rule of §2.6's stage-3 contract)" — the pointer reads so because "storey rule" also names §10.2's room `storey` column (6 uses); the stage-3 contract holds the rule and the intake bullet calls it "that storey rule". Sound. |
| #17 VS3-07 + VHM-07 (2) | scope | §13.2 T28-2 l. 10367 | PRESENT (as filed) | "at its outside door where step 3 opens one (§2.6 step 3) —" |
| VHM-07 (1) | scope | §13.2 T28-3 l. 10370 | PRESENT (as filed) | "or, for a walk-out, where no side of the ring is long enough for its door (§2.6's fallback, step 3; J-A29.25) — or, for any other walk-out (`Basement.access` `'external'`), by its outside stair;" |
| #13 VS3-05 | scope | §13.2 T28-18 l. 10401; §13.8 l. 10864; §16 l. 11357; J-A28.01 | PRESENT (unchanged since r0) | "T28-18's `relet` and re-homing clauses from M3a"; "every edit that lowers a capacity re-homing its excess"; J-A28.01 unchanged A1 → live |
| #20 VS3-08 | scope | §13.2 T28-15 l. 10396 | PRESENT (unchanged) | "exactly for an unstored plan (§2.6's canonical chain); for a stored plan, …" |
| #7 (4) + VHM-01 (3) | model, carried by scope | §13.2 T30-4 l. 10415 | PRESENT (as filed) | "has its `headroomCm` written and equal to §2.5's rule, after a heights edit of a spanning wing too," |
| #29 VS3-01 | scope | §0.2 l. 151; §16 l. 11359; Staged l. 12996 | PRESENT (unchanged) | "(J-A20.75, J-A20.43) in §4.11"; "and the relocation of a dossier-backed use inside an epoch"; "*Dossier content across epochs* (J-A20.43) and the folding" |
| #4 §16 rows | scope | §16 l. 11356–11357 | PRESENT (unchanged) | "T19-4 but its dossier clause"; "T19-4's dossier clause, T22-1" |
| #30 VS3-02 + VSH-02 | scope | Part A J-A16.01 (rat. l. 466) | PRESENT (as filed) | "…(verify-scope-r3 VS3-02; closing). The hand fix then added to M4's content the relocation of a dossier-backed use inside an epoch … M4's amount unchanged (verify-scope-r3 VS3-01; handfix-b verify-scope-r0 VSH-02)." — consistent with §16's "the transient arena and the M4 hooks (+1–2)" |
| VHM-06, VSH-03, VDH-06, VPH-03 (2) | model, model, determinism, pipeline | index J-A28.23 l. 12816, J-A28.28 12951, J-A28.73 12965, J-A11.43 12969 | PRESENT (exactly as filed) | restated-row swaps, one row per id |
| VKH-01 + VHM-04, VHM-05, VPH-01 (1) + VPH-02 | model, model, pipeline | index J-A28.26 l. 12819, J-A29.25 12967, J-A28.46 12972 | PRESENT (the owners' recorded reconciliations) | J-A28.26 agrees in substance with §2.6's "The composed towers … join the clip order"; J-A29.25 is VHM-05 reworded for C3 ("— else the `trapdoor` fallback —"); J-A28.46 adds "a live-in class's main slot always one" and "§4.7, §10.2" (VPH-02) |
| VHM-02 new J-A30.26 | model | index l. 12977 (appended); Part A | PRESENT, once | "(amends J-A30.25)"; agrees with §2.6 `BaseWing.spans` and with T8-3's H2 clause |

Probes, all whitespace-collapsed: every retired text occurs 0 times. These are "an undo of the lapsing event restores
the hold", "its undo restores the one record;", "at its outside door (§2.6 step 3) —", "(§2.6's storey rule)" and "the
part beyond the end a new record". VPH-05 (2)'s em-dash form also occurs 0 times.

## 2 Checks over the touched subsections and those that cite them

The following were read whole on the live text:

* **§13.2:** T8-3, T11-1, T19-4, T20-1 – T20-6, the B-PLAN group T28-1 – T28-19, T29-4, T30-4, and §2.6's test.
* **§13.1's differential**, and **§13.8** and **§16** (every row, the effort table and its pricing rule).
* **The homes these texts cite:**
  * §2.5 `Passage.frontBuilding` and `headroomCm`;
  * §2.6: `BaseWing.spans`, the capacity function and change rule, the stage-3 contract with the tower clip order,
    the intake bullet, and steps 3, 5 and 6;
  * §3.4 `tileRings` and the seed clip, and §3.7's attraction clause;
  * §6.3's SPLIT sentences, II.6's `Frontage` split, and §10.2 `structures.houses`;
  * §7.3 items 1 and 4, and §7.4's Replay semantics, rejectSite, setField and `builtBand` rows;
  * §7.7 item 3, `EpochInputs.dossier` and `EditBase.dossier`.
* **The index rows and Part A entries** changed by the round.

* **Single source.** Each new bar cites its home: §2.5's rule, §2.6's `BaseWing.spans` and its stage-3 contract, §3.4,
  §3.7, §6.3's split rule, §7.4 and §10.2. None restates a mechanism beyond the assertion it tests. T20-2's undo pair
  repeats, as a bar, the fact whose homes are §7.4's row and §7.7 item 3 (determinism's). All three agree word for word.
* **Agreement with the homes.**
  * T28-3 and step 3 agree on the walk-out door ("at least two of step 4's wing-local modules long … where no side is
    that long, the basement is joined by the `trapdoor` fallback").
  * T19-4 and §10.2 agree ("its flag read as true" keeps a live-in main slot out of "a slot without `houses`").
  * T11-1, II.6 and §6.3 agree: the three-part split, and the undo of "the one tunnel record and each split
    `Frontage`'s one record".
  * T20-6 (1) and §7.4 agree ("`revert` skips it").
  * T30-4 and §2.5 agree: every passage with a `frontBuilding`. VHM-02 clears `frontBuilding` on a trace or a
    tombstone, so no zero-height span is tested.
* **Milestones.**
  * **M2b:** T30-4, where passages are built. A heights `setAttr` exists from M2a.
  * **M3a:** T20-6's refusal clause (the dossier contract). No milestone row names `revert` itself; it is one of §7.1's
    edit kinds, and M3a, "full editing", is the latest row it can belong to, so it is built by the time the clause runs.
  * **M4:** T8-3 (T8-1 – T8-7, the decline hooks) and T20-6's epoch clause.
  * **M2b:** T19-4's new generation clauses (the fill and the packer).
  * **Stage 3's intake:** T28-2 and T28-3.
  * **Untouched:** §16 and §13.8 name each clause where its mechanism is built.
* **Bars for round 1's new mechanisms** (amendments-b rule (2): "the test or acceptance bar that proves it"):
  * VHM-01's headroom re-derivation: T30-4.
  * VHM-02 / J-A30.26: H2 in T8-3.
  * VDH-01: T20-2 and T20-6.
  * VDH-05 and VPH-03: T11-1.
  * VPH-02: T19-4.
  * **Not barred:**
    * the composed-tower clip order that round 1 rewrote (VHM-04 with VKH-01, J-A28.26): **VSR-01**;
    * the setField undo that restores re-homed households (VDH-03): **VSR-02**;
    * a hand edit's dossier re-provision, its scope and fates (VDH-04) and its undo (verify-determinism-r1 VDR-02):
      **VSR-03**.
* **Pricing.** Round 1 added nothing to §16's content rows. VSH-02 records the one M4 absorption from the hand fix. The
  model's passage refinements (J-A30.26) fall inside the O17 + O18 + O19 line's "the hidden shares and passages", as
  J-A30.25 already did.
* **Owner rules (item 20).**
  * VSH-05 and VDH-02 bar item 20 (c)'s guard.
  * H2 removes no building's use: a hand `demolish` of a building that houses a dossier-backed use stays refused
    (T20-6).
  * T19-4's `houses` clause keeps every dossier household housed (the re-provided slot has `houses`).
  * No new text defers anything.
* **Document checks** (`doc_checks.py --sections "13,Judgment calls"`, one C3 corpus snapshot, 911 940 3-grams, 9 626
  JSON files):

  | copy | result |
  |---|---|
  | untouched (live `e9c0b828…`), runs 1–3 across the lane | C1 5 · C2 0 · C3 124 · C4 0 · S1 0 · S2 0, 0 unreviewed, exit 0. The counts are identical in all three runs. Run 3's header shows 10 090 colour files against 10 089 (another writer added a file); the C3 corpus and every count were unchanged. |
  | A1 archive (the round-1 input) | C3 121, exit 0. With an empty allow file, A1 → live adds exactly "both ends of an interior", "one 2 6 step 3" and "side of the ring is". All three are reviewed allow rows (repair-pipeline-r1; repair-scope-r1 via assemble-r1). |
  | mine (live + VSR-01 … 03, scratch `vs1/ARCH-mine.md`) | hit set identical to untouched (129 = 129 lines, empty-allow diff empty), exit 0. `refs.py`: 2 broken, the same pre-existing pair. |
  | combined | no writer changed the live file during the lane (hash checked at the end), so combined = mine. The sibling round-1 verifiers' proposals (VDR-01 … 03, VPH1-01 … 02, VHM1-01 … 05) touch §2.6, §3.4, §4.7, §5.2, §7.4, §8.2, §10.2, J-A28.23, J-A28.26, J-A28.46 and Part A; none touches an anchor of §3. |

## 3 Issues

| id | owner | severity · kind | where | the defect in one line |
|---|---|---|---|---|
| VSR-01 | scope | minor · missing bar (rule 2) | §13.2 B-PLAN fixtures, T28-4 | round 1's composed-tower clip order has three branches and two new cases; no fixture reaches them, and no bar checks that a tower keeps its round room |
| VSR-02 | scope | minor · missing bar (rule 2) | §13.2 T28-18 | the setField undo that VDH-03 made restore re-homed households has no bar; T28-18 exercises four other capacity-lowering edits |
| VSR-03 | scope | minor · missing bar (rule 2) | §13.2 T28-18 | a hand edit's re-provision of a dossier household, with its scope and fates (VDH-04) and its undo (VDR-02), has no bar |

### VSR-01 — scope · minor · missing bar (round 1's VHM-04 + VKH-01 ruling, J-A28.26)

**Claim (CONFIRMED on the text; that the ruling's order is correct is PLAUSIBLE, as the model seat recorded).**

* **The new clip order.** Round 1 replaced §2.6's tower order with the following rules.
  * A tower wholly inside a wing that overlaps no earlier wing is taken directly after its container.
  * Every other tower is taken before all the wings, in `Composition.towers` order. That includes a tower inside a
    wing that overlaps an earlier wing (VHM-04's case) and two engaged towers (VKH-01's case).
  * "Each tower's round room is its ring less those of the earlier towers in the clip order that it overlaps".
* **The model seat's own receipts** list the argument that this gives one order with no holed piece as PLAUSIBLE, not
  executed (repair-model-r1-report §2.1, §5). assemble-r1 §8 (1) sends it to the verify round.
* **What B-PLAN reaches.** Its fixture list holds one tower, "a rectangle carrying a round tower", and that reaches only
  the before-all-the-wings branch.
* **What T28-4 misses.** T28-4 checks that each room lies within its wing's extent and that the rooms tile. It does not
  check that a tower's round room is whole. A composer that clipped the round room to a partial disk would pass T28-4,
  which is the result the ruling rejects ("a round tower keeps its round room"; the realism tiebreaker).
* **The wording is robust to verify-model-r1 VHM1-03.** That issue concerns a tower's spiral core bay, and every
  composed tower is its wing's spiral core (the `ComposedTower` comment). The text below reads true whether VHM1-03's
  repair passes the room less the bay or not, because it asserts that the room and the bay together cover the ring.

**Required change.** §13.2, two sub-changes (each old string occurs once; (1) crosses one soft line break):

(1) replace "a quad from a curved row, a rectangle carrying a round tower, a manor of three wings at unequal storey
counts)" with "a quad from a curved row, a rectangle carrying a round tower, a rectangle holding a round tower wholly
inside it, a rectangle carrying two round towers whose rings overlap, a T of two overlapping wings whose second wing
holds a round tower that also overlaps the first, a manor of three wings at unequal storey counts)".

(2) T28-4: replace "(the passage room within its span ring), and no gap or overlap remains between rooms" with "(the
passage room within its span ring), each composed tower's round room, with the bay of a spiral core it holds
(`StairCore.tower`), covers its ring less those of the earlier towers in the clip order that it overlaps (§2.6's
stage-3 contract), and no gap or overlap remains between rooms".

The fixture count "24 fixture buildings" stays, because the list names kinds. The bars run from stage 3's intake, as
T28-4 already does.

### VSR-02 — scope · minor · missing bar (round 1's VDH-03)

**Claim (CONFIRMED on the text).**

* **The path.** §2.6's capacity rule lists "a rewrite of the plot's `builtBand` (J-A31.44's paths)" among the changes
  that re-home households. `capacity(b)` reads "households.max of the designation template at the plot's builtBand",
  and §7.4's setField row says "a brush is authorial and sets `builtBand` in the blocks it re-derives".
* **Round 1's change.** VDH-03 changed that row's undo from a bare re-run to "the households §2.6's capacity rule
  re-homed restored to their former buildings from its undo record (§2.6)".
* **The missing bar.** T28-18's re-homing clause exercises a heights `setAttr`, a `moveVertex`, a passage face and a
  `households.max` table edit. None of these is a brush, so a brush undo that leaves the households moved passes every
  bar.

**Required change.** §13.2 T28-18: replace "the undo of each returns every household to its former building
byte-identically;" with "the undo of each returns every household to its former building byte-identically; a
prosperity-brush stroke that lowers the tenement's plot `builtBand` re-homes its excess the same way, and the stroke's
undo returns every household to its former building byte-identically (§7.4's setField row);". The old string occurs
once. The clause keeps T28-18's re-homing milestone (M3a); the brush exists from M2b.

### VSR-03 — scope · minor · missing bar (round 1's VDH-04, with verify-determinism-r1 VDR-02)

**Claim (CONFIRMED on the text).**

* **The path.** On a dossier map every roster household is a dossier household. A capacity-lowering hand edit in a
  district with no residential room therefore never returns F-EDIT (§2.6: "a dossier roster's household is re-housed
  by §4.7's re-provision"). It runs §4.7's `dossier` request inside the edit.
* **Round 1's change.** VDH-04 put the plots that request touches into the edit's effective scope (§7.3 item 1: "the
  site, its joined neighbour if any, and each displaced use's new site"). It also put the slot, the displaced uses and
  the joins into the fates (§7.3 item 4: "with the uses that re-provision displaces and the plots it joins").
* **The missing bar.** T28-18's re-homing clause checks only the receiving buildings and the F-EDIT refusal, and T19-4's
  dossier clause runs at generation, so no bar reaches this path. B-EDIT's locality oracle (§7.3 item 7) reaches it only
  if a sequence happens to include such an edit on a dossier map, and none of its listed fixtures is one.
* **The undo.** verify-determinism-r1 VDR-02 (filed alongside this lane) makes §7.4 restore those plots. This bar is its
  proof as well.

**Required change.** §13.2 T28-18: replace "returns F-EDIT (§2.6's capacity rule; the re-homing clause)." with "returns
F-EDIT; on a B-EDIT dossier fixture whose district has no residential room for the excess and whose tenement holds no
locked or pinned household, each such edit commits, the dossier roster's households past the capacity housed in a
residential slot the `dossier` request re-provides inside the district (§4.7), its dry run listing that slot with the
uses the re-provision displaces and the plots it joins and holding those plots in its effective scope (§7.3 items 1 and
4), and its undo restoring those plots and every household byte-identically (§7.4; §2.6's capacity rule; the re-homing
clause).". The old string occurs once.

**Apply with verify-determinism-r1 VDR-02** (§7.4's Application bullet), after VSR-02. If VDR-02 were ruled invalid, the
undo clause would have to be dropped with it.

**Anchors and application.** Each old string of VSR-01 … 03 occurs exactly once in the live document. The matcher lets
a single space match one soft line break, as `handfix.py` does. The four sub-changes were applied together to a scratch
copy (`vs1/propose.py`), and each new text occurs once after. The copy differs from live in 7 diff lines: VSR-01 (1)
joins one soft-wrapped pair.

## 4 Considered and ruled not defects

* **T20-2's two undo sub-clauses carry no clause label.** The clause names follow the event kind: "the dossier-event
  clause", and "the epoch clause, from M4". "An undo of a lapsing epoch" belongs to the epoch clause and "an `undo`
  naming a lapsing dossier event" to the dossier-event clause, so §16's split (M3a / M4) maps onto them without
  ambiguity. The pre-round text had the same shape.
* **H2 and T20-6 (2) assert about a case the fixture must contain.** Both are worded as test actions ("a front building
  made a footprint trace or demolished leaves …"; "an `undo` naming an epoch that carried a dossier event … returns
  F-EDIT"). T8-3's decline is hand-applied, and T20-6's epoch clause names its fixture, so the tester constructs the
  case. They are not vacuous by design.
* **verify-model-r1 VHM1-04 (kernel; §3.4's holed-piece wording).** §13.1's differential is keyed on the oracle's actual
  hole ("exactly where that result has a hole"), not on "an earlier ring wholly inside a later one". So it stays exact
  under round 1's tower order: A − T − B has no hole when B carries the cut. The transient-arena fixture ("on an earlier
  ring wholly inside a later one (refused …)") uses two rings and stays true. No scope change is needed.
* **verify-pipeline-r1 VPH1-01.** A required residential slot is now built "as a slot without `houses`, housing none".
  T19-4's "every building S11 builds for a slot without `houses` (§10.2) houses none" covers it unchanged, as that seat
  also found.

## 5 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed on disk):

* The live hashes equal assemble-r1's output and did not change during the lane.
* A1 plus the filed round-1 changes equals live in §13.1, §13.2, the index and Part A; the one recorded deviation and
  one script artefact are explained (`vs1/expect.py`, `index.py`, `parta.py`).
* §0.2, §13.8, §16 and Staged are unchanged from A1 (`secs.py`).
* Every closing-report §2 text in this part's sections is present, or amended by a filed round-1 change
  (`presence2.py`). The retired texts occur 0 times.
* References: 2 broken, both pre-existing. Deferral probe: 0. Index and Part A cell counts are intact, and fences are
  balanced.
* The document-check hit sets are as tabulated, and the untouched copy was stable across three runs.
* Every anchor of §3 occurs once, and the proposals apply together.

**PLAUSIBLE** (judgment):

* The severities.
* That VSR-01 … 03 add no new defect once applied.
* How often a composed tower sits at a wing overlap or engages another tower.
* How often a brush or a hand edit meets a full district on a dossier map.

## Files

* `docs/validation/amendments-b/handfix/verify-scope-r1.md` — this report.
* Scratchpad (session-local, `handfix/vs1/`):
  * the section tooling: `secs.py` with `diff-A1-L.txt`;
  * the checks: `expect.py` / `expect.txt` (§13.1, §13.2), `index.py` / `index.txt`, `parta.py`, `presence2.py` /
    `presence2.txt`;
  * the proposals: `propose.py`, `ARCH-mine.md` and `mine.diff`;
  * the document checks: `dc-*.txt`, `dcn-*.txt` / `.set`;
  * the references: `refs-*.json` / `.out`.
