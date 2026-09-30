# repair-determinism-r2 — lane amendments-b/repair-determinism-r2 (repair round 2, DETERMINISM part: §5, §6, §7)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat amendments-b/repair-determinism-r2; queued in docs/FABLE-REVIEW-QUEUE.md.

> PROGRESS (kill-safe ledger; one line per block — planned | done). The block file is
> `docs/validation/amendments-b/repair-r2-determinism.md` (blocks only); this file is the lane's report.
> Base: docs/ARCHITECTURE.md sha256 365e19f24743c88a… and docs/ARCHITECTURE-RATIONALE.md sha256 50a94f2d6fca8b86…
> (assemble-r1's output). Generator: scratchpad rd2/compose.py over rd2/specs/*.py and rd2/rows.py (each REPLACE body = the live subsection
> with asserted single-occurrence substitutions, every untouched line verbatim); the block file is re-composed
> atomically after each spec, ending in "=== END ===".
> BLOCK 01 §5.2 (VK1-02, VP1-11 + VD1-05, VD1-02, VD1-08, VS1-08): planned | done: REPLACE block written (7 edits)
> BLOCK 02 §5.3 (V-MAB1-10, VD1-01, VD1-08 dossier row): planned | done: REPLACE block written (5 edits)
> BLOCK 03 §6.1 (VK1-07, VD1-06): planned | done: REPLACE block written (2 edits)
> BLOCK 04 §6.3 (VD1-04): planned | done: REPLACE block written (1 edit)
> BLOCK 05 §7.1 (VD1-02, VD1-06, VD1-08, VD1-09, VD1-11, VD1-12): planned | done: REPLACE block written (11 edits)
> BLOCK 05b §7.2 (VD1-08 protection bullet — added: §7.2 restated the old partial list): planned | done: REPLACE block written (1 edit)
> BLOCK 06 §7.4 (VD1-02, VP1-03 + VD1-07, VD1-11): planned | done: REPLACE block written (5 edits)
> BLOCK 07 §7.5 (V-MAB1-15 + VD1-10): planned | done: REPLACE block written (3 edits)
> BLOCK 08 §7.6 (VP1-17 + VD1-13): planned | done: REPLACE block written (2 edits)
> BLOCK 09 §7.7 (VP1-11 + VD1-05, VD1-08, VD1-12): planned | done: REPLACE block written (3 edits)
> J-ROWS + RATIONALE-A (restated J-A31.75, J-A22.74, J-DET-2, J-DET-53, J-A31.71, J-A20.75, J-A12.71; new J-A28.73, J-A22.76): planned | done: J-ROWS (9) + RATIONALE-A (9) blocks written

## Outcome

The 19 issues assigned to this lane are all answered in `docs/validation/amendments-b/repair-r2-determinism.md`, which
has 12 blocks: 10 REPLACE blocks (§5.2, §5.3, §6.1, §6.3, §7.1, §7.2, §7.4, §7.5, §7.6, §7.7), one J-ROWS block and one
RATIONALE-A block. Overlapping issues were merged: VP1-11 with VD1-05, VP1-03 with VD1-07, VP1-17 with VD1-13, and
V-MAB1-15 with VD1-10. §5–§7 have no `####` headings, so each block covers a whole `###` subsection. Each REPLACE body
is the live subsection (sha256 `365e19f2…`) with count-asserted substitutions, and every untouched line is
byte-identical. §7.2 is replaced as well, because its protection bullet repeated the old, partial VD1-08 list.

| issue | section | fix (short) |
|---|---|---|
| VK1-02 | §5.2 F-PLAN | tier 2 answers an arena refusal by the ring refused: a kept room leaves the kept set (address re-matched, §6.3); a stair bay or chimney stack is re-placed at its next `attempt`; a seed ring, the passage room or a composer's room is the guaranteed shell, so its refusal is a bug that aborts the rung (J-A28.73, new) |
| VK1-07 | §6.1 | the stage-3 rungs' streams (`plan.*` and the composition's concerns) carry S11's stage id (for an underground building, the underground stage's S11 run, II.7.3); a transient arena's batches carry the same id (§3.3) |
| VS1-08 | §5.2 F-PLAN test | "every household of the building (`Building.households`, §2.6)" |
| V-MAB1-10 | §5.3 interior-ladder row | the shell's leaf digest is read with the `composition`-role vertices a stored plan's re-cut adds removed (§2.6, J-P48 (1)); the check cell says the same |
| VD1-01 | §5.3 epoch row; J-A31.75 | the verifier's invariant cell and check cell, which add rung 1's yard buildings, every other `ConversionOp` (`wallToWay` and `contractWall` included) and the growth step's builds, `demolish` and corridor re-cuts |
| VP1-11, VD1-05 | §5.2 F-SITING; §7.7 precedence | "its first closest option — fewest hard rows failed, then best score, in §4.7 S10b's order —" |
| VD1-02 | §7.4 read-ahead and Targets; §7.1 `creation` and `revert`; §5.2 F-EDIT; J-A22.74 | a `creation` event is never an `undo`, `redo` or `revert` target and is never truncated; an `undo(h, of)` naming it returns F-EDIT offering `unassign` (a blueprint assignment) or `rejectSite` / `placeAt` (a dossier element) |
| VD1-04 | §6.3; J-DET-2 | "only a re-derivation takes a fresh one", with the list of re-derived scopes taken from the succession rule |
| VD1-06 | §6.1 Enter; §7.1; J-DET-53 | Enter keeps the dossier: one `creation` `assign` per live dossier-backed assignment, without `placed`, `target` or `use`; rejections and positive placements are not carried |
| VP1-03, VD1-07 | §7.4 `builtBand` row; J-A31.71 | the create cell is the pointer alone; the regenerate cell says an epoch writes the band only through §4.11's writers (rung 3, rung 2's rear plots, an upward refurbishment) and a standing plot's band is lowered only by rung 3 |
| VD1-08 | §7.7 item 2 (the home list); §5.2, §7.1, §7.2 (pointers); §5.3 dossier row; J-A20.75 | refused: any map event that would close, remove or re-designate a dossier-backed element — `unassign`, a `setAttr` of use or class, `closeUse`, `mutate`, the emptying and removing conversions, and a `join` / `split` whose fate demolishes the building; a move stays allowed |
| VD1-09 | §7.1 edit targets | declared derived: `formerUses`, `predecessor`, `builtProsperity`, `Enceinte.supersededBy`, `LandUse.reclaimed` |
| V-MAB1-15, VD1-10 | §7.5 transforms | the lead gains items 11, 12 and 30; `nextEntrance`; `households` from `Household.building`, with `occupants` dropped; `condition`, `reusedAs`, `reach`, `exposure` and `knownTo`; a tunnel's `headroomCm` and `navigable`; `Passage` is never invented |
| VD1-11 | §7.1 `placeAccess` and tunnels row; §7.4 row; J-A12.71 | the tunnel end moves by `moveVertex`; the opening moves by `setAttr` on `ground.at` (re-hosted by `pointLocate`, refused outside II.7.3's admitted ground); the undo keeps the former `ground.at` and `host` |
| VD1-12 | §7.7 item 6; §7.1 `seq`; J-A22.76 (new) | carried events take their `seq` when the epoch is appended (the epoch's first, then theirs in host order); they fold inside the epoch, are undone with it, are never undo targets alone, and keep their `seq` when re-appended |
| VP1-17, VD1-13 | §7.6 | "site plans" is removed (J-A19.41), and `RosterTables.basementGate` is named |

## Rulings recorded (vetoable)

* **New.** J-A28.73 records the kernel verifier's requested determinism row for VK1-02. J-A22.76 records VD1-12's
  numbering choice.
* **Restated, same ids.** J-A31.75, J-A22.74, J-DET-2, J-DET-53 (an amendment note; the Part A text is otherwise
  kept), J-A31.71, J-A20.75 and J-A12.71.
* **Assembler hand-off (1).** The block file's preamble carries it. The restated rows reuse their ids, so
  `assemble-r1-handoff.py` step 1 swaps each one into place.

## Where this repair departs from the verifiers' wording

* **VK1-02.**
  * *Placement.* The answer sits inside tier 2's list, between "slide a cut to its neighbour's minimum" and "swap two
    rooms' storeys". Two runs the allow file already reviews stay intact, and a refusal happens at the arena's open,
    so no other repair can come before it.
  * *Composer's rooms.* The passage room and composer's rooms go to the abort clause. They are fixed rings, so a
    split by detail name would have treated a refused passage room as a kept room.
  * *Wording.* "On its wall" became "onto the side it came near". The row otherwise tripped C4.
* **VD1-08.** The full list is stated once, at its home in §7.7 item 2 (rule 1). §5.2, §7.1 and §7.2 point to "§7.7
  item 2's list" instead of repeating it three times. The list also covers `vacate`, `abandon` and `decay`, which empty
  the building, and a `join` / `split` whose confirmed fate would demolish it. It states that a `relocateUse` or
  `swapUse` move is not refused, as §7.2 already implies ("its position is not held").
* **VD1-02.** For a dossier element the refused undo offers `rejectSite` / `placeAt`, because offering `unassign` would
  itself be refused. §7.4's Targets bullet and §7.1's `revert` comment now exclude `creation` events, so neither
  contradicts the new rule.
* **VD1-06.** The copied assignment drops `target` and `use` as well as `placed`, because all three name old-town
  entities. §7.1's "Same kind, new seed" now names the dossier.
* **VD1-10 with V-MAB1-15.** The `households` clause is placed before the stored-plan clause, because the room-unit
  derivation reads it. An institution's optional `knownTo` stays absent (it defaults at read, §2.7).
* **VD1-04.** The re-derived scopes are named with the succession rule's own list ("a local operator of §7.3", "what an
  epoch re-derives").
* **J-A20.75 and J-A22.74, where cells.** Their original section lists are kept, so the reviewed doc-check digit rows
  stay valid. The entries' own text names §5.2 and §5.3.

## Cross-part dependencies (other lanes' text; nothing here edits it)

* **Pipeline.** VD1-03: rung 1 must lose a roof only through `decay`, or §5.3's epoch row has no event to match it.
  `repair-r2-pipeline.md` carries "roof is lost only by the …". VD1-14 (`thin … infill` re-homes first) and VP1-10
  (S10b's order, which the gloss above matches) are also the pipeline's.
* **Scope.** T31-9 (VD1-18 / VS1-09) should match §5.3's new list. T28-13 (VS1-07) and T28-14 (V-MAB1-11) are also
  the scope lane's.
* **Model.** V-MAB1-09 adds §2.6's sentence that §5.3's interior-ladder row cites.

## Receipts (executed 2026-09-27)

* **apply-blocks.py on scratch copies.** Of 12 blocks, 12 were applied and 0 skipped, with audit not-OK 0. Headings
  stay 145 → 145, fences stay 108 → 108 and balanced, the title block is unchanged, and the document still has 0
  PENDING FABLE REVIEW lines. The J ids match the Part A ids.
* **Hand-off (1).** The step-1 swap moved 7 restated rows in the index and 7 in Part A.
* **Output size.** The document grows from 12 793 to 12 835 lines; the rationale file from 2 040 to 2 049. The diff
  touches only the lines listed per issue.
* **refs.py.** It reports 461 J ids (459 before plus 2 new) and 2 broken references. Both are the pre-existing external
  citations, identical to the live document.
* **doc_checks.py --sections "5,6,7,Judgment calls" with the current allow file.** It exits 0:

  | check | hits | unreviewed |
  |---|---|---|
  | C1 | 5 | 0 |
  | C2 | 0 | 0 |
  | C3 | 300 | 0 |
  | C4 | 2 | 0 |
  | S1 | 0 | 0 |
  | S2 | 0 | 0 |

  These are the live document's own counts. **No allow row is needed.** Ten C3 runs and one C4 line from earlier
  wording were reworded, not allowed.
* **Trial apply of all round-2 files.** Applied together with `repair-r2-kernel.md`, `-model.md` and `-pipeline.md` as
  they stood at 08:05, 38 of 38 blocks applied and audit not-OK was 0. No other round-2 file writes §5–§7, and no J id
  is restated by two files.
* **Block file.** sha256 prefix `a2dec8c605b012ed`, 13 "=== " lines, ending in `=== END ===`.
* **Live files.** `docs/ARCHITECTURE.md` and the rationale file are unchanged by this lane.

## CONFIRMED versus PLAUSIBLE

* **CONFIRMED (executed).** Every substitution matched exactly once in the live text. The application, audit,
  reference and document-check counts above were run.
* **PLAUSIBLE (reasoning; nothing is built).**
  * VD1-01's list is now complete for every step §4.11 defines.
  * The tier-2 refusal answers resolve every refusal that correct code can produce.
  * The seq scheme keeps truncation identity for an epoch that carries dossier events.
  * Enter's dossier copy satisfies items 20 (b) and 22 (d) with no other host input.

## What Fable should re-check first

1. J-A28.73: whether a refused kept room should instead abort, and whether the passage room and composer's rooms belong
   in the abort clause.
2. J-A20.75's widened list: the emptying conversions and the demolishing `join` / `split` are refused, while moves are
   allowed.
3. VD1-01's epoch list against §4.11 once pipeline r2 lands, especially rung 1's roof.
4. J-A22.76's numbering and J-A22.74's refusal to undo creation events.

STATUS: COMPLETE (2026-09-27).
