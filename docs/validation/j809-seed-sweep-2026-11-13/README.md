# The early seed sweep of 2026-11-13 (J809, J812, J814): 24 seeds, 1 000 runs, 273 test files, on 998f7cbc

Six sweep children (tools/session/gates/sweep-child.md; sweep.sh, sweep-list.py, sweep-sum.py) read every test file a
fixed PLAT_FUZZ_SEED can reach at each of 24 seeds, four seeds a child, and ran every red file again alone on one
worker at the same seed. The tree is the design head's plat/ as it stood before the eighty-sixth landing.

| seeds | red at the seed (each red again alone unless marked) |
|---|---|
| all 24 | Q152's six bands tests (five tagged; the sixth, closing.test.ts 'C-0421's mechanism …', was tagged NEW by a table that matched a plain apostrophe — corrected); **Q210** packages/site/test/terrain/range.test.ts's one-door scan (a red of the head, not of a seed: J812) |
| 383651388, 781851602, 111911704 | Q209 (a) bench/test/timing-phase/script.test.ts's real-detector case — GREEN alone (the load flake) |
| 1186406395, 284554526 | Q191 derived.test.ts 'straight lanes …' (2 of 24: the share of J811) |
| 284554526 | derived.test.ts 'bent lanes and slits …' — the planted CONTROL, 17 of 18 ('expected 17 to be 18'); the same seed's 'straight lanes' is red on the FLOOR (21 < 27). Folded into LINE 8 of M0-a-09 S22 (Q191) |
| 1368891952 | **Q211** packages/kernel/test/arr/booleans-buffers/buffer.test.ts 'a property over random chains … every output ring simple, outer rings counter-clockwise, every vertex within 2 w (+ √2 · attractCm when attracted) of the chain' — 'Property failed after 28 tests', shrunk to the chain (0,1926) (10415,0) (0,2579) (8393,3), half-width 1994, round joins, round ends |
| 1186406395 | **Q212** packages/testkit/test/kernel/arr-booleans-buffers/agreement-buffer.test.ts — 'insertChain's refusals in buffer against the measured cap: expected 22 to be less than or equal to 17' |

Not met at any of the 24 seeds: Q206 (the tileRings agreement; it was met at full strength), Q153 (the dilation flake).

The managing seat ran the three new reds again on the head (a worktree of 5551a876, whose plat/ is the swept tree's):

    PLAT_FUZZ_SEED=1368891952 PLAT_FUZZ_RUNS=1000 corepack pnpm exec vitest run --maxWorkers=1 packages/kernel/test/arr/booleans-buffers/buffer.test.ts
    PLAT_FUZZ_SEED=1186406395 PLAT_FUZZ_RUNS=1000 corepack pnpm exec vitest run --maxWorkers=1 packages/testkit/test/kernel/arr-booleans-buffers/agreement-buffer.test.ts
    PLAT_FUZZ_SEED=284554526  PLAT_FUZZ_RUNS=1000 corepack pnpm exec vitest run --maxWorkers=1 --silent=false packages/kernel/test/arr/bands/derived.test.ts -t "lanes"

Each is red as the sweep said: `buffer-1368891952.log`, `agreement-buffer-1186406395.log` (whole) and
`derived-284554526.excerpt.log` (the two DERIVED lines and the failures).

A set PLAT_FUZZ_SEED also overrides the test kit's family seeds (J809 (3)): for Q211 and Q212 the first question of
their round is which kind of draw went red — a property with no seed of its own (red in a plain run whose run seed is
unlucky) or a family-seeded one (red only under a fixed seed).
