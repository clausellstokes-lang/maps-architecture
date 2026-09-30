# handfix-b/verify-model-r2 — verification of the MODEL part's fixes after repair round 2

> PENDING FABLE REVIEW — Opus-produced (handfix-b/verify-model-r2).

PROGRESS (kill-safe ledger; a seat that continues this lane reads it first)
ITEM read: planned closing-report §2 (model #5 #7 #14 #15 #16 #18 #19; P1's §2.5 field), §3, handfix/apply.md, verify-model-r1, repair-model-r2 report + block file, assemble-r2, verify-pipeline-r1 VPH1-01/VPH1-02 | done
ITEM diff: planned word diffs pre-r2 archive -> live by subsection (§2.5, §2.6 and every other r2 section), line diff of both files | done (vm2/wd-CD-model.txt, vm2/wd-CD-others.txt: 24 doc hunks + 5 rationale lines, each an r2 seat's intended text)
ITEM per-fix: planned PRESENT / PARTIAL / MISSING / MISAPPLIED for the closing, round-1 and round-2 model fixes (vm2/probes.py) | done (closing 23 sub-changes present or superseded as recorded; r1 24 probes 1 in live (3 by body after the r2 restatement); r2 18 new texts 1 in live, 0 before; 9 retired texts 0)
ITEM sweeps: planned untouched text, single source, references, deferral, item 20, over §2.5 and §2.6 whole and the citing subsections | done (refs 2 pre-existing; deferral 0; item 20 held; 4 minor issues, §5)
ITEM checks: planned doc_checks.py three-copy (this lane edits no design text) + refs.py | done (untouched ×2 identical, exit 0; first wording of VHM2-02 +1 C4, reworded; final copy 0 added hits, exit 0; rationale 0 added; refs 2 pre-existing)
ITEM close: planned queue row, LANDED line | done (row B-handfix-b/verify-model-r2 appended, old prefix byte-identical; LANDED line written)

Lane `handfix-b/verify-model-r2`, 2026-09-27, a verifier seat (opus). Inputs: `docs/ARCHITECTURE.md` sha256 `357c02f2…`
and `docs/ARCHITECTURE-RATIONALE.md` `9575f26c…` (as handfix-b/assemble-r2 installed them; unchanged through this lane).
The befores: `docs/archive/ARCHITECTURE-pre-handfix-b-2026-09-27.md` (`1a861c72…`, before the hand fix),
`…-pre-handfix-b-repair-r1-2026-09-27.md` (`5d752c9b…`) and `…-pre-handfix-b-repair-r2-2026-09-27.md` (`e9c0b828…`), with
their rationale twins. This seat edits no design text. Receipts: session scratchpad `handfix/vm2/`.

## Outcome

* **Every model fix is in place, once, where it belongs.** The 23 sub-changes of the closing report's model issues (#5,
  #7 with #6 (ii), #14, #15, #16, #18, #19) are PRESENT; seven of them were later amended or replaced by repair rounds 1
  and 2 as those rounds recorded, and their substance is still there (§1). The ten round-1 model repairs with their
  hand-offs are PRESENT (§2). The round-2 repairs — VHM1-01, VHM1-02, VHM1-03 as the Fable seat widened it, VPH1-02 with
  the Fable seat's two additions — and the pipeline's §2.5 hand-off P1 (`BuildingSlot.unhoused`) are PRESENT once each,
  and the nine texts they retire occur 0 times (§3). Nothing is MISSING or MISAPPLIED: the live §2.6 equals the model
  block file's body line for line (591 lines), and the restated J-A28.23 and J-A28.26 rows equal the block's rows.
* **No other text changed.** Round 2 changed §2.5 in one place (P1), §2.6 in exactly the eleven places the model seat
  predicted and the J-A28.23 and J-A28.26 rows; the other 10 document hunks and 3 rationale lines are the sibling seats'
  intended texts (§4).
* **Other checks pass.** References: 2 broken, both pre-existing citations of outside documents. Deferral wording: 0.
  Item 20 holds: no model text lets an epoch, an edit or a solver rung remove a dossier element or a household of a
  dossier's roster.
* **Four minor issues are returned (§5); none needs the owner.**
  * VHM2-01 (model): the new `BuildingSlot.unhoused` is neither given an edit kind nor declared derived (§2.8's registry
    rule), and §2.8's registry paragraph does not list it for §13.2's path test.
  * VHM2-02 (model): the round-2 filter does not make "the room less a bay or stack" a ring the transient arena accepts,
    while F-PLAN aborts on a refused composer's room as a composer's bug.
  * VHM2-03 (model): the new `Building.dwelling` clearing clause lists the moves that take the live-in household out but
    not a `relet` or its leaving at an epoch.
  * VHM2-04 (kernel): §3.4's two fixed-ring lists and J-A28.33's index row and Part A entry, which the program keeps
    aligned with §2.6, still pass "the composer's rooms" whole beside the bay and the stacks.

  Each required change quotes an old string that occurs once in its file; all eight applied together to scratch copies
  add no broken reference and, after one rewording, no document-check hit (§6).

## 1 The closing report's model fixes

Probe: `vm2/probes.py` part (1), reading `handfix.py`'s rows; whitespace-normalised counts in the four states A
(pre-handfix), B (pre-r1), C (pre-r2), D (live).

| # | sub | verdict | evidence (live) |
|---|---|---|---|
| 5 | (i) | PRESENT | §2.6 l. 1489: "the last in address order passing over a locked or pinned one (§7.2), which keeps its building, by §4.7's overflow pass" (new 0/1/1/1; old 1/0/0/0) |
| 5 | (ii) | PRESENT | l. 1492: "No such change is refused for it, except a hand edit whose excess cannot be re-homed — its locked and pinned households alone above the new capacity, or a household of no dossier's roster …" |
| 5 | (iii) | PRESENT as amended (r1 VHM-06; r2 restated the row) | J-A28.23 index, l. 12820: "never by refusing the change, except a hand edit whose excess cannot be re-homed, which returns F-EDIT; the re-homing passes over locked and pinned households" |
| 5 | (iv) | PRESENT | Part A l. 357: "A locked or pinned household keeps its building and the re-homing passes over it; a hand edit whose excess cannot be placed is refused …" |
| 6 (ii) with 7 (3) | — | PRESENT | §5.2 F-EDIT, l. 5644: "a heights edit that would leave a base wing spanning a passage below two floors (§2.5 `Passage.headroomCm`; item 30);" |
| 7 | (1) | PRESENT as amended (r1 VHM-01 (1)) | §2.5 l. 877: "the passage's clear height — … as the least ground-storey height (eaveCm ÷ floors, rounded down to the centimetre) over the base wings that span it … S11 gives every spanning wing at least two floors" |
| 7 | (2) | PRESENT as amended (r1 VHM-01 (2), VHM-02) | §7.1 l. 6550: "`Passage.headroomCm` and `Passage.frontBuilding` are derived — … — and have no edit kind of their own;" |
| 7 | (4) | PRESENT as amended (r1 VHM-01 (3)) | T30-4, l. 10419: "every passage with a `frontBuilding` has its `headroomCm` written and equal to §2.5's rule, after a heights edit of a spanning wing too, …" |
| 7 | (5), (6) | PRESENT | J-A30.25: index l. 12980, Part A l. 517, once each |
| 14 | (i) | PRESENT | l. 1473: "the union of the extents of the building's base wings (`Building.wings`, with their `spans`) that reach storey `s` … — never a composition's wings, stored or derived" |
| 14 | (ii) | PRESENT | l. 987: "read on the base wing by the capacity (below), §8.5's span mark (also §8.4's span caster) and the 3-D export (§11.1), and on the base or the composed wing by the plan rung" |
| 14 | (iii) | PRESENT | l. 1258: "A composition's wings — generated or stored, and after every composition edit — reach every storey its base wings reach, with at least their area at each storey" |
| 14 | (iv) | PRESENT | l. 1280: "and only with compositions that keep that storey rule" |
| 14 | (v) | PRESENT | J-A28.28 Part A, l. 492: "The capacity reads the base wings only, and every composition keeps at least their area at each storey they reach" |
| 15 | (1) | PRESENT as replaced (r1 VHM-04 with VKH-01) | l. 1266: "The composed towers — each a round wing to the plan rung (`Composition.towers`) — join the clip order at every storey they reach"; l. 1268: "Every composer's room (`Composition.rooms`), a tower's round room included, lies inside one seed piece at its storey" |
| 15 | (2) | PRESENT as replaced (r1), row restated by r2 | J-A28.26 index, l. 12823: "the composed towers before all the wings in `Composition.towers` order, but a tower wholly inside a wing that overlaps no wing taken before that container directly after it" |
| 15 | (3) | PRESENT | J-A28.26 Part A, l. 360: "A composed tower stands in the clip order before every wing it engages, …" (kept as history; the r1 and r2 sentences follow it) |
| 16 | — | PRESENT as amended (r2 VHM1-02) | l. 1404: "and a walk-out basement's outside door, where step 3 opens one (`external`), the root of the basement's storeys;" |
| 18 | (i) | PRESENT | §10.2 l. 8994: "basementAccess: 'core'\|'trapdoor' /* … — never external, which only a walk-out's fall derives; …" |
| 18 | (ii) | PRESENT | l. 1383: "among those at least two of step 4's wing-local modules long (a door's width), … — where no side is that long, the basement is joined by the `trapdoor` fallback above, reported —;" |
| 18 | (iii) | PRESENT | J-A29.25 Part A, l. 508: "A programme row names a stair core or a trapdoor only, …" |
| 19 | — | PRESENT | l. 1512–1513: "Re-uniting the households removes what the subdivision added — exactly for an unstored plan, … its undo restores it exactly (§7.4)." |

The closing rulings behind these texts hold on the live text: §3.2 (locked and pinned passed over; S11's operator and an
epoch leave such a building unchanged; §4.7's clamp keeps them, l. 4681), §3.3 (the base wings only; the storey rule on
every composition) and §3.4's model items (the narrowed column; the tower order as J-A28.26's amendment; J-A30.25 with its
§7.1 registration and T30-4 clause).

## 2 Repair round 1's model fixes (VHM-01 … VHM-07, VKH-01, VKH-02, VPH-04, VSH-03, H1, H2, J-A30.26)

Probe: `vm2/probes.py` part (2), verify-model-r1's 24 probes and 9 retired texts re-run on the four states. All 24 texts
occur once in C and in D. Three occur 0 times in D only because round 2 restated their rows and the probe ended at the
old row end; their bodies occur once in D (part (2b)): the J-A28.26 index row, the J-A28.26 Part A anchor and VHM-06's
J-A28.23 clause. The nine retired texts occur 0 times in C and D. Round 2 changed none of these texts outside the model
seat's recorded edits (§4).

| issue | where (live) | verdict |
|---|---|---|
| VHM-01 (1)–(3) | §2.5 `Passage.headroomCm` l. 877; §7.1 l. 6550; T30-4 l. 10419 | PRESENT |
| VHM-02 (1)–(3) | §2.6 `BaseWing.spans` l. 959; §2.5 `frontBuilding` l. 876; §7.1 buildings row l. 6591 | PRESENT |
| H1, H2 | §7.3 item 1 l. 6696; T8-3 l. 10286 | PRESENT |
| VHM-03 = VKH-02 | step 4 l. 1388 | PRESENT |
| VHM-04 with VKH-01 | contract l. 1266, l. 1268; J-A28.26 index and Part A | PRESENT |
| VHM-05, VHM-06, VSH-03 | J-A29.25, J-A28.23, J-A28.28 index rows | PRESENT |
| VPH-04 (1), (2) | `households` comment l. 965; capacity bullet l. 1481 | PRESENT |
| VHM-07 (1), (2) | T28-3 l. 10374; T28-2 l. 10371 | PRESENT |
| J-A30.26 | index l. 12981; Part A l. 518 | PRESENT |

## 3 Repair round 2's model fixes, and the §2.5 hand-off

Probe: `vm2/probes.py` part (3). Each new text occurs 0 times in A, B and C and once in D; each retired text occurs 0
times in D.

| issue | where (live) | verdict | evidence |
|---|---|---|---|
| VHM1-01 | §2.6 `Basement.access` l. 1019 | PRESENT, the verifier's text | "a trapdoor, or an outside stair (step 3's reported trapdoor core where no side of `Basement.ring` is long enough for its door); derived with the basement" |
| VHM1-02 | step 5 l. 1404 | PRESENT, the verifier's text | "and a walk-out basement's outside door, where step 3 opens one (`external`), the root of the basement's storeys;" |
| VHM1-03 | contract l. 1267; step 3 l. 1374; step 4 l. 1390; step 6 l. 1411; re-cut l. 1506; `Composition.rooms` l. 983; J-A28.26 index l. 12823 and Part A l. 360 | PRESENT, widened as the Fable seat recorded (any stair bay or chimney stack inside a composer's room) | "A stair core's bay or a chimney stack that step 3 places inside a composer's room … stands against that room's wall, meeting its sides along one run and nowhere else, or fills the room (a stair turret); … the plan rung passes the room less it" — see VHM2-02 and VHM2-04 |
| VPH1-02 (1) | l. 1480 | PRESENT, with the Fable seat's recorded clause | "A building S11 builds for a slot without `houses` (§10.2, §4.7) has capacity 0 — the slot's typing, like the template row, a fact of what the shell was built as, never of its occupants." |
| VPH1-02 (2) | l. 1487 | PRESENT, the verifier's text | "(the designation template's `households.max` or a structure's `houses` cell, the class's `liveIn`, the `circulation` share or" |
| VPH1-02 (3) | J-A28.23 Part A l. 357 | PRESENT, the verifier's text | "A building built for a slot without `houses` has capacity 0, over a shell-only capacity that such a building never uses, …" |
| VPH1-02, index | J-A28.23 l. 12820 | PRESENT | "a building built for a slot without `houses` has capacity 0, so a change that leaves a building no residential slot re-homes its households" |
| `Building.dwelling` (Fable decision 2) | l. 965 | PRESENT | "— one of its households; cleared by the event that moves that household out of the building (…) and by one that leaves the building no live-in use, …" — see VHM2-03 |
| P1 (pipeline VPH1-01's hand-off) | §2.5 `BuildingSlot` l. 879 | PRESENT once, inside §2.5 | "unhoused?: true /* item 28 (f): present only on a residential slot of a workplace's or an institution's plot — … every reader of a slot's houses (§4.7 S11, §2.6's capacity, §13.2 T19-4) reads it as one without; …" — see VHM2-01 |

## 4 Sweeps

**What was read.** §2.5 and §2.6 whole in the live text (l. 826–1534); §2.8's registry paragraph; §3.4's
`transientArena` contract, seed clip and re-cut paragraphs (l. 2608–2695); §4.7's *Live-in* bullet and *Households per
building*; §4.11's `relet` and the epoch's order; §5.2's F-SITING, F-PLAN and F-EDIT rows; §5.3's rows; §7.1's passage
sentence and buildings row; §7.3 item 1; §8.2's passage-arch row and the other readers of `headroomCm` (§8.4, §8.5 (2),
§11.1); §10.2's `houses`, `liveIn` and `basementAccess`; §10.3's *Uses that move*; §13.2's T8-3, T19-4, T28-2 – T28-18,
T29-4 and T30-4; the model's index rows (J-A28.21 – J-A28.29, J-A29.2x, J-A30.25, J-A30.26) and their Part A entries,
with J-A28.33's; item 20 of `docs/AMENDMENTS-2026-09-25b.md`.

* **No other text changed.** CONFIRMED. The word diff pre-r2 → live (`vm2/wd-CD-model.txt`) shows 1 hunk in §2.5 (P1)
  and 11 in §2.6, each a model-seat substitution; the live §2.6 equals the block file's body line for line, and the
  J-A28.23 and J-A28.26 index rows and Part A entries equal its rows. The other 10 document hunks (§3.4, §4.7, §5.2,
  §7.4, §8.2, §10.2, three in §13.2 and the J-A28.46 row) and 3 rationale lines (J-A20.74, J-A28.34, J-A28.46) are the
  sibling seats' intended texts (`vm2/wd-CD-others.txt`); none rewrites a model text. Round 1's changes were confirmed
  the same way by verify-model-r1.
* **Single source.** The widened VHM1-03 rule is stated once, in the stage-3 contract, with pointers from steps 3, 4 and
  6, the re-cut bullet and `Composition.rooms`; T28-4 states its bar. Four mirrors of §2.6's fixed-ring list outside the
  model part were not aligned (VHM2-04). The capacity-0 rule is stated once, in the capacity bullet; §2.5's `unhoused`,
  §4.7, §10.2 and T19-4 point to it.
* **Lifecycle of `BuildingSlot.unhoused` (new).** Create: §4.7's generation fill. Read: §4.7 S11, §2.6's capacity, T19-4.
  Persist: with the slot. Regenerate: every run of the fill rewrites it. Undo: the designation mutator's undo restores it.
  Migrate: absent reads as not unhoused, which is what every older document means. Registry: missing (VHM2-01).
* **Lifecycle of `Building.dwelling` (round 2 gave it writers).** Create: S10b's live-in siting (§4.7). Read: §4.7,
  §10.2's `houses` comment, §10.3, J-A28.29. Clear: the events the comment lists. Undo: §7.4's Application paragraph
  restores the replaced building record. Two paths that take the live-in household out are not in the list (VHM2-03).
* **References.** `refs.py` on the live document: 139 headings, 35 D ids, 472 J ids, 2 broken — `os-geometry.md` §2.1.4
  (l. 2709) and RFC 7946 §3.1.6 (l. 9196), both pre-existing citations of outside documents. Every pointer the round-2
  texts add resolves (§10.3, §7.6, §3.4's `transientArena`, §10.2, §4.7, T19-4, step 3, step 4, the stage-3 contract).
* **Deferral wording.** 0 hits in §2.5, §2.6, the 18 model index rows and their 18 Part A entries (TBD, to be decided /
  determined, open question, deferred to, decide later, later pass / round, TODO, FIXME, left open, revisit, defer, for
  now, placeholder).
* **Owner rules.** Item 20 holds: the capacity-0 rule re-homes households (a dossier roster's household by §4.7's
  re-provision, which always places; F-SITING's ladder cell keeps its "never a household of a dossier's roster"), the
  `unhoused` typing keeps the workplace or institution and its use standing, and a tier-6 omission of a stack or a stair
  bay's upper storeys drops no dossier element and no household. The widened VHM1-03 ruling follows the realism
  tiebreaker (a spiral against its tower's wall or a stair turret) and contradicts no owner text.
* **Considered and ruled not defects.**
  * Step 6's "`radialSplit` for two" beside a fixed round room is pre-existing (archive A) and consistent: it applies where
    the rooms rung emitted no round room, `Composition.rooms` being optional.
  * The canonical chain's "[1, capacity]" clamp beside capacity 0: a capacity-0 building houses none (§4.7's S11 write),
    so the clamp glosses concern housing shells — verify-pipeline-r1 ruled the same for VPH1-02.
  * J-A28.44's gloss of the capacity (l. 12897) names the formula's two terms for a housing shell and points to §2.6.
  * A hand `setAttr(basement)` that sets `external` on a cellar without a walk-out's fall is a user override of the
    derived decision (§7.1 l. 6548, §7.2), which step 3 honours; the closing ruling on V-MAB3-04 (a) concerns the table.
  * No bar names a composer's hall holding a stair bay or a stack: the B-PLAN bars catch a refused one through tier 6's
    flag and T28-4's tiling, as the round-2 seat argued; the tower case has T28-4's clause.

## 5 Issues

| id | owner | severity · kind | where | defect |
|---|---|---|---|---|
| VHM2-01 | model | minor · missing (registry) | §7.1 buildings row; §2.8 registry paragraph | the new `BuildingSlot.unhoused` has no edit kind and is not declared derived, and §13.2's path test does not reach it |
| VHM2-02 | model | minor · partial | §2.6 stage-3 contract (round 2's sentence) | the filter stands a bay or stack against a composer's room's wall along one run but does not keep the room less it a ring the arena accepts, while F-PLAN aborts on a refused composer's room as a composer's bug |
| VHM2-03 | model | minor · partial (lifecycle) | §2.6 `Building.dwelling` | the clearing clause omits a `relet` and the household's leaving at an epoch |
| VHM2-04 | kernel | minor · stale gloss (single source) | §3.4 `fixed` comment and re-cut paragraph; J-A28.33 index row and Part A | the fixed-ring lists aligned with §2.6 still name "the composer's rooms" whole beside the bay and stacks |

Every old string below occurs exactly once in its file, whitespace-normalised (a single space may match one soft line
break; `vm2/anchors.py`, `vm2/proposals.py`).

### VHM2-01 — `BuildingSlot.unhoused` is not registered (minor · model)

**Claim.** Pipeline round 2's hand-off P1 added `BuildingSlot.unhoused` to §2.5 (l. 879): written by every run of §4.7's
generation fill, cleared by the designation mutator. §2.8's registry paragraph (l. 1782–1795) requires that "every new
attribute has its edit kind or is declared derived (§7.1)", and §7.1's buildings row declares derived, among others,
"each slot's `frontage` (§2.5's `BuildingSlot`: …)". `unhoused` appears in neither (`grep -c unhoused`: §2.5, §4.7,
§10.2 and J-A28.46 only). §13.2's path test covers "every record and attribute §2.8's registry paragraph lists for
amendments b", so it does not reach `unhoused` either. The closing seat applied the same rule to `Passage.headroomCm`
(VR3-01 (2)). CONFIRMED on the text. The owner is the model part, as for VR3-01: the field is a §2.5 record's; pipeline
round 2 wrote it.

**Required change.** (1) §7.1, the buildings row: replace "§2.6) and each slot's `frontage` (§2.5's `BuildingSlot`: from
the designation template, re-derived by S11's mutator)" with "§2.6), each slot's `frontage` (§2.5's `BuildingSlot`: from
the designation template, re-derived by S11's mutator) and each slot's `unhoused` (§2.5's `BuildingSlot`: written by
every run of §4.7's generation fill, cleared by the designation mutator)". (2) §2.8, the registry paragraph: replace
"sub-records and its base wings' `spans` (§2.6), the plot's `builtBand`" with "sub-records and its base wings' `spans`
(§2.6), a site-plan slot's `unhoused` (§2.5), the plot's `builtBand`".

### VHM2-02 — "the room less it" is not guaranteed to be a ring the arena accepts (minor · model)

**Claim.** Round 2's contract sentence (l. 1267) has step 3 filter its candidates to those that "stay out of every
composer's room or stand in one so" — against the room's wall along one run — and the plan rung then passes "the room
less it" as a fixed ring. That ring is made by the plan rung, and whether §3.4's `transientArena` accepts it depends on
where the bay or stack stands: its end on the room's wall within `minEdge` of the room's corner leaves the ring an edge
shorter than `minEdge`, and two bays in one room that abut and together reach from wall to wall split the room in two (a
bay just outside a room, within the clearance of a room vertex, is refused the same way; that case predates round 2 and
the same clause closes it). §3.4 refuses such an input ring (`E_DEGENERATE`, detail
`fixed`, "naming the vertex"), and when the named vertex is the room's, §5.2's F-PLAN tier 2 treats "a composer's room"
as "the shell §2.6's composition contract guarantees, so its refusal is a bug that aborts the rung", which l. 1268 repeats
("F-PLAN's abort on a refused composer's room (§5.2) marks a composer's bug"). The repair seat's report said this
classification "stays true"; it does not for a ring the plan rung cut. The text gap is CONFIRMED; how often a placement
lands there is PLAUSIBLE. The fix keeps F-PLAN unchanged by making the filter guarantee the ring, which step 3 can test
exactly before the arena opens.

**Required change.** §2.6, the stage-3 contract: replace "step 3 filters its candidates to those that stay out of every
composer's room or stand in one so." with "step 3 filters its candidates to those that stay out of every composer's room
or stand in one so, and that leave each composer's room, less every bay and stack it holds, in one piece the transient
arena accepts beside them (§3.4: `minEdge`, clearance, simplicity)."

### VHM2-03 — the `dwelling` clearing clause misses two exits (minor · model)

**Claim.** Round 2 made `Building.dwelling` "one of its households" and "cleared by the event that moves that household
out of the building (§10.3's relocation: a use's move, §4.7's overflow pass, the capacity re-homing below)" (l. 965). Two
events take the live-in household out and are not in that list: a `relet` (§4.11: "the household count the roster
fills"; §10.3 names "a household re-homed by item 31's re-letting" as the same path), and the household's leaving at an
epoch (§4.11's order, step (c): "the roster's suffix leaves in reverse ordinal order — a building whose household count
falls but not to zero takes a `relet` down … and `vacate` fires only when its last household leaves"). No §5.3 row checks
`dwelling`, so the clause is its only statement. Read as the list of clearing events, it leaves `dwelling` naming a
household no longer in the building on those paths — the write-survives-one-path gap the round-2 Fable decision 2 set out
to close ("cleared both when the live-in household leaves the building and …"). CONFIRMED on the text.

**Required change.** §2.6, `Building.dwelling`: replace "cleared by the event that moves that household out of the
building (§10.3's relocation: a use's move, §4.7's overflow pass, the capacity re-homing below)" with "cleared by every
event that takes that household out of the building — its relocation (§10.3: a use's move, a `relet`, §4.7's overflow
pass, the capacity re-homing below) or its leaving at an epoch (the epoch's step (c), §4.11)".

### VHM2-04 — the fixed-ring lists outside §2.6 still pass the composer's rooms whole (minor · kernel)

**Claim.** Round 2 changed §2.6's fixed-ring lists to "the composer's rooms, each less a bay or stack it holds (the
stage-3 contract)" (step 4, l. 1390; the re-cut bullet, l. 1506; `Composition.rooms`, l. 983). Four mirrors of that list
were not aligned:

* §3.4's `fixed` comment (l. 2612): "a stair core's bay, a hearth's chimney stack, …, a composer's room (a hall, a
  tower's round room: §2.6's `Composition.rooms`)";
* §3.4's re-cut paragraph (l. 2680–2681): "the rings §2.6's re-cut rule fixes (the stair core's bay, the chimney stacks,
  the passage room, the composer's rooms and the rooms the ladder keeps)";
* J-A28.33's index row (l. 12816): "(the stair bay, the chimney stacks, the passage room, the composer's rooms and the
  kept rooms)";
* J-A28.33's Part A entry (l. 353): "(the stair core's bay, the chimney stacks, the passage room, the composer's rooms
  and the rooms the interior ladder keeps)", which records that the list was "aligned with §2.6 by repair-kernel-r3".

Read as written, each passes a hall and the stack inside it (or a round room and its spiral's bay) as two overlapping
fixed rings — the configuration VHM1-03 found §3.4 refuses. This is the stale-gloss class of VHM1-01 and VHM1-04.
CONFIRMED on the text.

**Required change.** (1) §3.4, `transientArena`'s `fixed` comment: replace "a composer's room (a hall, a tower's round
room: §2.6's `Composition.rooms`)" with "a composer's room (a hall, a tower's round room: §2.6's `Composition.rooms`)
less any stair bay or chimney stack standing in it (§2.6's stage-3 contract)". (2) §3.4, the re-cut paragraph: replace
"the passage room, the composer's rooms and the rooms the ladder keeps)" with "the passage room, the composer's rooms,
each less a bay or stack it holds, and the rooms the ladder keeps)". (3) J-A28.33's index row: replace "the passage room,
the composer's rooms and the kept rooms)" with "the passage room, the composer's rooms, each less a bay or stack it
holds, and the kept rooms)". (4) J-A28.33's Part A entry (a restated-row swap): replace "the passage room, the composer's
rooms and the rooms the interior ladder keeps)" with "the passage room, the composer's rooms, each less a bay or stack it
holds, and the rooms the interior ladder keeps)".

## 6 Document checks and references

`python3 docs/validation/bench/doc_checks.py --sections "2,3,7,Judgment calls"` (the top-level keys this lane's required
changes touch: §2.6, §2.8, §3.4, §7.1 and J-A28.33's index row), and the rationale whole with `--heads` its matching
document, all against one corpus snapshot (9 626 JSON files, 911 940 C3 3-grams, 478 C4 lists; the same 994
unreadable-JSON warnings in every run). This lane writes no design text, so "mine" and "combined" are one copy: the live
files with all eight required changes of §5 applied (`vm2/proposals.py` → `doc-mine.md` `a88449bc…`, `rat-mine.md`
`d2371a96…`).

| run | copy | allow file | C1 | C2 | C3 | C4 | S1 | S2 | unreviewed | exit |
|---|---|---|---|---|---|---|---|---|---|---|
| untouched, run 1 (20:00) | live `357c02f2…` | default | 5 | 0 | 604 | 3 | 0 | 0 | 0 | 0 |
| mine = combined, first wording | live + §5 | default | 5 | 0 | 604 | 4 | 0 | 0 | 1 | (1) |
| untouched | live | empty | 5 | 0 | 604 | 3 | 0 | 0 | 612 | 1 |
| mine, first wording | live + §5 | empty | 5 | 0 | 604 | 4 | 0 | 0 | 613 | 1 |
| **mine = combined, final wording** | **live + §5** | **default** | **5** | **0** | **604** | **3** | **0** | **0** | **0** | **0** |
| mine, final wording | live + §5 | empty | 5 | 0 | 604 | 3 | 0 | 0 | 612 | 1 |
| untouched, run 2 (after the others) | live | default | 5 | 0 | 604 | 3 | 0 | 0 | 0 | 0 |
| rationale whole, untouched | live rationale `9575f26c…` | default | 0 | 0 | 403 | 6 | 0 | 17 | 278 | 1 |
| rationale whole, mine | + VHM2-04 (4) | default | 0 | 0 | 403 | 6 | 0 | 17 | 278 | 1 |

* The two untouched runs are identical (`cmp`), so the corpus held still.
* The first wording of VHM2-02 added one C4 hit, "hall ring stair tower wall" on l. 1267: its word "ring" made a fifth
  member of one captured list on a line that already holds four (the round-2 seat met the same list and moved its
  sentence to a line of its own). The clause was reworded to "in one piece" (§5 gives the final text). With the final
  wording the empty-allow hit lists of untouched and mine agree hit for hit — 612 each, 0 added, 0 removed, compared by
  (check, text) with line numbers normalised (`vm2/dcdiff.py`) — and the default-allow run exits 0. No allow row is
  needed.
* The rationale's standing set (278 unreviewed, exit 1) predates this pass and gates no seat; the copy with VHM2-04 (4)
  has the same 278 hits (0 added, 0 removed).
* The mine copy's first-wording exit was not recorded (its batch shell was stopped to run the rest in parallel); the one
  unreviewed hit gives exit 1.
* **References** on the final copy: 139 headings, 35 D ids, 472 J ids, 2 broken — the same two pre-existing citations of
  outside documents (their lines one earlier, because VHM2-04 (2) joins a soft line break). Every pointer the eight
  changes add resolves (§2.5, §2.6, §2.8, §3.4, §4.7, §4.11, §7.1, §10.3).

## 7 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed or read in place): the hashes of the live files and the archives; the 23 closing sub-changes,
the round-1 repairs and the round-2 repairs present once, the retired texts gone (`vm2/probes.py`); the live §2.6 and the
restated rows equal to the model block file; the word diffs showing no other change; the references and deferral
probes; item 20 on the model texts; each issue's defect at its quoted text; every old string once.

**PLAUSIBLE** (reasoning, for the Fable review): how often VHM2-02's placements occur; that VHM2-02's filter leaves real
composers enough candidates (an exhausted order takes tier 6, flagged); the round-2 seat's widened VHM1-03 ruling and
its `dwelling` and capacity-0 clauses, which this lane judged sound apart from VHM2-02 and VHM2-03.
