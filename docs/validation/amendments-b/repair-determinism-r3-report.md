# repair-determinism-r3 — lane amendments-b/repair-determinism-r3 (repair round 3, DETERMINISM part: §5, §6, §7)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat amendments-b/repair-determinism-r3; queued in docs/FABLE-REVIEW-QUEUE.md.

> PROGRESS (kill-safe ledger; one line per block — planned | done). The block file is
> `docs/validation/amendments-b/repair-r3-determinism.md` (blocks only); this file is the lane's report.
> Base: docs/ARCHITECTURE.md sha256 831efd429092adf3… and docs/ARCHITECTURE-RATIONALE.md sha256 f2c2a1ca11a0f1da…
> (assemble-r2's output, the state validate.md judged). Generator: scratchpad rd3/compose.py over rd3/specs/*.py and
> rd3/rows.py (each REPLACE body = the live subsection with count-asserted substitutions, every untouched line verbatim);
> the block file is re-composed atomically after each spec, ending in "=== END ===".
> ITEM BLOCK 01 §5.2 (VD2-01 (1) F-EDIT; V-MAB2-05 tier 6; VP2-07 F-SITING; VK2-06 tiers 1–2; VD2-11 tier 2): planned | done: REPLACE block written (10 substitutions)
> ITEM BLOCK 02 §5.3 (VD2-04 (1)(2) epoch row; VD2-01 dossier row's epoch clause): planned | done: REPLACE block written (3 substitutions)
> ITEM BLOCK 03 §6.1 (VD2-13 Enter): planned | done: REPLACE block written (1 substitution)
> ITEM BLOCK 04 §6.3 (VP2-05 tunnel SPLIT): planned | done: REPLACE block written (1 substitution)
> ITEM BLOCK 05 §7.1 (VD2-01 (1) dry run; V-MAB2-04 (i); VD2-07): planned | done: REPLACE block written (4 substitutions)
> ITEM BLOCK 06 §7.3 (VD2-06 item 1; VD2-04 (3) stored-plan row): planned | done: REPLACE block written (4 substitutions: VD2-06, the oracle's (ii) check for a re-cut, VD2-04 (3), the as-built clamp)
> ITEM BLOCK 07 §7.4 (V-MAB2-04 (ii) fieldBand row, epoch row): planned | done: REPLACE block written (2 substitutions)
> ITEM BLOCK 08 §7.5 (V-MAB2-04 (iii)): planned | done: REPLACE block written (2 substitutions)
> ITEM BLOCK 09 §7.6 (VD2-12; the stale built-count sentence): planned | done: REPLACE block written (2 substitutions)
> ITEM BLOCK 10 §7.7 (VD2-01 (1)(2)): planned | done: REPLACE block written (1 substitution: item 2 re-wrapped, word-checked)
> ITEM J-ROWS + RATIONALE-A (restated J-A20.75, J-A31.76, J-A28.73, J-DET-53): planned | done: J-ROWS (4 restated) + RATIONALE-A (4 restated) blocks written
> ITEM verify on copies (apply-blocks, hand-off swap, refs, doc_checks): planned | done: 12/12 applied, 4+4 rows swapped, refs baseline, doc_checks exit 0 (C3 250/0)

## Outcome

The 12 issues assigned to this lane are all answered in `docs/validation/amendments-b/repair-r3-determinism.md`: 10
REPLACE blocks (§5.2, §5.3, §6.1, §6.3, §7.1, §7.3, §7.4, §7.5, §7.6, §7.7; §5–§7 have no `####` headings, so each
block is a whole `###` subsection) plus one J-ROWS and one RATIONALE-A block. Each REPLACE body is the live subsection
(sha256 `831efd42…`) with count-asserted substitutions; every untouched line is byte-identical, and §7.7 item 2, the one
re-wrapped paragraph, is word-checked against the old text plus the two changes. No new ruling id: the four rows that
change are restated under their ids (hand-off (1) in the block file's preamble).

| issue | where | fix (short) |
|---|---|---|
| VD2-01 (major) | §7.7 item 2, §7.1 dry run, §5.2 F-EDIT, §5.3 dossier row; J-A20.75 | a map event is "one a user, or a host's map edit, appends without `EditBase.dossier`"; an `epoch` is bound by the rule without being refused by it — §4.11's *Dossier content across epochs* relocates the use first — so every dossier-backed element is live and placed after every epoch; §5.3's dossier row gains that epoch clause and a stage-end check per `epoch`; J-A20.75 records item 17 (d) yielding to item 20 for dossier content |
| V-MAB2-04 (+VD2-05) | §7.1 plots and buildings rows, §7.4 new `fieldBand` row and epoch row, §7.5; J-A31.76 | `fieldBand` and each base wing's `spans` declared derived with their writers; `fieldBand` gets its lifecycle row; the epoch row re-bands it after S6; §7.5 migrates it from `DerivationRecord.band` and says no older base wing carries `spans` |
| V-MAB2-05 (a) (+VP2-06, VD2-08) | §5.2 F-PLAN tier 6 | the count is kept by the generation fill (S10b's placement, S11's clamped write and overflow pass), `relet` and §2.6's re-homing |
| VD2-06 (+V-MAB2-05 (b)) | §7.3 item 1 | the effective scope's home states the storing edit's J-P48 (1) faces and row-neighbour rings, a spanned passage's front building, and the buildings a capacity re-homing moves households into |
| VD2-07 | §7.1 | a pointer: an edit that lowers a building's capacity re-homes the excess by §2.6's capacity rule, each move a fate |
| VP2-05 | §6.3 JOIN and SPLIT | a tunnel record split by a stretch conversion follows the SPLIT rule, the centreline's first vertex as its anchor |
| VP2-07 | §5.2 F-SITING | detection and where cell name S11's overflow pass; a household it cannot house takes the last rung alone, no re-cut after S11 |
| VD2-04 | §5.3 epoch row (invariant and check cells), §7.3 stored-plan row | shells read without the `composition`-role vertices a stored plan's re-cut adds (§2.6, J-P48 (1)) |
| VK2-06 (+VD2-10) | §5.2 F-PLAN tiers 1–2 | tier 1 names the seed clip (`tileRings`) beside the arena; tier 2 cites the clip order that leaves no holed seed piece |
| VD2-11 | §5.2 F-PLAN tier 2; J-A28.73 | a refused stair bay or chimney stack moves in the same attempt to the next candidate of step 3's filtered order — a deterministic, stream-free move |
| VD2-12 | §7.6 | `UndergroundRule` and `TunnelProfileRow` named among the editable rule tables |
| VD2-13 | §6.1 Enter; J-DET-53 | the copied assignment carries the dossier's later `setAttr` values (`name`, `function`, `shapeClass`, `knownTo`, `drift`) |

## Rulings recorded (vetoable)

* **Restated, same ids** (index and Part A): J-A20.75 (VD2-01: the epoch clause and item 17 (d) against item 20),
  J-A31.76 (V-MAB2-04: `fieldBand`, `spans`), J-A28.73 (VD2-11: the deterministic move), J-DET-53 (VD2-13).
* No new id; no owner-gated question.

## Where this repair departs from, or goes beyond, the validator's wording

1. **§5.2 tier 2 (VD2-11).** "at the next candidate of *that step's* filtered placement order" in place of "of §2.6
   step 3's …": "that step" is the §2.6 step 3 the same clause names, and the digit run "of §2.6 step 3" raised an
   unreviewed doc-check C3 hit (a corpus 3-gram run, not a copy). The J-A20.75 index row keeps its where cell
   `§7.7, §7.1, §7.2, §5.2` for the same reason (extending it raised a C3 digit run); its text names §4.11.
2. **§5.2**: F-SITING's *where* cell gains "S11's overflow pass (§4.7)" and its test cell "every household S2 demanded
   housed or reported unplaced (§13.2 T19-4)" (the bar VP2-09 rewords), and tier 2's lead reads "a refusal of the
   rung's seed clip or transient arena (tier 1)", so each follows the new detection wording.
3. **§5.3 dossier row (VD2-01).** VD2-01's claim names the row as silent on epochs and its new §7.7 sentence cites it,
   so the row gains "no step of an epoch closes it or leaves it without its building (§4.11's *Dossier content across
   epochs*)" and a stage-end scope per `epoch` event (O(dossier elements)).
4. **§7.3 item 1 (VD2-06)** also covers an event whose re-cut of a stored plan establishes J-P48 (1) for its new walls
   (§2.6 says it does, in the same event), and item 7 (ii)'s oracle check is extended to that event, so the oracle does
   not flag the neighbour faces the re-cut splits.
5. **§7.5 (V-MAB2-04 (iii))**: "so no base wing carries `spans`" is placed inside the parenthesis "(no older document has
   a passage, …)", which keeps the sentence's list intact.
6. **Same-shape stale text fixed in this part** (the V-MAB2-12 / VP2-01 (2) fix at §2.6 and §10.2): §7.6's "every
   building houses its built count" becomes "every residential building houses what §4.7's generation fill gives it —
   at least one household and never above its capacity"; §7.3's canonical prior reads the as-built count "clamped into
   [1, capacity]", as §2.6 states it.
7. **Rows.** J-A20.75's index and Part A openings take the new map-event definition too; J-A31.76's Part A (the
   validator named only its index row) is restated to match, with the other derived attributes counted as six; J-A28.73's
   and J-DET-53's Part A entries each gain their reason in one sentence.

## For Fable to re-check first

* **VP2-07 against item 20 (b).** F-SITING's last rung now takes off the manifest a household S11's overflow pass cannot
  house (the validator's wording, with J-A28.46 / VP2-01 (3)). §7.7 item 2 lists "the population" among dossier-backed
  content, and the same F-SITING cell says the manifest reduction never drops a dossier-backed item. The two meet only
  when a district's residential buildings together hold fewer households than S10b placed there; the design reports
  the household with the capacities that refused it. Whether a dossier's population needs a stronger rung (no drop at
  all) is a question on the pipeline's J-A28.46, not on this lane's text. PLAUSIBLE, not tested.
* The four restated rows and the pointers to text other round-3 files add (preamble hand-off (3)).

## Verification (on scratch copies; the live files untouched)

Script `scratchpad/rd3/verify.sh` (receipts in `scratchpad/rd3/v2/`): `apply-blocks.py` on the live document
(sha256 `831efd42…`) and rationale (`f2c2a1ca…`), then `assemble-r1-handoff.py`'s `swap_restated`, then `refs.py` and
`doc_checks.py`. Every figure below is executed output (CONFIRMED).

* apply-blocks: 12 of 12 blocks applied, 0 skipped, audit 0 not-OK; headings 145 → 145; fences balanced (108 → 108);
  title block unchanged; no J-row without its Part A entry or the reverse.
* hand-off swap: 4 index rows and 4 Part A rows swapped into their older rows' places (one row per id; the rationale
  rows stay at l. 153, 480, 486, 506).
* sizes: document 12 942 → 12 965 lines (1 599 297 → 1 604 274 bytes); rationale 2 050 → 2 050 lines (440 261 →
  441 900 bytes); 24 document hunks, 4 rationale hunks, all inside §5.2–§7.7 and the four rows.
* refs.py: the same 2 baseline entries as the live document (the external §2.1.4 and RFC 7946 §3.1.6), J ids 469 on
  both — no broken reference added.
* doc_checks `--sections "5.2,5.3,6.1,6.3,7.1,7.3,7.4,7.5,7.6,7.7,Judgment calls"`: live C1 5/0, C2 0/0, C3 249/0,
  C4 2/0, S1 0/0, S2 0/0, exit 0; repaired copy C1 5/0, C2 0/0, C3 250/0, C4 2/0, S1 0/0, S2 0/0, exit 0. The first
  run raised two unreviewed C3 digit runs of this repair's own text ("of 2 6 step 3" in F-PLAN tier 2, "7 7 7 1 7 2 5 2
  5 3 4" in J-A20.75's where cell); both were reworded (departure 1), so no allow row is needed.
* The live files were never written: both hashes equal before and after the lane.

## CONFIRMED versus PLAUSIBLE

CONFIRMED: every block applies, every anchor occurred exactly once, the restated rows swap cleanly, and the reference
and document checks pass (executed, above). PLAUSIBLE: that the repaired text resolves each issue as the design means
it, and the VP2-07 / item 20 (b) reading flagged for Fable, which is judged by reading, not by a test.
