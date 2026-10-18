# Retrovalidation 2026-10-18 — apply-plague

Lane retrovalidation/apply-plague (opus; J390, Fable-checked). Applies the corrections of
`docs/validation/retrovalidation-2026-10-18/plague.verdict.json` (verdict PASS-WITH-CORRECTIONS, 18 corrections, 23
rulings) to the plague family (`research/sf/plague-system.md`), then replaces the family's PENDING FABLE REVIEW notice
with the verdict's `notice_replacement`.

## Inputs read whole

- `plague.verdict.json` (21,023 bytes): the summary, the notice replacement, all 23 rulings and all 18 corrections. Every
  correction is `kind: "research"` on `research/sf/plague-system.md`; none is `design`, none is `record`, none targets
  `docs/PROGRESS.md`. The 18th correction is the notice line itself, its `new` identical to `notice_replacement`.
- `research/sf/plague-system.md` before the apply: 1,085 lines, md5 `73c9ce31fca22e5f23826e6da4dbb79c` (copy at the
  lane scratchpad `retro/apply-plague/plague-system.before.md`); one notice line, line 3.

## Corrections applied (18 of 18)

Method: a script (lane scratchpad `retro/apply-plague/apply.py`) loaded the verdict, asserted every correction's `kind`
is `research` and its `file` is `research/sf/plague-system.md`, asserted each `old` occurs exactly once in the original
note (18/18 did) and again exactly once in the working text at the moment of its own replacement (18/18 did), and
replaced it with the verdict's `new` verbatim. Every dated bracket a correction carries ("Fable-reviewed 2026-10-18: …";
corrections 2, 8, 14, 16) was written as the verdict gives it. No correction failed to match, so no equivalent-text
adjustment was made.

Columns: n = position in the verdict's `corrections` array; finding; line of `old` before; line of `new` after;
occurrences of `old` before / `old` after / `new` after.

| n | finding | line before | line after | old / old after / new after |
|---|---|---|---|---|
| 1 | F1 (housing-pressure reason string, `stressors.js:68`) | 209 | 209 | 1 / 0 / 1 |
| 2 | F2 amended (§9 item 3: no plague term; crime lift sustains, never starts) | 803 | 809 | 1 / 0 / 1 |
| 3 | F2 (§5.5 qualifier) | 563 | 569 | 1 / 0 / 1 |
| 4 | F2 (row 16 RR clause) | 529 | 535 | 1 / 0 / 1 |
| 5 | F3 (a tick is a week, `advanceInterval.js`) | 170 | 170 | 1 / 0 / 1 |
| 6 | F4 (`populationDynamics.js:113,309`) | 313 | 317 | 1 / 0 / 1 |
| 7 | F5 (faith-system §5.5, fold:501) | 360 | 364 | 1 / 0 / 1 |
| 8 | F6 (history event at echo graduation, dated bracket) | 385 | 389 | 1 / 0 / 1 |
| 9 | F6 (§1 summary) | 103 | 103 | 1 / 0 / 1 |
| 10 | F7 (soak sizes) | 497 | 503 | 1 / 0 / 1 |
| 11 | F8 (`COLUMN_SEED_CAP` unset) | 525 | 531 | 1 / 0 / 1 |
| 12 | F9 (PROGRESS line count) | 1000 | 1011 | 1 / 0 / 1 |
| 13 | F9 (fp-physical-integration line count) | 1001 | 1012 | 1 / 0 / 1 |
| 14 | F10 amended (magic stressors and healing; DM exception) | 244 | 244 | 1 / 0 / 1 |
| 15 | F11 amended (PHASE55:1631) | 802 | 808 | 1 / 0 / 1 |
| 16 | R2 (unmapped realm, §1, dated bracket) | 130 | 130 | 1 / 0 / 1 |
| 17 | R2 (§8.4 heading) | 744 | 750 | 1 / 0 / 1 |
| 18 | notice line (J375 → J392) | 3 | 3 | 1 / 0 / 1 |

## Notice replaced

The family has one file and one notice line: line 3 of `research/sf/plague-system.md`, "> PENDING FABLE REVIEW —
written by Opus 5.5 standing in for the Fable seat research/sf-plague; to be retrovalidated overall at the next
opportunity (owner, 2026-10-17, J375)". It was replaced, alone, by the verdict's `notice_replacement` verbatim (through
correction 18, whose `new` is that same line; the script's after-pass found no PENDING line left to replace):

> Fable-reviewed 2026-10-18: PASS-WITH-CORRECTIONS — sixteen research corrections, no design change (lane retrovalidation/plague; J392)

After the write the note holds no "PENDING FABLE REVIEW" line. Observation for J392 (not acted on; the notice is the
verdict's text and is written as given): the notice and the summary say "sixteen" / "16 research corrections", while the
verdict's `corrections` array holds 17 research-text corrections plus the notice line (18 entries), all 18 of which this
lane applied.

## Not applied here

- `design` corrections: none in the verdict ("no design fragment").
- `record` corrections: none ("no record fragment … J392 names nothing from this lane").
- `docs/PROGRESS.md`: no correction targets it; nothing listed for J392 from the verdict beyond the count observation
  above. Ruling R7's consequence (the host-requirements document, J391 (6), should carry pg-4's quarantine verb as the
  owner value PG names, not as a patrol fact) names a document outside this lane; it carries no fragment and is not
  applied here.

## Result

- `research/sf/plague-system.md`: 18 fragments (17 corrections + the notice line). Before 1,085 lines, md5
  `73c9ce31fca22e5f23826e6da4dbb79c`; after 1,096 lines, md5 `09b9a121417470adca5c1327c1375812`; trailing newline kept.
  The diff against the before copy has 16 hunks (corrections 12–13 and 2/15 fall in adjacent lines and merge), and
  nothing else: replacing every `new` by its `old` in reverse order reproduces the before copy byte for byte
  (`retro/apply-plague/roundtrip.py` → identical).
- Bundle: the research note is not a source of `docs/ARCHITECTURE-FULL.md` (`tools/bundle_architecture.py` reads
  `docs/ARCHITECTURE.md`, `docs/volumes/INDEX.md` and the volumes only), so no regeneration is owed;
  `python3 tools/bundle_architecture.py --check` → "UP TO DATE", exit 0.
- No other file was edited except this record and the lane-events log line. No git command was run; the host repository
  was not touched.
