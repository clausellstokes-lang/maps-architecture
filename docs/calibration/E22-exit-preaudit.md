# E22 — M-1 exit-record pre-audit (record level)

Lane `filler/m1-exit-preaudit` (Opus, research-side; workflow wf_2dccb46b-5d7), 2026-10-05. **E-number:** the task
named E20, but `E20-ng-draw-census.md` (W-22) already holds it, and E21 is reserved for W-21's timing record (`M-1-work.json`, record `E21-timing.md`), so this record takes the next free number, E22.

This is a research-side record (`plat/CLEAN-ROOM.md` rule 2: implementer seats do not read it). It is a **pre-audit**
of M-1's exit record, done at the level of the records. It is not the exit record itself, and it re-measures nothing. It
holds clause numbers, record ids, row counts, hashes and our own words. No reference word, list, palette, table or code
appears here. This lane wrote nothing under `plat/`, ran no git command and no test runner, and ran one tool process at a
time. The design is a reference, not a contract (J156), and this record adds no design.

## 0 Verdict

The exit has six clauses in §16's M-1 row (X1–X6) and five content deliverables, from §16's
content column (P1, P3, P4, P5) and the plan's deliverable ledger (D17, D31, D20, D16 / D22; P2 from D29, M0's
request), that the exit record has to show crossed or closed (P1–P5). Of these eleven:

* **3 stand complete in the records today:** X2 (bands), X6 (depth rows) and P5 (the dispersions and the
  rig share).
* **5 are shown research-side, with only the crossing half left.** For X1, X4, P1, P2 and P3, the research-side half
  is in the records. What remains is W-20's crossing, and for P1 and X1 also M0-k-06's scanner reading.
* **3 are open and wait on named steps:** X3 (two records still owe their closing sections), X5 (W-18's M0-scanner half,
  its reading review and the §3 report) and P4 (W-19 after W-20).
* **No clause needs a re-measure to pass.** Three clauses have a part that can only be *re-confirmed* against
  `captures/`, and that part is **NOT POSSIBLE HERE**: this clone has no `captures/` and no `reference/` (`ls`, this
  lane). Those parts are X4's per-folder README check, X5's full-corpus `doc_checks.py` run and a second, optional measurement of the
  19 timing and thin-class rows. The 19 rows already pass as descriptive under the ⟨M-1⟩ rule, so re-running them is
  optional.

Two clauses in §16's preamble apply to every milestone: the `MilestoneRecord`, and `plat calibrate register --check`
when a milestone lands a calibratable column. No M-1 record shows either. §13.3's wording places the first at
M1 (section 3, CONFIRMED by text read); whether the register clause binds M-1's exit is a reading for the session
(section 3). The labels follow the user's rules: **CONFIRMED** means this lane executed or
counted it. **RECORD** means a record states it and this lane did not re-execute it. **PLAUSIBLE** means it rests on
reasoning only.

## 1 §16's exit clauses (M-1 row, "exit criteria")

| # | clause (our words) | shown by | waits for | needs `captures/` | state |
|---|---|---|---|---|---|
| X1 | every §13.5 baseline row present with provenance; an ⟨M-1⟩ number M-1 could not measure is made descriptive and entered in `known-defects.json` | E15 (491 rows; 26 of 26 ⟨M-1⟩ cells have a target or a descriptive row); E19 (all 19 rows with `values.n` 0 are in C-0116's form, none in M0's ⟨M-1⟩ set; 8 cells have no row and read `missingBaseline`, one of them owed notes only); W-20-dryrun (the file passes M0-k-05's checks C1–C7) | W-20, which places the file; **`known-defects.json` is M1's file** (M0-x-03 defers it), and E19 is its entry draft; M0-k-06 for the T-V12-28 reading (whole text fails on 140 number-run hits until the strings-and-keys reading of R-52 / R-54, vetoable, is applied) | optional: re-running the 19 timing and thin-class rows on an uncontended machine — NOT POSSIBLE HERE | research half shown; crossing half waits |
| X2 | every band computed by the band rule | E15 §4 and `E15-baselines.json` (a `bands` list of 491 entries, one per row); wave3-verify-ab W-15 (band self-test 11 / 11, rows re-check SAME); R-50's stability markers on 60 flagged rows (E15 §13.3) | nothing at record level; E15 §7's passing-to-failing list goes to the shift record when the file crosses | no | **shown** |
| X3 | a `docs/calibration/` record per experiment | E01–E20 are all present; every D1–D35 row of the plan names an existing record | **E17** still owes W-18's appended check section (the plan's W-18 row and `M-1-work.json` name E17 as W-18's record; `W-18-twin.json` lists the append as not covered); **D20's record is E18, a pre-audit only**, and W-19's own exit check has no record yet | no | open (two closing sections owed) |
| X4 | every slot of both FTG programmes decoded or recorded failed; each decoded capture carries its resident count or the nominal fallback, marked | E02 JSON (28 of 28 slots taken, programme 1 at 6 of 6 and programme 2 at 22 of 22, `failed` empty, 3 stopped attempts that created nothing); E02 holds a population-source line for each slot (28); E06 §13 (the last face pass after the programme closed: check 3 PASS); wave3-verify-ab (W-05b's slot-27 addendum confirmed) | nothing at record level; the D-5 panel's `ftg-captures.json` is written at M1 from these records | the per-folder README check (id, water setting, population marked) — NOT POSSIBLE HERE | research half shown |
| X5 | the digest checker's report shows 0 code excerpts, 0 reference word lists / palettes / tables, 0 deny-list hits | E17 §4 (twin scan, both lists, 0 hits in every class on the ten crossing files); W-18-twin (0 hits on both lists, a planted control caught by both); wave3-verify-ab (W-17's draft re-scanned, 0 hits) | **W-18's M0-scanner half**, which needs M0-k-06; the working copy's scanner module is still a stub of 227 bytes (read here, working copy, not HEAD); W-18's reading review for code excerpts and word lists; the Fable read; the §3 report in `CLEAN-ROOM.md`, written by the digest-checker seat at W-20 | the full-corpus `doc_checks.py` run — NOT POSSIBLE HERE (W-18-twin `docChecks`: NOT RUN for the same reason) | open |
| X6 | the re-fitted depth rows recorded with provenance "M-1 ⟨date⟩" | E12 Part II (the numbers table signed "M-1 2026-10-04"); wave3-verify-ab W-12 confirmed (12 / 12 checks, JSON byte-identical on re-execution); the design's depth rows cite it | nothing | a re-execution would need NG's vertex captures (NOT POSSIBLE HERE), but none is owed: the verifier has already re-executed it | **shown** |

## 2 Deliverables the exit record has to show crossed or closed

These come from plan section 1's deliverable ledger (D16, D17, D20, D22, D29, D31) and from §16's content column. Each must reach `plat/` or be
closed before the exit record can read "done".

| # | deliverable | shown by | waits for | state |
|---|---|---|---|---|
| P1 | `baselines.json` generated research-side and committed into `plat/` | E15 (candidate sha256 prefix `784e2373b4da9032`, 491 rows, all four provenance fields on every row); this lane's run of `cross_check.py` (C1–C10 PASS, ACCEPTED, 0 hits under the strings-and-keys reading, 140 whole-text number-run hits); W-20-dryrun (M0-k-05's check passes except for the expected missing crossing record) | W-20 (placing, the checker seat's countersign, `crossings.json`); M0-k-05 shows as landed in the working copy's `plat/docs/build/landed/`; the C2 note-token scan half waits for M0-k-06; the git commit waits on the owner | research half shown |
| P2 | `ng-faces.json` (M0's request) | E15 (374 faces, 20 hoods; passes its kind's checks); W-20-dryrun (sha256 prefix `eb0be05983efbc62`, loader accepts it) | W-20 | research half shown |
| P3 | `denylist.json` in M0's format | E16 §9 (W-16b: eleven self-test checks pass on both lists, 0 unreviewed design hits, planted leaks caught 20 of 20, two rebuilds byte-identical); wave3-verify-ab W-16b confirmed; W-20-dryrun (sha256 prefix `7b3d79936f32dccd`) | W-20 (placing; the deny-list seat's §4 G-row); the planted-hit control against M0's scanner (N-04) needs M0-k-06 | research half shown |
| P4 | `CLEAN-ROOM.md`'s seat ledger | E18 (0 missing rows today, because no M-1 seat has written into `plat/` yet; after W-20, W-19 should find 5 §2 rows, 1 §3 report and 1 §4 record) | **W-19**, which runs after W-20; E18's F1–F4 wording mismatches should be settled before W-20 so that W-19 checks against one rule (F1 touches the clean-room rule, so it is the session's and the owner's call) | open |
| P5 | the variety dispersions and V12's rig share | E15 §5 (MFCG and FTG dispersions formed per R-40); E01, E13, E14, E15 (D22) | nothing | **shown** |

These are not exit clauses: the street-edge recoverability cross-check against the product within 0.01 runs on M1's
golden renders, so it is M1's work. W-21 runs only on an owner go.

## 3 Preamble clauses

**`MilestoneRecord`, placed by §13.3's wording.** §16's preamble says "every exit writes its `MilestoneRecord` with
the milestone's declared shifts and fails on an undeclared one (§13.3)". §13.3, which it points to, restricts this:
the milestone records "are built at M1, not at hardening", and "Every milestone from M1 on writes its
`MilestoneRecord`". So the clause first binds at M1 by §13.3's wording, and M-1's exit owes none. CONFIRMED
(text read: §13.3 and §16's preamble, both in the architecture file).

**Clause this pre-audit cannot place (for the session):**

* **§16's preamble, `plat calibrate register --check`.** The calibration register is V12's rig share, and §16's M1 row
  builds it (its lint included). M-1 lands rows, not product columns. PLAUSIBLE that this clause first binds at M1.
  No record states either way.

## 4 Order of what is left (from the records, not a new plan)

The order is M0-k-06. Then W-18's M0-scanner half, its reading review and E17's appended section. Then W-20 (placing
P1–P3 and the digest, with the checker seat's records and the planted-hit control). Then W-19 (P4, closing X3's
D20 record). Then the session's commit on the owner's word. After that the exit record can be written, and every
clause above reads "shown". Nothing in the order needs `captures/`.

## 5 Receipts

* `ls docs/calibration/`: E01–E20 present and E20 taken, E21 reserved for W-21, so this record is E22. CONFIRMED.
* `ls captures reference`: both absent in this clone. CONFIRMED.
* `python3 research/baselines/cross_check.py research/baselines/candidates/baselines.json --kind baselines`: exit 0,
  C1–C10 PASS, ACCEPTED (output in `maps-scratch/filler/m1-exit-preaudit/cc-baselines.txt`). CONFIRMED.
* The candidate counted directly: 491 rows (target 257, weakness 92, descriptive 142); 19 with `values.n` 0; all 491
  carry `referenceBuild`, `capture`, `script` and `date`; every date is 2026-10-04. `E15-baselines.json` `bands`: 491
  entries. CONFIRMED.
* sha256 prefixes of the three crossing candidates: equal to W-20-dryrun's. CONFIRMED.
* E02 JSON: `slotsTaken` 28 of 28, `failed` empty, 3 stopped attempts, none created. CONFIRMED (read).
* `plat/` working copy (not HEAD; no git): `plat/packages/testkit/baselines/` holds `crossings.json` and the
  scaffold's note only; `plat/docs/digest/` holds the scaffold's note only; the scanner module is 227 bytes; the landed folder lists M0-k-05
  and its check. CONFIRMED for the working copy at this lane's run.
* Every other entry in the "shown by" columns: RECORD (stated by the cited record or verifier file, not re-executed
  here).
* `python3 research/baselines/make_denylist.py scan docs/calibration/E22-exit-preaudit.md --list research --allow --show`
  and the same with `--list m0`, no allow file: 0 hits and 0 unreviewed in every class on both lists, exit 0 on both
  (run on this revision, before this receipt line was added, and again after it). CONFIRMED.
