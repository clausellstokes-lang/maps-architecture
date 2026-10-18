# Retrovalidation 2026-10-18 — confirm-alignment

Lane retrovalidation/confirm-alignment (fable; J392): the confirming check of lane retrovalidation/apply-alignment
(opus; J390, Fable-checked), which applied `alignment.verdict.json` to `research/sf/alignment-system.md`. Verdict on the
apply: **PASS** — every correction landed as specified, nothing else in the file moved, the notice line is the verdict's
line verbatim, the bundle is fresh. One observation (not an apply defect) is recorded under "Observation" for J392.

## Inputs read whole

- `docs/validation/retrovalidation-2026-10-18/alignment.verdict.json` (32,379 bytes): 32 corrections, 24 rulings, the
  `notice_replacement`, the summary. Every correction is `kind: "research"` on `research/sf/alignment-system.md`; no
  `design`, no `record`, none on `docs/PROGRESS.md`. Nine rulings carry a consequence other than "none"; eight point at
  corrections in the list (R-3 → CR-26, R-5 → CR-5, R-8 → CR-28, R-13 → CR-30, R-18 → CR-29, R-20 → CR-7c, R-21 → CR-3,
  R-22 → CR-9..11); R-24's consequence is "Journal rows are append-only: J392 names J383; no edit".
- `docs/validation/retrovalidation-2026-10-18/apply-alignment.md` (the apply record) and the apply lane's script
  (`retro/apply-alignment/apply.py` in the lane scratchpad) and its pre-change copy
  `retro/apply-alignment/alignment-system.before.md` (md5 `1cc286e87d9423bfa2bfac388c79bcc7`, 1,246 lines — the md5 the
  apply record states for the note before the apply).
- `research/sf/alignment-system.md` as it now stands: read whole, lines 1–1,249 (md5 `fe10aea245939499d81d921923ddfbac`).
- `docs/lane-events.log` line 9605 (the apply lane's LANDED line) and the lines of lanes alignment-verify and alignment.

## Checks and evidence

Script: `/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/retro/confirm-alignment/check.py`
(output `check.out`, diff `diff.out` beside it). Run with `python3 -I`.

1. **Every correction landed.** For each of the 32 corrections: `old` occurs exactly once in the before copy; `new`
   occurs exactly once in the current note and zero times in the before copy; `old` occurs zero times in the current
   note — with one explained exception: correction 31 (F-2, §10 item 25) has a `new` that *begins with* its `old`
   verbatim and appends the dated bracket, so the old string necessarily survives once, inside the new, at the same
   offset; outside the new text it occurs zero times. The line of each `new` in the current note matches the apply
   record's "line after" column for all 32 rows (379, 380, 1225, 463, 551, 555, 1065, 1067, 1214, 810, 493, 787, 1233,
   799, 600, 235, 243, 356, 635, 569, 814, 1049, 1024, 669, 170, 964, 827, 871, 1028, 900, 1059, 939), and the line of
   each `old` in the before copy matches its "line before" column.
2. **Nothing else moved.** Reconstruction: the before copy with the 32 replacements applied in verdict order, then the
   one notice line replaced, is byte-identical to the current note (`RECONSTRUCTION == CURRENT: True`, md5
   `fe10aea245939499d81d921923ddfbac`). `diff` of before against current has exactly 33 hunks (3; 170; 235; 243; 356;
   379-380; 463; 494-496→494-499; 548-550→551-553; 552→555; 566→569; 597→600; 632→635; 666→669; 784→787; 796-797→799-800;
   807→810; 811→814; 824→827; 868-869→871-872; 897→900; 899→902; 937→940; 961→964; 1021→1024; 1025→1028; 1046→1049;
   1056→1059; 1062→1065; 1064→1067; 1211→1214; 1222→1225; 1230→1233), one per replaced passage plus the notice; 1,246 →
   1,249 lines; the trailing newline is kept. The apply record's figures (33 fragments, both md5s, both line counts)
   are all reproduced.
3. **Notice.** The old line "> PENDING FABLE REVIEW — written by Opus 5.5 standing in for the Fable seat
   research/sf-alignment; …(owner, 2026-10-17, J375)" occurred once in the before copy (line 3) and zero times now; the
   string "PENDING FABLE REVIEW" occurs zero times in the note; the verdict's `notice_replacement` occurs exactly once,
   as the whole of line 3. "Fable-reviewed 2026-10-18" occurs 17 times: the 16 corrections that carry a dated bracket
   plus the notice line; every bracket is the verdict's text verbatim (the reconstruction proves it).
4. **Dated brackets.** Each correction the verdict dates as a bracket was written as the verdict gives it; no wording
   was adjusted (no correction failed to match, so the task's adjustment clause was never exercised — confirmed by the
   reconstruction, which uses the verdict's strings only).
5. **Bundle.** `python3 tools/bundle_architecture.py --check` → "UP TO DATE /home/user/maps-architecture/docs/ARCHITECTURE-FULL.md",
   exit 0 (run at 05:38Z). The research note is not a bundle source, so no regeneration was owed by this family.
6. **Amendments file** (design lane only): not applicable — the verdict holds no `design` correction, and the apply
   record correctly says so.
7. **Not applied, correctly.** R-24 (PROGRESS J383's claim) is listed "for J392" and not applied; the task forbids any
   edit to `docs/PROGRESS.md`. No other correction was left out: 32 of 32 applied.
8. **The LANDED line.** `docs/lane-events.log` line 9605: "2026-10-18 05:24 retrovalidation/apply-alignment LANDED
   docs/validation/retrovalidation-2026-10-18/apply-alignment.md: … (opus; J390, Fable-checked)" — the right form and
   suffix; its figures (32/32, 33 fragments, 1,246 → 1,249, notice line 3, R-24 for J392, bundle exit 0) match what I
   measured.
9. **Reading the note whole** (lines 1–1,249): every inserted passage reads as a sentence in its place; §3.5, §4.2,
   §5.1, §7 row 59 and its "Against the FP status of record" paragraph, §8.1, §9.1 items 1 and 6, §9.3 item 13, §10
   items 1, 25 and 27, §12.1 P3 and §12.2 M3 and M11 now carry the verdict's wording and the dated brackets; the §2.5
   table row for the red-light pattern, the two `sp/smuggle.js:114-116` citations, the two supply-web stage-order sites
   (`wp/supplyWebWarfare.js:857-864`), FOLD:342, WARCONV:436/:655-662, PHASE55:1296-1298, FP-PHYS §5 and the
   eight-module importer list are in place. No stray fragment of an `old` text remains (grep for "+0.162", "+0.269",
   "61% (aggression)", "(1 − tolerance)", "FOLD:339", "WARCONV:646-651", "PHASE55:1294-1297", "FP-PHYS §2.5",
   "About thirty modules", "entirely\nunbuilt", "`sp/smuggle.js:126`" finds nothing except where the verdict's own
   brackets quote the earlier reading on purpose: "+0.162" inside the AV-1 bracket at line 379, "(1 − tolerance)"
   inside the AV-3 bracket at line 810, and "entirely unbuilt" inside the AV-9 bracket at line 800).

## Observation (for J392; not an apply defect; no file of this lane's carries it)

The notice line (line 3 of the note, and `notice_replacement` in `alignment.verdict.json`) says "30 fragments applied
in place". The verdict's own summary says "30 research corrections (32 fragments)" and its `corrections` array holds
32 entries, all 32 applied. The validator's record `alignment.md` numbers its corrections CR-1 … CR-30 with CR-7 split
into CR-7a, CR-7b, CR-7c (lines 169-171), which is 30 corrections and 32 fragments; so the notice's "30 fragments" means
30 corrections (32 fragments). The apply lane was told to write the verdict's line word for word and did; it flagged
the mismatch in its record. Exact fix, if the owner wants the notice precise, in two places: in
`research/sf/alignment-system.md` line 3 and in `alignment.verdict.json` `notice_replacement`, replace
"30 fragments applied in place" with "30 corrections (32 fragments) applied in place". The apply is PASS either way:
the line reproduces the verdict exactly.

## Result

PASS. No problem with the apply. No file was edited except this record and the lane-events log line; no git command
was run; the host repository was not touched.
