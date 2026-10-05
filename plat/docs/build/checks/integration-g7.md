# Integration check of stage group 7 — M0-a-06, M0-d-05a, M0-k-02 (lane `check/integration-flow-7-g7`, flow flow-7, 2026-10-05)

## Re-check (2026-10-05, after `build/M0-k-02-fix1`): verdict PASS — B-1 fixed, no blocker

**The seat.** The same lane, re-dispatched after M0-k-02's fix of B-1 landed (00:30) and its closing check passed
(00:38, `checks/M0-k-02.md`). Ledger row **L-0146**. No git command; no file of any item changed. The first round's
record stays below, as it was.

**Gates (run once, whole suite: this check ends a phase).**

| gate | result |
|---|---|
| `corepack pnpm run install:frozen` | exit 0 |
| `corepack pnpm lint` (with `probe-red`) | exit 1. probe-red ok (`zz-probe.ts` lines 6–16 flagged). All 21 errors are in two files of BUSY items: `kernel/src/digest/levelDigest.ts` (M0-d-04) and `kernel/src/warp/warp.ts` (M0-a-13). Nothing in the group's files: a note, not a blocker. |
| `corepack pnpm build` | exit 2. One TS2345 in `model/test/digest/records.test.ts:110` (M0-d-04, BUSY, written 00:40): a `naming` entry carrying a `DerivationRecord` where `RecordsEntry` asks for a `NamingRecord`. This is the busy item's own test against its own `records.ts`: a note. |
| `corepack pnpm test -- --maxWorkers=2` | 15 failed, 2945 passed (2960); 7 of 215 files. 13 are J176's five Mac-reference bench files (Apple M1, Rosetta `arch -x86_64`, launchd, pmset, Chromium 1223): the baseline. The other two are notes, not blockers: (a) `kernel/test/faces/bfuzz.test.ts` (M0-a-07, BUSY; file and `faces/claim.ts` written 00:36). It throws `tx: a claim ring's marker cycle closes` from `claim.ts:89` `follow`, through M0-a-06's generic `check` helper (`tx/state.ts:143`). The guard and the fault are in a-07's own claim code. (b) `model/test/types/types.test.ts` (M0-m-01, passed): one test times out at 5 000 ms (5 383 ms alone). With `--testTimeout=60000` it passes 9/9. This is a timing-only red: J157 forbids gating on a timing here. The program it builds grew with M0-d-04's new `model/src/digest/*` files (all written 00:31–00:46). |
| `landed:verify -- flow-7 --item M0-a-06` / `M0-d-05a` / `M0-k-02` | ok (1 record each) |

**Probes re-run** (scratchpad `waves/integration-g7/`; the case data now comes from the fixed generators):

| # | probe | result |
|---|---|---|
| P3r | `p3r-profiles.mts 200`. This is `p3-profiles.mts` with stretch-way's far part read as "beyond j2, away from j1" (N-10 of `checks/M0-k-02-notes.md`), plus an order check. | `remove/split-rejoin-profile`: the case's whole expect (within 10⁻⁹ cm, **profile-bit-identical**, no problem) holds on **200/200** (it was 105/200). `remove/stretch-way`: 200/200. Knot ordinals ascend, and every spine starts at its lower (y, x) end, on 600/600 draws of split-rejoin, stretch-way and tjunction-profiled-spine. The `canon` control is unchanged at 200/200. **B-1 fixed.** |
| P1 / P1c / P1d / P1e | re-run unchanged | clean, as before (2 000 lineage keys; 20/20 and 10/10 permutations identical; `addressKind` = `parseAddress` on 180/180) |
| P2 / P2b / P2c | re-run unchanged | as before: two-part refusal, work limit and empty tx hold 150/150 each. lane-from-spine: canonical print differences 0/300 (the 78 raw differences are N-2). stretchref-parts per-step: N-1. |

**New notes.** N-6 is lint/build/bfuzz red in busy M0-d-04, M0-a-13 and M0-a-07: their seats own them. N-7 is the
`types.test.ts` 5 s timeout (M0-m-01's test, timing-only, grown by busy M0-d-04's files). It is for the session: give
the reflection test an explicit timeout, or re-measure once M0-d-04 lands. N-8 is a carry-over of the first round's
stretch-way note: a runner (M0-k-04) must read `rekey: 'farPart'` as beyond j2, away from j1, since chain order may put
j2 before j1 (N-10 of the M0-k-02 notes).

---

# First round (2026-10-05 00:11) — kept as written

**The seat.** Opus 5.5 in a Claude Code cloud container: Linux x64, Node 24.12.0. The seat is independent of the three
items' authors and checkers. Its ledger row is **L-0142**. It ran no git command and changed no file of any item.

**How it ran.** Each item had already passed its own check (closing rounds: `checks/M0-a-06.md`, `checks/M0-d-05a.md`,
`checks/M0-k-02.md`). This check looks only at the points where the pieces meet. The probes were run with
`tsx --conditions=plat-source` from `plat/`, one process at a time. They import the packages' `src/` by absolute path
and write nothing into `plat/`. The probes and their logs are in the session scratchpad, under `waves/integration-g7/`:
`p1-lineage-order.mts`, `p1d-mint-into-tx.mts`, `p2lib.mts`, `p2-cases-through-tx.mts`, `p2b-detail.mts`,
`p2c-lane.mts`, `p3-profiles.mts` (and `p3-samples-only.mts`, which drops the profile-equality term: 200/200) and the gate logs. M0-d-05b was busy during this check, so its files were not judged.

## Verdict: FAIL — one blocker (B-1, the item to change: M0-k-02)

## Gates (run once)

| gate | result |
|---|---|
| `corepack pnpm run install:frozen` | exit 0 |
| `corepack pnpm lint` (with its `probe-red` check) | exit 0; probe-red: `zz-probe.ts:6 Math.pow`, `:7 Math.random`, `:8 Math.sin` flagged (the probe is red, as it should be) |
| `corepack pnpm build` | exit 0 |
| `corepack pnpm test -- --maxWorkers=2` | 13 failed, 2707 passed (2720); 5 of 196 files failed. All 13 failures are in J176's five Mac-reference bench files (`calibrate`, `host`, `contention`, `harness`, `sampler`) and fail for Mac-reference reasons: Apple M1, Rosetta, launchd, pmset, Chromium. These are the container's baseline red, so the gate passes. |
| `landed:verify -- flow-7 --item M0-a-06` / `M0-d-05a` / `M0-k-02` | ok (1 record each); every record is labelled flow-7 |

## Where the items meet, and what the probes found

| # | meeting point | probe (honest inputs) | result |
|---|---|---|---|
| P1 | M0-d-05a's `lineageHash` becomes the lineage key of M0-a-06's declared form (§3.3 *Two op forms*, §6.3; C-0185 (2)) | 2 000 seeded lineage keys (ground parts 0–2, with and without a unit, random stage, epoch, index and reroll) | Every hash passes `canonicalOrder`'s Hash64 check (two u32 words). `canonicalOrder` equals the model's `compareLineage` and the unsigned 64-bit order (high word first). **Clean.** |
| P1c | a declared batch whose ops are keyed by d-05a hashes | 14 crossing L1 ways in a framed arena, run under 20 random permutations | The base commits valid (M0-a-04 / M0-a-05 oracles). All 20 permutations give the identical content print. **Clean.** |
| P1d | `mint` output becomes tx input: `identity.lineage` is the op key and `identity.id` is the role row's entity | 8 records: one lineage collides with a survivor (dup 1), one address equals a live id (`~1`), one address equals a tombstone (`~1`) | The minted lineages and ids are distinct. Each entity appears in the arena. 10/10 permutations are identical. **Clean.** |
| P1e | the kernel's `addressKind` (M0-a-05, read by the anchor allocation that M0-a-06's permuted-preparation test relies on) against the model's `parseAddress` | 180 minted ids: 4 arenas (ground, `under/`, `under7/`, `sky2/`) × 5 kinds (including `.` and `-`) × 3 hashes × {bare, `~1`, `~12`} | The two give the same kind on 180/180. **Clean.** |
| P2 | M0-k-02's case data run through M0-a-06's `tx` and writers | `remove/two-part-way-refused`, 150 draws | E_INVARIANT (role consistency) with the version kept on 150/150, which is the case's expected code. **Clean.** |
| P2 | (same) | `limit/cap-tx-work-limit`, 150 draws, `KernelTx.workLimit = params.workLimit` | E_WORK_LIMIT with content and version kept on 150/150. **Clean.** |
| P2 | (same) | `limit/no-input-empty-tx`, 150 draws | ok with the version kept on 150/150. **Clean.** |
| P2 | (same) | `remove/lane-from-spine`, 300 draws | The arena is restored exactly on 300/300, with no oracle problem. 78 draws differ only in the *test support's* print, `contentPrint`, and the cause is in the print, not the arena (note N-2). **Clean.** |
| P2 | (same) | `limit/data-stretchref-parts`, 150 draws | With the steps run as one batch: E_DEGENERATE `stretch` with the version kept on 150/150. With each step its own batch, the second `insertChain` is refused E_INVARIANT (a `way` declares 1 part, C-0185 (8)) (note N-1). |
| P3 | `remove/stretch-way` through `retypeEdges` (far-part rekey) + `removeEdges` (cut knots) + `sampleChain` | 200 draws | Every remaining per-vertex sample is within 10⁻⁹ cm. The lanes' edges are unchanged and there is no oracle problem. **Clean.** |
| P3 | `remove/split-rejoin-profile` through `insertChain` knots, `retypeEdges` split and join, and `sampleProfile` | 200 draws, with knot ordinals as the case's data gives them | Split: within 10⁻⁹ cm on 200/200. Re-join: the sampled lists are bit-identical on 200/200. **The re-joined profile equals the original bit for bit on only 105/200 (B-1).** |

## B-1 (BLOCKER) — the knot ordinals in M0-k-02's profiled draws run against the chain order M0-a-06 numbers knots in

**What happens.** M0-k-02's profiled generators (`packages/testkit/src/constructive/cases/removals.ts`, starting with
`buildSplitRejoin`) give `params.knots` as vertex indices in the *draw's* vertex order, and the knots' ordinals and
`params.knotValues` follow that order. `place` then applies one of eight symmetries, so on about half of the draws
the draw's first vertex is the **upper** (y, x) end of the chain.

M0-a-06 numbers knots differently. Its `retypeEdges` rekey renumbers both entities' knots "from 0 in chain order"
(C-0185 (6)–(7)): an open run is counted from its lower (y, x) end. §2.2 rule 5 says the same, since a join
"concatenates their knots in chain order".

So when an original profile was numbered from the upper end, a split followed by a re-join gives the profile back
**renumbered**. Its values are reversed (seed 0: original `[512.5, 258.5]`, re-joined `[258.5, 512.5]`), and the
arena's knot rows carry swapped ordinals. The profile as a function along the chain is unchanged: the sampled lists
are bit-identical on 200/200.

**Why it blocks.** The case's own expected outcome includes `profile-bit-identical`, which `properties.ts` defines as
"the re-joined profile equals the original bit for bit (§13.1)". That outcome fails on **95/200** draws when the two
items are composed. M0-k-04 (wave 11) would run this exact composition and find the case red. The two items disagree
on an order: the order one item writes the knots in is not the order the other reads them in.

**Control.** Renumbering the same draws' knots and values in chain order, from the lower (y, x) end (probe
`p3-profiles.mts 200 canon`), makes the case hold its whole expected outcome on **200/200**: within 10⁻⁹ cm,
bit-identical, no problem.

**The item to change: M0-k-02.** Its profiled generators (`remove/split-rejoin-profile`, and for consistency
`remove/tjunction-profiled-spine`, `remove/stretch-way`, `remove/stretch-ring` and `limit/one-item-profile-knot`)
should number `params.knots` / `knotValues` in `resolve`'s chain order. For an open chain that is from its lower
(y, x) end after placement; for a ring it is counter-clockwise from its lowest-leftmost vertex. The fix needs a
choices row naming the reading (the creating stage numbers knots in chain order, §2.2 rule 5 / C-0185 (6)) and a test
that the ordinals are ascending in chain order on every draw.

The other way to resolve B-1 would be for M0-a-06 to keep an original numbering against the chain order across a
join. This seat does not name that route: C-0185 (7) follows the design's "in chain order".

## Notes (not blockers)

- **N-1 (for M0-k-04).** `limit/data-stretchref-parts` gives a `way` in two parts, but a committed `way` is one part
  (§3.10 role consistency; C-0185 (8) `LINEAR_PARTS`). The case's steps reach their expected E_DEGENERATE `stretch`
  only when the runner issues them as **one batch** (150/150), or when it hands the batch an `env.chainParts`
  declaring 2 parts. The case data does not say where its batches begin and end. The runner (M0-k-04, wave 11) should
  run a case's steps in one callback batch unless a step says otherwise. M0-k-02 could also state the batching in the
  case; that change is optional.
- **N-2 (M0-a-05's test support).** `contentPrint`'s `ringText` (`kernel/test/insert/step3-5/support.ts`) rotates a
  face ring to the *first* occurrence of its least vertex. When a walk visits that vertex twice (an antenna: a spine
  floating in a face), two walks of the same cycle can print differently. In P2, 78/300 lane-from-spine draws printed
  differently while the least-rotation print was equal on 300/300. M0-a-06's restoration tests use this print, so a
  future fixture with a floating spine could fail spuriously. Comparing least rotations would remove the problem.
- **N-3 (M0-k-02 / M0-k-04).** Seventeen step ops in the case data are not `@plat/kernel` exports: `splitFace`,
  `warp`, `pinVertices`, `rebuildPartitions`, `tileRings`, `booleans`, `buffer`, `offsetFace`, `insetRing`, `kerb`,
  `insertSegments`, `readSlots`, `encodeArena`, `corruptChunk`, `decodeArena`, `regenerate` and `corridorUnion`. They name later items' operations (M0-a-07 … M0-a-16) or runner actions. This is expected (C-0110: M0-k-04
  maps them). It is listed so the runner covers each name.
- **N-4 (M0-d-04, not of this group).** The DirtySet hook was not composed with a digest here, because M0-d-04 is not
  in the group. N-2's walk rotation never reaches the arena: the stored cycle is identical.
- **N-5 (busy item).** M0-d-05b was busy and was not judged. P1d drove `mint` without succession: there were no
  handed-on addresses.
