# M0-c-03 — the checker's minor notes (lane `check/M0-c-03`, 2026-10-06), for the hardening milestone M4

These notes are minor under J180 and N-45. Each one fails safely or lies off the item's stated promises. None of them
fails the item. The blockers are in `checks/M0-c-03.md`.

1. **`report.offGate` has no positive control (mutant X29 survives).** Removing the outward part's `partLeavesWall`
   count changes nothing a test reads. The count is 0 on every fixture. The bar it reports on ("every route committed
   through its gate") is asserted directly from the arena: way–wall shared vertices equal the gate points. Harden: add a
   synthetic `routesFromSlice` case whose part meets the wall off its gate and assert `offGate` = 1. PLAUSIBLE that it
   would catch a regression; CONFIRMED that X29 survives.
2. **`stretchShared` mixes way–way braids with a way sharing a non-way ring.** On `smallSite(5)` the count is 1. The
   cause: way:4's spine leaves the plaza's attach point (3 921, 3 037) toward (3 939, 2 667), 18 cm off the plaza
   ring's side x = 3 921. Attraction lays it along that side, so the edge (3 921, 2 667)–(3 921, 3 037) carries both
   `way/way:4` and `reserved/plaza:0`, a 3.7 m run of street hugging the square. The commit is valid and no way–way
   braid exists. Harden: count only shares between way rows for the item's measure, or keep a chain's second vertex at
   least `attractCm` off the plaza ring next to its attach end. CONFIRMED (probe P11, `logs/probe2.txt`).
3. **The search band bounds the "another site" rung only as an existence check.** After an approach is given up, the
   re-solve excludes the given-up decks only. With a second in-band deck present, the search may still cross at a
   usable deck outside the band. That deck is then reported `another_site, held: true, to: null`. It needs three decks
   (one bad, one in band but unreachable or worse, one beyond the band). Harden: exclude decks beyond the band on the
   re-solve. PLAUSIBLE (read from `route.ts:331–343`, not run).
4. **`foldParallel` does not cut a loop it might splice in.** The splice `[...pts.slice(0, j), ...along,
   ...pts.slice(k + 1)]` can revisit a point when the earlier part doubles back toward the later part's kept stretch.
   `arterialGraph` cuts loops only when a junction merge happens. Not seen on the 12 CITY seeds or the 10 other sites.
   Harden: run the same repeat/loop cut on the folded route. PLAUSIBLE.
5. **The F-ROUTE rungs' path into `S4Report.rungs` from the slice is untested.** `route.test.ts` drives `routeLadder`
   directly. No slice fixture reaches the re-solve with its inward and outward masks, so `runS4`'s `rungs:
   built.rungs` handoff is untested. M0-x-05 owns the per-rung fixtures on the real stages through `runBase` (C-0085).
   PLAUSIBLE.
6. **§4.3 *Test*'s second clause, "every deck's way angle is within ± 10° of the channel normal", has no test here.**
   It is not in the item's list. The hand-built site is square to its river, so the clause holds trivially there.
   M0-e-06's river fixture is the place for it. PLAUSIBLE.
7. **Y→T is never applied on the CITY fixture.** On seeds 1–12 it was tried once (seed 1, refused by the radius check).
   The rule is exercised on synthetic graphs only (`junctions.test.ts`; mutants X07 and X36 are killed there).
   Informational. CONFIRMED (probe P7).
8. **`backbone.test.ts`'s §13.2 walk follows arena edge order, not the way's order.** A run's length is summed over
   consecutive edges in half-edge order. On seeds 1–12 this gave the same worst run as an ordered walk (probe P2), but
   a later split or re-insertion could reorder the edges and hide or invent a run. Harden: walk `wayLine(...)`.
   CONFIRMED (equal on the seeds run), PLAUSIBLE (the risk).
