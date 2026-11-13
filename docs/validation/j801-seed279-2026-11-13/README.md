# Two seed-dependent reds of the head, read at PLAT_FUZZ_SEED=279049297 (J801, 2026-11-13)

Gate child G1 ran the eighty-third landing's gate in its own container. Its NEAR run (the bands folder and testkit's
arr-bands comparisons, full strength) drew the seed 279049297 and read EIGHT reds where the managing seat's own run of
the same gate, at seed 1821770369, read the six declared ones (Q152).

The two extra tests were run again here at that seed, alone, on two trees:

| tree | what it is | result |
|---|---|---|
| a6b04f90 (`c05s4.log`) | the eighty-second landing: the design head's kernel and testkit, WITHOUT M0-a-09 S20 | 2 failed, 45 passed |
| eb95c034 (`a09s20.log`) | the eighty-third landing: with M0-a-09 S20 + S21 | 2 failed, 45 passed |

Command, in each tree's `plat/`: `PLAT_FUZZ_SEED=279049297 corepack pnpm exec vitest run --maxWorkers=1
packages/kernel/test/arr/bands/derived.test.ts packages/testkit/test/kernel/arr-bands/agreement-tilerings.test.ts`.
The two logs are kept here trimmed: the seed line, every failing line, the tiling harness's tally and the failure blocks whole (each line cut at 4 000 characters); the passing lines are left out.

So neither red is the landing's. Both are reds of the head at that seed:

1. `derived.test.ts` 'straight lanes on B-FUZZ's chord networks (one chord in four widthless): 100 networks' —
   'expected 192 to be 193': the planted control that asserts more than its plant gives. Queue row Q191, declared;
   owed as a test-only line at round 2B's no-shift round.
2. `agreement-tilerings.test.ts` 'every ring's pieces, by attraction; the overlap refusal only where the oracle's piece
   has a hole' — one case of 10 000: `tileRings` refuses 'overlap' at ring 2 on an attracted case that the judge reads
   as having neither a hole nor two boundary parts within attractCm. NEW: queue row Q206, with the session's reading of
   the case (an earlier ring's corner stands 21.5 cm outside the ring's edge; the attraction closes a bay whose mouth is
   46 cm wide).
