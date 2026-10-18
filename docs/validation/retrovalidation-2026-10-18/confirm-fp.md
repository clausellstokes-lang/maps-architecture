# confirm-fp — the confirming check on apply-fp (2026-10-18)

> Lane retrovalidation/confirm-fp (Fable/high; J392). Checked: `docs/validation/retrovalidation-2026-10-18/apply-fp.md`
> (126 lines, read whole) against `fp.verdict.json` (519 lines, read whole: 55 corrections, 21 rulings, the
> `notice_replacement`), `research/sf/fp-simulator.md` (1,098 lines, read whole) and
> `research/sf/fp-physical-integration.md` (493 lines, read whole). Every check below was run by me, not taken from
> the apply record. Scratch: `/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/retro/corrections-check.txt`
> (all 55 old/new pairs with their counts and current lines) and `…/retro/confirm-fp/` (the reversed files).

**Verdict: PASS.** All 55 corrections landed as the verdict specifies; both notice lines carry the verdict's line
exactly; the simulator note round-trips to its pre-edit md5; the physical note's round trip is proved for the 33
fragments and cannot be re-run only for its line 3 (§3); the bundle is fresh. Three residuals are recorded in §6, none
of them an apply-fp defect.

## 1 The 55 corrections

Method: for every correction, count `old` and `new` in the current file (`str.count`), locate `new`'s line.

* Every `old` text: 0 occurrences in its file (55/55). Every `new` text: exactly 1 occurrence (55/55).
* Kinds: 55 × "research"; files: 22 → fp-simulator.md (indices 0–21), 33 → fp-physical-integration.md (22–54). No
  "design", no "record", none on docs/PROGRESS.md — the apply record's §1 pre-check is right.
* The line each `new` sits on today matches the apply record's table line for line (all 55: 869, 291, 346, 360, 148,
  103, 646, 673, 624, 199, 446, 515, 699, 187, 8, 467, 738, 1090, 918, 713, 86, 285; 356, 159, 15, 73, 15, 146, 170,
  124, 103, 15, 137, 137, 101, 319, 263, 365, 280, 362, 36, 175, 23, 23, 25, 472, 317, 340, 308, 7, 21, 346, 38, 57,
  36). No fragment spans a newline; both line counts are unchanged (1,098 / 493).
* The four dated brackets went in verbatim (#18 at simulator 918; #43 at physical 23, #51 at 346, #52 at 38), and #44
  (physical 25) now records the drafted 62 / 34 / 16 / 12 that #43 replaced — as the verdict's reasons FV-26/FV-27
  require.
* Read in context (both notes whole): no replacement broke a sentence, a table row or a citation; the corrected
  passages read as the verdict's reasons intend (e.g. simulator §5 consequence (3) now distinguishes mid-route
  positions from hearings; physical §1's implication paragraph now matches §8's 30/17/7/26 and the A1/A2 bracket).

## 2 The notice lines

* `fp-simulator.md:3` and `fp-physical-integration.md:3` are byte-identical to `notice_replacement`:
  "> Fable-reviewed 2026-10-18: PASS-WITH-CORRECTIONS — the laws and the 80-row ledger hold; counts, citations, tags
  and seven readings corrected in place (lane retrovalidation/fp; J392)".
* `grep -c "PENDING FABLE REVIEW"` = 0 in both files. The only other "Fable-reviewed" strings in the two files are the
  four dated brackets above.
* The physical note's adjustment is right. Its J375 notice did not begin with the task's prefix (the note was drafted
  by Fable 5.1 and assembled §2.11–§9 by Opus 5.5 after the Fable limit — lane-events.log:9527 says so). J375 covers
  "every file an Opus seat writes or edits", the verdict read this note whole and its replacement line names this
  note's 80-row ledger, so the same replacement is the intended correction. Recorded in apply-fp.md §3.
* `research/sf/fp-realm-review.md` is the realm family's (realm.verdict.json carries its 25 corrections); leaving it
  alone was right.

## 3 Nothing else moved — the round trip

* **fp-simulator.md — reproduced exactly.** Reversing the 22 fragments (new → old, last first) and replacing line 3
  by the J375 template with the seat name the lane log gives (lane-events.log:9526, `research/sf-fp-simulator`:
  "> PENDING FABLE REVIEW — written by Opus 5.5 standing in for the Fable seat research/sf-fp-simulator; to be
  retrovalidated overall at the next opportunity (owner, 2026-10-17, J375)") gives md5
  `346dfaa24485f505a0025cf512a299e1`, the pre-edit md5 the apply record states. Independent proof that the file
  differs from its pre-edit state by exactly the 22 fragments and line 3.
* **fp-physical-integration.md — proved for the 33 fragments; line 3 not reproducible.** Reversing the 33 fragments
  is clean (each `new` once, each `old` back once; 493 lines). The pre-edit md5 `48252479047cfcd15e0fae89f8a9a1fe`
  cannot be recomputed by me because the original line 3 (the variant notice) survives nowhere in full: the apply
  lane kept no before-copy (its `apply_fp.py` writes in place), apply-fp.md §3 quotes the line with two elisions, and
  no record, log line or scratch file carries it (grep over docs/, research/ and the scratchpad). The verifier's
  00:23 dump (`retro/phys-rest.txt`) is a wrapped/cut copy, not verbatim, so it is no reference either. What I can
  show: the file is 493 lines as the verifier (00:46) and the validator (01:09) read it; the apply script touches
  only the 55 fragments; every passage I read in the whole file is intact. The round-trip claim for this file rests
  on the apply seat's own check. See §6 (a).

## 4 Bundle

The two notes are not bundle inputs (`tools/bundle_architecture.py` bundles docs/ARCHITECTURE.md, the volumes INDEX
and V01–V*). `python3 tools/bundle_architecture.py --check` → "UP TO DATE /home/user/maps-architecture/docs/ARCHITECTURE-FULL.md",
exit 0 (run at 05:40, after apply-notices' regeneration at 05:37). No regeneration owed by this family.

## 5 The amendments file

Not applicable: the fp verdict has no "design" correction (confirmed by kind count), so the design lane's
`docs/AMENDMENTS-2026-10-18s.md` owes nothing to this family (apply-design's LANDED line lists its 12 fragments by
family; none is fp's).

## 6 Residuals (recorded, with the exact fix; none is an apply-fp defect)

(a) **Record gap — the physical note's replaced notice line.** apply-fp.md §3 quotes the replaced line 3 with
elisions ("… Opus 5.5 assembled §2.11–§9 …"), so its full old text is recorded nowhere and the pre-edit md5 cannot be
reproduced by a later reader (§3). Fix: if the apply seat's transcript still holds the line, append it verbatim to
apply-fp.md §3; if not, the record stands as it is and this note is the statement that the round trip for that file
is the apply seat's own check. Nothing in the file itself needs changing.

(b) **Cross-family correction left unapplied — trade.verdict.json #37** (README's LEFT list already names it: "trade 1
on fp-physical-integration"). `fp-physical-integration.md:111` (row A1) still reads "from W8's budgeted flood with
the host's `TerritorySeed`s and cost vector" (old once, new absent). The trade verdict says "Apply once; skip if the
FP lane's corrections already touch this row" — none of the 55 touches line 111, so it is owed. Its content agrees
with the note's own §8 bracket (lines 458–468: `seats(world, seeds)` and `TerritorySeed` retired, J-RR.3/J-RR.48).
Fix: replace that text with "from W8a's unbudgeted nearest-seat flood over the host's seats (J-V13.63; budgets and
cost vectors retired) [Fable-reviewed 2026-10-18, trade lane]" (the trade verdict's `new`, verbatim). Not this lane's
file; for close-gaps or J392.

(c) **One FV-13 sibling the verdict did not reach.** `fp-physical-integration.md:157` (row M2) still says an airship
"adds a modality weight and a blockade-bypass share [OBSERVED tradeFlow.js:102,138; blockadeTransport.js:20]". I
read the host: blockadeTransport.js:20 is only `AIRSHIP_RE = /airship/i`; its header (line 9) points at
foodStockpile's `blockadeBypass`, which is the same 0.3 `FOOD_IMPORT_RATES.airship` that FV-13 renamed "a food-import
coverage rate" at lines 15, 146 and 170. The row's wording carries the host's own function name, so it is not wrong,
but it is now the one row still using the name the verdict retired. Fix (research kind, one fragment): "adds a
modality weight and a blockade-bypass share" → "adds a modality weight and the food-import coverage rate that
foodStockpile's `blockadeBypass` applies (0.3; 0.15 besieged)". Not this lane's file; for close-gaps or J392.

## 7 Other checks

* apply-fp's LANDED line is at lane-events.log:9606 with the suffix "(opus; J390, Fable-checked)" and matches the
  record.
* R-FP-21 (NOT-A-RULING; J377(a)'s counts) is correctly listed for J392 and docs/PROGRESS.md was not edited (its
  J377 row carries no "Fable-reviewed" text; journal rows are append-only).
* The host clone was not touched by this lane either; no git command was run; files edited by this lane: this record
  and docs/lane-events.log only.
