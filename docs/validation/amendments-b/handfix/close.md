# handfix-b/close — the hand fix of amendments b closed (Fable seat)

PROGRESS (kill-safe ledger; a seat that continues this lane reads it first)
ITEM read: planned apply.md, every verify-*.md (r0, r1, r2), every repair report and block-file preamble, assemble-r1, assemble-r2, closing-report §2–§3, the owner's items 20 and 28, the live text at every anchor | done (doc 357c02f2… / rationale 9575f26c…, the hashes assemble-r2 installed)
ITEM anchors: planned every issue's old string counted on the live files (a single space matching one soft line break) | done (24 anchors, each once; VHM2-04 (2) and VDH2-02 (1) cross one soft break; VHM2-02 and VKH2-01 (1) share the §2.6 anchor; VHM2-01 = VPH2-01)
ITEM rulings: planned the two reconciliations (VHM2-02 + VKH2-01 one sentence; VHM2-01 + VPH2-01 once) and the disputed VHM2-04 | done (§2: VHM2-02's filter + VKH2-01's attribution clause as one §2.6 sentence; VHM2-01 applied once; VHM2-04 ruled valid against verify-kernel-r2's "no stale statement")
ITEM archive: planned docs/archive/ARCHITECTURE(-RATIONALE)-pre-handfix-b-close-2026-09-27.md, chmod a-w | done 21:33 (both cmp-identical to the input, 357c02f2… / 9575f26c…, read-only)
ITEM apply: planned close-apply.py — 24 sub-changes as data rows, anchors asserted once, dry run to scratch, then one guarded write | done 21:40 (dry run 24/24, 0 skipped, each new text once; checks on the dry-run copies; then written once: doc 1c23190f…, 13 026 lines; rationale 0be40dfd…, 2 053 lines; installed files cmp-identical to the dry run)
ITEM checks: planned refs.py, doc_checks three-copy on one corpus snapshot (keys 0,2,3,5,7,8,12,13,Judgment calls; rationale whole), probes of every new text | done (refs 2 pre-existing external on live, dry run and installed; doc checks exit 0, 849 raw hits before and after, rationale 278 = 278, corpus still across 7 runs; every pointer the new texts add resolves; headings 145, fences 108, ids 472/472; every retired text 0)
ITEM validation-rows: planned §Ab.4 in docs/ARCHITECTURE-VALIDATION.md (issue id, sections changed) for the whole hand-fix pass | done (the 31, repair rounds 1 and 2, the close)
ITEM summary: planned "Hand-fix (2026-09-27)" section in docs/validation/amendments-b/SUMMARY.md | done
ITEM close-out: planned this report complete, LANDED line | done (LANDED line written after this file)

Lane `handfix-b/close`, 2026-09-27, the Fable seat that closes the hand fix. Inputs: `docs/ARCHITECTURE.md` sha256
`357c02f2…` (13 025 lines) and `docs/ARCHITECTURE-RATIONALE.md` `9575f26c…` (2 053 lines), as handfix-b/assemble-r2
installed them and the six round-2 verifiers judged them; unchanged from the start of this lane until this seat's one
write. Outputs: `docs/ARCHITECTURE.md` `1c23190f040c8935532e81731dfaa7df44a7aad43033fba3a0eb0e92011af461` (13 026
lines, 1 645 248 bytes) and `docs/ARCHITECTURE-RATIONALE.md` `0be40dfd41ff9678dcc83c9476e3bfa08c7a6ed88fd113a513e00577e7ff2b37`
(2 053 lines, 459 633 bytes). Scratch: `handfix/close/` under the session scratchpad.

## Outcome

* **The hand fix of amendments b is closed.** The 14 issues the six round-2 verifiers left open (VHM2-01 … 04, VKH2-01,
  VPH2-01 … 02, VDH2-01 … 02, VR2H-01 … 02, VSR2-01 … 03) are all FIXED, none ruled invalid, none deferred (the owner's
  no-defer rule). They are 13 distinct changes — VPH2-01 is VHM2-01 word for word, and VHM2-02 and VKH2-01 (1) replace
  the same §2.6 sentence — applied as 24 exact single-occurrence substitutions by `close-apply.py` (this folder), whose
  engine is `handfix.py`'s: every old string counted once on the original files and once again on the evolving text,
  every new text counted once in the result, both files written once under an input-hash guard. 24 of 24 applied, 0
  skipped (`close-apply-log.json`).
* **Two reconciliations and one disputed issue were ruled** (§2, each vetoable): VHM2-02 and VKH2-01 (1) as one sentence
  (the model verifier's filter, the kernel verifier's attribution clause); VHM2-01 applied once for both filers; VHM2-04
  ruled a stale gloss to align, over verify-kernel-r2's reading that §3.4's lists need no change.
* **Every check passes** (§4): the resolver finds the same 2 pre-existing external citations and nothing else broken;
  every § , J and T pointer the 24 texts add resolves; headings 145 → 145, fence lines 108 → 108, index and Part A 472 rows
  each with one id set; every changed table row keeps its table's cell count; every retired text occurs 0 times; the
  document checks over the nine changed top-level keys exit 0 on the untouched and the changed copy with identical counts
  (C1 5, C2 0, C3 838, C4 6, S1 0, S2 0), the raw hit sets equal (849 = 849, 0 added, 0 removed), the rationale's standing
  set unchanged (278 = 278), and the corpus still across all seven runs. No allow row was needed.
* **The pass is recorded** for the owner and the program: `docs/ARCHITECTURE-VALIDATION.md` §Ab.4 lists every issue of
  the hand-fix pass with the sections it changed (the 31, repair rounds 1 and 2, the close); `SUMMARY.md` gains a
  plain-language "Hand-fix (2026-09-27)" section.
* **Nothing needs the owner.** Each change sits inside a ruling already taken (§2.8's registry rule, amendments-b rule
  (2)'s bars, §0.2's landing standard, §5.3's invariant pattern, the closing rulings on VD3-08 and J-A28.26); no
  milestone row or amount moves.

## 1 The 14 issues, one by one

Each required change was re-checked on the live text before it was applied (the claim's quoted text read in place, its
premise verified — see the notes), then applied as filed unless §2 says otherwise. Line numbers are the installed
document's (rationale marked rat).

| issue | owner (filed by) | verdict | applied | line |
|---|---|---|---|---|
| VHM2-01 | model (model) | FIXED, as filed | (1) §7.1 buildings row: `unhoused` declared derived beside `frontage`; (2) §2.8 registry paragraph: "a site-plan slot's `unhoused` (§2.5)" enters §13.2's path test | 6592; 1792 |
| VPH2-01 | model (pipeline) | FIXED through VHM2-01 (word for word the same text; applied once) | — | — |
| VHM2-02 | model (model) | FIXED, as one sentence with VKH2-01 (1) (§2) | §2.6 stage-3 contract: step 3's filter keeps each composer's room, less every bay and stack it holds, one piece the arena accepts beside them (`minEdge`, clearance, simplicity) | 1267 |
| VKH2-01 | model (kernel) | FIXED, (1) as one sentence with VHM2-02, (2) as filed with the citation widened (§2) | (1) the attribution clause of the same §2.6 sentence; (2) J-A28.26 Part A: the filter ruling recorded | 1267; rat 360 |
| VHM2-03 | model (model) | FIXED, as filed | §2.6 `Building.dwelling`: cleared by every event that takes the live-in household out — its relocation (a use's move, a `relet`, the overflow pass, the capacity re-homing) or its leaving at an epoch (step (c), §4.11) | 965 |
| VHM2-04 | kernel (model) | FIXED, as filed (ruled valid, §2) | (1) §3.4 `fixed` comment; (2) §3.4 re-cut paragraph; (3) J-A28.33 index row; (4) J-A28.33 Part A — each list now passes the composer's rooms "each less a bay or stack it holds" | 2612; 2681; 12817; rat 353 |
| VPH2-02 | scope (pipeline) | FIXED, as filed | §13.2 T19-4: the `houses none` clause points at `BuildingSlot.unhoused`; a fixture whose district holds a live-in workshop and no household of its band or drift proves the unhoused typing (use and main slot kept, built without `houses`, flag set, capacity 0, `dwelling` absent, reported); gates M2b with the rest of T19-4 | 10334 |
| VDH2-01 | determinism (determinism) | FIXED, as filed (the verifier's JUDGMENT concurred: one sentence at the undo record's home) | §7.4 Application bullet: every edit whose capacity re-homing moves households keeps the former records of the buildings moved out of and into, and — where it re-provides a dossier household's housing — the plots the re-provision touched; its undo restores them with the households | 7052 |
| VDH2-02 | scope (determinism) | FIXED, as filed | (1) §13.2 T18-1: locality is the event's effective scope (§7.3 item 1), not the plot and its joined neighbour alone; (2) §13.2 T28-18: a `setAttr` of the tenement's plot use to a class with no residential slot re-homes its households the same way, its undo returning the design and every household byte-identically | 10327; 10408 |
| VR2H-01 | rendering (rendering) | FIXED, as filed | (1) §12.7 plan row: "none for a building of capacity 0, which houses no household"; (2) J-A28.83 index row: "none at capacity 0"; (3) J-A28.83 Part A: the same | 9866; 12919; rat 455 |
| VR2H-02 | rendering (rendering) | FIXED, as filed | §8.3 draw-style census: a new row after the passages row — every front building over a passage cleared by hand, then each clear undone: no span mark in any band's mark table and no arch glyph at any band while the passage has no `frontBuilding`, its floor in `road` at the district band, every tile pixel-identical after the undos | 8021 (new) |
| VSR2-01 | scope (scope) | FIXED, as filed | §13.2 B-PLAN fixture list: "a rectangle carrying a stair turret (a round tower whose spiral core's bay fills its round room)" | 10368 |
| VSR2-02 | determinism (scope) | FIXED, as filed | §5.3: a new row after the capacity row — `Building.dwelling`, where present, names one of `Building.households` and is present only while the use is a live-in class's; stage-end (S11 per district after the overflow pass; each `epoch`; every edit at its dry run) | 5670 (new) |
| VSR2-03 | scope (scope) | FIXED, as filed | §0.2 row 20: the re-provision of a dossier household's housing (§4.7, J-A20.72) and its bars (T19-4's dossier clause, T28-18's dossier fixtures); row 28: a structure's `houses` flag and `BuildingSlot.unhoused` | 151; 159 |

**Re-checks made on the live text before applying** (all CONFIRMED): `unhoused` occurred only at doc l. 879, 4680, 8914,
12976 and rat l. 513, so §7.1 and §2.8 did not register it (VHM2-01); `dwelling` occurred 0 times in §5.3 and in §13.2
(VSR2-02); §4.11's epoch step (c) ("the roster's suffix leaves in reverse ordinal order", l. 5119) and §10.3's "a household
re-homed by item 31's re-letting … takes the same path" (l. 9097) are the two clearing paths VHM2-03 names; §7.4's assign /
unassign and convert rows carry no household clause and the setAttr row's covers "heights or class" only (VDH2-01); T18-1's
sentence is the one VDH2-02 quotes; §12.7's bound, J-A28.83's row and entry read "plus the (building's) capacity less one"
(VR2H-01); §8.3's census table and §5.3's table have three cells; the B-PLAN list holds no turret (VSR2-01); §0.2 rows 20
and 28 hold the quoted texts (VSR2-03). Every old string occurred exactly once in its file (`anchors0.py`, then
`close-apply.py --check`).

## 2 Rulings (delegated seat; each vetoable — say "veto" to flip it)

1. **VHM2-02 with VKH2-01 (1): one sentence.** Both replace §2.6's "step 3 filters its candidates to those that stay out
   of every composer's room or stand in one so." and say the same thing — the room less the bay or stack must pass §3.4's
   input tests before the arena opens. The installed sentence takes VHM2-02's filter wording whole ("and that leave each
   composer's room, less every bay and stack it holds, in one piece the transient arena accepts beside them (§3.4:
   `minEdge`, clearance, simplicity)"), because it also covers the two cases VKH2-01's wording leaves implicit — two
   abutting bays that split a room ("in one piece") and the clearance between the remainder and the bays ("beside
   them") — and then VKH2-01's attribution clause ("a refusal naming a vertex that a bay or stack gives the room belongs to
   that bay or stack (F-PLAN tier 2, §5.2), so a refused composer's room stays the composer's bug"), because it routes a
   stray refusal at a bay's vertex to the existing tier-2 re-placement instead of an abort and states the premise F-PLAN's
   tier 2 and J-A28.73 rest on. Rejected: VKH2-01's wording alone (loses the split and clearance cases); VHM2-02's alone
   (leaves F-PLAN's premise unstated where the filter is the only thing that keeps it). The attribution's edge — the
   kernel may name the room's own endpoint of an edge a bay shortened — is moot under the filter, which step 3 applies
   with the same tests §3.4 applies, and where it did arise the outcome is an abort, never a silent drop. Both verifiers
   had checked their texts add no document hit on that line separately; the combined line was re-checked (§4: 0 added).
   JUDGMENT: chose VHM2-02's filter plus VKH2-01's attribution over either alone because the first is the complete
   guarantee and the second keeps F-PLAN's classification stated — say "veto" to flip it (one substitution on l. 1267).
2. **VKH2-01 (2)'s citation widened.** The J-A28.26 Part A sentence is the kernel verifier's, with its closing citation
   "(handfix-b verify-kernel-r2 VKH2-01)" widened to "(handfix-b verify-kernel-r2 VKH2-01 with verify-model-r2 VHM2-02;
   closing)", since the installed rule is both verifiers' and the reconciliation is this seat's. JUDGMENT, vetoable (one
   substitution on rat l. 360).
3. **VHM2-01 = VPH2-01: applied once.** The pipeline verifier filed its issue as "word for word VHM2-01's text; merge the
   two", so one application fixes both.
4. **VHM2-04 ruled valid.** verify-kernel-r2 (§5, "Considered, not issues") read §3.4's two fixed-ring lists as pointers
   that need no change because they name §2.6; verify-model-r2 filed them, with J-A28.33's index row and Part A, as stale
   glosses. Ruled with the model verifier: each list names "the stair core's bay, the chimney stacks … the composer's
   rooms" side by side as fixed rings, which read literally passes a hall and the stack inside it as two overlapping fixed
   rings — the configuration §3.4 refuses and VHM1-03 was raised for. The program has aligned every such restatement with
   its home (VK3-02, VHM1-01, VHM1-04, VHM-05, VSH-03, VDH-06), and "it points to §2.6" was the argument those rulings set
   aside. JUDGMENT: chose to align the four lists over leaving them — say "veto" to flip it (four substitutions).
5. **VDH2-01's home sentence, concurred.** The determinism verifier's JUDGMENT — one sentence at the undo record's home
   (§7.4's Application bullet) over clauses in the assign / unassign, setAttr (use) and convert rows — is adopted: the
   row-by-row form had needed three rounds (VD3-08, VDH-03, VDR-02) and would still miss the rows whose undo record is
   generic. The four existing row clauses stay as glosses.
6. **No new judgment id.** Every change refines a ruling already recorded (J-A28.26, J-A28.33, J-A28.83, J-A28.23's
   re-homing and its undo, J-A28.29's `dwelling`, J-A20.72's re-provision); the two Part A entries touched are restated in
   place, so no J-ROWS row and no index swap was needed and the index and Part A keep 472 rows each.

**Owner rules.** Item 20 holds through every change: the new texts move households and build or restore housing, none
removes a dossier element or a household of a dossier's roster, and T19-4's and T28-18's new clauses prove the unhoused
typing and the designation path without touching the dossier fixtures' refusal-free contract. Item 28 (a) and (f) are
served by the stair-turret fixture, the `dwelling` invariant and the re-homing undo. No text defers anything (the deferral
probe over the 24 new texts: 0 hits for TBD, to be decided or determined, open question, defer, decide later, later pass
or round, TODO, FIXME, left open, for now, revisit, pending).

## 3 What changed, exactly

Against the pre-close archive (`docs/archive/ARCHITECTURE-pre-handfix-b-close-2026-09-27.md`, `357c02f2…`), the document
changes on 17 hunks — l. 151, 159 (§0.2), 965, 1267 (§2.6), 1792 (§2.8), 2612, 2681 (§3.4), 5669 (§5.3, +1 row), 6591
(§7.1), 7051 (§7.4), 8019 (§8.3, +1 row), 9864 (§12.7), 10325–10326 (§13.2 T18-1, two lines joined), 10333 (T19-4),
10367 (B-PLAN), 10407 (T28-18), 12816 and 12918 (the index) — and grows by one line (two rows added, one soft-wrapped pair
joined); the rationale changes on 3 lines (353, 360, 455), its length unchanged. Two anchors crossed a soft line break:
VHM2-04 (2)'s break was kept before the shared word "composer's"; VDH2-02 (1)'s was joined, which renders the same.

## 4 Receipts (executed; scratch `handfix/close/`)

| check | result |
|---|---|
| `anchors0.py` on the live files | 24 old strings, each exactly once (soft-break matcher); 2 across one soft break |
| `close-apply.py --check` | 24/24 anchors once in scope and once in the file, every new text absent before; input hashes = the hashes judged |
| `close-apply.py` dry run → `mine-doc.md` (`1c23190f…`), `mine-rat.md` (`0be40dfd…`), `dry-log.json` | 24/24 applied, 0 skipped, each new text once after; doc 13 025 → 13 026 lines, rationale 2 053 → 2 053 |
| structure on the dry-run copies | headings 145 → 145 (rationale 141 → 141), fence lines 108 → 108 (96 → 96), balanced; the two new rows and every changed row with their table's 3 cells (Part A rows 2); index 472 rows / Part A 472, one id set, no duplicate |
| retired texts (12 probes) | 0 in the dry-run copies; `unhoused` now once in §7.1's buildings row and once in §2.8's registry paragraph; `dwelling` once in §5.3 |
| `refs.py` live / dry run / installed | headings 139, D ids 35, J ids 472, broken 2 each — `os-geometry.md` §2.1.4 (l. 2709) and RFC 7946 §3.1.6 (l. 9196 → 9198), the pre-existing external citations; every § , J and T pointer of the 24 new texts and of the three changed Part A entries resolves |
| `doc_checks.py --sections "0,2,3,5,7,8,12,13,Judgment calls"`, six runs launched together 21:33:47, done 21:36:44; the untouched copy again 21:38:33 | untouched (before), mine, untouched (after), default allow: C1 5 / C2 0 / C3 838 / C4 6 / S1 0 / S2 0, 0 unreviewed, exit 0 each; with an empty allow file, untouched and mine: 849 raw hits each, identical after dropping line numbers (0 added, 0 removed); every run read 9 626 JSON files, 911 940 C3 3-grams, 478 C4 lists, 10 099 colour files — the corpus held still |
| `doc_checks.py` on the rationale whole (`--heads` the matching document) | untouched and mine: C3 403 / C4 6 / S2 17, 278 unreviewed (the standing set, exit 1 on both as in every seat of this pass); hit sets identical after dropping line numbers (278 = 278) |
| install (`--write`, guarded) | live hashes equal to the input at write time; installed files `cmp`-identical to the dry-run copies; installed doc `1c23190f…` 13 026 lines 1 645 248 bytes, rationale `0be40dfd…` 2 053 lines 459 633 bytes; `close-apply-log.json` problems [] |
| archives | `docs/archive/ARCHITECTURE-pre-handfix-b-close-2026-09-27.md` (`357c02f2…`) and `…-RATIONALE-pre-handfix-b-close-2026-09-27.md` (`9575f26c…`), read-only, `cmp`-identical to the input before the write and unchanged after |

The first launch of the check driver failed to start any run (exit 127 on all seven: an unquoted `$DC` holding "python3
path" is not word-split by zsh); the driver was rewritten with a shell function and re-run, and only that run's outputs
are reported. A first version of the hit normaliser missed the C3 hit format ("section from l. N") and reported 345
added and 345 removed on shifted lines; corrected, it reports 0 and 0.

## 5 Files

* `docs/ARCHITECTURE.md` and `docs/ARCHITECTURE-RATIONALE.md`: written once (§3).
* `docs/archive/ARCHITECTURE-pre-handfix-b-close-2026-09-27.md`, `docs/archive/ARCHITECTURE-RATIONALE-pre-handfix-b-close-2026-09-27.md`: the input, read-only.
* `docs/validation/amendments-b/handfix/close-apply.py`: the 24 rows and the guarded engine (imports `handfix.py`).
* `docs/validation/amendments-b/handfix/close-apply-log.json`: every row's counts, line and soft-break note; the hashes.
* `docs/ARCHITECTURE-VALIDATION.md` §Ab.4: the hand-fix pass's rows (the 31; repair rounds 1 and 2; the close).
* `docs/validation/amendments-b/SUMMARY.md`: the "Hand-fix (2026-09-27)" section for the owner.
* `docs/validation/amendments-b/handfix/close.md`: this report.
* Scratch (`handfix/close/`): `anchors0.py`, `precheck.txt`, `dryrun.txt`, `dry-log.json`, `mine-doc.md`, `mine-rat.md`,
  `refs-live.json`, `refs-mine.json`, `refs-installed.json`, `dc.sh`, `dc-*.txt`, `dc-exits.txt`, `hitdiff.py`, `empty-allow.tsv`,
  `ab4.md`, `summary-add.md`.

## 6 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed on disk in this lane): the input hashes and their identity with assemble-r2's install; every old
string once and every new text once; the dry run's 24/24; the structural counts; the retired-text probes; the resolver on
three copies; the seven document-check runs and the two hit-set comparisons; the install's guard, the `cmp` against the
dry run and the installed hashes; the archives; each issue's premise re-read on the live text (§1's notes).

**PLAUSIBLE** (judgment, vetoable — recorded in §2): that the reconciled §2.6 sentence is the right joint text; the
widened citation; VHM2-04 as a stale gloss rather than a sufficient pointer; the reachability of the runtime cases behind
VHM2-02 / VKH2-01, VHM2-03 / VSR2-02, VDH2-01 / VDH2-02 and VPH2-02, which the verifiers labelled PLAUSIBLE and this seat
did not execute; that the 24 texts, once installed, leave no new defect — the pass is closed on the six round-2
verifications plus this seat's reading, and the extended Fable review (workflow 15) reads the queued Opus rows next.
