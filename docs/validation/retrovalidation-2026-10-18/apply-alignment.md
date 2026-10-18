# Retrovalidation 2026-10-18 — apply-alignment

Lane retrovalidation/apply-alignment (opus; J390, Fable-checked). Applies the corrections of
`docs/validation/retrovalidation-2026-10-18/alignment.verdict.json` (verdict PASS-WITH-CORRECTIONS, 32 corrections,
24 rulings) to the alignment family (`research/sf/alignment-system.md`), then replaces the family's PENDING FABLE REVIEW
notice with the verdict's `notice_replacement`.

## Inputs read whole

- `alignment.verdict.json` (32,379 bytes): all 32 corrections (every one `kind: "research"`, every one on
  `research/sf/alignment-system.md`; no `design` correction, no `record` correction, none on `docs/PROGRESS.md`), all
  24 rulings, the notice replacement and the summary.
- `research/sf/alignment-system.md` before the apply: 1,246 lines, md5 `1cc286e87d9423bfa2bfac388c79bcc7`
  (copy at the lane scratchpad `retro/apply-alignment/alignment-system.before.md`); one notice line, line 3.

## Corrections applied (32 of 32; all `research`, all on `research/sf/alignment-system.md`)

Method: a script (lane scratchpad `retro/apply-alignment/apply.py`) loaded the verdict, asserted every correction's
`kind` is `research` and its `file` is `research/sf/alignment-system.md`, asserted each `old` occurs exactly once in
the original note (32/32 did) and again exactly once in the working text at the moment of its own replacement (32/32
did), and replaced it with the verdict's `new` verbatim. After the write, every `new` occurs exactly once in the note
and no `old` remains. Every dated bracket a correction carries ("Fable-reviewed 2026-10-18: …") was written as the
verdict gives it; no wording was adjusted. No correction failed to match, so no equivalent-text adjustment was made.

Columns: n = position in the verdict's `corrections` array; finding; line of `old` before; line of `new` after;
occurrences of `old` before / `old` after / `new` after.

| n | finding | line before | line after | old / old after / new after |
|---|---|---|---|---|
| 1 | AV-1 (aggression +0.165, unclamped) | 379 | 379 | 1 / 0 / 1 |
| 2 | AV-1 (60%, +0.272) | 380 | 380 | 1 / 0 / 1 |
| 3 | AV-1 in §12.2 M3 | 1222 | 1225 | 1 / 0 / 1 |
| 4 | AV-2 (government-type label, not the faction's name) | 463 | 463 | 1 / 0 / 1 |
| 5 | AV-2 (conquest writes "Martial Administration") | 548 | 551 | 1 / 0 / 1 |
| 6 | AV-2 consequence (shared label, identity 0) | 552 | 555 | 1 / 0 / 1 |
| 7 | AV-2 in §10 item 27 (label) | 1062 | 1065 | 1 / 0 / 1 |
| 8 | AV-2 in §10 item 27 (cites) | 1064 | 1067 | 1 / 0 / 1 |
| 9 | AV-2 in §12.1 P3 | 1211 | 1214 | 1 / 0 / 1 |
| 10 | AV-3 (tolerance multiplies danger) | 807 | 810 | 1 / 0 / 1 |
| 11 | AV-8 (receptivity not spread-gated) | 493 | 493 | 1 / 0 / 1 |
| 12 | AV-8 and F-3 (§7 row 59) | 784 | 787 | 1 / 0 / 1 |
| 13 | AV-8 in §12.2 M11 (holds whole) | 1230 | 1233 | 1 / 0 / 1 |
| 14 | AV-9 (WC-0 built dark) | 796 | 799 | 1 / 0 / 1 |
| 15 | AV-4 (eight importers) | 597 | 600 | 1 / 0 / 1 |
| 16 | AV-5 (name, category and tags) | 235 | 235 | 1 / 0 / 1 |
| 17 | AV-5 (brothel district) | 243 | 243 | 1 / 0 / 1 |
| 18 | AV-6 (`sp/smuggle.js:114-116`) | 356 | 356 | 1 / 0 / 1 |
| 19 | AV-6 second site | 632 | 635 | 1 / 0 / 1 |
| 20 | AV-7 (supply share in the stage order) | 566 | 569 | 1 / 0 / 1 |
| 21 | AV-7 second site (§8.1) | 811 | 814 | 1 / 0 / 1 |
| 22 | AV-10 (FOLD:342) | 1046 | 1049 | 1 / 0 / 1 |
| 23 | AV-11 (WARCONV:436, :655-662) | 1021 | 1024 | 1 / 0 / 1 |
| 24 | AV-12 (PHASE55:1296-1298) | 666 | 669 | 1 / 0 / 1 |
| 25 | AV-13 (only personality-derived and lit NPC law axis) | 170 | 170 | 1 / 0 / 1 |
| 26 | AV-14 (two dozen importers) | 961 | 964 | 1 / 0 / 1 |
| 27 | AV-15 (FP-PHYS §5) | 824 | 827 | 1 / 0 / 1 |
| 28 | AV-16 (foreignCulture dated) | 868 | 871 | 1 / 0 / 1 |
| 29 | AV-17 ("two live consumers") | 1025 | 1028 | 1 / 0 / 1 |
| 30 | F-1 (plain form, no trade tie) | 897 | 900 | 1 / 0 / 1 |
| 31 | F-2 (§10 item 25 answers dated) | 1056 | 1059 | 1 / 0 / 1 |
| 32 | F-2 (host ask adopted as H30) | 936 | 939 | 1 / 0 / 1 |

## Notice replaced

The family has one file and one notice line: line 3 of `research/sf/alignment-system.md`,
"> PENDING FABLE REVIEW — written by Opus 5.5 standing in for the Fable seat research/sf-alignment; to be retrovalidated
overall at the next opportunity (owner, 2026-10-17, J375)". It was replaced, alone, by the verdict's
`notice_replacement` verbatim:

> Fable-reviewed 2026-10-18: PASS-WITH-CORRECTIONS — 17 verifier findings accepted (5 wrong, 12 imprecise) and 3 stale passages dated, 30 fragments applied in place; conclusions hold (lane retrovalidation/alignment; J392)

After the write the note holds no "PENDING FABLE REVIEW" line. Observation for J392 (not acted on; the notice is the
verdict's text and is written as given): the notice says "30 fragments applied in place", while the verdict's summary
says "30 research corrections (32 fragments)" and its `corrections` array holds 32 entries, all 32 of which this lane
applied.

## Not applied here

- `design` corrections: none in the verdict (the summary: "no design or record fragment is owed").
- `record` corrections: none.
- `docs/PROGRESS.md`: no correction targets it. Ruling R-24 (AMENDED) names PROGRESS J383's claim that the note was
  "verified against code and fixed"; its consequence is "Journal rows are append-only: J392 names J383; no edit" —
  listed here **for J392**, not applied.
- The other 23 rulings carry no fragment beyond the corrections above (R-3, R-5, R-8, R-13, R-18, R-20, R-21, R-22 point
  to corrections in the list; the rest "none").

## Result

- `research/sf/alignment-system.md`: 33 fragments (32 corrections + 1 notice line). Before 1,246 lines, md5
  `1cc286e87d9423bfa2bfac388c79bcc7`; after 1,249 lines, md5 `fe10aea245939499d81d921923ddfbac`; trailing newline kept.
  The diff against the before copy has 33 hunks, one per replaced passage, and nothing else.
- Bundle: the research note is not a source of `docs/ARCHITECTURE-FULL.md` (`tools/bundle_architecture.py` reads
  `docs/ARCHITECTURE.md`, `docs/volumes/INDEX.md` and the volumes only), so no regeneration is owed;
  `python3 tools/bundle_architecture.py --check` → "UP TO DATE", exit 0.
- No other file was edited except this record and the lane-events log line. No git command was run; the host repository
  was not touched.
