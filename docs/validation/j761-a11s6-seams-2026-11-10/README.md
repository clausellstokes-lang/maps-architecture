# J761 — the session's seam for M0-a-11 S6's declared shift, 2026-11-10

M0-a-11 S6 gives the skeleton's `spine` and `regions` readers the design's 1° corner bound (roof keeps 5°).
Five tests of other items pinned the old 5° behaviour for `spine`; the round may not edit them and handed
back blocked on them. The seam is three files, proven in a scratch tree at the round's head
(wip/child-a11s6 @ d938e302) and held on the side ref `wip/seam-a11s6-pins` (86ebf29d) until it lands in one
commit with the round:

| file (owner) | change |
|---|---|
| `plat/packages/testkit/src/constructive/cases/limits.ts` (M0-k-02) | `buildSharpCorner` draws tan θ ≤ 0.017 (θ < 0.98°), sharper than every use's bound; the case's clause text and its witness's bound follow |
| `plat/packages/testkit/src/constructive/coverage.ts` (M0-k-02) | the row's text is the design's sentence as it stands |
| `plat/bench/test/skeleton/runner.test.ts` (M0-a-12) | the spine spike is 0.95° (12 000 × 200 cm) |

| file here | run | result |
|---|---|---|
| before.txt | the five red files and `constructive/cases.test.ts`, the round's head without the seam | 5 failed, 522 passed |
| after.txt | the same six files with the seam | 527 passed of 527 — no edit to `runner/constructive.test.ts`, `runner/ladders.test.ts`, `fuzz-bar/entry.test.ts` or `ladders/coverage.test.ts` |
| related1000.txt | `vitest related` over the two testkit sources at PLAT_FUZZ_RUNS=1000, three workers | 155 files, 2 438 of 2 439; the one red is `bench/test/site/summary.test.ts`'s canary — the stale-summary class the round's own shift causes (Q36), declared |
| seam.diff | the three files' diff against the round's head | |

eslint on the three files: exit 0. The round's fable closing check also judges these files (the ruling J761
is in the round's spec entry).
