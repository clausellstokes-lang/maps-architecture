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
