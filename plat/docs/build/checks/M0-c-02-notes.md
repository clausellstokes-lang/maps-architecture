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
stands. Choices row C-0432 names every row it closes; ledger row L-0669. The before-image is the tree's owns at the
round's start, read read-only from HEAD 398869ce's object store by a python reader (no git command): all 26 files hash
equal to the landed record `M0-c-02.json` (lane `build/M0-c-02-consolidate-1`). Every probe and mutant ran in the lane
mirror `/home/user/maps-scratch/waves/selfcheck-build-M0-c-02-fix-s5/` (isolation proved; removed at the end). The lane
ran in four parts on four containers (11:54 – 17:52, 19:39 – 22:25, 22:37 – 00:18, from 00:20 on 2026-10-28), the mirror rebuilt
each time (isolation proved each time); every figure below was measured on the round's final sources unless it says otherwise.

47. **N-47 row by row: the outcome, its evidence and its mutant (J183's table at the end).**
    * **3 N-3 (the §4.4 inward-pull cap) — STAGED, choices text.** The cap reads S5d's tolerance and the stage's land
      shortfall, which M0-c-05's S5d computes after S5a's commit; the trace strategy has neither at its pull. C-0432 (1)
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
    * **6 N-6 — STATED (choices text and the module comment).** C-0432 (6) gives C-0226 (10)'s reading: where the trace
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
      tries 1, lawful `[]` — and the file's header comment says so (Q37's seeds once refused at S5, now committing; C-0432,
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
      files above were re-run, as J601 says). C-0432 (18) amended to record the ruling.

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
    * Every arena way read as an extra stop takes the widest given way stop's half-width (`widest`, C-0432 (10)), not
      its own class's: a narrower way's corridor is over-stopped by up to the difference — fail safe (never a strip over
      a corridor), a quality shortfall for the pass that gives `layStrips` each way's width (the kernel's spine widths or
      the Way records; M0-c-04's `stageStops` or M4). **CONFIRMED** (read).
    * C-0432's header says "DECLARED SHIFT (strip faces only)" while its body declares the stage-2 walls (≤ 28.5 cm on
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
    * The builder's L-0669 discloses one read-only `git log -1` at the lane's start (a working-rule slip, no content
      outside rule 1 reached it); the session records it. This seat: one non-recursive `ls docs/ | head` listed file
      names of the project's `docs/` folder (nothing opened); for about four minutes two of its own probes ran at once
      (the base census's last run and the P4-given probe, then the family census 300 – 999) when a wait on the base
      census's done-file timed out and was read as done — probes of its own, no test of the tree; no other overlap.
    * RELATED@1000's reds, each ruled before this check: (a) `bench determinism/pair.test.ts:86`, seed 1 — the declared red Q124 (J601), M0-d-09's matcher, exposed by the round's shift; (b) `testkit edge/repins.test.ts`' coincident 1658509524 — foreign, Q106 (red on the before image too). Nothing else red in 224 files (2 860 tests).
