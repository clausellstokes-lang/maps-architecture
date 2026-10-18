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
