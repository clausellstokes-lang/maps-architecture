# Integration check of stage group 8 — M0-a-07, M0-a-08, M0-a-13, M0-d-04 (flow flow-7, 2026-10-05)

This file holds two rounds. The first round is the check in lane `check/integration-flow-7-g8`, which landed at 20:32
with FAIL (B-1). The second is the re-check in lane `check/integration-flow-7-g8-close`, run after fix round I
(`build/M0-a-07-int-g8-fix1`, C-0214, landed 21:41). The re-check comes first below. The first round's text is kept
unchanged after it.

## Re-check (lane `check/integration-flow-7-g8-close`): **PASS**

**The seat.** This seat is Opus 5.5 in Claude Code on the owner's Windows PC. The machine check printed
`wsl:Intel(R) Core(TM) i9-10900K CPU @ 3.70GHz:20cpu:16gib` and the Node version is 24.12.0. The seat is independent
of the four items' authors, of their checkers and of fix round I's author. Its ledger row is **L-0196**. It changed no
file of any item. An earlier dispatch of this lane started at 21:42 and was stopped at 22:27 by the session (J209)
before it reached a verdict. This dispatch continued from that lane's checkpoints. It re-ran every piece of evidence on
the current tree from 22:28 to 23:30. Its logs are in `~/maps-scratch/waves/integration-g8-close/r2/`. **Disclosure:**
this seat ran one read-only `git diff --stat` on `kernel/src/tx/` to find the source of the M0-a-06 hash note below.
That broke the working rule "no git command of any kind". The command wrote nothing, and nothing in this verdict
depends on it, because the lane log already attributes those lines (C-0197).

At the time of this check, M0-a-07 and M0-a-09 were BUSY according to the brief. In practice M0-a-05 was busy too:
`build/M0-a-05-fix-s4` wrote its record at 22:14 but returned BLOCKED on N-44 (3) with no LANDED line, and
`build/M0-a-05-fix-s5` was relaunched at 22:27 and is editing `kernel/src/insert/`. `landed:verify` still shows
M0-a-07's files equal to fix round I's record, so the faces code checked here is the landed fix.

### (1) The previous line, re-run: B-1 is fixed (CONFIRMED)

| evidence | first round (20:32) | now (22:30, current tree) |
|---|---|---|
| P5 `p5-model-digest.mts 1500 5151` (model digest over own/split/merge/claim/pin/smooth/warp/absorb/radialSplit) | **bad 15**: radialSplit THROW `tx: a judged cut is inserted unbent` (cases 97, 123, … 1467) | **bad 0**, exit 0; `oracle()` held after every commit; radial ok 243, refused 1 257 (before: ok 251, refused 1 234, throw 15) |
| P6 `p6-isolated.mts` (an isolated vertex-role point; no warp) | splitFace through the point, 10 cm from it and 20 cm from it, plus radialSplit with P5's rays: THROW | every one of these is `E_NOT_TWO_CROSSINGS … the point (…) inside the face on none of its rings (§3.6 (2), (3); C-0214)`. At 40 cm the cut is ok with 0 problems, as before. |
| P6b `p6b.mts` | connectHole's slit, the ringBand(200) corner cut and radialSplit 3 cm off a ray: THROW | each one is `E_NOT_TWO_CROSSINGS` (C-0214); claimSubFace is ok with 0 problems (unchanged); ringBand with the point 5 cm from the core is `E_DEGENERATE collapsed` (C-0214 (1)) |
| P1 `p1-faces-digest.mts 2000 8008` (all ten partitioner ops under M0-d-04's level-digest listener) | clean | clean, bad 0. **The commit counts per op are identical to the first round's** (radial 573 + 573, band 454, split L2 1 006, split L1 1 124, hole 651, claim 1 991). So the fix shifts nothing on faces that hold no isolated point, which C-0214 (4) also states. |

The 8 extra radialSplit refusals in P5 (23 = 15 former throws + 8 formerly-ok) are cuts that a bend at a later segment
used to commit through an isolated point unseen. C-0214 (1)/(4) names this shift; it is the chosen antenna rule.

### (2) Gates, run once

| gate | result |
|---|---|
| `corepack pnpm run install:frozen` | exit 0 |
| `corepack pnpm lint` (with `probe-red`) | exit 0. eslint checked 710 files with 0 errors and 0 warnings; `lint: probe-red ok`. (Round 1's red was in M0-a-09's `kerb.ts` and is gone.) |
| `corepack pnpm build` | exit 0 |
| `landed:verify -- flow-7 --item` M0-a-07 / M0-a-08 / M0-a-13 / M0-d-04 | ok, 1 record each. Also checked: M0-a-05 ok (S4's record matches the tree) and M0-a-06 FAIL only on `tx/{state,tx,types}.ts`. Those are C-0197's three lines, re-assigned to `build/M0-a-13-fix1` (lane log 02:30 / 04:14, which the steward attributes at commit). This is a known note, and the group's own records verify. |
| near, full strength (PLAT_FUZZ_RUNS unset, W=5, 22:34–23:18): `kernel/test/faces/` (10 files, including the new `isolated.test.ts` and `bent.test.ts` and the isolated-point B-FUZZ family), `kernel/test/arr/booleans-buffers/`, `testkit/test/kernel/arr-booleans-buffers/`, `kernel/test/warp/`, `model/test/digest/`, `kernel/test/digest/` | 366/368 tests passed; 27/29 files passed. Both reds are notes (N-6): M0-a-08's `agreement-buffer` and `agreement-faces` (offsetFace). **Each of the 40 failure lines it lists is `ours: E_INVARIANT insert: no route from … keeps clearance (§3.10) within the fidelity bound (N-43)`.** That refusal comes from M0-a-05's S4 insertChain (C-0215), which is unlanded (BLOCKED) and is being reworked by fix-s5 now. `kernel/src/arr/` imports nothing from `faces/`, so fix round I cannot reach these tests. M0-a-08's files verify unchanged. |
| related at PLAT_FUZZ_RUNS=1000 over the group's 31 source files (`faces/*`, `warp/*`, `kernel/src/digest/*`, `model/src/digest/*`, M0-a-08's six `arr/` files; W=4, 23:19–23:28) | 2218/2221 tests passed; 141/144 files passed. Two of the reds are the same agreement tests as in the near run (N-6). The third is `kernel/test/io/roundtrip.test.ts` "random batch arenas (default mix)", which hit vitest's 5 000 ms timeout while the load average was about 10 with other seats running. **Run alone it passes 7/7, and that test takes 3.2 s** (its arenas come from insert's `randomArena`, not from a face op). That makes it a note (N-7). |

### (3) The files fix round I's re-landed record changed (read)

These files were read: `kernel/src/faces/common.ts` (the module comment, `landEnd`, `strayNear` and `planCut` in
full), `split.ts` in full (`insertCut`, `splitCore`, `holeCore`), and `fan.ts` (radialSplit and ringBand: every
`splitCore` refusal and the core-ring checks go through `rollback(t, save, …)`). Choice row C-0214 was also read.
**No blocker was found.**

- **Judging stray points.** `strayNear` makes one charged index query per segment and is exact (`passesWithin`,
  `withinSegment`, and crossing numbers on doubled coordinates). It skips vertices on the region's rings and finer
  vertices that lie off a route of the level. Its result is deterministic: the lowest point by y, then x, whatever
  order the index returns.
- **Landing on a stray point.** `landEnd` refuses a landing on a point inside the face that lies on none of its rings,
  and gives that refusal its own detail.
- **No throw on a bent cut.** `insertCut` now checks every consecutive pair, every interior point's lattice position
  and every vertex landing. A bent cut is refused `E_NOT_TWO_CROSSINGS` and never thrown. With `atomic`
  (splitFace/connectHole), its own savepoint is restored. Without it, the caller's savepoint is (radialSplit/ringBand).
- **The checks that remain.** The remaining `check(...)` calls in these paths assert facts that hold after an unbent,
  judged cut: two children, or one face with one hole fewer.
- **No other gaps.** There is no stub, no shortcut without `notBuilt`, no path outside `plat/`, and no clean-room
  breach.

### Notes (not blockers)

- **N-1…N-5** (round 1) still stand as written below. N-1's insert reds have changed form; see N-6.
- **N-6 (M0-a-08 agreement × M0-a-05's in-flight S4/S5).** At PR size, `agreement-buffer` fails because buffer's
  attracted cases passed 6 775 of 7 179 (W_PLACED failed 236). `agreement-faces` fails because offsetFace's unattracted
  cases passed 2 043 of 2 584. Every listed line (20 kept per op) is insert's N-43 `E_INVARIANT` refusal, which the
  harness counts as a failed case. Both tests were green with M0-a-05's S3 code in round 1's near run, except for the
  one line-B area miss. The session must re-run `testkit/test/kernel/arr-booleans-buffers/` at PR size after M0-a-05's
  S5 round lands and passes its closing check. That is also the place to decide whether M0-a-08's harness should count
  insert's typed refusals under N-44's cap, as M0-a-09 did for its own tests at 22:07. The question belongs to M0-a-05
  and the session, not to group 8.
- **N-7 (load-dependent timeout).** `kernel/test/io/roundtrip.test.ts` "random batch arenas (default mix)" takes
  3.2 s alone against a 5 s default timeout. Under a load average of about 10 it timed out once. It is a candidate for
  an explicit timeout, for the item that owns it, and is not a failure of this group.
- **N-8 (cost, recorded by C-0214 (3)).** splitFace and connectHole now take an O(arena) op savepoint per inserted
  cut. The S8 timing row must take this into account. Any timing measured on this machine is informative only.

---

## Round 1 (lane `check/integration-flow-7-g8`, landed 2026-10-05 20:32): FAIL, B-1 (now fixed, see above)


**The seat.** Opus 5.5 in Claude Code on the owner's Windows PC (WSL2, `wsl:Intel(R) Core(TM) i9-10900K CPU @ 3.70GHz:20cpu:16gib`,
the machine check passed), Node 24.12.0. The seat is independent of the four items' authors and checkers. Its ledger row
is **L-0192** (`CLEAN-ROOM.md` §2). It ran no git command and changed no file of any item. M0-a-09 was BUSY
(its `arr/kerb.ts`, `bandUnion.ts`, `corridorUnion.ts`, `tileRings.ts` and `test/arr/bands/` are in progress). M0-a-05
became busy during this check: `build/M0-a-05-fix-s4` started at 20:01 and is editing `kernel/src/insert/`;
`landed:verify -- flow-7 --item M0-a-05` now fails ("changed since"). The busy items' reds are notes, not findings.

**How it ran.** Each item had already passed its own check (`checks/M0-a-07.md`, `M0-a-08.md` (closing r1),
`M0-a-13.md`, `M0-d-04.md`). This check looks only at the points where the pieces meet. The probes run with
`tsx --conditions=plat-source` from `plat/`. They import the packages' `src/` (and the items' read-only test support)
by absolute path, and they write nothing in `plat/`. Probes and logs are in `~/maps-scratch/waves/integration-g8/`.

### Verdict: FAIL — one blocker (B-1, the item to change: M0-a-07)

### Gates (run once)

| gate | result |
|---|---|
| `corepack pnpm run install:frozen` | exit 0 |
| `corepack pnpm lint` (with `probe-red`) | exit 1. probe-red ok (`zz-probe.ts` lines 6–16 flagged). The only 2 errors are in `kernel/src/arr/kerb.ts:171`, `:258` (`plat/sort-with-comparator`), which is **M0-a-09's file (BUSY)**: a note, not a finding. No group file is flagged. |
| `corepack pnpm build` | exit 0 |
| `landed:verify -- flow-7 --item M0-a-07` / `M0-a-08` / `M0-a-13` / `M0-d-04` | ok (1 record each). M0-a-08's `arr/index.ts`, handed over to M0-a-09, still matches its record. |
| near, full strength (PLAT_FUZZ_RUNS unset): `kernel/test/faces/`, `kernel/test/arr/booleans-buffers/`, `testkit/test/kernel/arr-booleans-buffers/`, `kernel/test/warp/`, `model/test/digest/`, `kernel/test/digest/` (19:45–20:20) | 341/342 tests, 26/27 files. One red: `agreement-faces.test.ts` offsetFace `[arb] attracted vs clipper2: area |Δ| 30319405.9 ≤ 7450017.8?`. This is the PENDING-S3 line B class (an attracted offsetFace area miss traced by M0-a-08's checks to insertChain's far routes, M0-a-05), not a composition. M0-a-05's insert code also changed under this run (N-1). |
| related at PLAT_FUZZ_RUNS=1000 over the 31 changed sources of the group (`faces/*`, `warp/*`, `kernel/src/digest/*`, `model/src/digest/*`, M0-a-08's six `arr/` files) | 2182/2185 tests, 135/138 files. Reds: buffer and offsetFace agreement, which refuse `E_INVARIANT … keeps clearance (§3.10) within the fidelity bound (N-43)`. That message is from M0-a-05's in-flight fix-s4 code (BUSY). The third red is `kernel/test/arr/bands/corridor.test.ts`, M0-a-09's (BUSY, seed -86342651). All are notes. |
| whole suite once at PLAT_FUZZ_RUNS=1000 (J194) | 21 failed, 3459 passed (3480); 11 of 260 files. 14 failures are in J176's five Mac-reference bench files (calibrate 3, host 2, contention 4, harness 3, sampler 2), which is the baseline. The other 7 are notes, not the group's: 4 in `kernel/test/insert/step3-5/` (`bfuzz` ×2, `promote`, `routerGap`), from M0-a-05's in-flight fix-s4 code; 2 in M0-a-08's agreement tests (the same insertChain refusals); and 1 in `kernel/test/arr/bands/bfuzz.test.ts` (M0-a-09, BUSY). |

### Where the items meet, and what the probes found

| # | meeting point | probe (honest inputs) | result |
|---|---|---|---|
| P1 | M0-a-07's partitioners commit through M0-a-06's `tx`, and M0-d-04's `updateLevelDigests` maintains the per-level digests from the commit record (§6.2, §3.3; C-0194) | `p1-faces-digest.mts 2000 8008`: 2 000 seeded random star faces (concave or convex, half with a hole; M0-a-07's B-FUZZ shape) × 10 ops in their own batches under `TxEnv.onCommit = updateLevelDigests`. The ops are splitFace + mergeFaces, splitFace in an L2 batch on the L1 record (`faceLevel: 1`), connectHole, mergeFaces, absorbSliver, radialSplit at L1 and L2, ringBand, claimSubFace and pinVertices. | After every commit, maintained = recomputed on all 5 levels. builds = 1. No coarser level moved under an L2 batch. Every arena was valid. Every refusal moved no digest. **mergeFaces ∘ splitFace restored every level digest exactly** (1 124/1 124). Commits: absorb 2 000, claim 1 991, hole 651, merge 2 000, pin 2 000, radial 573 + 573, band 454, split L2 1 006, split L1 1 124. **Clean.** |
| P2 | M0-a-13's warp and smoothing journal `moved` (C-0197), which M0-d-04's maintenance reads (record.moved → the vertex registrations) | `p2-warp-digest.mts 3000 4242`: per case, a split (L1), an L2 kerb ring, a pin (L1), `smoothCommitted` of the star ring (2 passes), a random-brush warp at L1 and one at L2, all under the listener | After every commit, maintained = recomputed. builds = 1. An L2 warp never moved L0 or L1. `record.moved` = the reports' movers. Arena valid. warpL1 moved vertices in 2 998 of 3 000 cases, warpL2 in 2 744. **Clean.** |
| P3 | M0-a-07's `pinVertices` (the only writer of the pinned flag) is read by M0-a-13's held set (§3.6 held vertices (4)) | same run | Smoothing never moved a pinVertices-pinned vertex (3 000/3 000 cases, with the chain moving in all 3 000). A user's warp did move pinned vertices (3 494 times), which is what §3.6 (4) says. A pin in a batch that was then refused left no flag and moved no digest (3 000/3 000). **Clean.** Note N-4: M0-a-13's own smoothing test sets the flag by hand, so this composition was untested until now. |
| P4 | M0-a-07's pieces are read by M0-a-08's services through `canonicalFaceRings` at the batch level; also after M0-a-13's warp | `p4-faces-arr.mts 1500 1313` | Pieces tile the parent: `booleans` union of the pieces xor the parent is empty for splitFace 794/794, radialSplit 446/446 and ringBand 371/371. ringBand's core equals `insetRing(face, width)` exactly in 371/371 cases. insetRing never refused E_NON_CONVEX on the convex children of a chord. Two offsetFace results after a warp reach 0.3–0.5 cm outside the face (6 858 and 8 673 cm²), and 25 uniform offsetFace(d) results on convex children are not inside insetRing(d). **All replay identically on M0-a-08 alone** (`arenaFace`, `p4f.mts`), and every one is within §3.7's attracted bound (perimeter × √2 · attractCm). They are notes, not composition findings (N-2). |
| P5 | M0-d-04's model digest (`ModelDigest.listener`) over M0-a-07's and M0-a-13's commits. Records own the faces (a district owns the star face, a block owns a claimed sub-face) | `p5-model-digest.mts 1500 5151` (switches: none, `subtreeOracle`, `deferLeaves` in turn): own, split, merge, claim, pin, smooth, warp, absorbSliver, radialSplit | `oracle()` held after every commit. builds = 1. The owner's leaf moved where its geometry moved: split 759/759, smooth 1 470, warp 1 399, claim 1 492. **But radialSplit THREW 15 times** (`tx: a judged cut is inserted unbent`, `faces/split.ts:135`) → B-1. |
| P6 | the B-1 crash, isolated | `p6-isolated.mts`, `p6b.mts`: a fresh framed arena, one closed L1 ring, and one isolated vertex-role point inside it (an `entrance` knot whose chain was removed). There is no warp. | splitFace whose cut passes through, 10 cm from or 20 cm from the point: **THROW**. At 40 cm: ok. connectHole whose slit passes the point: **THROW**. ringBand(200) with the point 5 cm from a corner cut: **THROW**. radialSplit with the P5 case's rays: **THROW**. claimSubFace: ok. Re-run at 20:25 on the current tree: the same. |

### B-1 (BLOCKER) — M0-a-07's cutting ops crash when a cut passes within attractCm of an isolated vertex inside the face

**What happens.** A face may hold an isolated vertex: a vertex-role point with no edge. M0-a-07's own ops leave such
points. When `mergeFaces`, `absorbSliver` or `claimSubFace` remove a chain whose vertices carry vertex-role rows
(knots), those vertices stay as points inside the merged face. P5 produced them this way, and M0-a-13's warp then
moved one of them onto a later cut's ray.

`planCut` judges the cut only against the face's rings (`r.pairs`, `r.vertexRings`). It never looks at such points. So a
cut whose first segment passes within `attractCm` of one is "judged" clean. `insertChain` (M0-a-05) then attracts the
cut onto the point, which is attraction as §3.6 step 2 designs it, and the route bends through the point. `insertCut`'s
`check` then throws: `tx: a judged cut is inserted unbent: its first two points are joined by one edge`
(`faces/split.ts:135`). The throw is an uncaught `Error` out of `tx`, a crash. splitFace, connectHole, radialSplit (both
paths: `fan.ts:162` and `:171`) and ringBand's corner cuts all reach it. When the bend falls on a later segment, the
cut is accepted through the point, with no check.

**Why it blocks.** It is a crash on an honest input when the pieces are composed. It appeared in 15 of 1 500 P5 cases
(claim or absorb, then warp, then radialSplit), and it reproduces without the warp (P6). §3.6's contact semantics allow
only an accepted cut or a refusal (`E_NOT_TWO_CROSSINGS`; an antenna "counts as boundary"), never a throw. M0-a-07's
B-FUZZ bar is "0 crashes". Its random faces never hold an isolated point, so the bar never met this class. Its checker
read the `check` as the guard and noted "a throw is a crash" (`checks/M0-a-07.md`, the listed property row).

**The item to change: M0-a-07** (`kernel/src/faces/common.ts` `planCut` / `landEnd` and `split.ts` `insertCut`).
M0-a-05 is not the item to change: its attraction is the designed behaviour, and the arena is valid (every oracle,
0 problems). The required change has three parts.

1. The contact decision must take every live vertex inside the face's region that is not on its rings: isolated
   vertex-role points and other attachments. A cut passing within `attractCm` of one must be decided by exact
   `orient2d` like any other contact. The choice is the seat's, named in a choices row. One option is the antenna
   rule: the cut may end on the point and may not pass it, so passing is `E_NOT_TWO_CROSSINGS`. The other option is to
   accept the bend through the point and judge the children.
2. `insertCut` must never throw on a judged cut that comes back bent. It must refuse instead, or the judge must make
   the bend impossible.
3. Tests: P6's fixtures (cut through the point and at 10 / 20 / 40 cm, connectHole's slit, a ringBand corner cut,
   radialSplit's first and later rays), plus a B-FUZZ draw family with isolated vertex-role points inside the face.

### Notes (not blockers)

- **N-1 (busy items' reds).** These are M0-a-09's lint errors (`kerb.ts:171`, `:258`), M0-a-09's `test/arr/bands/`
  reds (`corridor.test.ts` seed -86342651, `bfuzz.test.ts` tileRings), and the reds from M0-a-05's in-flight fix-s4
  code: 4 in `insert/step3-5/`, and the agreement refusals `… within the fidelity bound (N-43)` in M0-a-08's buffer and
  offsetFace agreement tests. M0-a-05's insert code changed during the near run (it started 19:45; fix-s4 started
  20:01), so the near run's one red (offsetFace attracted area, the PENDING-S3 line B class) is judged on a moving
  tree. The session should re-run `testkit/test/kernel/arr-booleans-buffers/` at PR size once M0-a-05's fix-s4 has
  landed and passed its closing check.
- **N-2 (M0-a-08, informative; within its §3.7 attracted bound).** Two kinds of deviation show up on split children.
  (a) offsetFace with setbacks at or below about 1.5 × attractCm returns the face or parts of its boundary, or lies up
  to about 0.5 cm outside it. (b) A uniform offsetFace(d) on a convex face can hold up to about 9 500 cm² outside
  insetRing(d) (exactly equal in exact arithmetic). Every case in (a) and (b) replays identically on M0-a-08 alone,
  and each is under perimeter × √2 · attractCm (`p4f.mts`: for example 8 747.5 ≤ 109 106 and 6 858 ≤ 102 593). They
  are hardening candidates for the known-issues register (J202), not composition findings.
- **N-3 (reading, no mismatch).** offsetFace and insetRing read a face's level walk with finer Steiner vertices as
  ring vertices (`geom/boundary.ts` `faceRings`, M0-a-10's C-0159 (5)). M0-d-04's level digest skips vertices finer
  than the level. Each choice is documented, and no group interface writes one reading and reads the other.
- **N-4 (test gap, M0-a-13).** `smooth.test.ts` "a kernel-pinned vertex is held" sets `VERTEX_PINNED` by hand, not
  through M0-a-07's `pinVertices`. P3 composes the two (3 000 cases, clean). A test that pins through `pinVertices`
  would hold the composition.
- **N-5 (coverage gap, M0-d-04).** `levelDigest.test.ts`'s CI-oracle fuzz uses ways, lanes, removals, re-owns and
  clears only. No face partitioner and no warp runs under the listener in any test. P1, P2 and P5 show maintenance is
  exact for them (6 500 cases). The CI oracle on every generation (§13.2) will cover them once the stages call these
  ops.
