# repair-model-r3 — lane amendments-c/repair-model-r3 (repair round 3, MODEL part §2)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat amendments-c/repair-model-r3; queued in docs/FABLE-REVIEW-QUEUE.md.

> PROGRESS (kill-safe ledger; one line per item — planned | done). The block file is
> `docs/validation/amendments-c/repair-r3-model.md` (blocks only); this file is the lane's report.
> Scripts and scratch: scratchpad `rm3/`.
> ITEM V-MC2-02 (items 65, 88): planned REPLACE §2.7 (`UndergroundSystem.sources`) | done: REPLACE §2.7 written (1 edit)
> ITEM V-MC2-01 (item 88): planned REPLACE §2.9 (`Recipe.history`), J-ROWS + RATIONALE-A (J-A88.21 restated) | done: REPLACE §2.9 written (1 edit); J-ROWS written (J-A88.21 restated); RATIONALE-A written (J-A88.21 restated)
> Base: docs/ARCHITECTURE.md sha256 3daa0b0731b8c76f…, docs/ARCHITECTURE-RATIONALE.md sha256 bfa20419ca4dd6e5… (both untouched by this seat).
> RECEIPTS (scratch assembly, refs, doc checks): planned | done: all run, all green (see "Receipts")

## Outcome

Both routed issues are fixed; neither is ruled invalid. The block file `docs/validation/amendments-c/repair-r3-model.md`
holds 4 blocks: REPLACE §2.7 (1 edit), REPLACE §2.9 (1 edit), J-ROWS (J-A88.21 restated) and RATIONALE-A (J-A88.21
restated). §2 has no `####` headings, so the smallest heading-delimited unit is the whole `###` subsection. Each REPLACE
body was cut by script (`rm3/b27.py`, `rm3/b29.py`) from the live design and changed by one exact substitution asserted
to match once, so every other line is byte-identical. The scratch assembly changes 3 lines of the design and 1 line of
the rationale, and nothing else.

| issue | where | fix |
|---|---|---|
| V-MC2-01 (item 88) | §2.9 `Recipe.history`; J-A88.21 index row and Part A entry | The comment now reads "a recipe input read by S2's growth-stage count and II.7.6's rules (§2.7; §4.2 S2)", replacing "an S0 input (§2.7)". The index row now reads "`HistoryHint` on the recipe as a generation input (its readers J-A88.42's)". The Part A entry now reads "a field of the recipe that generation reads (S2's stage count and II.7.6's rules; J-A88.42)" and ends with the tag "(item 88; repair round 3, V-MC2-01)". These are the validator's texts verbatim. "II.7.6's rules" covers both of II.7.6's readers, the catacomb age and the buried old town, so the list agrees with §2.7's `HistoryHint` comment and with VS2-04's repaired J-A88.42. |
| V-MC2-02 (items 65, 88) | §2.7 `UndergroundSystem.sources` | "the raiseGrade that buried a town" becomes "the blocks or districts a `raiseGrade` buried (its `region`, II.7.6) or, at generation, the growth-stage-1 districts a `fire` or `flood` scar buried (II.7.6; J-A88.42)". This is the validator's text verbatim. The same clause's "the access edit that dug a passage" becomes "the building whose access edit dug a passage (`addUndergroundAccess`, item 66)" (deviation 1). |

**Deviations from the validator's texts.**
1. *Widened by one clause (V-MC2-02).* The validator's reason is that `sources` is `Id[]`, so it cannot hold a
   conversion op. By that reason the next clause, "the access edit that dug a passage", also names an event and not an
   entity. The fix names the entity the edit acts on: `addUndergroundAccess(building, target?)` (§7.1, §7.3 item 9 (d),
   II.7.6's item 66 pieces) takes the building. The lifecycle holds on every path. The edit's closure writes the id with
   the passage. The closure's exact undo (§7.3 item 9 (c)) restores the system record without it. A system the edit
   created is removed whole. This change adds no mechanism, so it is not a judgment row. The clause "the stone stock a
   quarry fed" was checked and left as it is: II.7.6 defines the stock as the stone buildings and the enceinte's walls
   and towers, which are entities, so it is a valid `Id[]` reading.
2. *History tag.* The restated Part A entry ends with "(item 88; repair round 3, V-MC2-01)", following J-A88.42's
   entry. The index row carries no tag, as every index row does.

**Needs a ruling.** None. There is no new judgment. J-A88.21's choice is unchanged: only the name of the stage that
reads `HistoryHint` is corrected, so the row is restated rather than re-ruled.

**Held parts (gate (a)).** Items 65 and 88 carry no part marked HOLD — PLAUSIBLE. The held parts in the c file all have
Fable verdicts: 37 released (labelled), 49's deletion rejected, 58 (f) released (labelled) and 59's timing released.
The d file's only "HOLD" match is inside the word "THRESHOLD" (item 76), and the e file has none. So no held part is
pending for this seat. For gates (b) and (c): no "the reference does X" sentence is added. The only identifiers added
are our own: `raiseGrade`, `region`, `fire`, `flood` and `addUndergroundAccess`.

## Assembler hand-off

1. **Swap the restated row into place.** J-A88.21 is restated in both the index (J-ROWS) and Part A (RATIONALE-A). The
   apply script reports each as "DUPLICATE ID inserted". Move each appended row into the older row's place and delete
   the older row. `scratchpad/rm3/swap.py` does exactly this on the scratch outputs. The index and Part A counts stay
   at 733 each.
2. **No double replacement.** When the blocks were written, no sibling `repair-r3-*.md` block file existed, and the
   pipeline r3 seat's ledger plans REPLACE §4.6, §4.7, §4.11 and II.7.6 and restates J-A88.42, J-A42.41 and J-P37.
   None of these is §2.7, §2.9 or J-A88.21. Re-check this against the sibling files that land after this one.
3. **Order with VS2-03 / VS2-04.** The validator applies V-MC2-01 together with VS2-03 (scope, §13.2 T88-1) and VS2-04
   (pipeline, J-A88.42). This seat's texts cite J-A88.42 for the reader list, so they read correctly whatever the order
   in which those rows land.

## Cross-part notes

* **Determinism (§7.3 item 9 (d)), for the next round.** The closure of an undercity entrance that lacks its lifeline
  runs II.7.6's connector step, so it can also dig `dug` passages. §2.7's `sources` names only the building of an
  `addUndergroundAccess`, as the text it replaces did. §7.3 item 9 (d) does not declare which entity that closure's
  edit acts on. When it does, that entity joins the `sources` list. This is recorded, not dropped: it is a gap in the
  edit kind's declaration, which is not this part's.

## Receipts (CONFIRMED, executed on scratch copies in `scratchpad/rm3/`)

* **Apply.** `apply-blocks.py` on the live design and rationale (sha256 3daa0b07… / bfa20419…) with this block file
  alone: 4 blocks found, 4 applied, 0 skipped; audit not OK 0. The only notes are the expected "DUPLICATE ID inserted"
  for J-A88.21 in both tables. Headings 147 → 147, fences balanced (130 → 130), title block unchanged.
* **Swap.** `rm3/swap.py` moved each restated row into the older row's place (1 index row, 1 Part A row). Afterwards
  `diff` shows exactly 3 design lines changed (l. 1845, 2183, 16953) and 1 rationale line (l. 577). J-A index rows
  454 → 454, Part A rows 733 → 733, no duplicate id.
* **References.** `amendments-b/refs.py`: headings 141, D ids 35, J ids 730, broken 2 → 2. The two are the same
  pre-existing citations as before (`os-geometry.md` §2.1.4 and RFC 7946 §3.1.6). Every id the new text cites resolves:
  J-A88.42, §4.2 S2, II.7.6, item 66's `addUndergroundAccess` (§7.1 l. 7867).
* **Document checks.** `doc_checks.py --sections "2.7,2.9,Judgment calls"` exits 0 on the output and on the input
  alike: C1 5/0, C2 0/0, C3 103/0, C4 1/0, S1 0/0, S2 0/0 (hits/unreviewed). No new allow row was needed.
