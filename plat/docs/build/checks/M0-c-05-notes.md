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
