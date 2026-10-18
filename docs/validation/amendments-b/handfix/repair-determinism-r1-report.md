# handfix-b/repair-determinism-r1 — the DETERMINISM part's hand-fix issues VDH-01, VDH-03 … VDH-06, repaired as blocks

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat handfix-b/repair-determinism-r1; queued in docs/FABLE-REVIEW-QUEUE.md.

PROGRESS (kill-safe ledger; a seat that continues this lane reads it first)
ITEM read: planned verify-determinism-r0 §3, closing-report §2–§3, sibling verify-*-r0 reports, live §5.2 / §6.3 / §7.3 / §7.4 / §7.7, J-A28.73, §2.6 capacity bullet, §4.7 households paragraph | done (base doc 5d752c9b… / rationale 61477508…)
ITEM compose: planned scratchpad handfix/rd1/compose.py — REPLACE bodies = live subsections with count-asserted substitutions; J-ROWS restated J-A28.73 | done (6 blocks: REPLACE §5.2, §6.3, §7.3, §7.4, §7.7; J-ROWS; block file sha256 ec937979…)
ITEM verify: planned apply-blocks.py on copies, restated-row swap, collapsed re-application, line diff, refs.py, doc_checks three-copy | done (apply 6/6, swap 1, collapsed re-application equal, 11 lines changed, refs baseline; doc_checks 0 new hits, exit 0: §4)
ITEM close-out: planned queue row, LANDED line | done (row A-handfix-b/repair-determinism-r1; LANDED line)

Lane `handfix-b/repair-determinism-r1`, 2026-09-27, opus standing in for the Fable seat. Base: `docs/ARCHITECTURE.md`
sha256 `5d752c9b…` and `docs/ARCHITECTURE-RATIONALE.md` sha256 `61477508…` (handfix-b/apply's output, the state
verify-determinism-r0 judged). This seat edits no design file. The block file is
`docs/validation/amendments-b/handfix/repair-r1-determinism.md` (blocks only).

## Outcome

* **All five determinism issues are fixed by the verifier's required text, applied exactly** (VDH-01 (1)–(4), VDH-03,
  VDH-04 (1)–(2), VDH-05, VDH-06). Every old and new string was checked, by script, to be a verbatim substring of
  verify-determinism-r0 §3. Each old string occurs once in its subsection.
* **VDH-01 is closed in two more places, which the verifier's list missed** (sub-changes (5) and (6), this seat's).
  Both texts still promised the ordinary undo of a lapsing dossier event (details below). They are in the same part
  and carry the same claim: VD3-04's rule is not yet stated everywhere. No new ruling is made; the rule is J-A22.76's,
  and §7.4's Replay semantics states it.
* **The blocks are five REPLACEs and one J-ROWS.** The REPLACEs cover §5.2, §6.3, §7.3, §7.4 and §7.7; §5–§7 have no
  `####` headings, so each block is a whole `###` subsection. The J-ROWS block restates J-A28.73's index row (hand-off
  below). No RATIONALE-A block is needed: J-A28.73's Part A already records VD3-09's ruling, and no new id is made.
* **Applied to copies, the blocks change exactly 11 lines of the document and nothing in the rationale.** The run was
  apply-blocks.py followed by the restated-row swap. An independent route (whitespace-collapsed re-application) gives
  the same text. References match the baseline, and there is no deferral wording.

| issue | where | change (short) |
|---|---|---|
| VDH-01 (1) | §7.4 Replay semantics | the refused dossier event's F-EDIT offers `rejectSite` / `placeAt` for each dossier element it placed or re-designated; a dossier `unassign` leaves none to offer |
| VDH-01 (2) | §7.4 assign / unassign row, undo | the inverse mutation applies only to an event that is neither `creation` nor dossier |
| VDH-01 (3) | §7.4 Independence | an owner's undo through a chain never passes a dossier event or an epoch that carried one, so a target one of them depends on stays live |
| VDH-01 (4) | §5.2 F-EDIT ladder | the offered actions for an `undo` of a later dossier event, or of an epoch that carried one |
| VDH-01 (5) (this seat) | §7.4 rejectSite / placeAt row, undo | "an undo of the lapsing event restores the hold" is limited to a lapsing epoch that carried no dossier event; an `undo` naming a lapsing dossier event, or an epoch that carried one, returns F-EDIT |
| VDH-01 (6) (this seat) | §7.7 item 3 | "so its undo restores the hold" gets the same limit, pointing to §7.4 |
| VDH-03 | §7.4 setField (brush) row, undo | the households §2.6's capacity rule re-homed are restored to their former buildings from the undo record |
| VDH-04 (1) | §7.3 item 1 | a capacity-lowering edit's scope holds the plots a dossier household's re-provision touches (site, joined neighbour, displaced uses' new sites), bounded as a dossier event's scope is |
| VDH-04 (2) | §7.3 item 4 | the fate report lists the uses the re-provision displaces and the plots it joins |
| VDH-05 | §6.3 JOIN and SPLIT | "every other part — two where the record spans a whole interior stretch — takes an address …" |
| VDH-06 | J-A28.73 index row | an anchor whose filtered order is exhausted is "taken by tier 6 (reported, the building flagged)" |

## 1 The two added sub-changes (VDH-01 (5), (6))

**Why.** VDH-01's claim is that VD3-04's rule — a later dossier event, and an epoch that carried one, is no undo target
— is not closed where texts still give such an event the ordinary undo. Two more such texts exist. Both are in §7.4
and §7.7, which are this part's:

* the rejectSite / placeAt row's undo cell: "an undo of the lapsing event restores the hold";
* §7.7 item 3, the lapse rule's home: "so its undo restores the hold".

The lapsing event is "the first `epoch` … whose `populationTarget` differs … or … the first dossier event … whose
effective scope holds the site's block" (§7.7 item 3). So in the dossier-event case, and for an epoch that carried
one, the promised undo is refused by §7.4's Replay semantics.

The scope lane's VDH-02 rewords T20-2 to "an undo of a lapsing epoch that carried no dossier event restores the hold,
while an `undo` naming a lapsing dossier event returns F-EDIT (§7.4)". Its text is present in
`handfix/repair-r1-scope.md`. Without (5) and (6), T20-2 would cite a §7.4 row that still says the opposite.

**Texts.**

* (5) §7.4 rejectSite / placeAt row, undo cell. Replace "an undo of the lapsing event restores the hold" (once in §7.4;
  the other occurrence is T20-2, the scope lane's) with "an undo of a lapsing epoch that carried no dossier event
  restores the hold, while an `undo` naming a lapsing dossier event, or an epoch that carried one, returns F-EDIT
  (Replay semantics, above)".
* (6) §7.7 item 3. Replace "so its undo restores the hold and no event is logged for the lapse (J-A20.74, with
  J-A20.41)." with "so no event is logged for the lapse, and an undo of a lapsing epoch that carried no dossier event
  restores the hold (a dossier event, or an epoch that carried one, is no undo target: §7.4; J-A20.74, with
  J-A20.41).".

**Read and left unchanged (PLAUSIBLE, for Fable to re-check).**

* J-A20.74's Part A still says the lapse is written "inside its own touched set so that its undo restores the hold".
  I read it as the reason the lapse lives in the lapsing event's record, which stays exact wherever §7.4 admits the
  undo. It is the history of a call, not the normative home, and the admitted set is recorded at J-A22.76 and in §7.4.
  Restating it would add a Part A swap for no change of meaning.
* §7.4's epoch row undo cell gives only the record ("the faces and entities it replaced"). It promises no undo, so
  it does not contradict the refusal.
* §11.3's M3a test ("one owner undo through a chain among them") can pick a chain without dossier events. That section
  is not this part's.

## 2 How the blocks were made

`compose.py` (scratchpad `handfix/rd1/`) reads the base snapshot, which is hash-asserted. For each REPLACE it takes the
live subsection and applies the substitutions in one pass:

* **Count-asserted.** Each old string must occur exactly once in its subsection.
* **Soft-break tolerant.** A single space of a quoted string matches a space, or one soft line break with its
  indentation.
* **Soft breaks kept.** The common word prefix and suffix keep their original separators, so every soft break outside
  the changed words stays. Only VDH-01 (3) crossed one ("an owner may / undo through a chain."), and that break is
  kept.

Every untouched line is byte-identical. Lines grow where text is added, as the hand-fix apply did; nothing is
re-wrapped.

The J-ROWS body is J-A28.73's live index row with the one substitution.

## 3 Checks (executed, on copies)

* **apply-blocks.py.** 6 blocks found, 6 applied, 0 skipped; audit 6 / 6 OK. Headings 145 → 145, fences balanced, title
  block unchanged. The one note is the expected "DUPLICATE ID inserted: J-A28.73", which the restated-row swap resolves.
* **Swap** (assemble-r1-handoff.py's `swap_restated`). Index: J-A28.73 moved into its old place, one row per id. Part
  A: none. The rationale is byte-identical to the base.
* **Second route.** The base, whitespace-collapsed, re-edited by each change (old counted once), equals the collapsed
  result: True.
* **Line diff.** Base against final changes 11 lines, each one carrying a required text: 5641, 6202, 6694, 6887, 6971,
  6986, 6987, 6994, 7054, 7406 and J-A28.73's row, 12966, which is replaced in place. Final document sha256 `da595b5d…`, 13 021
  lines.
* **References** (refs.py). Base and final are identical: 139 headings, 35 D ids, 471 J ids, and 2 flags, which are the
  pre-existing outside citations (`os-geometry.md` §2.1.4, RFC 7946 §3.1.6).
* **Deferral probe** on every added text: 0 hits.
* **Sibling block files.** `repair-r1-pipeline.md` replaces §10.2, §10.3 and II.6; `repair-r1-scope.md` replaces §13.1
  and §13.2. There is no heading overlap with this file, and no other file restates J-A28.73.

## 4 Document checks (three-copy method)

This seat edits no design file, and the live document kept the base hash (`5d752c9b…`) throughout, so the combined
copy (live + this file's blocks) is the "mine" copy: `final-doc.md`, the base after apply-blocks.py and the swap.
There was one corpus snapshot: the untouched copy was run before and after "mine" for each key set, with identical
counts, so the corpus held still.

| keys | untouched (= live), run before and after | mine (= combined) |
|---|---|---|
| changed subsections: 5.2, 6.3, 7.3, 7.4, 7.7, Judgment calls | C1 5 / C2 0 / C3 179 / C4 2 / S1 0 / S2 0, 0 unreviewed, exit 0 | the same counts, 0 unreviewed, exit 0 |
| top-level: 5, 6, 7, Judgment calls | C1 5 / C2 0 / C3 301 / C4 3 / S1 0 / S2 0, 0 unreviewed, exit 0 | the same counts, 0 unreviewed, exit 0 |

The blocks add no hit, and no allow row is needed. The reports of the two copies are identical apart from the WARN
lines and the path line (diff: 0 lines).

## NOTE FOR ASSEMBLE (hand-off)

1. **Restated row.** The J-ROWS block carries J-A28.73's index row under its existing id. apply-blocks.py appends it and
   notes "DUPLICATE ID inserted". Move the appended row into the older row's place and delete the older row
   (assemble-r1-handoff.py's `swap_restated`), so one row per id remains. There is no Part A change and no new id.
2. **REPLACEs.** This file replaces §5.2, §6.3, §7.3, §7.4 and §7.7 (determinism-owned). If another file replaces one of
   these headings, it is applied after this one (name order) and must carry these edits.
3. **Apply with VDH-02** (scope, T20-2, `repair-r1-scope.md`). VDH-01 (5) and (6) state the §7.4 and §7.7 rule that
   T20-2's new text cites.

## 5 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed): the base hashes; the transcription of every required text; each old string once in its
subsection; the apply, swap, second-route and line-diff results; references; the deferral probe; the document checks
of §4.

**PLAUSIBLE** (reading): that sub-changes (5) and (6) are needed and complete; that J-A20.74's Part A, §7.4's epoch row
and §11.3's test need no change; that the applied texts add no new defect.

## Files

* `docs/validation/amendments-b/handfix/repair-r1-determinism.md` — the block file (6 blocks).
* `docs/validation/amendments-b/handfix/repair-determinism-r1-report.md` — this report.
* Scratchpad (session-local) `handfix/rd1/`: `compose.py`, `verify.py`, `verify.out`, `final-doc.md`, `dc-*.txt`.
