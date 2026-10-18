# handfix-b/repair-determinism-r2 — the DETERMINISM part's round-1 verify issues VDR-01 … VDR-03, repaired as blocks

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat handfix-b/repair-determinism-r2; queued in docs/FABLE-REVIEW-QUEUE.md.

PROGRESS (kill-safe ledger; a seat that continues this lane reads it first)
ITEM read: planned verify-determinism-r1 §3, verify-scope-r1 VSR-03, closing-report §2–§3, repair-determinism-r1 report, live §5.2 / §7.4 whole, J-A20.74 (index + Part A), §2.6 capacity bullet, §4.7 households, §7.3 items 1 and 4 | done (base doc e9c0b828… / rationale dcabf14b…)
ITEM compose: planned scratchpad handfix/rd2/compose.py — REPLACE §5.2, §7.4 = live subsections with count-asserted substitutions; RATIONALE-A restated J-A20.74 | done (3 blocks; block file sha256 ce62542d…, installed at docs/validation/amendments-b/handfix/repair-r2-determinism.md)
ITEM verify: planned apply-blocks.py on copies, restated-row swap, collapsed re-application, line diff, refs.py, doc_checks three-copy | done (apply 3/3, swap Part A J-A20.74, second route equal, 2 doc lines + 1 rationale line changed, refs baseline, deferral 0; doc_checks 0 added hits, exit 0: §4)
ITEM close-out: planned queue row, LANDED line | done (row A-handfix-b/repair-determinism-r2; LANDED line)
ITEM fable-continuation: planned re-read every block against the issues and the live text, correct any wrong block whole, re-run every check, close | done (the last section of this file: no correction needed, receipts re-executed on copies alone and combined, doc_checks 0 added hits; second LANDED line)

Lane `handfix-b/repair-determinism-r2`, 2026-09-27, opus standing in for the Fable seat. Base: `docs/ARCHITECTURE.md`
sha256 `e9c0b828…` (13 021 lines) and `docs/ARCHITECTURE-RATIONALE.md` sha256 `dcabf14b…` (2 053 lines), which
handfix-b/assemble-r1 installed and verify-determinism-r1 judged. This seat edits no design file. The block file is
`docs/validation/amendments-b/handfix/repair-r2-determinism.md` (blocks only, sha256 `ce62542d…`).

## Outcome

* **All three issues are fixed by the verifier's required text, applied exactly** (VDR-01, VDR-02, VDR-03 (1), (2)).
  A script checked that every old and new string is a verbatim substring of verify-determinism-r1 §3
  (whitespace-collapsed), and that each old string occurs once in its subsection or Part A row.
* **The blocks are two REPLACEs and one RATIONALE-A.** The REPLACEs cover §5.2 and §7.4; §5 and §7 have no `####`
  headings, so each is a whole `###` subsection. The RATIONALE-A block restates J-A20.74's Part A entry under its
  existing id (hand-off below). No J-ROWS block is needed: J-A20.74's index row makes no undo claim and stays as it is.
  No new judgment call is made, since each fix states a consequence of rulings already taken (VD3-04, VDH-01, VDH-04).
* **On copies, the blocks change exactly 2 lines of the document and 1 row of the rationale.** The run was
  apply-blocks.py followed by the restated-row swap. An independent route (whitespace-collapsed re-application) gives
  the same text. References match the baseline, and no deferral wording was added.

| issue | where | change (short) |
|---|---|---|
| VDR-01 | §5.2 F-EDIT, ladder cell | "the dependent events to undo first" now excludes a dossier event and an epoch that carried one; a target that one of them depends on stays as it is (§7.4's Independence) |
| VDR-02 | §7.4 Application bullet, last sentence | an edit whose capacity re-homing re-provides a dossier household's housing keeps the plots that re-provision touched in its undo record, whatever its row's undo, and its undo restores them with the households |
| VDR-03 (1), (2) | Part A J-A20.74 (restated) | the lapse's undo is limited to what §7.4 admits (an epoch that carried no dossier event), with the amendment recorded |

## 1 Reading checks behind the texts

These checks cover what the verifier's report names PLAUSIBLE, and the texts next to each fix.

* **VDR-01 and the redo case.** The ladder's row covers "an `undo` or `redo` whose target has dependent live events".
  The verifier's parenthesis reads "stays as it is", not "stays live", so it holds for both: an undo's target stays live,
  and a redo's target stays undone. §7.4's Independence says "stays live" only for the owner's undo through a chain,
  which is where that word is exact.
* **VDR-01, other texts.** §11.2's `undo` comment ("a conflict lists the dependent events") only lists them and offers
  no action, so it needs no change. §7.4's "the session may undo its own dependent events first (each its own
  `undo`)" is bounded by the Replay semantics, which refuse each such `undo` of a dossier event or an epoch that
  carried one. The ladder is the one place that offered the action, and VDR-01 closes it.
* **VDR-02, lifecycle.**
  * Persist and rebuild: the undo record is saved in the `undo` section, and a client without it rebuilds it by replay,
    which re-runs the same re-provision.
  * Redo: a redo re-applies from the stored payload on the state the undo restored, so it reproduces the same slot.
  * Independence: the re-provision's plots are in the target's touched set, so a later event on them, a dossier event
    among them, keeps the target live (with VDR-01's ladder).
  * Migrate: the record is rebuilt under the new version by the replay (§7.4's undo / redo row).
* **VDR-02 and the other texts.** §2.6's "and its undo restores them (§7.4)" refers to the households' moves, and
  still agrees. The model part owns it. §7.3 item 1 names "its joined neighbour if any"; the new sentence names "its
  joined neighbour" under the governing "the plots the re-provision touched", so the two agree. I kept the verifier's
  exact text so that the scope part's VSR-03 bar, which cites §7.4 for this undo, and the next verify round's probe both
  match it.
* **Owner rules (item 20).** VDR-02's undo moves a displaced use back to its site and the households back to their
  former building. Both are moves, never a removal (J-A20.75). The edit is a map event, not a dossier event, so it is an
  undo target, and no dossier-roster household leaves the map. VDR-01 and VDR-03 only narrow undo offers and promises
  to what §7.4 admits (item 20 (c)).
* **VDR-03, other rows.** J-A20.74's index row ("the lapse written by the lapsing event, never logged on its own") and
  J-A20.41's row and Part A entry make no undo claim, so neither changes.

## 2 How the blocks were made

`compose.py` (scratchpad `handfix/rd2/`) reads the hash-asserted base snapshots and applies the substitutions in one
pass, as repair-determinism-r1's `compose.py` did:

* **REPLACE bodies.** Each body is the live subsection with its substitution. The substitution is count-asserted and
  soft-break tolerant: a single space of a quoted string matches a space or one soft line break. The common prefix and
  suffix words keep their original separators. VDR-02's old string crosses one soft break ("so from / the restored
  state"), and that break is kept. The new text extends the bullet's last line. Nothing is re-wrapped, and every
  untouched line is byte-identical.
* **RATIONALE-A body.** J-A20.74's live Part A row, with VDR-03's two substitutions in order.

## 3 Checks (executed, on copies)

* **apply-blocks.py.** 3 blocks were found, 3 applied and 0 skipped, and the audit is 3 / 3 OK.
  * Headings stay 145 → 145, fences are balanced, and the title block is unchanged.
  * The expected notes are "DUPLICATE ID inserted: J-A20.74" and `part_a_without_j_rows: ['J-A20.74']`. The first is
    resolved by the restated-row swap. The second comes from a Part A restatement whose index row is unchanged.
* **The swap** (assemble-r1-handoff.py's `swap_restated`). In Part A, J-A20.74 moved into its old place, leaving one row
  per id. The index needed no swap.
* **The second route.** The base, whitespace-collapsed and re-edited by each change (each old string counted once),
  equals the collapsed result for both files: True.
* **The line diff.** The document changes on 2 lines, 5640 (§5.2's F-EDIT row) and 7047 (§7.4's Application bullet),
  and stays at 13 021 lines, sha256 `ddc8c938…`. The rationale changes on 1 line, 330 (J-A20.74), and stays at 2 053
  lines, sha256 `36c651cb…`. Each new text occurs once, and VDR-03's two retired strings occur 0 times.
* **References** (refs.py). The base and final results are identical: 139 headings, 35 D ids, 472 J ids, and 2 flags.
  The flags are the pre-existing outside citations `os-geometry.md` §2.1.4 and RFC 7946 §3.1.6.
* **The deferral probe** on every added text found 0 hits.
* **The live files did not change** during the lane: both hashes equalled the base at compose time and at the end
  (§4).
* **Sibling round-2 proposals.** VHM1-01 … 05, VPH1-01 … 02 and VSR-01 … 03 change §2.6, §3.4, §4.7, §8.2, §10.2,
  §13.2 and the rows J-A28.23, J-A28.26 and J-A28.46. None replaces §5.2 or §7.4, and none restates J-A20.74.

## 4 Document checks (three-copy method)

This seat edits no design file. The live document kept the base hash (`e9c0b828…`, rationale `dcabf14b…`) from the
start of the lane to its end, so the combined copy (live plus this file's blocks) is the "mine" copy:
`final-doc.md` / `final-rat.md`, the base after apply-blocks.py and the swap.

There was one corpus snapshot. Every run read 9 626 JSON files, 911 940 corpus 3-grams and 478 C4 lists. The
untouched top-level run was made first and again last, and the two gave identical output.

| keys | untouched (= live) | mine (= combined) |
|---|---|---|
| changed subsections: 5.2, 7.4 | C1 5 / C2 0 / C3 66 / C4 2 / S1 0 / S2 0, 0 unreviewed, exit 0 | the same, 0 unreviewed, exit 0 (output diff: 0 lines) |
| top-level: 5, 7 (runs 1 and 2) | C1 5 / C2 0 / C3 169 / C4 3 / S1 0 / S2 0, 0 unreviewed, exit 0 | the same, 0 unreviewed, exit 0 (output diff: 0 lines) |
| top-level 5, 7 with an empty allow file | 177 hits listed, exit 1 | the identical hit list (diff: 0 lines, line numbers included) |
| rationale (whole; `--heads` the matching document) | C3 399 (253 unreviewed) / C4 6 / S2 17, exit 1: the rationale's standing set | the identical hit list (diff: 0 lines) |

The blocks add no hit, so no allow row is needed. The rationale lies outside the allow file's regime, so its check is
a comparison of the two copies: VDR-03 adds and removes nothing.

## NOTE FOR ASSEMBLE (hand-off)

1. **Restated Part A row.** The RATIONALE-A block carries J-A20.74's Part A entry under its existing id, and
   apply-blocks.py appends it with the note "DUPLICATE ID inserted".
   * Move the appended row into the older row's place and delete the older row (`swap_restated`), so one row per id
     remains.
   * The index row is unchanged, so no J-ROWS row accompanies it. Expect the audit line
     `part_a_without_j_rows: ['J-A20.74']`.
2. **REPLACEs.** This file replaces §5.2 and §7.4, both determinism-owned. If another round-2 file replaces either
   heading, it is applied after this one (name order) and must carry these edits.
3. **Apply with VSR-03** (scope, §13.2 T28-18). Its undo clause, "its undo restoring those plots and every household
   byte-identically (§7.4 …)", is proved by the §7.4 sentence VDR-02 adds.

## 5 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed):

* the base hashes, and the live files unchanged through the lane;
* the transcription of every required text from verify-determinism-r1 §3;
* each old string once in its subsection or row;
* the apply, swap, second-route and line-diff results;
* references;
* the deferral probe;
* the document checks of §4.

**PLAUSIBLE** (reading):

* that VDR-02's one statement at the undo record's home closes the undo for every capacity-lowering row: setAttr,
  moveVertex / warp, setField, editTable, and a ladder conversion's;
* that the texts §1 left unchanged need no change;
* that the applied texts add no new defect.

## Files

* `docs/validation/amendments-b/handfix/repair-r2-determinism.md` — the block file (3 blocks).
* `docs/validation/amendments-b/handfix/repair-determinism-r2-report.md` — this report.
* Scratchpad (session-local) `handfix/rd2/`:
  * the scripts: `compose.py`, `verify.py` and its output `verify.out`, `dc.sh`;
  * the copies: `final-doc.md`, `final-rat.md`, `doc.diff`, `rat.diff`;
  * the check outputs: `refs-*.json` / `.out`, `dc-*.txt`.

## Fable continuation (2026-09-27)

Seat: Claude Fable 5.1, finishing the opus stand-in's lane after its 15:00 landing (the owner: "continue the pending work
with the appropriate task split between fable and opus"). State at this seat: the round-2 block files were NOT yet
assembled (0 `handfix-b/assemble-r2` lines in `docs/lane-events.log`), so a wrong block would have been
regenerated whole in this file, never patched into a design file. Live hashes at this seat: `docs/ARCHITECTURE.md`
`e9c0b828…`, `docs/ARCHITECTURE-RATIONALE.md` `dcabf14b…` — the base the blocks were composed on, checked
again after the last write of the lane. This seat edited no design file and changed no byte of the block file (sha256
still `ce62542d…`). Scratch: `handfix/rd2f/` under the session scratchpad (`verify.py` / `verify.out`,
`dc-A.sh` … `dc-C.sh`, `finish.py`).

### What was re-checked

* **Block 1 (REPLACE §5.2) against VDR-01 and the live §5.2** (l. 5613–5642, read whole). The block applied to a copy
  changes one line, l. 5640 (the F-EDIT row), carrying the verifier's required text verbatim; every other line of the
  subsection is byte-identical and the document keeps 13 021 lines.
* **Block 2 (REPLACE §7.4) against VDR-02 and the live §7.4** (l. 6959–7133, read whole). One changed line, l. 7047 —
  the Application bullet's last line — with the verifier's sentence appended after "reproduces the target's result
  exactly."; the soft break before "the restored state" is kept.
* **Block 3 (RATIONALE-A J-A20.74) against VDR-03 and the live row** (rationale l. 330). After the restated-row swap one
  changed line, l. 330, in its old place; the two substitutions are the verifier's (1) and (2), the two retired strings
  occur 0 times, and the index row (document l. 12789) makes no undo claim, so no J-ROWS row is needed.
* **The second route.** The base, whitespace-collapsed and re-edited by the four substitutions (each old string counted
  once), equals the collapsed final copy for both files.
* **The design reading behind each fix** — the verdicts below, on the live §7.4 read whole.
* **Sweep for other copies of the over-strong lapse-undo clause.** "restores the hold" occurs in the document at §7.4's
  rejectSite / placeAt row (l. 6986), §7.7 item 3 (l. 7405) and T20-2 (l. 10333), each already conditioned on an epoch
  that carried no dossier event; in the rationale only in J-A20.74's row. J-A20.21's row (rationale l. 372) says the
  lifecycle block must hold a lapse "for undo", which names the record, not an undo target; J-A20.41's index row and
  Part A entry write `lapsedAt` "inside the epoch's touched set" and promise no undo. No other copy.
* **Collision with the sibling round-2 files.** The six r2 files replace §2.6 (model), §3.4 (kernel), §4.7 and §10.2
  (pipeline), §5.2 and §7.4 (this file), §8.2 (rendering) and §13.2 (scope); only this file touches §5.2, §7.4 or
  J-A20.74. In the combined assembly the only §5–§7 hunks are this lane's two; pipeline r2's §4.7 hunk (l. 4676) leaves
  the re-provision sentence VDR-02 leans on (l. 4684, "S11's operator builds there a residential slot … in the same
  derivation or causing event") intact, and model r2's §2.6 hunks leave the capacity rule's re-housing clause (l. 1490,
  "a dossier roster's household is re-housed by §4.7's re-provision") intact.

### Verdicts on the queue row's "check first" items

| item | verdict | evidence |
|---|---|---|
| VDR-02: does one sentence at the undo record's home close the re-provision undo for every capacity-lowering row? | yes | §7.4's Application bullet is where every event's undo record is defined ("Every committed event keeps an undo record …"); a row's undo cell only names what its record holds besides. The sentence is kind-agnostic ("An edit whose capacity re-homing re-provides …") and says "whatever its row's undo", so it reaches setAttr's inverse (l. 6977), moveVertex / warp's record (l. 6978), setField's re-run on the stroke's region (l. 6993), editTable's restored entities (l. 6994), a ladder conversion's record in the convert row (l. 6983) and a regeneration's, whose effective scope already holds those plots (§7.3 item 1). Lifecycle: the record is saved in the `undo` section and rebuilt by a replay that re-runs the same `dossier` request; a redo re-applies from the stored payload with the confirmed fates, the slot and its displacements among them (§7.3 item 4); a migrated target's record is rebuilt under the new version (the undo / redo row). |
| VDR-02: is moving a displaced dossier-backed use back on undo within item 20 (a move, never a removal)? | yes | The undo moves the households back to their former building and a displaced use back to its former site — moves, which J-A20.75 keeps allowed ("a move (`relocateUse`, `swapUse`) is a map edit and stays allowed"); the residential slot is un-built only after its households have left it, so no dossier-backed element is removed or re-designated (item 20 (c)), none leaves the map (item 20 (b)) and the roster's housing stays provided (item 20 (e)); where a later dossier event depends on those plots, Independence refuses the undo, so the rollback never crosses a dossier instruction. The fix also removes what the defect left behind — an empty residential building, which §4.7 forbids ("never an empty residential building"). |
| VDR-01: "stays as it is" for the redo case | right | Independence (l. 7053): "A `redo` is checked the same way against the live events after its undo." A redo's target is undone; where a dependent live event after its undo is a dossier event or an epoch that carried one, that event cannot be undone first, so the target stays undone — for an undo it stays live. The verifier's neutral phrase is exact for both, where Independence's own "stays live" is exact for the undo only. §11.2's `undo` comment (l. 9283, "a conflict lists the dependent events") offers no action and needs no change. |
| applied together with scope's VSR-03 (T28-18) | holds | `repair-r2-scope.md`'s T28-18 ends "and its undo restoring those plots and every household byte-identically (§7.4; §2.6's capacity rule; the re-homing clause)"; in the combined assembly that clause occurs once and §7.4's new sentence is the text it cites; both files land in one assembly (name order: determinism before scope). |

### Corrections to the block file

None. All three blocks are right and complete against VDR-01, VDR-02 and VDR-03 and the live text, so none was
regenerated.

JUDGMENT: kept the verifier's VDR-02 sentence verbatim — "its joined neighbour" without §7.3 item 1's "if any" — over a
re-worded one, because the governing phrase "the plots the re-provision touched" already makes each member conditional,
the scope part's T28-18 and the next verify round's probe match this exact text, and a re-wording would re-open both —
say "veto" to flip it (one REPLACE of §7.4 in this file, before assemble-r2).

### Receipts re-executed (`handfix/rd2f/verify.py`, output `verify.out`)

* **Alone** (this file only): 3 of 3 applied, audit not-OK 0; swap Part A {J-A20.74}, index none; the J-A20.74 Part A
  row stays at l. 330; probes: the four new texts once each, VDR-03's two retired strings 0 (VDR-01's and VDR-02's old
  strings remain once, as prefixes of their new texts); hunks: document l. 5640 and l. 7047 only (13 021 lines, sha256
  `ddc8c938…`), rationale l. 330 only (2 053 lines, sha256 `36c651cb…`) — the stand-in's figures exactly; second route
  equal for both files.
* **Combined with all six r2 files as they stand now** — determinism `ce62542d…`, kernel `3362e9c9…`, model `fa0154b9…`
  (changed since the stand-in's run), pipeline `ffbe0d87…`, rendering `69a226bd…`, scope `04d0945c…`: 14 of 14
  applied, audit not-OK 0; swaps index {J-A28.23, J-A28.26, J-A28.46}, Part A {J-A20.74, J-A28.23, J-A28.26, J-A28.34,
  J-A28.46}; headings 145 → 145, fences balanced, title block unchanged; 23 document hunks and 5 rationale hunks, of
  which the only ones in §5–§7 are l. 5640 and l. 7047; T28-18's undo clause once; J-A20.74 one index row and one Part A
  row.
* **References** (`refs.py`) on live, alone and combined: headings 139, D ids 35, J ids 472, broken 2 — the pre-existing
  outside citations `os-geometry.md` §2.1.4 and RFC 7946 §3.1.6.
* **The deferral probe** over the four added texts: 0 hits. The live files equalled the base at the start and at the end
  of the lane.
* **Document checks** (`doc_checks.py`; one corpus snapshot):

| copy | C1 | C2 | C3 | C4 | S1 | S2 | unreviewed | exit |
|---|---|---|---|---|---|---|---|---|
| top-level 5, 7 — untouched (live), run 1 | 5 | 0 | 169 | 3 | 0 | 0 | 0 | 0 |
| top-level 5, 7 — alone (this file's final copy) | 5 | 0 | 169 | 3 | 0 | 0 | 0 | 0 |
| top-level 5, 7 — combined (six-file final copy) | 5 | 0 | 169 | 3 | 0 | 0 | 0 | 0 |
| top-level 5, 7 — untouched, run 2 (after the others) | 5 | 0 | 169 | 3 | 0 | 0 | 0 | 0 |
| subsections 5.2, 7.4 — untouched | 5 | 0 | 66 | 2 | 0 | 0 | 0 | 0 |
| subsections 5.2, 7.4 — alone | 5 | 0 | 66 | 2 | 0 | 0 | 0 | 0 |
| subsections 5.2, 7.4 — combined | 5 | 0 | 66 | 2 | 0 | 0 | 0 | 0 |
| top-level 5, 7 with an empty allow file — untouched | 5 | 0 | 169 | 3 | 0 | 0 | 177 | 1 |
| top-level 5, 7 with an empty allow file — alone | 5 | 0 | 169 | 3 | 0 | 0 | 177 | 1 |
| rationale whole (`--heads` the matching document) — untouched | 0 | 0 | 399 | 6 | 0 | 17 | 274 | 1 |
| rationale whole — alone | 0 | 0 | 399 | 6 | 0 | 17 | 274 | 1 |
| rationale whole — combined | 0 | 0 | 403 | 6 | 0 | 17 | 278 | 1 |

  The two untouched top-level runs are identical, so the corpus held still (9626 JSON files, 911940 C3 3-grams, 478 C4 lists).
  Alone against untouched: the same counts on every key, and the hit lists are identical — with the empty allow file the 177 raw hits agree byte for byte, line numbers included (the document keeps its 13 021 lines); the rationale's 274 standing unreviewed lines agree after line-number normalisation (alone adds 0, lacks 0). So this file's blocks add 0 hits and need no allow row.
  Combined against untouched (the sibling files' changes included; line numbers normalised): document top-level adds 0, subsections add 0, rationale adds 5 — the rationale's differences, if any, are the sibling rows J-A28.23, J-A28.26, J-A28.34 and J-A28.46, the model, kernel and pipeline seats' own.

### CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed): the block bodies' identity with the live text except at the three required changes; the alone
and combined assemblies, the swaps, the probes, the second route, the references and the document checks as tabulated;
the sweep for other copies of the lapse-undo clause; the live hashes unchanged through the lane.
**PLAUSIBLE** (reasoning on the text, no executable model): the four verdicts above — that the Application sentence
reaches every row, the item 20 reading, the redo reading and the T28-18 pairing; how often a capacity-lowering hand edit
reaches the re-provision on a dossier map.

The queue row `A-handfix-b/repair-determinism-r2` exists (docs/FABLE-REVIEW-QUEUE.md l. 250) and is left for
workflows/05; its "check first" items are the four verdicts above. The PENDING line stays. A seat that finds this
section already present treats the lane as finished (the RESUME rule).
