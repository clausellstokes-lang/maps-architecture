# J717 — the mixer census seam (Q144), 2026-11-09

The session's seam on `plat/packages/kernel/test/facade/mixer.test.ts` (M0-a-16's lint test), lane
`session/a16-mixer-seam-1`, CLEAN-ROOM row L-0737. The ruling and its reasons are in docs/PROGRESS.md, row J717.

**Before** (the tree at 95819abd, the file alone, `corepack pnpm exec vitest run --maxWorkers=1
packages/kernel/test/facade/mixer.test.ts`, 20:52Z): 1 failed, 6 passed of 7 — the first test's list of calls received
`bench/src/timing-phase/workloads.ts call streamKey in streamKeyGroup` beside `packages/kernel/src/rng/rng.ts call
mixInto in stream` (red on main since M0-t-00's landing 8c5fc203; Q144). `mutant-1-call-unlisted.log` is the same red
reproduced on the seam's text with the call list emptied.

**After** (`validate-after.log`): 7 passed of 7. `eslint.log`: exit 0 on the file.

**The lists' pins** (each a one-line change of the seam's text, run alone, the file restored after):

| log | change | result |
|---|---|---|
| mutant-1-call-unlisted.log | `HARNESS_MIXER_CALLS` emptied | red: the workloads call is received unlisted |
| mutant-2-stale-entry.log | a second entry no file makes (`bench/src/timing-phase/index.ts call streamKey in run`) | red: the listed call is missing |
| mutant-3-import-unlisted.log | `HARNESS_MIXER_IMPORTS` emptied | red: the workloads import is received unlisted |
| mutant-4-model-site-listed.log | `Rng.stream`'s own call added to the harness list | red: the model's one call is no longer found outside the list (and the list holds a call of `mixInto` in a model package) |

No source file was changed: `bench/src/timing-phase/workloads.ts` (M0-t-00's) and `packages/kernel/src/rng/` (M0-d-01's)
were read only.
