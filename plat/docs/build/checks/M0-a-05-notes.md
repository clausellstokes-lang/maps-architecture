# M0-a-05 — the closing check's notes (not failing lines)

These notes come from the closing check of item M0-a-05 (lane `check/M0-a-05-close-r1`, 2026-10-04). Under the
session's rulings J162 and J169, the closing check fails the item only on a blocker. The finding below is not a
blocker, and it is not a defect of the item: it concerns the command form the gates and the memory rule use. Its row
names its handling and where it belongs. The verdict and its evidence are in `checks/M0-a-05.md` (the closing round is
at the top).

The first check's notes (N-1 – N-10: the W_SNAP_PASSES reading, the equivalent and unreached mutants, the four edge
kinds' (c) fixture, the routing of "remove(insert(x)) ≡ id", the timing workload, M0-a-04's `applySplitPlan` defect,
L-0115's reads, the nightly size, the 25 – 26 cm mandatory chain, the closed M0-a-04 notes) are bullets in
`checks/M0-a-05.md` round 1. This file starts its own numbering at N-1.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-1 | **`corepack pnpm test -- <flags>` drops the flags: vitest parses nothing after `--`.** Round 1's gate log starts `> vitest run -- --project kernel --maxWorkers=2` and ends `Test Files  163 passed`. The fix's record says "test --project kernel 0 (163 files 1806 tests)". But `corepack pnpm exec vitest run --project kernel --maxWorkers=2` runs `87 passed (87)` · `791 passed (791)`, and `corepack pnpm exec vitest run --maxWorkers=2` (the whole workspace) runs `163 passed (163)` · `1806 passed (1806)`. So the "kernel" figure is the whole workspace (CONFIRMED, executed 2026-10-04). vitest 5.0.3's CLI parser (`node_modules/.pnpm/vitest@5.0.3_…/dist/chunks/cac.DfDGTQ9W.js` 560 – 573) moves every argument after `--` into `options['--']` and parses none of them as options, and nothing in vitest's `dist/` reads `options['--']` (grep; CONFIRMED by reading). `--maxWorkers=2` written after `--` is therefore ignored too, and the run uses vitest's default worker count. That count was not measured (PLAUSIBLE: more than two on this 8-core machine). The form without `--`, `corepack pnpm test --project kernel --maxWorkers=2 packages/kernel/test/insert/step3-5/rewalk.test.ts`, passes them: `> vitest run --project kernel --maxWorkers=2 packages/…/rewalk.test.ts` → `Test Files  1 passed (1)` (CONFIRMED). J168's example in the lane briefs ("corepack pnpm test -- --maxWorkers=2") is the dropping form. | The session should write J168's example and M0.md §3 step 3's `test --project <package>` as `corepack pnpm test --project <p> --maxWorkers=2` (no `--`) or `corepack pnpm exec vitest run --project <p> --maxWorkers=2`. Records that quote "test --project kernel … 163 files" should read them as whole-workspace runs. They are green either way, and no verdict changes. | now (the session's run rules, J168); not an M4 item |
