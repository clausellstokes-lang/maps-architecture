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

## The closing checker's notes (lane `check/M0-c-03-close-r1`, 2026-10-06), for M4

The blockers B-6 and B-7 are in `checks/M0-c-03.md`. The notes below are minor under N-45 and J180.

9. **The T band's edges are not pinned (mutant N04 survives).** Widening the band from 75°–105° to 70°–110°
   (`commit.ts:247`) changes no kind on CITY seeds 1–12 or `smallSite` 1–6, because none of them has a three-arm
   junction within 5° outside the band. It survives near (63/63), the seeds 4–12 probe (73/73) and related at 1 000
   (356/356). Harden: a synthetic `commitRoutes` fixture with branches at 74° and 76°, and at 104° and 106°, from a
   straight through pair, asserting Y, T, T, Y. CONFIRMED (survival), PLAUSIBLE (the fixture).
10. **A way whose first chain is not its highest, and a class run of several chains before a change, never occur on
    the honest sites (mutants N08 and N09 survive).** N08 sets a way's class to its first chain's (`commit.ts:431`).
    N09 puts the knot pair on the end of the run's first chain instead of its last (`commit.ts:448`). Both survive
    near, seeds 4–12 and related. `backbone.test.ts`'s assertions on the class and the knot vertex are general (they
    walk the chains in way order), so they would catch either mutant on an input with that shape. No such input lies
    in the 18 sites run. Harden: a synthetic `commitRoutes` fixture where two inward routes share only their gate end,
    so one way runs primary → through, with a two-chain run before the change. CONFIRMED (survival), PLAUSIBLE (the
    fixture).
11. **`stretchShared = w.count` versus `+= w.count` (mutant N12) is equivalent.** The kernel's `addWarning`
    (`kernel/src/insert/classes.ts:164`) merges a transaction's warnings by code, so the batch carries at most one
    `W_STRETCH_SHARED` entry. No test is needed.
12. **The junction kinds are read from the smoothed courses even when the batch falls back to the lattice courses.**
    `junctionKind` runs on `finalPolys`, built from `course()` (`commit.ts:400–417`), before the batch. When the kernel
    refuses the smoothed batch and the re-run on `raw` succeeds (`commit.ts:534–541`), the committed arms are the
    lattice courses, and a T or Y can disagree with the arena's arms. The fallback is rare: no run here took it. Its
    result is otherwise valid, so this is a quality shortfall that fails safely. Harden: recompute the kinds from the
    committed courses after a fallback, or report the fallback's kinds as provisional. PLAUSIBLE (read, not run).
