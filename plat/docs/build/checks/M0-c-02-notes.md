# M0-c-02 — the checker's minor notes (lane `check/M0-c-02`, 2026-10-06)

These notes are for the hardening milestone M4 unless a note names an earlier one. None of them fails the item (J180,
N-45). The blockers are in `M0-c-02.md`. The probe and mutant names refer to that file.

1. **N-1 The graze case's departure is measured against the water-spliced ring.** `traceBase` computes
   `report.departureCm` and the rungs' band check against `crossed.ring`. In a graze, that ring already has the shore
   arc spliced into it (C-0226 (7)), so the measure does not see how far the shore arc lies from the boundary. Probe
   PA: a square boundary's east side crosses a round lake of radius 100 m along its diameter. The shore arc is shorter
   than `GRAZE_RATIO` × the chord, so this is a graze. The trace commits along the shore 10 000 cm from the boundary,
   and the report says 1 465 cm. With radius 200 m the wall is 20 000 cm out. At M0 the input is contrived: the
   stage-1 level set cannot cross a lake, because water nodes are impassable except along decks. But B-1's fix should
   measure against the boundary as given, which also closes this case. *Milestone:* B-1's fix round (else M4).
2. **N-2 F-WALL's trace rungs run often on relief, and some traces are refused.** Probe PH used real fBm relief
   (`buildTerrain`, plain, rolling and hilly; seeds 1–12, small site) as the pull's cost surface. The rungs ran on 9
   of 12 seeds, and seed 3 was refused `E_SELF_INTERSECT`. Probe PI (a bowl through the default cost surface) also
   refused seed 3. Probe PC refused inward-cone seeds 1, 3 and 4 and wavy-field seeds 4 and 9. Each refusal is the
   declared end of M0's ladder (C-0226 (6)) and fails safe. The likely source is the pull's freedom to change the
   offset by up to one side's length between neighbours, which lets a noisy field draw a sawtooth that the 3 smoothing
   passes do not remove. *Suggested handling:* the site spike (M0-e-06) runs relief through this trace. It should
   watch the refusal rate, and a fix round can then reduce the sawtooth, for example with a smoothness term in the
   pull's path cost. *Milestone:* M0-e-06 (earlier than M4).
3. **N-3 §4.4's inward-pull cap is neither built nor named.** §4.4 *Water and the waterfront* says: "If an inward pull
   would leave the stage's land short by more than the S5d tolerance, the pull is capped at the smoothing step
   (reported)". The item cites that paragraph for its water-gate sentence. Neither C-0226 nor §4b names the cap. The cap
   reads S5d's tolerance (M0-c-05's). *Suggested handling:* a choices row that stages it to M0-c-05 or M1.
4. **N-4 Four mutants survived off the listed promises.** M26 removes the refusal of a strip face found from both
   sides. M27 removes the width test of a probed strip face. Both are defensive guards on lines that fail to close, and
   none of this seat's 131 commits reached them (PB, PB2, PC, PF, PH, PI). M34 removes `selfTouches`' adjacent
   fold-back clause. A fold-back is mostly caught by the non-adjacent clause or removed by the simplify's 100° floor.
   M35 removes the defect re-check after the kernel's simplify. The seat judges it equivalent in effect, because the
   kernel's simplify is topology-preserving and takes the water, the reservations and the core as obstacles. Each
   could take a hardening test.
5. **N-5 The banks are not re-checked after the commit.** `trace.ts` says "Every gate on the committed trace exactly
   …, each bank vertex where it was put", but the loop checks the main gates only. The tests check the bank vertices
   on their fixtures, and probes PD, PE and PF found them in place.
6. **N-6 Water can split a strip.** In probe PF, where the trace follows a bank (a graze), an arc's inner strip was
   sometimes two faces, each owned `wall_strip:1-inner` (6–7 inner faces for 5 stops). The water separates them. This
   is a fair reading of "each strip is a face of its own", but C-0226 (10) could say so.
7. **N-7 `departure()` samples every metre.** At 50 cm the measure can read slightly higher. In PC, seed 12 inward
   measured 4 000.07 cm against a reported 3 999.75 cm. B-1's check should use a small stated tolerance or an exact
   measure.

## Closing check (`check/M0-c-02-close-r1`, 2026-10-06)

The first check's B-1, B-2 and B-3 are fixed (`M0-c-02.md`, closing round). These notes come from the closing
round's mutants and probes. None of them fails the item (J180, N-45).

8. **N-8 The in-batch band re-proof has no test that can fail on it (mutant N04; M4, or earlier with M0-e-06).**
   * Observation: removing `traceBase`'s check after `insertChain` survives the near set and the related set. That
     check proves every side again on the placed vertices against the boundary as given, at the band, and rolls the
     batch back `E_INVARIANT` `band` (C-0232 (2)). The pre-commit proof holds sides to the band less 1 cm, while the
     insertion's attraction can move a vertex 26 cm. The honest probes Q1 and Q2 put sides at up to 3 993.8 cm, about
     6 cm inside the band. A trace vertex attracted outward onto a shore vertex within 26 cm there could carry a side
     over 40 m. Removing the guard would let that commit. The guard is present and correct as read, so it fails safe.
     **CONFIRMED** (survival); reachability **PLAUSIBLE** (reasoned, not built).
   * **Hardening:** a test that plants an L0 or L1 vertex (through `commitSite`'s `prepare` hook) within 26 cm outside
     a trace vertex that the outward field takes to the band's edge. It asserts the batch refused `band` with nothing
     written. M0-e-06's real water near pulled traces is where this first becomes likely.
9. **N-9 Internal margins and reference rings of the band are not pinned by tests (mutants N06, N10, N12, N13, N17; M4).**
   * Observation: each of these survives. N06 measures the smoothing against the water-spliced ring. N10 drops
     `bandLimit`'s 1 cm. N12 loosens the smoothing's per-vertex guard from the band − 26 cm to the band + 10 m. N13
     measures `report.departureCm` against the spliced ring. N17 skips the union rung's simplify before its verdict.
     The pre-commit proof (N01, N05 killed) and the in-batch check (N-8) still hold the committed trace within 40 m of
     the boundary as given. So each changes only which traces refuse, a report figure, or the margin N-8 protects,
     never the bar. A related edge: the smoothing proves its sides on doubles at the band − 1 cm and rounds to the
     lattice afterwards, so a side can end up to 0.71 cm past the limit. The pre-commit proof then refuses it (fail
     safe, not seen in 141 + 72 commits). **CONFIRMED** (survival); the effects **PLAUSIBLE**.
   * **Hardening:** C-0232 (3)'s "measured from the boundary as given" for the smoothing and the report could take a
     chorded-crossing fixture under an outward field. The proof's 1 cm margin and the rounding order could be settled
     together, for example by proving the rounded points.
10. **N-10 The chord-in-water test is sampled (mutant N14; M4).**
    * Observation: `crossWater` takes the chord when nine points at t = 0.1 … 0.9 lie in the water. With only t = 0.1,
      the mutant survives, because the bend fixture's chord leaves the water before t = 0.1. The probe Q5 (the bend
      turned 180°) is right on the original. Two cases remain open: a chord leaving the water only between samples
      (a narrow spit), and a chord over an island, since `waterRings` reads only each water face's outer ring.
      **CONFIRMED** (survival); the spit and island cases **PLAUSIBLE**.
    * **Hardening:** an exact test (the chord crosses no edge of any of the water face's rings, holes included). Add
      fixtures where the chord leaves the water late and where it crosses an island.

## Closing check of session fix round S1 (`check/M0-c-02-close-s1`, 2026-10-08)

N-54 (1) Q5 and Q6 are fixed (`M0-c-02-s1.md`). These notes come from this round's own mutants K01 – K26 and probes
(mirror `~/maps-scratch/waves/check-M0-c-02/close-s1/`). Under N-48 each is a KI test-gap note on code the probes
confirm correct, not a blocker; the hardening pass (M4) drains them.

11. **N-11 KI: the two water proofs have no test that fails without them (mutants K05, K06, K07; M4).**
    * Observation: skipping `traceBase`'s pre-commit side proof (K05), its in-commit edge proof (K06) or both (K07)
      leaves NEAR green (9 files, 88/88 each). The proofs are reachable: probe `zz-check-round.ts` puts a pond inside
      a 600 m town with one straight edge 1.5 – 2 cm past a smoothed corner side (the side clears the 2 cm tolerance
      on doubles; the lattice rounding of its moved end carries it over). The tree's code refuses it `E_INVARIANT`
      `water: the trace's side -27984,-29984 → -27000,-30000 …` (and the twin at -30000,-27000 → -29984,-27984). With
      K05 or K07 applied the trace commits and every committed wall edge is dry: the insertion's attraction lays the
      wall onto the pond's L0 edge. So no input was found where removing both proofs commits wet geometry, and on the
      one input that reaches the pre-commit proof it refuses a trace that would have committed lawfully (a refusal
      within centimetres of a pond: a quality shortfall that fails safe). The in-commit proof was not reached; a wall
      vertex attracted onto an L1 edge over the water (a way near a bridgehead) is a PLAUSIBLE path to it.
      **CONFIRMED** (survival, the probe's refusal and the mutants' dry commits); the attraction path **PLAUSIBLE**.
    * **Hardening:** keep the probe's pond as a pin of the pre-commit refusal (nothing written). Prove the rounded
      points in the smoothing (C-0282's deferred rounding KI) so such a trace commits instead of refusing. Add a
      fixture where the attraction moves a wall vertex onto an edge over the water, for the in-commit proof.
12. **N-12 KI: three redundant guards survive alone (mutants K09, K12, K13; M4).**
    * Observation: dropping the side check on the simplify's result (K09) survives, because the kernel's simplify
      already refuses a removal touching an obstacle (the barred rings), stricter than the 2 cm side test. Removing
      either of `layStrips`' two frame proofs alone (K12 before the batch, K13 on the placed vertices) survives; both
      together (K14) are killed by the EP-20 and frame-arc pins, as C-0282 (7) states. **CONFIRMED** (survival); the
      redundancy **PLAUSIBLE** (read, not proved).
    * **Hardening:** a unit case per guard if the kernel's simplify contract or the insertion's attraction changes.
13. **N-13 KI: two corners of the side test are unpinned (mutants K18, K19; M4).**
    * Observation: exempting any side between two water-ring vertices, not only a ring side (K18), survives; so does
      `firstOver` skipping the closing side `line[n − 1] → line[0]` (K19). The pull and the smoothing test the closing
      side themselves and `committedWetEdge` tests edges, so K19 alone commits nothing wet in any run seen; a side
      between two non-adjacent shore vertices across the water needs a trace vertex on each shore vertex that is no
      bank pair, which no producer was seen to make. **CONFIRMED** (survival); reachability **PLAUSIBLE**.
    * **Hardening:** `sides.test.ts` cases: a side between two non-adjacent shore vertices across the water lies over
      it; `firstOver` on a line whose only wet side is the closing one returns n − 1.
14. **N-14 KI: the pull's ramp steps are unpinned (mutant K26; M4).**
    * Observation: testing each DP step's side with the candidates swapped (`cand(i − 1, j)` → `cand(i, h)`, a wrong
      segment wherever the offset changes) survives NEAR, yet changes the relief-60 seed 9 stage-2 replay: pull moved
      151 → 145, line 224 → 226 vertices, still four water gates and every wall edge dry or gated, so the replay's
      property test passes. The code tests the right segment (`cand(i − 1, h)` → `cand(i, j)`, read) and its replay
      commits dry. **CONFIRMED** (survival and the changed figures).
    * **Hardening:** pin the replay's `report.pull` (moved 151, max 3 974 cm) and line length (224), and add a fixture
      where only a ramp step (h ≠ j) beside a pin would cross the water.

## Closing check of session fix round S2 (`check/M0-c-02-close-s2`, 2026-10-09)

N-54 (1)'s residual is fixed (`M0-c-02-s2.md`). These notes come from this round's own mutants M01 – M27 and probes
(mirror `~/maps-scratch/waves/check-M0-c-02/close-s2/`). Under N-48 the KI rows are test-gap notes on code the probes
confirm correct, not blockers; the hardening pass (M4) drains them. N-19 and N-20 are notes for the session.

15. **N-15 KI: two corners of the bank settling are unpinned (mutants M15, M27; M4).**
    * Observation: `SETTLE_ROUNDS` = 1 (M15: a chord needing two moves is judged not clear) and a contact search that
      skips the chord's last quarter (M27: a shore vertex near the EXIT bank is never settled on) each leave NEAR green
      (10 files, 95/95). Every NEAR case settles one bank, near the entry. The probe `zz-check-settle.test.ts` (mirror
      only) shows the code is right: P1, a shore vertex 10 cm off the chord and 26.9 cm from the exit bank, settles the
      exit onto it (clear); P2, one such dent near each end, settles both banks over two rounds (clear). M27 fails P1
      and M15 fails P2. With either mutant the insertion would split the chord at the vertex, and the strict in-batch
      proof (pinned: M02 – M04 killed) refuses the trace, so the gap costs a refusal, never a wrong commit.
      **CONFIRMED** (survival, probe); the refusal path **PLAUSIBLE** (read).
    * **Hardening:** add P1 and P2 as `crossWater` cases in `chord.test.ts`.
16. **N-16 KI: a settled chord that leaves the water is unpinned (mutant M14; M4).**
    * Observation: dropping the `chordInside` test after a bank moves (M14) survives NEAR and the settling probe. With
      it, a settled chord that cuts across land between two water stretches would be laid as one `wall_gate` edge
      instead of refused. No input reaching it was built. **CONFIRMED** (survival); reachability **PLAUSIBLE**.
    * **Hardening:** a `crossWater` case whose shore vertex pulls a bank so that the settled chord leaves the water:
      `clear` false, and the strategy refuses it.
17. **N-17 KI: the exported `waterGates(trace, water, k)` is not tested with the arena's vertices (mutant M20; M4).**
    * Observation: calling `crossWater` there without `arenaVertices` (M20) survives NEAR. Its one caller
      (`growth/boundary.ts:471`) reads only the count, which settling never changes, so M20 is equivalent for the
      caller. A §4.12 consumer reading `bankAt` would see unsettled banks. **CONFIRMED** (survival, read).
    * **Hardening:** a `waterGates` case on the synthetic graze whose `bankAt[0]` is the shore vertex V.
18. **N-18 KI: N-11's in-commit edge proof is still untested (mutant M23; M4).**
    * Observation: removing `committedWetEdge` (M23) still leaves NEAR green (95/95), as K06 did in round S1. The new
      in-batch proof `looseGate` is pinned (M02, M03, M04 killed by `chord.test.ts`), so a non-chord `wall_gate` edge is
      covered. `committedWetEdge` now only backstops an ungated wet wall edge, which the pull, the smoothing, the rungs
      and the pre-commit side proof already keep out. **CONFIRMED** (survival).
    * **Hardening:** as N-11.
19. **N-19 Session: the strict refusal of a crossing whose chord leaves the water is a measurable share.**
    * Observation (own before/after runs, current tree, s1 sources versus s2 sources): relief-60 test size, seeds
      1 – 12, both configurations: 23 of 24 derivations are identical. Coarse seed 12 committed stage 1 with a course
      (12 wall edges over water, 1 `wall_gate`; 11 non-chord wet edges under the strict reading). It is now refused at
      **S3** `E_INVARIANT` `water: the crossing from -20669,9817 to -21174,-106 has no clear chord … (its chord would
      leave the water)`, so S4 – S6 are not reached. At CITY, seed 1 (both configurations) and seed 15 (default) refuse
      stage 2 at S5 as before, but the code changes from `E_SELF_INTERSECT` to `E_INVARIANT` `water` (crossings
      (86602, 27184) → (82542, 32333) for seed 1 default and (−84664, −83095) → (−67299, −87127) for seed 1 coarse;
      seed 15's detail, (−57071, 59155) → (−59986, 45097), is C-0300's and was not probed again). M0-e-06's committed summary (`summaries/M0-e-06.json`, CITY seeds 1 – 8) counts S5 refusals by
      code, so its seed-1 rows read differently on the next re-run (N-54 (4)). **CONFIRMED** (runs, instrumented
      mirror).
    * Suggested handling: C-0300 defers "a river bend's crossing as two water gates" as new design. A stage-1 refusal
      loses the whole derivation, and N-56 treated lawful inputs refused at measurable shares as defects, so the
      session should rule whether this share (1 / 24 at test size) is accepted to M1 or needs a round in M0. The
      M0-e-06 summary re-run is the session's.
20. **N-20 Session: in the current tree, relief-60 CITY seed 9 no longer exercises the graze, with either version.**
    * Observation: in the current tree (snapshot 2026-10-08 23:17), `gate:w0`'s bank 0 is (−13777, −90047), and its
      run is one chord edge with the s1 sources as well as the s2 sources (4/4 chords both). Upstream changes since
      M0-e-06's check (16:11) moved stage 2's boundary. The 27 cm graze reproduces only on the 08:35 snapshot
      (`close-s1/after`). So M0-e-06's mutant M2 has lost its seed-9 kill path whatever this round did (M0-e-06 note
      15). **CONFIRMED** (probe `zz-check-s2.ts` in four mirrors: old-s1, old-s2, before, after).
    * Suggested handling: M0-e-06 owes the hand-built chord pin of its note 15 now.
21. **N-21 KI: the stage-2 replay's cost-field coverage check was narrowed (M4).**
    * Observation: `sides.test.ts` used to require that every point the pull read lies in the captured cost field
      (misses 0). It now allows misses within 80 m of the settled bank, and those points read cost 0
      (`fx.costs[...] ?? 0`; `chord.test.ts` uses the same rule). The narrowing is commented in the test, and C-0300
      names the change only as "the replay's settled bank". The replay's pull near `gate:w0` therefore runs partly on
      a zero-cost field. **CONFIRMED** (read).
    * **Hardening:** capture the fixture's costs again around the settled bank, and restore misses 0.

## Closing check of session fix round S3 (`check/M0-c-02-close-s3`, 2026-10-11)

N-56 (3) Q22 is fixed (`M0-c-02-s3.md`). These notes come from this round's own mutants Z01 – Z14 and probes P1 – P4
(mirrors `/tmp/claude-0/…/scratchpad/waves/check-M0-c-02/close-s3/`; the probe is
`probe/packages/testkit/probe/zz-survey.ts`, which runs the `EP-01/S5a/coincident` family unplanted and stops after
S5a:2). Under N-48, the KI rows are test-gap notes on code the probes confirm correct, not blockers. The hardening pass
(M4) drains them. N-26 – N-29 are also for the session.

22. **N-22 KI: the corridor bound is pinned only by its value (mutants Z03, Z04; M4).**
    * Observation: `corridor.test.ts` pins `CORRIDOR_SLACK_CM` ≈ 73.539. Its behaviour cases sit at 6 – 25 cm (the
      15 cm twin, seeds 3443032966, 3027099408, 1318978557, 3198053629) and at 680 – 700 cm (the crossing twins and
      seeds). Two use-site mutants survive NEAR and every RELATED file that reaches their window (a depth-logged RELATED
      run: 5 evaluations in (26, 73.5] cm, in 3 testkit `edge/` files; 34 in (73.5, 147] cm, in 5 files).
      * Z03, `depth > attractCm` (26 cm), leaves a strip face holding a 26 – 50 cm vertex `land:0` (geometry identical)
        on 8 of 1 000 family seeds: 3980833922, 1149953023 (50.3 cm, stage-1 outer), 3436289613 (50.0 cm), 2763625693,
        416765770, 349539469, 663484580 and 3187772940.
      * Z04, `depth > 2 × slack`, types a face holding a 110 – 146 cm vertex as `wall_strip` on 2704069009 and
        3435165676.
      * The real code does neither (P2, P3). **CONFIRMED** (survival, output).
    * **Hardening:** (a) pin a family seed with a strip face 26 – 73.5 cm in, e.g. 1149953023 or 3436289613: the face
      is typed and no strip-probe face is left `land:0`. (b) Pin a hand twin whose face holds a vertex 80 – 140 cm in,
      e.g. the along-trace stop with `halfWidthCm` 110: refused, "lies 110 cm inside gate:0's corridor, beyond the
      fidelity bound (74 cm)".
23. **N-23 KI: the outer side's corridor clauses are not pinned (mutant Z10; M4).**
    * Observation: applying the gate-vertex and depth clauses to inner faces only survives NEAR and 14 RELATED files.
      Every pinned crossing is on the inner side. On 3 of the first 300 family seeds (1793505783, 3435165676,
      671252167), Z10 types an outer stage-1 face holding a vertex 1.1 – 2.0 m inside a corridor as
      `wall_strip:1-outer`. RELATED inputs bar outer faces by gate vertex and depth in 14 files. **CONFIRMED.**
    * **Hardening:** a twin whose outer face holds the gate vertex (or a vertex past the bound): outer side refused,
      "the outer side: vertex … is gate:N's gate vertex".
24. **N-24 KI: the strip-width clause is not pinned (mutant Z12; M4).**
    * Observation: dropping `dt > widthCm + 100` (C-0226 (10), this round's K6) survives NEAR and its 3 RELATED files.
      It changes 0 of the first 300 family seeds. RELATED inputs reach it: an outer face 2 288 cm from the trace in
      `bench determinism/pair.test.ts`, and bars in `backbone/frame`, `enceinte/sides`, `enceinte/water` and
      `edge/cells`, none of whose assertions read that face. `strips.test.ts` asserts every strip vertex within its
      width on its fixture, but no case needs the clause. **CONFIRMED.**
    * **Hardening:** a twin where a strip probe meets open ground beyond the strip's width (a line cut away, e.g. by the
      border): that face is never typed, and a side left with none is refused "… beyond the strip's w cm".
25. **N-25 Z06 is equivalent.** `why ??= w` → `why = w` names the last barring face's vertex instead of the first. It is
    still a true barring vertex and cause, which is the promise of C-0311 (3). No test needed.
26. **N-26 KI and session: strip faces over a way's corridor away from the gate (before this round; M4 or with
    M0-c-04's stage stops).**
    * Observation (probe P4: the corridor along each stop's actual path at 25 cm × five offsets, points deeper than the
      slack + 5 cm, located on L1). On 42 of 1 000 family seeds, a committed strip face covers corridor points:
      * On 41 of them it is stage 1's strips, 10 – 47 m from the gate, 3.5 m deep. The arterial's path bends and runs
        along the wall inside the strip's width (e.g. seeds 1842059696, 2537277803 and 889845538).
      * On 1 (1671642301) it is stage 2's inner strip, 91 m in, at the stand-in corridor's far end.
      * Near a gate, no strip face covers its corridor.
      * All 42 are identical with the 5 cm clause, so they existed before this round. The faces newly typed by this
        round add no covered point (family indices 155, 179, 810, 909, 936: identical sample sets).
      **CONFIRMED** (probe). Whether a strip should yield to a way that runs along it inside its width is
      **PLAUSIBLE**, a design question.
    * **Suggested handling:** the vertex clause cannot see an edge that crosses a corridor between two outside vertices.
      Membership by area (the ruling's alternative within shape (a)), or cutting the setback lines along the whole way
      rather than near the gate, would. Session: decide whether a way inside the strip's width is a defect of the strip
      or of the route.
27. **N-27 Session: the ruling's "299 unchanged (digests identical)" pin holds at the geometry level only.**
    * Observation: of the first 300 family seeds, 34 change at L1 – L4 (124 of 1 000). On all 124, the L1 geometry is
      identical and the only owner changes are `land:0` → `wall_strip:2-inner` 70, `wall_strip:2-outer` 60 and
      `wall_strip:1-outer` 3. These are strip pieces the 5 cm clause left untyped, a silently wrong committed result
      under N-45, now typed. C-0311 (4) states it. No golden in RELATED moved. **CONFIRMED.**
    * **Session:** accept the owner-only shift as part of the fix (this seat did). M0-x-06 round 2's 1 000-seed re-run
      sees it.
28. **N-28 KI: 6 of 1 000 seeds still leave a 1 – 2 m-deep strip piece untyped (C-0311 (4)'s own KI; M4).**
    * Observation: after the round, family seeds 2704069009 (146 cm), 1793505783 (200 cm), 3435165676 (110 cm),
      671252167 (163 cm), 3568440702 (102 cm) and 3709170404 (167 cm) commit with a strip-probe face barred by a vertex
      past the bound, left `land:0`. Faces barred by a gate vertex are not counted in this probe. It fails safe: no strip
      is typed into a corridor. But a piece of the strip zone stays land. **CONFIRMED.**
    * **Hardening:** separate a cap closed past a trace vertex deep in the corridor from a true crossing (area, or the
      cap re-cut on the corridor's edge), as C-0311 (4) proposes.
29. **N-29 Session: clean-room and working-rule slips (disclosed).**
    * L-0415 (the fixer) disclosed one grep for two seed numbers over the glob `docs/*.md`. The glob takes in
      `docs/CONFIDENCE.md` and `docs/IMPROVEMENTS.md`. There was no match and nothing was displayed. Rule 2 forbids even
      searching those files. No content reached the seat, so the item's code cannot carry any. This seat does not judge
      it a breach of the item, and the session decides how to record it. **CONFIRMED** (row read).
    * This seat: a `cd` into its new mirror failed, so one `corepack pnpm install --frozen-lockfile` ran at the project
      root (06:00:42). It created `package.json`, `pnpm-lock.yaml` and `node_modules/` (`.modules.yaml`,
      `.pnpm-workspace-state-v1.json`) there. The seat checked those three with an `ls -la` of the project root, which
      listed directory names only, and removed them at 06:01. Nothing else outside `plat/` and the scratch directory was
      touched. No git command was run.

## Closing check of session fix round S4 (`check/M0-c-02-close-s4`, 2026-10-12)

Q40, the refusal census and the zero-shift line are fixed (`M0-c-02-s4.md`). These notes come from this lane's
mutants Y01 – Y19 and its probes:

* the first part's mirror, which no longer exists;
* the relaunch mirror `/tmp/claude-0/…/scratchpad/waves/check-M0-c-02/s4r/after/`, with the U-bend probe
  `zz-ubend.probe.test.ts` and the census probe `zz-census.probe.test.ts`, both kept outside the test tree.

Under N-48, the KI rows are test-gap notes on code the probes confirm correct, not blockers. The hardening pass (M4)
drains them. N-32 – N-35 are also for the session.

30. **N-30 KI: the bank route's nine-sample chord clause is not pinned (mutant Y07; M4).**
    * Observation: in `chordClear`, `return chordInside(ring, a, b)` was replaced by `return true`, keeping only the
      proper-crossing test. NEAR stays 116/116.
    * The probe is a U-shaped water ring (x 0–140 m, bottom y 200–240 m, arms to y 400 m). The boundary goes in and out
      by the two inner shores, at (100, 366.67) and (40, 366.67) m, so the chord lies over the peninsula and crosses no
      ring side.
      * Real code: refused `E_INVARIANT` `water` with C-0324's detail, nothing committed.
      * Y07: commits `gate:w0` as one `wall_gate` edge **over land** (wet fraction 0.000).
    * The tests cover the promise only by side-crossing instances: the L-bend's routed chord is wet by 99 samples, and
      the needle test catches a chord through land. No test has a chord that crosses no ring side but leaves the water.
    * Suggested handling: add the U probe to `bend.test.ts`, asserting a typed refusal (or a wet routed chord) and no
      `wall_gate` edge over land.
31. **N-31 KI: four of the route's guards are not isolated by tests (mutants Y12, Y15, Y17, Y13; M4).**
    * Observation: four mutants survive NEAR:
      * Y12: a routed chord skips `settleChord`;
      * Y15: `waters[a.w] === w && waters[b.w] === w` is dropped, so ends on two rings would be walked on one ring's
        side indices;
      * Y17: the proper-crossing end tolerance goes from 1 cm to 50 cm, so a chord may cut a land sliver near a bank;
      * Y13: the shared-walk guard is dropped (the builder's Z11).
    * By reading, the real code keeps C-0324's stated rule in each case. On the U probe each mutant's output equals the
      real code's (refused). Y13 is equivalent in effect on reachable input: a shared shore point needs walks round the
      river's end, beyond the band.
    * Suggested handling: one fixture each, as follows.
      * A routed chord passing within 1 cm of an unrelated vertex, which must settle or be refused.
      * A crossing between two water bodies, which must be refused and named.
      * A chord cutting a 20 cm land sliver 30 cm from a bank, which must not be clear.
      * A narrow river end inside the band, where both walks meet.
32. **N-32 KI and session: a boundary intruding into a U-shaped water body by its inner shores is refused, typed (M4,
    or the session).**
    * Observation: on the N-30 probe the stretch over water is not a bank-to-bank crossing. No single chord in the
      water joins the two inner shores within the band, so the trace is refused `E_INVARIANT` `water` (C-0324's
      detail), with the arena untouched.
    * Input kind: the boundary is our own S5 stage boundary, so if a growth stage ever produced this it would be OUR
      OWN INTERMEDIATE.
    * No registered family reached it: the base fixtures and EP-01 are as counted, and the river900 extras' refusals
      are of other classes (N-33). The current verdict, REFUSE, is fail-safe.
    * Suggested handling: the session decides whether the class is reachable through §11.4's doors. If it is, it is a
      MAKE-IT-SUCCEED class: graze-follow the shore, or split it into two water gates, which is new design (a notBuilt
      milestone).
33. **N-33 session: refusals of LAWFUL input outside the round's families, unchanged by the round (J264, J290).**
    * Observation: every run's stage and class are identical before and after (first part, 1 058 runs; this part
      re-ran the after side):
      * `runBase` RIVER 900 ha / 30 ha walled, seeds 8 and 14: S5 E_SELF_INTERSECT;
      * the same, seed 12: S3 E_INVARIANT, "gate:2 not on the committed trace" (first part's detail);
      * RIVER_BLUEPRINT default size, seeds 3 and 4: S5 E_SELF_INTERSECT;
      * the same, seed 5: S3 E_SELF_INTERSECT;
      * the builder's relief-60 site spike seed 2: S5 E_SELF_INTERSECT.
    * The first part's log names the S5 ones an F-WALL self-touch of the trace.
    * All are LAWFUL input (registered blueprints at other seeds), so their verdict class is MAKE-IT-SUCCEED. None is
      in the round's registered families (base seeds 1–3, EP-01/S5a/coincident), and none is this round's line.
    * Suggested handling: the session queues them with these seeds. The S5 self-touch rows go to M0-c-02 or M0-c-04's
      F-WALL rungs, and the S3 rows to S3's owner.
34. **N-34 session: RELATED's foreign red, and a guard made redundant.**
    * The red: `packages/testkit/test/edge/repins.test.ts` > "EP-01/S8/zero-length at 2521534151 …" expects
      `refused-lawful` and receives `laddered` on this tree (07:18 copy and tree alike). An instrumented replay shows
      the cell reaches neither `bankRoute` nor `traceBase`'s water-gate numbering. The cell is Q41, M0-x-06's in-flight
      pins, and S8's outcome changed under it. The two reds of earlier runs, edge/standing 1595424233 and hausdorff,
      are green on this tree.
    * The guard: as C-0324 (3) says, M0-c-04's `earlierWaterGates` guard (`growth/boundary.ts`) is now redundant, and
      it is not this item's file.
    * Suggested handling: route the red to M0-x-06 or Q41's owner. The guard is for M0-c-04's next round or the
      consolidation.
35. **N-35 session: disclosures.**
    * The lane ran in two parts. The first ran 00:06 – 05:00 on the old account's machine. The second, a relaunch from
      07:12 on this container, re-ran the gates, NEAR, RELATED, the Q40 replay, the census after-side on a sample, and
      Y07's probe and NEAR run. The before-side figures are the first part's lines, which used the s3-landed sources.
    * The first grep of the lane log for the item key printed the builder's CHECKPOINT and LANDED lines, which name its
      self-check mutants Z1 – Z11, before the seat had planned. No `selfcheck-*` folder was opened, and every survivor
      was judged by this seat.
    * This seat's ledger row L-0459 is inserted in §2's table after L-0457. Row L-0458
      (`build/M0-a-08-consolidate-1`) stands outside the table after §5, as L-0444 once did, so the session may need
      to move it (Q23 (a)).
    * No git command was run.

### Consolidation round R8 (fix round C1; lane `build/M0-c-02-consolidate-1`, 2026-10-12) — the builder's rows

36. **N-36 the round's map (J263 Q8): old file → new file, and the bodies moved.**
    * No source or test file was created, renamed, split, merged or deleted. Each of `src/enceinte/` (11 files) and
      `test/enceinte/` (12 test files, `support.ts`, the two JSON fixtures) maps to itself. The fixtures
      `ep20-496296019.json` and `relief60-s9-stage2.json` are byte-identical.
    * Bodies moved into `test/enceinte/support.ts` (equal bodies only, §1.3.9):
      * `WALL` — `strips.test.ts`, `trace.test.ts` and `water.test.ts` each declared
        `{ role: 'wall', entity: 'enceinte:1' }`; one export now, imported by the three.
      * `depthOf` — `sides.test.ts`'s `depthOf(a, b, ring, step = 25)` and `chord.test.ts`'s copy with the step fixed at
        25 (`Math.ceil(len / 25)` is `Math.ceil(len / step)` at step 25, the same double); one export with the default
        step, the chord's call sites passing none. `chord.test.ts` no longer imports `insideRing` and `ringDist`
        (only its `depthOf` read them).
    * Twins that stay, because the bodies differ: `SEEDS` ×3 (`strips.test.ts` [3, 5], `trace.test.ts` [1, 7],
      `water.test.ts` [1, 4]); `GATES` ×2 (`bend.test.ts` a `GateSite[]`, `simplify.test.ts` a `Corner[]` of two
      corners); `ridge` ×2 (`fwall.test.ts` high ground along the north notch's centre line, `pull.test.ts` a circular
      ridge 25 m outside the mean radius — two different cost fields).
    * The support's own oracles (`segDist`, `ringDist`, `maxDeparture`, `insideRing`, `area2`, `densify`) are
      unchanged and independent of `siting/geom.ts`.
    * Counts, before and after: 12 test files, 38 `describe` and 103 `it` call sites (static count), 116 tests run.
      Every describe/it title is byte-identical. Titles that name a queue row (`(Q40 (1); C-0324 (1))`,
      `(N-56 (3) Q22; C-0311)`, `(wall × frame; N-54 (1) Q6)`, `(N-54 (1) Q5)`) stay verbatim, since a title is an
      oracle's name (layout-plan §2, §3).
37. **N-37 1.3.2: why `distToSegment2` gives the same bits in `wet.ts`.**
    * The rings' vertex type: `wetSides(rings, …)` builds a `RingGrid` per ring. Every ring handed to it comes from the
      arena: `trace.ts` passes `barred`, which holds `waterRings` (each body's L0 face ring, `k.view(key, level).rings(f)[0]`),
      the reservations' L1 face rings (`ringsOf`, the same view) and `opts.core` mapped through `lat`. So each is a list
      of lattice points. `pullAndPin` and `smoothPinned` default to `wetSides(barred, 0)` on the same `barred`. The
      tests hand in `P(…)` integer points and the fixtures' integer rings (no non-integer point in either JSON
      fixture, checked by script).
    * So a side `ab` of a ring has `l2 = dx² + dy²` equal to 0 (a repeated vertex) or at least 1. The old guard
      `l2 < 1 ? 0` and siting's `len2 === 0 ? 0` agree on every such input. Past the guard, both compute the same
      `t = quot(dot, l2, 'area', …)` clamped to [0, 1], the same `ex, ey` and the same `ex² + ey²`.
    * The 'wet foot' text is unreachable. `quot` throws only when |l2| < 1 (the 'area' floor), and the guard
      excludes that. `grep -rn "wet foot"` over `plat/` finds it only in `consolidation/layout-plan.md`; no test pins
      it (J302 Q10).
    * Nuance kept, for the hardening pass: a caller of the public `wetSides` that hands in a non-lattice ring with a
      side shorter than 1 cm now gets a RangeError 'siting: segment foot: …' where the old copy clamped to t = 0. No
      caller in `plat/` does this, and the input is UNLAWFUL (barred rings are the arena's lattice rings). It is a
      typed refusal, not a silent result. KI only.
38. **N-38 1.3.6: the kernel line that keys arenas by value (J302 Q6).**
    * `packages/kernel/src/facade/kernel.ts:86–107`: `createKernel` stores each arena under `keyText(key)`, which is
      `` `${k.layer}/${String(k.part)}` `` (:56), in a `Map<string, Plat>`. `platOf(key)` looks it up by that text
      (:105).
    * Every reader goes through `platOf`: `k.plat` (:350), `k.resolve` (:176), `pointLocate` (:246),
      `faceNeighbours` (:250), `index.query` (:266), `rebuildAtStageEnd` (:271), `k.view` (:275) and `k.tx` (:318).
    * `packages/kernel/src/arena/plat.ts:248` `sameKey(a, b)` compares `layer` and `part`. It guards the façade
      (:89), `resolve.ts:73, :203, :258`, the transaction (`tx.ts:85`) and the insertion (`classes.ts:134`,
      `splitThrough.ts:192`).
    * No reader keys by the object. So `water.ts`'s `GROUND` is now `@plat/site`'s `GROUND_KEY`
      (`terrain/heightfield.ts:34`, the same frozen `{ layer: 'ground', part: 0 }`). The file-level export stays.
      `commit.ts`, `strips.ts`, `trace.ts` and `growth/boundary.ts` import it by path, and it is `waterRings`'s
      default.
39. **N-39 KI: three survivors of this round's own targeted mutants (test gaps, no shift).**
    * Each survivor's subject is covered by the NO-SHIFT probe's byte-equality, not by a test. Adding a test would
      change 1.3.9's fixed counts, so each is a pin for the hardening pass (J273, J302 Q12).
    * A07, `commitS3Slice` returning `warnings: []`: no enceinte test reads the warnings of `commitS3Slice`. The probe
      hashes them (`warn …` identical on every run).
    * A08, `traceWithStrips` handing `[]` for `[plaza]`: the plaza lies well inside every test fixture's boundary, so
      no trace there comes near it. A test with a boundary pulled against the plaza would pin it.
    * A11, `depthOf`'s far-side shortcut reading every segment dry: no test segment lies wholly inside a ring farther
      than half its length from the ring's line. A12 (`depthOf` always 0) is killed, so the tests do read the moved
      `depthOf`.
40. **N-40 KI: M06 and M07 as the first check wrote them now survive alone (equivalent in effect on the fixtures).**
    * Taking out the smoothing's vertex clause alone — the band (M06) or the barred rings (M07) — survives the folder
      on this tree and on the pre-round sources alike (`pull.ts` is untouched by the round).
    * Since C-0232 (1) and C-0282 (3), every side a pass changes is re-checked against the band (`sideHolds`) and the
      barred rings (`wet.over`), and its moved ends are reverted. A vertex the vertex clause would have kept back
      makes one of its sides fail that check in every fixture.
    * The guards as the first check aimed them are each killed: M06b (vertex and side band clauses) and M07b (vertex
      and side barred clauses).
    * Not exactly equivalent: the vertex clause holds `bandCm − TOUCH_CM` and the side clause `bandCm − 1`. A
      hardening pin would need a vertex between the two limits.
41. **N-41 the NO-SHIFT proof and the refusal census, before and after (J260 (3), J264 (5), N-58).**
    * The before-image is the tree's owns at the round's start. All 26 files of the landed record `M0-c-02.json`
      (lane `build/M0-c-02-fix-s4`) hashed equal to it, so the tree held c-02 s4's landing (194eb090). Seats run no
      git, so the image was copied to the session scratchpad.
    * One mirror ran a probe twice: once with the pre-round owns, once with the tree's. Each line hashes the committed
      arena (`arenaPrint`, plus `levelDigest` L0–L4) and the records. The probe covered:
      * PB, small seeds 1–30 through `commitS3Slice`;
      * PB2, CITY seeds 1–6;
      * PF, a river at x = −600, −200, 300 and 700 m × seeds 1–3;
      * `commitS3ThenStage1` on small seeds 1–10;
      * the relief-60 seed 9 stage-2 replay of `fixtures/relief60-s9-stage2.json` (pull moved 150, line 224 vertices,
        departure 3 975.16 cm);
      * `runBase` FLAT and RIVER at 900 ha / 30 ha walled, seeds 1–3: the model root, every stage root and the
        generation report;
      * EP-01/S5a/coincident, family indices 156, 593, 956 and 0–9: the whole outcome;
      * CITY seeds 1–16 through S3, S4 and S5a/S5b: c-04's 16-seed `arenaPrint` and the level digests.
    * All 94 lines are byte-identical (file SHA-256 prefix 1cacb71f2b851c76 for both).
    * Refusals before → after:
      * the base families (flat and river, seeds 1–3): 0 → 0;
      * EP-01/S5a/coincident at the sampled indices 156, 593 and 956: 3 → 3, the same details. Each is the unplanted
        control's S5 E_INVARIANT "layStrips: a side's lines closed no strip face — the inner side: vertex …".
    * Verdict classes (N-58): the three are LAWFUL input (the unplanted state), so MAKE-IT-SUCCEED. They are Q37's
      true corridor crossings, routed to M0-c-04 and pinned by `corridor.test.ts`'s `CROSSING_SEEDS`. This round
      changes none of them.
    * The exported names (TypeScript's checker over `src/index.ts`, `src/enceinte/index.ts` and every enceinte
      file), before and after: equal, but for one added file-level name, `commit.ts`'s `traceWithStrips`. The
      barrel has 692 names and the enceinte index 70. `src/enceinte/index.ts` and `src/index.ts` are byte-identical
      (sha256 9ffd0a6e…, f2349765…).

## Closing check of consolidation round R8 (`check/M0-c-02-consolidate-close-1`, 2026-10-12)

The round passes (`M0-c-02-c1.md`). None of these rows is a blocker. Each comes from this lane's own mirrors in the
session scratchpad (`waves/check-M0-c-02/c1/{before,after,mut,inst}`): `before` holds the owns of 194eb090 (c-02 s4's
landing), read from the object store without git; `after` holds the tree's. Under J302 Q12 and J273 the closing check
notes a survivor it meets and adds no pin. The hardening pass (M4) drains the KI rows.

42. **N-42 KI (M4): the plaza handed to the trace is not pinned (mutant A04).**
    * The mutant passes `[]` for `[plaza]` in `traceWithStrips`. NEAR stays green (116/116) on the tree's owns and on
      194eb090's owns alike (A04@before). So the gap predates the round, and the round lost no pin.
    * It is equivalent in effect on the registered families. The plaza's nearest vertex lies at least 160 m from the
      boundary (small seeds 1–30 and CITY 1–6, probe `plaza`). The trace stays within the 40 m band of the boundary,
      so it never comes near the plaza.
    * The code hands the plaza (`commit.ts` `[plaza]`, read). The NO-SHIFT probe's arenas are byte-identical.
    * Suggested pin: a boundary with a cost field drawing the trace toward the plaza, through `commitS3Slice`, must
      commit a trace that does not enter the plaza.
43. **N-43 KI (M4): `commitS3Slice`'s warnings are not pinned (mutant A07).**
    * The mutant returns `[...strips.warnings]` without the trace's warnings. NEAR stays green before and after
      (A07@before).
    * The warnings are real: `W_ATTRACTED` on small seeds 2 and 7 and CITY seed 2. They reach the S3 stage's report
      through `pipeline/base.ts:481` (`commit.warnings`). The probe's `runBase` report hashes (FLAT and RIVER at
      900/30, seeds 1–3) are byte-identical before and after.
    * Suggested pin: a seed with a `W_ATTRACTED` trace warning, asserting that it appears in `commitS3Slice`'s
      warnings ahead of the strips'.
44. **N-44 the recorded mutants re-judged (no shift from this round).**
    * M06 and M07 as the first check wrote them (the smoothing's vertex clause alone) survive. They also survive on
      194eb090's owns (M06@before, M07@before). Since C-0232 (1) and C-0282 (3), the side clause re-checks every
      side a pass changes. With the side clause removed as well, the whole guards are killed: M06b by the relief-60
      replay in `sides.test.ts`, M07b by "the corner keeps its place".
    * K20 (a course exempt over the water only as a two-point chord) survives, before and after (K20@before).
    * K20 is equivalent in effect through the strategy since C-0300. The courses `traceBase` hands to `wetSides` are
      settled chords, `course: [entry, exit]` (`water.ts` `crossWater`). A crossing kept as a longer course is
      unclear and is refused before `wetSides` is built. Only a direct caller of the public `wetSides` that hands a
      course of three or more points reaches the difference.
    * M34 survives as recorded (N-4; M34@before survives too).
45. **N-45 comment tightening (the item's next round, or M4).**
    * Two headers cite "C-0300 (1)" for the one-chord rule: `water.ts` ("The one-chord rule (C-0300 (1); N-54 (1))")
      and `chord.test.ts`. That clause of C-0300 is the row's diagnosis. The rule itself is the row's headline and its
      clause (3). The plan's §1.3.8 prescribed this wording, and the text matches the code.
    * `frame.test.ts`'s and `sides.test.ts`'s headers still carry their fixtures' counterfactual figures ("up to
      125 cm beyond the frame", "pulled 29.8 m onto the far bank"). They describe what the registered fixture pins,
      not a round. §2's table lists source files only.
46. **N-46 session notes.**
    * The brief's oracle for 1.3.2 quotes the relief-60 replay as "pull moved 151". Before and after, the replay gives
      moved 150, line 224, departure 3 975.164468085763 cm. That is byte-identical, so there is no shift. The 151 is
      the s1-era figure (`M0-c-02-s1.md`, K26), from before C-0300 (2)'s settling.
    * `traceWithStrips` takes `plaza: Reservation`, not the plan's `ChainRef` (C-0336 states it). R11's
      `growth/boundary.ts` `traceStage1` hands `[s3.plaza]`, where `s3: S3Batch` and `plaza: Reservation`, so R11's
      one-call replacement type-checks as planned.
    * N-37's `wetSides` precondition (lattice rings) was measured. An instrumented copy of `nearDist` read 2 779 080
      ring sides over the relief-60 replay, the river at seeds 1–4, `runBase` FLAT and RIVER at seeds 1–3, CITY 1–4
      through S5a/S5b and EP-01/S5a/coincident at indices 0–99. None had a non-integer vertex or a squared length in
      (0, 1). The guards of the deleted `segD2` and siting's `distToSegment2` never diverged.
    * RELATED@1000 had one red: `testkit test/edge/repins.test.ts`, "EP-01/S8/zero-length at 2521534151 …
      (Q41)", with 'laddered' received where 'refused-lawful' was expected. The same red appears on 194eb090's owns
      in this lane's `before` mirror. The S8 cell runs no enceinte code. This is M0-x-06's census pin, stale since
      M0-b-03 s4; the session should re-pin it (J264).

## Hardening round S5 (lane `build/M0-c-02-fix-s5`, 2026-10-27 – 28) — the builder's rows

The session's hardening round of the item (J237 (2)) on the inventory's FIX-NOW rows (`checks/hardening-inventory.md`
§3, entry 29) and the queue rows Q27 and L31, with Q46 / KI-10, Q52's classes B, D, E, F and census R-31 merged in. The
gate (M0-a-05 S10 landed, its S9/S10 notes) was read first; N-26 and N-28 were re-read against the router as it
stands. Choices row C-0448 names every row it closes; ledger row L-0700. The before-image is the tree's owns at the
round's start, read read-only from HEAD 398869ce's object store by a python reader (no git command): all 26 files hash
equal to the landed record `M0-c-02.json` (lane `build/M0-c-02-consolidate-1`). Every probe and mutant ran in the lane
mirror `/home/user/maps-scratch/waves/selfcheck-build-M0-c-02-fix-s5/` (isolation proved; removed at the end). The lane
ran in four parts on four containers (11:54 – 17:52, 19:39 – 22:25, 22:37 – 00:18, from 00:20 on 2026-10-28), the mirror rebuilt
each time (isolation proved each time); every figure below was measured on the round's final sources unless it says otherwise.

47. **N-47 row by row: the outcome, its evidence and its mutant (J183's table at the end).**
    * **3 N-3 (the §4.4 inward-pull cap) — STAGED, choices text.** The cap reads S5d's tolerance and the stage's land
      shortfall, which M0-c-05's S5d computes after S5a's commit; the trace strategy has neither at its pull. C-0448 (1)
      stages it to M1 (a contract between S5a and S5d, not this item's to change), names the report field the pull
      already gives (`report.pull.moved`, `maxOffsetCm`) and the rule that holds at M0: the inward pull is bounded by the
      40 m band (C-0232), never by land.
    * **4 N-4 — PINNED, and two guards re-judged.** M34 (`selfTouches`' adjacent fold-back clause) is pinned by
      `fwall.test.ts` "the detection's fold-back clause alone" (a sliver triangle folds back; a right triangle does not).
      M26's clause (a face found from both sides refused "one face on both sides of the wall") no longer exists: the
      round's `layStrips` reads each candidate face's side from its own vertices (`sideOfFace`) and takes a face once
      (`seen`), so a face cannot be counted on both sides; the closed trace separates the two sides, so no face lies on
      both. M27's clause (a probed face's width) is now the strip-width clause, pinned by N-24's twin (mutant Z12). M35
      (the defect re-check after the kernel's simplify) stays equivalent in effect: the kernel's simplify is
      topology-preserving with the water, the reservations and the core as obstacles (one-line note, no test).
    * **5 N-5 — REWORDED (comment only).** `trace.ts` now says what the code proves: every MAIN gate read back on the
      committed trace by lattice equality; a water gate's banks proved inside the batch by `looseGate` (each `gate_end`
      one vertex, the one `wall_gate` edge between them), a bank allowed to land on a shore vertex within the attraction
      distance (C-0300 (2)), so its vertex is not read back against `bankAt`.
    * **6 N-6 — STATED (choices text and the module comment).** C-0448 (6) gives C-0226 (10)'s reading: where the trace
      runs along a bank (a graze) the water splits a strip, and each piece is a face of the side's owner; `strips.ts`'s
      header says so.
    * **7 N-7 — FIXED, PINNED.** `departure` is exact to a stated tolerance: `DEPARTURE_TOL_CM` = 0.5 cm, never above the
      exact value (a distance from a set is 1-Lipschitz, so a stretch of half-length h about a point at distance d holds
      nothing farther than d + h; stretches are halved until none can beat the largest found by more than the
      tolerance). `sideDeparture` is the one-side form. Pin: `trace.test.ts` "reads a side's farthest point between metre
      samples" and §4.2 S3 (9)'s seed tests (the report within its tolerance of the 50 cm samples; mutant N7, the metre sampling restored, killed first by "seed 1: every gate vertex …").
      RELATED@1000 found the halving slow where a side lies on the ring (its distance 0 everywhere, so every stretch was
      halved to 1 cm: `trace.test.ts` "a gate site off its boundary …" 88 ms before the round, 6.5 s after, past vitest's
      5 s): `sideDeparture` now also prunes a stretch by a second bound — the distance from one side of the ring is convex
      along a segment, so on a stretch it is at most the larger of its two ends, and the ring's distance at most that for
      every side; the least such bound — with the same tolerance (the test 0.16 s; the item's tests and pins, `PINNED_OUTWARD`'s
      departure to the last digit, unchanged). Mutant BOUND (the bound taken at the smaller end) killed by "seed 1: every
      gate vertex …". Timings here are informative only (never gated).
    * **8 N-8 — FIXED (a fail-safety gap), PINNED.** The in-batch band proof read only the vertices the insertion placed
      for the trace (`ins.value.placed`); an existing vertex the insertion routed the wall through (§3.6 step 3) was not
      among them, so a contact 26 cm beyond the band could commit unseen. It now reads the wall's committed run whole and
      proves each side exactly (`sideDeparture`). Pin: `trace.test.ts` "a way's vertex 25 cm beyond that chord's farthest
      point, 40.18 m from the boundary … refused E_INVARIANT `band`, nothing written", with its twin "without the way the
      same trace commits" (mutant N04). Refined after RELATED@1000 (the lane's last part): the first form refused "band:
      the inserted trace is not one closed run" inside the batch, before the kernel's own `branches` check and the gate
      read-back, so six of M0-x-06's refused-safe cells (`testkit test/edge/repins.test.ts`: EP-01/S3 and S5a zero-area,
      collinear and self-touching) changed their refusal words (still refused, the arena restored). Now a wall the
      insertion left in more than one run is proved on the vertices it placed (the pre-round reading), its shape refused by
      the batch's `branches` or the gate read-back as before the round, and by `wallInPieces` after both (a backstop: a
      wall in pieces is never a committed trace). The in-batch proof runs `sideDeparture` from the band as its floor (a
      stretch is halved only while it could hold a point beyond the band by more than the tolerance). Pins: the six
      repins cells (mutant PLACED: the first form restored — six reds, killed); `wallInPieces` alone (mutant PIECES) is a
      backstop with no reachable case known (the six cells refuse earlier), like K05.
    * **9 N-9 — FIXED, PINNED.** The smoothing's result is rounded and then PROVED (`pull.ts`): a side the lattice's
      rounding carried out of the band or over a barred ring has its moved ends put back (rounded) until every changed
      side holds. The margins pinned each on its own (`pull.test.ts` "the smoothing's margins, each on its own"): the
      vertex clause at the band less the attraction distance (N12), `bandLimit`'s 1 cm (N10), the barred-ring vertex
      clause, the rounded points (RP). The reference ring pinned by `trace.test.ts` "the band measured from the boundary
      as given, never the ring after the water splice" — a chorded crossing on flat ground (the report's departure ≥ 16 m)
      and under an outward field (the line and its departure pinned) — N13 killed. Two of the row's mutants survive as
      equivalent in effect, probed: N06 (the smoothing measured against the spliced ring) leaves the committed line
      byte-identical on 195 chorded-crossing variants (bows 10 – 35 m; dents of 5 – 30 m at four places beside the river;
      five cost fields, outward, north-only, west-only, east-only) and on the item's tests — the pull leaves every vertex
      within the band of its own start on the spliced ring and the smoothing's steps toward its neighbours never reached
      the bow's 24 m; the pre-commit band proof reads `ring0` regardless (fail safe). N17 (the union rung's candidate not
      simplified before its verdict) leaves 30 union-rung variants (notch widths 50 – 75 m, ridges offset and sloped)
      byte-identical, verdicts and lines: the trace's own simplify runs on the rung's line after the rungs at the same
      bounds, and the booleans' outline carries no fold-back the simplify alone removes. KI for M4 if a probe finds either.
    * **10 N-10 — FIXED, PINNED.** `chordInWater` (water.ts) replaces the nine-sample test: the chord is cut at every
      meeting with a side of the water's rings, its holes (islands) among them; its middle must lie in the water, and a
      piece out of the water leaves it when a point of it lies farther than `WET_TOL_CM` (2 cm, the side test's own
      tolerance: the shore crossings are lattice roundings) from the shore. `waterRings` reads each water face's holes
      (`WaterRing.holes`, optional; additive). Pins: `water.test.ts` "a land spit 5 cm wide across the chord between two
      of its nine-tenths samples" (N14), "an island under the chord" (HOLES), "waterRings reads a water face's holes";
      `chord.test.ts` "a chord cutting a shore's tooth by a rounding's depth … keeps in the water (RIVER 900 ha seed 12)"
      (TOOTH: without the tolerance the base RIVER 900 ha seed 12 regressed to S5 E_SELF_INTERSECT in the first part).
    * **11 N-11 — FIXED, PINNED.** The rounded points proved (row 9), so the probe's pond commits dry instead of refusing:
      `sides.test.ts` "a pond under the smoothed corner side … the corner vertex stays home and the trace commits dry"
      and `pull.test.ts` "the rounded points proved" (RP). The in-commit edge proof (`committedWetEdge`, N-18's M23 /
      K06) is pinned by the attraction-onto-a-barred-edge fixture `trace.test.ts` "a way's vertex in the core 20 cm off
      the side: the wall routed through it lies over the core, so the batch is refused E_INVARIANT `water`, nothing
      written" (the detail verbatim) with its twin "without the way the same trace commits". With WATER in the core's
      place the path is unreachable from an L1 vertex: the insertion lays any vertex within `attractCm` of a shore onto
      the shore (probed: a way's vertex 10 – 20 cm into a pond 1 cm off the side lands on the shore at (x, −30001), and
      the wall commits dry through it), so the fixture's barred ring is a core ring 10 cm inside the side; the proof is
      one for both (its `every` and `reserved` sides)
      (K06; K07, both proofs off, killed by the same fixture). K05 (the pre-commit side proof alone) survives as a
      backstop equivalent in effect: every side of the committed line is proved dry by the step that made it (the pull's
      steps, K26; the smoothing's changed sides, RP; the rungs' `rungVerdict`; the simplify's `wet.firstOver`) or is a
      crossing's course (`crossWater` cuts every side at every shore meeting), and K06 refuses at the commit whatever
      reaches it; its only known reach (N-11's pond) is the one RP now commits dry. The 195 N06 variants run identical
      under K05.
    * **13 N-13 — PINNED.** `sides.test.ts` "only a side OF the ring lies on it" (K18) and "firstOver tests the closing
      side too" (K19).
    * **14 N-14 — PINNED.** `sides.test.ts` pins the replay's `report.pull` and line: `{ moved: 151, maxOffsetCm: 3974 }`,
      224 vertices (`REPLAY_PULL`); `pull.test.ts` "a step whose own side crosses the pond is never taken" (K26). The
      replay's `moved` reads 151 (150 before the round) because N-21 recaptured the fixture's costs about the settled
      bank (row 21): a DECLARED shift of the fixture's figure, the line's length and its water gates unchanged.
    * **15 N-15 — PINNED.** `chord.test.ts` P1 (a shore vertex near the EXIT bank, past the chord's last quarter) and P2
      (one near each bank, two rounds) (M27, M15).
    * **16 N-16 — PINNED.** `chord.test.ts` "a bank settled onto a shore vertex whose chord then leaves the water is no
      clear chord" (M14).
    * **17 N-17 — PINNED** (the defer-candidate kept, J238): `chord.test.ts` "waterGates(trace, water, k) reads the
      arena's vertices" — the bank settles on V; a way's vertex in the water nearer the bank, no shore's, leaves it
      unsettled (M20).
    * **21 N-21 — FIXED, PINNED.** `fixtures/relief60-s9-stage2.json` gains the seed's terrain costs about the settled
      bank; `sides.test.ts` and `chord.test.ts` assert misses 0 again (N21: the pre-round fixture restored).
    * **22 N-22 — PINNED; (b) made to succeed.** (a) `corridor.test.ts` TYPED_SEEDS 1149953023 and 3436289613: no
      untyped face in the strip zone. (b) Under RQ5 the hand twin with a vertex 110 cm in is no longer refused: the face is
      cut along the corridor's edge and the strips commit beside it (`corridor.test.ts` "a way along the trace 110 cm
      wide, off the trace's vertices"): a lawful input that refused before now succeeds (N-58, ZERO REFUSALS), so the fix
      shape's "refused" is superseded by the ruling. Z03 is pinned by `corridor.test.ts` "seed 3980833922: that face is wall_strip:2-outer" (family index 109: stage 2's
      outer face through (−14530, 2713) and (−14278, −1730) holds a vertex between 26 cm and the slack inside a corridor;
      under Z03 it is left `land:0` — the untyped-point oracle does not see it, so the pin names the face). Z04 is
      subsumed: the area clause (`deeperThan` over every side of the face's rings, its vertices among them, at the same
      slack, to 1 cm by halving) refuses any face with a vertex deeper than the slack by more than 0.5 cm; the family's
      indices 0 – 199 run byte-identical under Z04.
    * **23 N-23 — PINNED.** `corridor.test.ts` "a gate whose way runs inward only: the outer side's one face holds the
      gate's vertex, so the outer side is refused, named, nothing written" (Z10).
    * **24 N-24 — PINNED.** `corridor.test.ts` "a probe meeting open ground beyond the strip's width … refused, named"
      (Z12).
    * **26 N-26 — FIXED as RQ5 rules (rulings-hardening-1 §5), PINNED, DECLARED SHIFT.** (i) The stops: every way whose
      corridor runs inside a strip's band — the gate's way along its whole length (`commit.ts` hands each gate's route
      whole, run on to the frame, as `LayStripsOptions.corridors`; `stopsFromArena` reads the way chain through a gate's
      vertex whole), and every other way chain of the arena — is a stop where it runs inside the band beyond the stops'
      corridors by more than `CORRIDOR_SLACK_CM` (`intrudes`); the setback lines are capped along the corridor's edge and
      every other piece of a corridor's ring inside the band is laid as a setback chain of its own. (ii) Membership by
      area: a face is a strip's when it lies within the width (vertex clause first), on the trace's side of the setback
      line, holds no gate vertex nor a vertex deeper than the slack, and its interior meets no corridor (no point of its
      rings deeper than the slack, exactly by halving; no centreline vertex inside it). Pins: `corridor.test.ts` RQ5_SEEDS
      1842059696, 2537277803, 889845538 (stage 1), 1671642301 (stage 2) — 0 corridor points in a strip face, both sides
      typed (each covered 47 – 125 points before the round); the hand fixtures "a way run along the trace", "a face beyond
      the setback line is no strip" (BEYOND) and, each mechanism on its own, `corridor.test.ts` "RQ5 on hand fixtures": a
      way along the wall's outside given as a corridor whose faces inside it hold no vertex deeper than the slack (RQ5a:
      no corridor beyond the stops; RQ5b: no area clause), a gate's way read from the arena bending along the wall inside
      (RQ5c: the way chain through the gate's vertex not read), an arena way with no gate along the wall inside (RQ5d:
      the arena's other ways not read). The family seeds alone did not separate them: indices 0 – 199 under RQ5a, RQ5b and
      RQ5c keep refusals, P4 and the untyped points unchanged (RQ5a moves the strip faces of 3 seeds, RQ5b and RQ5c none),
      because the stops' own paths and the ring pieces carry the family's corridors; the hand fixtures reach each. Census
      and shift: row 49.
    * **28 N-28 — FIXED, PINNED.** The strip piece a cap closed past a deep trace vertex is now its own face cut along
      the corridor's edge and typed: `corridor.test.ts` TYPED_SEEDS 2704069009, 1793505783, 3435165676, 671252167,
      3568440702, 3709170404 — no untyped face in the strip zone (N28: the corridor ring pieces not laid). Over the 1 000
      family seeds the untyped-point oracle reads 0 (row 49).
    * **39 N-39 — PINNED.** A07: `commit.test.ts` "a way's vertex 10 cm off the boundary draws the trace onto it:
      commitS3Slice's warnings begin with the trace's W_ATTRACTED there"; A08: `commit.test.ts` "a 3 ha town … under a
      field pulling the line toward the plaza: the trace is held on its ring, never inside"; A11: `sides.test.ts` "the
      oracle reads a segment wholly inside the ring, far from its line, by its depth".
    * **40 N-40 — PINNED** (the defer-candidate kept): `pull.test.ts` "the vertex clause holds a vertex the pass would
      set beyond the band less the attraction distance (39.74 m), though both its sides keep the band (39.99 m)" (M06)
      and "… 1 cm inside a barred ring, though its sides touch the ring within the water's 2 cm" (M07).
    * **45 N-45 — DONE (comment only).** `water.ts`' and `chord.test.ts`' headers cite C-0300 (3) for the one-chord rule;
      `frame.test.ts`' and `sides.test.ts`' headers mark their fixtures' figures as counterfactual ("not what the code
      does").
    * **M0-c-04:138 19 N-19 — FIXED in c-02's owns; c-04's half REPORTED.** The chord refusal's detail now ends with the
      stable tag `[water: loose-gate]` (`trace.ts` `LOOSE_GATE_TAG`, a file-level export; the index and barrel unchanged);
      `chord.test.ts` pins the text verbatim and the tag's value (TAG). M0-c-04's `span.test.ts` pin 5 matches a prefix of
      the text and stays green (RELATED); the shape c-04 needs: match the tag (import `LOOSE_GATE_TAG` from
      `src/enceinte/trace.js`, or `/\[water: loose-gate\]$/`), not the coordinates — c-04 S4's.
    * **Q27 — FIXED, PINNED; the contract stated.** `layStrips` merges the stops it is given with the stops it reads from
      the arena: a read stop is dropped where a given stop names its gate (or, for water, its ring); a main gate read from
      the arena takes the given way stops' widest half-width (else `wayHalfWidthCm`). Pin: `strips.test.ts` "a gate the
      given stops leave out is stopped all the same" (Q27: the given stops alone).
    * **L31 — PINNED (Y07, Y12, Y15, Y17); Y13 / Z11 recorded equivalent; the guard is c-04's.** `bend.test.ts`: the
      U-shaped water entered and left by its inner shores — refused E_INVARIANT `water`, named, nothing written, never a
      gate over the peninsula (Y07); a routed chord settles as every chord does (Y12); a crossing ending on another water
      body is never routed on one ring's indices (Y15); a chord cutting a 20 cm land sliver 30 cm from its bank is not
      clear (Y17). Y13 (the shared-walk guard; the builder's Z11) is equivalent in effect on reachable input: a shared
      shore point needs walks round a river's end beyond the band (N-31). Each water gate takes the lowest free
      `gate:w<i>` (`trace.ts`, pinned by `bend.test.ts`' second trace, gate:w2 and gate:w3); removing c-04's
      `earlierWaterGates` guard is c-04's.
    * **Q46 / KI-10 — FIXED (MAKE-IT-SUCCEED), PINNED.** `bend.test.ts` "the base RIVER fixture from the north at seed 5":
      runBase commits every stage with no bug and no setback vertex of either enceinte in the water (S5a's strips check
      refused it before the round).
    * **Q52 — B and F FIXED (MAKE-IT-SUCCEED), C and D already lawful, E REPORTED (M1).** Before the round on this tree (M0-x-06's cells, 26 runs; `checks/hardening-inventory.md`'s
      Q52 seeds): B 17 lawful refusals over 16 runs (`closed no strip face` at S3 or S5, each a corridor the strips
      crossed: 957349493, 2306189499, 4102748823, 4210924515, 2806303556, 35167633, 281949303, 1908460072, 3629930494,
      636887255, 936491186, 1017919770, 1140569634, 1387994580 (two states), 2303806328, 2870428480) → 0; F 1
      (1933152649, S3 E_DEGENERATE `empty`) → 0; C (1409296145) and D (396602230, 765046355, 914597522, 3484178840)
      already commit on this tree (0 → 0); E 4 → 3: 1785777080, 1918289972 (the core), 3360356802 remain S3
      E_SELF_INTERSECT "F-WALL … the later rungs are M1's" — LAWFUL, REFUSE as notBuilt('M1') (§5.2 F-WALL; C-0085),
      REPORTED with their seeds, never built; 1523636832 no longer meets one (its stage-1 strips changed what the later
      trace meets).
    * **R-31 (census, c-01 S2) — FIXED, PINNED.** A strips chain shorter than the insertion's attraction distance is not
      laid (it bounds nothing the slack does not; the insertion would land it whole on existing vertices and refuse
      E_DEGENERATE `empty`): `corridor.test.ts` "seed 1933152649: S3 commits" (FLOOR).
48. **N-48 new findings of this round (for the session).**
    * N-26's P4 oracle in `support.ts` rebuilds a stage-k ≥ 2 stop along the trace's normal from the wall as committed
      (walking past setback ends); on family indices 19 (3443032966) and 87 (2251116277) that normal differs from the one
      M0-c-04's `stageStops` gave `layStrips`, and the oracle reads 22 and 41 covered points at stage 2. Instrumented, the
      stops `layStrips` was given read 0 at both stages on both seeds (and on all 1 000): an oracle artefact, not a strip
      over a corridor. The RQ5 pins read seeds where the two agree. KI: give the oracle the stops as given (M0-c-04's).
    * S4's committed arterial can leave the slice's route near a gate (e.g. 1842059696: the way skips route node
      (−13258, 2139)): the stage-1 corridors are read from the routes, so a way that departs from its route is a stop
      only where its chain runs (`intrudes` over the arena's way chains). A c-03 / c-04 note for the session.
    * The base set's seven remaining refusals are all F-WALL's (class E): RIVER 900 ha seeds 8 and 14, RIVER from the
      north 900 ha seeds 1 (the core) and 6, the default RIVER fixture seeds 3 and 4 at S5 and 5 at S3 — `E_SELF_INTERSECT`
      "the trace touches itself (crosses the core) after the re-offset and union-simplify rungs; the later rungs are
      M1's". Unchanged by the round (before 8 with KI-10); for M1's rungs, with their seeds.
    * `committedWetEdge`'s water branch is reachable only through a reservation or the core: the kernel's insertion
      lays a way's vertex within `attractCm` of a shore onto the shore (row 11's probe), so an L1 vertex never stands in
      the water within the attraction distance of a dry side. No code change; the proof stays as the last word.
    * **RELATED@1000's reds that the round cannot fix in its owns (for the session).** (a) `bench
      test/determinism/pair.test.ts` "every S1 and S4 entity survives identically …" (C-0090, seed 1, the site spike with
      the S5 reroll): green on the before image, red after — a fresh S8 junction (`junction:6nymg6w713p26`) and a fresh S8
      block (`block:2skgtzs7hxr50`) keep their own ids while the matcher hands the same old ids by succession (`by: point`,
      scores 74.7 and 70.2) to other fresh entities (`junction:3ab8743sbjpay`, `block:cmps09px73p0z`), so two fresh entities
      hold one address after the hand-on (the test's line 86; its `duplicateIds` and `silentRebinds` read 0, so they do not
      count this case). The round's declared shift moves seed 1's S8 output and so exposes it; the defect is the match's or
      the address minting's (`@plat/model` `match`, `bench/src/determinism` `mintAddresses`; M0-d-09's), not the strips' —
      REPORTED, never built here. (b) `testkit test/edge/repins.test.ts` "Q37's three seeds: the unplanted state's strips
      are refused … counted, the state replaced": the round makes those three lawful inputs succeed (Q37 → 0, row 49), so
      the census pin's `tries 2` / one lawful refusal now read `tries 1` / none — a stale pin of M0-x-06's, to be re-pinned as
      its neighbour "EP-01/S5a/coincident at Q22's seeds … is absorbed on its first state" is (handling `absorbed`, tries
      1, lawful []). (c) The same file's "EP-01/S5a/coincident at seed 1658509524: refused-safe …" (received `absorbed`) is
      red on the before image too: foreign, not the round's.
49. **N-49 the refusal census (J264 (4), N-58) and the declared shift, before → after.**
    * **The refusal census, before → after (each class by its input kind and verdict, N-58).** The before image's
      sources in the lane mirror against the round's, same probes, same seeds:
      | family (registered) | before | after | the refusals left |
      |---|---|---|---|
      | EP-01/S5a/coincident, unplanted, 1 000 seeds through S5 on SMALL_FLAT (`corridor.test.ts`' `throughS5`) | 3 (indices 156, 593, 956: S5 E_INVARIANT `closed no strip face`, Q37 / Q52 B; LAWFUL, MAKE-IT-SUCCEED) | **0** | — |
      | M0-x-06's cells, Q52's 26 runs (B, C, D, E, F) | 22 lawful (B 17, E 4, F 1) | **3** | E: 1785777080, 1918289972, 3360356802 (F-WALL, M1's rungs; LAWFUL, REFUSE notBuilt('M1'), reported) |
      | `runBase`: FLAT 900 ha 1 – 3, RIVER 900 ha 1 – 15, RIVER from the north 900 ha 1 – 6, RIVER default 1 – 6 (30 runs) | 8 (KI-10: from the north seed 5, S5 E_INVARIANT strips; seven F-WALL) | **7** | the seven F-WALL refusals of row 48 (class E, M1) |
      | total (distinct cells) | 30 (the family's three are Q52 B's EP-01/S5a/coincident control cells, the same seeds 957349493, 2306189499, 4102748823; 33 counted per family) | **10** | every one F-WALL's later rungs (M1) |

      The census never rose; it fell by 20 distinct cells, each a lawful input made to succeed (Q52 B 17 over 16 runs,
      the family's three Q37 cells among them; Q52 F 1; KI-10 1; 1523636832's E 1). Census R-31 (c-01 S2: R-31 1 → 1 and KI-10 1 → 1 handed to c-02 / c-04): both strips halves
      fixed here (R-31 is Q52 F's 1933152649).
    * **Re-measured on the final sources.** After the lane's last part changed `trace.ts` (N-8's run read) and `plane.ts`
      (`sideDeparture`'s bound), the three after-censuses were run again in the mirror: the family's 1 000 lines (each
      seed's refusal, P4, untyped points and the L0 – L4, strips, walls and ways digests), the edge cells' 26 and the base
      set's 30 are identical line for line to the runs above — no refusal, digest or shift figure moved.
    * **The P4 oracle and the untyped points (N-26, N-28) on the 1 000 family seeds.** Strip faces covering a stop's
      corridor point (deeper than the slack + 6 cm; the stops and corridors `layStrips` was given, instrumented): stage 1
      on 554 seeds before → 0; stage 2 on 3 → 0. Untyped strip-zone points: 0 → 0 by the oracle (the N-28 seeds and
      3980833922's face are pinned by name, row 47). The test oracle's own stage-2 stand-in reads 7 seeds after (10 before),
      an artefact of its normal (row 48), never a strip over a stop as given.
    * **DECLARED SHIFT (strip faces; the stage-2 walls and the ways they meet).** On the 1 000 family seeds: L0 identical on
      all; the L1 – L4 digests differ on 789 (the strip faces, their setback chains now capped along each corridor and
      cut by its ring pieces). The wall and way vertex lists differ on 88; with collinear vertices dropped the walls of 80
      and the ways of 30 still differ, measured by the Hausdorff distance between before and after: stage-1 walls at most
      0.83 cm (none above 1 cm: lattice re-seats where a new setback vertex meets them), stage-2 walls at most 28.5 cm
      (8 seeds above 1 cm: indices 686 28.5, 980 26.5, 900 18.7, 933 7.9, 278 7.4, 245 7.3 cm, …), ways at most 165.7 cm
      (5 above 1 cm: 278 `way:3` 165.7, 337 83.0, 796 55.2, 360 46.9, 900 43.3 cm) — the stage-2 trace and the later
      ways meet stage 1's changed setback vertices (the attraction, the router's costs). Indices 156, 593 and 956 now
      commit stage 2 (refused before). The pins re-recorded or newly set in this round, all in the item's owns:
      `sides.test.ts` `REPLAY_PULL` (`moved` 151, was 150: N-21's recaptured costs; line 224 and the water gates
      unchanged), `trace.test.ts` `PINNED_OUTWARD` (new). Outside the owns two tests move with the shift (RELATED, row 48): M0-x-06's Q37 census
      pin (stale: the three seeds now succeed) and M0-d-09's re-derivation pair (an address collision the new S8 output
      exposes); both REPORTED.
50. **N-50 the round's mutant table (J183; the lane mirror, each mutant on its pin files with `--bail=1`, `--maxWorkers=1`,
    restored by copy and `cmp -s` before the next).**
    47 targeted mutants (`--maxWorkers=1 --bail=1` on each mutant's pin files; restored by copy and `cmp -s` before the
    next, each `restored=True`); 42 killed, 5 survivors judged. RQ5a – RQ5d and Z03 re-run on the final `corridor.test.ts`;
    BOUND, PLACED, PIECES and N04 on the final `plane.ts` / `trace.ts` (the lane's last part).
      | id | row | file | the mutation | pin files | result (the first red test) |
      |---|---|---|---|---|---|
      | N7 | N-7 | plane.ts | `departure` sampled every metre again | trace.test.ts | KILLED — "seed 1: every gate vertex lies on the committed trace exactly; the trace departs from the boundary by ≤ 40 m everywhere" |
      | N04 | N-8 | trace.ts | the in-batch band proof finds no side | trace.test.ts | KILLED — "a way's vertex 25 cm beyond that chord's farthest point, 40.18 m from the boundary: the insertion routes the wall through it (§3.6 step 3) and the bat…" |
      | N06 | N-9 | trace.ts | the smoothing measured against the spliced ring | trace / water / sides | SURVIVED — equivalent in effect, probed (195 variants identical; row 47, 9) |
      | N10 | N-9 | plane.ts | `bandLimit` without its 1 cm | pull / trace | KILLED — "the side clause holds a vertex whose move keeps it inside 39.74 m when a side to a pinned vertex 39.945 m out is not proved within the band less one l…" |
      | N12 | N-9 | pull.ts | the smoothing's vertex clause at the band + 10 m | pull.test.ts | KILLED — "the vertex clause holds a vertex the pass would set beyond the band less the attraction distance (39.74 m), though both its sides keep the band (39.99…" |
      | N13 | N-9 | trace.ts | `report.departureCm` against the spliced ring | trace.test.ts | KILLED — "on flat ground the trace keeps the chord and the report reads its departure from the boundary as given: 16 m and more" |
      | N17 | N-9 | trace.ts | the union rung's candidate not simplified | fwall / trace | SURVIVED — equivalent in effect, probed (30 variants identical; row 47, 9) |
      | RP | N-9/N-11 | pull.ts | the rounded points not proved | pull / sides | KILLED — "the rounded points proved (N-9, N-11): a side 1.7 cm deep in a pond on doubles and 2.04 cm deep once its moved end is rounded keeps that end where it …" |
      | M06 | N-40 | pull.ts | the smoothing's band vertex clause off | pull.test.ts | KILLED — "the vertex clause holds a vertex the pass would set beyond the band less the attraction distance (39.74 m), though both its sides keep the band (39.99…" |
      | M07 | N-40 | pull.ts | the smoothing's barred-ring vertex clause off | pull.test.ts | KILLED — "the vertex clause holds a vertex the pass would set 1 cm inside a barred ring, though its sides touch the ring within the water's 2 cm" |
      | K26 | N-14 | pull.ts | a ramp step's sides swapped | pull / sides | KILLED — "a step whose own side crosses the pond is never taken: the pulled line keeps off it, the pin unmoved" |
      | M34 | N-4 | plane.ts | `selfTouches`' adjacent fold-back clause off | fwall.test.ts | KILLED — "the detection's fold-back clause alone: a sliver triangle (every pair of its sides adjacent) folds back on itself; a right triangle does not (N-4, M34…" |
      | K18 | N-13 | wet.ts | a side of the ring never on it | sides.test.ts | KILLED — "only a side OF the ring lies on it: a side between two of its vertices that are not neighbours crosses the water (N-13, K18)" |
      | K19 | N-13 | wet.ts | `firstOver` skips the closing side | sides.test.ts | KILLED — "firstOver tests the closing side too: a line whose only wet side runs from its last vertex to its first (N-13, K19)" |
      | A07 | N-39 | commit.ts | the trace's warnings dropped | commit.test.ts | KILLED — "a way's vertex 10 cm off the boundary draws the trace onto it: commitS3Slice's warnings begin with the trace's W_ATTRACTED there" |
      | A08 | N-39 | commit.ts | the plaza not handed to the trace | commit.test.ts | KILLED — "a 3 ha town (its plaza 26.8 m inside the outline) under a field pulling the line toward the plaza: the trace is held on its ring, never inside" |
      | A11 | N-39 | test support.ts | `depthOf`'s far-side shortcut reads 0 | sides.test.ts | KILLED — "the oracle reads a segment wholly inside the ring, far from its line, by its depth (N-39, A11)" |
      | TAG | N-19 | trace.ts | the chord refusal without `[water: loose-gate]` | chord.test.ts | KILLED — "the twin whose chord the insertion splits — a stage-1 wall stub crossing gate:w0's chord in the water, 3 m each side — is refused inside the batch (th…" |
      | M15 | N-15 | water.ts | `SETTLE_ROUNDS` 1 | chord.test.ts | KILLED — "P2: one such vertex near each bank — both banks settle, over two rounds, and the chord V → W is clear (N-15, M15)" |
      | M27 | N-15 | water.ts | a settling vertex past the chord's three quarters ignored | chord.test.ts | KILLED — "P1: a shore vertex near the EXIT bank, past the chord's last quarter, takes the exit; the chord from the bank to it is clear (N-15, M27)" |
      | M14 | N-16 | water.ts | a settled chord leaving the water kept | chord.test.ts | KILLED — "a bank settled onto a shore vertex whose chord then leaves the water is no clear chord (N-16, M14)" |
      | M20 | N-17 | water.ts | `waterGates` without the arena's vertices | chord.test.ts | KILLED — "waterGates(trace, water, k) reads the arena's vertices (N-17, M20): the bank settles on V; a vertex of a way in the water nearer the bank than V, no s…" |
      | N14 | N-10 | water.ts | the chord-in-water test at nine samples, outer ring only | water.test.ts | KILLED — "a land spit 5 cm wide across the chord between two of its nine-tenths samples: the chord is not taken" |
      | HOLES | N-10 | water.ts | the water's holes not read | water.test.ts | KILLED — "an island under the chord, above the course: the chord crosses the hole's ring and is not taken; the same river without the island takes it" |
      | TOOTH | N-10 | water.ts | no tolerance for a shore's tooth | chord.test.ts | KILLED — "commits with every water gate's chord one wall edge from gate_end 0 to gate_end 1: 0 ungated wet sides under the strict reading" |
      | Y07 | L31 | water.ts | the chord's middle not tested in the water | bend.test.ts | KILLED — "the crossing has no chord in the water and no bank route within the band clears one: refused E_INVARIANT `water`, named, nothing written — never a gat…" |
      | Y12 | L31 | water.ts | a routed chord taken clear unsettled | bend.test.ts | KILLED — "a routed chord settles as every chord does (Y12): a way's vertex in the water 10 cm off it, no shore's, leaves it not clear — refused before the pull,…" |
      | Y15 | L31 | water.ts | a route across two water bodies on one ring's indices | bend.test.ts | KILLED — "a crossing that enters one water body and ends on another's shore is never routed on one ring's side indices (Y15): its chord leaves the water, no rou…" |
      | Y17 | L31 | water.ts | the shore tolerance 50 cm | bend.test.ts | KILLED — "crossWater: a chord through a thin land needle between its nine samples is not clear — another pair is taken, its chord crossing no shore" |
      | N21 | N-21 | fixtures/relief60-s9-stage2.json | the pre-round fixture (costs not recaptured) | sides / chord | KILLED — "commits with every water gate's chord one wall edge from gate_end 0 to gate_end 1: 0 ungated wet sides under the strict reading" |
      | Q27 | Q27 | strips.ts | the given stops alone (no merge) | strips.test.ts | KILLED — "a gate the given stops leave out is stopped all the same, its way read from the arena at the given stops' half-width; a given stop keeps its own path" |
      | Z03 | N-22 | strips.ts | the vertex clause at `attractCm` | corridor.test.ts | KILLED — "seed 3980833922: that face is wall_strip:2-outer" |
      | Z04 | N-22 | strips.ts | the vertex clause at twice the slack | corridor.test.ts | SURVIVED — subsumed by the area clause (row 47, 22) |
      | Z10 | N-23 | strips.ts | the outer side's corridor clauses off | corridor.test.ts | KILLED — "a gate whose way runs inward only (N-23): the outer side's one face holds the gate's vertex, so the outer side is refused, named, nothing written" |
      | Z12 | N-24 | strips.ts | the strip-width clause off | corridor.test.ts | KILLED — "a probe meeting open ground beyond the strip's width (N-24): the glacis line cut away by the frame on the west and no border laid, the outer side's on…" |
      | RQ5a | N-26 | strips.ts | no corridor beyond the stops (given corridors and arena ways) | corridor.test.ts | KILLED — "a way along the wall's outside, its corridor over the trace (given as a corridor, no gate on it): the faces inside the corridor hold no vertex deeper …" |
      | RQ5b | N-26 | strips.ts | no area clause (`deeperThan`) | corridor.test.ts | KILLED — "a way along the wall's outside, its corridor over the trace (given as a corridor, no gate on it): the faces inside the corridor hold no vertex deeper …" |
      | RQ5c | N-26 | strips.ts | the gate's way chain not read (`wayThrough`) | corridor / strips | KILLED — "a gate's way read from the arena bends along the wall inside: the way chain through the gate's vertex is read whole, and the strips stop at its corrid…" |
      | RQ5d | N-26 | strips.ts | the arena's other ways not read | corridor.test.ts | KILLED — "a way of the arena with no gate on it runs along the wall inside: read from the arena at `wayHalfWidthCm`, its corridor stops the strips there" |
      | BEYOND | N-26 | strips.ts | the setback-line side clause off | corridor.test.ts | KILLED — "a face beyond the setback line is no strip however near the trace its vertices stand (RQ5, by area): the town inside a closed inner setback stays unty…" |
      | N28 | N-28 | strips.ts | the corridor ring pieces not laid | corridor.test.ts | KILLED — "a way run along the trace (RQ5): the strips stop at its corridor along its whole length — the corridor's own face, holding the gate's vertex, is no st…" |
      | FLOOR | R-31/Q52 F | strips.ts | a chain below `attractCm` laid | corridor.test.ts | KILLED — "seed 1933152649: S3 commits (refused E_DEGENERATE `empty` before the round — the insertion of a ~15 cm inner chain), both strips typed" |
      | K05 | N-11 | trace.ts | the pre-commit side proof off | sides / trace / pull | SURVIVED — a backstop, equivalent in effect (row 47, 11) |
      | BOUND | N-7 | plane.ts | `sideDeparture`'s convex bound taken at the smaller end | trace.test.ts | KILLED — "seed 1: every gate vertex lies on the committed trace exactly; the trace departs from the boundary by ≤ 40 m everywhere" |
      | PLACED | N-8 | trace.ts | a wall in more than one run refused inside the batch (the first form) | testkit edge/repins.test.ts (RELATED) | KILLED — six refused-safe cells' words ("is not on the committed trace at its point", "branches: a linear role forms simple chains or rings") |
      | PIECES | N-8 | trace.ts | `wallInPieces` never true | trace.test.ts, repins (RELATED) | SURVIVED — a backstop, no reachable case known (row 47, 8) |
      | K06 | N-11/N-18 | trace.ts | the in-commit edge proof off | trace.test.ts | KILLED — "a way's vertex in the core 20 cm off the side: the wall routed through it lies over the core, so the batch is refused E_INVARIANT `water`, nothing wri…" |

    The gates on the round's final tree (W = 1, `tools/test_budget.py`): `install --frozen-lockfile` 0; `lint` 0 (eslint
    1184 files, probe-red ok, nine whole-tree checks); `build` 0; NEAR, the item's folder `test/enceinte/` (12 files) at
    full strength: 169 / 169; RELATED@1000 over the round's seven source files (`commit.ts`, `plane.ts`,
    `pull.ts`, `strips.ts`, `trace.ts`, `types.ts`, `water.ts`): 224 test files (bench 40, layout 97, testkit 87, the set
    vitest's own related selection gives), run one vitest run per file at `PLAT_FUZZ_RUNS=1000`, W = 1, each detached with
    its own log and done-file (the managing seat's instruction after two container restarts: the split is scheduling
    only, the same tests and seeds as one `vitest related` run): 2 859 passed, 3 failed — `bench test/determinism/pair.test.ts`
    (1) and `testkit test/edge/repins.test.ts` (2), row 48's (a) – (c), each REPORTED (outside the owns; (c) red on the
    before image too). The first full pass on the sources before this part's two changes had found those and two more
    (`trace.test.ts`'s 5 s timeout and six repins words; row 47's N-7 and N-8 entries), fixed here and green on the rerun. The
    J176 Mac-reference files and the known foreign `fusion/hausdorff` are not in the set; `ladder-coverage/entry` is, and
    is green in the tree.
51. **N-51 the managing seat's ruling J601 on the round's blocked landing (2026-10-28 07:34Z), applied.** The build had
    LANDED at 07:30Z blocked on row 50's three RELATED@1000 reds; J601 judged them and extended the owns by one test.
    * **Q37 re-pinned (J601 (b); Q37 resolved by this round).** `testkit test/edge/repins.test.ts`'s census pin "Q37's three
      seeds: the unplanted state's strips are refused …" was a stale pin whose subject this round changed on purpose (row
      49: the family's three lawful refusals made to succeed, 3 → 0). J601 extends the item's owns by
      `plat/packages/testkit/test/edge/repins.test.ts` for that one test only (named in `landed/M0-c-02.json`'s owns and
      notes); it is re-pinned to the committed outcome in the form of its Q22 neighbour: "Q37's three seeds 957349493,
      2306189499 and 4102748823: EP-01/S5a/coincident commits on its first state (M0-c-02 s5)" — handling `absorbed`,
      tries 1, lawful `[]` — and the file's header comment says so (Q37's seeds once refused at S5, now committing; C-0448,
      J601). No other test of the file was touched. Re-run (`PLAT_FUZZ_RUNS=1000`, W = 1): 24 / 25 passed, the one red
      the foreign coincident pin below.
    * **Declared red, Q124 (J601).** `bench test/determinism/pair.test.ts:86` ("every S1 and S4 entity survives
      identically …", seed 1): the hand-on gives one old id to two fresh entities (`junction:6nymg6w713p26`) and its
      counters (`duplicateIds`, `silentRebinds`) miss the case — the matcher's defect, exposed by this round's declared
      shift; opened as Q124 for M0-d-09's next round. A DECLARED RED on the design tree until that round lands: not fixed,
      not pinned, `bench/src/determinism` and `@plat/model` untouched. Re-run (`PLAT_FUZZ_RUNS=1000`, W = 1): 8 / 9
      passed, red at `:86` only.
    * **Foreign (J601 (c)).** repins' "EP-01/S5a/coincident at seed 1658509524: refused-safe …" (received `absorbed`) is
      red on the before image too: Q106's (M0-e-03 S1's in-flight work). Nothing for this item.
    * The gates after the re-pin (W = 1): `install --frozen-lockfile` 0; `lint` 0 (eslint 1184 files, probe-red ok);
      `build` 0; NEAR `test/enceinte/` 169 / 169. RELATED@1000 is not re-run (row 50's 224 per-file runs stand; only the two
      files above were re-run, as J601 says). C-0448 (18) amended to record the ruling.

## Closing check of hardening round S5 (`check/M0-c-02-close-s5`, 2026-10-28)

Every row of the round is confirmed (`M0-c-02-s5.md`, PASS). These notes come from this lane's own 50 mutants and its
probes in the mirror `/home/user/maps-scratch/waves/check-M0-c-02/s5/after/` (the probes `packages/testkit/zz-probe/
{edge,family,base,p4given}.ts` and `packages/layout/zz-probe/centre.ts`, the mirror's only additions). Under N-48 and the
blocker rule the KI rows are test-gap notes on code the probes confirm correct, not blockers; N-52 and N-56 are for the
session.

52. **N-52 session + KI: an arena way whose run ends inside a strip's band refuses the side (a lawful-input refusal
    outside the registered families; MAKE-IT-SUCCEED candidate).**
    * Observation (probe `centre.ts`, real code): a 400 m square trace with no gate and one arena way chain (role `way`,
      no gate on it) 20 m long parallel to the wall 7.5 m outside it (its 14 m corridor at `wayHalfWidthCm` 700 wholly
      inside the outer strip's band); `layStrips` with no given stop is refused E_INVARIANT "layStrips: a side's lines
      closed no strip face — the outer side: vertex (-20750, -1000) is way:short's gate vertex (the face crosses its
      corridor)", nothing typed. The same with the way 60 m long, and with the way inside the wall at 4 m (the inner
      side refused). Cause (read): `strips.ts` gives an arena way read as an extra stop `at: run[0]`, and `whyNot`'s
      gate-vertex clause (`v.x === st.at.x && v.y === st.at.y`) reads the way's END vertex as a gate's; the insertion lays
      the corridor's flat-cap chain through that existing vertex (§3.6 step 3), so the strip face beside the corridor
      holds it and is barred, and a side whose only face holds it is refused. **CONFIRMED** (probe, read).
    * Input kind: LAWFUL (an L1 way chain ending inside the band is lawful geometry); OUR OWN INTERMEDIATE if a stage
      lays a dead-end lane inside a later enceinte's band. Not reached by the registered families: this seat's census
      (family indices 0 – 999 and Q37's seeds, Q52's 26 cells, the base set's 30 runs) reads no such refusal, and the
      refusal is typed and fails safe (nothing written).
    * Suggested handling: the gate-vertex clause only for a stop that names a gate of the enceinte (a sentinel `at` for
      an arena way, or the clause keyed on `enceinte.gates`); a pin with this probe's fixture (the strips beside the
      corridor typed, the corridor's own face not). The hardening pass (M4), or earlier if a census seed meets it.
53. **N-53 KI: the centreline clause of the area rule is not isolated by a pin (mutant CENTRE; M4).**
    * Observation: `whyNot`'s third area clause (a corridor's centreline vertex inside the face, deeper than the slack)
      survives the item's tests. On N-52's fixture it is shadowed by the gate-vertex clause (identical refusal with and
      without it). It is load-bearing for a corridor wholly inside a band whose end vertices lie in no band face (a
      given corridor, or an arena way once N-52 is fixed): the corridor's own face has every vertex and side on its ring
      (depth 0, so the vertex and `deeperThan` clauses pass) and only the centreline inside it — without the clause that
      face would be typed `wall_strip`. **CONFIRMED** (survival, probe); the reach **PLAUSIBLE** (read).
    * Suggested handling: a pin with a given corridor 20 m long parallel to the wall inside the outer band: the
      corridor's own face never typed, the strips beside it typed.
54. **N-54 KI: N06 and N17 survive as equivalent in effect (M4).**
    * N06 (the smoothing measured against the water-spliced ring instead of the boundary as given) survives trace,
      water and sides. Reasoned: every free vertex starts on the boundary as given (a chord's only vertices are its
      pinned banks; a routed crossing's walked points are kept), the pull's offsets are bounded from that start and the
      passes move a vertex toward neighbours that keep the band; beside a chord the spliced ring is nearer, so the
      smoothing is more permissive by at most the bow's depth, and the pre-commit proof against `ring0` refuses such a
      trace (fail safe, never a wrong commit). N17 (the union rung's candidate not simplified before its verdict)
      survives fwall and trace: the trace's own simplify runs on the rung's line after the rungs at the same bounds; an
      outline the verdict refuses unsimplified costs a refusal. The builder's 195 and 30 variants were byte-identical.
      **CONFIRMED** (survival); the equivalence **PLAUSIBLE** (read).
    * Suggested handling: a chorded crossing with a deep bow under an outward field where the two margins differ; a
      union-rung outline the verdict refuses unsimplified.
55. **N-55 KI: `traceWithStrips`' hand-over of each gate's whole route as `corridors` is not isolated (mutant CORR; M4).**
    * Observation: dropping `corridors` from `commit.ts`' `layStrips` call survives `corridor.test.ts` (47 s): the RQ5
      seeds' arterial bends lie within the stop's own path (`WAY_SPAN_NODES` = 4 nodes, about 100 m, each side of the
      gate), and the arterial through a gate's vertex is not read as an arena extra (`gateAt`), so only a route that
      re-enters the band farther than that from its gate reaches the hand-over. `layStrips`' own handling of a given
      corridor is pinned (RQ5a's hand fixture). **CONFIRMED** (survival, read).
    * Suggested handling: a fixture whose arterial re-enters the band beyond `WAY_SPAN_NODES` from its gate.
56. **N-56 session notes.**
    * Every arena way read as an extra stop takes the widest given way stop's half-width (`widest`, C-0448 (10)), not
      its own class's: a narrower way's corridor is over-stopped by up to the difference — fail safe (never a strip over
      a corridor), a quality shortfall for the pass that gives `layStrips` each way's width (the kernel's spine widths or
      the Way records; M0-c-04's `stageStops` or M4). **CONFIRMED** (read).
    * C-0448's header says "DECLARED SHIFT (strip faces only)" while its body declares the stage-2 walls (≤ 28.5 cm on
      8 of 1 000 family seeds) and the ways (≤ 165.7 cm on 5) moving with them; the body is the record.
    * `corepack pnpm landed:verify -- flow-7 --item M0-c-02` exits 1 on one line, `repins.test.ts` outside M0-work.json's
      owns of M0-c-02 — J601's extension, until the session records it (in `M0-work.json`, or by taking the one
      re-pinned test back into M0-x-06's owns at its next round). Every other path and every hash verified (27 / 27).
    * The test oracle `coveredCorridorPoints` reads 22 – 74 stage-2 points on seven of the 1 000 family indices (19
      3443032966, 87 2251116277, 395 1021673811, 459 3378976297, 464 2785212533, 729 2505145090, 950 3187772940 — the
      builder's seven, N-48 (1)); with `strips.ts` instrumented in the mirror to publish the stops and corridors
      `layStrips` was given, P4 along those paths reads 0 on all seven (7 295 – 9 630 stage-2 corridor points each; 8 090 –
      8 870 at stage 1) — the oracle's own stage-2 normal, not a strip over a stop. **CONFIRMED.** KI: give the oracle the
      stops as given (c-04's `stageStops`).
    * The builder's L-0700 discloses one read-only `git log -1` at the lane's start (a working-rule slip, no content
      outside rule 1 reached it); the session records it. This seat: one non-recursive `ls docs/ | head` listed file
      names of the project's `docs/` folder (nothing opened); for about four minutes two of its own probes ran at once
      (the base census's last run and the P4-given probe, then the family census 300 – 999) when a wait on the base
      census's done-file timed out and was read as done — probes of its own, no test of the tree; no other overlap.
    * RELATED@1000's reds, each ruled before this check: (a) `bench determinism/pair.test.ts:86`, seed 1 — the declared red Q124 (J601), M0-d-09's matcher, exposed by the round's shift; (b) `testkit edge/repins.test.ts`' coincident 1658509524 — foreign, Q106 (red on the before image too). Nothing else red in 224 files (2 860 tests).

## Hardening round S6 (lane `build/M0-c-02-fix-s6`, 2026-10-31 – 11-01) — the builder's rows

The session's hardening round S6 of the item (J670; J637 RL2 and RL12) on the queue rows Q131, Q132, Q87 (c-02's copy),
Q122's S3 class (the enceinte's share, with e-06 S3's new `E_DEGENERATE` class), Q88 with Q46 (F-WALL's part) and RL2's
proof. Choices row C-0474 names every row it closes; ledger row L-0763. The lane ran in three parts (2026-10-31
02:56 – 03:25 and 04:06 – 09:08 in one container, 2026-11-01 from 18:47 in another, under the CONTINUE RULE): the
round's sources and tests stood in the tree from the second part; the third rebuilt the lane mirror
`/home/user/maps-scratch/waves/selfcheck-build-M0-c-02-fix-s6/` (isolation proved: no link out of it; `@plat/kernel`'s
realpath inside it), ran the mutants, the remaining NEAR files, RELATED@1000, the e-06 S5 sweep and the records, and
removed the mirror at the end. The figures below from the second part are its CHECKPOINT lines' (2026-10-31 04:16 –
09:08), the rest this part's own runs.

57. **N-57 row by row: the outcome, its evidence and its pin (the mutants in N-62).**
    * **Q131 (N-52) — FIXED, MAKE-IT-SUCCEED, PINNED.** An arena way read as a corridor stop (`strips.ts`, the arena's
      ways with no gate of this enceinte on their run) is kept in `arenaExtras`, and `whyNot`'s gate-vertex clause reads
      only a stop that is not one of them: the end vertex of a gateless way is no gate's. The side's strip stops at the
      run's corridor, its flat caps where the trace crosses the corridor's rings, as for any stop. The probe's input
      (N-52's 400 m square, a gateless way 20 m and 60 m long 7.5 m outside the wall, and 4 m inside) is the registered
      hand record `test/enceinte/fixtures/n52-gateless-way.json`; `ways.test.ts` "an arena way with no gate whose run
      ends inside a strip's band" commits each case (both strips typed, the corridor's own face not, the other side's
      strip beside the stretch typed). Red without the fix: mutant M131 refuses with N-52's message verbatim. The family
      census unchanged: the clause was reached 0 times on the 1 000 family indices (an instrumented count, 2026-10-31
      06:31), so no committed output moves.
    * **Q132 (N-56) — FIXED in `layStrips`, PINNED; the S5 caller's records REPORTED to M0-c-04.** `LayStripsOptions`
      gains an optional `ways` (the arena's Way records, `Pick<Way, 'id' | 'width'>`): an arena way with a record is cut
      by `localStretches` into stretches of one corridor half-width — a scalar width one stretch at its half; a
      `width_knot` profile (§2.4; S4's class runs) read along the run by arc length, each side at the widest value the
      profile reaches on it — so the strip beside a narrow stretch stops at that stretch's corridor, not the widest. A way
      with no record keeps `wayHalfWidthCm` (or the widest given way stop's), as before: the option is additive and its
      absence is the old behaviour byte for byte. Pins: `ways.test.ts` "an arena way's corridor at its local width" (the
      profile read along the run: 300 cm then 700 cm; with the records the outer strip beside the 6 m lane's stretch is
      typed 4.5 m out, beside the 14 m street's stretch not; without them both not). Red without the fix: M132a (the
      records ignored) and M132b (every stretch at the profile's widest). No caller in the item's owns meets an arena
      way at the strips (`commit.ts`' S3 slice lays the strips before S4's ways exist), and the S5 caller
      `growth/boundary.ts:587` (M0-c-04's) passes no records: wiring `ways` there is M0-c-04's (its `stageStops`, N-56's
      own suggestion) — REPORTED. So no committed output moves at this round: no DECLARED shift, no digest or golden
      re-recorded; the shift lands with the caller's wiring, declared by its round.
    * **Q87, c-02's copy (m-01 S1's L30) — FIXED, PINNED.** `water.ts`' `generated(epoch)` returns @plat/model's
      `generatedLifecycle(epoch)` (the hand-written copy removed). Pins: `water.test.ts` "the generated lifecycle stamp is
      @plat/model's one builder" — deep-equal at epochs 0, 7 and 2^40, a fresh object per call, −0 written as 0; an
      unlawful epoch (−1, 1.5, NaN, +∞, 2^53) refused with the builder's own RangeError text. Red without the fix: M87.
      No behaviour change (the copy's fields equalled the builder's at every lawful epoch).
    * **Q122's S3 class, the enceinte's share — FIXED, MAKE-IT-SUCCEED for every seed, PINNED seed by seed.** Every S3
      message of e-06 S3's lists was attributed by re-deriving it on the tree with the stage's sites instrumented
      (2026-10-31 03:13 – 04:16): all 122 refused runs are the enceinte's — `traceBase`'s F-WALL refusal (relief-60 32
      seeds × 2 configurations, relief-3000 4 × 2) and `layStrips`' `E_DEGENERATE empty` (relief-3000 25 × 2) — and none
      the siting's: on the six F-WALL seeds probed (relief-60 16, 19; relief-3000 4, 49, 54, 168) M0-c-01's boundary
      was a simple ring and its identity trace lawful, and every one of the 122 commits S3 once the trace's own steps
      are undone (below), which no siting defect would allow. Input kind:
      the fixtures are lawful by construction, and each refusal is OUR OWN INTERMEDIATE: (a) the pull's own crossings —
      its candidates move each vertex along its own normal, so at a sharp bend two offsets cross (the boundary as given
      simple); (b) on five runs (relief-60 default 67 and 197, coarse 67, 84 and 149) the water splice keeps a graze's
      cut point 1 – 8 cm from the shore vertex it meets, the side between them shorter than the touch distance; (c)
      `layStrips` inserting a two-point setback chain 26 – 34 cm long whose ends the insertion's attraction lands on one
      vertex (§3.6 step 2: refused `E_DEGENERATE empty`, nothing written). THE FIXES: where neither of F-WALL's M0 rungs
      holds on the pulled line, steps (2) – (3) run again with their own crossings undone — the pull untangled
      (`untangle`: the offsets at touching sides halved, under 50 cm none, until no pair touches), then the boundary
      unpulled, each smoothed kept simple (`smoothKeptSimple`: a pass's move that would make a side touch another is put
      back), then the boundary unpulled and unsmoothed, the rungs once more on a line still showing a defect — and the
      same on the ring with its points closer than the attraction distance merged (`mergedNear`: never a gate, a
      crossing's bank or a point whose replacement side would lie over the water); the first line passing every check of
      a rung's trace (`rungVerdict`: no self-touch, no core crossing, no water, the 40 m band) is taken. A collapsed chain
      (c) bounds nothing and is not laid, as the pre-filter's sub-attraction chains are not (R-31). AFTER (2026-10-31
      05:12 – 07:41): S3 refusals 122 → 0; of the 122 runs 116 commit S1 – S6, 4 refuse at S5 in F-WALL's later-rung
      class (relief-60 default 31, coarse 20, 44, 67; N-58) and 2 at S6 (relief-3000 seed 166, both configurations:
      `settlementPerimeter`, the kernel's notBuilt #2 — M0-e-04's, REPORTED; Q133's class). Pins: `s3seeds.test.ts`
      (all 122 derivations through S1 – S3 on the committed tree, S4 on stubbed; each: no bug, the wall one simple closed
      run, both strips typed. THE COST: 15 – 90 s each at one worker here, about 60 – 90 minutes at full strength; at
      reduced strength each cell's first seed only), `fwall.test.ts` "the pull's own crossings undone" (a 10 m notch
      untangled; two fast-check properties: any pull on a simple ring untangles to a line no two sides of which touch,
      and the smoothing kept simple leaves a simple line simple with its pins exact; and this part's added case, the
      smoothing kept simple where the smoothing as built makes the line cross). Red without the fixes: MF1, MF2, MF3,
      MF4, MD1. The message of the residual class now names `notBuilt('M1')` (C-0474 (6)), pinned verbatim by
      `fwall.test.ts` (the core case and the 20 cm slot) and `s5seeds.test.ts`.
    * **Q88 with Q46, F-WALL's part — FIXED for the M0 rungs, the later rungs CARRIED with proof (C-0474 (5), (6)).**
      Every seed of the three sources is classed by rung in N-58; the M0 rungs' seeds commit and are pinned
      (`s5seeds.test.ts` "F-WALL's M0 steps"); the later rungs' seeds refuse typed with the message pinned verbatim
      (`s5seeds.test.ts` "F-WALL's later rungs (M1)"); e-06 note 25's seed 151 is M0-c-04's S5a message (REPORTED).
    * **RL2's proof — WRITTEN** in C-0474 (6), the four parts of N-64 (4) / J238 (1): the class by rung, the design
      text that names the rung, the seeds per rung, the M0 bars that do not depend on them. No seed's rung fell outside
      the design's text, so nothing is reported to the session under RL2's last clause.

58. **N-58 every seed of the three sources, by rung (the after side re-derived on the tree through S5).**
    | source | blueprint, configuration | seed | before | after | rung |
    |---|---|---|---|---|---|
    | Q46 / N-33 | `runBase` RIVER 900 ha / 30 ha walled | 8, 14 | S5 F-WALL E_SELF_INTERSECT | S1 – S5 commit | M0 (OUR OWN INTERMEDIATE: the pull's crossings) |
    | Q46 / N-33 | the same | 12 | S3 E_INVARIANT "gate:2 not on the committed trace" (R-28) | S1 – S5 commit | — (commits on this tree; pinned) |
    | Q46 / N-33 | RIVER_BLUEPRINT | 3, 4 | S5 F-WALL | S1 – S5 commit | M0 |
    | Q46 / N-33 | RIVER_BLUEPRINT | 5 | S3 F-WALL | S1 – S5 commit | M0 |
    | Q46 / N-33; Q88 | the relief-60 site spike, default | 2 | S5 F-WALL | S1 – S5 commit | M0 |
    | Q88 (N-s2c-4) | the relief-60 site spike, default | 1 | S5 F-WALL | S5 F-WALL, `notBuilt('M1')` | later: §5.2's anchor rung (the stage-2 boundary as given crosses the core) |
    | Q88 under R12-5 | the relief-60 site spike, coarse | 1 | S5 F-WALL (a graze's two shore points 19 cm apart) | S1 – S5 commit | M0 (mergedNear) |
    | Q46 / KI-10 (R-30) | RIVER from the north 900 ha | 1, 6 | S5 F-WALL | S5 F-WALL, `notBuilt('M1')` | later: the anchor rung (the residual's message: 1 crosses the core, 6 touches itself) |
    | e-06 note 25 | the relief-60 site spike, coarse | 151 | S5 E_INVARIANT | S5 E_INVARIANT "S5a: the gate vertices could not be put on their ways: S5a: the stage boundary crosses bridge:24's span at (25597, 119863) with 0 of its deck ends on the stage's side; its gate is the bridgehead on that side (N-54 (3))" | none of F-WALL's: raised in `growth/boundary.ts:676` (M0-c-04's S5a gate plan) — REPORTED to c-04 S5 with this message; default 151 commits |
    The later-rung seeds that reached S5 only after the round's S3 fix (relief-60 default 31, coarse 20, 44, 67) are
    pinned in the same block. Instrumented (a separate copy of the tree, the refusal site logging the boundary as given
    and the spliced ring against the core; this part): relief-60 default 1, 13, 42, 62, 84 and 91 — in each the stage-2
    boundary as given is simple and crosses the core (two core rings: enceinte:1 and the plaza), the spliced ring then
    self-touching (and the 12 more of N-60: all 18 of e-06's S5 later-rung seeds). **CONFIRMED** (re-derived;
    instrumented).

59. **N-59 the refusal census (J264 (4), N-58), before → after, split by rung.**
    | family (registered) | runs | before | after | the after side by rung |
    |---|---|---|---|---|
    | the item's B-FUZZ family (indices 0 – 999 and Q37's three), through S5 | 1 003 | 0 | 0 | — (the Q131 clause reached 0 times) |
    | Q52's bridge × frame cells (x-06), the lawful refusals | 26 | 3 (E: 1785777080, 1918289972, 3360356802) | 1 (1918289972) | none of F-WALL's ladder at the trace: the stage-1 boundary as given crosses the plaza — M0-c-01's (N-61) |
    | the base set (`runBase` RIVER 900 ha, RIVER from the north, RIVER_BLUEPRINT; c-02 S5's 30 runs), through S8 | 30 | 7 (river900 8, 14; riverN 1, 6; RIVER_BLUEPRINT 3, 4 at S5, 5 at S3) | 2 (riverN 1, 6) | the anchor rung (M1) |
    | Q46's further seed (RIVER 900 ha seed 12) and Q88's (relief-60 default 1, 2; coarse 1) | 4 | 4 | 1 (relief-60 default 1) | the anchor rung (M1) |
    | e-06 S3's S3 lists (relief-60 F-WALL 32 × 2, relief-3000 F-WALL 4 × 2, relief-3000 `E_DEGENERATE` 25 × 2), through S6 | 122 | 122 at S3 | 0 at S3; 6 later: 4 at S5 (relief-60 default 31, coarse 20, 44, 67), 2 at S6 (relief-3000 166 × 2) | the 4: the anchor rung (M1); the 2: `settlementPerimeter`'s kernel notBuilt #2 (M0-e-04's; M4) |
    | e-06 S3's S5 lists (N-60), through S5 | 137 | 137 at S5 | 27 | 18 the anchor rung (M1); 9 S5 `E_INVARIANT` unchanged (not F-WALL's: N-60) |

    Split by rung over the six rows (a run counted once; relief-60 default seed 1 sits in two rows): **the M0 steps'
    class** (the pull's crossings, the splice's near points, the collapsed setback chain: OUR OWN INTERMEDIATE,
    MAKE-IT-SUCCEED) 241 refusals before → **0** after; **the anchor rung's class** (the boundary as given crosses the
    core or touches itself: M1, carried with C-0474 (6)'s proof) 24 runs after, each a run refused before (2 base, 4
    S3 → S5, 18 of e-06's S5 lists including Q88's seed 1): the class's count was hidden inside F-WALL's one message
    before and is separated now, never rising; **other sites** (not this round's code: c-01's plaza crossing 1, e-04's
    S6 2, the S5 `E_INVARIANT` 9) unchanged. Per family the count never rises; every after-refusal is a refusal of the
    same run before. **CONFIRMED** (each row re-derived on the tree: the family, Q52 and base rows by the second part's
    census probes, 2026-10-31 06:31 – 07:01; the e-06 rows by its after-sweeps 05:12 – 07:41 and this part's N-60
    sweep).

60. **N-60 the wall's share of e-06's S5 refusals beyond the three sources (this part's sweep).**
    Every run of e-06 S3's S5 refusal lists (`summaries/M0-e-06.json` groups[].refusals, stage S5: 137 runs) re-derived
    through S5 on the tree (S6 – S8 dropped; a separate copy of the tree, two probe processes, 2026-11-01 19:05 – 22:40):
    | fixture, configuration | S5 class before (e-06) | runs | after: commit | after: refused |
    |---|---|---|---|---|
    | relief-60 default | F-WALL `E_SELF_INTERSECT` | 42 | 32 | 10 — the anchor rung: 1, 13, 42, 44, 62, 84, 91, 95, 156, 162 |
    | relief-60 coarse | F-WALL `E_SELF_INTERSECT` | 41 | 33 | 8 — the anchor rung: 13, 42, 88, 162, 178, 188, 196, 197 |
    | relief-3000 default | F-WALL `E_SELF_INTERSECT` | 20 | 20 | 0 |
    | relief-3000 coarse | F-WALL `E_SELF_INTERSECT` | 21 | 21 | 0 |
    | relief-3000 default, coarse | `E_DEGENERATE empty` (21, 59) | 4 | 4 | 0 — the collapsed setback chain at stage 2 (note 24 routed them to c-04; the site was `layStrips`') |
    | relief-60 default, coarse; relief-3000 default, coarse | `E_INVARIANT` "(wall, enceinte:2) branches: a linear role forms simple chains or rings (§3.10 role consistency)" (relief-60 118 × 2; relief-3000 32, 81, 188 × 2) | 8 | 0 | 8, unchanged |
    | relief-60 coarse | `E_INVARIANT` (151) | 1 | 0 | 1, M0-c-04's S5a bridge-span message (N-58) |
    F-WALL at S5: 124 → 18, every one the anchor rung's class. Instrumented (the refusal site logging the boundary as
    given and the spliced ring against the core): all 18 of the table (relief-60 default 1, 13, 42, 44, 62, 84, 91, 95, 156, 162; coarse 13, 42, 88, 162, 178, 188, 196, 197) — in every one the stage-2 boundary as given is simple and
    crosses the core (enceinte:1's ring or the plaza; two core rings each time), the spliced ring then self-touching;
    the rest of the 24 classed by the message (every M0 step exhausted, the boundary as given included). The `branches`
    class: the kernel's role check at the end of a batch over `(wall, enceinte:2)`, whose only insertion carrying the
    `wall` role is `trace.ts`' (read, PLAUSIBLE: not instrumented); J637 routes Q122's S5 `E_INVARIANT` to M0-c-04 S5,
    and this round leaves it there with the site named (N-61). **CONFIRMED** (the sweep's table; re-derived).

61. **N-61 reports (for the session; each with its seeds and messages).**
    * **M0-c-04 (its round S5):** (1) Q132's wiring: `growth/boundary.ts:587` passes the arena's Way records as
      `layStrips`' `ways` (or `stageStops` gives each extra way its own half-width) — the strips then stop at the local
      corridor; the shift is that round's to declare. (2) The later-rung class's boundary: every later-rung seed of N-58
      and N-60 refuses because the stage-2 boundary as given (c-04's pick) crosses the core or touches itself; the
      design's answer is the anchor rung (M1), but a pick that keeps clear of the core would commit at M0 (a
      boundary-side MAKE-IT-SUCCEED is c-04's option). (3) e-06 note 25's seed 151 (coarse): the S5a bridge-span message
      above. (4) The S5 `E_INVARIANT` "(wall, enceinte:2) branches: a linear role forms simple chains or rings (§3.10
      role consistency)" on relief-60 118 (both) and relief-3000 32, 81, 188 (both): unchanged by this round (N-60),
      routed to c-04 S5 by J637's plan (Q122's S5 E_INVARIANT).
    * **M0-e-04:** relief-3000 seed 166 (both configurations), S6 E_INVARIANT `settlementPerimeter` (the kernel's
      notBuilt #2, M4) — reached since the round's S3 fix; Q133's class.
    * **M0-c-01:** x-06's Q52 E cell 1918289972 still refuses S3 F-WALL "crosses the core": the slice's stage-1 boundary
      crosses the plaza reservation (the siting's boundary, OUR OWN INTERMEDIATE at c-01's step); the other two E cells
      (1785777080, 3360356802) commit since the round.
    * **The `(wall, enceinte:2) branches` class (S5 `E_INVARIANT`, 8 runs; N-60):** raised by the kernel's role check
      at the end of the stage-2 trace's batch — `trace.ts`' wall chain is the only insertion carrying the `wall` role
      (PLAUSIBLE, read) — so its site is this item's code although J637 routes the class to M0-c-04 S5; not diagnosed in
      this round (outside its rows). For the session's routing: the seeds and the message as above.
    * **bench `scan/scan.test.ts` K6-6 (the scan's owner):** the whole-tree scan takes 4 962 ms of its 5 s default
      timeout alone on this machine and times out under load (N-63) — a margin note, not this round's.
    * **M0-e-06 (its S4 re-run, J648 (1)):** the summary's S3 and S5 lists are stale from this landing: the S3 class
      drains to 0, most S5 F-WALL seeds commit (N-60).

62. **N-62 the round's mutant table (J183; the lane mirror, each mutant on its pin files with `--bail=1`,
    `--maxWorkers=1`; the restore checked with `cmp -s` after each).**
    | mutant | the fault | pin files (`--bail=1`) | result |
    |---|---|---|---|
    | M131 | `whyNot`'s gate-vertex clause reads the arena extras again (Q131) | `ways.test.ts` | killed, 7 s — "outer, 20 m on the outer side" refused (N-52's message) |
    | M132a | the Way records ignored (`rec` undefined) (Q132) | `ways.test.ts` | killed, 6 s — "with the Way records given …" |
    | M132b | every stretch at the profile's widest (Q132) | `ways.test.ts` | killed, 7 s — "the profile read along the run" |
    | M87 | `generated` a copy at epoch 0 (Q87) | `water.test.ts` | killed, 55 s — "generated(epoch) deep-equals …" |
    | MF1 | the M0 steps' re-run on our own crossings off (Q122 S3, Q46 / Q88) | `fwall`, `s3seeds`, `s5seeds` at reduced strength | killed, 40 s — `s5seeds` RIVER 900 ha seed 8 |
    | MF2 | `untangle` the identity | `fwall.test.ts` | killed, 26 s — "a 10 m notch … untangled" |
    | MF3 | `mergedNear` keeps every point | `s3seeds.test.ts -t "seed 67:"` (full strength) | killed, 191 s — relief-60 default seed 67 |
    | MF4 | `smoothKeptSimple` the smoothing as built | `fwall.test.ts` | SURVIVED the two properties (their stars never make the smoothing cross) → one pin added ("the smoothing kept simple where the smoothing as built makes the line cross: a free apex smoothed down onto a pinned spike is put back"), then killed, 34 s |
    | MD1 | the collapsed setback chain laid (refused `E_DEGENERATE empty`) again | `s3seeds.test.ts` at reduced strength | killed, 324 s — relief-3000 default seed 4 |
    | MM | the residual's message without `notBuilt('M1')` (RL2) | `fwall.test.ts` | killed, 18 s — "a trace crossing the core that neither rung repairs is refused" |
    Ten mutants, ten killed (MF4 after the added pin); every pin green without its mutant (NEAR, N-63). Each restore
    checked with `cmp -s` against the tree.

63. **N-63 gates and runs (this part).**
    * `corepack pnpm install --frozen-lockfile` exit 0 ("Lockfile is up to date … Already up to date").
    * `corepack pnpm lint` exit 0, its probe-red check: "lint probe-red: tools/lint/fixtures/probe/zz-probe.ts:6 Math.pow
      ← plat/math-allowlist" … ":16 for…in ← plat/no-object-key-iteration" (every planted line reported); "lint: 9
      whole-tree checks".
    * `corepack pnpm build` exit 0.
    * NEAR, full strength (PLAT_FUZZ_RUNS unset), W = 1: the second part's run over the item's 16 test files
      (`layout/test/enceinte/` and `testkit/test/edge/repins.test.ts`; 2026-10-31 05:32 – 09:08, 12 886 s) 337 / 339; this
      part's re-run of the files the round touched after it — `s5seeds.test.ts` (its later-rung block complete),
      `ways.test.ts`, `fwall.test.ts`, `water.test.ts` — 4 files 50 / 50 (3 220 s), and `fwall.test.ts` again with the
      added pin 12 / 12. The two reds are `repins.test.ts`' EP-01/S1/self-touching at 2651453823 (`laddered`, Q113 /
      e-03 S3's declared shift) and EP-01/S5a/coincident at 1658509524 (`absorbed`, Q106): both cells of other stages,
      red before the round (c-04 S4's and c-02 S5's checks), untouched by it.
    * RELATED@1000 (`PLAT_FUZZ_RUNS=1000 corepack pnpm exec vitest related --run --maxWorkers=1` on the five changed
      sources `enceinte/{plane,pull,strips,trace,water}.ts`): 256 files, 3 240 / 3 244 (11 444 s). The four reds, none
      the item's: the two `repins.test.ts` cells above; `testkit edge/ep01-s1-s3-s4.test.ts` EP-01/S1/self-touching at
      2893352673 (S1's water batch refused by §3.10 role consistency `(shore, water:river:0) branches`: Q115, e-03 S4's);
      `bench scan/scan.test.ts` K6-6 "the real run scans plat/ …" timed out at its 5 s default under this lane's probes'
      load — alone on the idle machine it passes in 4 962 ms (a whole-tree scan within 0.8 % of its timeout here: a
      note for the scan's owner, N-61).
    * The e-06 site spike's printed verdicts inside passing bench tests ("site: FAIL — …", "bentcut: bars FAIL …") are
      the harnesses' test-size reports, as before the round.

## Closing check of hardening round S6 (`check/M0-c-02-close-s6`, 2026-11-02 – 11-10)

Every row of the round is confirmed (`M0-c-02-s6.md`). These notes come from this lane's own mutants and probes in its
mirror `/home/user/maps-scratch/waves/check-M0-c-02/s6/after/` (the probe `packages/layout/test/enceinte/
zz-probe.test.ts` the mirror's only addition; `trace.ts` instrumented there for one run and restored). Under the blocker
rule the KI rows are test-gap notes on code the probes confirm correct, not blockers; N-66, N-69 and N-72 are for the
session.

64. **N-64 KI (test tightening; M4, or the next round at no cost): Q131's "the corridor's own face not typed" is
    vacuous.** `ways.test.ts`' three N-52 cases probe `inCorridor` ON the way's centreline ((-20750, 0), (-19600, 0)):
    `ownerAt` reads an edge there ('edge'), which passes `not.toMatch(/^wall_strip/)` whatever the faces carry. Mutant
    X131b (the arena's ways not given as stops at all) passes all three cases; it is killed only by the Q132 block's
    off-centre points (2 failed | 4 passed). Suggested: an off-centre point inside the corridor (e.g. (-20400, 0)
    outer, (-19900, 0) inner). **CONFIRMED** (mutant X131b's log).
65. **N-65 KI (a further hardening test; M4): `localStretches`' ramp and lost-knot clauses have no test.** X132c (a side
    takes the NARROWEST value the profile reaches on it) and X132d (a lost knot gives the profile's NARROWEST value)
    survive `ways.test.ts` (6 passed each, in three containers). The code is right (the lane's probe of 2026-11-02: a
    ramp side takes its widest end, a lost knot the widest of the run — fail-safe: the strip stops short, never inside
    a corridor). Suggested: two unit cases on `localStretches` (a linear ramp between knots on two different vertices;
    a knot off the run). **CONFIRMED**.
66. **N-66 session (a tightening of RL2's proof, C-0474 (6) (i)).** The clause "so that no closed trace `aroundAll` of
    it within the 40 m band can avoid the defect" is not what the refusal site measures. Instrumented in the mirror
    (the boundary as given against the core rings at F-WALL's residual refusal), the seven pinned later-rung seeds:
    | seed | boundary as given | its points inside a core ring | deepest | retries (re-offset; union-simplify) |
    |---|---|---|---|---|
    | RIVER from the north 900 ha 1 | simple, 298 points | 7 | 8.76 m | `pin_lost` × 7; `core` × 7 |
    | RIVER from the north 900 ha 6 | simple, 262 | 40 | 7.81 m | `pin_lost` × 7; `self_touch` × 4, `core` × 3 |
    | relief-60 default 1 | simple, 846 | 9 | 6.40 m | `pin_lost` / `empty`; `self_touch` × 4, `core` × 3 |
    | relief-60 default 31 | simple, 804 | 10 | 7.66 m | `pin_lost` / `empty`; `core` × 4 |
    | relief-60 coarse 20 | simple, 709 | 14 | 3.01 m | `pin_lost` / `empty`; `self_touch` × 4, `core` × 3 |
    | relief-60 coarse 44 | simple, 261 | 7 | 21.98 m | `pin_lost` × 7; `self_touch` × 4, `core` × 3 |
    | relief-60 coarse 67 | simple, 247 | 3 | 7.59 m | `pin_lost` × 4; `core` × 4 |
    In every one the boundary as given is simple, enters one of the two core rings (never the small 5 – 7 point one)
    by 3 – 22 m against the 4 000 cm band, and no gate lies inside. The same probe counts the trace's PINNED points
    (the water crossings' bank and course points; no gate) inside that ring — 1, 3, 1, 0, 2, 8, 4 in the table's order
    (the lane's last seat, 2026-11-10, reading `perCore[].pinsInside`): on six of the seven a point every M0 step must
    keep (the re-offset's `pin_lost`) stands inside the core, so no M0 line that keeps its pins clears it — (i)'s
    "cannot avoid the defect" holds there for the pins-kept trace, though not for the reason the clause gives (the
    depth); on relief-60 default 31 no pin lies inside and the boundary is in by 7.66 m only, so there the clause is
    not what the measurement shows (a line within the band clear of the core is not excluded by it). What holds on all
    seven is that every M0 step as built is exhausted and that the stage-2 boundary runs a stretch just inside the
    previous enceinte — the shared / anchored stretch of §5.2's third rung.
    Suggested: the proof's (i) reworded to what is measured (the crossing pins inside the core; default 31 named
    apart), and N-61 (2)'s boundary-side option for M0-c-04 kept open (a pick clear of the core would commit at M0).
    Not a blocker: the refusal is typed, the rung is named by the design's text, the seeds are pinned verbatim.
    **CONFIRMED** (`chain/probe-s5-site.jsonl`).
67. **N-67 KI (M4; earlier if these seeds' digests become goldens): which retry commits is not pinned.** XF1 (the
    untangle retry dropped) survives `s5seeds`' 8 commits (842 s) and a 19-seed S3 sample (1 456 s) — 2026-11-02 —
    and is NOT equivalent: instrumented (2026-11-02, 2026-11-06), every S5 commit with a defect takes retry 0 (the
    untangled pull), so the mutant commits a different line. The round's promise (every pinned seed commits) holds
    under it. Suggested: one seed's (or a unit fixture's) `traced.report` pull pinned (moved > 0, the offsets the
    pull's halved or none). **CONFIRMED** (the lane's lines of 2026-11-02 00:42, 05:31 and 2026-11-06 11:37).
68. **N-68 KI (M4): two guards no test reaches.** XD1 (ANY refusal of a setback chain's insertion skipped, not only
    `E_DEGENERATE empty`) and XN1 (`mergedNear`'s fixed guard dropped) survive (2026-11-06): no test meets another
    refusal code at that site, nor a near pair at a gate or bank. Fail-safe downstream (the faces' checks; the pins'
    placement refuses). Suggested: a hand case each. **PLAUSIBLE** (that container's line; the mirror was lost).
69. **N-69 session (J264 routing: the lawful-input refusals still seen, each with its seed and message).**
    (a) F-WALL's later-rung class: the 7 pinned seeds (relief-60 default 1, 31; coarse 20, 44, 67; RIVER from the north
    900 ha 1, 6), typed `E_SELF_INTERSECT … notBuilt('M1')`, carried under RL2; N-60 lists 18 of e-06's S5 runs in the
    class. (b) S5 `E_INVARIANT` "(wall, enceinte:2) branches: a linear role forms simple chains or rings (§3.10 role
    consistency)": relief-60 118 (both configurations), relief-3000 32, 81, 188 (both) — 8 runs of
    `summaries/M0-e-06.json`, unchanged by the round; the checker's own derivation of relief-60 default 118 gives that
    message, letter for letter (37 s). The only insertion carrying the `wall` role is `trace.ts`' (this item's code),
    though J637 routes the class to M0-c-04 S5; undiagnosed — a wall chain that branches is OUR OWN INTERMEDIATE, so
    the verdict is MAKE-IT-SUCCEED for whichever item the session gives it to. (c) relief-60 coarse 151: S5
    `E_INVARIANT` "S5a: the gate vertices could not be put on their ways: S5a: the stage boundary crosses bridge:24's
    span at (25597, 119863) with 0 of its deck ends on the stage's side; its gate is the bridgehead on that side
    (N-54 (3))" — M0-c-04's S5a (the brief's "the wall's" does not hold for it; N-61 (3) reports it); default 151
    commits S1 – S5. **CONFIRMED** (`chain/probe-s5.jsonl`).
70. **N-70 text slip:** C-0474's test column says "the M0 steps' 9 S5 commits"; `s5seeds.test.ts` pins 8 (N-58 lists 8).
71. **N-71 KI (the next round that touches the file; one line): `s5seeds.test.ts` fails a plain `vitest run` at reduced
    strength.** `PLAT_FUZZ_RUNS=1000 corepack pnpm exec vitest run packages/layout/test/enceinte/s5seeds.test.ts` exits
    1 — "Error: No test found in suite F-WALL's later rungs (M1) … / Test Files 1 failed (1) / Tests 3 passed (3)": the
    second `describe` loops over `FULL ? LATER_RUNGS : []` and `vitest.config.ts` sets `passWithNoTests: false`. NOT a
    gate red: `vitest related` (TEST SCOPE (3)) sets `passWithNoTests` itself, so RELATED@1000 runs the file green (3
    tests; `chain/related1000.log`: 254 of 256 files passed, this one among them — `chain2/related-list.json`), and NEAR
    runs all 15 cells at full strength; no tier job sets `PLAT_FUZZ_RUNS` over a test folder. It bites a hand replay
    (`test --project layout` at a reduced size) and a mutant run against the file at reduced strength, where it reads
    as a false kill unless `--passWithNoTests` is given. Suggested: declare the `describe` only when it has cells, or
    run the two RIVER-from-the-north 900 ha cells at reduced strength (90 – 105 s each here) as the file's header says
    ("at reduced strength only the RIVER 900 ha cells run"). This lane's draft of 2026-11-09 carried it as a blocker
    (F1) expecting the red in RELATED@1000; the finished run does not show it, and the line is withdrawn.
    **CONFIRMED** (`s6/logs/s5seeds-1000.log`, `chain2/s5-pass.log`).
72. **N-72 session (cost): `s3seeds.test.ts` at full strength is hours, not C-0474's "about 60 – 90 minutes", at one
    worker on this machine.** The builder's NEAR of 16 files took 12 886 s with this file dominant; this lane's
    instrumented run of 2026-11-02 spent about 3 h 40 min in the file alone. Every seed pinned is what the row asked
    for (the cost named); the size matters for the milestone's whole-suite run and for §13.8's PR-tier budget when the
    tiers are timed on the reference machine. Suggested: the session decides whether the 122 derivations stay in the
    PR-size suite or move to a tier-sized list (a reduced cell per class already exists). **CONFIRMED** (the lines of
    2026-10-31 09:08 and 2026-11-02 04:43).

## Hardening round S7 (lane `build/M0-c-02-fix-s7`, 2026-11-12) — the builder's rows

The session's hardening round S7 of the item (J789; leg 1 of the merged round M0-c-02 S7 → M0-c-04 S7 → M0-e-06 S5,
J443; J237 (2), J238, J264 / N-58, J290, J263 Q1 / Q6) on Q173 with Q187 (a) (LINE 1, the source change, measured
first) and Q185 (LINE 2, tests only). Choices row C-0505. Sources read whole: the queue rows Q173, Q187, Q185; J789;
checks/M0-c-04-notes.md N-54, N-57, N-58, N-61, N-63; checks/M0-c-04-s6-evidence/q173-diagnosis.txt and census-before.txt;
packages/layout/test/growth/s5ab/q173.test.ts (read, not edited); §4.4 S5a *Trace* (2), (3); this file's N-71.
Scratch: the lane folder `/home/user/maps-scratch/waves/build-M0-c-02-fix-s7/` (census mirrors `base/` — the tree before
the round — and `after/`, each with behaviour-neutral probe hooks in `enceinte/trace.ts` and `bench/probe7/derive.ts`;
the driver `census/drive.py`, the fold `census/fold.py`), the self-check mirror
`/home/user/maps-scratch/waves/selfcheck-build-M0-c-02-fix-s7/` (isolation proved: no link out of it, `@plat/kernel`'s
realpath inside it).

73. **N-73 LINE 1 — Q173 with Q187 (a): MEASURED, then FIXED (MAKE-IT-SUCCEED), PINNED; a DECLARED SHIFT.**
    * **The measure (the census; the whole fold in `checks/M0-c-02-s7-evidence/census-fold.txt`).** The site family at CITY — e-06's four
      groups, seeds 1 – 100 of each (a stated sample: 100 per group, the whole 800 not carried at one worker's budget on
      this machine) plus 118, 151 and 188 of each, plus relief-3000 default seed 1 at the test size and the pipeline's
      river from 0 cdeg (900 ha, 30 ha walled) seeds 1 and 6 — 415 derivations, one per process, the spike's registration
      through S1, S3, S4, S5 (S6 dropped). For every pinned gate of every trace the strategy hands the kernel (stage 1's
      and stage 2's alike): the unsigned angle at the gate on the line handed to `insertChain` (and on the pulled line),
      and each leg's distance from the gate's nearest arena neighbour (its way's vertex). BEFORE (the tree before the
      round), all 415 derivations: 828 traces handed to the kernel, 6 171 pinned gates measured, 3 563 of them under 100°;
      **808 traces carry an angle under 100° at a pin (404 of stage 1, 404 of stage 2), 803 of them committed today**; by
      the trace's minimum angle at a pin:

      | min angle at a pin | traces | committed today |
      |---|---|---|
      | [0°, 10°) | 19 | 18 |
      | [10°, 20°) | 73 | 71 |
      | [20°, 30°) | 118 | 116 |
      | [30°, 40°) | 120 | 120 |
      | [40°, 50°) | 147 | 147 |
      | [50°, 60°) | 159 | 159 |
      | [60°, 70°) | 103 | 103 |
      | [70°, 80°) | 46 | 46 |
      | [80°, 90°) | 16 | 16 |
      | [90°, 100°) | 7 | 7 |

      Of the 1 741 stage-2+ gates under 100° with a way vertex beside them, 11 had both legs within the attraction
      distance (26 cm) of that vertex — the gates of the nine V refusals (the eight runs and relief-3000 default seed 1 at
      the test size; 118 carries two). The V is therefore not rare as a shape (98 % of traces carry one); it refuses only where a way's
      vertex sits within the attraction distance of both legs. 812 traces are BITTEN (a gate under its floor on the
      pulled or the final line — 4 more than the 808, the handed angle being the floor there).
    * **The mechanism, re-read on the tree.** The boundary handed clean and square (C-0244 (8)); the pull draws the
      gate's two 15 m neighbours inward (118 gate:8: pulled 72°), the smoothing pulls them further, and the simplify drops
      them — their sides are shorter than its 20 m minimum segment, and only the gate itself is pinned — so the leg runs
      from the gate to a vertex 25 – 30 m inward: the V (118 gate:8 31°, gate:10 26°; relief-3000 test-size seed 1
      gate:3 2°). A pinned gate was exempt from the simplify's 100°, its neighbours were not: that is the gap.
    * **The fix (route: the pull and the smoothing keep the gate's crossing; C-0505).** Each main gate holds a floor —
      100° (walls.json `trace/simplifyMinAngleCdeg`; the unsigned angle, as the kernel's simplify reads it), or the handed
      boundary's own angle there where that is sharper (`pinFloors`). The pull's DP searches only the paths keeping every
      floor (a gate's states carry the vertex before it, so the pair of sides is bound; the cycle's start, if a gate whose
      floor the free solve breaks, re-solved with the vertex after it fixed); the smoothing's passes and rounding put a
      gate's moved neighbours back where they would break its floor; `simplifyInBand` pins a removed vertex beside a gate
      whose angle the removal took under its floor; F-WALL's rung verdict refuses a rung line breaking a floor
      (`pin_lost`; the rungs' order and their typed refusals unchanged). The other route (the pin moved along its arterial,
      law 2 (a)) was not taken: it is for a pin §2.7's laws bar, which these are not, and the way's split is the growth
      stage's and the kernel's (outside the owns). No new rung, no looser attraction; every line still passes its own
      validator and read-back. Where no gate's angle goes under its floor the pull and the smoothing are as before, path
      for path (pinned by fast-check, below).
    * **The pins.** (a) `q173sites.test.ts`: the eight runs — relief-60 118, relief-3000 32, 81, 188, default and coarse —
      derive stage 2's trace on the committed tree (the harness of q173.test.ts's `stage2Trace`, rebuilt here) and
      commit it: every gate on the committed wall chain at its point and on the line, the wall one closed chain (no
      vertex of degree 3), every gate's angle ≥ 100°. Full strength 8 / 8 (1 138 s at one worker beside the census);
      reduced strength runs relief-60 default 118 only (the cost named in the file). (b) `gatefloor.test.ts`: a hand
      boundary cut from 118's stage-2 boundary around gate:8 (squared, its neighbours 15 m off), a way laid through the
      gate with its vertex 55 cm inside, a cost surface drawing inward — the free pull draws a spike (< 100°), the floored
      pull and smoothing keep 100°, and through the strategy the trace commits with gate:8 on it, the wall one closed
      chain, the angle ≥ 100° on the line and ≥ 99° on the committed run; a gate at a 53.13° spike keeps that as its floor
      and the pull still pulls. With the fix removed (M1) the strategy case is refused `E_INVARIANT trace: gate gate:8 is
      not on the committed trace at its point (§4.2 S3 (9))` — the V's own refusal. (c) `gatefloor.test.ts`: the small flat
      site's seeds 1 – 12 traced flat and under a pit field: every gate at or above its floor on the committed line (with
      the fix removed 35 gates short, e.g. seed 3 gate:0 16.41° < 64.60°); fast-check (100 runs): where the free pull and
      smoothing keep every floor, the floored pull's offsets and the floored smoothing's points are the same.
    * **Mutants (self-check mirror; each on `gatefloor.test.ts` + `q173sites.test.ts` at PLAT_FUZZ_RUNS=1000, W=1; the
      whole folder at full strength is two hours a mutant, so the pins' files were run — a stated deviation).**

      | mutant | change | result |
      |---|---|---|
      | M1 | the fix removed at the strategy (`trace.ts` as before the round) | RED 3 / 7: (a) 118, (b) strategy (gate:8 off the trace), (c) pit (35 gates short) |
      | M2 | the pull's floor ignored | RED 4: (b) unit and strategy, (c) pit, (a) 118 |
      | M3 | the smoothing's guard removed | RED 4: (b) unit and strategy, (c) pit, (a) 118 |
      | M4 | the simplify's guard removed | RED 3: (b) strategy, (c) pit, (a) 118 |
      | M5 | the rung verdict's floor check removed | RED 1: (c) pit (seed 3 gate:0 62.69° < 64.60°: a re-offset line) |
      | M6 | the floor loosened by 10° (90°) | RED: (b) unit; (c) pit on small-site seed 1 gate:2 98.65° < 100° (24 gates) |
      | M7 | the start gate's re-solve removed | RED 3: (b) unit and strategy (the window's one pin is the cycle's start) |
      | M8 | LINE 2 reverted (`FULL ? LATER_RUNGS : []`) | RED: PLAT_FUZZ_RUNS=1 'No test found in suite …', Test Files 1 failed |
      | M9 | the handed-angle floor dropped (100° everywhere) | survived the first sweep; killed by the spike pin added ('a gate the boundary already crosses at a spike…': floor ≠ cos 53.13°) |

      Every mirror file restored and `cmp`-equal to the tree after each mutant.
    * **The declared shift (rule (3); every moved trace with its before and after digests in
      `checks/M0-c-02-s7-evidence/census-fold.txt`, section 'moved traces').** Per trace (stage 1's `enceinte:1`, stage
      2's `enceinte:2`), the digest of the line handed to `insertChain` and of the committed wall run, BEFORE (the base
      mirror) and AFTER (the after mirror), seed for seed: **812 traces moved, every one of them bitten (moved and not
      bitten: 0); every bitten trace moved.** By group: relief-3000 coarse 103 + 103, relief-3000 default 103 + 103,
      relief-60 coarse 97 + 101, relief-60 default 98 + 100, relief-3000 default at the test size 1 + 1, the river 1 + 1
      (stage 1 + stage 2). The UNBITTEN controls, unchanged digest for digest: relief-60 coarse 7, relief-60 default 7,
      the river 2 — the brief's 'five per group' is met on the relief-60 groups; the relief-3000 groups have NO unbitten
      trace in the sample (every one of their 412 traces carries a pinned gate under 100°: the squared crossing pulled on
      a steep field), so there the no-shift law is held by the property instead — `gatefloor.test.ts` (c)'s fast-check
      (100 runs): where the free pull and smoothing keep every floor, the floored ones give the same offsets and points,
      path for path — and by the 16 census controls. AFTER: committed traces with a gate under its floor: **0**.
      The item's own tests the shift moved (NEAR's first reading, chain 1; each re-run on the base mirror, green there,
      so the round's): `sides.test.ts` 'the relief-60 CITY seed 9 stage-2 replay …' — the golden `REPLAY_PULL.pull.moved`
      151 → 149 (the floored pull leaves two vertices beside a gate on the line), RE-RECORDED; `corridor.test.ts` 'seed
      957349493: the stage-2 strip whose trace spikes at a gate is laid …' — 645 corridor points of stage 2 in a strip
      face, an ORACLE artefact, not an overlap: on the base its gate:2 was the V itself (the wall ran from the gate along
      way:1's own edge to the way's vertex (8324, -15408), 65°), after the fix it crosses at 111° between its own
      neighbours (7301, -15269) and (8893, -15548); a strip's setback line now ends ON the trace vertex (8893, -15548),
      and `support.ts` `stopPaths` walked past every wall vertex ending a setback line, so its stand-in's normal came
      from (7301, -15269) – (9467, -12606), 108° off the corridor `stageStops` gives (the trace's own neighbours of the
      gate, before the strips). Measured with that corridor: 0 points (the probe `probe2/zz-probe.test.ts` in the lane
      folder). FIXED in the oracle: a capped vertex is walked past only where it splits a trace side (within 2 cm of the
      line between its wall neighbours — every cap of the base's walk does); the file 32 / 32 on the base with the new
      oracle, 32 / 32 in the tree.
    * **The refusal census (J264 (4), N-58), BEFORE → AFTER: 11 → 2 S5 refusals over the 415 derivations (it falls).**
      BEFORE: relief-60 default 118 and coarse 118 (`branches`); relief-3000 default and coarse 32 (`gate:7` off the
      trace), 81 (`branches`), 188 (`gate:9` off the trace); relief-3000 default seed 1 at the test size (`branches`) —
      nine, every one the V (LAWFUL input, OUR OWN INTERMEDIATE: the strategy's own pulled line; MAKE-IT-SUCCEED, done);
      relief-60 coarse 151 (`S5a: the gate vertices could not be put on their ways: … bridge:24's span …` — LAWFUL,
      REFUSE as C-0475 (3) rules it, notBuilt M3a, the growth stage's, not the V); relief-60 default 42
      (`E_SELF_INTERSECT F-WALL: the trace touches itself after the re-offset and union-simplify rungs …` — F-WALL's
      later rungs, M1's, C-0085 / C-0474). AFTER: the nine commit S5; 151 and 42 keep their typed refusals verbatim. The
      eight runs leave the census; the river's seeds 1 and 6 commit before and after.
    * **Read with it.** relief-3000 default seed 1 at the TEST size (Q187 (e); bench compose.test.ts 'relief-3000 default
      seed 1 (test size) refuses at S5 …' and spike.test.ts 'relief-3000, seed 1 (S5 refused, S6 not reached) …'): its S5
      `branches` IS the V — on the head its stage-2 gate:3 is squared (180°), pulled to 69° and closed to 2°, both legs
      21 and 19 cm from the way's vertex 72 cm beside it; after the fix it COMMITS S5 (the census's AFTER row: `branches`
      → ok) — so the bench's two pins of its refusal (leg 3's, Q187 (e)) move with this round, the same mechanism. The
      pipeline's river fixture, river from 0 cdeg at 900 ha / 30 ha walled, seeds 1 and 6 (M0-x-04 notes row 18): on the
      head, through S1, S3, S4, S5, both COMMIT S5 already before this round (the census's BEFORE rows; the angles at their
      stage-2 gates 100° – 175°), so the V is not their cause on this tree, and `s5seeds.test.ts`'s two `RIVER_N` later-rung
      pins ('RIVER from the north 900 ha, seed 1 / 6 …: S5 refused E_SELF_INTERSECT …') are RED ON THE BASE TOO (the tree
      before the round, `-t 'RIVER from the north'`: `expected null to deeply equal { code: 'E_SELF_INTERSECT', … }` for
      both, 2 failed | 13 skipped, the same in the tree): they commit since a change of another item in the tree after
      the S6 check of 2026-11-10 (whose re-derivation had all seven later-rung seeds refuse verbatim) — a pin another
      item's change moved, for the session, not this round's. The five relief-60 later-rung pins of the same describe
      (default 1, 31; coarse 20, 44, 67), red in the tree in NEAR: RED ON THE BASE TOO (chain 2's base replay,
      `-t 'relief-60 site spike, (default|coarse), seed'`: 5 failed | 10 skipped, each `expected null to deeply equal {
      code: 'E_SELF_INTERSECT', … }`); the census agrees (relief-60 default 1 and 31 commit S5 BEFORE and AFTER). So all
      seven later-rung pins commit on the head before this round — another item's change, for the session (the
      describe's pins are the session's to re-measure; not re-pinned here: they are not this round's shift).

74. **N-74 LINE 2 — Q185: FIXED, tests only, PINNED; NO-SHIFT.** `s5seeds.test.ts`'s second describe is
    `describe.runIf(FULL)` over `LATER_RUNGS` (was `describe(…)` over `FULL ? LATER_RUNGS : []`): at reduced strength the
    describe is skipped as a unit and still registers its seven cases (each skipped), so the file is never an empty suite
    under `passWithNoTests: false`; at full strength the same seven cases run. Not a placeholder case: that would add a
    test that is none of the seven. THE PIN: `PLAT_FUZZ_RUNS=1 corepack pnpm exec vitest run --maxWorkers=1
    packages/layout/test/enceinte/s5seeds.test.ts` → exit 0, `Test Files  1 passed (1)`, `Tests  3 passed | 7 skipped
    (10)`; reverted (M8) → `Error: No test found in suite F-WALL's later rungs (M1): …`, `Test Files  1 failed (1)`. At full
    strength (NEAR, chain 2) the file reports 15 tests — the same 15 as before the round (N-71: 'where the file is 15 of
    15'; 8 cases that commit + the 7 later rungs); LINE 1's fixtures live in `q173sites.test.ts`, not here. Its 7
    later-rung cases are red at full strength in the tree AND on the base (N-73 'Read with it'), a head red not of this
    round.

75. **N-75 For the session: the pins of other items the shift moves (rule (3); PENDING-CHAIN: RELATED@1000's reds, each
    with its file, its assertion and its base replay).** Expected and named by the brief: (i)
    `packages/layout/test/growth/s5ab/q173.test.ts`'s two cases (today's refusals pinned verbatim) — leg 2's declared
    move; (ii) `bench/test/site/compose.test.ts` 'relief-3000 default seed 1 (test size) refuses at S5 …' and
    `bench/test/site/spike.test.ts` 'relief-3000, seed 1 (S5 refused, S6 not reached) …' — leg 3's, the same mechanism
    (N-73 'Read with it'). Every other moved pin: PENDING-CHAIN.
