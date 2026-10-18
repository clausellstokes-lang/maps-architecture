# handfix-b/verify-scope-r0 — the SCOPE part's hand fixes, verified

> PENDING FABLE REVIEW — Opus-produced (handfix-b/verify-scope-r0).

PROGRESS (kill-safe ledger; a seat that continues this lane reads it first)
ITEM inputs: planned closing-report §2 (all 31) and §3, handfix/apply.md, handfix.py rows, archive pre-handfix-b, the four sibling verify-*-r0 reports | done
ITEM presence: planned per-section check archive + required rows == live (collapsed) for §0.2, §13.1, §13.2, §13.8, §16, index, Staged; Part A J-A16.01, J-A28.01 | done (all EQUAL; two script artefacts explained)
ITEM read: planned the touched subsections whole and the text citing them | done
ITEM checks: planned single source, references, deferral probe, item 20, bars for every new mechanism, doc checks (three copies) | done
ITEM issues: planned exact required changes, old strings counted once, combined with the siblings' changes on one scratch copy | done (5 new: VSH-01..05; 7 sibling issues in this part's sections confirmed, not re-filed)
ITEM close-out: planned queue row, LANDED line | done

Lane `handfix-b/verify-scope-r0`, 2026-09-27, opus verifier. Judged: `docs/ARCHITECTURE.md` sha256 `5d752c9b…` and
`docs/ARCHITECTURE-RATIONALE.md` sha256 `61477508…` (the hashes handfix-b/apply wrote, unchanged through this lane),
against the read-only archive `docs/archive/ARCHITECTURE(-RATIONALE)-pre-handfix-b-2026-09-27.md` (`1a861c72…` /
`8a24a5a7…`). This seat edited no design text.

## Outcome

* **Every scope fix is PRESENT exactly as required, once, at its anchor; none is PARTIAL, MISSING or MISAPPLIED.** The
  eight scope-owned fixes (#4, #13, #17, #20, #23, #29, #30, #31; 16 sub-changes) and the eight other-part sub-changes
  that edit this part's sections (#7 (4) T30-4 and (5) the J-A30.25 row; the index rows of #2, #5, #15, #24, #25, #28)
  were checked by script: for each touched section, the archive with the required rows applied (whitespace-collapsed)
  equals the live section.
* **Nothing else changed** in §0.2, §13.1, §13.2, §13.8, §16, the Judgment-calls index, Staged, or the Part A entries
  J-A16.01 and J-A28.01 (same check). The only script differences were two artefacts of the check itself, not of the
  text: a leading space of #7 (4)'s insert (present in the live file) and the J-A30.25 row, which sits after the index
  table's last row as the block protocol places it (the index is in append order).
* **References resolve** (`refs.py`: 139 headings, 471 J ids, 2 flags, both the pre-existing outside citations).
  **No deferral wording** in the 24 new texts that land in this part or in the 13 proposal texts of §3 and §4 (probe: 0 hits).
  **Item 20 holds**: T19-4's new dossier clause requires every roster household housed, T28-18's refusal applies to a
  household of no dossier's roster only, and no touched text lets an epoch, an edit or a solver rung remove a dossier
  element or a dossier-roster household.
* **Five new issues, all minor, none needing the owner** (§3): scope 4, model 1. Two are bars that rule (2) ("the test
  or acceptance bar that proves it") requires for mechanisms the hand fix added (VSH-04, VSH-05); one is an unrecorded
  absorption against §16's own pricing rule (VSH-02); one merges a wording fix of T11-1 with the pipeline verifier's
  VPH-05 (2) at the same anchor (VSH-01, supersedes VPH-05 (2)); one is a stale index row (VSH-03, model).
* **Seven sibling issues sit in this part's sections; each was re-read here and is CONFIRMED, not re-filed** (§4):
  VHM-07, VKH-03, VDH-02 and VPH-05 (1) (scope-owned), and VPH-01, VPH-03 (2) (pipeline index rows) — my own drafts of
  the last three coincided and were withdrawn in their favour. All proposals of §3 and §4 apply together on one scratch
  copy, each old string once.

## 1 The fixes, one by one

Live line numbers (doc `5d752c9b…`). PRESENT = the required text is in the live file once, at the anchor, the old text
gone, and the section otherwise unchanged.

| # | id | sub | where (live) | verdict | evidence (live text) |
|---|---|---|---|---|---|
| 4 | VS3-04 | T19-4 | §13.2 l. 10330 | PRESENT | "on a dossier fixture whose squalid district's shells hold fewer households than their template rows, every household of the dossier's roster is housed — those no building has room for in a residential slot the `dossier` request re-provides in their district —, no building exceeds its capacity, and each re-provided slot is reported (§7.7 item 2; the dossier clause, from M3a)." |
| 4 | VS3-04 | M3a exit | §16 l. 11358 | PRESENT | "T20-6's refusal clause, T19-4's dossier clause, T22-1 – T22-4" |
| 4 | VS3-04 | M2b exit | §16 l. 11357 | PRESENT | "T16-1, T16-2, T19-1 – T19-3, T19-4 but its dossier clause, T23-1's parity clauses" |
| 13 | VS3-05 | (1) T28-18 | §13.2 l. 10404 | PRESENT | "on a B-EDIT fixture a `setAttr` of a tenement's heights, … returns F-EDIT (§2.6's capacity rule; the re-homing clause)." |
| 13 | VS3-05 | (2) | §13.8 l. 10865 | PRESENT | "housing clause and T28-18's `relet` and re-homing clauses from M3a" |
| 13 | VS3-05 | (3) M3a exit | §16 l. 11358 | PRESENT | "T28-17's housing clause, T28-18's `relet` and re-homing clauses, T30-3" |
| 13 | VS3-05 | (4) M3a content | §16 l. 11358 | PRESENT | "`relet` reading the household capacity M2b builds, every edit that lowers a capacity re-homing its excess by §4.7's overflow pass inside the edit (§2.6), and a dossier household's housing re-provided in its district (§4.7)," |
| 13 | VS3-05 | (5) | Part A J-A28.01, rat. l. 474 | PRESENT | "T28-17's housing clause and T28-18's `relet` and re-homing clauses — run from M3a"; index row unchanged, as required |
| 17 | VS3-07 | T28-2 | §13.2 l. 10368 | PRESENT (see VHM-07) | "(T28-2) starting at the main entrance — and, for a basement whose `Basement.access` is `external`, at its outside door (§2.6 step 3) — openings and stair cores lead to every room of every storey;" |
| 20 | VS3-08 | T28-15 | §13.2 l. 10397 | PRESENT | "— exactly for an unstored plan (§2.6's canonical chain); for a stored plan, every household's unit with its own door, the shell read without the `composition`-role vertices (§2.6, J-P48 (1)), and the subdividing event's undo restoring the plan byte for byte (§7.4)" |
| 23 | VS3-03 | T11-1 | §13.2 l. 10297 | PRESENT (see VSH-01) | "the chambers and access points re-pointed, and each underground block's `Frontage` that spans an end split there — the part beyond the end a new record with its kerb edges' rows, each part keyed by §6.3's rule for a split `Frontage` and re-pointed to the part it fronts — closes only" |
| 29 | VS3-01 | row 20 | §0.2 l. 151 | PRESENT | "the lapse at an epoch and *Dossier content across epochs* (J-A20.75, J-A20.43) in §4.11" (the ids of §4.11's paragraph head) |
| 29 | VS3-01 | M4 | §16 l. 11360 | PRESENT (see VSH-02) | "the lapse of a rejection at an epoch and the relocation of a dossier-backed use inside an epoch (§4.11's *Dossier content across epochs*, J-A20.43) — with their hook tests" |
| 29 | VS3-01 | Staged | l. 12996 | PRESENT | "the lapse of a rejection, *Dossier content across epochs* (J-A20.43) and the folding of a dossier event at an epoch (items 20, 22 (e))" |
| 30 | VS3-02 | Part A | J-A16.01, rat. l. 466 | PRESENT | "Repair round 3 (2026-09-27) moved §2.6's household capacity, … the rows' amounts and the total unchanged (verify-scope-r3 VS3-02; closing)." |
| 31 | VS3-06 | §13.1 | l. 10081 | PRESENT (see VKH-03) | "and a refusal — detail `overlap` — exactly where that result has a hole)" |
| 7 | VR3-01 | (4) T30-4 | §13.2 l. 10416 | PRESENT (model's VHM-01 (3) amends it) | "every passage with a `frontBuilding` has its `headroomCm` written, each base wing spanning it has at least two floors and an eave above that headroom, and a heights edit that would leave a spanning wing below two floors returns F-EDIT;" |
| 7 | VR3-01 | (5) J-ROWS | index l. 12977 | PRESENT, after the table's last row | "\| J-A30.25 \| `Passage.headroomCm` derived by S11 with the spans — … a heights edit below that refused \| §2.5, §2.6 \|" |
| 2 | VP3-01 | (2) | index J-A28.46 l. 12973 | PRESENT (see VPH-01) | "else an F-SITING item — never a household of a dossier's roster, whose housing S10b's `dossier` request re-provides inside the district …;" |
| 5 | V-MAB3-01 | (iii) | index J-A28.23 l. 12817 | PRESENT (see VHM-06) | "; the re-homing passes over locked and pinned households, and a hand edit whose excess cannot be re-homed returns F-EDIT" |
| 15 | VK3-01 | (2) | index J-A28.26 l. 12820 | PRESENT (see VKH-01, VHM-04) | "a wing wholly inside another's at a storey after that container, a composed tower before the wings it engages" |
| 24 | VD3-03 | (2) | index J-A20.75 l. 12940 | PRESENT | "— §4.11 relocates it first or keeps it in its building (J-A20.43) —" |
| 25 | VD3-04 | (6) | index J-A22.76 l. 12967 | PRESENT | "are never undo targets, and the epoch that carries them is none either (item 20 (c); verify-determinism-r3 VD3-04)" |
| 28 | VK3-02 | — | index J-A28.33 l. 12813 | PRESENT (verify-kernel-r0) | "with the rings §2.6's re-cut rule passes as `fixed` rings (the stair bay, the chimney stacks, the passage room, the composer's rooms and the kept rooms)" |

## 2 Checks over the touched subsections and those that cite them

Read whole on the live text: §0.2, §13.1 (its differential and constructive cases), §13.2 (T11-1, T19-1 – T19-4,
T20-1 – T20-6, T22-1 – T22-4, the B-PLAN group T28-1 – T28-19, T29-1 – T29-5, T30-1 – T30-5, §2.6's test), §13.8, §16
(all rows, the effort table and its pricing rule), Staged, the index rows and Part A entries of J-A11.43, J-A16.01,
J-A17.01, J-A20.42, J-A20.43, J-A20.72, J-A20.75, J-A22.76, J-A28.01, J-A28.23, J-A28.26, J-A28.28, J-A28.33,
J-A28.46, J-A28.51, J-A28.73, J-A29.25 and J-A30.25; and the homes they cite: §2.6's capacity bullet, the stage-3
contract and intake bullet and plan-rung steps 3–5, §3.4's `tileRings` contract, §4.7's *Households per building*,
§4.11's *Dossier content across epochs*, §6.3's split bullet, §7.4's Replay semantics and II.6's conversion paragraph.

* **Single source.** The milestone of T19-4's dossier clause and of T28-18's re-homing clause is stated where every
  bar's milestone is (the bar's own "from M3a", §16's exit row, §13.8, J-A28.01 Part A) and agrees in each. The new bars
  cite their homes (§2.6's capacity rule, §4.7, §7.7 item 2, §6.3's split rule) and restate no mechanism. Index rows
  that restate a home and are now inexact: J-A28.28 (VSH-03, new), J-A28.46 (VPH-01), J-A11.43 (VPH-03 (2)), J-A29.25
  (VHM-05), J-A28.73 (VDH-06), J-A28.23 (VHM-06, wording) — all filed.
* **Bars for the hand fix's new mechanisms (rule 2).** Checked mechanism by mechanism: #1's `houses` typing and
  required floor (VPH-05 (1)); #2 / #3's dossier re-provision (T19-4, #4); #5 / #6 / #8 / #11 / #12's re-homing
  (T28-18, #13); #7's headroom (T30-4); #14's storey rule for compositions — **no bar** (VSH-04); #16 – #18's walk-out
  (T28-2, T28-3, with VHM-07); #19 (T28-15); #21 – #23's `Frontage` split (T11-1); #25's dossier events as no undo
  targets — only the undo of a lapsing dossier event is barred (VDH-02); `revert` and the epoch that carried one have
  **no bar** (VSH-05); #29's M4 hook (T20-6's epoch clause).
* **Pricing (§16's rule: "a pass that adds build work prices it here").** #13 (4)'s M3a additions are recorded absorbed
  in J-A16.01 (#30); #29's M4 addition is not (VSH-02).
* **Milestones.** Each new clause runs where its mechanism is built: T19-4's dossier clause at M3a (the dossier
  contract), T28-18's re-homing at M3a (`setAttr` and dry run M2a, the tables editor M3a, passages M2b), T30-4's F-EDIT
  clause at M2b. The stage-3 list in Staged names T28-18's `setRoomUnit` clause only, so the re-homing clause is not
  double-gated.
* **Owner rules.** No new contradiction with item 20 (Outcome); VSH-05 strengthens item 20 (c)'s bar. §13.2 and §16 still
  defer nothing.
* **Document checks** (`doc_checks.py --sections "0,13,16,Judgment calls,Staged"`, one corpus snapshot):

  | copy | result |
  |---|---|
  | untouched (the live file), runs 1–5 through the lane | C1 5 · C2 0 · C3 151 · C4 2 · S1 0 · S2 0, 0 unreviewed, exit 0; the five runs byte-identical, so the corpus held still |
  | mine (live + VSH-01 … 05 + the seven sibling changes of §4, scratch `ARCH-final.md`) | C3 154, 3 unreviewed, exit 1 — see below; everything else identical |
  | combined | this seat writes no design file and no other writer changed the live file (hash unchanged), so combined = mine |
  | rationale (untouched vs + VSH-02) | identical hit sets (the rationale is not a checked document: its 252 unreviewed C3 hits pre-exist) |

  The three added hits are chance runs of generic English, stitched: none occurs contiguously in any findings file or in
  any JSON under research/ or captures/ (token scan and grep). "both ends of an interior" comes from VSH-01's merged
  text (VPH-05 (2)'s phrase; also in VPH-03 (1) and VDH-05, as verify-pipeline-r0 reported); "one 2 6 step 3" and
  "side of the ring is" come from VHM-07. The seat that applies them reviews them as allow rows. VSH-02 … VSH-05 add no
  hit (VSH-03 was reworded twice to keep the reviewed run "per storey the union of the wings").

## 3 Issues

| id | owner | severity · kind | where | the defect in one line |
|---|---|---|---|---|
| VSH-01 | scope | minor · ambiguity (supersedes VPH-05 (2)) | §13.2 T11-1 | #23's inserted gloss opens a second em-dash pair inside the first, so "— closes only the plots" no longer parses; "its undo restores the one record" no longer says which record; the two-part wording (VPH-05 (2)) |
| VSH-02 | scope | minor · missing (record) | Part A J-A16.01 | #29 added the epoch relocation to M4's content with the amount unchanged, but no record names the line that absorbs it |
| VSH-03 | model | minor · stale | index J-A28.28 | the row still reads "the union of the wings' extents" after #14 bound the capacity to the base wings and added the composition storey rule |
| VSH-04 | scope | minor · missing bar | §13.2 §2.6's test | #14's storey rule is claimed as an intake admission test, but the test the intake runs does not check it |
| VSH-05 | scope | minor · missing bar | §13.2 T20-6 | #25's `revert` skip and its refusal of an epoch that carried a dossier event have no bar |

### VSH-01 — scope · minor · ambiguity (#23 VS3-03; merges VPH-05 (2))

**Claim (CONFIRMED on the text).** T11-1 was "splits the tunnel … (II.6, §6.3; J-A11.43) — the first-vertex part
keeping the address, …, re-pointed — closes only the plots …". #23 inserted "— the part beyond the end … fronts —"
inside that pair, so the text now has three em-dashes: the first pair closes at "split there —", and "the part beyond
the end a new record … fronts — closes only the plots" reads as the main clause. "its undo restores the one record",
written when the sentence split only the tunnel, now follows a `Frontage` split too, which §6.3 (#22) also restores.
verify-pipeline-r0's VPH-05 (2) rewrites the same words for the three-part case; this change carries its text, so apply
this one in place of VPH-05 (2).

**Required change.** §13.2 T11-1: replace "and each underground block's `Frontage` that spans an end split there — the
part beyond the end a new record with its kerb edges' rows, each part keyed by §6.3's rule for a split `Frontage` and
re-pointed to the part it fronts — closes only the plots fronting the stretch, leaves U1 holding on every plot, and its
undo restores the one record;" with "and each underground block's `Frontage` that spans an end split there (each part
beyond an end a new record with its kerb edges' rows, one spanning both ends of an interior stretch split in three, each
part keyed by §6.3's rule for a split `Frontage` and re-pointed to the part it fronts) — closes only the plots fronting
the stretch, leaves U1 holding on every plot, and its undo restores the one tunnel record and each split `Frontage`'s
one record;". Apply after VPH-03 and VDH-05, in place of VPH-05 (2).

### VSH-02 — scope · minor · missing record (#29 VS3-01, against §16's pricing rule)

**Claim (CONFIRMED on the text).** §16: "A pass that adds build work prices it here: it names each new mechanism with
the line that absorbs it, or widens a line by an itemised amount". #29 put "the relocation of a dossier-backed use
inside an epoch (§4.11's *Dossier content across epochs*, J-A20.43)" into M4's content with M4's "(≈ 2–3 pw)"
unchanged. The closing report gave the reason — "amount unchanged: it reuses the `dossier` request and `relocateUse`
M3a builds" — but only in the seat report; J-A16.01's Part A records the M3a moves (#30) and not this one. That is the
defect VS3-02 was raised for (a vetoable absorb recorded only in a report).

**Required change.** J-A16.01's Part A entry: replace "the rows' amounts and the total unchanged (verify-scope-r3
VS3-02; closing)." with "the rows' amounts and the total unchanged (verify-scope-r3 VS3-02; closing). The hand fix then
added to M4's content the relocation of a dossier-backed use inside an epoch (§4.11's *Dossier content across epochs*,
J-A20.43), which reuses the `dossier` request and `relocateUse` that M3a builds and is absorbed by the
unpriced-mechanisms line's M4 hooks, M4's amount unchanged (verify-scope-r3 VS3-01; handfix-b verify-scope-r0
VSH-02)." (The index row is unchanged.)

### VSH-03 — model · minor · stale (index J-A28.28 after #14 V-MAB3-02)

**Claim (CONFIRMED on the text).** #14 made §2.6's capacity read "the building's base wings … never a composition's
wings, stored or derived", and appended to J-A28.28's Part A "The capacity reads the base wings only, and every
composition keeps at least their area at each storey they reach". The index row — the owner's veto surface — still
reads "per storey the union of the wings' extents", the ambiguity #14 removed from the home, and does not show the new
constraint on compositions. Same class as VHM-05 and VDH-06.

**Required change.** J-A28.28's index row: replace "per storey the union of the wings' extents (an overlap counted
once)" with "per storey the union of the wings' extents (an overlap counted once; the base wings only, never a
composition's, every composition keeping at least their area at each storey they reach)".

### VSH-04 — scope · minor · missing bar (#14 V-MAB3-02 (iii), (iv))

**Claim (CONFIRMED on the text).** #14 (iii) binds every composition, "generated or stored, and after every composition
edit", to reach every storey its base wings reach "with at least their area at each storey"; #14 (iv) says the intake
admits a stage-3 generator "only with compositions that keep that storey rule", by "§2.6's test with every fixture
building's composition stored (§13.2)". That test (§13.2, "**§2.6's test**", l. 10201–10209) checks union with the
footprint, rooms, tower centres and undo — not the storey rule. So the admission rests on an assertion, against rule
(2), and a stored composition in the base is never checked either.

**Required change.** §13.2 §2.6's test: replace "its rooms inside and its tower centres inside or on it, undo restoring
it byte for byte — the stage-3 intake runs" with "its rooms inside, its tower centres inside or on it and its wings
reaching every storey the base wings reach with at least their area at each (§2.6's storey rule), undo restoring it byte
for byte — the stage-3 intake runs".

### VSH-05 — scope · minor · missing bar (#25 VD3-04)

**Claim (CONFIRMED on the text).** #25 made every later dossier event "no `undo`, `redo` or `revert` target of a map
event: `revert` skips it", and refuses as an `undo` target "an `epoch` that carried one in `EpochInputs.dossier`" —
item 20 (c)'s guard. No §13.2 bar exercises `revert` or the refused epoch ("revert" occurs nowhere in §13); VDH-02 bars
only the undo of a lapsing dossier event (T20-2).

**Required change.** §13.2 T20-6: (1) replace "while a `relocateUse` of it commits (the refusal clause);" with "while a
`relocateUse` of it commits, and a `revert` of it skips every later dossier event (`EditBase.dossier` set) that placed or
re-designated it, its dossier content unchanged (§7.4; item 20 (c)) (the refusal clause);"; (2) replace "with §5.3's
dossier row holding after every epoch (the epoch clause, from M4; J-A17.01);" with "with §5.3's dossier row holding after
every epoch, and an `undo` naming an epoch that carried a dossier event in `EpochInputs.dossier` returns F-EDIT and
changes nothing (§7.4) (the epoch clause, from M4; J-A17.01);". The clauses keep their milestones (M3a, M4).

**Anchors.** Each old string above occurs exactly once in the live file, whitespace-normalised (script); VSH-02 is in
the rationale, the rest in the document. All of §3 and the seven sibling changes of §4 were applied together to scratch
copies by a matcher that lets a single space match one soft line break (as `handfix.py` does): every anchor once, every
new text once after (`vs-final.py`, "ALL ONCE").

## 4 Sibling issues in this part's sections — confirmed here, not re-filed (apply once, as filed)

| id | filed by | owner | where | re-check here |
|---|---|---|---|---|
| VHM-07 | verify-model-r0 | scope | T28-2, T28-3 | CONFIRMED: step 3's new fallback keeps `Basement.access` `external` ("stays as derived"), so T28-3's "by its outside stair" and T28-2's "at its outside door" fail a correct fallback plan. Its text adds 2 chance C3 hits (§2). |
| VKH-03 | verify-kernel-r0 | scope | §13.1 | CONFIRMED: the differential is "split by attraction (§3.7)", and §3.4 moves no vertex only where the rings keep the composition contract, so an attracted case can close the oracle's hole and a correct kernel fails #31's clause. |
| VDH-02 | verify-determinism-r0 | scope | T20-2 | CONFIRMED: §7.4's Replay semantics now refuses an `undo` of a dossier event, so T20-2's "an undo of the lapsing event restores the hold" is unsatisfiable for its dossier-event clause. |
| VPH-05 (1) | verify-pipeline-r0 | scope | T19-4 | CONFIRMED: #1's `houses` typing and required floor have no bar; its wording agrees with S11's mutator ("each required structure without a match is added"). My coinciding draft withdrawn. VPH-05 (2) is superseded by VSH-01. |
| VPH-01 | verify-pipeline-r0 | pipeline | index and Part A J-A28.46 | CONFIRMED: both still read "a plot none of whose slots it fills typed vacant", the rule #1 (3) retired. My coinciding draft withdrawn. |
| VPH-03 (2) | verify-pipeline-r0 | pipeline | index J-A11.43 | CONFIRMED: the row says only "block frontages re-pointed" after #21 split them. My coinciding draft withdrawn. |
| VHM-05, VHM-06, VDH-06, VKH-01 (2), VHM-01 (3) | model, determinism, kernel verifiers | model / determinism | index rows J-A29.25, J-A28.23, J-A28.73, J-A28.26; T30-4 | read; they edit this part's sections and apply cleanly beside §3 (their anchors do not overlap mine) |

## 5 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed on disk): the live hashes equal apply.md's and did not change during the lane; every scope
sub-change and every other-part sub-change in this part's sections present once, the sections otherwise unchanged
(`scopecheck.py`, `ratcheck.py`); references (`refs.py`, live and proposed: 2 pre-existing external flags); the deferral
probe (0); the document-check counts and hit sets above (five identical untouched runs); every anchor of §3 and §4 once,
and all of them applied together; the three added doc-check runs absent contiguously from the corpus; the texts VSH-01 …
05 rest on, read in place.

**PLAUSIBLE** (judgment): the severities; that the proposals, once applied, add no new defect; how often VKH-03's
attracted hole case and VHM-07's fallback are reached.

## Files

* `docs/validation/amendments-b/handfix/verify-scope-r0.md` — this report.
* Scratchpad (session-local, `handfix/`): `scopecheck.py`, `ratcheck.py` (presence), `vs-final.py` with
  `vs-final.json`, `ARCH-final.md`, `RAT-final.md` (the proposals on scratch copies), `vs-dc-*.txt` (document checks),
  `refs-final.out`.
