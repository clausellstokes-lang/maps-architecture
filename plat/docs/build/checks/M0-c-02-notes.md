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
