# M0-c-05 — the checker's minor notes (lane `check/M0-c-05`, 2026-10-07)

These notes are for the hardening milestone M4 unless a note names an earlier one. None of them fails the item (J180,
N-45). The blockers are in `M0-c-05.md`, and the mutant and probe names refer to that file.

1. **N-1 M17 is equivalent.** Without the hit's own angle test (`legality.ts:470`), `armsSquare` still rejects the
   step, because it checks the met segment too (it lies within 52 cm of the meeting). No test needed. If `armsSquare`
   ever skips the met feature, restore the explicit test.
2. **N-2 Nothing pins the 30° rule at a meeting on a vertex (M16).** With `armsSquare` always true, every item test
   passes, including the four bar chunks. The checker's probe (`zz-probe16/arms.test.ts`: a step meeting a `primary`
   at a vertex whose other segment runs back at 20°) is accepted as a T with a 20° arm gap. Add a unit test of this
   shape to `legality.test.ts`.
3. **N-3 C-0254 (6)'s Y → T bend on a hit has no pinning test (M18).** `legality.test.ts`, which the row names, never
   puts the hit point off the perpendicular foot, and the junction row holds without the bend on the bar seeds. Add a
   case where the step meets a way obliquely within the curvature limit and must end at the foot.
4. **N-4 The first curvature's concern is pinned by no test (M27).** Drawing it from `growth.heading` instead of
   `growth.curvature` passes all 103 tests. The checker confirmed the concern by reading. Pin it, for example: the
   first proposal's κ equals s × the first normal of `growth.curvature` under S5 for the town key.
5. **N-5 The prune's dangling guard is reached only by rare input (M32).** On 40 fixture seeds, no short secondary is
   met by another way. Add a hand case in which a short secondary carries another street's T and must survive the
   prune.
6. **N-6 The walled top-up is staged without a marker.** C-0254 (11) stages the walled arc's re-trace to M1, and the
   record reports `topUp: 'skipped_walled'` with `why: 'walled'`. Neither says `notBuilt('M1')`. Name the milestone in
   the rung so a reader of the report sees the staging.
7. **N-7 The here-bar's size and its median reading.** The tests run 24 seeds in six-seed chunks (C-0254 (13)). The
   checker's 1 000-seed run holds every per-seed clause. Pooled over the 1 000 seeds, the median is 93.9°. Two of the
   167 six-seed chunks pool a median above 95° (seeds 241–246: 95.12°; 841–846: 95.52°), and per-seed medians run
   90.3–99.6°, so the chunked median clause is fragile. M0-c-06's 1 000-seed reading pools them.
8. **N-8 Header wording.** `proposals.ts:11` says the seeds' proposals run perpendicular "± the branch jitter", but
   the code and C-0254 (3) use no jitter.
9. **N-9 The slope rule is neither built nor declared.** §4.4 *Legality* includes "Slope ≤ the class's grade limit
   (… `rampMaxGrade`)". `legal` has no slope term. On M0's flat fixture it cannot be observed. Declare it for M1's
   relief runs.
10. **N-10 For the session (not this item's file).** `regimes.json` gives `dense_core.blockDepthFloorM` = [30, 45],
    while §4.4's regime table gives the dense core a floor of 37–45 m (to be re-fitted at M-1). The clearance
    (max(30 m, 80 m)) does not depend on it, but the prune's block width (30 m) does.
11. **N-11 The stand-in demand reduces S5d's per-band comparison.** With C-0254 (10)'s stand-in, the shortfall
    Σ_b max(0, d_b − l_b) equals built × max(0, quota ÷ land − 1). The band split only matters for a caller's demand,
    which `capacity.test.ts` drives. This is declared. Re-check it when M1's S2 supplies the demand.

## Closing check `check/M0-c-05-close-r1` (2026-10-07): further notes

These notes are for M4 unless a note names an earlier milestone. None of them fails the item. The blockers B-1 and B-4
are in `M0-c-05.md`.

12. **N-12 `metricDoc`'s origin reading is not pinned on the fixture (R14).** If `support.ts` reads the arena's order
    instead, the four bar chunks still pass. On the fixture, both readings meet the row (1 000 seeds: origin p50 21.15°,
    arena p50 21.08°, 0 above 90° either way). `drift-grown.test.ts` pins the origin reading with its own copy of the
    reader. Share one reader between the two files, or pin `metricDoc` on a street whose arena run is reversed.
13. **N-13 The seeds' quarter-spacing keep-away is not pinned (R15).** With the keep-away removed, `city.test.ts` and
    `growth.test.ts` stay green. It only matters where two arterials' seeds come close (near a junction). Add a hand case
    with two arterials meeting at a shallow angle.
14. **N-14 The dead-end share has moved past its declared figure.** Over the checker's 1 000 seeds, 72.9 % of S5c's
    33 389 streets end `dead`. C-0254 (14) declares about 55 – 65 %, a number from before C-0258's square first step
    and deflection limit. The result fails safe. Update the row's figure when B-1's fix lands, or hand it to M0-c-07a's
    dead-end row.
15. **N-15 The acceptance tally is tied to the GrowthState object (contract for M0-x-04).** `acceptedStreets` and
    `growthRecord` are WeakMaps keyed on the state object. A runner that ran S5d on a different object than S5c (a copied
    model) would read 0 and reuse the stage's lineage keys without saying so. For example: refuse in `capacityStep` when
    `acceptedStreets(state, k)` is 0 but the stage has an S5c record with streets, or carry the tally in the record.
    M0-x-04 should register S5c and S5d on one shared state.
16. **N-16 The fixture's drift pool is thin.** The 1 000 seeds give 59 windows, so the fixture's median rests on few
    streets, and the row is carried by the hand pool (`drift-grown.test.ts`). In that pool the ribbon sits at 0.9 %
    above 90°, against a 1 % limit (C-0258 (5), declared). M0-c-06's integrated run should report the window count with
    the row.

## Closing check r2 (lane `check/M0-c-05-close-r2`, 2026-10-07)

17. **N-17 C-0260 (1)'s "every way segment holding the step's start" is not pinned (S05).** Replacing `every` with
    `some` in `acrossOf` passes the targeted tests. It also changes no fixture output (digest probe P2, 30 runs), because
    a seed rarely lies exactly on an arterial vertex or on two ways. Suggested test: a step that starts at a vertex where
    two segments of the arterial meet at an angle, with a street across one segment's line but not the other's. M4,
    unless B-1's rework of `acrossOf` replaces the per-segment reading.
18. **N-18 S10 and S20 are equivalent.** Dropping or skipping the `Math.abs(e) < 1` guard in `acrossOf` changes nothing.
    A step whose end lies within 1 cm of the line of a way it starts on is already rejected `angle` by the start's
    leaving test (`legality.ts:463–467`), because steps are ≥ 20 m long. No test is needed.
19. **N-19 S19 is equivalent.** In `growthStep`, counting only the grown streets that are still live changes nothing,
    because the prune has not run yet and every grown street is live. No test is needed.

## Closing check r3 (lane `check/M0-c-05-close-r3`, 2026-10-07)

20. **N-20 U05 is equivalent.** Without the `f.way === g.way` guard in `leavesAcross`, a segment f of the arterial
    itself is still never read as across. Each end of f is held by f itself (`footOn` distance 0). Against f, the other
    end lies on the line (side 0, not ≤ −1 cm), so `across` turns false at once. The probe P2 digest is unchanged on
    30 of 30 fixture runs. No test is needed. Keep the guard as documentation.
21. **N-21 U06 (the side margin `≤ −1 cm` → `≤ +1 cm`) survives NEAR (128 / 128). It changes 0 of 30 fixture runs.**
    It matters only when f leaves the arterial and ends within 1 cm of the line of the arterial segment h where it
    leaves, so f runs collinear with h (for example a way continuing the arterial past a junction). The clearance then
    also needs the step to lie within 30° of parallel to f. A first step is square to g, so h must turn 60 – 90° from g
    within about one clearance (83 m) of the seed. Rule (a) already gives g's own line the same 1 cm tolerance.
    The fixer's MB2 "equivalent" label is not quite right: the case is contrived, not impossible. Suggested test (M4):
    an arterial bending about 70° within 60 m of a seed, with another way continuing collinear from the bend. The step
    parallel to that way keeps the clearance.
22. **N-22 U09 (the "on the way" tolerance 1 cm → 10 m in `leavesAcross`) survives NEAR (128 / 128). It changes 0 of
    30 fixture runs.** It matters only when a way segment ends within 10 m of g's way without touching it and its other
    end lies across. A secondary never crosses a `primary` or a `through`. A branch's first step leaves a secondary,
    though, and a secondary can be crossed (organic, collinear within 6°). So a crossing segment near a branch seed is
    the reachable shape, and it is rare. Suggested test (M4): a street segment crossing the parent street with its start
    5 m off it on the step's side. That segment keeps the clearance.
23. **N-23 Later steps still read no far side, so about a third of the streets leaving arterials stop after one
    step (declared, fail safe; triage before M0-c-06's statistics).** C-0260 (1) and C-0262 (1) state the limit "a step
    leaving no way (a later step) keeps the clearance", and `legality.test.ts` pins it (*a step leaving no way (a later
    step) reads no far side*). The design's literal clearance clause also supports it. On the flat fixture, though, the
    far-side street half a spacing along (77 – 83 m off, so inside the 83 m clearance) rejects the second step of
    the street opposite. The checker's probe P1c (a hook in a diagnostic copy that logs every `legal` call's first
    attempt and its final verdict; plain and 900 ha, seeds 1 – 10) found 823 streets leaving arterials with a later
    step. For 314 of them the first attempt was rejected `parallel` against the far-side street. 39 of those were
    deflected and accepted. **275 were rejected, so the street dead-ended: 270 at its second step and 5 at its third.**
    No thin strip is left, because the arterial lies between the two, so the rejection is conservative. It is
    not a wrong committed result, and every here-bar holds (the checker's 1 000-seed re-run: 0 misses; 25.9 % of all S5c streets there are single-segment). But it is not rare, and M0-c-06's integrated statistics
    (block sizes, dead-end share) will see it. Suggested handling: extend the far-side reading to a later step of a
    street whose first segment left the arterial (read the side from that arterial within the clearance), or record a
    choices row accepting the stubs. That is the session's call, before M0-c-06 judges the integrated run, rather than
    M4.

## Closing check S1 (lane `check/M0-c-05-close-s1`, 2026-10-07)

24. **N-24 (KI, test gap) The whole-life part of C-0263 (1), beyond the second step, is not pinned. V02 survives.** V02
    applies the skip only while `c.steps <= 1`. It passes `legality.test.ts` + `growth.test.ts` 58 / 58 and NEAR
    136 / 136. It changes S5's output on 15 of 30 fixture runs (P2), and probe Q1 under it finds 39 + 39 arterial
    streets dead at step 3 against the far-side street, where the tree has 0 + 0. The tree's behaviour is CONFIRMED by
    probe Q1, so under N-48 this is a test gap and not a blocker. Suggested test, one assertion: in `growth.test.ts`'s
    0.9-pitch test, also refuse stubs of three steps (`points.length <= 4`), or add a legality case with `steps: 2`
    beside the far-side street. Cheap enough to land before M0-c-06 judges the integrated run; otherwise M4.
25. **N-25 V08, V10, V12 and V12b survive and change 0 of 30 fixture runs (contrived shapes, M4).**
    * V08: `wayBetween`'s crossing branch without the 1 cm sides. It matters only when p or q lies on the way's line,
      for example a step ending on its own arterial in a T beside the far-side street. The mutant would then skip a
      clearance that the code keeps (fail safe).
    * V10: the nearest points taken from the step's start only. It differs only where the nearest pair lies at the
      step's end or at f's end.
    * V12: a q inside f accepted when the way holds it. That needs f lying along the way within 1 cm.
    * V12b: the `best ≥ 1` guard removed. It differs only at sub-2 cm separations.
    * Suggested tests: a step whose nearest point to f is its end, with the arterial crossing only there (V10), and a
      step ending on the arterial in a T beside a far-side street (V08), which keeps the clearance.
26. **N-26 V09, V19 and V14 are equivalent.** No test is needed.
    * V09: the step-meets-f guard removed. A meeting gives `best = 0`, which the `best ≥ 1` guard already refuses.
    * V19: the side read at the first step's last point rather than `points[1]`. Both lie on the one straight first
      step from the origin, so they share a side.
    * V14: `streetOrigin`'s 1 cm tolerance → 0. A first step is ≥ 25 m and leaves square, so its end never lies within
      1 cm of the arterial's line.
27. **N-27 The fixture's 1 000-seed drift pool fell from 35 to 6 windows (follows N-16).** The streets across now grow
    past their first step and meet in T's sooner, so fewer S5c streets run 600 m unbroken. The six windows give p50
    17.3° and none above 90°, but `driftRow` asserts the median band only from 20 windows. The row's assertable pools
    are `drift-grown.test.ts` (dense_core 192 windows, p50 20.3°; ribbon 644, p50 17.3°) and M0-c-06's integrated run,
    which re-judges the exit bar. Not a fail: the row holds on every pool. M0-c-06 should still see that the fixture
    alone cannot judge the median.
