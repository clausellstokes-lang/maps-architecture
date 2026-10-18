# Retrovalidation 2026-10-18 — apply-scripts

Lane: retrovalidation/apply-scripts (Opus/high; J390, Fable-checked). Source of corrections:
`docs/validation/retrovalidation-2026-10-18/scripts.verdict.json` (verdict PASS-WITH-CORRECTIONS; 14 corrections, all
`kind: record`; 17 rulings; no `design` correction; none aimed at `docs/PROGRESS.md`), read whole.

Family files: the ten workflow scripts `workflows/36-realm-review.js`, `36b-realm-review-continue.js`, `37-faith-read.js`,
`38-systems-read.js`, `38b-systems-read-continue.js`, `39-plague-read.js`, `40-lens-design.js`, `41-lens-close.js`,
`42-lens-final.js`, `43-lens-q.js` (1,110 lines before), each read whole before any change. Before-copies at
`/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/retro/apply-scripts/before/`;
apply script `.../apply-scripts/apply.py`, round-trip script `.../apply-scripts/rt.py`, full diff `.../apply-scripts/after.diff`.

## Method

Pre-check: each of C1–C12's `old` occurs exactly once in its file and its `new` occurs zero times (all twelve held).
Apply in verdict order by exact single replacement; after each, the `new` text occurs exactly once. Then: a round-trip
(each `new` replaced back by its `old`, in reverse order) reproduces every before-file byte for byte; every after-file
parses as JavaScript (body parsed by Node 22 as an async function body with `export` stripped; the ten before-files parse
the same way); the after-diff (9 files, 12 hunks) was read whole.

## Corrections applied (12 of 12 scripts-family corrections)

| # | File | Kind | What | Result |
|---|---|---|---|---|
| C1 | workflows/36-realm-review.js | record | dated header comment above `export const meta` (S1, S2, S3, F14: lines 109, 110, 209, 27) | applied; old x1 before, new x1 after |
| C2 | workflows/36b-realm-review-continue.js | record | dated header comment (S1, S2, S3, F14: lines 108, 109, 184, 26) | applied; old x1, new x1 |
| C3 | workflows/37-faith-read.js | record | dated header comment (S5: line 15 "deity" where J380 records the owner's "diety") | applied; old x1, new x1 |
| C4 | workflows/38-systems-read.js | record | meta Implications detail "three systems" -> "four systems (five with faith)" (S6) | applied in place (meta line 8, now 9); old x0 after, new x1 |
| C5 | workflows/38-systems-read.js | record | dated header comment (S8: line 47, four files live in src/domain/worldPulse/) | applied; old x1, new x1 |
| C6 | workflows/38b-systems-read-continue.js | record | meta Read detail -> one live reader, eight replayed (S7) | applied in place (meta line 5, now 6); old x0 after, new x1 |
| C7 | workflows/38b-systems-read-continue.js | record | meta Implications detail "three systems" -> "six systems" (S6) | applied in place (meta line 8, now 9); old x0 after, new x1 |
| C8 | workflows/38b-systems-read-continue.js | record | dated header comment (S8) | applied WITH ADJUSTMENT (below); old x1, new x1 |
| C9 | workflows/40-lens-design.js | record | meta description "the seven lenses" -> "the eight lenses" (F11) | applied in place (line 3); old x0 after, new x1 |
| C10 | workflows/41-lens-close.js | record | dated header comment (S9, S10: lines 20, 25, 52; file o) | applied; old x1, new x1 |
| C11 | workflows/42-lens-final.js | record | dated header comment (S9, S10: lines 20, 25, 52; file p) | applied; old x1, new x1 |
| C12 | workflows/43-lens-q.js | record | dated header comment (S9, S10: lines 20, 25, 52; file q) | applied; old x1, new x1 |

Fragment count per file: 36 = 1; 36b = 1; 37 = 1; 38 = 2; 38b = 3; 39 = 0 (no correction; untouched, md5 0f1a176d
unchanged); 40 = 1; 41 = 1; 42 = 1; 43 = 1. Total 12 fragments in 9 files. Line counts: 36 211->212, 36b 186->187,
37 83->84, 38 126->127, 38b 130->131, 39 94, 40 76, 41 68->69, 42 68->69, 43 68->69 (1,110 -> 1,118). Every prompt
text (template literal) is byte-identical to the before-file; the header comments sit outside every template literal.

### Adjustment (C8)

C8's `old` matched exactly once, but its `new` text cites "line 61 (alignment-code brief)" for 38b. Read whole, 38b's
alignment-code brief (`{ key: 'alignment-code', brief: 'Code: read WHOLE src/domain/worldPulse/settlementAlignment.js
… src/domain/corruption.js, supplyKernel.js, migrationKernel.js, peaceReasons.js, warSeatBooks.js …`) is line **48**
of the script as it ran (`grep -n warSeatBooks` returns 38b:48 and 38:47); line 61 is the population subject's
`key: 'population', …` line. The citation came from the verifier's S8 row (scripts-verify.md:27, "38b:61") and was
carried into scripts.md:30 and the verdict. Applied the intended correction with "line 48 (alignment-code brief)" in
place of "line 61 (alignment-code brief)"; the rest of C8's text is verbatim. scripts-verify.md and scripts.md are not
this lane's files and were not edited (their "38b:61" stands as their record; noted here for J392).

### Observation on the cited line numbers (no change made)

Every header comment cites line numbers of the script as it ran (the verdict's own convention: rulings S2/S3 cite
36:110, 36:209 etc.). The one-line comment shifts each later line down by one, so in the after-files each cited line
now sits one line lower (e.g. 36's TI brief is now line 110). The comment says "this script ran as … record; its prompt
text stays as fed", which reads as the as-run numbering; the C8 adjustment keeps the same as-run convention (48, not 49).
Fable to confirm or reword under J392.

## Corrections NOT applied here (out of family)

| # | File | Kind | Why not | State |
|---|---|---|---|---|
| C13 | docs/HANDOFF.md | record | not a scripts-family file (this lane edits only workflows/36–43); script cell for wf_a7c82671-f52 -> workflows/38b-systems-read-continue.js (F12) | old still present exactly once (checked 2026-10-18 05:27 UTC); no other apply record names HANDOFF — for routing / J392 |
| C14 | docs/HANDOFF.md | record | same; script cell for wf_868a6476-905 -> workflows/39-plague-read.js (F12) | old still present exactly once; for routing / J392 |

No correction of kind `design`; no correction aimed at `docs/PROGRESS.md`. For J392 (from the rulings, no edit here):
R7/F13 — the owner's review ask quoted at 36:40 ("comprehensively read and review [SettlementForge's] simulator … to
better refine your approach to the FMG / the realm integration") is recorded nowhere else and J392 should carry it.

## Notice lines

No line in any of the ten family files begins with "> PENDING FABLE REVIEW — written by Opus 5.5 standing in for the
Fable seat" (grep `^> PENDING FABLE REVIEW` over workflows/36–43: 0 lines). The ten occurrences of that text are inside
the scripts' `NOTICE`/`notice` constants (36:17, 36b:15, 37:12, 38:14, 38b:15, 39:13, 40:16, 41:16, 42:16, 43:16 as
run), which the verdict keeps "as the record of what the outputs were told to carry"; they were left untouched. As the
verdict says, the family carries no notice of its own; its notice_replacement line is the family verdict:

> Fable-reviewed 2026-10-18: PASS-WITH-CORRECTIONS — ten scripts ran as their J-rows record; one wrong host path (a file absent at 81f1cd96), ten imprecise meta/prompt statements, no design statement of their own (lane retrovalidation/scripts; J392)

## Bundle check

`python3 tools/bundle_architecture.py --check` -> `UP TO DATE /home/user/maps-architecture/docs/ARCHITECTURE-FULL.md`,
exit 0 (the workflow scripts are not bundle sources).

## After-file checksums (md5, first 8)

36 399c01b1; 36b 9a0605ce; 37 7e26ba0e; 38 7156de54; 38b 71cb2f55; 39 0f1a176d (unchanged); 40 b81b90f3; 41 15943721;
42 c523e79b; 43 7f98ba6e.
