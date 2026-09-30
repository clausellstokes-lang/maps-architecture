# Consistency pass — closing summary for the owner (Fable seat, 2026-09-26)

Lane `consistency/closing`. Seat: Fable (`claude-fable-5-1`), the pass's closing validator — not a stand-in. This page is
written in plain words; the technical record for the next seat is Appendix A at the end.

## What this pass did

The design document, `docs/ARCHITECTURE.md`, had grown through five fix rounds from about 2 200 lines to 11 477 lines,
and the same fact was often written in several places. That is how small contradictions crept in: one copy got fixed,
another did not. This pass removed the cause. Every fact now has exactly one home — the section that owns its subject —
and every other place points to it instead of repeating it. No design decision, mechanism, number, budget, rule or
test was added, dropped or changed, except to fix the 20 small items the fix rounds had left and to reconcile statements
that disagreed (the home wins). In steps:

1. Six readers listed every rule, number, interface and test of their part — 3 294 items in all, none sampled.
2. One seat merged the six lists into a "canon": 2 771 distinct facts, each with one home, and 72 places where the
   document disagreed with itself, each with a ruling.
3. Six rewriters rewrote their parts so that each fact is stated once. The reasoning behind decisions ("chose X over Y
   because Z") moved to a companion file, `docs/ARCHITECTURE-RATIONALE.md`, leaving a compact index in the design.
4. An assembler joined the parts. Six verifiers then checked every one of the 3 294 items against the old text and
   raised what the rewrite had lost or bent. Three repair rounds fixed those findings (49, 15 and 7 replacement blocks);
   after each round the verifiers checked again.
5. A Fable validator read the whole document as one design and ruled it coherent end to end: PASS, with 7 minor
   repairs, which round 3 made.
6. This closing seat confirmed those 7 repairs on the text, reviewed everything the stand-ins produced, and closed the
   record.

## Sizes, before and after

| | before the pass | after the pass |
|---|---|---|
| the design document, `docs/ARCHITECTURE.md` | 1 461 981 bytes, 11 477 lines | 1 121 561 bytes, 9 668 lines (76.7 %) |
| the rationale companion, `docs/ARCHITECTURE-RATIONALE.md` (new) | — | 279 900 bytes, 1 857 lines |
| both files together | 1 461 981 bytes | 1 401 461 bytes (95.9 %) |

The target was 55–65 % of the old size; the design document reached 76.7 %. The validator judged the document usable
as it stands and ruled against a further compression pass: what remains large is the test plan (the fixture lists), the
interface code and the acceptance tables, which a builder needs, and every round of cutting seeded a few new slips (12
after round 1, 5 after round 2), so cutting another 170 KB would risk new contradictions for no reader's benefit. The
rationale file is not part of the design: on any difference, the design document wins.

## What was fixed

* **The 20 minor items the fix rounds left open** (`docs/validation/fix-all/still-open-r5.json`): all 20 fixed and
  verified by the part verifiers in every round; the validator spot-checked 14 of them on the text as well.
* **The 72 places where the document disagreed with itself:** every one resolved as the canon ruled, and the validator
  saw each ruling applied. One ruling was rightly "not a conflict" (a floor and a bar are two different facts).
* **The slips the rewrite and the repairs themselves introduced:** round 0 raised between 8 and 17 minor findings per
  part (several the same finding seen from two parts); round 1 fixed them, round 2 fixed the 12 that round 1 left, and
  round 3 fixed the validator's 7. Every fix was a substitution inside one sentence or table row.
* **Clean text:** the "round N" history and the fix-round narration are gone from the normative text (the validation
  record keeps the history); the 133 per-section review markers became one banner under the title; no "TBD", "later"
  or "open" wording remains.
* **The validator's 7 repairs, confirmed by this seat at their lines:** §12.6's replay sentence has its verb back;
  §13.2's wealth sweep says "walled share inside its rung band"; §5.2's contour row names both sections that compute its
  rungs; §6.1 states how the stamp-tile key is derived; §16's M2b milestone gates the lit export beside a moving sun;
  §9.5's compass is keyed by §6.1's rule alone; §4.2 points to §2.3 for the terrain resolution instead of repeating it.

## What remains, and why

**Two small wording conflicts, both minor, both in the rendering sections.** The final re-verification after round 3
found them (one was reported twice, by two verifiers). Both existed before this pass — no repair caused them — and both
were missed until §12.6 and §9.5 were re-read. They are handed to the next step to be fixed by hand right away; nothing
is deferred. Neither changes a number a builder uses.

1. **VDR3-1 (= VR-R3-1).** §12.6's cost formula restates the succession-matching budget as "≤ 2 µs per re-derived
   entity", while its home, §6.3, gives ≤ 2 µs for point-anchored entities and ≤ 20 µs for overlap-anchored ones. Fix:
   in §12.6, change "plus succession matching (≤ 2 µs per re-derived entity, §6.3)" to "plus succession matching (§6.3's
   budget)".
2. **VR-R3-2.** §9.5's grid bullet restates the VTT grid default ("for VTT 1.5 m / 5 ft") whose home is §11.1. Fix:
   change "on a 1-2-5 sequence; for VTT 1.5 m / 5 ft)" to "on a 1-2-5 sequence; for VTT, the export's declared grid,
   §11.1)".

**Three design numbers this pass was not allowed to decide,** routed to the amendments pass with recommended values:
`k` in §5.3's "no branch re-joins its parent within k segments" (recommended 3), where `wood` and `annotation` labels rank
in §9.2 (recommended: `wood` after `water`; annotation labels are user-placed and need no rank), and `k` in §4.2 S1 (4)'s
river-island rejoin (found in round 3). Each adds a design number, so the next design pass applies them.

## What this closing seat checked

* The seven validator repairs, read at their lines in the current document; the old wording has 0 hits.
* The 39 review-queue rows of this pass: 26 confirmed, 13 marked corrected. "Corrected" means the work was right in the
  main but needed a later correction that this pass applied or recorded: the canon merged two statements of the
  terrain resolution as if they were two facts; each of the six rewrites had slips the repair rounds fixed (and the
  rendering rewrite the two items above); the rendering and determinism verifiers of rounds 0–2 carried three ids as OK
  that their own round-3 reports found in conflict.
* The questions the rewrite seats asked Fable to look at first, each confirmed as the text now stands: water gates at
  every quay access under a sea wall (§2.7 now points to §4.4 S5a); quarter names are not re-drawn by a town-wide
  reroll (§6.1 — they are the address system's spine; a quarter can still be renamed as an edit); a town that keeps its
  old model at an upgrade stays viewable, exportable and replayable by the command-line tool (§7.5); an engine change
  is an output-version bump (§3.7 points to §6.5 (7)); the label-row tables are declared once, in `@plat/model`; the
  one-ring `Polygon` deviation was confirmed by the Fable repair seat of round 1.
* The clean-room checks (`docs/validation/bench/doc_checks.py`) on the final document. 127 new text matches had
  appeared since the last clean run; every one was caused by two dwellings research pages written this evening (20:57
  and 21:14) that quote or paraphrase the design. Every matched passage predates those files (101 are in the pre-pass
  archive), none is a list, table, grammar or palette, and each was read in place and reviewed into the allow file.
  Both check sets now exit 0 with 0 unreviewed hits, and every internal reference resolves.
* The document keeps its 140 headings and 9 668 lines. The only change this seat made to it is the banner line under
  the title.

## What comes next

1. **The Fable review of the earlier queue.** 90 rows from earlier passes are still PENDING in
   `docs/FABLE-REVIEW-QUEUE.md`: the fix rounds' stand-in decisions, the red-team lenses, readers and measurements.
   `workflows/05-fable-review.js` runs when Fable is available; it reviews every row, applies corrections, and rewrites
   the document's banner again.
2. **The 2026-09-25b amendments** (`docs/AMENDMENTS-2026-09-25b.md`, items 8–31, the GPL-3 licence among them) through
   `workflows/09-amendments-b.js`, which also settles the three design numbers above. Its preparation lanes have already
   started this evening: the routing of the items and the kernel blocks have landed.
3. **The first build milestone, M0** (§16): the geometry kernel with its fuzz tests, the calibration spikes and the
   fusion gate, built from the text as it now stands. The validator confirmed that M0 and M1 can be built from it.

## Appendix A — record for the next seat

**A.1 Files this seat changed.** `docs/ARCHITECTURE.md` (l. 3, the banner only); `docs/FABLE-REVIEW-QUEUE.md` (39 status
cells); the marker line of 42 files under `docs/validation/consistency/` plus three inline "(vetoable; PENDING FABLE
REVIEW)" mentions (`canon.md` l. 473, `rewrite-determinism.md` l. 32, `rewrite-scope.md` l. 100);
`docs/validation/doc-checks-allow.tsv` (two `consistency/closing` blocks: 129 rows); this file; `docs/lane-events.log`.

**A.2 Queue verdicts (status cell only; the check-first questions of every row were read).**

| rows | verdict | reason |
|---|---|---|
| `B-consistency/inventory-{pipeline,kernel,determinism,model,rendering,scope}` | REVIEWED-CONFIRMED | every id was carried through the verifiers' full checked lists (3 294 = the canon's merge count); no verifier or the validator found an inventory error |
| `B-consistency/canon` | REVIEWED-CORRECTED | MODEL-157 and PIPELINE-059 were one fact, held as two (V-FIN-07; validate.md §9 (2)); the 72 rulings and the four option choices stand as applied |
| `A-consistency/rewrite-{kernel,pipeline,determinism,model,scope}` | REVIEWED-CORRECTED | each rewrite's round-0 findings were fixed by the repair rounds (repair-r1/r2/r3 files, assemble logs); the decisions taken in each rewrite are confirmed as the text now stands |
| `A-consistency/rewrite-rendering` | REVIEWED-CORRECTED | as above, plus the two single-source slips VDR3-1 and VR-R3-2 (hand fix pending, this file) |
| `B-consistency/assemble-r{0,1,2,3}` | REVIEWED-CONFIRMED | mechanical seats, rebuilt byte for byte by every verifier; the 56 + 66 allow rows re-read: numbers, pointers, our own phrasing, attributed quotes under 15 words; C4 tie-break lexicographic |
| `B-consistency/verify-{kernel,model,pipeline,scope}-r{0,1,2}`, `verify-{pipeline,scope,determinism,rendering}-r3` | REVIEWED-CONFIRMED | their verdicts held up in later rounds; the r3 findings were confirmed here on the text |
| `B-consistency/verify-rendering-r{0,1,2}`, `verify-determinism-r{0,1,2}` | REVIEWED-CORRECTED | carried RENDERING-554, -387, -442 (resp. DETERMINISM-251) as OK; their own r3 reports found the conflicts (VR-R3-1/2, VDR3-1) |
| `A-consistency/repair-pipeline-r1` | untouched | already "DONE (Fable seat)", not PENDING |

No rationale-file row exists in the queue (validate.md §9 (2) asked for one to be confirmed): the rationale file's check
is validate.md §3's (276 judgment ids = the index = the references; the seven amended rows carry their markers) and it
stands; the three `rewrite-*-rationale.md` companions are marked CONFIRMED (verbatim extractions).

**A.3 Markers.** Each marker line now reads `> Fable-reviewed 2026-09-26: <VERDICT> — docs/validation/consistency/validate.md`
with the row's verdict. Deliberately untouched: `new/scope/01-title.md` (the round-0 assembly input; changing it would
break the documented byte-for-byte rebuild chain), the allow file's older block comments (history; the queue rows are
the authority), `validate.md` and this file (Fable-produced, no marker), the `repair-r*.md` files (no marker).

**A.4 Banner.** Old: `> PENDING FABLE REVIEW — …`. New: `> Fable-validated 2026-09-26 — … validated by Fable on
2026-09-26 (validate.md; closing record SUMMARY.md); the design decisions taken by Opus stand-ins during the fix rounds
stay queued in docs/FABLE-REVIEW-QUEUE.md until workflows/05-fable-review.js has run.` sha256 before
`7a4e19dbae731d3ea655e21a4fc97e3eaa2fd852017176a1bb4cc5e15d4ec762` (assemble-r3's landed hash, checked before the write),
after `692a919f48ea111e84c734d3bf122673b91fd67b7b2019a22e5845ea10b99ecf`; 1 121 342 → 1 121 561 bytes; 9 668 lines. The
amendments-b workflow was running concurrently; its apply seat should keep the banner at l. 3 (the 05 workflow rewrites it).

**A.5 Receipts (executed).** `doc_checks.py` on the eight `#` keys: C1 5 / 0, C2 0 / 0, C3 681 / 0, C4 7 / 0, S1 0 / 0,
S2 0 / 0, exit 0; on the 33 top-level keys: C3 1 329 / 0, C4 14 / 0, exit 0 (baseline before this seat: C3 680 / 147
unreviewed on the eight keys, corpus growth only). Allow file 771 → 902 lines. Attribution: every one of the 127 runs
needs a 3-gram found only in `research/findings/dwellings-synthesis.md` (21:14; 117 runs, 28 verbatim quotes of the
design) or `_critic-dwellings.md` (20:57; 14 runs); 15 lengthen rows already reviewed; the two banner-caused runs are
file-name citations. Resolver: 134 numbered headings, 35 D-ids, 276 J-ids, 0 broken, the same 2 external pointers
(l. 2036 `os-geometry.md` §2.1.4, l. 6826 RFC 7946 §3.1.6). Headings 140, fence lines 88, "PENDING FABLE REVIEW" lines
in the document 0; the queue's 158 lines keep 8 cells per row; 90 PENDING rows remain, all of earlier passes.
Scripts and outputs: the session scratchpad, `close/` (`dc-baseline-8.out`, `attrib.json`, `locate.json`, `classify.json`,
`add_allow.py`, `queue_edit.py`, `markers.py`, `banner.py`, `dc-final2-8.out`, `dc-final2-33.out`, `refs-final.json`).

**A.6 CONFIRMED vs PLAUSIBLE.** CONFIRMED by execution or reading at the place: the seven repairs; the attribution and
every reviewed run; the checks, the resolver and the structural counts; every queue and marker edit (diffed: only the
intended cells and lines changed); the banner write under its hash precondition. PLAUSIBLE (judgment): the per-row
verdicts' CONFIRMED / CORRECTED split, and the confirmation of the rewrite seats' design questions, which the owner may
veto; the reading that VDR3-1 and VR-R3-2 change no stated figure (the verifiers' reading, checked against §6.3 and §11.1).
