# Integration check of stage group 9 — M0-a-09, M0-a-14, M0-c-01, M0-d-08 (flow flow-7, 2026-10-06)

Lane `check/integration-flow-7-g9`. **Verdict: PASS — no blocker.**

**The seat.** This seat is Opus 5.5 in Claude Code on the owner's Windows PC. The machine check printed
`wsl:Intel(R) Core(TM) i9-10900K CPU @ 3.70GHz:20cpu:16gib` and the Node version is 24.12.0. The seat is independent
of the four items' authors, their fixers and their checkers. It changed no file of any item. It ran no git command.
Its ledger row is **L-0203** (see `plat/CLEAN-ROOM.md`). It ran from 04:57 to __END__. The probes and logs are in
`~/maps-scratch/waves/integration-g9/` (logs in `logs/`).

**Busy state.** The brief lists no busy item. In practice two dependencies were being worked on in the tree during
this check. `build/M0-a-05-fix-s6` is reworking `kernel/src/insert/` and its tests: `landed:verify -- flow-7 --item
M0-a-05` fails ("changed since") on `insert/insertChain.ts` and four step3-5 test files. `build/M0-a-06-fix-s1` landed
`tx/relevel.ts` and `tx/tx.ts` at about 04:55, and `check/M0-a-06-close-s1` is checking that fix now. M0-a-06's record
verifies (`ok`). Every result below was taken on the tree as it stood, insert code in flight included. No red that
this check met traces to a group file.

**How it ran.** Each item had already passed its own check (`checks/M0-a-09.md` closing r1, `M0-a-14.md` closing r1,
`M0-c-01.md` closing r1, `M0-d-08.md` closing r1). This check looks only at the points where the pieces meet. The
probes run with `tsx --conditions=plat-source` from `plat/`. They import the packages' `src/` and the items'
read-only test support (`kernel/test/arr/bands/support.ts`'s `network`, `crossing`, `widthsOf`; `kernel/test/tx/support.ts`'s
`spec`, `commit`, `allProblems`) by absolute path. They write nothing in `plat/`.

## The meeting points

The four items share no record that one writes and another reads at M0. M0-c-01 is data only: it writes no arena,
and its commits are M0-c-02's. The real meeting points are these:

| # | where the pieces meet | promise checked | probe |
|---|---|---|---|
| A | M0-a-09's corridorUnion (L2) and bandUnion (L3) commits ⟷ M0-a-14's suite wired into the transaction (`suiteEnv`), and its stage-end, save and CI rows | §3.10 / §5.3: the suite's hard rows refuse no valid commit and change no committed result; the band ops leave an arena every row accepts; §13.2's cost rule, O(touched) | P1, P5 |
| B | M0-a-09's band ops ⟷ M0-d-08's harnesses (`runTwiceCompare`, `permutationCompare`, `dilationCompare`, `renumberSlots`) | §3.3 "no output depends on slot numbers"; §13.1 / §13.2 op order and renumbering identity; §6.5 (9) time dilation | P2 (with a planted negative control) |
| C | M0-a-14's verdicts ⟷ M0-d-08's renumbering, on M0-d-08's own sequences (M0-a-06's batch fixtures and M0-k-02's constructive arenas) and on M0-a-09's networks | a hard row's verdict is slot-free, so a renumbered run never refuses where the fresh one commits | P3 |
| D | M0-c-01's S3 slice ⟷ M0-d-08's dilation shim | §6.5 (9), §5.1 (5): a model package reads no clock; byte-identical output under ×10 and ×0.1 | P4 |

## Gates, run once

| gate | result |
|---|---|
| `corepack pnpm install --frozen-lockfile` | exit 0 |
| `corepack pnpm lint` (with `probe-red`) | exit 0. eslint checked 718 files with 0 errors and 0 warnings. probe-red flagged `zz-probe.ts` lines 6–14 as expected. |
| `corepack pnpm build` | exit 0 |
| `landed:verify -- flow-7 --item` M0-a-09 / M0-a-14 / M0-c-01 / M0-d-08 | ok, 1 record each. Dependencies: M0-a-06, M0-a-07 and M0-a-13 ok. M0-a-05 FAIL on its in-flight files (fix-s6; a note, N-1). M0-a-08 FAIL only on `kernel/src/arr/index.ts`, which M0-a-08 handed over to M0-a-09 (C-0122). That is the brief's not-a-blocker case. |
| near, full strength (PLAT_FUZZ_RUNS unset, W=2, 04:58–05:24): `kernel/test/arr/bands/`, `testkit/test/kernel/arr-bands/`, `kernel/test/invariants/`, `testkit/test/determinism/`, `layout/test/siting/` | **27/27 files, 266/266 tests passed.** |
| related at PLAT_FUZZ_RUNS=1000 over the union of the group's 34 changed source files (M0-a-09's five `arr/` files, M0-a-14's eight `invariants/` files, M0-c-01's twelve `layout/src/{fixtures,siting}/` files, M0-d-08's nine `testkit/src/determinism/` files; W=2, 05:25–05:37) | 2217/2219 tests passed; 145/147 files passed. Both reds are M0-a-08's oracle agreements (`testkit/test/kernel/arr-booleans-buffers/agreement-buffer.test.ts` and `agreement-faces.test.ts` › offsetFace). **Every one of their 11 failure lines is `ours: E_INVARIANT insert: no route from … keeps clearance (§3.10) within the fidelity bound (N-43)`.** That refusal is M0-a-05's insertChain, which fix-s6 is reworking now. These are the same reds as integration-g8's N-6. M0-a-09's only change on their import path is the four re-export lines it appended to `arr/index.ts`. M0-a-09's checker ran a control at PLAT_FUZZ_SEED=4242 and got the same failures with and without those lines (lane log 02:36). This makes them a note (N-1), not the group's. |
| whole suite once at reduced strength (J194: `PLAT_FUZZ_RUNS=1000 corepack pnpm test`, W=__WW__, __WHOLE_TIME__) | __WHOLE__ |

## Composition probes

All probes exited 0. Every count below comes from the probe's own output in `logs/`.

**P1 — band ops through the suite** (`p1-bands-suite.mts 600 9001`, 91 s). The probe draws 600 random street networks
of bfuzz's shapes, seeded: 1–3 chords, near-parallel and near-corner ones, scalar or two-knot half-widths, some below
`attractCm`, round or square ends. Each network is built twice. corridorUnion runs at L2 (S9) over every L1 face,
once plain and once with `suiteEnv` wired in. bandUnion then runs at L3 along the first chain, on top of that commit,
the same two ways. The results:

- corridorUnion: 600/600 plain commit = suite commit. 189 wrote nothing (no chord survived, or every band was
  thinner than attraction).
- bandUnion: 533 plain commit = suite commit (222 of them wrote nothing). In 2 cases plain and suite gave the same
  refusal, E_INVARIANT, which is insertChain's (N-1).
- On every commit, the suite-wired arena is byte-identical to the plain one (M0-d-08's `arenaPrint`).
- On every commit, the arena oracles (`allProblems`) report 0 problems.
- On every commit, these all report 0 hard problems: `checkBatch` on the commit record, `checkStageEnd`, and `checkCI`
  (Euler per level).
- The suite's report line for each committed batch has no hard problem.
- **bad 0.**

The suite's cost meter read at most 141 faces in one batch, and at most 5.67 checked faces per touched face (§13.2:
bounded by a constant × touched). On the crossing fixture (`p1v.mts`), every applicable row had subjects (for
example simple-faces 81, index-freshness 70, role-consistency 5). So the suite really ran on the band ops' output and
was not vacuous. `kerb` and `corridor_split` are not linear roles in `LINEAR_PARTS`, so role-consistency does not count
the many kerb rings that name one district owner as "parts" (checked by reading `tx.ts:418` and `batch.ts:540`).

**P2 — band ops under the determinism harnesses** (`p2-bands-determinism.mts 150 9002`, 95 s). The probe builds 150
seeded networks as `DeterminismSequence`s. The first batch is a **declared** L2 batch with one `opCorridorUnion` op per
L1 face. Each face is named by a lattice point inside it, so the batch rebuilds on any slot assignment. The second batch
is a callback bandUnion at L3. The results:

- `runTwiceCompare` (fresh, again, reversed, randomly renumbered before every batch): 150/150 identical. Outcomes:
  97 commit/commit, 23 commit/nothing, 16 nothing/nothing, 14 one batch only.
- `permutationCompare` (reversed plus 3 random op orders): 150/150 identical.
- `dilationCompare` (×10 and ×0.1, every fifth case): 30/30 identical, with 0 clock reads.
- A callback corridorUnion over the face list in slot order and in reverse order gave one outcome in 150/150 cases.
- **bad 0.**

Negative control (`p2c-control.mts`): a planted slot-dependent batch (corridorUnion over the lowest-slot face only)
diverged under renumbering in 8 of 10 sequences. So the harness does see the band ops' output. The other 2 networks
are symmetric enough that the face the reversal picks bands the same way.

**P3 — the suite's verdicts against renumbering** (`p3-suite-renumber.mts 60`). The probe ran on M0-a-06's 5 batch
fixture sequences, on 166 constructive sequences (M0-k-02's M0 cases at seeds 1 and 2), and on 60 band networks:

- With the suite wired into every batch, every outcome equals the plain run's: 5/5, 166/166 and 60/60.
- The suite-wired sequences stay identical under `runTwiceCompare`: 231/231.
- On every final arena, the whole-arena verdicts (`checkStageEnd`, `checkSave`, `checkCI`, and `checkBatch` over
  `wholeRecord`) equal, row by row, the verdicts on `renumberSlots` copies (random seed 5, reversed, random seed 99).
  Compared per row: holds, subjects and problem count. 693/693 equal.
- No final arena had a stage-end or CI hard problem.
- **bad 0.**

**P4 — the S3 slice under dilation** (`p4-slice-dilation.mts`, seeds 1–6). For each seed, the probe runs
`flatFixture(seed)` then `s3Slice`, and serialises the whole slice (about 77 MB of JSON per seed). It runs once, again,
under ×10 and under ×0.1. All four runs are byte-identical for every seed, and the shim answered **0 clock reads**.
Control: the same shim counted 2 reads on `performance.now() + Date.now()`. Per-seed digests: seed 1
`3822b6f0144cfb460db362bca313c02f`, seed 3 `3aa12ac7…`, seed 4 `2c52b357…`, seed 5 `f15108b8…`, seed 6 `61ced6e2…`.

**P5 — kept content across corridorUnion and the suite** (`p5-kept.mts`, `p5b.mts`). The fixture is a crossing with an
earlier batch's L3 ring in the SW face.

- corridorUnion over the other three faces, with the suite wired and given the kept-content row's before-image
  (keptBelow = S9), commits. The row holds (subjects 1). The SW face's L3 faces keep their point sets, stage, owner and
  area exactly.
- corridorUnion over all four faces refuses `E_KEPT` and leaves the arena unchanged. This matches C-0212 (6), which
  stages "kept content nested in the L2 face" to M3a.
- Oracles: 0 problems.

## Notes (not blockers)

- **N-1 (M0-a-05, in flight).** insertChain's E_INVARIANT `insert: no route … within the fidelity bound (N-43)` causes
  three things in this check: the 2 related reds (M0-a-08's buffer and offsetFace agreements), the 2 bandUnion
  refusals in P1, and M0-a-05's `landed:verify` FAIL. It is M0-a-05's open work (fix-s6). No group file is on its path
  apart from M0-a-09's four barrel re-export lines, and the earlier control cleared those. The same note as
  integration-g8's N-6.
- **N-2 (M0-a-08, handover).** `landed:verify -- flow-7 --item M0-a-08` fails only on `kernel/src/arr/index.ts`.
  M0-a-08 handed that file over to M0-a-09 (C-0122). M0-a-09's record covers it and verifies.
- **N-3 (an observation for the session, outside the group).** A face that insertChain creates by splitting a face
  takes over the split face's stage rank (`insert/rewalk.ts:166`), not the batch's. For example, an L3 ring inserted
  in a batch of stage 4 inside faces that a stage-8 `setOwner` re-ranked gives L3 faces of rank 8 (`p5c.mts`). This
  check's composition does not depend on it: the transaction's E_KEPT and M0-a-14's kept-content row both read the
  same `stage` column, and they agreed in P5. Whether "made by a stage" (§3.3 kept content, §3.10's row) means this is
  M0-a-05's or M0-a-06's to judge. It is recorded here so it is not lost. It is not a finding of this group.
- **N-4 (load).** Other seats kept the load average at 11–13 for the whole check, so `test_budget.py` gave W=2 (near,
  related) and W=1 (whole). Timings in the logs are informative only (J198; this machine is not §12.1's reference).
  The whole run started when available memory was about 23 % (3.7 GiB). That is just under the quarter rule; with one
  worker it stayed well inside, and nothing else was started alongside it.

## Probes and logs

`~/maps-scratch/waves/integration-g9/`: `lib.mts`, `p1-bands-suite.mts`, `p1v.mts`, `p2-bands-determinism.mts`,
`p2c-control.mts`, `p3-suite-renumber.mts`, `p4-slice-dilation.mts`, `p5-kept.mts`, `p5b.mts`, `p5c.mts`; logs
`logs/{install,lint,build,near,related,whole,p1,p2,p3,p4}.log`.
