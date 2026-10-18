# Verify SCOPE part — hand-fix round 2 (handfix-b/verify-scope-r2)

> PENDING FABLE REVIEW — Opus-produced (handfix-b/verify-scope-r2).

PROGRESS
- [x] 1 inputs read (closing §2/§3, apply.md, repair-r2-*.md via blocks.py, assemble-r2.md, verify-scope-r1, sibling verify-*-r2 issue sections) | done
- [x] 2 scope fix list built (closing #4 #13 #17 #20 #23 #29 #30 #31; others' #2(2) #5(iii) #7(4)(5) #15(2) #24(2) #25(6) #28; r1 carried; r2 VSR-01..03 + 3 index rows) | done
- [x] 3 each fix checked against live text: vs2/probes.py 46/46 OK; vs2/blocks.py every r2 block = live | done
- [x] 4 touched subsections: A2→L scope diff = the r2 blocks' 3 §13.2 lines + 3 index rows only; A0→L 15 §13 hunks + 9 index hunks + §0.2/§16/Staged all attributed (vs2/scopeparts.py, wdiff.py) | done
- [x] 5 single source / refs (2 pre-existing) / T-ids 89 all defined / deferral 0 / item 20 held; sibling scope issues VPH2-02, VDH2-02 read and confirmed; 3 own issues drafted (VSR2-01 turret fixture, VSR2-02 dwelling invariant, VSR2-03 §0.2 rows 20/28); vs2/propose.py mine + combined apply clean | done
- [x] 6 doc_checks three-copy, keys 0,5,13: untouched ×3 identical; mine and combined (both wordings) C1 5 · C3 119 · C4 3, exit 0; raw hits 127 = 127, 0 added 0 removed | done 21:16
- [x] 7 issues written: VSR2-01 scope, VSR2-02 determinism, VSR2-03 scope (all minor); sibling VPH2-02 and VDH2-02 confirmed, not re-filed | done
- [x] 8 queue row B-handfix-b/verify-scope-r2 appended (old prefix byte-identical); live hashes 357c02f2… / 9575f26c… re-checked unchanged; LANDED line written | done


Lane `handfix-b/verify-scope-r2`, 2026-09-27, opus verifier. Judged: `docs/ARCHITECTURE.md` sha256 `357c02f2…` (13 025
lines) and `docs/ARCHITECTURE-RATIONALE.md` `9575f26c…` (2 053 lines), as handfix-b/assemble-r2 installed them; both hashes
were re-checked at the end of the lane. Befores: A0 = `docs/archive/ARCHITECTURE-pre-handfix-b-2026-09-27.md` (`1a861c72…`,
before the hand fix), A1 = `…-pre-handfix-b-repair-r1-…` (`5d752c9b…`), A2 = `…-pre-handfix-b-repair-r2-…` (`e9c0b828…`),
with their rationale twins. The scope part is the title block, the one-page summary, §0, §1, §13–§17, *Delegated
decisions*, the *Judgment calls* index, *Staged by the owner's roadmap* and Appendix A (workflow 09's partition), with the
scope-owned Part A entries J-A16.01 and J-A28.01. This seat edited no design text.

## Outcome

* **Every fix in the scope part is PRESENT, once, at its place; none is PARTIAL, MISSING or MISAPPLIED.** That covers the
  closing report's eight scope fixes (#4, #13, #17, #20, #23, #29, #30, #31), the seven other-owner changes that land in
  scope sections (#2 (2), #5 (iii), #7 (4) and (5), #15 (2), #24 (2), #25 (6), #28), round 1's scope-section changes, and
  round 2's four: VSR-01 (1) and (2), VSR-02 and VSR-03 in §13.2, plus the three index rows round 2 restated (J-A28.23,
  J-A28.26 model; J-A28.46 pipeline). A probe of 46 texts found every required text once and every retired text 0 times
  (`vs2/probes.py`); every round-2 block equals the live text (`vs2/blocks.py`).
* **Round 2's four deviations from verify-scope-r1's literal texts are sound.** The repair seat widened T28-4 to the stair
  turret and the chimney stack, added ", bringing its capacity below its households," to the brush clause, split the
  dossier fixture in two (a use moved, two plots joined) with the brush among the edits, and quoted the contract's own
  phrase "those of". Each matches the live homes: §2.6 l. 1266–1267, §7.3 items 1 and 4, §7.4's setField row and
  Application bullet.
* **Nothing else changed.** From A2 to live, the scope part differs only in those three §13.2 lines and three index rows.
  §0, §1, §13.1, §13.3–§13.9, §14–§17, *Delegated decisions*, *Staged* and Appendix A are byte-identical, and J-A16.01 and
  J-A28.01 are unchanged. From A0 to live, every hunk in the scope part is one of the listed fixes: 15 in §13, 9 in the
  index plus the two appended rows, and one each in §0.2, *Staged* and §16's M2b, M3a and M4 rows.
* **Other checks pass.** References: 2 broken, the same two pre-existing citations of outside documents; all 89 cited
  T-ids are defined. Deferral wording: 0. Item 20 holds: no scope text lets an epoch, an edit or a solver rung remove a
  dossier element or a dossier-roster household.
* **Two sibling issues on scope text are confirmed and not re-filed:** verify-pipeline-r2 VPH2-02 (T19-4 has no bar for
  round 2's unhoused typing) and verify-determinism-r2 VDH2-02 (T18-1's locality is narrower than the oracle it names;
  T28-18 lacks the designation path that round 2's capacity-0 rule made central).
* **Three new minor issues, none needing the owner (§3):**
  * VSR2-01 (scope): no B-PLAN fixture reaches the stair-turret case that round 2 wrote into T28-4.
  * VSR2-02 (determinism): no invariant holds round 2's `Building.dwelling` rule, whose clearing list verify-model-r2
    VHM2-03 found two paths short.
  * VSR2-03 (scope): §0.2's rows 20 and 28 do not name the hand fix's re-provision of a dossier household's housing, its
    bars, or the `houses` flag and `BuildingSlot.unhoused`.
* **Document checks:** my changes add no hit (§5).

## 1 The fixes, one by one (live line numbers)

| fix | owner | where | verdict | evidence (live text) |
|---|---|---|---|---|
| #4 VS3-04 | scope | §13.2 T19-4 l. 10333; §16 l. 11360–11361 | PRESENT (as amended by round 1's VPH-05 (1)) | "on a dossier fixture whose squalid district's shells hold fewer households than their template rows, every household of the dossier's roster is housed — …"; "T19-4 but its dossier clause"; "T19-4's dossier clause, T22-1" |
| #13 VS3-05 (1)–(5) | scope | T28-18 l. 10405–10407; §13.8 l. 10868; §16 l. 11361; J-A28.01 (rat. l. 474) | PRESENT (T28-18 extended by round 2) | "on a B-EDIT fixture a `setAttr` of a tenement's heights, … returns F-EDIT"; "T28-18's `relet` and re-homing clauses from M3a"; "every edit that lowers a capacity re-homing its excess by §4.7's overflow pass inside the edit (§2.6)" |
| #17 VS3-07 | scope | T28-2 l. 10371 | PRESENT (as round 1's VHM-07 (2)) | "and, for a basement whose `Basement.access` is `external`, at its outside door where step 3 opens one (§2.6 step 3) —" |
| #20 VS3-08 | scope | T28-15 l. 10400 | PRESENT | "exactly for an unstored plan (§2.6's canonical chain); for a stored plan, every household's unit with its own door, …" |
| #23 VS3-03 | scope | T11-1 l. 10300 | PRESENT (superseded by round 1's VSH-01) | "each underground block's `Frontage` that spans an end split there (each part beyond an end a new record …)" |
| #29 VS3-01 | scope | §0.2 l. 151; §16 l. 11363; *Staged* l. 13000 | PRESENT | "*Dossier content across epochs* (J-A20.75, J-A20.43) in §4.11"; "and the relocation of a dossier-backed use inside an epoch"; "*Dossier content across epochs* (J-A20.43) and the folding" |
| #30 VS3-02 | scope | J-A16.01 (rat. l. 466) | PRESENT (extended by round 1's VSH-02) | "Repair round 3 (2026-09-27) moved §2.6's household capacity, … (verify-scope-r3 VS3-02; closing)." |
| #31 VS3-06 | scope | §13.1 l. 10084 | PRESENT (extended by round 1's VKH-03) | "and a refusal — detail `overlap` — exactly where that result has a hole" |
| #2 (2), #5 (iii), #15 (2) | pipeline, model, model | index J-A28.46 l. 12976, J-A28.23 l. 12820, J-A28.26 l. 12823 | PRESENT in substance (rows restated by rounds 1 and 2) | "never a household of a dossier's roster, whose housing S10b's `dossier` request re-provides inside the district"; "except a hand edit whose excess cannot be re-homed, which returns F-EDIT; the re-homing passes over locked and pinned households"; "the composed towers before all the wings …" |
| #7 (4), (5) | model | T30-4 l. 10419; J-A30.25 l. 12980 | PRESENT (T30-4 extended by round 1's VHM-01 (3)) | "every passage with a `frontBuilding` has its `headroomCm` written and equal to §2.5's rule, …"; the J-A30.25 row verbatim |
| #24 (2), #25 (6), #28 | determinism, determinism, kernel | index J-A20.75 l. 12943, J-A22.76 l. 12970, J-A28.33 l. 12816 | PRESENT | "— §4.11 relocates it first or keeps it in its building (J-A20.43) —"; "the epoch that carries them is none either"; "with the rings §2.6's re-cut rule passes as `fixed` rings" |
| round 1 (VKH-03, H2, VSH-01, VPH-05 (1), VDH-02, VSH-04, VSH-05, VHM-07 (1)–(2), VHM-01 (3), VSH-02; 7 restated rows, J-A30.26) | scope and others | §13.1, §13.2, index, J-A16.01 | PRESENT, unchanged by round 2 (A2 = live outside round 2's six lines) | verify-scope-r1 §1 quotes each; the A2 → live diff touches none of them |
| round 2 VSR-01 (1) | scope | fixture list l. 10367 | PRESENT, the verifier's text verbatim | "a rectangle holding a round tower wholly inside it, a rectangle carrying two round towers whose rings overlap, a T of two overlapping wings whose second wing holds a round tower that also overlaps the first" |
| round 2 VSR-01 (2) | scope | T28-4 l. 10378 | PRESENT, widened (repair JUDGMENT 1; sound) | "each composed tower's round room at each storey the tower reaches — with any spiral core's bay (`StairCore.tower`) or chimney stack standing in it, or that bay alone where it fills the room (a stair turret) — covers exactly the tower's ring there less those of the earlier towers in the clip order that the tower overlaps (§2.6's stage-3 contract)" |
| round 2 VSR-02 | scope | T28-18 l. 10407 | PRESENT, plus one clause (repair JUDGMENT 2; sound) | "a prosperity-brush stroke that lowers the tenement's plot `builtBand`, bringing its capacity below its households, re-homes its excess the same way, and the stroke's undo returns every household to its former building byte-identically (§7.4's setField row);" |
| round 2 VSR-03 | scope | T28-18 l. 10407 | PRESENT, two fixtures (repair JUDGMENT 3; sound) | "on B-EDIT dossier fixtures … — one whose re-provision moves a use, one whose re-provision joins two plots — each of these edits, the brush stroke among them, commits, … and its undo restoring those plots and every household byte-identically (§7.4; §2.6's capacity rule; the re-homing clause)." |
| round 2 index rows | model, model, pipeline | J-A28.23 l. 12820, J-A28.26 l. 12823, J-A28.46 l. 12976 | PRESENT, each equal to its block row, the older row gone | "a building built for a slot without `houses` has capacity 0 …"; "a stair bay or chimney stack inside a composer's room stands against its wall, the room passed less it …"; "a workplace's or an institution's main or required residential slot it cannot fill kept and built without `houses` …" |

Retired texts, each 0 times in live: the verifier's literal T28-4 sentence ("covers its ring less those of the earlier
towers" with "with the bay of a spiral core it holds"), the stand-in's "less the rings of the earlier towers", "returns
F-EDIT (§2.6's capacity rule; the re-homing clause).", and every closing-report retired string of the scope part.

## 2 Checks over the touched subsections and those that cite them

**Read whole on the live text:** §13.2 (l. 10123–10446), §13.8, §16 (every row, the effort table and its pricing rule),
§0.2, *Staged*, the index rows changed since A0; and the homes the round-2 texts cite: §2.5 `BuildingSlot`, §2.6's
records (l. 943–1037), stage-3 contract (l. 1248–1280), steps 3–6 and the capacity, re-cut and *Never omit* bullets
(l. 1360–1533), §4.7's *Live-in* bullet and *Households per building* (l. 4497, 4674–4694), §5.3, §7.2's field brushes,
§7.3 items 1 and 4, §7.4's setField row and Application bullet, §7.7 items 1–6.

* **No other text changed.** A2 → live in the scope part: the three §13.2 lines and three index rows above (word diffs
  `vs2/wd-A2L-13.txt`, `wd-A2L-J.txt`); the round-2 §13.2 block equals live §13.2 line for line. A0 → live: every hunk
  attributed (`wd-A0L-*.txt`). Index 472 rows, 472 distinct ids, same order as A2; Part A 472 entries, no duplicate.
* **Single source.** The new bars assert what their homes state and point to them (§2.6's stage-3 contract, §7.4's
  setField row, §4.7, §7.3 items 1 and 4, §7.4); none states a mechanism of its own. The restated index rows compress
  §2.6 l. 1267, l. 1480 and §4.7 l. 4680 without contradicting them.
* **Milestones.** T28-4's clause runs from stage 3's intake (§13.8: "the rest of T28 from stage 3's intake"; *Staged*'s
  stage-3 row lists T28-1 – T28-8). The brush clause and the dossier fixtures sit inside T28-18's re-homing clause, which
  §13.8 and §16's M3a exit gate at M3a; the brush exists from M2b and the `dossier` request and re-provision from M3a
  (§16 M3a content).
* **Pricing.** Round 2 adds no component: the unhoused typing refines M2b's generation fill, the capacity-0 re-homing and
  the dossier re-provision's undo refine M3a's edit paths, and the bay-and-stack filter belongs to the staged plan rung.
  J-A16.01's absorption record stands.
* **References.** `refs.py` on live: 139 headings, 35 D ids, 472 J ids, 2 broken (`os-geometry.md` §2.1.4 at l. 2709,
  RFC 7946 §3.1.6 at l. 9196, both pre-existing outside citations). Every cited T-id (89) has its defining "(Tn-m)".
  The three T-ids that also appear in parentheses elsewhere (T12-1, T23-1, T25-1) are citations, as in A0.
* **Deferral wording.** 0 in the round-2 texts (the one probe hit on their lines, "every later shell change" in the
  J-A28.46 row, is A0's wording and temporal); over the whole scope part the probe counts are identical in A2 and live (49).
* **Item 20.** VSR-03's fixtures house every dossier household by re-provision and refuse nothing on a dossier map;
  T28-18's refusal is for "a household of no dossier's roster"; the restated J-A28.46 row keeps "never a household of a
  dossier's roster"; J-A28.23's capacity-0 row re-homes rather than drops. Held.
* **Sibling issues on scope text (confirmed on the live text; not re-filed):**
  * **VPH2-02** (pipeline verifier, owner scope): round 2's rule (§4.7 l. 4680) that keeps an unfillable main or required
    residential slot on a workplace's or institution's plot, built without `houses` with `BuildingSlot.unhoused` set, has
    no bar; T19-4's "every building S11 builds for a slot without `houses` (§10.2) houses none" holds vacuously when no
    workplace lacks its household. Valid; its two substitutions apply cleanly beside mine.
  * **VDH2-02** (determinism verifier, owner scope): (1) T18-1's "leaves everything beyond the plot and its joined
    neighbour untouched (the locality oracle)" fails a correct engine whenever a designation mutation re-homes
    households (§2.6's capacity rule lists S11's operator; §7.3 item 1 holds the receivers and a displaced use's new
    site), which T18-1's B-CITY-lite runs will meet; (2) T28-18 has no designation-path clause although round 2's
    capacity 0 makes a use change re-home every household. Valid; apply (2) with VDH2-01, whose §7.4 sentence it cites.

## 3 Issues

| id | owner | severity · kind | where | the defect in one line |
|---|---|---|---|---|
| VSR2-01 | scope | minor · missing fixture (amendments-b rule (2)) | §13.2 B-PLAN fixture list | no fixture reaches the stair-turret case round 2 wrote into T28-4 |
| VSR2-02 | determinism | minor · missing invariant (a write that can survive one path) | §5.3 | nothing checks round 2's rule that `Building.dwelling` is one of the building's households |
| VSR2-03 | scope | minor · partial (landing map) | §0.2 rows 20 and 28 | the hand fix's dossier-household re-provision, its bars, the `houses` flag and `BuildingSlot.unhoused` are not named |

Every old string below lies on one line and occurs exactly once in the live document (`vs2/propose2.py`, a single space
also allowed to match one soft line break, as the close seat's matcher does); each is given in a fence, verbatim; all six sub-changes applied together to a
scratch copy give each new text once, and so do they with the sibling verifiers' twelve document sub-changes applied on
top (no shared anchor; either order).

### VSR2-01 — scope · minor · missing fixture · item 28 (round 2's VHM1-03, the stair turret)

**Claim (CONFIRMED on the text).** Round 2's VHM1-03, as the model's Fable seat widened it, makes §2.6 say that a stair
core's bay inside a composer's room "stands against that room's wall … or fills the room (a stair turret)", and that "the
plan rung passes the room less it, and no room where it fills the room" (l. 1267). Round 2's VSR-01 (2) put that case
into T28-4: "or that bay alone where it fills the room (a stair turret)". The B-PLAN fixture list (l. 10366–10368) was
extended in the same round with three tower kinds so that T28-4 reaches the clip order's three branches (VSR-01 (1)), but
none of its towers is a stair turret: each is "a round tower" of unstated size. Whether any fixture takes the turret branch
is left to the composer. A plan rung that mishandles the branch — a sliver or an empty round-room ring passed beside a
bay that fills it, which §3.4 refuses and F-PLAN then aborts on as a composer's bug — passes CI whenever no fixture holds
a turret. This is the same defect class as round 1's VSR-01, which the repair seat accepted.

**Required change.** §13.2, the B-PLAN fixture list (l. 10367). Replace

```text
a T of two overlapping wings whose second wing holds a round tower that also overlaps the first,
```

with

```text
a T of two overlapping wings whose second wing holds a round tower that also overlaps the first, a rectangle carrying a stair turret (a round tower whose spiral core's bay fills its round room),
```

"24 fixture buildings" stays, because the parenthesis names kinds. The milestone is unchanged: T28-4 runs from stage 3's
intake (§13.8).

### VSR2-02 — determinism · minor · missing invariant · item 28 (f) (round 2's `Building.dwelling`)

**Claim (the missing check CONFIRMED on the text; that an engine following the text leaves a stale `dwelling` is shown
for two paths by verify-model-r2 VHM2-03, so the runtime fault is PLAUSIBLE).** Round 2 made `Building.dwelling` "one of
its households; cleared by the event that moves that household out of the building … and by one that leaves the building
no live-in use" (§2.6 l. 965). That is an invariant over every path that moves a household or changes a use: a use's move
(§10.3), `relet`, §4.7's overflow pass, §2.6's capacity re-homing, the households leaving at an epoch, a `liveIn` table
edit. verify-model-r2 VHM2-03 has already found two of those paths (`relet`, the epoch's leaving) missing from the
clearing list. Nothing checks the invariant. `dwelling` occurs 0 times in §5.3 and in §13.2. §5.3's reference-integrity
row only checks that a reference "names a live id", which a household moved to another building still does. The capacity
bound had the same gap and was given a §5.3 row by closing #8 (VD3-05); this is its twin.

The row below makes any such path — including one a later change adds — fail the invariant suite on B-CITY, B-EDIT and
the epoch tests, instead of leaving a pointer to a household the building no longer houses. It is stage-end, not
batch-local, because inside a district's derivation S11's clamp may leave the live-in household for the overflow pass,
which clears the pointer later in the same stage (§4.7). Per §5.3's preamble, an edit's dry run evaluates its stage-end
rows, so edits are covered.

**Required change.** §5.3 (determinism's section), a new row after the capacity row. Replace the capacity row's last cell (one line, once in the document)

```text
| the capacity function recomputed on the touched buildings against `Building.households` |
```

with these two lines (the same cell, then the new row):

```text
| the capacity function recomputed on the touched buildings against `Building.households` |
| a live-in dwelling stays among its building's households: a building's `Building.dwelling`, where present, names one of its `Building.households` and is present only while its use is a live-in class's (§2.6's `Building.dwelling`, §10.2's `liveIn`; J-A28.29), after every committed change | stage-end (S11 per district after the overflow pass; each `epoch` event; every edit, at its dry run) | the touched buildings' `dwelling` against their `households` and their use's `liveIn` |
```

The row has the table's three cells. Apply it with VHM2-03 (model), which completes the clearing list the row checks; the
row is right without VHM2-03 too, and would then flag the two paths VHM2-03 names.
No other text changes: §13.2's *Invariants* bullet runs the whole §5.3 suite on B-CITY, and B-EDIT and the 20-epoch test
run it on edits and epochs.

### VSR2-03 — scope · minor · partial (landing map) · items 20 and 28 (f)

**Claim (CONFIRMED on the text).** §0.2's rows for items 8–31 name "the home that states the mechanism first, then the
sections that carry a pointer, a hook field or one line of rule, then the tests (§13.2's `T⟨item⟩-⟨n⟩` fixtures)"
(l. 131–133). The same standard made amendments-b's VS2-01 add round 2's fields to rows 20 and 28, and the closing's
#29 re-glossed row 20. The hand fix then landed an item-20 ruling and two item-28 (f) fields that the rows do not name:
* **Row 20 (l. 151).** It does not name the hand fix's major ruling: a dossier roster's household is never taken off the
  map, and its housing is re-provided in its district by the `dossier` request (closing #2 and §3.1; §4.7 l. 4688,
  §5.2's F-SITING cell, §2.6's capacity rule; J-A20.72). Nor does it name that ruling's bars — T19-4's dossier clause
  (closing #4) and T28-18's dossier fixtures (round 2's VSR-03). Its tests stop at "T20-1 to T20-6".
* **Row 28 (l. 159).** It names "the template's `households`" (§10.2) and `Plot.fieldBand` (§2.5). It does not name the
  `houses` flag that types a residential slot (closing #1, §10.2), or `BuildingSlot.unhoused` (round 2's P1, §2.5), the
  generation fill's typing record.

**Required change.** §0.2, four substitutions (each old string one line, once in the document):

(1) Row 20. Replace

```text
the `dossier` and `positive` requests and the least-disruption order in §4.7 S10b,
```

with

```text
the `dossier` and `positive` requests and the least-disruption order in §4.7 S10b, a dossier household's housing re-provided in its district when no building there can hold it (§4.7, J-A20.72),
```

(2) Row 20. Replace

```text
tests T20-1 to T20-6;
```

with

```text
tests T20-1 to T20-6, T19-4's dossier clause and T28-18's dossier fixtures;
```

(3) Row 28. Replace

```text
`RoomProgramRow`, `RoomRuleRow.scope` and the template's `households` in §4.7 S11 and §10.2,
```

with

```text
`RoomProgramRow`, `RoomRuleRow.scope`, the template's `households` and a structure's `houses` flag in §4.7 S11 and §10.2,
```

(4) Row 28. Replace

```text
the occupants' band memory `Plot.fieldBand` in §2.5 (J-A28.29),
```

with

```text
the occupants' band memory `Plot.fieldBand` (J-A28.29) and the fill's typing record `BuildingSlot.unhoused`, both in §2.5,
```

## 4 Considered and ruled not defects

* **J-A28.26's index row, "a tower wholly inside a wing that overlaps no wing taken before that container directly after
  it"** (round 1's wording, unchanged by round 2). "That container" names the wing, so the relative clause belongs to the
  tower — as §2.6 l. 1266 states it ("a tower whose ring there lies wholly inside the extent of a wing and overlaps no wing
  taken before the first such wing"). It is an index compression with its pointer (§2.6).
* **§0.2 row 30 names neither `Passage.headroomCm` nor J-A30.25 and J-A30.26.** Row 30 cites 2 of item 30's 21 J-ids and
  never names the `Passage` record. The field predates the hand fix, which only gave it its derivation. Row 12's
  `headroomCm` is the tunnel's. This is the row's standing selectivity, not a hand-fix omission.
* **No clause for a `houses` or `liveIn` table edit that sets a capacity to 0.** That is the same mechanism as T28-18's
  `households.max` edit (a §7.6 edit lowering a capacity; undo by the editTable row), and T19-4 proves the capacity-0
  typing at generation. VDH2-02 (2) covers the designation path, whose undo is the one that differs.
* **No §13 bar for the drawing of an uncovered passage** (round 2's §8.2 row, and §2.6's "no span mark, span caster or
  arch glyph drawn over it"). verify-rendering-r2 VR2H-02 files that bar as a row of §8.3's draw-style census, where the
  passage census already lives; round 1's H2 (T8-3) keeps the model state. I concur with that home, so no §13.2 clause is
  needed beside it (its PLAUSIBLE item "rather than a clause in scope's T8-3" is answered: the census row is the bench
  that reads the render).
* **VHM1-03's hall case** (a stair or a stack inside a composer's hall). T28-4's tiling and simplicity, and F-PLAN's tier-6
  flags, catch a mishandled hall on the manor fixture; verify-model-r2 ruled the same. Only the turret branch leaves no
  room to test, hence VSR2-01.
* **T28-18's refusal clause no longer carries its own pointer.** The closing parenthesis "(§7.4; §2.6's capacity rule; the
  re-homing clause)" now ends the whole re-homing clause, dossier fixtures included, as verify-scope-r1's VSR-03 specified;
  §13.8 and §16 gate the clause by that label.
* **"Each of these edits" after VDH2-02 (2).** Read with or without the use `setAttr`, it holds: a tenement generated as
  filler is not dossier-backed, so its use change commits and re-provides as the other edits do (§7.7 item 2).
* **§0.2, the one-page summary and J-A16.01 for round 2's other changes.** None adds a field or a mechanism outside
  item 28 (f)'s existing landings beyond VSR2-03's two fields; the summary stays at its level of detail.

## 5 Document checks (three-copy method, one corpus snapshot)

`python3 docs/validation/bench/doc_checks.py --doc <copy> --sections "0,5,13"` — the top-level keys my required changes
touch (§0.2, §5.3, §13.2). Copies, all on the scratchpad (the design files were never written):
* **untouched** — the live document `357c02f2…`;
* **mine** — live plus VSR2-01 … VSR2-03 (six sub-changes, `vs2/propose2.py` → `doc-mine2.md`; the first wording of
  VSR2-03 (4), `doc-mine.md`, was reworded for clarity and re-run);
* **combined** — mine plus the sibling verifiers' twelve document sub-changes: VPH2-01 = VHM2-01 (applied once), VPH2-02,
  VDH2-01, VDH2-02, VHM2-02, VHM2-03 and VHM2-04 (1)–(3) (`doc-combined2.md`). VKH2-01 (1) is left out because it rewrites
  the same sentence as VHM2-02 (§6). verify-rendering-r2's VR2H-01 and VR2H-02 touch §8.3, §12.7 and the J-A28.83 row,
  outside these keys, so they cannot move these counts.

Every run read 9 626 JSON files, 911 940 C3 3-grams and 478 C4 lists (colour files 10 099 in each); the untouched copy
ran three times (with round 1 at 21:07, after it, and with round 2 at 21:12) and gave identical output, so the corpus held
still.

| run | copy | allow file | C1 | C2 | C3 | C4 | S1 | S2 | unreviewed | exit |
|---|---|---|---|---|---|---|---|---|---|---|
| untouched, runs 1–3 | live `357c02f2…` | default | 5 | 0 | 119 | 3 | 0 | 0 | 0 | 0 |
| **mine** (final wording) | `doc-mine2.md` | default | 5 | 0 | 119 | 3 | 0 | 0 | 0 | 0 |
| **combined** (final wording) | `doc-combined2.md` | default | 5 | 0 | 119 | 3 | 0 | 0 | 0 | 0 |
| mine, first wording | `doc-mine.md` | default | 5 | 0 | 119 | 3 | 0 | 0 | 0 | 0 |
| combined, first wording | `doc-combined.md` | default | 5 | 0 | 119 | 3 | 0 | 0 | 0 | 0 |
| untouched | live | empty | 5 | 0 | 119 | 3 | 0 | 0 | 127 | 1 (raw hits) |
| mine (both wordings) | as above | empty | 5 | 0 | 119 | 3 | 0 | 0 | 127 | 1 (raw hits) |
| combined (both wordings) | as above | empty | 5 | 0 | 119 | 3 | 0 | 0 | 127 | 1 (raw hits) |

Raw hits compared by (check, text) with the location dropped (`hitdiff.py`): mine against untouched, 0 added and 0
removed; combined against mine, 0 added and 0 removed. My changes need no allow row, and the rationale is not touched by
them. `refs.py` on mine and on combined: 139 headings, 35 D ids, 472 J ids, 2 broken (the same two), and the new §5.3
row has the table's three cells.

## 6 Notes for the close seat

* **Two sibling changes collide.** verify-model-r2 VHM2-02 (owner model) and verify-kernel-r2 VKH2-01 (1) (owner model)
  both replace the one §2.6 sentence "step 3 filters its candidates to those that stay out of every composer's room or
  stand in one so." Whichever is applied first removes the other's anchor. They say the same thing (the room less the bay
  or stack must pass §3.4's input tests); VKH2-01 adds the refusal-attribution clause. One reconciled sentence is needed;
  verify-rendering-r2 left the kernel hunk out for the same reason.
* **VHM2-01 and VPH2-01 are word-for-word the same:** apply once.
* **Pairings.** VDH2-02 (2) cites the §7.4 sentence VDH2-01 rewrites: apply both. VSR2-02's row checks the clearing list
  VHM2-03 completes: apply both. VPH2-02 and VDH2-02 in §13.2 and my three issues share no anchor with each other or with
  any sibling change; they apply in either order (checked on copies).
* **Nothing here needs the owner:** each change sits inside a ruling already taken (rule (2)'s bars, §0.2's landing
  standard, §5.3's invariant pattern), and none moves a milestone or an amount.

## 7 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed on disk in this lane):
* the live hashes `357c02f2…` / `9575f26c…` at the start and the end, and the three archives' hashes;
* every round-2 block equal to its live text (`blocks.py`), and the round-2 index rows once each, their old rows gone;
* 46 presence probes (required texts once, retired texts 0) across A0, A1, A2 and live (`probes.py`);
* the scope-part diffs A2 → live and A0 → live, every hunk attributed (`scopeparts.py`, `wdiff.py`);
* index and Part A counts (472 / 472, no duplicate, order unchanged);
* `refs.py` (2 broken, both pre-existing and external), every cited T-id defined, the deferral probe;
* `dwelling` 0 times in §5.3 and §13.2; every anchor of §3 once; all proposals applied together, alone and with the
  siblings', each new text once;
* the document-check counts and hit-set diffs of §5.

**PLAUSIBLE** (judgment, for the Fable review):
* the severities, and that VSR2-01 … VSR2-03 add no new defect once applied;
* that the repair seat's four deviations (T28-4 widened, the brush clause, two dossier fixtures, "those of") are the
  better text rather than merely equivalent;
* whether a composer would meet the turret branch by chance on the listed fixtures (VSR2-01 rests only on no fixture
  guaranteeing it, which is CONFIRMED on the text);
* that an engine following the clearing list leaves `dwelling` stale at runtime (VSR2-02 rests on VHM2-03's text reading);
* the reachability of VDH2-02's and VPH2-02's cases, which I confirmed on the text only.

## Files

* `docs/validation/amendments-b/handfix/verify-scope-r2.md` — this report.
* `docs/FABLE-REVIEW-QUEUE.md` — row B-handfix-b/verify-scope-r2.
* Scratch (session-local, `…/scratchpad/handfix/vs2/`): `secs.py`, `scopeparts.py`, `wdiff.py` with `wd-A2L-*.txt` and
  `wd-A0L-*.txt`; `blocks.py`; `probes.py` / `probes.out`; `propose.py`, `propose2.py` with `doc-mine*.md`,
  `doc-combined*.md`, `doc-siblings*.md`; `refs-*.json` / `.out`; `dc.sh`, `dc2.sh`, `dc*-*.txt`, `dcn*-*.txt`,
  `hitdiff.py`; the draft bodies `body1.md` … `body3.md`.
