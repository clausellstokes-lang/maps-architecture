# M0-a-08 — the checker's minor notes (for the hardening milestone M4)

Lane `check/M0-a-08`, 2026-10-05. These notes do not fail the item (J180). The one blocker, B-1, is in
`checks/M0-a-08.md`, which also defines the mutant ids (K…, H…) used below.

1. **K30 survives: a half-width list longer than the input points is not pinned.** C-0196 (2) and `buffer.ts` say the
   list has one entry per input point, "a RangeError otherwise". The test "a list of another length … is the caller's
   error" (`buffer.test.ts:208`) checks a shorter list only. Mutant K30 changes `!== total` to `< total`, so a longer
   list is accepted and its extra entries are ignored; it survives every test. This is a caller error that the design
   does not name, so it is minor. Suggested pin, run in the seat's mirror (green on the real code, red under K30):
   `expect(() => buffer([[pt(0, 0), pt(1000, 0)]], [100, 100, 100], 'round', 'flat')).toThrow(RangeError)`.
2. **The overlay's defences are never reached on the drawn domains (K14, K15, K16).** The seat ran probes in an
   instrumented mirror: 2 400 draws of the agreement families (seed 7) and 4 000 dense random rings in 3 m and 30 m
   boxes (seed 11).
   * K14 (`glueWalks` off) and K15 (`balanceFlow` off): neither function's body was reached in any draw.
   * K16 (a segment's off-path edges counted +1): the off-path case was reached in 65 draws (buffer 10, offsetFace 9,
     dense booleans 46), and no output changed, because `balanceFlow` cancels the stray flow. C-0206 (4) records this
     redundancy.
   So N-41 (3)'s "a mutant that counts each traversal as positive turns it red" holds only when `balanceFlow` is also
   off. M4 should either construct an input that reaches `glueWalks` and `balanceFlow`, or turn them into asserted
   invariants. It could also pin `overlay.net` before balancing.
3. **K31 is equivalent: `ringEdgeParts`' `lens[b] >= w1 && lens[i] >= w1` condition is redundant.** Take a point x in
   the disc of radius w at vertex v that neither strip nor v's outer sector covers. Then x lies beyond one edge's far
   end. If that edge has length L, x's squared distance to the edge's other vertex is less than |x − v|² − L². So x
   lies in that vertex's disc too, and the descent strictly decreases, ending in a strip, a sector or a round cap. The
   module comment and C-0196 (3) say the strips cover a join's inner side "only where both edges are at least d long",
   which is stricter than needed. No change is required. The sawtooth test passes with and without the condition.
4. **H04: the snap-rounded re-judge's "area bound unchanged" has no meta-test.** Mutant H04 lets a re-judged case pass
   when its snap-rounded verdict fails on anything other than the face count alone. It survives the kill suite. The
   probe found the re-judge reached in 3 of 7 500 boolean and buffer draws, and H04's branch never reached. M4: a
   harness test with a planted oracle whose snap-rounded rings fail the area bound.
5. **H06: `judgeInset`'s lattice-edge settle (C-0206 (9), "a failure otherwise") is not wired to a test.**
   `harness.test.ts` tests `insetLeavesLattice` itself. The pins reach one settled case and one in-range case that does
   not return `E_OUT_OF_RANGE`. A mutant that settles every outward `E_OUT_OF_RANGE` survives. It is equivalent on
   honest inputs, because our `E_OUT_OF_RANGE` comes only from snapping the same half-plane geometry. M4: plant an
   `E_OUT_OF_RANGE` result through `judge` for an in-range face.
6. **H07: `judgeInset`'s non-convex branch has no meta-test.** A mutant that settles a non-convex face whatever our
   answer survives. The kernel test still holds `E_NON_CONVEX` on the L-face and the holed face (K36 is killed).
   M4: a harness test.
7. **H08: `oracleOffset`'s covered-face shortcut has no meta-test.** With the shortcut taken at half the farthest
   vertex distance, the kill suite at 300 cases per operation stays green. The real shortcut is correct: distance to a
   segment is convex, so its maximum over the face is at a vertex. The survival also shows that §3.7's attracted bound
   (perimeter × 36.8 cm) cannot tell a wrongly empty oracle from a small attracted remnant. M4: pin the shortcut with a
   face whose distance lies between half the farthest distance and the farthest distance.
8. **Evidence outside `plat/`.** C-0206 (7) and C-0208 cite repros under `~/maps-scratch/M0-a-08-blockers/`, as J196
   directs. Scratch is not durable. N-43 orders M0-a-05's round to pin both PENDING-S3 cases as tests. Until then, the
   seat's own replays (and this run's new line-B case) are in `~/maps-scratch/waves/check-M0-a-08/s3/`.
9. **`traceKept` throws a plain `Error`** ("arr: the kept boundary does not close") on a boundary walk that does not
   close. This is unreachable on a valid overlay. §3.11 and M0-k-04's runner expect "never a throw for a geometric
   reason". M4 could return `E_INVARIANT` instead.
10. **The PR run prints the report line of a failing operation only.** Under the default reporter, the
    `arr/<op>: … share …` lines of passing tests are not shown. In this check's 10⁴ run only offsetFace's line was
    printed; `--silent=false` shows them all (the 1 000-case run in the verdict). The guard is asserted for every
    operation either way. A seat that wants the shares should pass `--silent=false`.
11. **The kernel-side property tests have fixed sizes** (500, 300, 60 and 40 runs) and do not read `PLAT_FUZZ_RUNS`.
    The item's here-bar is the agreement, which does scale, so this is acceptable. M0-k-04's B-FUZZ runner owns the
    tier sizes.
12. **For the session (PENDING-S3 line B): a new case from this check's PR-size run.** The offsetFace face is
    `[[55992,48759],[60049,52439],[58810,57461],[61767,62912],[51476,60063],[44789,53887],[50022,51882]]`, with
    distances `[31,2705,320,1412,31,2705,320]`. Its |Δ| is 3 424 944.5 against a bound of 3 409 867.9. On
    `insertChain` alone, overlay segment s42, (50990, 54408) → (45757, 56413), commits `W_PLACED` through
    (48295, 57125), 1 572.9 cm off its segment. The result is identical on S2's code. Files: `new-off-case.json`,
    `new-off-segs.json`, `scan-routes.mts` in `~/maps-scratch/waves/check-M0-a-08/s3/`. N-43's fidelity bound covers
    it.

## Closing check (lane `check/M0-a-08-close-r1`, 2026-10-05): notes 13 – 16

13. **K35t survives: the exactness of insetRing's convexity check is pinned on the accepting side only.** B-1's new
    test pins that a straight-through vertex is accepted. The L-face and the holed face pin the refusal side, but only
    for a deep concavity. Mutant K35t changes `insetRing.ts:54` from `orient2d(…) < 0` to `orient2d(…) < -2000`, a
    tolerance. It survives the kernel folder (62/62) and testkit `pins`, `harness`, `guard` and `agreement-faces` at
    300 cases (23/23). On the real code, a 1 cm dent is refused `E_NON_CONVEX` (CONFIRMED in the mirror):
    `R([0,0],[500,1],[1000,0],[1000,600],[0,600])` and `R([0,0],[1000,0],[999,300],[1000,600],[0,600])`. Under K35t
    the first face gets a five-vertex inset. The real code is correct, so this is a hardening test and not a blocker.
    Suggested pin for M4 (or for M0-a-09 if it touches `insetRing`): both rings, inset 100, `toMatchObject({ ok: false,
    code: 'E_NON_CONVEX' })`. The probe is `~/maps-scratch/waves/check-M0-a-08/close-r1/probe/zz-dent.test.ts`.
14. **Note 2 still stands on hand-built stress inputs.** The probe `close-r1/probe/zz-glue.mts` ran 1 200 cases in an
    instrumented mirror: rectangles with corners 0 – 40 cm apart, rings with 1 – 30 cm chamfers, triangle tips 0 – 30 cm
    from an edge, and buffers of chains with 1 – 60 cm steps. `glueWalks` and `balanceFlow` were never reached. The
    off-path rule was reached once, and K14, K15 and K16 changed no output. The probe `zz-area.mts` ran 2 000
    near-coincident rectangle booleans against the exact overlap areas. The worst case was |Δ| / perimeter = 12.5 cm,
    an xor of 14 cm and 26 cm slivers that attraction (attractCm 26) folds to empty. That is inside the attracted bound
    of √2 · 26 = 36.8 cm. M4's suggestion in note 2 is unchanged.
15. **For the session (PENDING-S3 line A): fix round 1's two cases replay on `insertChain` alone.** The segments were
    re-derived from the arr code into `close-r1/s3/case{1,2}-segs.json`. In a fresh arena with the frame first,
    `insertChain` refuses s36 of 37 and s31 of 36 with E_INVARIANT 'insert: no route from (−17146, 12375) to
    (−17837, 10679) keeps clearance (§3.10)' and '… from (−48618, −42484) to (−47975, −44198) …'. That message is raised
    only at `insert/insertChain.ts:467`. The replay script is `close-r1/probe/zz-replay.mts`. This check's PR-size run
    (18:40 – 19:20) added one more case of each PENDING-S3 line. The files are in `close-r1/s3/`.
    * **Line A:** an `arb-stroke` buffer, w 89, round joins, square ends, attracted (`near-buffer-case.json`). `buffer`
      refuses E_INVARIANT 'insert: no route from (−65118, 64460) to (−65062, 64544) keeps clearance (§3.10)'. The
      refusing overlay group has 217 segments (`near-buffer-segs.json`, dumped by `probe/zz-dumpbuf.mts` in an
      instrumented mirror). On `insertChain` alone, s174 of 217 is refused with the same message.
    * **Line B:** an offsetFace `arb` case, attracted (`near-off-case.json`). The face has a pinch vertex
      (13286, −4124). Its |Δ| is 4 980 085.9 against a bound of 2 687 207.8. On `insertChain` alone
      (`probe/zz-off.mts`, 1 053 segments, 40 collapsed `E_DEGENERATE empty`, none refused otherwise), s90,
      (15090, −11467) → (5586, −8576), commits `W_ATTRACTED + W_PLACED + W_ACUTE_CORNER + W_STRETCH_SHARED` along a
      route 1 933.2 cm off its segment. The route-to-segment polygon is 6.72 × 10⁶ cm², which exceeds the
      2.29 × 10⁶ cm² excess. The next route is s69 at 910.0 cm (`W_PLACED + W_WEDGE_ROUTED`), and every other route
      is within 62.6 cm. This is N-43 B's far landing.
16. **For the session, not this item: a red in M0-a-09's in-flight test.** The related run (PLAT_FUZZ_RUNS=1000,
    19:23 – 19:27) was red only in `kernel/test/arr/bands/bfuzz.test.ts` ("kerb, corridorUnion and bandUnion on random
    street networks"), seed −1799559882. `corridorUnion` refused with `E_DEGENERATE`, which the test's
    `CORRIDOR_CODES` ['E_KEPT', 'E_INVARIANT'] does not list. The counterexample is
    `[[{"a":327,"b":4515,"hw":30,"knots":[60,5],"ends":"round"},{"a":702,"b":7960,"hw":1,"knots":null,"ends":"round"},{"a":4181,"b":0,"hw":1,"knots":null,"ends":"round"}]]`.
    The test, its import path's new files (`kerb`, `bandUnion`, `corridorUnion`, `tileRings`) and the refusal list
    are all M0-a-09's, and M0-a-09 is still being built (its 19:26 CHECKPOINT). None of M0-a-08's files changed: they
    are SHA-equal to its landed record. So the red is not this item's gate (J193 (3)). It is passed to M0-a-09's
    builder and checker, who should decide whether `booleans`' documented `E_DEGENERATE empty` should reach
    `corridorUnion`'s caller.

## Closing check of session fix round S1 (lane `check/M0-a-08-close-s1`, 2026-10-06): notes 17 – 21

The mutant ids (Q…) are defined in `checks/M0-a-08-s1.md`. None of these notes fails the item (N-45, J202).

17. **KI: Q07 survives, because the per-family binding of the refusal cap is not pinned.** The mutant has `verdict`
    apply `insertChainRefusalCap('buffer', runs)` for every operation. It passes both item folders at 1 000, because
    `harness.test.ts:324` exercises `verdict` for `buffer` only and no family comes near buffer's cap. The real code is
    right: `support.ts:1339` binds `op`, and probe `close-s1/m2/packages/testkit/zz-percap.mts` executed `verdict` for
    all seven operations at cap and cap + 1 (union … insetRing 1 / 2:CAP, buffer 105 / 106:CAP, offsetFace 56 /
    57:CAP). *Suggested handling:* in `harness.test.ts`, loop over `Object.keys(REFUSAL_MEASURE)` and assert that
    `verdict(h, op, 10_000)` throws the "measured cap" message at `insertChainRefusalCap(op, 10_000) + 1` and only the
    guard at the cap. This is one loop. Hardening milestone M4, or the next round that touches the harness.
18. **KI: Q11 survives, because the ratchet's baseline is not pinned against a raise.** `REFUSAL_MEASURE` (buffer 830
    in 12 seeds, offsetFace 413 in 13) is the ratchet baseline of N-46 (4), and "a cap only falls". However, a raise
    of a count (Q11: offsetFace 413 → 826) passes every test, so only review of C-0231's table guards it. *Suggested
    handling:* a pin test asserting each family's per-10⁴ rate ≤ C-0231's measured value (69.17 and 31.77; 0 for the
    rest), so that a raise needs an explicit test edit under a session ruling, as for M0-a-05's `caps.ts`, if the
    session wants the ratchet enforced mechanically. M4, or the session.
19. **Q09 is equivalent on the drawn domain.** The mutant counts a face service's setup refusal of any code
    (`faceOf`) as insertChain's, not only `E_INVARIANT` and `E_BELOW_MIN_EDGE`. Probe `zz-setup.mts` ran
    `arenaFaceOr` on 2 × 10⁴ offsetFace cases (seeds 7101 and −7203): 19 994 were `ok`, 6 had no bounded face
    (settled under both versions) and 0 were refused with any code. The mutant's direction is also stricter: it would
    count more refusals against the cap, never fewer. No action.
20. **Observation: offsetFace's rate on this check's seeds sits near its rate cap.** At the PR size, seeds 7013,
    7101, −7203, 7307 and −7409 gave offsetFace 39, 42, 34, 33 and 31 insertChain refusals. That is 35.8 per 10⁴,
    against the round's 31.77 and its rate cap of 36.46. The Poisson deviation is +1.6 σ, not significant. Pooled
    with the round's 13 seeds, the rate is 592 in 18 seeds = 32.9 per 10⁴. The largest single run is 42, against the
    run cap of 56. Buffer gave 78, 60, 72, 69 and 72 (70.2 per 10⁴ against 69.17, rate cap 76.37, run cap 105). Every
    one of the 413 probe refusals replays exactly on insertChain alone (exact-call replay, `close-s1/meas/`).
    *Suggested handling:* when the ratchet is next re-measured (KI-1, M0-a-05's to lower), pool these five seeds with
    the round's. Both families stay far above N-44's target of 1 per 10⁴ (KI-1).
21. **For the session, sooner than M4: the oracle hang is a gate flake.** C-0231 records polygon-clipping not
    terminating on about 1 offsetFace case in 1.2 × 10⁵ (register `oracleHang`). A PR-size near run draws a fresh
    fast-check seed each time unless `PLAT_FUZZ_SEED` is set, so about one run in 12 hits the hang and times out
    after 1 h. That makes a gate exit non-zero for a cause outside the code under test. This seat's 5 × 10⁴
    offsetFace cases (near run seed 7013 and four probe seeds) met no hang. *Suggested handling:* bound the oracle
    call before M0's milestone whole-suite run. C-0231's own remedy fits: a time-limited call read as the oracle's
    own-operand refusal, which C-0150 / N-40 already count. Owner: M0-k-03's oracle or this item's harness, as the
    session decides.

The rows below are from lane `check/M0-a-08-close-s2`, 2026-10-07: the closing check of session fix round S2 (J226,
the insetRing oracle's scaled frame, C-0261). Mutant ids T01 – T11 are defined in `checks/M0-a-08-s2.md`.

22. **KI: T03 survives, because `oracleInset`'s use of the largest k is not pinned.** The harness pins
    `insetFrameExponent` alone. Mutant T03 (`S = k >= 4 ? 16 : 1`, the rejected fixed-16× frame with its fall-back)
    passes the four inset-reaching files at 1 000. On the seat's seeds 8101, −8202, 8303, −8404 and 8505 (10⁴ each)
    T03 gives 0 failing verdicts, but its worst ratio |Δ| ÷ bound is 0.744 0.629 0.563 0.717 0.675 against the real
    code's 0.626 0.516 0.553 0.498 0.516, and each worst case has k < 4 (about 13 % of oracle calls). The real code
    takes the largest k (CONFIRMED by reading `const S = 2 ** k` and by the lower ratios). *Suggested handling:* pin
    one k ∈ 1..3 case whose ratio is far lower than with S = 1, or assert that `oracleInset` equals the construction
    at 2^`insetFrameExponent`. Hardening, M4.
23. **KI: T07 survives, because the dedupe and the zero-area drop after the final rounding are not pinned.** Without
    them a ring that rounding collapses would stay in the oracle's answer as a degenerate face. That would cause a
    false `faces` failure, which is a false red: it fails safe. Nothing in the seat's 5 × 10⁴ cases needed the drop.
    *Suggested handling:* a unit pin of `oracleInset` on a sub-centimetre sliver. M4.
24. **T08 is equivalent.** Rounding a half up instead of a half away from zero changes a vertex only at an exact tie.
    Both lattice points are then nearest, and the promise "rounded to the nearest centimetre once" still holds.
25. **T09 is equivalent on the lattice-range promise.** Sizing the frame on L instead of L + diag still keeps every
    strip corner inside 2²³. With L = 2 · diag + 4 · E, E > diag ÷ 2 + |d| and S · L < 4 × 10⁶, a corner lies within
    diag ÷ 2 + √2 · 1.25 · L < 7.6 × 10⁶ of the centre. C-0261's "+ diag" is margin. T11 (`INSET_FRAME_CM` 8 × 10⁶)
    passes 2²³ and is killed.
26. **Observation: the oracle still carries more than one rounding at very sharp vertices.** The seat measured
    against an exact closed form (half-plane intersection in doubles). On thin triangles, the new oracle's vertices lie
    up to 28.6 cm from the exact boundary (seed −8404; for example (−59223, −61396), (−64556, −59284),
    (−60939, −60759) at d = −851 gives 7.8 cm). There are two causes. Outward, a large spike leaves k small. Inward,
    the strips' residual tilt (about 0.7 ÷ S cm) is multiplied by 1 ÷ sin(θ ÷ 2) at the tip. The ratios on those
    cases stay ≤ 0.50, and ours stays ≤ 0.703 cm from exact on every case. C-0261's sentence "the oracle carries the
    one rounding ours carries" holds at moderate angles. *Suggested handling:* reword the sentence, or build the strip
    edges from exact line coefficients. M4.
27. **Observation for the session: oracle refusals shift a little.** On the seat's seeds, polygon-clipping's own
    refusals went from 1 1 2 1 0 (pre-fix) to 0 2 1 0 0 (post-fix). That is within C-0150's allowance of 10 per 10⁴.
    C-0261's "oracle refusals unchanged" holds on its own seeds only. Separately, the brief places ruling J226 in
    `checks/M0-spec-notes.md`, but that file has no J226 entry. Only C-0261 names it.

The row below is from lane `check/M0-a-08-close-s3`, 2026-10-09: the closing check of session fix round S3 (N-53 (5),
J242, `bridgeGaps`' re-read, C-0293). Mutant ids M1 – M7 are defined in `checks/M0-a-08-s3.md`.

28. **KI: M7 survives, because the bridge's splice into the walk is not pinned.** Mutant M7 drops `out.push(id + 1)`
    in `bridgeGaps`, so the bridge is inserted but left out of `walk.steps`. It passes `growth.test.ts`, the whole
    kernel folder `test/arr/booleans-buffers/`, `pins.test.ts` and `register.test.ts` at 1 000 (seed 9311, 154/154).
    The reason, PLAUSIBLE by reading: without the splice, `orientSegments` still gives the bridge segment its +1 from
    → to. `glueWalks` then adds a second shortest path from → to over the gap the walk now shows, and `balanceFlow`
    returns the surplus along a shortest path back. When the shortest path is unique, the two extra paths cancel, so
    the winding is unchanged. They can differ only where two shortest paths tie and enclose area. C-0196 (1)'s
    sentence "spliced into the walk, so the ring stays one closed walk of inserted edges" therefore has no test of its
    own. This predates round S3 and is not N-53's promise. *Suggested handling:* a pin that inspects `walk.steps` (or
    the per-pair `net`) after a bridged ring, or a case whose bridge path has a tied twin. Hardening, M4.

## Consolidation round C1 — the builder (lane `build/M0-a-08-consolidate-1`, 2026-10-12): changes, equivalence, map, mutants, N-c1-1 – N-c1-6

The kernel plan's R8 (`docs/build/consolidation/kernel-plan.md` §1.7 B-1 – B-5, §2's lines for `src/arr/`, §3.4),
J260, J263 Q1, Q5, Q6, Q8, J270 (b), J276 (4) (N-c2-4 of `checks/M0-a-01-notes.md`). No behaviour change; ids M01 – M37
are this section's mutants. Choices row C-0331; CLEAN-ROOM row L-0458.

**Changes and their equivalence.**

* **B-1.** `winding.ts` `distinct` and `offsetFace.ts` `distinct` deleted; both import `distinctRing` from
  `geom/common.ts` by path. The three bodies are identical token for token (diff of the bodies: empty). `arr/index.ts`'s
  exports unchanged.
* **B-2.** `winding.ts` exports `simpleLoops` and `dropStraight` (file-level; `arr/index.ts` names its exports, so the
  barrel is unchanged). `tileRings.ts` is M0-a-09's owns (M0-work.json), not this item's, so its import of the two is
  R9's (M0-a-09 c1) under J270 (b): two exact copies coexist until then (bodies diffed against winding.ts's: empty).
  The keep predicate (C-0206 (1)) is untouched.
* **B-3 and N-c2-4.** `buffer.ts`'s private `SCALE`/`div` (six call sites: `maxArcStep`, `arcSteps`, `clipToLattice`,
  the miter, the two cut legs) and `insetRing.ts`'s inline `ratio(sp · SCALE, (sp − sq) · SCALE, 'length')` in `clip`
  now call `num/exact.ts`'s `divScaled(num, den, 'length')`. **The same function:** `divScaled` computes
  `ratio(num · 2²⁰, den · 2²⁰, kind)` and returns the value or null; both replaced forms computed the same two products
  with the same constant (1 048 576) under the same kind, and insetRing's `t.ok ? t.value : 0` is `divScaled(…) ?? 0`
  (the value is a number whenever it is not null). Pinned by `buffer.test.ts` "the scaled quotient …": `Object.is`
  equality with the written-out quotient on 29 × 29 boundary pairs (±0, ±½, ±1.5, the floor 2⁻²⁰ and just below it,
  5e-324, 2⁵³, ±1e300, ±MAX_VALUE, ±∞, NaN), on the quotients the folder's constructions take, and on 2 000 fast-check
  doubles. `kerb.ts`'s exported `div` is R9's.
* **B-4. The tie rule found** (`winding.ts` shortestPath before this round, lines 376 – 434 of the pre-round file): the
  heap ordered `[distance, y, x, vertex]` by distance, then y, then x — the vertex slot was carried but never compared,
  and a vertex's distance and parent are replaced only on a strictly shorter path (`nd < old`). So ties are broken by
  the lattice point (the kernel's (y, x) order), not by slot: **no J263 Q5 report**. Adopted `geom/heap.ts`
  `BinaryHeap` (ties by the smaller item) with the item a vertex's rank in (y, x) order over u and every live
  half-edge's origin; with distinct keys the pop sequence of any correct min-heap is the same, so the paths are the
  same. The rank's last key `a − b` (and the old heap's push order) would decide only between two live vertices at one
  lattice point, which an arrangement does not hold (§3.10's hard row `one-vertex-per-point`). Evidence: a direct
  differential (both bodies in one instrumented file) over 380 overlays — tie-heavy grids of equal squares, diamonds,
  random stars — and 237 765 vertex pairs: 0 mismatches; pins `booleans.test.ts` "two equal paths round a square …"
  and "on a grid of equal squares …" (`shortestPath` exported from `winding.ts` for them; not from the index).
* **B-5.** Both `isConvexRing`s kept; `insetRing.ts`'s comment states the difference from `geom/lir.ts`'s private one.
  The plan's "K35t stays red, pinned by offset-inset.test.ts:161,168" was not so: K35t survived the first closing check
  (note 13). Note 13's suggested pin is added ("a dent of 1 cm is a right turn: E_NON_CONVEX …"), so K35t (M17) is red.
* **Comments.** `winding.ts`'s re-read comment (the arena's re-read rule, C-0286; C-0293) and its orientSegments
  defence comment; test comments without round narration:
  `growth.test.ts`, `booleans.test.ts`, testkit `support.ts`, `pins.test.ts`, `register.test.ts` (rows cited instead
  of "fix round S1/S2", "this round", "the PR run"). Pinned message texts unchanged (J263 Q6).
* **NO-SHIFT.** A seeded probe (booleans × 4 operations × 2 fill rules, overlays with their `net`, `faceOf` and
  winding labels, buffer and bufferParts over every join and end, faceEdges, offsetFace per-edge and uniform,
  insetRing at 0, ±d and small d, tileRings, ringEdgeParts, the arc steps, the `@plat/kernel` barrel's runtime names):
  41 414 lines before (pre-round mirror) and after (tree) byte-identical, sha256 0bc17ccc…; in the tiny-tables mode
  13 814 lines identical (cc178c8b…). Refusals of the registered families, seed 8611 × 1 000 (the agreement trio,
  `register`, `pins`): `PLAT_FUZZ_COUNTS` byte-identical — buffer 10 and offsetFace 6 insertChain `E_INVARIANT`, 0 own,
  booleans and insetRing 0 — and `PLAT_REFUSALS_OUT`'s 93 lines identical as a set (file order differs), verdict lines
  identical (96/96 both).

**Old file → new file map (J263 Q8).** None: no test file moved, merged or renamed (§3.4); every describe/it title
kept. Added: `booleans.test.ts` — describes "the overlay's shortest path breaks ties by lattice point, never by slot
(§3.3)" (2 cases) and "the kept boundary's trace helpers (simpleLoops, dropStraight; C-0206 (1))" (2 cases), and the
case "a ring given with repeated points … no warning"; `buffer.test.ts` — describe "the scaled quotient: buffer and
insetRing divide through num/exact.ts divScaled (§3.2 (8), C-0044)" (2 cases); `offset-inset.test.ts` — the case "a
dent of 1 cm is a right turn: E_NON_CONVEX …". Every added case but the four that read the new file-level exports is
green on the pre-round sources too.

**Mutants (37, in the mirror; the kernel folder and testkit guard/harness/pins/register with --bail=1, then the three
agreement files at 300).**

| id | mutation | result |
|---|---|---|
| M01 | winding.ts reads the ring without `distinctRing` | red after the repeated-points pin (survived before it) |
| M02 | offsetFace.ts reads the face rings without `distinctRing` | survives: equivalent, N-c1-3 |
| M03 | `distinctRing` keeps the closing repeat (geom/common.ts) | red (the repeated-points pin) |
| M04 | dropStraight `> 0` → `>= 0` | survives: equivalent, N-c1-3 |
| M05 | dropStraight ignores `keep` (K06's class) | red: "a hole touching its outline …" |
| M06 | simpleLoops never cuts | red: "a hole touching its outline …" |
| M07 | simpleLoops drops the last loop | red: "union, intersection, difference and xor …" |
| M08 | sagitta quotient doubled (K18's class) | red: "a round end is a fan of chords …" |
| M09 | insetRing clip's numerator sq | red: "inward by d: the half-plane inset …" |
| M10 | divScaled unscaled (floor 1, not 2⁻²⁰) | red: offsetFace sawtooth case, the divScaled pin |
| M11 | buffer clip's denominator + 1e-9 | survives: equivalent, N-c1-3 |
| M12 | shortestPath ties by slot | red: the square tie pin |
| M13 | ties reversed (upper-right first) | red: the square tie pin |
| M14 | a later equal path wins (`<=`) | red: the square tie pin |
| M15 | ties x before y | red: the square tie pin |
| M16 | K35 (`<= 0`) | red: "a convex face with a straight-through vertex …" |
| M17 | K35t (`< -2000`) | red: "a dent of 1 cm …" |
| M18 – M32 | earlier K01, K02, K03, K04, K07, K09, K11, K12, K13, K20, K22, K25, K33, K36, K37 | all red |
| M33 | s3's M1 (columns captured at bridgeGaps' entry) | red: growth.test.ts |
| M34 – M37 | K14, K15, K31, K16 | survive, as recorded (notes 2, 3, 14): equivalent on every drawn domain |

H04 is a harness mutant of testkit `support.ts`, whose code this round did not change; not re-run.

**N-c1-1 (for R9).** `tileRings.ts` keeps its private `simpleLoops` and `dropStraight` (bodies identical to winding.ts's
exports); M0-a-09 c1 imports them (J270 (b)). `arr/index.ts` is M0-a-09's at flow-7 (handed over, C-0123; `landed`
refuses it here), so §2's rewrite of its header — dropping "The scaffold created this index empty (M0-s-01, C-0013)" —
is R9's too; this round leaves the file byte-identical.

**N-c1-2.** B-4 needed no Q5 report: shortestPath's ties read lattice points (above). `glueWalks`' and `balanceFlow`'s
callers of shortestPath were reached by no case of the probe (as notes 2 and 14 found); the direct differential is the
evidence for the heap.

**N-c1-3. Equivalent survivors.** M02: consecutive vertices of a face walk are an edge's two ends, distinct points, and
`faceRings` repeats no closing vertex, so `canonicalFaceRings`' `distinctRing` removes nothing on an arena (PLAUSIBLE;
kept as the read the ring convention states). M04: `>= 0` differs from `> 0` only at a zero-length step, which a loop of
`simpleLoops` (distinct consecutive vertices) never holds. M11: `clipToLattice` changes a part only beyond
±(2²³ − 1), which no folder case reaches.

**N-c1-4. The plan's oracle lines that did not hold as written.** "Mutants K14 – K16, K31, H04 red" (§1.7 B-2): these
were survivors classed equivalent or minor by the first check (its table, notes 2 – 4) and remain so; "K35/K35t stay
red, pinned by offset-inset.test.ts:161,168" (B-5): K35t survived until this round's dent pin.

**N-c1-5. Refusal verdicts (N-58).** The registered families' refusals are unchanged (above): 10 buffer and 6
offsetFace `E_INVARIANT` at seed 8611 × 1 000, every one insertChain's router refusing a part of our own construction
(OUR OWN INTERMEDIATE geometry from lawful input) — verdict MAKE-IT-SUCCEED, the router's (the refusal census, queue
row L23), not this round's (no behaviour change). The probe met one more of the same class: offsetFace of the face
`R([2754,725],[580,3886],[-631,3083],[-1154,2846],[-1178,2409],[-2045,2444],[984,-3484],[576,-1764],[1690,-1245])`
(built through `insertChain` as in `support.ts arenaFace`) with distances `[458,873,277,0,389,0,84,497,33]` in
`faceEdges` order: "insert: no route from (500, -2634) to (614, -2636) keeps clearance (§3.10) within the fidelity
bound (N-43)", identical before and after. `E_NON_CONVEX` (insetRing on a non-convex face) is REFUSE with the
alternative §3.7 names (`offsetFace` inward, `buffer` ∪ face outward); `E_DEGENERATE` `empty` / `collapsed` are §3.11's
results, not refusals of lawful input.

**N-c1-6. Process.** One read-only `git diff --stat` ran by mistake inside a compound command (its output discarded,
nothing changed); no other git command was run.

## Consolidation round C1 — the closing checker (lane `check/M0-a-08-consolidate-close-1`, 2026-10-12): N-c1c-1 – N-c1c-6

Verdict PASS in `checks/M0-a-08-c1.md`, which defines the mutant ids C01 – C34 used below. None of these rows fails the
round (J162, J180); each is for the milestone named.

**N-c1c-1. The trace helpers' comments name a reader that does not import them yet.** `winding.ts`' `dropStraight` and
`simpleLoops` say "Exported for the seed clip's trace (`tileRings`)", but `tileRings.ts` (M0-a-09's file) still holds
its own two copies, identical to the exports (bodies diffed; only a parameter name differs). The rule each states is
true of both copies. *Suggested handling:* R9 (M0-a-09 c1) imports the two from `winding.ts` and deletes its copies, as
J270 (b) and N-c1-1 plan; if R9 does not, it rewrites the two sentences. Milestone: R9, before M4.

**N-c1c-2. `shortestPath` is reached by no end-to-end case of the item.** On a mirror whose `shortestPath` breaks ties
the other way (upper-right first), the checker's 12 790-line output probe (booleans, overlays and labels, tileRings,
buffers, offsets, insets) and the item's tests other than the two new tie pins are unchanged. Its tie rule is held by
those pins ("two equal paths round a square …", "on a grid of equal squares …") and by the old-vs-new differential
(47 797 vertex pairs, 0 mismatches; 12 575 under the reversed ties). This is notes 2 and 14 seen from the heap's side:
`glueWalks`, `balanceFlow` and `orientSegments`' defence, its three callers, are not reached on the drawn domains.
*Suggested handling:* the M4 case that reaches `glueWalks`/`balanceFlow` (note 2) should assert a path whose tie the
rule decides. Also for M4: `shortestPath` now sorts every live vertex by (y, x) on each call (O(V log V) beside the
O(H) adjacency scan it already did per call); if a profile ever shows the defences hot, the ranks can be taken once
per overlay. Not a behaviour change.

**N-c1c-3. Two pre-existing fallbacks of the replaced quotients have no test (C11, C13 survive).** C11 takes
`clipToLattice`'s crossing from the other end (`divScaled(fq, fp − fq)`); C13 makes `insetRing` `clip`'s null fallback
0.5 instead of 0. Both survive the kernel folder, guard, harness, pins, register, the agreement trio at 300 and
`test/arr/bands`. The round's own promise is not at stake — the quotient is the same function as before (token identity,
the pin, and the checker's 1 000 441-pair differential with 0 mismatches) — but neither branch is pinned: no folder
case crosses the lattice box (±(2²³ − 1)), and the clip's denominator is never below 2⁻²⁰. *Suggested handling:* a pin
with an `offsetFace` part crossing the lattice box (a face within a few metres of the edge), and a unit case of `clip`
with `sp = 0`, `sq` just below 0. Milestone M4.

**N-c1c-4. Equivalent survivors.** C03 (`offsetFace`'s face rings read without `distinctRing`): an arena face walk
repeats no point (consecutive vertices are an edge's two distinct ends; `faceRings` repeats no closing vertex), so the
call removes nothing (PLAUSIBLE, as N-c1-3 says for M02). C06 (`dropStraight` one pass only): a single pass already
reaches the fixpoint — a vertex is judged against the last kept vertex and its original successor, and dropping a
straight-through vertex keeps the direction of the line through it; a brute-force comparison of one pass against the
loop over 197 897 small lattice loops with random `keep` sets found 0 differences (CONFIRMED on that domain). No test
needed.

**N-c1c-5. Provenance phrases left in testkit `support.ts`.** The `REFUSAL_MEASURE` comment still says "measured by fix
round S1" and "(the S5 closing check's first twelve)"; `pins.test.ts`' header says "before M0-a-05's wedge cap". They
match the code (they describe where a measured constant and a pinned input came from), so they are no blocker, but §2's
rule puts round ids in `checks/*.md`. *Suggested handling:* at the file's next touch, cite C-0231 and N-46 (4) for the
measure and move the round names and seed provenance to this notes file. Milestone M4 (or the next consolidation pass).

**N-c1c-6. Refusal verdicts (N-58) of what the checker met, routed to the session.** At seed 8611 × 1 000 (agreement
trio, `register`, `pins`) the registered families refused 93 cases, the same set before and after the round
(`PLAT_REFUSALS_OUT` sorted sha256 `02f75da8…`): in the fuzz families buffer 10 and offsetFace 6, the rest the
register's own cases; every one `insertChain`'s `E_INVARIANT` "insert: no route from (…) to (…) keeps clearance
(§3.10) within the fidelity bound (N-43)" on a part of our own construction (a buffer strip or join, an offsetFace part)
from lawful input — OUR OWN INTERMEDIATE geometry, verdict MAKE-IT-SUCCEED, owner the router (M0-a-05; the refusal
census, queue row L23), not this round (no behaviour change; the count did not rise). Replay:
`PLAT_FUZZ_SEED=8611 PLAT_FUZZ_RUNS=1000 PLAT_REFUSALS_OUT=<file>` over the agreement trio. The checker's own probe met
only §3.11's results (`E_DEGENERATE` `empty`/`collapsed`), insetRing's `E_NON_CONVEX` on non-convex faces (REFUSE, the
alternative §3.7 names: `offsetFace` inward) and offsetFace's RangeError on a negative distance (a caller error by its
contract), the same before and after.

## Hardening round S4 — the builder (lane `build/M0-a-08-fix-s4`, 2026-10-14): row-by-row outcome

The M0 hardening phase's round for this item (J237 (2), J264, J290): the refusal census's R-16 (KI-7) and the hardening
inventory's FIX-NOW rows. Choices row C-0376; CLEAN-ROOM row L-0562. Mutant ids X01 – X17 are this section's; each was
run in the lane's mirror against both item folders (`--bail=1`, `PLAT_FUZZ_RUNS=300`, `PLAT_FUZZ_SEED=9411`) after a
green base run of the same set (12 files, 211/211), the mutated file restored from the tree and compared (`cmp`) after
each. The seat was relaunched once mid-round (CONTINUE RULE): the first launch's source edits and pins were read and
kept, its mirror deleted and rebuilt, and every mutant run afresh.

| row | outcome | evidence (pin; mutant) |
|---|---|---|
| R-16 / KI-7 | **fixed** (MAKE-IT-SUCCEED, our own intermediate): `insetRing.ts`' bisection returns a refused trial's own result (`if (!m.ok) return m;`), code and detail unchanged, no `lastCm`; the reading (C-0376 (1)): §3.7 names emptiness only as the collapse past the inradius, so propagation, not a retry | `inset-bisection.test.ts`: `overlayRegion` planted through `vi.mock` of `winding.js` to refuse rings under 2 m tall; a 20 m × 10 m face inset by 6 m refuses at its 4.5 m trial and returns that refusal (read as empty, the bisection would report `lastCm` 400); unplanted it collapses with `lastCm` in (450, 500); X01 (the empty reading restored) red |
| 2 (with 14, N-c1c-2) | **pinned** at each stage's own door (C-0376 (3)): `orientSegments`, `glueWalks`, `balanceFlow` exported from `winding.ts` (file-level only) and called on inputs built for them; `overlay.net` before balancing read through `orientSegments` | `booleans.test.ts` "the overlay's stages on inputs built to reach them": a segment whose row carries a spur nets 0 on the spur (X02 = K16 red); a two-step walk's gaps glued along the square, the diagonal gap by the lattice-order tie (X03 = K14 red); a source and a sink joined back through the tie-decided path (X04 = K15 red). No drawn end-to-end input reaches `glueWalks`/`balanceFlow` still; not turned into asserted invariants (a behaviour change no design text asks for) |
| 4 (H04) | **pinned** | `harness.test.ts` "the snap-rounded re-judge excuses the face count alone, never an area …": a planted oracle whose snap-rounded neck (2.6 cm → 3 cm corners) fails `faces, area` against a planted 8 cm² bound: a failure, though the touch-merged counts agree; X07 (re-judge passes whenever `faces` is among the failures) red |
| 5 (H06) | **pinned**; `judgeInset` takes the operation judged as an optional third argument (default `insetRing`) | `harness.test.ts` "an E_OUT_OF_RANGE on a face whose exact outward inset stays inside the lattice is a failure …" (an octagon at d −100; the lattice-edge face of `pins.test.ts` at −634 is settled); X08 (every outward `E_OUT_OF_RANGE` settled) red |
| 6 (H07) | **pinned** | `harness.test.ts` "a non-convex face is settled only on E_NON_CONVEX …" (a planted ring and a planted `collapsed` on the L-face: two failures; our real answer settled); X09 (settled whatever our answer) red |
| 7 (H08) | **pinned** | `harness.test.ts` "oracleOffset's covered face …": a 10 m square's bottom edge set back 7 m (past half the farthest vertex distance, short of it) leaves the 3 m strip on both engines; 10 m covers it; X10 (shortcut at half the farthest distance) red |
| 9 | **fixed**: `traceKept` returns `KernelResult<Ring[]>`, `E_INVARIANT` with `UNCLOSED_BOUNDARY` (the old throw's text, verbatim) on a walk that does not close; `overlayRegion` passes it on with the overlay's warnings | `booleans.test.ts` "traceKept: a kept boundary that does not close is E_INVARIANT, never a throw (§3.11)" (labels no valid overlay gives, planted); X06 (the throw restored) red |
| 17 (Q07) | **pinned** | `harness.test.ts` "binds each family to its own measured cap …": every `REFUSAL_MEASURE` operation at its cap (the guard alone) and at cap + 1 (the cap's message naming the operation); X11 (buffer's cap for every family) red |
| 22 (T03) | **pinned** | `harness.test.ts` "builds in the frame 2ᵏ for the largest k that fits, also where k is 1 – 3": two thin triangles inset outward whose k is 1, ratio < 0.3 on both engines (≈ 0.7 unscaled); X12 (S = 16 or 1) red |
| 23 (T07) | **pinned** | `harness.test.ts` "drops a ring the final rounding leaves without area …": a triangle of inradius 275.11 cm at d 275 gives no ring on either engine, at 274 one; X13 (no dedupe, no zero-area drop) red |
| 26 | **comment and choices row** (no pin: text only) | `oracleInset`'s comment in testkit `support.ts` now says the one-rounding claim holds at moderate angles and states the sharp-tip error (≈ 0.7 ÷ S × 1 ÷ sin(θ ÷ 2); a small k outward; 28.6 cm measured, ratios ≤ 0.50); C-0376 refines C-0261's sentence |
| 28 (M7) | **pinned**; `bridgeGaps` exported from `winding.ts` (file-level) | `booleans.test.ts` "bridgeGaps splices each bridge into the walk …": a ring whose two runs of 10 cm segments collapse gets its two bridges (the 19th and 20th segments) spliced where the gaps were (`walk.steps` `[1, 19, 12, 13, 20, 18]`), and `glueWalks` then adds nothing; X05 (= M7, no splice) red |
| N-c1c-3 (C11, C13) | **pinned**; `insetRing.ts` `clip` exported from its file | `offset-inset.test.ts` "a face a few metres from the lattice's edge …" (two faces whose rightmost vertex stands 1.5 – 2 m inside x = 2²³ − 1: each part clipped onto the edge and its translate's elsewhere; the setback equal to the translate's): X14 (= C11) red; "the half-plane clip: an edge whose ends differ by less than divScaled's floor crosses at its first point": X15 (= C13) red |
| N-c1c-5 | **comment** (no pin: text only) | `REFUSAL_MEASURE`'s comment cites C-0231 and N-46 (4), (5) for the seeds and per-seed counts (they are C-0231's (4)); the round names it carried move here: the measure was fix round S1's, its twelve seeds the S5 closing check's first twelve (offsetFace's 6101 replaced by −6421 and 6521 after polygon-clipping's hang). `pins.test.ts`' header names §3.6 step 4's wedge cap instead of "M0-a-05's wedge cap" |
| N1 (M0-k-03) | **pinned** for this item; **reported** for M0-a-09 | `judge` already applies `ownProblems` on every case, unattracted included; `harness.test.ts` "ours is held to the hard ring checks on an unattracted case too …": ours `[sq, sq, tri]` passes `compareSplit` against the union yet lands in `h.invalid` ("crossing edges") and fails the verdict; X16 (the check on attracted cases only) red. M0-a-09's harness is M0-a-09's file (rule (1)): reported for its round |
| (inventory M0-a-08:6, K30) | **pinned** (not among the round's lines; the inventory's FIX-NOW row, inside the owns) | `buffer.test.ts`: a half-width list longer than the points is a RangeError; X17 (= K30) red |

**Refusals (J264, N-58).** Registered families at seed 8611 × 1 000 (agreement trio, `register`, `pins`;
`PLAT_FUZZ_COUNTS`, `PLAT_REFUSALS_OUT`), before (the pre-round sources) and after: identical — union, intersection,
difference, xor and insetRing 0; buffer 10 and offsetFace 6, every one insertChain's `E_INVARIANT` "no route … keeps
clearance (§3.10) within the fidelity bound (N-43)", own 0, setup 0; the 93 refused lines the same set (sorted sha256
`d2105964…`). M0-k-04's B-FUZZ families (`runFuzz`, a scratch probe in the mirror, before and after): identical —
insetRing 10⁴ ok 3 331, skipped 1 456, `E_DEGENERATE` 789, `E_NON_CONVEX` 4 424; offsetFace 2 000 ok 613, skipped 306,
`E_DEGENERATE` 1 074, `E_INVARIANT` 7; buffer 2 000 ok 1 635, `E_DEGENERATE` 364, `E_INVARIANT` 1; booleans 2 000 ok
1 417, `E_DEGENERATE` 583; 0 crashes, hangs, invalid outputs and bugs. Classes: the `E_INVARIANT`s are OUR OWN
INTERMEDIATE (an insertChain refusal on a part of our construction from lawful input), MAKE-IT-SUCCEED, owner the router
(M0-a-05, census KI-1 / L23), unchanged by this round; `E_DEGENERATE` `empty` / `collapsed` are §3.11's lawful results,
not refusals of lawful input; `E_NON_CONVEX` is §3.7's REFUSE with its alternative named (`offsetFace` inward, a buffer
union outward). R-16's class met 0 before and after (as the census says), so the count did not move.

**Gates (on the tree, W = 1).** `install --frozen-lockfile` 0; `lint` 0 (eslint 1 141 files, 0 errors, 0 warnings;
"lint: probe-red ok"); `build` 0 (`tsc -b ok`); the two test tsconfigs typecheck 0 (`tsc --noEmit -p
packages/{kernel,testkit}/test/tsconfig.json`); NEAR at the PR size (`PLAT_FUZZ_RUNS` unset) over both item folders: 12
files, 211/211, exit 0 (4 038 s); RELATED at 1 000 over `arr/winding.ts` and `arr/insetRing.ts`: 334 files, 4 114/4 114,
exit 0 (6 881 s). No git run; the mirror deleted.

## Hardening round S4 — the closing checker (lane `check/M0-a-08-close-s4`, 2026-10-18): N-s4c-1 – N-s4c-5

The verdict is PASS, in `checks/M0-a-08-s4.md`, which defines the mutant ids Z01 – Z28 used below. None of these rows
fails the round (J162, N-45, J202). Each row names its milestone.

**N-s4c-1. `traceKept`'s second guard is not pinned (Z04 survives).**

* *What survives.* The row-9 pin plants labels whose boundary walk turns round one vertex for ever, so it reaches
  only the rotation guard (`winding.ts:666`). Mutant Z04 puts the old throw back at the outer guard (`:669`), and it
  passes the pin.
* *Why it is not a blocker.* The code returns `E_INVARIANT` at both guards (CONFIRMED by reading). The guard is
  reachable only by a direct call to `traceKept` (a file-level export) with labels no valid overlay gives. Such labels
  make a boundary map whose walk enters a cycle that does not hold its first half-edge, while every step's next
  half-edge is already a boundary one. `overlayRegion`, the only caller, reaches `traceKept` only with consistent
  labels, so every walk closes (PLAUSIBLE, by reading).
* *Suggested handling.* Add a second planted case to the pin: two kept half-edges entering one vertex, so the walk
  from the first runs round a cycle that leaves it out, and assert `E_INVARIANT` and no throw.
* *Milestone.* M4.

**N-s4c-2. `overlayRegion`'s pass-on of a traced refusal has no pin (Z05 survives; equivalent).**

* *What survives.* C-0376 (2) says `overlayRegion` "passes it on with the overlay's warnings". Mutant Z05 reads the
  refusal as `ok([])` instead. It passes `booleans.test.ts` and `inset-bisection.test.ts` (whole files).
* *Why it is equivalent.* `traceKept` is reached there only after `labels.consistent`, so it never refuses on that
  path (by N-s4c-1's argument). The code passes the refusal on (CONFIRMED by reading).
* *Suggested handling.* None needed. If the hardening pass wants the line held, a `vi.mock` of `windingLabels` that
  returns consistent-flagged planted labels would reach it.
* *Milestone.* M4, optional.

**N-s4c-3. `oracleInset`'s dedupe after the final rounding is not pinned on its own (Z23 survives; equivalent on the
verdict).**

* *What survives.* Row 23's sliver pin kills the zero-area and length filter (Z22). Mutant Z23 drops only the
  `dedupe` and keeps the filter, and it survives.
* *Why it is equivalent.* The filter alone drops every ring the rounding collapses: one or two distinct points, or
  three with a repeat, have zero area. What the dedupe still removes is a repeated vertex in a ring with area, which
  changes neither |Δ| nor the face count (PLAUSIBLE). It is oracle-side test code, so any difference would be a false
  red, which fails safe.
* *Suggested handling.* None, or a unit case with a ring whose rounding repeats one vertex of a non-degenerate
  triangle.
* *Milestone.* M4, optional.

**N-s4c-4. Refusal verdicts (N-58) of what the checker met, routed to the session.** None of these rose.

* *The registered families at seed 8611 × 1 000* (the agreement trio, `register`, `pins`). They refused 93 cases,
  the same set on the after-mirror and on the reconstructed before-mirror (sorted SHA-256 `02f75da8…`, equal to the
  C1 check's).
  * In the fuzz families: buffer 10 and offsetFace 6. The rest are the register's own cases.
  * Every one is `insertChain`'s `E_INVARIANT` "insert: no route from (…) to (…) keeps clearance (§3.10) within the
    fidelity bound (N-43)", on a part of our own construction from lawful input.
  * Class OUR OWN INTERMEDIATE, verdict MAKE-IT-SUCCEED. The owner is the router (M0-a-05; census KI-1 / L23), not
    this item.
  * Replay: `PLAT_FUZZ_SEED=8611 PLAT_FUZZ_RUNS=1000 PLAT_REFUSALS_OUT=<file>` over the agreement trio.
* *M0-k-04's B-FUZZ families*, the same before and after.
  * offsetFace has 7 `E_INVARIANT` in 2 000 and buffer 1 in 2 000. These are the same class, verdict and owner as
    above.
  * `E_DEGENERATE` `empty` / `collapsed` are §3.11's lawful results.
  * `E_NON_CONVEX` on insetRing's non-convex faces is §3.7's REFUSE, with its alternative named (`offsetFace`
    inward, a `buffer` union outward).
* *R-16's class* was met 0 times, before and after.

**N-s4c-5. Process.**

* *The lost first launch.* This lane's first launch (2026-10-14) lost its mirror and its mutant scripts Z01 – Z21 to
  a container relaunch. The seat continued on 2026-10-18 under the CONTINUE RULE and re-ran every part, with a new
  mutant set Z01 – Z28.
* *The before-image.* Without git or a pre-round copy, the seat rebuilt the pre-round behaviour from the round's own
  diff, as stated in C-0376 and confirmed by reading: the empty reading (Z01) and the two throws (Z03 + Z04) put
  back. Every other change in the round is an export, a comment or a test.
* *The builder's SHA.* The builder's notes give the 93 refused lines' sorted SHA-256 as `d2105964…`, while this
  seat's sort gives `02f75da8…` on both sides. The set identity this seat relies on is its own before/after
  comparison, line for line. The difference is in how the digest was taken, not in the set.
* *RELATED's reds.* RELATED at 1 000 had none (334 files, 4 114 / 4 114, exit 0). Neither of the session note's foreign reds appeared in this run.
