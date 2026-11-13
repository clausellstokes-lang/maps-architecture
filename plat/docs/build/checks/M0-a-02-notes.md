# M0-a-02 — the closing check's notes (not failing lines)

These notes come from the closing check of M0-a-02's session fix round S1. That round was opened on ruling N-53 (4)
(J242) in `checks/M0-spec-notes.md`. The checking lane was `check/M0-a-02-close-s1` (flow flow-7, 2026-10-08). Under
J162 / J169 and N-45, a closing check fails the item only on a blocker. None of the rows below is a blocker. Each row
is a hardening test, or a report for another owner, and names where it belongs. The verdict and its evidence are in
`checks/M0-a-02-s1.md`. The earlier rounds' notes (N-r2-1 – N-r2-3) stay in `checks/M0-a-02.md`.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s1-1 (KI) | Mutant K02 changes `test/arena/tiny.ts` from `process.env.PLAT_TINY_TABLES === '1'` to `=== 'on'`. That breaks the env wiring of the switch. K02 survives the arena folder both without the variable and with `PLAT_TINY_TABLES=1` (98 of 98 each time). The reason: every N-53 (4) test sets the mode itself (`withTiny`, `setTinyTables`) and compares it with `TINY_TABLES`, the same expression. So no test notices when the variable stops turning the mode on. The wiring itself is correct, CONFIRMED by this seat's probe in its mirror's `kernel-tiny` project: a `createPlat` called directly from the tx folder gets capacity 1 with the variable and the asked capacity without it. Today the variable is wired correctly. If the wiring ever broke, though, the PR tier's tiny run would silently become a default-size run, and the guard would be gone without any red test. | A sentinel test included only in the PR tier's tiny project. It would assert `tinyTables() === true` and check the env directly, for example `expect(tinyTables()).toBe(process.env.PLAT_TINY_TABLES === '1')` together with `expect(process.env.PLAT_TINY_TABLES).toBe('1')`. The project is the session's (see N-s1-3), so the sentinel lands with it. | with the PR-tier entry (session); else M4 |
| N-s1-2 (KI) | Mutant K11 replaces `setFaceHoles`'s tiny-mode growth (`tinyTables() ? top + need : …`) with doubling, so the hole pool is exempt from exact fit. K11 survives the arena folder (98 of 98). C-0286 (2) lists "a hole pool" among the slot tables that grow by exactly what the allocation needs. The growth-preserves-content test asserts "exactly full" for vertices, pairs, role rows and faces, but not for the pools. The code keeps the claim, CONFIRMED by this seat's probe: 300 tiny-mode `setFaceHoles` calls over six faces, where every growth leaves the pool exactly full (green on the tree); under K11 only 1 of 4 growths does (red). The effect is limited to the guard's strength: under K11, a stale capture of `faces[l].holes` would meet a replacement less often. No output depends on it. This is the same class as N-r2-1: the code is right and no test holds it. | Add the per-level pool to the "exactly full" assertions of the growth-preserves-content test (`grown['faces[l].holes'] === tiny.slots.holesTop[l]` after a growing call). | M4 |
| N-s1-3 | The PR-tier tiny run is not in the tree. C-0286 (5) says the exact config entry was in the author lane's structured result, because `plat/vitest.config.ts` and the bench's pinned project list are outside M0-a-02's owns. This seat built such an entry in its mirror and verified it (see `checks/M0-a-02-s1.md`). It arms direct `createPlat` calls, and it shows the planted stale captures as reds. The entry: `{ extends: true, test: { name: 'kernel-tiny', root: './packages/kernel', include: ['test/insert/step1-2/**/*.test.ts', 'test/insert/step3-5/**/*.test.ts', 'test/tx/**/*.test.ts'], env: { PLAT_TINY_TABLES: '1' }, setupFiles: [...setupFiles, './packages/kernel/test/arena/tiny.ts'].map((f) => new URL(f, import.meta.url).pathname) } },` placed after `pkg('bench', './bench'),`. | The session lands the entry, together with the pinned project list in `bench/src/tier-jobs` / `tools/scaffold/workspace.test.mjs` and N-s1-1's sentinel. Do this only after N-s1-4 is fixed, or the PR tier goes red. | session (flow-7) |
| N-s1-4 (cross-item, M0-a-04) | Under the tiny run (this seat's `kernel-tiny`, 38 files / 532 tests), there are 6 reds, all on M0-a-04's test side, as C-0286 (6) reports. The first group is `step1-2/bfuzz.test.ts`'s splitThrough property and its near-frame property. Each captures `X = p.vertices.x` / `Y` before its splits, so it reads stale arrays: the first fails with `TypeError: Cannot convert undefined to a BigInt`, the second with `expected 'E_OUT_OF_RANGE' to be 'E_LEVEL'` (seed -1845346012). That is the N-53 class in a test. The second group is `splitThrough.test.ts`'s four P1 pins (the pair, vertex and declared-form pins, and the two-doublings property). They assume a full table doubles to 2·cap, and the mode replaces that premise (`expected 10 to be 18`, …). No src writer goes red. | M0-a-04's fix round (the session routes it, M0-FIX-QUEUE): re-read X/Y after each split in the two properties. Give the P1 pins a tiny-mode branch, or skip them only under the tiny project with a tag. | M0 (before the PR-tier entry lands) |

## Round S2 (lane `check/M0-a-02-close-s2`, flow flow-7, 2026-10-11)

These rows come from the closing check of M0-a-02's session fix round S2 (docs/M0-FIX-QUEUE.md Q33, J266; C-0313).
None of them is a blocker. The verdict and its evidence are in `checks/M0-a-02-s2.md`.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s2-1 (KI) | Two mutants survive the item's tests and the stamp tests that `vitest related` reaches (`test/arena`, `test/facade/stamps.test.ts`, `test/facade/reflection.test.ts`, `test/invariants/debug.test.ts`, `test/tx/savepoint.test.ts`; 140 of 140 green under each). K15 builds the faces view as `{ key: s.key, version: s.version, … }`, and K16 does the same for the edges view, so the generation is dropped from that one view. The reason they survive: the Q33 pins resolve only a vertex role (`junction`) after the restore. The code keeps the promise for every view, CONFIRMED by this seat's probe P1. P1 runs over real `tx` commits for n = 1 … 5 and reads a FaceRef, an edge role and an empty edge role. It is green on the tree and red under K15 and K16 (6 of 8 tests). Under either mutant the failure is loud, not silent: a fresh stamp of that view reads stale, so the debug build would assert on a valid value. | In the n = 1 / 3 pin, after the restore, also resolve a FaceRef and an edge-role ref, and expect `generation` 1 and `isCurrent` true for each. | M4 |
| N-s2-2 (cross-item, M0-a-16; the Q33 class) | The façade's stamp check still keys on the version alone (`facade/stamp.ts`: `stamp`, `stampWith`, `inlineStamp`, `assertStamped`). C-0313 (5)(a) reports this, but neither M0-FIX-QUEUE Q33 nor Q34 names it. Probe P4 CONFIRMED the silent read through `kernelOver([p])`. A façade `resolve` is read inside a commit, then `restoreSavepoint` undoes that commit and one later commit brings the version back to the same number (2). `stampOf(during)` is then `{"key":{"layer":"ground","part":0},"version":2}`, with no generation, and `k.assertCurrent(during, GROUND)` does NOT throw. On the same value, the arena's own `assertStamp` throws the restore-generation message. So a stale slot passes the façade's debug assertion silently, which is exactly Q33's fault one layer up. The hand-built stamps of `index/query.ts` (`QueryResult`, `Location`), `geom/neighbours.ts` (`FaceNeighbours`) and the façade's `LevelView` also carry no generation. Handed to the arena's `assertStamp` after a cross-commit restore, one of them would assert on a fresh value (loud); no `src/` path does that today. | The session routes a round to M0-a-16: `stamp` / `stampWith` / `inlineStamp` carry `restoreGeneration(p)`, and `assertStamped` compares it, as C-0313 did for the arena. The hand-built stamps should go through one helper. | M0 (the session's call, as for Q33 / Q34) |
| N-s2-3 (KI, M0-a-15) | `compactSlots` (io/compact.ts) copies the arena's key and version into the compacted copy. A stamp read on the original therefore reads as current on the copy, although the copy renumbers every slot. Probe P5 CONFIRMED it: `isCurrent(q, stamp of p)` is true, and the same `way` run is half-edge 20 on `p` and half-edge 6 on `q`. This predates round S2 (the version-only key had it too) and involves no restore. It is a deliberate-holder case: compaction runs on save (§3.9), and nothing in `src/` carries a stamp across it. | Make the copy's stamps distinct from the original's, for example by keying stamps on arena identity or by giving the copy a fresh state name, and pin it in `io/compact.test.ts`. | M4 |
| N-s2-4 (session; testkit agreement owner, M0-a-08 / M0-k) | In this seat's RELATED@1000 run, `testkit/test/kernel/arr-booleans-buffers/agreement-buffer.test.ts` went red: `expected 2 to be less than or equal to 1` at `support.ts:1388`. The run's line reads `refusals {"clipper2":1,"polygon-clipping":1} by step {"clipper2/cross-check":1,"polygon-clipping/measure":1} (counted 2 …)`. At the reduced size of 1 000 cases, the cap `Math.ceil(MAX_REFUSAL_SHARE · runs)` is 1. Both counted refusals are the third-party oracles' own. This is not the item's, CONFIRMED by instrumentation. With `restoreSavepoint` logging in this seat's mirror, the test never puts back a savepoint, so the restore generation stays 0 throughout. Round S2's code then writes no field and compares exactly as the version-only code did. The test does not replay from `PLAT_FUZZ_SEED`: the same tree with `PLAT_FUZZ_SEED=1595` drew 994 and then 995 cases on two runs. So the failing draw has no seed to report. | The session routes it to the agreement harness's owner: make the buffer cases replay from `PLAT_FUZZ_SEED` (C-0057). Decide whether a cap of 1 oracle refusal per 1 000 at the reduced RELATED size is meant, or whether the reduced size should use the PR-size share (10 per 10⁴). | M0 (session) |

## Round C1 — consolidation round R4 (lane `build/M0-a-02-consolidate-1`, flow flow-7, 2026-10-12)

The round applies A-1 – A-4, the comment rewrite C-arena-1 (with A-5) and T-support-1 of
`plat/docs/build/consolidation/kernel-plan.md` (§1.4, §2, §3.4; J260, J263 Q1, Q3, Q6, Q8; J270 (a), (c)) as fix round C1
of the item's consolidation lines. It changes no behaviour. The row is C-0332 (first appended as C-0329 in the child
container; that append did not survive the relaunch, and C-0329 is now M0-b-03's, so the continuing seat appended it
again under the next free id).

### What changed, and the equivalence shown

| finding | change | equivalence |
|---|---|---|
| A-1 | `arena/resolve.ts` exports `edgeRuns` by path (J263 Q1: not on `arena/index.ts`), with the doc comment that states C-0146 (5)'s order once: cut at set-degree ≠ 2; an open run from its lower (y, x) end; a loop off a branch vertex from it toward its smaller neighbour; a ring from its lowest-leftmost vertex counter-clockwise; runs by their first two vertices; repeats count once. No caller changed (`tx/chains.ts runsOfPairs` delegates in R6, io's `runsAt` in R12). | Emitted JS (comments removed) differs only by the `export` keyword. Pinned by a property against an oracle written from the rule on lattice positions: 10⁴ random planar grid arenas (random allocation order and edge direction, random subsets with repeats), 72 pair sets and every live chain of 12 tx fuzz arenas, and the fixtures. |
| A-2 | `stamp(p)` and `keyName(k)` exported from `arena/resolve.ts` by path, bodies unchanged; `debugCheck` stays the module's own with its `arena: ` prefix (J270 (a)). | Emitted JS differs only by `export`; every message text unchanged (the old stamp tests pass untouched; the new ones compare `stamp(p)` with each view's stamp, before and after a restore across commits). |
| A-3 | `five()` exported from `arena/plat.ts` by path, body unchanged. | Emitted JS differs only by `export`. |
| A-4 | `vertexAt` kept; its comment says it is the no-index path (the arena's `signature` of a lattice point; the façade's `signature` on an arena with no index; C-0146 (6)). T-facade-new-1 is M0-a-16's (R13). | Comment only. |
| A-5 / C-arena-1 | `plat.ts` (the `PlatCapacity` header, `createPlat`'s comment, the growth section), `debug.ts` (the tiny-tables mode: what it is, a test switch), `tables.ts:39`, `index.ts` (the scaffold provenance dropped; the by-path exports named) and `resolve.ts`'s module comment now state the rules and cite C-0286 / C-0313; the crash history and round names are gone. | Comments only; each read against the code. |
| T-support-1 | `test/arena/support.ts` exports `rng` (mulberry32: `0x6d2b79f5`, `>>> 0`) and `intIn`; `permutation` reads `rng`; `slots.test.ts`'s private copy deleted (it imports `rng`). | `support.test.ts` pins the first 16 draws of four seeds as 32-bit words (taken from the pre-round code), `permutation`'s orders and `intIn`'s draws, and compares 256 draws × 4 seeds with tx/fuzzgen.ts's and step1-2's copies. |

**NO-SHIFT.** A probe (`resolve` and `signature`/`vertexAt` on the fixtures in three allocation orders; 600 tx fuzz
sequences — DEFAULT_MIX and ALONG_MIX, 300 seeds, 14 batches each — with the maintained level digests after every batch
and the recomputed ones at the end; every live way and kerb resolved with its `routeLines`; 3 600 random
`district_bound` pair sets resolved; the stamps after a restore across commits) gives 17 597 lines, sha256
`434f4af6…`, byte-identical on the pre-round mirror and on the tree, and identical under `PLAT_TINY_TABLES=1`. Batch
outcomes in it: ok 6 829, E_KEPT 1 516, E_INVARIANT 55 before and after. `roles.json` and `index.ts`'s export lines
byte-identical; the exported names of `arena/index.ts` (hence of the barrel) unchanged.

**Continued after the relaunch (2026-10-12, same lane).** The first seat's scratch (the pre-round copy of the owns, the
probe and its mirror) did not survive the container's relaunch, and the pre-round files are not on this machine outside
git, so the byte comparison above is the first seat's (CHECKPOINT 02:54 in `docs/lane-events.log`). The continuing seat
re-established, against committed before-values: the exported names of `arena/index.ts` equal `packages/kernel/API.md`
Appendix B's arena line (82 values, 23 types, none added or removed); the five unchanged sources (`handles`, `keys`, `registry`, `rows`, `walk`) and `roles.json` hash
equal to the S2 landed record; the generator's 16-draw words of the four seeds equal an independent Python mulberry32;
the plan's oracles (`facade/stamps`, `invariants/debug`, `index/query`, `tx/profiles`, `digest/levelDigest`,
`io/roundtrip`) and the arena folder green at the PR size, with `io/roundtrip`'s "random batch arenas (default mix)"
over vitest's 5 s default on this machine (5.2 – 5.6 s; every assertion green with a 60 s timeout — a timing on a
machine that is not the timing reference, not a shift, N-c1-6); and 13 of the 32 mutants re-killed on the tree's tests in
a rebuilt mirror (below).

### Old file → new file map (J263 Q8)

No test file is renamed, merged or deleted; every describe/it title is kept (128 before, 145 after; 0 removed).

| old | new |
|---|---|
| `test/arena/support.ts` `permutation`'s inline mulberry32 | `test/arena/support.ts` `rng` (exported) and `intIn`; `permutation` reads `rng` |
| `test/arena/slots.test.ts` private `generator` | deleted; `slots.test.ts` imports `rng` from `./support.js` (same seeds, same sequences) |
| — | `test/arena/support.test.ts` (new): the generator's pins |
| — | `test/arena/resolve.test.ts`: describes "edgeRuns: the one run ordering (C-0146 (5); exported by path)" (4 its) and "stamp and keyName (exported by path; C-0313)" (3 its) |
| — | `test/arena/slots.test.ts`: describe "five: one number for every level, or five (plat.ts, exported by path)" (1 it) |

### Mutants re-killed (scratch mirror; the arena folder, `--bail=1`)

| id | mutation | killed by |
|---|---|---|
| E1 (= K07) | ring orientation flipped | "a ring starts at its lowest-leftmost vertex …"; alone, the new edgeRuns fixtures pin, property and fuzz-arena case |
| E2 (= K08) | open-run direction flipped | "a ChainRef gives its chain as one run …"; the three new edgeRuns cases |
| E3 (= K25) | loop-off-branch direction flipped | "a loop hanging off a branch vertex …"; the property and the fuzz-arena case |
| E4 (= K26) | runs sorted by first vertex only | the loop case; the property and the fuzz-arena case |
| E5 | ring not rotated to its lowest-leftmost vertex | "gives the same positions whatever order …"; the property |
| E6 | repeated pairs not deduplicated | the new fixtures pin; the property |
| E7 | walk not cut at a branch vertex | the branch case; the three new edgeRuns cases |
| E9 | a loop off a branch read as an open run | the loop case; the property and the fuzz-arena case |
| E10 | one run walked per branch vertex | the loop case; the property and the fuzz-arena case |
| E11 | runs in reverse order | the branch case; the three new edgeRuns cases |
| S1 (= S2's K7), S2 (= S2's K8), S8 (= S2's K4) | the stamp never / always writes the generation; assertStamp drops the generation check | the Q33 describe |
| S3, S4 | keyName reversed; the stamp shares the arena's key object | the stamp tests; "stamp(p) is the stamp resolve returns …" |
| S5 (= S2's K15), S6 (= S2's K16) | the faces / edges view drops the generation | "stamp(p) is the stamp resolve returns …" (N-s2-1's two survivors, now red) |
| S7 (= K11), S9 (= K23) | stale-version assertion removed; ordinal ignored | the resolve describe |
| F1, F2 | five copies a given five; drops the last level | the five pin; the tiny-tables content property |
| V1 (= K27), V2 (= N31) | vertexAt without liveness; misses the top slot | "reads a lattice point's live vertex …" |
| R1 (= S1's K22), R3 (= S1's K23), R2 (= S1's K05) | allocVertex / allocEdgePair read the table before its growth; doubling in the tiny mode | "grows every column by doubling …"; the tiny-tables content property |
| G1 – G5 | the generator's constant, final `>>> 0`, mixing word; intIn misses hi; permutation skips the top swap | `support.test.ts` |
| E8 | the collinear-corner tie at a ring's start dropped | survives — equivalent on lawful input (N-c1-3) |

Re-killed by the continuing seat after the relaunch (a rebuilt isolated mirror; the arena folder, `--bail=1`, one worker; baseline green; each file restored and `cmp`-checked): E1, E3, E4, E6, S1, S3, S5, F2, V1, R1, R2, G1, G4 — 13 of 13 red, each on the case named above; E1, E3 and E4 also red on the "edgeRuns: the one run ordering" describe alone (3, 2 and 2 of its 4 cases).

### Notes

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-c1-1 (R5, M0-a-03; the Q33 class) | `index/query.ts`'s private `stamp` is version-only; the arena's carries the restore generation since C-0313. The plan's "identical bodies" (A-2) holds for `keyName` and not for `stamp`: R5 adopting `arena/resolve.ts`'s `stamp` would add `generation` to a `Location` read after a restore across commits — a behaviour change of the Q33 class (C-0313 (5)), not an equivalence. | R5 adopts `keyName` as an equivalence and takes `stamp` as the Q33 fix for the index (its own pin), or keeps its own with a comment; the session's call. | R5 |
| N-c1-2 (plan) | `kernel-plan.md` §1.3 T-1 and the round's brief say the level digests read the run ordering; `digest/levelDigest.ts` imports no `resolve` (its chain items hash their own pieces). The readers are `resolve` and through it `routeLines` (tx/profile.ts), the stretch references (tx/chains.ts), warp (smooth.ts, held.ts), invariants/whole.ts and the façade; `edgeRuns`' comment names those. The NO-SHIFT probe still pins the level digests. | The session amends T-1's oracle list (keep `levelDigest.test.ts` as a regression, not as a reader). | — |
| N-c1-3 (equivalent) | Mutant E8 drops the collinear-corner tie at a ring's lowest-leftmost vertex (`turn === 0 && …`). Only a degenerate ring (overlapping edges, which §3.10 forbids) reaches it. | No test; the comment states the tie. | — |
| N-c1-4 (R6, T-tx-new-1) | The property shows `edgeRuns` equals an oracle written from C-0146 (5) on 10⁴ grid arenas and on 12 tx fuzz arenas (every live chain, 72 pair sets). R6 can compare `runsOfPairs` against `edgeRuns` imported by path (`../../src/arena/resolve.js`) and reuse `resolve.test.ts`'s `oracleRuns` reading if it wants an oracle. | R6 | R6 |
| N-c1-5 (T-support-1) | Eight byte-identical mulberry32 copies remain in other folders (`num/`, `skeleton/`, `medial/`, `geom/`, `index/` support, `tx/order.test.ts`, `tx/fuzzgen.ts`, `insert/step1-2/support.ts`; R2 kept its own, M0-a-04's N-c1-3). | Their owners import `rng` / `intIn` from `test/arena/support.ts` in their rounds. | R5 – R14 |
| N-c1-6 (machine timing; M0-a-15's file) | `test/io/roundtrip.test.ts` "random batch arenas (default mix)" runs 5.2 – 5.6 s on this cloud container (1 worker), over vitest's 5 s default timeout: red twice, green once, and green with every assertion under `--testTimeout=60000`. Not an assertion and not this round's (the arena's executable lines are unchanged); a timing here is informative only (not §12.1's reference). | The owner of `io/` gives the case an explicit timeout in its round (R12), as `resolve.test.ts`'s fuzz-arena case carries 120 s. | R12 |
| N-c1-7 (foreign; M0-x-06 with M0-b-03) | RELATED at `PLAT_FUZZ_RUNS=1000` over the five changed arena sources (465 files, 5 855 tests, one worker, 07:26 – 11:06): green but `packages/testkit/test/edge/repins.test.ts` "EP-01/S8/zero-length at 2521534151: S8's seam-portals row refuses lawful input — refused-lawful, named, rolled back (Q41)", which receives `laddered` for `refused-lawful`; red identically in this lane's mirror with the four new `export` keywords removed (the pre-round executable shape). The lawful-input refusal it pins (Q41) no longer happens: M0-b-03's S4 round (C-0329, the cross-chain portal readings) lets S8 commit there. | The session: M0-x-06's pin moves from refused-lawful to the new outcome (J264: a lawful refusal gone is the target), in M0-x-06's round. | — |

## Round C1's closing check (lane `check/M0-a-02-consolidate-close-1`, flow flow-7, 2026-10-12)

The closing check of consolidation round R4 passed (`checks/M0-a-02-c1.md`). None of these rows is a blocker. Each is a
tightening of a claim, an equivalence judged, or a report for another round's owner.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-c2-1 (comment tightening; T-support-1) | `test/arena/support.ts`'s header says the generator (`rng`, `intIn`) is the one "which the other folders' support files import from here". None does yet. Eight copies remain (N-c1-5), and `support.test.ts` in the same folder says so ("until they import this one"). What the header says about this file is true, and the cross-folder copies are pinned equal to it by `support.test.ts`. | Make the clause future: "… are to import from here in their own rounds (T-support-1)". Or leave it, and the R14 adoptions make it true. | R14 (or M4) |
| N-c2-2 (comment tightening; C-0286 (2)) | `debug.ts` ("EVERY slot allocation replaces its table"), `plat.ts`'s `PlatCapacity` header ("makes every slot allocation a growth") and the growth section ("EVERY allocation replaces it") overstate the tiny-tables mode. An allocation from a free list grows nothing. Probe, tiny mode: a freed vertex slot 2 was reused with `p.vertices` not replaced, and the next new slot (3) replaced it. C-0286 (2)'s own wording says the same. This is harmless: a free-list allocation replaces no table, so it leaves no stale capture, and the re-read rule stays safe as stated. | "Every allocation of a new slot (one not taken from a free list) replaces its table", in the three comments and C-0286 (2)'s reading. | M4 |
| N-c2-3 (equivalent survivors) | Three of this check's 32 mutants survive the arena folder. **E4** reverses the collinear tie at a ring's lowest-leftmost vertex. Only a degenerate ring with overlapping edges reaches it, which §3.10 forbids (N-c1-3's E8). **E10** walks a branch vertex's edges in reverse. Slots only pick which run is walked first, and every run is oriented and sorted afterwards, which is the doc comment's claim. **G4** reads the seed as `seed \| 0`, and `(a + c) >>> 0` gives the same words mod 2³². | No test. | — |
| N-c2-4 (R6, T-1 / T-tx-new-1) | `edgeRuns` (by path) and `tx/chains.ts runsOfPairs` agree on 2 000 pair sets. The sets were drawn from the live pairs of 80 tx fuzz arenas (seeds 101 – 140 × DEFAULT_MIX / ALONG_MIX), with random shares, repeated pairs and a reversed listing order. They differ on 0 sets, compared by `JSON.stringify` of the `HalfEdgeId[][]`. Q3 has no difference to rule on so far. | R6 runs its property (T-tx-new-1) at 10⁴ as planned. | R6 |
| N-c2-5 (R13, M0-a-16; A-4) | Mutant V2 makes `vertexAt` always return −1, which is M0-a-16's N11 class. It is red in `test/facade/` (3 tests, among them "signature of a lattice point finds an L4-only vertex … as the scan does") and in the arena folder (4). M0-a-16's survivor may already be killed on the tree. | R13 re-runs N11 before writing T-facade-new-1. | R13 |
| N-c2-6 (foreign, RELATED) | RELATED at 10³ over the five changed arena sources (465 files, 5 855 tests, one worker, 13 615 s) had two reds, neither the item's. (a) `testkit/test/edge/repins.test.ts` "EP-01/S8/zero-length at 2521534151 … (Q41)" (`expected 'laddered' to be 'refused-lawful'`). It is red identically in this check's mirror with the pre-round arena sources, so it is N-c1-7. (b) `kernel/test/io/roundtrip.test.ts` "random batch arenas (default mix)" hit vitest's 5 s timeout (5 743 ms). Replayed at 10³ with `--testTimeout=60000` it gives 7/7, and it was green in this check's NEAR at the PR size. This is N-c1-6. | As N-c1-6 / N-c1-7. | R12; M0-x-06 |

## Hardening round S3 (lane `build/M0-a-02-fix-s3`, flow flow-7, 2026-10-14)

The session opened this round as M0-a-02's hardening round (J237 (2)) on the three FIX-NOW rows that
`checks/hardening-inventory.md` (J355) assigns to the item: M0-a-02:12 N-s1-2, M0-a-02:124 N-c2-1 and M0-a-02:125
N-c2-2. Each source note was read whole. The inventory's fix shapes stand: neither the notes nor the code shows them
wrong. The round edits only the item's owns: `test/arena/slots.test.ts` (assertions added), `test/arena/support.ts`
(comment), `src/arena/debug.ts` and `src/arena/plat.ts` (comments). No source line that runs changed: the four files'
emitted JS with comments removed (TypeScript `transpileModule`, `removeComments`) hashes the same before and after
(`debug.ts` 0b40f6ca7007cb3c, `plat.ts` 2f63da5a0f4ca66b, `support.ts` bcdc7eef6de72965). No export, folder index, the
barrel or a message text changed (J263 Q1, Q6). Nothing moves output, so no digest or golden is re-recorded.

### The rows

| row | outcome | evidence |
|---|---|---|
| N-s1-2 (KI) — hole pool exact fit, mutant K11 | **PINNED** | The growth-preserves-content test ("a capacity-1 arena and a roomy one fed the same operations …") now reads every level's `faces[l].holes.length` after each of the 3 000 operations. When an operation grew a pool, the test asserts it grew (a pool never shrinks: a compaction keeps its length) and that its length equals `slots.holesTop[l]`, so the pool is exactly full (C-0286 (2)). It also asserts the pools grew at least 20 times, so the check is exercised. The note suggested a check at the end of the run; the per-operation form is used instead, because at the end a later compaction or clear can leave a pool below full, so only a growing call is held to exact fit. K11 (`let cap = t.holes.length * 2;`, the tiny-mode exact growth replaced by doubling): **red** on the new test (`expected [ 191, 'faces[2].holes', 4 ] to deeply equal [ 191, 'faces[2].holes', 3 ]`). It is **green** on the pre-round `slots.test.ts` (arena folder 117 / 117, so it survived there as N-s1-2 says). The fixed tree is green at 117 / 117. |
| N-c2-1 (comment; T-support-1) | **FIXED** (comment) | `test/arena/support.ts`'s header now reads: "… which the other folders' support files are to import from here in their own rounds (T-support-1); until then their copies are pinned to draw the same words (support.test.ts)". This is the note's first alternative. |
| N-c2-2 (comment; C-0286 (2)) | **FIXED** (comment), with an assertion added | The three comments now say what the code does. In `debug.ts`, "a growth leaves each exactly full and every allocation of a new slot (one not taken from a free list) replaces its table; a slot taken from a free list grows nothing". In `plat.ts`'s `PlatCapacity` header, "makes every allocation of a new slot (one not taken from a free list) a growth". In the growth section, "every allocation of a new slot (one not taken from a free list, which grows nothing) replaces it". The comment in `slots.test.ts` that said the same was tightened too. C-0286 is append-only, so its reading of (2) is restated in this round's choices row. The note's probe is now an assertion in the re-read-premise test: a freed vertex slot comes back with `p.vertices` kept, and the next new slot replaces it, leaving the table exactly full. Mutant FL3 (a free-list reuse replaces `p.vertices` in tiny mode) turns it red at `slots.test.ts:716`. |

### The round's mutants (scratch mirror, arena folder, `--maxWorkers=1 --bail=1`; each file restored and checked with `cmp -s`)

| mutant | change | new tests | pre-round tests |
|---|---|---|---|
| K11 | `setFaceHoles`: `let cap = t.holes.length * 2;` | red (growth-preserves-content, pool exact fit) | green 117 / 117 (survives, as N-s1-2 found) |
| K11b | `setFaceHoles` tiny cap `top + need + 1` | red (same assertion) | — |
| FL2 | `allocVertex` free-list branch calls `growVertices` in tiny mode | red (growth-preserves-content: vertex table exactness) | red (same test) |
| FL3 | `allocVertex` free-list branch replaces `p.vertices` with a shallow copy in tiny mode | red (`slots.test.ts:716`, `expect(p.vertices).toBe(kept)`) | — |

Isolation of the mirror was proven before the first mutant: `find … -type l -lname '/home/user/maps-architecture*'`
printed nothing, and the realpath of `packages/model/node_modules/@plat/kernel` lay inside the mirror. The mirror was
removed after the run.

### Refusal census (J264, N-58)

This census is unchanged by construction. No executable source changed (the emitted JS is identical), and the drive's
operation sequence is unchanged: the same seed, with the new lines only reading. The item's families are the arena
folder's seeded drives and hand-built fixtures. They have **0 lawful-input refusals** before and after the round. Their
one refusal class is unchanged and UNLAWFUL: the `already carries` refusal of a duplicate role key in the slots drive
(verdict REFUSE, typed; the door is M0-a-06's `addRole` path). The C1 close's tx probe measured outcomes of ok 2 619,
E_KEPT 718 and E_INVARIANT 23. The same executable gives the same outcomes now.

### Gates

The round's choices row is C-0369 and its ledger row is L-0546. Every gate exits 0:

* `install --frozen-lockfile`: 0.
* `lint`: 0. ESLint checked 1 140 files with 0 errors and 0 warnings; probe-red ok.
* `build`: 0.
* NEAR, the arena folder at the PR size: 13 files, 117 / 117.
* RELATED at `PLAT_FUZZ_RUNS=1000` over `arena/debug.ts` and `arena/plat.ts` (one worker, 7 634 s): 0, with 463 / 463
  files and 5 895 / 5 895 tests. The earlier foreign reds N-c1-6 and N-c1-7 did not recur.

Informative only: run with
`PLAT_TINY_TABLES=1`, the arena folder has 6 reds, in `malformed.test.ts` (3), `size.test.ts` (2) and `slots.test.ts`'s
"grows every column by doubling". These tests pin the default sizes and doubling, and none of them is a line this round
added. The arena folder is not in the PR tier's tiny project (N-s1-3 lists insert/step1-2, insert/step3-5 and tx), so
this is the N-s1-4 class of premise, recorded here as a note for the session if the folder is ever added.

## Round S3's closing check (lane `check/M0-a-02-close-s3`, flow flow-7, 2026-10-14)

The closing check of hardening round S3 passed (`checks/M0-a-02-s3.md`). None of these rows is a blocker. Each is a
tightening of a claim or a further hardening test.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s3c-1 (comment tightening; T-support-1) | `test/arena/support.ts`'s new header says the other folders' support files "are to import from here in their own rounds (T-support-1); until then their copies are pinned to draw the same words (support.test.ts)". Two parts of the tree already differ from that picture. `tx/fuzzgen.ts` (as on main) re-exports `rng` from `arena/support`, and `index/support.ts` imports `rng` and `intIn` from there. So `support.test.ts`'s tx comparison compares the generator with itself, and that file's own header still lists `tx/fuzzgen.ts` among "the copies the other folders still hold". The u32 mulberry32 variants in `geom/`, `medial/`, `num/` and `skeleton/support.ts` are not pinned by `support.test.ts`. They draw u32 words, not the [0, 1) doubles, so they may not be the copies N-c1-5 meant. The row's fix shape (the note's first alternative) is met, and nothing runs differently. | With the R14 adoptions: name which folders import the generator and which copies remain pinned, in both `support.ts`'s and `support.test.ts`'s headers. | R14 (or M4) |
| N-s3c-2 (hardening test; C-0286 (2)) | The round's free-list assertion pins vertex slots only: a reused vertex slot keeps `p.vertices`, and the next new slot replaces it. This checker's mutants B7 (`allocEdgePair`'s free-list branch calls `growPairs` in tiny mode) and B8 (`allocRow`'s free-list branch calls `growRoleRows`) are red. But they turn red only through the growth test's `capacities(roomy)` check, because the whole drive runs in the tiny mode, so the mutant grows the roomy arena too. If a mutant grew only a capacity-1 table, no assertion would hold the pair, face and role-row free lists to "grows nothing". The end-of-run "exactly full" checks do not catch it either, because a later new-slot allocation fills the extra slot. The code keeps the claim. | Repeat the vertex assertion for a reused pair, face and role-row slot in the re-read-premise test (the table kept, then replaced by the next new slot). | M4 |

## Hardening round S4 (lane `build/M0-a-02-fix-s4`, flow flow-7, 2026-11-13; leg 1 of the merged round M0-a-02 S4 → M0-a-06 S10)

The session opened this round on the rows J757 routes to the item (the re-triage's entry 'M0-a-02' less Q76, which
R10 moved to leg 2): Q79 (the `shape` role, RL4, with Q74's last remainder), a-02:N-s3c-2, a-02:N-s3c-1 and the raise's
declared shift. Read whole: the brief, J757 and J776 (by their own greps), `rulings-final.md` (with 'Amended at the
fold', J777), N-s3c-1 and N-s3c-2 above, round S3's section, the code cited. Where the brief and the rulings file
differ, nothing in this leg is touched by the difference (R7 and R17 are what this leg builds; both agree with the
brief). The round edits only the item's owns: `src/arena/roles.json`, `src/arena/registry.ts` (one comment),
`test/arena/roles.test.ts`, `test/arena/registry-version.test.ts` (new), `test/arena/slots.test.ts` (assertions added),
`test/arena/support.ts` and `test/arena/support.test.ts` (comments). io/, tx/, insert/, kernel/test/gate/ and
kernel/API.md were read and run, never edited. No export of `arena/index.ts` or the barrel changed (later legs read the
role by `roleIdOf('shape')`); no message text changed.

### The rows

| row | outcome | evidence |
|---|---|---|
| LINE 1 — Q79 / RQ2 / RL4 (with Q74's last remainder): the `shape` row and the version raise | **FIXED and PINNED** (rule (3) lifted for this line by J757, J776 R7, R17) | `roles.json`: `"version": 2`; row `{ "id": 56, "name": "shape", "kind": "vertex", "rank": 56, "structural": false, "indexed": false, "knot": false, "since": 2 }` appended; the `$comment` gains "a later version's rows rank in append order, after every earlier row. Version 2 appends `shape`: kernel-internal, a chain's own point landed on another chain's run it shares on both sides, written by insertChain alone and stripped with the chain (RQ2, N-61 (2)); not indexed, never a knot". `registry.ts`: no code; `RoleInfo.rank`'s comment reads "version 1: rule 7's table order; later versions append" (emitted JS with comments removed identical: d99ba51bf5e2d2b5 before and after). `roles.test.ts` re-pinned: the version-1 snapshot test unchanged but for one comment (the first 56 rows); 'nothing else at version 1' is now the version-2 test (ROLE_REGISTRY_VERSION 2, length 57, row 56 equal to the row above whole, every rank equal to its id, `shape` the only row with `since` > 1); the lookup test names `roleIdOf('shape')` = 56 and `roleInfo(57)` throwing; the malformed-document test reads `doc.roles.length` and `doc.version + 1` (a `since` past the version on row 3 and on row 56; the append at id `doc.roles.length` under `doc.version + 1`); the rank test adds `deck_order_knot` before `shape`. NEW PIN `test/arena/registry-version.test.ts` (the persisted reading, J776 R17), through io/'s exports only: a committed arena (the framed square and 60 batches of tx's generator, ALONG_MIX, seed 40 961) encoded; every chunk carries 2 at offset 6 (magic 4, format version 1, kind 1); each chunk alone, and all at once, patched to 1 and re-hashed with H128 decode ok and the loaded arena re-encodes to the original version-2 bytes and refs; each chunk patched to 3 is refused (`isCorruptCache`, detail matching "a chunk written under a newer role registry"). Its header and title say it is the BYTE FORMAT's reading, never a promise that an old cache's content is current (review F10). |
| LINE 2 — a-02:N-s3c-2 (hardening test; C-0286 (2)) | **PINNED** (tests only) | In "a growth replaces the table it grows …" (`slots.test.ts`), after the vertex block: a fresh arena `q` in the tiny mode, whose capacity-1 pair, L0 face and role-row tables nothing else grows: a pair slot freed (`freeEdgePair`) and taken again (`allocEdgePair` returns the same half-edge) keeps `q.halfEdges` (toBe), the next new pair replaces it and leaves it exactly full; the same for an L0 face slot (`freeFace` / `allocFace`, `q.faces[0].outer`) and a role-row slot (`removeRoleRow` / `addRole` returns the same row, `q.roles.kind`). B7, B8 and B9 each red ALONE on this test (below). NO-SHIFT. |
| LINE 3 — a-02:N-s3c-1 (comment tightening; T-support-1) | **FIXED** (comments only) | Both headers now name the folders that import the generator (`tx/fuzzgen.ts` re-exports `rng`; `index/support.ts` imports `rng` and `intIn`, exporting `rng` as its `generator`), the one copy still pinned by `support.test.ts` (`insert/step1-2/support.ts`'s `generator` and `intIn`), say the tx comparison now compares the generator with itself, and name the u32 mulberry32 variants of geom/, medial/, num/ and skeleton/ as other generators (u32 words), not copies. Emitted JS with comments removed identical: `support.ts` bcdc7eef6de72965 (the same hash round S3 recorded), `support.test.ts` c7ed0f7e8b507488, before and after. The test's title (a string, so code) is left as it stands, as the row asks no code change. |
| LINE 4 — the raise's shift, declared and listed (J776 R15) | **MEASURED and DECLARED** (below) | The raise moves every encoded chunk's header byte at offset 6 (1 → 2) and every chunk ref; nothing else moves. |

### LINE 4: the declared shift, measured (base mirror → tree)

All in the lane mirror `/home/user/maps-scratch/waves/selfcheck-build-M0-a-02-fix-s4/plat` (the tree's sources; the
"base" side is the same mirror with `roles.json` put back to its pre-round bytes, restored and `cmp`-checked after each
run). The probe was a mirror-only test file (`packages/kernel/test/zz-s4probe/probe.test.ts`, never in the tree) that
replays every case of `kernel/test/insert/step3-5/register/s6-lifecycle.json` whole (its log's chains inserted in
their own batches through `tx` with the suite wired in) and writes `snapshot(p)` (step3-5/support.ts: content print,
chunk refs, level digests) and every chunk's bytes; run as `S4_PROBE_OUT=<file> corepack pnpm exec vitest run
--maxWorkers=1 packages/kernel/test/zz-s4probe` on each side, compared by a script beside it.

* (a) The lifecycle register's 14 cases after their last commit (the same commits ok on both sides): chunk refs differ
  in EVERY chunk of every case (30 chunks); the content print and the five level digests identical in every case.
* (b) Every chunk of both kinds (routes, kind 0, and partitions, kind 1; 30 chunks): the length identical, exactly one
  byte differs, offset 6, 1 → 2.
* (c) The roots: `corepack pnpm bench -- profile --seed 3` → `root db72c0bf0fa021ca873fd7f5f6f30d7b; lanes 1207, blocks
  1057` on both sides; `corepack pnpm bench -- profile --run integrated --seed 4` → `root
  e9e96e0e6a2e88e587c968796e0ef03e; lanes 1373, blocks 1310` on both sides. Identical.
* (d) THE RAISE's reds reproduced: the pre-round `roles.test.ts` under the raised `roles.json` (mirror, `vitest run
  --maxWorkers=1 packages/kernel/test/arena/roles.test.ts`) is red in exactly the three tests the measured list names,
  all M0-a-02's own, and DECLARED here: owner M0-a-02, `packages/kernel/test/arena/roles.test.ts` — 'carries every rule 7
  role exactly once with its flags, and nothing else at version 1' (`expected 2 to be 1`); 'looks roles up by name and
  id; an unknown name is −1 and an unknown id or name a programming error' (`expected [Function] to throw an error`,
  `roleInfo(56)` now finds `shape`); 'refuses a malformed document whole: …' (`expected [ Array(57) ] to have a length of
  56 but got 57`). Re-pinned in this round (LINE 1). Nothing else on the measured list is labelled THE RAISE, so no seam
  is owed for a test. Reds labelled THE STRENGTH or THE HEAD are not re-pinned here; one met in RELATED is recorded
  under the gates below as labelled.

What reads the version (review §4, confirmed here by reading): `io/encode.ts` writes it (`w.uv(ROLE_REGISTRY_VERSION)`
after the kind byte) and `io/decode.ts` checks it (`r.uv() <= ROLE_REGISTRY_VERSION`); `digest/levelDigest.ts`
reads a role's name, rank and kind only, so no print, level digest, model root, commit record or refusal moves —
(a) and (c) above hold that.

THE LIST FOR THE SESSION'S SEAMS (never edited here): `kernel/API.md:61` ('56 named roles' — now 57, the 57th
kernel-internal); `kernel/test/gate/roles.test.ts`'s header (:1-8, 'an append keeps every existing document's digest
and block exactly' — the block's header byte at offset 6 moves with the version, so every chunk ref moves; the digests
do not); the base `docs/ARCHITECTURE.md` and its bundle `docs/ARCHITECTURE-FULL.md` at the amendments' next apply pass
from amendment ab (item 997 for §2.2 rule 3, item 999 for rule 7's table); `plat/docs/build/M0-world-sites-gate.md`
K5's wording for the bytes.

### The round's mutants (lane mirror; each file restored from the tree and checked with `cmp -s`)

Isolation was proven before the first mutant: `find /home/user/maps-scratch/waves/selfcheck-build-M0-a-02-fix-s4 -type l
-lname '/home/user/maps-architecture*'` printed nothing, and `realpath` of
`packages/model/node_modules/@plat/kernel` lay in the mirror. Unless named, a mutant ran as `corepack pnpm exec vitest
run --maxWorkers=1 --bail=1 packages/kernel/test/arena` (14 files). The clean mirror: 120 / 120. Harness:
`/home/user/maps-scratch/waves/a02s4-tools/` (`mut.py`, `run-mut.sh`, `run-mut-t.sh`, `cmp.py`); logs and one exit-code
file per mutant in `/home/user/maps-scratch/waves/build-M0-a-02-fix-s4/evidence/mut/` (copied out before the mirror was
deleted); the LINE 4 probe, its outputs and the root logs in `…/evidence/probe/`; the pre-round copies of the changed
files in `/home/user/maps-scratch/waves/a02s4-base/`.

| mutant | change | result |
|---|---|---|
| BASE-RAISE | `roles.json` back to version 1 (no `shape`) | red: `roles.test.ts` 4 tests (the version-2 test, the rank test, the lookup test, the malformed test); `registry-version.test.ts` 2 tests (`expected 1 to be 2`) |
| SH-RANK | `shape`'s rank swapped with `deck_order_knot`'s (55 ↔ 56) | red (the version-2 test: row 56 whole, rank = id) |
| SH-IDX | `shape` indexed true | red (the version-2 test) |
| SH-SINCE | `shape` since 1 | red, killed by the SNAPSHOT test ('holds the version-1 snapshot as its first rows …': a later row's `since` > 1), not only by the loader (which accepts 1 ≤ 2) |
| SH-KIND | `shape` kind edge | red (the version-2 test) |
| DEC-EQ | `io/decode.ts` `r.uv() <= ROLE_REGISTRY_VERSION` → `===` | red on the version-1 patch ('decodes a chunk whose header says registry version 1 …') |
| DEC-NONE | the version check dropped (`r.uv();` kept, so the varint is still read) | red on the version-3 patch ('refuses a chunk whose header says registry version 3 …') |
| B7 | `allocEdgePair`'s free-list branch calls `growPairs` in the tiny mode | red (the growth test, through `capacities(roomy)`) |
| B8 | `allocRow`'s free-list branch calls `growRoleRows` in the tiny mode (with `tinyTables` imported in `rows.ts`) | red (the growth test: end exactness `roles.kind` 357 vs 346) |
| B9 | `allocFace`'s free-list branch calls `growFaces` in the tiny mode | red (the growth test) |
| ROOMY-OFF | the growth test's `capacities(roomy)` check switched off, no source mutant | green 120 / 120 (the harness control) |
| B7-ALONE / B8-ALONE / B9-ALONE | each with the roomy check off | red: B7 and B9 on the re-read-premise test (`slots.test.ts`, `toBe(pairs)` / `toBe(faces)`); B8 on the growth test's end exactness first (bail) |
| B7 / B8 / B9 on the re-read-premise test alone (`-t 'a growth replaces'`) | the mutant, the round's test | each red: B7 `expected { …(4) } to be { origin: Int32Array[ -1, -1 ], …(3) }` (`toBe(pairs)`), B8 `expected Uint16Array[ 0, 65535 ] to be Uint16Array[ 65535 ]` (`toBe(rowKind)`), B9 `expected Int32Array[ 0, -1 ] to be Int32Array[ -1 ]` (`toBe(faces)`) |
| the same three on the PRE-ROUND `slots.test.ts`, roomy check off, `-t 'a growth replaces'` | the control | each green: the pre-round test does not hold the pair, face and role-row free lists; the round's assertions do |

The checker's B8 of round S3 turned red only through the roomy check; this round's B8 (one row per free-list reuse)
is also caught by the growth test's end exactness, because the drive frees and re-takes rows several times in a row.
Either way the round's new assertion kills it alone (the row above).

### Refusal census (J264, N-58)

The item's families are the arena folder's seeded drives and hand-built fixtures, and the new pin's committed arena.
**0 lawful-input refusals before and after.** The one class is unchanged and UNLAWFUL: the duplicate role key
(`already carries`) of the slots drive (verdict REFUSE, typed; the door is M0-a-06's `addRole` path), counted in the
mirror by an instrumented copy of `slots.test.ts` (mirror only): **3 → 3** (base `roles.json` → tree). The registry
version is read only by encode and decode, so no operation's outcome moves. The new pin's version-3 refusal is an
UNLAWFUL input (a chunk from a newer registry; verdict REFUSE, typed `corrupt-cache`; §3.9's alternative is the replay,
M1's); the version-1 patch is lawful and decodes.

### Gates

Every gate run at one worker in the tree; logs and exit-code files in `/home/user/maps-scratch/waves/build-M0-a-02-fix-s4/`.

* `install --frozen-lockfile`: 0.
* `lint`: 0. ESLint checked 1 317 files with 0 errors and 0 warnings; probe-red ok; the 9 whole-tree checks pass.
* `build`: 0.
* NEAR, the arena folder at the PR size (`PLAT_FUZZ_RUNS` unset; `vitest run --maxWorkers=1 packages/kernel/test/arena`):
  0, 14 files, 120 / 120.
* RELATED at `PLAT_FUZZ_RUNS=1000`, `PLAT_FUZZ_SEED=-1217822610`, over `src/arena/registry.ts` and `src/arena/roles.json`
  (the round's two source files): the file list from `vitest related --run` (JSON reporter, `-t '^__no_such_test__$'`),
  530 files (kernel 154, layout 129, testkit 118, bench 78, site 22, model 18, tables 11), run as 45 chunks of 12 with
  `vitest run --passWithNoTests --maxWorkers=1`, one JSON report and exit code per chunk
  (`…/build-M0-a-02-fix-s4/related/`, summed by `sum.py`). 530 / 530 files reported; 7 729 tests: 7 721 passed,
  **7 failed**, 1 skipped (`kernel/test/tx/cost.test.ts`'s standing `skip` of S9 line 5 (d), not this round's). Every
  file registered at least one test at 1 000 runs (`layout/test/enceinte/s5seeds.test.ts` 3, all passed). The 7 reds are
  all DECLARED REDS OF THE HEAD, none on THE MEASURED LIST's RAISE, none the item's:
  * `bench/test/site/summary.test.ts` — the canary ('the canary CITY record re-derived on this tree is the run's …';
    J772 (7): the committed site summary is stale until the session's re-run) — chunk 05;
  * Q152's six M0-a-09 bands tests in `packages/kernel/test/arr/bands/`: `closing.test.ts` ×2 (chunk 08),
    `dryrun.test.ts` and `hardening-s15.test.ts` (chunk 09), `restage.test.ts` ×2 (chunk 10).
  No failure message reads the registry's version, its length or a role id ≥ 56. The J176 reference-machine bench files
  (calibrate, host, timing) are not on RELATED's list; `bench/test/fusion/hausdorff.test.ts` (N-8 / N-52) 12 / 12 and
  `testkit/test/determinism/dilation.test.ts` (Q153) 8 / 8 passed. Chunks 05, 08, 09 and 10 exit 1 for these reds alone;
  the other 41 exit 0. No FINDING.
* `landed` (record re-landed under this lane; `--touched` for the seven files): 0 — `landed M0-a-02 (lane
  build/M0-a-02-fix-s4, against flow-7): 4 created, 13 changed, 11 unchanged, 0 deleted; appends: CLEAN-ROOM.md L-0361,
  L-0418, L-0471, L-0546, L-0837; docs/build/choices.md C-0286, C-0313, C-0337, C-0369, C-0505`. Its first attempt
  refused because L-0837 had been appended at CLEAN-ROOM.md's end, outside §2's seat-ledger table; the row was moved,
  unchanged, to the table's last line (C-0104 (4)) and landed ran again.
* `landed:verify -- flow-7 --item M0-a-02`: 0 — `landed:verify flow-7 --item M0-a-02: ok (1 record)`.

### The round's rows in the ledgers

The round's choices row is C-0505 and its ledger row is L-0837.

### Reported for the queue (not this leg's; built nothing for them)

R17 (a) — decode refusing a row whose role's `since` exceeds its chunk's version (M0-a-15); R17 (b) — whether a cache
written under an older registry version may be used at all (M1's loader). The new pin asserts neither.

## Round S4's closing check (lane `check/M0-a-02-close-s4`, flow flow-7, 2026-11-13)

Rows written by the closing check of hardening round S4 (`checks/M0-a-02-s4.md`). None of them is a blocker: the first
corrects a comment, the second is a further hardening test.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s4c-1 (comment correction; T-support-1; LINE 3's own reading) | Round S4's new headers of `test/arena/support.ts` (:12-13) and `test/arena/support.test.ts` (:6-7) say the generators of `geom/`, `medial/`, `num/` and `skeleton/support.ts` "draw u32 words, not [0, 1) doubles: they are other generators, not copies of this one". The round's brief asked for that wording, and N-s3c-1 above says the same. The code shows it wrong. Each of the four `generator` functions is text-identical to `rng`, down to its last line `return ((t ^ (t >>> 14)) >>> 0) / 4294967296;`. Only their doc comments say "u32 generator". Executed (`probe/gens.cjs` in the lane's scratch): for seeds 0, 1, 0x530004, 4242 and −1, 4 096 draws of each equal `rng`'s, every draw lies in [0, 1) and none is an integer. So the tree holds FIVE copies of the generator outside `arena/support.ts`: `insert/step1-2` (pinned by `support.test.ts`) and these four (not pinned). Nothing runs differently; the two headers' clause is wrong, and T-support-1's "one generator" is further from met than the headers say. | Comment only: both headers say the four folders hold verbatim, unpinned copies (their own doc comments call them "u32"). With the R14 adoptions, import `rng` there or pin the four in `support.test.ts` as `step1-2`'s is. | the next round that edits `test/arena/` (or a session seam at the merged round's landing); else R14 / M4 |
| N-s4c-2 (hardening test; J776 R17) | `registry-version.test.ts` pins the version field's reading on one arena: `committed(40 961, 60)`, which ends with 8 vertices, 7 edges and no vertex row, in 2 chunks (one routes, one partition). Both chunk kinds are held, and the mutants DEC-EQ, DEC-NONE, DEC-PLUS1 and ENC-1 are each red on it. This check's probe read the same three facts (version-1 header decodes; one byte at offset 6; same length) on 37 chunks of 17 arenas (the 14 lifecycle-register cases and three generator arenas), so the code keeps the claim more widely than the pin holds it. | Run the pin over a second, richer arena (one with vertex rows and partition chunks of several levels, e.g. a lifecycle-register case). | M4 |
