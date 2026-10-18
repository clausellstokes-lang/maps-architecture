# M0-a-06 — the closing check's notes (not failing lines)

These notes come from the closing check of item M0-a-06 (lane `check/M0-a-06-close-r1`, flow flow-7, 2026-10-04).
Under the session's rulings J162 and J169, the closing check fails the item only on a blocker. None of the findings
below is a blocker: one is an equivalent survivor, one is a PLAUSIBLE-equivalent survivor that the author has already
declared, and one is a cost constant to restate. Each row names its handling and the milestone or item where it
belongs. The verdict and its evidence are in `checks/M0-a-06.md`, in the closing round at the top. The first check's
notes N-1 – N-6 stay in `checks/M0-a-06.md`, and the ids below continue that numbering.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-7 | Mutant A07 drops `materialise`'s early skip of a side that the face pass has since given a record (`relevel.ts`, `… \|\| recordOn(plan.level, plan.h) !== undefined) continue;`). It survives the tx folder (174 of 174). It is **equivalent**: the same plan reaches the later guard `if ([outer, ...holes].some((i) => cycles[i].some((g) => recordOn(lv, g) !== undefined))) continue;`. The side's half-edge lies on `cycles[0]`, and `cycles[0]` is the outer ring itself or a hole of the chosen outer, so the later guard skips every case the early test skips. The only difference is the work charged for the probe walk. | No test needed (J169: an equivalent survivor takes a one-line note). The early skip saves the walk, and it may stay. | — |
| N-8 | Mutant M18 (dissolution without C-0185 (4)'s on-run test) still survives (174 of 174). C-0189 (6) declares it PLAUSIBLE equivalent: the two can differ only after an earlier dissolution on the same run changes a far end, and no test reached that case, nor did 2 900 fuzz sequences or this round's further 1 100 (Q1). The first check asked for "a red test or a one-line equivalence note", and the note is in C-0189 (6), which refines C-0185. | Build an arena where two split vertices on one run dissolve in one batch and the second pair stops being on-run only after the first dissolution. Then either make M18 red there or upgrade the note to CONFIRMED equivalent. | M4 (hardening) |
| N-9 | The cost bar's constant (160 per touched face, `cost.test.ts`) is fitted to its 24 seeds. This round's fresh wide fuzz (Q1, multipliers 999 983 and 1 299 709, 1 100 sequences) reached a worst ratio of **224** in the default mix, 217 in the along mix and 191 in the lane-heavy mix. That is within the first check's 246 (N-4) and C-0189 (6)'s statement that the ratio is ring-length-bound. The test's 160 holds on its own seeds and is not a narrowed bar, but it is not a bound for other seeds. | When M0-d-08 reuses the bar, restate it per touched face *and* edge (as C-0189 (6) says), or quote the 246 / 224 worst cases with the constant. | M0-d-08 |
| N-10 | *(closing check `check/M0-a-06-close-s1`, 2026-10-06, on round S1)* C-0219 (2) is CONFIRMED and is larger than "it blocks the remove path" suggests. With `suiteEnv` wired, the suite's `indexFreshness` (`kernel/src/invariants/batch.ts`, M0-a-14) filters only LIVE own children. It therefore refused 323 of 776 and 321 of 752 removals of this seat's generator (`probe-own.mts`, seeds ×40 503 and ×1 299 709), about 42 %, with `index-freshness: an L# batch wrote the L# index (delete of face # (L#)) outside its promotions and demotions`. Every refusal left the arena unchanged, so it fails safe. | The session, owner M0-a-14, before any suite-wired remove path is gated: N-46 (6) (e), and M0-a-05 S6's lifecycle cases if they wire the suite. C-0219 (2)'s one-line amendment: admit a coarser ITEM_FACE delete whose slot is no longer live, as `tx.ts` does. This is a contract between items (N-45 (c)), not M0-a-06's code. | now (session) |
| N-11 | The shared-stretch end (C-0219 (4)) is CONFIRMED on the author's property cases 1630 and 2337. After the removal, the base run keeps the stretch's end vertices: in 1630, (271,330) and (523,1158) on L0 `base:0`, with flags none and the route within the hot pixel; in 2337, (2942,2070) on L1 `base:0`. The arena is valid (`allProblems` empty). The level digests differ (1630: all five levels; 2337: L1 – L4), and so do the chunk refs. §2.2 rule 3 (b) sanctions it in its own words ("where a quay left the old shore stretch it shared, that point becomes a shape vertex of the quay"), so it is not M0-a-06's defect. It conflicts with N-46 (6) (e)'s "restores the arena". | A session ruling on N-46 (6) (e) against rule 3 (b). Until then, the property's counted allowance (≤ max(2, inserted / 200)) stands as declared. | now (session) |
| N-12 | Survivors of this round's mutants that are not blockers. Each output was identical to the unmutated probe on 2 × 4 000 cases. **K05** (materialise-base exemption dropped): equivalent while an own child carries its parent's kind, owner and stage, which materialise copies; a fixture with an owner set on an own child that is also a base would settle it. **K06** (untouched children count as dead): equivalent, because a freed record implies its level is one face inside the parent. **K12** (ancestor frees not in key order): only the free-list order changes; the record sorts by key. **K13** (a re-walked parent also gathered): a guard, not reached. **K14** (ancestor walks not charged): the record's `work` would under-count; a work-pinning fixture is a hardening test. **K15** (childless ancestor kept): equivalent. **K16** (ancestor homes not pre-noted): differs only when materialise reuses a freed ancestor slot in the same batch. | Hardening tests for K05, K14 and K16; one-line equivalence notes for the rest. | M4 (hardening) |
| N-13 | `restore.test.ts`'s property generator is narrow. It draws chains of 2 – 3 points (at most two segments), bases at L0 – L2 only, and removes at the chain's own level. That is why it passed 2 117 / 2 117 while this seat's wider generator found blocker B-1 (4 / 6 200) and the K09 survival (B-2). | Widen it in B-1's fix round: 3-segment chains, bases at L3, removal by a coarser batch, closed rings and LIFO pairs (as `probe-own.mts`). | with B-1's fix |
| N-14 | `kernel/test/io/roundtrip.test.ts` "random batch arenas (default mix)" timed out at vitest's default 5 000 ms (5 267 ms) during this seat's related run under load. Replayed alone it gave `Tests 7 passed (7)`. Not M0-a-06's file. | The io tests' owner may give the case an explicit timeout. Informative only. | M0-d-08 or the io owner |
| N-15 | N-8 (M18, "PLAUSIBLE equivalent", deferred to M4) is superseded. M18 is not equivalent: it restores the four B-1 cases that the tree's code leaves undissolved, and it survives the tx folder and related at 1000. | It moves into B-1's fix round (see `checks/M0-a-06-s1.md`). | with B-1's fix |
| N-16 | Re-check S2 (lane `check/M0-a-06-close-s2`, `checks/M0-a-06-s2.md`). Five mutants of S2's on-run code survive the tx folder (189 / 189), and their outputs are byte-identical to the tree's on 16 000 probe cases (`probe-own.mts` and `probe-double.mts`, two seed sets each): X03 (split restoration without `wasOnRun`; equivalent by C-0223 (2)'s argument, because the two coarse edges are the surviving on-run pair); X06 (`wasOnRun` does not follow the first edge through merges); X09 (`onStretch` also offered to vertices finer than the pair); X10 (`nearSegment` without its projection bound); X11 (`dissolvable` ignores row equality). X12 (ancestor frees in reverse key order) is equivalent, because `tx.ts` orders the record by `removedKeys`. N-15 is closed: M18 (X02) is now CONFIRMED equivalent (identical on all four probe runs; C-0223 (2)). | Hardening tests: a fixture whose dissolution merges an edge that the next vertex's FIRST pair holds (X06); a finer vertex beside a same-level stretch (X09); a split vertex beyond a segment's end (X10); a stretch through a degree-2 split vertex with differing rows (X11). If B-1's remaining fix replaces these readings, re-target the tests to the new reading. | M4 |
| N-17 | Re-check S3 (lane `check/M0-a-06-close-s3`, `checks/M0-a-06-s3.md`). Mutant **Y03** of C-0225 (1)'s `onStretch` tests only the pairs (every walked a, the far end b) and (the far end a, the nearest b), so it drops the pairs whose two ends are both inner vertices of the stretch. It survives `restore.test.ts` at the PR size (19 / 19) and is not equivalent. The item's own targeted property kills it at `PLAT_FUZZ_RUNS=100000` with an `inner` case: candidate 333402, an L3 base (0,3605)–(1609,1461)–(4000,2686), an L3 chain (1366,2008)–(1833,999)–(2165,2227)–(2854,1539)–(3618,3110)–(2071,971), where the encoded chunk refs differ. At the PR size the property keeps only max(2, RUNS / 5000) = 2 `inner` cases, and neither separates Y03. Y03's output is byte-identical to the tree's on `probe-double.mts` (2 × 4 000). The tree's code is right: at 10⁵ it restores all 163 realised cases. The gap is the PR-size strength of the test, not a wrong result. | Pin candidate 333402 as a fixture beside cases 817 and 1526 (contentPrint, chunk refs, records per level, level digests as before the insert), or raise the `inner` quota so that the PR size meets an inner piece on each side. | M4 (or the session's next touch of `restore.test.ts`) |
| N-18 | C-0225 (3) defers two cases as PLAUSIBLE (by reasoning) and fail-safe. The first is a split whose piece ended at a vertex that a later chain, still present, made; this arises when an older chain is removed out of LIFO order. The second is a split whose piece ended at a split that an earlier batch already dissolved. Either can leave a plain degree-2 vertex: the arena stays valid and the run's route is unchanged, but the chunks differ. This row records the deferral where the hardening pass will find it. Re-check S3 did not probe it, because its line is remove(insert(x)) of the latest chain. | Hardening pass: measure it with an out-of-LIFO generator (insert X, insert Y zigzagging the same edge, remove X) and decide whether to dissolve or refuse (N-45). | M4 |
| N-19 | Closing check S4 (lane `check/M0-a-06-close-s4`, `checks/M0-a-06-s4.md`). Mutant **S06** drops the after-batch row identity from rule 3 (b)'s survival test in `relevel.ts` (`survives` keeps live, one level and on-run, but no longer `sameList(levelRows(…x…), levelRows(…y…))`). This line predates round S4, and C-0287 (1) states it is unchanged. S06 survives the tx folder (14 files, 216 tests). It is **not equivalent**. In the probe `probe-s06.mts`, an L0 way (0,2000)–(4000,2000) is split at (2000,2000) by an L0 T-junction, and then an L0 `retypeEdges` adds a `shore` row to the stretch east of that vertex only. The tree clears the flag (`unflagged [7]`), as §2.2 rule 3 (b) words it, but S06 keeps it (`unflagged []`). The tree's result is right; no test pins it. | Pin the probe's case in `removals.test.ts` or `forms.test.ts`: the vertex's flag is cleared and listed in `unflagged`, and the two edges keep their rows. | M0 hardening phase (J237); M4 at the latest |
| N-20 | Closing check S4. Mutant **C05** leaves a no-op batch's overlay open: `run()` returns `ok({ record: null })` without `t.closed = true`. It survives the tx folder (216 / 216), because the N-55 (5) pins cover only the committed, rejected and thrown endings. It is **not equivalent**. In `probe-c05-d06.mts`, the tree throws `tx: the transaction is closed (committed or rejected)` when `removeEdges` is handed a no-op batch's overlay, and the arena is unchanged. Under C05 the same call returns `ok=true` and writes the arena outside any transaction, with the version unchanged (Q13's class). The tree is right; no test pins it. | Add a fourth ending, `noop` (a callback that returns ok having written nothing), to `forms.test.ts`'s `staleOverlay`, so that the four writers are pinned on it too. | M0 hardening phase (J237); M4 at the latest |
| N-21 | Closing check S4. Mutant **D06** drops `tx()`'s catch guard `if (!t.closed)`. That guard predates round S4, and C-0287 (4) states its behaviour: "a throw from `env.onCommit` after the commit leaves the commit standing … now prefixed `…/commit:`". D06 survives the tx folder (216 / 216), because no test throws from `onCommit`. It is **not equivalent**. In `probe-c05-d06.mts`, when the listener throws `listener bug`, the tree rethrows `tx 8/L1/callback/commit: listener bug` (with the cause kept), the version goes from 1 to 2 and the commit stands. Under D06 the version stays at 1 and the committed batch is rolled back. The tree is right; no test pins it. | Add a pin to `forms.test.ts` or `record.test.ts`: an `onCommit` that throws; the message is prefixed `…/commit:`, the cause is kept, the version is +1, the content is committed, and the next batch commits. | M0 hardening phase (J237); M4 at the latest |
| N-22 | Closing check S4. The zigzag property's LIFO branch in `restore.test.ts` still skips its chunk-ref and digest asserts when the LIFO chain shares a stretch (`if (!shared2) { … }`). This is a leftover of the shared-stretch tolerance that N-55 (1) retired; it never counted and was not among the three `continue` branches the round removed. This seat removed the guard in its own mirror and ran the file at the PR size. The result was `Tests 22 passed (22)`, and the zigzag line printed `lifo 312`, `lifoShared 109`, `sharedEnd 0`, so the 109 shared LIFO pairs are now judged and restore. | Drop the guard so that every LIFO pair is judged. This is a tightening; nothing fails today. | M0 hardening phase (J237), or the session's next touch of `restore.test.ts` (N-55 (5)'s `foldedBase` assert) |
| N-23 | Closing check S4. The exported `restoreSavepoint` (N-55 (6)) hands the image's arrays to the arena. If one image is restored twice, the second restore silently puts back arrays that later writes have since changed. In `probe-twice.mts` (take, commit, restore, commit, restore), the first restore is bit-identical, but the second is not: the arena then holds 9 `allProblems` and no throw is raised (CONFIRMED). A restore while a batch is open is the same class of misuse (PLAUSIBLE, by reading). The doc lines in `tx/index.ts` and `savepoint.ts` say "at most once" and "between batches", but nothing checks either. The runner's intended use (one image per stage, restored after `stage.run` returns) is safe. This seat's `probe-savepoint.mts` (300 cases, 267 of them with partition rebuilds between take and restore, 898 partitions rebuilt in all) found every arena bit-identical to its image, the index state clean and the next batch committing. | Make `restoreSavepoint` throw on a second use of one image (a `used` mark) and when the arena's index log is open (a batch is running). This guards against deliberate or contrived misuse. | M4 (or M0-x-02's round s1, which introduces the consumer) |
| N-24 | Closing check S5 (lane `check/M0-a-06-close-s5`, `checks/M0-a-06-s5.md`). Out-of-LIFO image use is outside what round S5's restore generation covers. `restoreGeneration`'s doc says "(generation, version) is never reached twice with different content", and that holds for LIFO use: in 600 random LIFO sequences of 40 steps, there were 727 cross-commit restores and 0 keys naming two contents. It fails when a *dead* image is put back: one taken before a restore to an older image, then restored at the version the arena has reached again. This is CONFIRMED in the seat's probe `zz-check-s5.test.ts`. The sequence is: A at v1; two commits; B at v3; restore A (generation 1, v1); two commits (generation 1, v3, content Y); restore B. The result is still generation 1, v3, but the content is now B's (`sameKey true sameContent false`). A consumer keyed on (generation, version) then reads L1–L4 stale (`stalePerLevel [false,true,true,true,true]`). Separately, in 300 random sequences (`zz-check-s5-nonlifo.test.ts`), 143 key collisions appeared in 48 sequences, and 60 restores threw `TypeError: Cannot read properties of undefined (reading 'clear')` in `restoreIndex` (`savepoint.ts:92`): the tombstone list had been shortened by the earlier restore. No M0 path reaches this. The runner restores one stage image per stage after `stage.run` returns; every batch and op restores its own image at its own version; and the doc only says "at most once". | Pick one. (a) State the contract as LIFO and refuse a dead image with a typed throw: mark images that are dead once an older image is restored, as N-23's `used` mark does for a second use. (b) Store the generation in the image, and bump when `p.version !== s.version \|\| restoreGeneration(p) !== s.generation`, so that the key stays unique. Either way, pin the dead-image sequence above. Do this together with N-23 and before the first out-of-LIFO consumer (M1's pool, M2a's undo). | M0 hardening phase (J237), with N-23 |
| N-25 | Closing check S5. Mutant **M04** bumps only on a backward restore (`p.version > s.version` in place of `!==`). It survives the tx folder (`Tests 225 passed (225)`, with this seat's probes included). It is equivalent for the key: a forward restore happens only with a dead image (N-24). Within one generation the versions only rise, so the forward restore lands on a key that generation has not visited. On the same 300 out-of-LIFO sequences (151 forward restores), the tree and M04 gave identical totals (`throws 60 collisions 143 collidingSeqs 48`). The only difference is the count that the doc's "one more per such restore" describes. The tree bumps there, which is right. | A count pin for a forward restore can go into N-24's round. Separately, pin the seat's LIFO property in `savepoint.test.ts`: random nested take, restore and drop with rejects, throws and empty batches; no key names two contents; the generation equals an independent count of cross-commit restores. This is a hardening test; the six pins already kill every other mutant. | M0 hardening phase (J237), with N-24 |

## Round C1 — consolidation round R6 (lane `build/M0-a-06-consolidate-1`, flow flow-7, 2026-10-13)

The round applies T-1 – T-9, the tx comment rows (C-tx-1 – 4) and the `test/tx` row (T-tx) of
`plat/docs/build/consolidation/kernel-plan.md` (§1.3, §2, §3.3, §3.5, §4; J260, J263 Q1, Q3, Q4, Q6, Q8; J264 (5);
J270 (a), (b)) as fix round C1 of the item's consolidation lines, after R1 (`num/exact.ts`), R3, R4 (`arena/resolve.ts`
`edgeRuns`) and R5 (`index/items.ts` `faceArea2`). The plan's §1.0 N-1, N-3 and N-4 name two more private copies in these
files (`tx.ts` `closer`, `relevel.ts` `insidePoints`); they are replaced too. It changes no behaviour. Its choices row
is C-0350.

### What changed, and the equivalence shown

| finding | change | equivalence |
|---|---|---|
| T-1 | `chains.ts` `runsOfPairs` → `export const runsOfPairs = edgeRuns;` (`import { edgeRuns } from '../arena/resolve.js'`), the public name kept; its doc points at `edgeRuns`' statement of the rule (C-0146 (5)). | **T-tx-new-1 held first**: the new `test/tx/chains.test.ts` keeps the old body verbatim as `referenceRuns` and holds `runsOfPairs` ≡ `edgeRuns` ≡ it as `HalfEdgeId[][]` (run order, direction, start vertex) — every keyed chain and every whole edge set of the pool, and a property over pair subsets with repeats in any listing order at `PLAT_FUZZ_RUNS` (10⁴): green at 10⁴ on the OLD body (kernel and kernel-tiny) before the replacement, and after it. The pool: QUARTERS (dressed), LAKE and the loop off a branch vertex in six allocation orders each, the six fixture sequences, 24 fuzz arenas (both mixes) with their chains. The property asserts it drew open runs, rings and loops off a branch vertex. **No difference found** (J263 Q3 not reached). |
| T-2 | `profile.ts` `routeLines` = `resolve`, then `linesOfRuns(p, r.runs, chainLevel(p, chain))`; the body lives once, in `chains.ts`. | The removed body was `linesOfRuns`' line for line (the same filter `L[v] <= level`, the same check text `a run has route vertices at its own level`, the cumulative `Math.sqrt` of integer squared lengths, the ring's closing segment); the call order is the same (`resolve`, then `chainLevel`, then the walk). |
| T-3 | `relevel.ts` `around` deleted; its ten call sites read the arena's `outgoing`. The module comment states why every read is safe (below). | Identical lists on a live vertex with a closed rotation (the same loop); `outgoing` adds a liveness check and its own `arena: … does not close` text where `around` threw `tx: … does not close` — both throw on a corrupted arena (§3.11's assertion class, J263 Q4). Every site reads a live vertex with a closed rotation (table below). |
| T-4 | `relevel.ts` `pointCmp` deleted, `keyCmp` reads `num/exact.ts` `comparePoints`; `tx.ts` `dirtyFaces`' inline `pointCmp` (the removed records' key order, C-0185 (17)) likewise. | `comparePoints` is the same expression (c3 homed it verbatim); −1 / 0 / 1 as before. |
| T-5 | `tx.ts` `area2Of` deleted, the area floor reads `index/items.ts` `faceArea2` (by path); `uniq` deleted, its seven uses inlined as `[...new Set(xs)]`; `writers.ts` `enter` / `overLimit` → `state.ts` `enterWriter` / `overLimit` (file-level exports), `writers.ts` imports them; `tx.ts`'s π literal → `num/exact.ts` `PI`; `relevel.ts` `HOT_SQ` → `insert/placement.ts` `HOT_PIXEL_SQ` (by path; `HOT_PIXEL_CM`'s import dropped). | `faceArea2` sums `area2` over `faceRouteRings(p, level, f, level)` in ring order on `lp(x, y)` points — the removed body's points `{ x, y }` — the same doubles; `enterWriter` / `overLimit` bodies and texts identical (`'the batch exceeded its work limit'`, `TX_FACES_WALKED`); `PI` the same literal 3.141592653589793; `HOT_PIXEL_SQ` is `HOT_PIXEL_CM * HOT_PIXEL_CM`, `HOT_SQ`'s expression. |
| §1.0 N-1 | `tx.ts` `closer` deleted; the clearance row reads `num/exact.ts` `segmentCloserThan`. | Textually the same algorithm (dot ≤ 0 or a point segment → end a; dot ≥ l2 → end b; else `orient2d² < r²·l2`, strict); `r*r*l2` and `r2*l2` round identically. M0-a-01's copy table now reads the site as CONSOLIDATED (`importsShared`). |
| §1.0 N-3 | `relevel.ts` `insidePoints` deleted; the face pass and `materialise` read `num/exact.ts` `insideDoubledRing` (five sites). | The old toggle `(ay > qy) !== (by > qy)` then `by > ay ? o > 0 : o < 0` is `crossingStep(…) !== 0` case for case (the same four-case table M0-a-03's round showed, on the doubled coordinates); the same doubling of the ring. |
| T-6 | Nothing: the three readings of §3.10 stay apart (C-0185 (4), C-0200 (2)); `cornerBelow` gains one sentence naming `invariants/batch.ts` `acuteCorners` and why both stay. | — |
| T-7 / T-8 / T-9, §2 | Comments only: `tx/index.ts` C-tx-1 (the plan's sentence) and its scaffold sentence dropped; `state.ts` `closed` / `op` / `asOp`; `tx.ts` lines 14, the catch, the freshness admission; `relevel.ts` the module comment, the strip-set reading (C-0287), the own-child ancestors (C-0219), `holdsDemoted` and `materialise` (C-0189 (1)), the pin (C-0189 (3)), `onStretch`; `savepoint.ts` `RESTORES`; `chains.ts` header and `linesOfRuns`. `check` / `notBuilt` stay (J270 (a)). | Every refusal detail and prefix verbatim (J263 Q6): `tx <stage>/L<level>/<form>/<op>: `, `the batch exceeded its work limit`, `tx.facesWalked`, every `E_KEPT` / `E_LEVEL` / role / level / clearance text — the NO-SHIFT probe prints every refusal's code and detail. No `N-xx` token, `checks/` path, case number or round name is left in `src/tx` (grep). |

**T-3: the ten call sites of `around` (now `outgoing`) and the rotation each reads (J263 Q4).** `rewriteRows`' only writes
to the half-edge links are `deletePair` (each call relinks both ends' rotations, sets `out`, then frees the pair) and a
dissolution's merge in `dissolve` (it relinks the far vertex's rotation and `out`, then frees the dropped pair and the
vertex); rows, levels, flags and the face tables (`facePass`, `materialise`) never touch a rotation. Line numbers: before
→ after.

| site | phase | vertex | verdict |
|---|---|---|---|
| :255 → :229 `dissolvable` | the on-run second reading (after every `deletePair`, before flags, levels and merges) | guarded `isVertexLive(p, u)` | closed |
| :285 → :258 `onStretch` | the same | `u` passed `dissolvable` (live) | closed |
| :431 → :401 `runsBefore` | before the first write | `vstar`: ends of touched (live) pairs, vertices losing rows, `w.vertices` filtered live, vertices gaining rows | closed |
| :508 → :478 `aroundV` | before the first write | the same | closed |
| :528 → :498 `saveRun` | before the first write | the same | closed |
| :658 → :628 the second reading | after the deletions, the face pass and `materialise` | `canonical()` filters live | closed |
| :684 → :654 rule 3 (c) | after (b)'s flags | `canonical()` at the loop's start; the loop frees only the vertex it is on (no incident edge) | closed |
| :1227 → :1197 `dissolve` | between merges (each completes before the next) | guarded live | closed |
| :1238 → :1208 `dissolve` (`ua`'s rotation) | before this merge's writes | `ua = dest(ha)`, a live edge's end | closed |
| :1301 → :1271 `restoreSplit` | after every dissolution | guarded live | closed |

No site reads a rotation mid-rewrite, so `outgoing` replaces `around` everywhere; a freed vertex (whose `out` holds the
free-list link) or an open rotation now asserts `arena: …` instead of walking it.

**The generator: first 16 draws of three seeds, before and after** (T-support-1). `order.test.ts`'s copy deleted and
`order.test.ts` imports `fuzzgen.ts`'s `rng`; `fuzzgen.ts`'s copy deleted and it re-exports `test/arena/support.ts`'s
`rng` (the kernel tests' one generator, pinned by `test/arena/support.test.ts`). The three bodies (the old `order.test.ts`
copy, the old `fuzzgen.ts` copy, `test/arena/support.ts`), each word × 2³²:

* seed 1: EQUAL — 2693262067 11749833 2265367787 4213581821 4159151403 1207330352 2632122864 3095568220 1828783984 4272732017 1955374602 2099329838 596715197 1734070562 1063107040 663542962
* seed 7919: EQUAL — 2963954777 3185336596 1619560377 3470510072 1064352239 2950739981 249889455 1693292393 2663165774 3436040076 1402844426 319401631 1236834845 2057508865 1492688795 2263732450
* seed 104729: EQUAL — 325253669 3481002091 881690241 2630884050 202925694 2575334518 2254226960 4281455078 909753038 2747231090 2179113045 326852131 94017507 516651112 901949097 1845129676

**API frozen (J263 Q1).** The exported names and their types, listed by the TypeScript checker on a copy of the tree
taken before the first edit and on the tree after: the barrel `src/index.ts` 673 names and `src/tx/index.ts` 56 names,
identical names and identical types; the one difference is `runsOfPairs`' symbol kind (a function declaration → a
`const` bound to `edgeRuns`, as the brief's form), its type `(p: Plat, pairsIn: readonly number[]) => number[][]`
unchanged. `state.ts` gains the file-level `enterWriter` and `overLimit` (not re-exported by `tx/index.ts`).

**NO-SHIFT (J260 (3)).** A scratch probe (never in the tree) runs the item's families in the lane's mirror and prints per
batch the outcome (the commit record as JSON, or the refusal's code and detail), the arena's tables bit for bit (`bits`),
the content print, the level digests L0 – L4, the encoded chunk refs and, per live way and kerb, `runsOfPairs` of its
pairs and its `routeLines`: the default mix seeds 1 – 300 (×7919, 14 batches) and the along mix seeds 1 – 300
(×104 729, 16 batches) — fuzz.test.ts's families widened from 24 seeds — the ten regression sequences, the area, angle
and width floors (100, 100, 60 seeds) and a 40-operation work limit (60 seeds): 13 700 batches, 13 700 lines, sha
`e7df46ac9c9ba5ba` on the pre-round mirror and on the new sources — byte-identical (`cmp`), refusal tallies identical.
The consolidated tests pass on the pre-round sources (14 files, 228 / 228, kernel project) and the pre-round tests on the
new sources (14 files, 222 / 222, `smoke.test.ts` among them).

**Refusals (J264 (5), N-58): before = after.** fuzz.test.ts's registered families (seeds 1 – 24): default 336 batches,
59 refused — `insert way` E_KEPT 57, `stretch` (not rekeyed) E_INVARIANT 2; along 384 batches, 104 refused — `insert
way` E_KEPT 95, `insert lane` E_KEPT 5, `stretch` E_INVARIANT 4; the regressions 220 batches, 49 refused — `insert way`
E_KEPT 43, `stretch` E_INVARIANT 4, `remove way` E_INVARIANT 2. The widened families: default 782 of 4 200, along
1 153 of 4 800; floors area 404, angle 641, width 196; work limit 388 — every count the same before and after. Classes:

| source / code | input kind | count (registered) | verdict |
|---|---|---|---|
| `stretch` without the rekey → E_INVARIANT `(way, …) lies in 2 parts, more than the 1 it declares (§3.10 role consistency; split it by rekey first, §3.4)` | UNLAWFUL (§13.1: refused by role consistency) | 2 + 4 + 4 | REFUSE — the alternative is named in the message: rekey first (`retypeEdges` with `rekey`, §3.4; the generator's rekeyed path) |
| insertChain (M0-a-05's `finerNear`) → E_KEPT `a chain vertex inside a finer face … (kept content)` | to be classed by M0-a-05 / the census (note N-c1-2) | 57 + 100 + 43 | not this item's code; count unchanged |
| tx's clearance row on a whole-way removal → E_INVARIANT `clearance: the vertex … stands within minEdge of the edge …` (regressions 5413 #28, 5606 #10) | LAWFUL (removing a way) | 2 | routed: note N-c1-3 |
| expectations (class floors) E_BELOW_MIN_AREA / ANGLE / WIDTH | the stage's own floors (§3.3 *Expectations*) | (probe families) | REFUSE by design — the `onFail` ladder (repair, downgrade) is the alternative |
| E_WORK_LIMIT | structural: the caller's budget (§3.3, §5.1 (5)) | (probe family) | REFUSE by design — the caller's `onFail` tiers |

### Old file → new file map (J263 Q8)

Every describe and it title is kept: 53 describe / 122 it before (17 files), 54 / 128 after (17 files) — the
T-tx-new-1 describe with its three its, and one it each in `profiles`, `expect` and `forms` added.

| old file | new file | change |
|---|---|---|
| `test/tx/smoke.test.ts` | `test/tx/forms.test.ts` | its describe 'a callback batch round trip' and both its moved byte-identical (placed before '§13.1: a transaction with no op …'); the file deleted; forms' header names the round trips |
| `test/tx/restore.test.ts` | same | `facesPerLevel`, `chunkRefs`, `digests`, `snapshot` (:30–52) → `test/tx/support.ts` `facesPerLevel` and `snapshot` (T-support-3: step 3–5's `snapshot` with the records per level beside it); the two `digests(p)` reads → `snapshot(p).digests`. `segmentDistance` (:661) STAYS: it returns Infinity when v projects outside a–b (the kernel's on-run reading), where `test/insert/step3-5/support.ts` `segDist` and `test/insert/step1-2/support.ts` `segmentDistance` clamp to the ends — another function. |
| `test/tx/order.test.ts` | same | its mulberry32 copy (:12–22) → `fuzzgen.ts`'s `rng` |
| `test/tx/fuzzgen.ts` | same | its mulberry32 copy → a re-export of `test/arena/support.ts`'s `rng` |
| `test/tx/support.ts` | same | + `facesPerLevel`, `snapshot` |
| — | `test/tx/chains.test.ts` (new) | T-tx-new-1 |
| `test/tx/profiles.test.ts`, `expect.test.ts`, `forms.test.ts` | same | one pin each (the self-check's survivors T2c, T5f, T5b) |
| `test/tx/source.test.ts` | same | its comparator keys read `comparePoints` (the folder's comparator since T-4) in place of `pointCmp` |
| `clauses`, `cost`, `fixtures.test`, `fixtures.ts`, `fuzz`, `record`, `removals`, `savepoint` tests, `fixtures/sequences.json` | same | unchanged |
| `src/tx/{chains,profile,relevel,state,tx,writers}.ts` | same | the findings above |
| `src/tx/{index,savepoint}.ts` | same | comments only |
| `src/tx/{ops,types}.ts` | same | unchanged |

The `kernel-tiny` project's include (`test/tx/**/*.test.ts`, `vitest.config.ts`) is folder-level: it runs the new
`chains.test.ts` and the folded cases in `forms.test.ts` (NEAR: 28 files, 14 per project).

**The mutant map by title.** s1 K01 – K15 → `restore.test.ts` 'N-47: removeEdges frees the own children …' (unchanged);
s2 X01 – X16 → 'B-1: remove(insert(x)) dissolves every crossing …' and the two B-1 properties; s3 Y01 – Y04 → 'B-1
targeted property'; s4 S01 – S05 and E01 → 'N-55 (1): a chain sharing a run …' and `savepoint.test.ts` 'N-55 (6):
takeSavepoint / restoreSavepoint / Savepoint through @plat/kernel'; s5 M01 – M13 → `savepoint.test.ts` 'N-56 (5): the
restore generation …'; the smoke cases keep their titles inside `forms.test.ts`.

### Self-check (J183): the faults re-introduced in the lane's mirror

Each mutant applied alone to the lane's mirror (a real copy of `plat/` under the session scratchpad; no link into the
tree, workspace packages resolving inside the copy), run as `vitest run --project kernel --maxWorkers=1 --bail=1
packages/kernel/test/tx`, restored from the tree with a `cmp` check (all 33 restored).

| id | file | fault | result |
|---|---|---|---|
| T1a | chains.ts | `runsOfPairs` a delegation that reverses the runs | killed: chains 'every keyed chain of every arena of the pool …' |
| T1b | arena/resolve.ts | `edgeRuns`' ring orientation flipped | killed: chains (the same) |
| T1c | arena/resolve.ts | a loop off a branch toward the larger neighbour | killed: chains (the same) |
| T2a | chains.ts | arc length +1 under the root | killed: profiles 'a ring interpolates cyclically …' |
| T2b | chains.ts | a ring's length without its closing segment | killed: profiles (the same) |
| T2c | chains.ts | the route reads one level finer | survived the folder first; killed by the new profiles pin 'the own-level route keeps the vertices of the chain's level only …' |
| T2d | profile.ts | `routeLines` hands the next finer level | killed: fuzz 'seed 2' |
| K01 / K03 / K11 | relevel.ts | s1's: no recursion / the gather stops above L1 / L1 ancestors never decided | killed: restore 'an L3 chain inside the framed square beside an L0 way …' |
| X04 / X08 | relevel.ts | s2's: no `onStretch` reading / no walk through dissolvable vertices | killed: restore "the widened property's case 855 …" |
| X12 | relevel.ts | s2's: ancestor frees in reverse key order | survived — as in `checks/M0-a-06-s2.md` (equivalent there: the record orders its removed lists by `removedKeys`); the promise it aims at is T4b's, killed |
| Y01 | relevel.ts | s3's: the stretch ends only | killed: restore "the S2 check's case 817 …" |
| S01 | relevel.ts | s4's: `levelRows` ignores the strip set | killed: restore 'case 1630 …' |
| W01 | relevel.ts | dissolution without `wasOnRun` | survived — s2's X02 (M18), equivalent there (CONFIRMED) |
| T4a | relevel.ts | `keyCmp` reversed (the survivor by the largest key) | killed: removals 'four owned blocks, one way removed …' |
| T4b | tx.ts | the record's removed list in reverse key order | killed: restore 'own case 52 …' |
| T5a | tx.ts | the area floor compared undoubled | killed: clauses 'a floor between the sliver's area and twice it (300 000 cm²) …' |
| T5b | state.ts | `enterWriter`'s detail text changed | survived the folder first; killed by the new forms pin 'a writer entered on a batch an earlier op took past its limit …' |
| T5c | state.ts | a batch past its limit not doomed at entry | killed: forms "a callback that ignores an op's E_WORK_LIMIT …" |
| T5d | state.ts | `overLimit`'s counter detail changed | survived — equivalent: inside this item's writers every charge goes through `chargeTx` (ten sites; `promote` charges nothing), which sets `failed` with its counter when it crosses the limit, and `enterWriter` dooms a batch already past it at entry, so `overLimit` never meets `failed === null` (by reading) |
| T5e | relevel.ts | the hot pixel squared four times over | survived — a pre-existing gap (note N-c1-4) |
| T5f | tx.ts | `cornerBelow` with π read as 3 | survived the folder first; killed by the new expect pin 'reject on an angle floor, read in centidegrees through π …' |
| N1 | tx.ts | the clearance row 1 cm short | survived — a pre-existing gap (note N-c1-4) |
| N3 | relevel.ts | the face pass's containment with the doubled point transposed | killed: restore 'the content print (rings at their least rotation), …' |
| TT1 | tx.ts | the committed record one version ahead | killed: forms (folded) 'a way across the frame committed, then removed …' |
| TT2 | tx.ts | the declared order by descending lineage | killed: order 'the canonical key: …' |
| M01 | savepoint.ts | s5's: every restore bumps the generation | killed: savepoint 'a restore across committed batches bumps it by exactly one …' |
| E01 | tx/index.ts | s4's: the savepoint export dropped | killed: savepoint 'the kernel index exports the two functions …' |

30 mutants (33 runs with the three re-runs): 25 killed, 3 equivalent (X12, W01, T5d), 2 pre-existing gaps (T5e, N1).

### Gates

`install --frozen-lockfile` 0; `lint` 0 (eslint 1155 files, 0 errors, 0 warnings; `lint: probe-red ok`); `build` 0. NEAR
at full strength: `test/tx` in the kernel and kernel-tiny projects — 28 files, 456 / 456 (157.8 s, W = 1), the item's
here bar among them (`order.test.ts`'s op-permutation harness, `cost.test.ts`'s O(touched)); `test/num` (M0-a-01's copy
table, which reads this round's sites as CONSOLIDATED) 13 files, 108 / 108. RELATED at `PLAT_FUZZ_RUNS=1000` over
`src/tx/{chains,profile,relevel,state,tx,writers,index,savepoint}.ts` (W = 1, 13 760 s): 467 files, 5 909 / 5 910 — the
one red is `test/io/roundtrip.test.ts` 'random batch arenas (default mix): …', vitest's 5 s default timeout (`Test timed
out in 5000ms`): alone it takes 5 531 ms on the tree and 5 240 ms on the pre-round sources (red on both), and passes on
both with `--testTimeout=120000` (7 / 7) — this machine's speed against io's default, not this round (the R5 check's
N-c1-7 class). No J176 bench red appeared (the run's one failure is the above).

### Notes

| id | observation | handling | milestone |
|---|---|---|---|
| N-c1-1 | **The plan's "X12 must stay killed" does not hold, and never did.** kernel-plan.md §1.3 T-4's ORACLE and the brief name s2's X12 ("frees in reverse key order") as a mutant to keep red; `checks/M0-a-06-s2.md` recorded X12 as **survived, equivalent** (the record sorts its removed lists by `removedKeys`, s1's K12), and it survives here too. The order X12 changes is the free list's (slot reuse), which no output reads (§3.3). The promise behind it — the record's removed records in key order — is T4b, killed by restore 'own case 52'. | none; recorded for the closing check | — |
| N-c1-2 | **insertChain's E_KEPT in this item's families needs its class (N-58).** 57 of 336 default and 100 of 384 along batches of fuzz.test.ts's seeds 1 – 24 (43 of 220 in the regressions) are `insert way` / `insert lane` refused `E_KEPT a chain vertex inside a finer face at (x, y) (kept content)` by M0-a-05's `finerNear` — under a spec with `rederivesFrom` 0, where tx's own kept-content rule (C-0185, by stage rank) keeps nothing. Whether a coarser chain's vertex inside finer content is unlawful (§3.3 *Kept content*, the stage clears first) or a lawful insert refused is M0-a-05's reading; unchanged by this round (before = after). | the refusal census (N-58) / M0-a-05 | M0 hardening |
| N-c1-3 | **A lawful whole-way removal refused by tx's clearance row** (C-0185 (4): a removal ends one-rings, a vertex beside an edge it was joined to through a deleted edge is no longer exempt): fuzz.test.ts's regressions 5413 (×7919, mix way 0.25 / lane 0.5, batch 28) and 5606 (batch 10), `clearance: the vertex (1376, 1330) stands within minEdge of the edge (0, 353)–(2485, 2163) (§3.10)` and `… (2499, 1756) … (1879, 1530)–(4000, 2395) …`. Fail-safe (nothing commits) and pinned as valid outcomes by the regression list; under J264 a lawful-input refusal is a defect to make succeed, which needs a design reading (what the removal does with the vertex left within minEdge). Unchanged by this round. | the session (J264, N-58: MAKE-IT-SUCCEED needs a ruling) | M0 hardening |
| N-c1-4 | **Two pre-existing test gaps on constants this round re-homed.** T5e (`nearSegment` with 4·`HOT_PIXEL_SQ`) and N1 (the clearance row at `minEdge − 1`) survive the tx folder; the same mutants of the pre-round `HOT_SQ` / `closer` would too. The re-homing is shown equal by the expressions (`HOT_PIXEL_CM * HOT_PIXEL_CM`; `segmentCloserThan`'s body) and by M0-a-01's copy table, which held `closer` ≡ `segmentCloserThan` and `HOT_SQ` = `HOT_PIXEL_SQ` while the copies stood. Pins need a split vertex 0.71 – 1.42 cm off its run, or a removal leaving a vertex 24 – 25 cm from an edge. | hardening (FAIL SAFE NOW, HARDEN LATER) | M4 |
| N-c1-5 | **A committed arena the encoder refuses (found by this round's probe; pre-existing, identical before and after).** In the along mix (×104 729, 16 batches) seed 91 batch 10 (`remove way`) and seed 235 batch 14, and the regression 106 (×15 485 863, mix way 0.2 / lane 0.3 / along 0.25) batch 18 (`remove way`), the batch commits (fuzz's `healthy` oracles pass) but `encodeArena` then throws `encodeArena: the rows of one level differ along a route edge of that level` and `routeLines` of the kerb that ran along the way (`lane:6`, `lane:7`) throws `tx: a run has route vertices at its own level`. A committed state that the persisted form and the profile reading refuse is N-45 (a)'s class (a throw on a valid arena, or a wrong committed result) in rule 3's re-levelling after a way under an along-kerb is removed; not diagnosed further here (a behaviour change is outside this round). | the session: a fix round of M0-a-06 (rule 3 (a) / (c) with M0-a-15's encoder row) | M0 (N-45 (a)) |

### Round C1 — the closing check's notes (lane `check/M0-a-06-consolidate-close-1`, 2026-10-13)

These rows come from the closing check of round C1 (verdict in `checks/M0-a-06-c1.md`). None is a blocker of the round:
each is pre-existing (it reproduces the same way on the pre-round sources, fetched from `main` at `b1d48323`) or a
comment or test-strength tightening.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-c1-6 | **N-c1-5 is wider than three sequences, and a registered regression is one of them.** This checker's NO-SHIFT probe (52 230 batches) finds 14 sequences whose committed arena `encodeArena` refuses with `the rows of one level differ along a route edge of that level`. They are the along mix ×104 729, seeds 91 (batch 10), 235 (14), 307 (7), 719 (10) and 980 (7), and the mix way 0.2 / lane 0.3 / along 0.25 ×15 485 863, seeds 106 (18), 210 (12), 213 (11), 333 (10), 361 (19), 395 (10), 402 (9), 443 (13) and 739 (19). The batches are `remove way` (10), `stretch` (2) and `stretch (rekeyed)` (2). Seed 106 ×15 485 863 is a registered regression of `fuzz.test.ts`, and that test's `healthy` oracle passes it. In 9 of the 14, `routeLines` of a live kerb then throws `tx: a run has route vertices at its own level` (`lane:6`, `lane:7`, `lane:4`, `lane:3`, `lane:8`, `lane:9` and `lane:15`, `lane:5`, `lane:6`). In all 14, `allProblems` is empty, and so is a whole-arena level-consistency scan of this checker's own (every vertex finer than a coarser edge has exactly two coarser edges of one level, with identical rows at that level). So the state breaks no row the validators read. It breaks the constancy of an intermediate level's rows along a coarser route edge, which the encoder reads (`io/encode.ts` `runRows`). Identical on the pre-round line, so not this round's. J290: the input kind is OUR OWN INTERMEDIATE (lawful batches), and the verdict is MAKE-IT-SUCCEED. | the session: the fix round N-c1-5 asks for, with these seeds. `fuzz.test.ts`'s `healthy` should also encode the arena and read `routeLines` of every live chain, so the registered family catches the class. | M0 (N-45 (a)) |
| N-c1-7 | **`enterWriter`'s limit boundary has no pin.** Mutant C10 dooms a batch whose total EQUALS its limit at a writer's entry (`>=` for `>`). It survives the tx folder at 10⁴ on the tree and on the pre-round line (writers.ts `enter`), so the gap is pre-existing. §3.3 refuses a batch whose total exceeds its limit, and the code is right. | a pin: a callback charged to exactly `workLimit` by one op, then a writer that must proceed | M4 |
| N-c1-8 | **The tx clearance row's boundary.** C12 (the row 2 cm too wide, `r + 2`) survives the tx folder at `PLAT_FUZZ_RUNS=1000`. Only the zigzag property kills it, at 10⁴. N-c1-4's N1 (1 cm too narrow) survives at every size. The row is shown equal to `segmentCloserThan` by the diff (`r*r*l2` ≡ `r2*l2`) and by the NO-SHIFT probe, but no unit case stands a vertex at 24, 25 and 26 cm from an edge after a removal. | extends N-c1-4's pin | M4 |
| N-c1-9 | **Two on-run mutants of the pre-batch list survive, and are subsumed.** X16 / X16c keep only the first pair of the pre-batch on-run list (`onRunBefore`, the first reading). They survive the tx folder at 10⁴ on the tree and on the pre-round line, because the second reading (`onStretch`) re-admits each same-level pair whose vertex is of the pair's level. s2's X16, read as the FINAL list keeping its first pair (X16b), is killed by restore's case 855. | none needed; a fixture where a vertex finer than its edges has two on-run pairs would separate the readings | M4 |
| N-c1-10 | **Two comment completions; everything the comments state holds.** (a) The C-tx-1 sentence on `tx/index.ts` (the plan's text, verbatim) drops one usage rule the old comment held: "never a batch's substitute (§3.3's batches stay the unit of writing)". A grep of `choices.md`, `M0.md` and `checks/M0-spec-notes.md` finds the rule nowhere else. "At most once" and "O(arena)" survive in `restoreSavepoint`'s doc and `savepoint.ts`'s header. (b) `state.ts`'s `op` doc lists a declared op's kind, `fn`, the writer names and `commit`, but `tx.ts` also sets `order` (`canonicalOrder`) and `<kind> (prepare)`. That list predates this round. | (a) one clause back on C-tx-1, or a choices row; (b) complete the list | M4 (comments) |

## Round S6 — session fix round (lane `build/M0-a-06-fix-s6`, flow flow-7, 2026-10-13)

Opened by the session's ruling J340 (2) on the R6 closing check's N-c1-6 (`docs/M0-FIX-QUEUE.md` Q54; N-c1-5): fourteen
lawful batch sequences of this item's own fuzz families committed an arena whose rows of an intermediate level differ
along a route edge of that level, so `encodeArena` refused it and `routeLines` of a live kerb threw in nine. J290: OUR
OWN INTERMEDIATE, MAKE-IT-SUCCEED. Built on main after R6. The choices row is C-0356.

### The defect, diagnosed on the fourteen replayed sequences

Every one of the fourteen is the same mechanism, in **split restoration** (§2.2 rule 3 (c)'s last step, `relevel.ts`
`restoreSplit`). A junction j of way W on way V's L1 run carries the `split` flag. An L2 kerb drawn along V ends at j,
so V's edge on one side of j carries the kerb's L2 row and V's edge on the other side does not. An L3 plot line also
meets j. When W is removed (`remove way`, or the removal half of a `stretch` / `stretch (rekeyed)` batch), j's two
remaining edges of its level have identical rows of L1, so restoration applies. It set j's level to "the lowest level
among the finer edges and finer vertex rows" — L3, the plot line — and read nothing about the kerb's L2 row, which one
run edge carries and the other does not. At L3, j is a Steiner vertex of V's L2 route edge too, and that route edge's L2
rows change at j. So:

* `encodeArena`'s `runRows` throws `the rows of one level differ along a route edge of that level`;
* the kerb's own-level (L2) route has no vertex at its end, and where that leaves its run fewer than two L2 vertices
  `linesOfRuns` throws `tx: a run has route vertices at its own level` (nine of the fourteen, on the fuzz's live kerbs).

`allProblems` and the index check stayed empty because §3.10's level-consistency row, as M0-a-14 builds it, reads the
coarser edges' own level only. The first broken batch and the one vertex, per sequence (before → after this round):

| sequence | batch | kind | vertex | level before → after |
|---|---|---|---|---|
| along ×104 729 seed 91 | 10 | remove way | (1110, 791) | L3 → L2 |
| along 235 | 14 | remove way | (3002, 1064) | L3 → L2 |
| along 307 | 7 | remove way | (1555, 2313) | L3 → L2 |
| along 719 | 10 | remove way | (1603, 2179) | L3 → L2 |
| along 980 | 7 | stretch (rekeyed) | (2856, 2732) | L3 → L2 |
| heavy ×15 485 863 seed 106 (fuzz.test.ts regression) | 18 | remove way | (2398, 2399) | L3 → L2 |
| heavy 210 | 12 | stretch (rekeyed) | (3300, 3035) | L3 → L2 |
| heavy 213 | 11 | stretch | (1480, 1041) | L3 → L2 |
| heavy 333 | 10 | remove way | (2726, 1325) | L3 → L2 |
| heavy 361 | 19 | remove way | (2783, 2771) | L3 → L2 |
| heavy 395 | 10 | remove way | (3426, 3439) | L3 → L2 |
| heavy 402 | 9 | stretch | (969, 2146) | L3 → L2 |
| heavy 443 | 13 | remove way | (726, 719) | L3 → L2 |
| heavy 739 | 19 | remove way | (2536, 3540) | L3 → L2 |

Batch indexes are 0-based; "heavy" is the mix way 0.2 / lane 0.3 / along 0.25, 20 batches; "along" is `ALONG_MIX`, 16.

### The fix (src/tx/relevel.ts only)

`restoreSplit`: where restoration applies (as before — the vertex still meets finer edges or carries finer vertex rows),
the level it takes is also at most the level of every row finer than the vertex that one of its two run edges carries
and the other does not (a finer chain ending at the vertex along the run). So every level's rows stay constant along
the run the vertex now stands inside, and the ending chain's own-level route keeps its end. In the fourteen, the
junction takes L2 (the kerb's level), not L3, and keeps its `split` flag as a Steiner vertex of V's L1 route. The
trigger is unchanged: a vertex with no finer edge and no finer vertex row is not restored (N-s6-1). This is a commit that
succeeds with constant rows (J264 (2)), not a post-condition refusal.

### Evidence

* **The fourteen replayed** (mirror probe; seeds, multipliers and batch indexes above). On the pre-round sources, every
  one commits its batch and then `encodeArena` refuses; `routeLines` of a live kerb throws at that batch in eight —
  lane:6 (91), lane:7 (235), lane:4 (719), lane:3 (213), lane:8 (333), lane:9 and lane:15 (361), lane:5 (395), lane:6
  (443) — and in a ninth at a later batch, lane:11 (210, batch 15). After the fix, every batch of every sequence commits or refuses
  exactly as before, and every committed arena is encoded and read.
* **NO-SHIFT probe** (mirror, pre-round `relevel.ts` vs the round's): 52 220 batches — default ×7 919 seeds 1 – 1 200
  (14 batches), along ×104 729 seeds 1 – 1 200 (16), heavy ×15 485 863 seeds 1 – 800 (20), and fuzz.test.ts's ten
  regressions — each batch's outcome, its code and the sha256 of `state(p)` (the slot-free content print and the
  version). The outcome of every batch is identical. Outside the fourteen sequences, 51 940 lines are byte-identical
  (sha256 of the lines `9343ae04cf3f9b04…`, both sides). Inside them, 78 batch states differ, each from the sequence's
  first broken batch on, by the one vertex in the table and what its level moves (its faces and route items). Whole
  files: pre `d72f1feb…`, post `b7cfdb13…`. The change can alter a result only where the old result broke the
  constancy: if the bound lowers the level, a row of that level differs between the two run edges, and the old level
  left the vertex inside that level's route.
* **Refusal census** (J264 (5), N-58). tx's refusals on the registered families, before = after: fuzz.test.ts seeds
  1 – 24 default 59 / 336, along 104 / 384, the regressions 49 / 220 (the R6 check's counts); over the probe's wide
  families default 3 478 / 16 800, along 4 579 / 19 200, heavy 3 576 / 16 000. None added; the codes are those of N-c1-2
  (E_KEPT), N-c1-3 and the role-consistency refusals of `stretch` (E_INVARIANT), and one E_DEGENERATE, all as before.
  The encoder's refusals of committed arenas: 37 batches in the 14 sequences → 0. `routeLines` throws on a live chain:
  22 batches → 0. A whole-arena intermediate-level scan (every vertex finer than r with level-≤ r edges: exactly two of
  one level with identical level-r rows): 37 → 0 lines.

### Tests (test/tx)

* `support.ts`: `readable(p)` — `encodeArena(p)` and `routeLines` of every chain the arena carries (`chainsOf(p)`: every
  live non-indexed edge row's (role, entity), read from the role table) must not throw. Imported by path
  (`src/io/index.js`, `src/tx/index.js`).
* `fuzz.test.ts`: the `healthy` oracle of all three families (seeds, regressions, along) is followed by `readable(p)`
  after every committed batch. Seeds and sizes unchanged.
* `readable.test.ts` (new): the fourteen sequences, each pinned at its batch (its kind, a commit with a record) and read
  after every batch (`healthy`, `readable`; a refusal leaves the arena as it was).
* `removals.test.ts`: the constructive case (a kerb along the spine ending at a junction, an L3 plot line at it; the
  junction's way removed: L2, `split | steiner`, the kerb's route `(2000,2000) – (4000,2000)`); the same with the kerb
  THROUGH the junction (L3, the kerb's route `(0,2000) – (4000,2000)`); the existing "kept" case now asserts the level
  (L1).

Red on the pre-round `relevel.ts` (mirror): 16 tests — `readable.test.ts` 14 / 14 (`encodeArena: the rows of one level
differ …`), `fuzz.test.ts` 'seed 106 × 15485863', `removals.test.ts`'s constructive case. Green on the round's sources.
The along family's broken sequences are seeds 91 – 980 of ×104 729, outside fuzz.test.ts's seeds 1 – 24 (which pass on
both lines); they are pinned in `readable.test.ts`.

### Self-check (J183)

The fault re-introduced: the pre-round `relevel.ts` in the mirror (16 red, above). Targeted mutants of the new bound,
each against `test/tx` (kernel project, `--bail=1`, W = 1), restored and `cmp -s`-checked after each:

| mutant | change | result |
|---|---|---|
| M1 | the bound reads only the second run edge's unshared rows | killed (fuzz 'seed 106 × 15485863') |
| M2 | only the first's | killed (readable 'seed 307') |
| M3 | every finer row on the run edges bounds the level, shared or not | survived, then killed by the new THROUGH pin |
| M4 | the bound applied before the trigger (a vertex with no finer edge or vertex row restored) | survived, then killed by the "kept" case's level assertion |
| M5 | `R.level[r] >= lv` for `> lv` | equivalent: the rows of level ≤ lv are identical on both edges (restoration's precondition) |
| M6 | the bound one level too fine (`R.level[r] + 1`) | killed (fuzz 'seed 106 × 15485863') |

### Gates

`install --frozen-lockfile` 0; `lint` 0 (eslint 1 137 files, 0 errors, 0 warnings; `lint: probe-red ok`); `build` 0.
NEAR at full strength: `test/tx` in the kernel and kernel-tiny projects — 30 files, 488 / 488 (90 s, W = 1), the item's
here bar among them. RELATED at `PLAT_FUZZ_RUNS=1000` over `src/tx/relevel.ts` (the round's one source file; W = 1, 6 694 s): 429 files,
5 564 / 5 564, exit 0 — no red (neither a J176 bench red nor R6's io roundtrip timeout appeared).

### Notes

| id | observation | handling | milestone |
|---|---|---|---|
| N-s6-1 | **Restoration's trigger kept literal.** A `split` vertex whose two run edges match at its level but differ only in a finer row (a kerb ending at it), and which meets no finer edge and carries no finer vertex row, is neither dissolved (its role sets differ) nor restored: it stays a vertex of the coarser route (`removals.test.ts` 'kept', L1). The arena is valid and encodable, and the outcome fails safe. The coarser route is not restored exactly, though: it keeps a vertex no row of its level needs. Reading the ending chain as "finer geometry" for the trigger too (M4) would restore it; that changes committed results on lawful states the registered families may reach, so it is not done in this round (NO-SHIFT). | hardening: decide whether a finer chain ending on the run triggers restoration (§2.2 rule 3 (c)) | M4 (hardening) |
| N-s6-2 | **A validator row is warranted (route to M0-a-14).** `allProblems` passed all fourteen broken arenas: §3.10's level-consistency row reads the two coarser edges' rows at the edges' own level, not at each level between that and the vertex's. The encoder's `runRows` reads the full constancy. A row "a vertex finer than level r with edges of level ≤ r has exactly two, of one level, with identical rows of level r (of level ≤ 1 at r = 1), for every r between" would make every batch refuse such a state at commit rather than leave it to the encoder. tx's own (c) step has the same single-level reading for a vertex finer than its edges (`single`); with this round's bound no tx writer is known to reach the in-between case (0 in the 52 220 batches' scan). | the session routes the row to M0-a-14 (`invariants/`); tx's (c) step can read every level once the row exists | M0-a-14 |

### Round S6 — the closing check's notes (lane `check/M0-a-06-close-s6`, 2026-10-13)

Verdict in `checks/M0-a-06-s6.md` (PASS). None of these is a blocker. Seeds use the generator's `rng(seed × mult)`,
fuzz.test.ts's loop, and 0-based batch indexes; "heavy" is the mix way 0.2 / lane 0.3 / along 0.25.

| id | observation | handling | milestone |
|---|---|---|---|
| N-s6c-1 | **A LAWFUL refusal class in the wide families, and N-s6-1's "fails safe" is incomplete.** The checker's 52 220-batch golden holds 9 `remove lane` batches that tx refuses with `E_INVARIANT an L2 batch wrote the L1 index (delete of vertex N (L1)) outside its promotions and demotions` (index freshness). They are along ×104 729 seeds 325 @12 and 1097 @9, @12, @15, and heavy ×15 485 863 seeds 7 @18, 9 @6, 247 @5, 619 @19 and 719 @14. They are identical on the pre-round line, so the class did not rise in S6, and none lies in fuzz.test.ts's registered families. In the two examined, the refused vertex is an L1 `split` vertex on one way: along 325 @12 `v10 (3624,2661) L1 f4`, edges `[way/way:0/L1]` and `[way/way:0/L1, kerb/lane:4/L2]`; heavy 247 @5 `v8 (1355,648)`, the same shape with `kerb/lane:3`. Its two edges differ only by an L2 kerb that ends there, which is N-s6-1's 'kept' vertex (no finer edge, no finer vertex row, so not restored). This checker's trace confirms the history in both. In 325 the vertex is the crossing of way:0 and way:1 from batch 1; kerb lane:4 runs along way:0 and ends at it (batch 6); batch 11's `stretch (rekeyed)` removes way:1's stretch, which leaves it at L1 with flag 4 (`split`). In 247 it is way:0 × way:2, with kerb lane:3 (batch 3) and `remove way` way:0 (batch 4). Removing that kerb in an L2 batch then dissolves the L1 vertex, and index freshness refuses the L2 batch's write to the L1 index. J290: the input is LAWFUL (removing a live lane), so the verdict is MAKE-IT-SUCCEED. The author's census (round S6 *Evidence*) classes the wide families' refusals as E_KEPT, N-c1-3, `stretch`'s role consistency and one E_DEGENERATE, and omits this class. | the session: a fix round (MAKE-IT-SUCCEED) — reading a finer chain ending on the run as restoration's trigger too (N-s6-1's M4 option), or the dissolution's level rule for such a vertex; N-s6-1's placement at M4 reconsidered, since its 'kept' state leads to these refusals | M0 (J264), the session's call |
| N-s6c-2 | **The restored vertex's changed-face levels are unpinned.** Two mutants show it. N12 drops the pre-existing `a.level < finer` bound on `restoreSplit`'s changed-face loop, so every near face at the vertex's level or finer is listed changed. It survives `test/tx` (244 / 244) while 2 244 of the golden's 52 220 lines differ (records and index state). N8 moves this round's bound after that loop. It survives `test/tx` and lists one unchanged L2 face as changed: along 235 @14 `changed (0,0)-(3185,0) (3185,0)-(4000,0)` against the tree's `(0,0)-(3185,0)`, and heavy 106 @18 likewise. The encoded arena and `routeLines` are identical. The tree is right: the vertex stays on the L2 route. Over-listing is conservative (extra re-derivation), not a wrong arena. | a pin of the 'ending' fixture's `record.faces[L2].changed` (the far L2 face not listed) and of a restoration's changed levels `[lv, finer)` | M4 (hardening) |
| N-s6c-3 | **(c)'s `single` row comparison is unpinned.** D1 removes `&& sameList(levelRows(p, under[0], m), levelRows(p, under[1], m))` from rule 3 (c)'s `single`. It survives `test/tx` and is byte-identical over the 52 220 batches: no family reaches a vertex finer than its edges whose two coarser edges differ in rows. That is N-s6-2's single-level reading; this checker's every-level constancy scan finds 0 such vertices after the round. | with N-s6-2's validator row (M0-a-14): a fixture where (c)'s `single` must refuse a mismatched pair | M4 (hardening) |
| N-s6c-4 | **Record completions.** (1) Heavy ×15 485 863 seed 210 has two broken batches: 12 (`stretch (rekeyed)`, (3300, 3035)) and 15 (`remove way`, (606, 1943), L3 → L2). C-0356's and the notes' "one vertex per sequence" omit the second vertex; the round fixes both (`readable.test.ts` reads every batch). (2) One wide-family refusal is unclassed in the author's census: along 648 @13 `insert way` `E_INVARIANT (way, way:13) branches: a linear role forms simple chains or rings`. It is identical before and after, and its kind (likely a generated three-point way whose snapped form touches itself) was not examined. (3) The author's encoder count, 37 batches, counts committed states. This checker's 51 also counts the states that refused batches leave on a broken arena. Both are 0 after. | the session: amend C-0356's shift list when it commits (210's second vertex); class (2) at the next census | M0 (record), M4 |
| — | **Equivalents, judged.** N10 (`R.level[r] >= lv`): the trigger's `sameList(pairRows(c0, lv), pairRows(c1, lv))` makes every row of level ≤ lv common to both edges. N11 (the compare without the row's level): one (role, entity, ordinal) key carries one level. X03 (restoration without the on-run test): s2's argument, and the trigger is unchanged. N10 and N11 are golden-identical over 52 220 batches. | none | — |
