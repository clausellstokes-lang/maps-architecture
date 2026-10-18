# handfix-b/repair-pipeline-r1 — report of the pipeline part's repair blocks (round 1)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat handfix-b/repair-pipeline-r1; queued in docs/FABLE-REVIEW-QUEUE.md.

PROGRESS (kill-safe ledger; the block file's preamble carries the same ledger)
ITEM blocks: planned 5 blocks for VPH-01, VPH-02, VPH-03 | done (docs/validation/amendments-b/handfix/repair-r1-pipeline.md)
ITEM checks: planned simulated assembly, word diff, refs, doc checks (three copies) | done (receipts §3)
ITEM close-out: planned allow row, queue row, LANDED line | done (allow row appended; queue row A-handfix-b/repair-pipeline-r1; LANDED line)

Lane `handfix-b/repair-pipeline-r1`, 2026-09-27, opus standing in for Fable. Base: `docs/ARCHITECTURE.md` sha256
`5d752c9b…` and `docs/ARCHITECTURE-RATIONALE.md` sha256 `61477508…` (handfix/apply's output, which the r0 verifiers judged;
unchanged through this lane). This seat edited no design file.

## Outcome

All three pipeline issues are fixed by five blocks. The two scope-filed duplicates (VPH-01 and VPH-03 (2), confirmed in
the index by verify-scope-r0) are the same changes and are applied once.

| issue | block | change |
|---|---|---|
| VPH-01 (1) | J-ROWS, J-A28.46 restated | the index row states #1's rules: the `houses` slot, the required floor, the vacant rule with the next candidate, S11's write kept to residential buildings with locked and pinned households kept; where column `§4.7, §10.2` |
| VPH-01 (2), (3) | RATIONALE-A, J-A28.46 restated | the Part A entry states the same rules and the VP3-04 provenance, as required |
| VPH-02 (1) | REPLACE §10.2 | the `houses` comment: a live-in class's main slot is residential whatever the cell holds, `liveIn` governing |
| VPH-02 (2) | REPLACE §10.3 | *Uses that move* tests for "a residential slot (a structure with `houses`, §10.2; §4.7 S11)", not "a dwelling slot" |
| VPH-02 ruling | J-A28.46 index and Part A | the precedence recorded as a vetoable call (see the refinements) |
| VPH-03 (1) | REPLACE II.6 | the block `Frontage` split at every stretch end in the tunnel's one step, three parts for an interior stretch, every part keyed by §6.3's rule |
| VPH-03 (2) | J-ROWS, J-A11.43 restated | the index row names the split and the part that keeps the address |

## 1 Refinements of the required texts (each closes a gap the required text left)

* **VPH-02 (1): "(its flag read as true)".** The required comment made the live-in main slot "one whatever this cell
  holds". But §4.7 and §10.3 gloss a residential slot as "a structure with `houses`". Saying the flag reads as true keeps
  that gloss exact for a live-in main slot whose cell is false.
* **VPH-02, the ruling recorded.** Making `liveIn` govern the cell is a judgment call: the other options were letting
  the two columns disagree, or refusing an `editTable` that leaves the cell false. It is recorded under J-A28.46, the
  call that owns the slot rule.
  * Part A gets a new closing sentence, "chose X over Y because Z".
  * The index row gets the clause "a live-in class's main slot always one", and `§10.2` is added to its where column.
* **VPH-03 (1): grammar.** The required text said "split at every stretch end it spans". Its subject is the plural
  "records", and the sentence's other "it" is the tunnel. The block writes "split wherever one spans a stretch end, all
  in the one step that splits the tunnel", which keeps the original "where one spans an end" construction.
* **VPH-03 (1): the undo names both records.** II.6 ended "an `undo` restores the one record", which after #21 no longer
  says which record. verify-scope-r0's VSH-01 found the same ambiguity in T11-1, the test of this sentence. The home now
  reads "an `undo` restores the one tunnel record and each split `Frontage`'s one record", as VSH-01's T11-1 text does.

## 2 Considered and ruled not defects

* **The live-in main slot and the vacant rule.** A live-in workplace's main slot is residential. So when no household
  fills it, §4.7's vacant rule could in principle type a workplace plot vacant. It cannot happen: the *Live-in* bullet
  sites the live-in household at its workplace first, before other residential plots. PLAUSIBLE; no change.
* **§10.3's "otherwise" branch.** After VPH-02 (1), a live-in use's destination template, which is its own class's, always
  has a residential main slot. The branch is still reached when a `liveIn` edit (§7.6) leaves a household in
  `Building.dwelling` whose class is no longer live-in, so the text stays. No change.
* **A false cell read as true, silently.** The comment documents the precedence in the table's own schema, and no table
  column in §10.2 is otherwise validated at edit time. A report on such an edit would be new mechanism. No change.
* **J-A11.43's Part A.** Its closing sentence ("split at the same ends follows §6.3's rule, the part holding its first
  kerb edge keeping the address") already covers three parts. Splitting in one step is §6.3's rule, not a new call.
  Not restated.

## 3 Receipts

* **Simulated assembly (scratchpad `handfix/rp1/`).** `apply-blocks.py` applied 5 of 5 blocks, skipped 0, and its audit
  is clean. Its only notes are the expected "DUPLICATE ID inserted" for J-A28.46 and J-A11.43.
  * `swap.py` runs `assemble-r1-handoff.py`'s `swap_restated` unchanged. It made 2 index swaps and 1 Part A swap.
  * Result: line counts unchanged (document 13 021, rationale 2 052), 145 headings, fences balanced, title block
    unchanged.
  * `wdiff.py`: the only changes are §10.2 l. 8911, §10.3 l. 9091, II.6 l. 11944, index l. 12970 and 12973, and Part A
    l. 513. Each is one of the texts above.
* **References (`refs.py`).** Live, mine and combined each give 139 headings, 35 D ids, 471 J ids and 2 broken, both the
  pre-existing external citations (§2.1.4 of `os-geometry.md`, RFC 7946 §3.1.6). 0 new.
* **Combined copy (`combined.py`).** Mine, plus VDH-05 (§6.3), VSH-01 (T11-1), VPH-04 (§2.6, both glosses) and
  VPH-05 (1) (T19-4) as filed. Every anchor matched once.
* **Real round-1 combination (`real.md`).** The three block files present at close were applied together:
  `repair-r1-determinism.md`, this file and `repair-r1-scope.md` (sha256 `ec937979…`, `530dd858…`, `43dce04e…`).
  * 14 of 14 blocks applied, none skipped, and no heading is replaced twice.
  * The swaps: 3 in the index (J-A28.73, J-A11.43, J-A28.46) and 2 in Part A (J-A16.01, J-A28.46).
  * refs: 0 new.
  * The companion texts agree with II.6: the scope file's T11-1 reads "each part beyond an end a new record …
    one spanning both ends of an interior stretch split in three … its undo restores the one tunnel record and each
    split `Frontage`'s one record". The determinism file's §6.3 reads "every other part — two where the record spans a
    whole interior stretch — takes an address".
  * No model block file existed yet, so VPH-04 was checked only in `combined.md`.
* **Document checks,** sections "2.6,6.3,10.2,10.3,13.2,II.6,Judgment calls", one corpus snapshot (911 940 3-grams; the
  untouched copy gave identical results before and after):

  | copy | exit | C3 hits | unreviewed |
  |---|---|---|---|
  | untouched | 0 | 332 | 0 |
  | mine | 1 | 333 | 1 |
  | combined | 1 | 334 | 2 |

  * The one new hit is "both ends of an interior": in II.6 in mine, and also in T11-1 in the combined copy.
  * It is a chance match. The five-word run and its four-word tail "ends of an interior" occur contiguously in no
    findings file and no JSON under research/ or captures/, and "both ends of an" in no findings file (grep).
  * Reviewed by the allow row this lane appended; C1, C2, C4, S1 and S2 are unchanged.
  * **Re-run with the allow row, same corpus.** Mine exits 0 (C3 333, 0 unreviewed), and untouched gives 332 again.
    The real round-1 combination gives C3 336 with 2 unreviewed: "one 2 6 step 3" and "side of the ring is", both in
    §13.2. Both come from `repair-r1-scope.md`, whose checks were still pending when this lane closed; none comes from
    this file.
  * On the rationale's Part A (not under the checks regime), my change adds 0 hits: the unreviewed list is identical,
    untouched against mine.

## 4 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed on scratch copies): the blocks apply cleanly, the rows swap into place, the word diff holds only
the intended texts, 0 new broken references, and the one new C3 hit is a reviewed chance match. **PLAUSIBLE:** the
refinements and the J-A28.46 ruling (vetoable), and the §2 rulings. A later verifier should re-read §10.2, §10.3, II.6
and both J rows once the round is assembled.
