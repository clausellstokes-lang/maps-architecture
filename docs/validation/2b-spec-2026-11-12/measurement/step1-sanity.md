# Step 1 — SANITY (P on the mirror `tree`)

Command: `scripts/run-sanity.sh` = from tree/plat, `PLAT_FUZZ_SEED=20261112 corepack pnpm exec vitest run --maxWorkers=1 --silent=false --project kernel packages/kernel/test/arr/bands/p2b-sanity.test.ts`
(scratch-only test file `tree/plat/packages/kernel/test/arr/bands/p2b-sanity.test.ts`; shadow.test.ts's mocks (insertChain, opSave counted),
its line-8 FIXTURES (12) and its corpus slice: B-FUZZ chord networks with three S8-style cuts, NETS = max(10, RUNS/100) = 100 at the PR size).
Log: results/step1-sanity.log. rc 0, 2/2 tests green.

Every live L1 face, both vertexContacts flags, read by the served `readKerb` (P) in an L1 readIn:

| figure | value |
|---|---|
| faces | 378 |
| reads | 756 |
| ok reads | 756 (refused 0) |
| served region byte-equal to exactRegionOfKey(exactKeyContentOfRead(readFace(...))) | 756 / 756 |
| insertChain calls inside a served read | 0 |
| opSave calls inside a served read | 0 |
| arena bits(p) changed by a read | 0 |
| arena state(p) changed by a read | 0 |
| (informative) constructionRead region equal to X on the same arena | 242 / 756 |
| (informative) insertChain calls made by the 756 construction reads | 3 045 |
| (informative) arena bits changed by the construction reads | 0 |

Result: SANITY HOLDS.
