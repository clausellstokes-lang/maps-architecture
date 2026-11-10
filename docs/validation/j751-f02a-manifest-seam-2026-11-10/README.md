# J751 — the tier manifest test's argv seam (Q94's test half), 2026-11-10

The session's seam on `plat/bench/test/tiers/manifest.test.ts` (M0-f-02a's test), lane `session/f02a-seam-2`,
CLEAN-ROOM row L-0771. One expected value changed: the argv the test expects of the PR tier's 24 B-FUZZ
`--primitive` units (:97) gains `'--no-ladders', '--no-s11'` after `'--no-summary'`. That is the argv M0-f-02b S1
landed for those units (Q94; the fifty-eighth landing, 31c6aa74). The constructive-set unit's expected argv (:99)
and every other assertion of the file are unchanged.

Why the session makes it: the line sits in M0-f-02a's file, and M0-f-02b S1 (leg 2 of the merged round) may not
write it. The leg reported the diff verbatim in `plat/docs/build/checks/M0-f-02b-notes.md` ('Hardening round S1'),
and its closing check ran the tree with this one line in a mirror before the landing (RELATED@1000 14 files
206 / 206; without it 205 / 206, the one red this line).

| log | run | result |
|---|---|---|
| before.log | the file alone on the landed tree (31c6aa74), before the seam | 10 passed of 11; the one red is the case 'B-FUZZ: one unit per kernel primitive at 10⁴ …' at :97 (expected the old argv; received the two flags more) |
| after.log | the file alone after the seam (verbose) | 11 passed of 11 |
| eslint.log | eslint on the file | exit 0 |

No source file changed. M0-f-02a's landed record is re-landed under the seam's lane.
