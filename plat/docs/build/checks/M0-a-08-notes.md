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
