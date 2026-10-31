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
