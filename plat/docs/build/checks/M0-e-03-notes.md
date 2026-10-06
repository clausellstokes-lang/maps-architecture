# M0-e-03: minor notes for the hardening milestone M4 (check/M0-e-03, 2026-10-06)

Under J180 and N-45 none of these notes fails the item; the only blocker is B-1 in `checks/M0-e-03.md`. Each note is a
KI row for the hardening pass. The probes and mutants live in `~/maps-scratch/waves/check-M0-e-03/` (mirror only).

1. **KI — a few bank outfalls sit up to 22 cm off the body's shore chain in the arena.**
   * Probe: 6 of 7 374 bank outfalls over 103 runs lie more than 2 cm from the shore edges that
     `resolve(('shore', water))` returns; the worst is 22.0 cm. §2.3 places `at` "on the receiving body's shore chain".
   * **Why:** `outfalls` projects onto the polygon rings handed to the batch, not onto the committed shore. The
     insertion's attraction and the inserted deck vertices can move the committed chain by up to `attractCm`.
   * **Effect:** it fails safely. `cell` is re-found from `at`, the error is below one hydro cell (25 m), and no
     reference names the point.
   * **Hardening:** project onto the committed shore chain, or snap `at` onto it; test the distance on the bar's seeds.
2. **KI — the stage's detect-and-refuse guards have no fault-injection test (mutants M15, M19 and M36 survive).**
   * The stage-end refusal (`stage.ts`: `failed.length > 0`), the decks in its refs, and `waterFaces`' "claimed face
     with no edge of its shore" refusal can all be removed without a red. On honest input they never fire, and the
     references are checked independently (`stage.test.ts` 4, `checkCI` in the bar).
   * **Hardening test:** hand the stage a WaterSet holding a bridge whose `deck_end` resolves to nothing (or a dead
     entity), and expect E_INVARIANT; build a reach whose seed lies in a face its rings do not bound, and expect
     E_INVARIANT.
3. **KI — no test pins the L0 partitions' rebuild at stage end (mutant M16 survives).**
   * §3.3 rebuilds the index partitions at a stage's end, and `runS1` calls `rebuildAtStageEnd`. Removing the call
     leaves `checkCI` green, because a dirty grid is still a fresh index.
   * **Hardening test:** after `runS1`, assert that the ground arena's dynamic grids at L0 are empty (the rebuilt
     count is positive).
4. **KI — a polygon part with no seed is dropped without a report.**
   * `partsWithSeeds` drops a part that holds no course point at least 100 cm inside it. The body is reported only when
     every part goes. An instrumented probe counted 0 such parts in 103 runs, so the case is contrived today, but a
     lost part would be water missing from L0 with no line in `report.dropped`.
   * **Hardening:** report a dropped part (body id, area) in `report.fallbacks` or `dropped`, or seed the part from
     an interior point instead of the course.
5. **KI — the span ≤ 3 widths filter has no test (mutant M22 survives).** With it removed the decks stay bank-to-bank
   and perpendicular, and the narrowest-first ranking still prefers short spans. **Hardening test:** a bend where the
   perpendicular ray runs along the reach for more than three widths, and assert no site there.
6. **KI — bridge ids after the input's bridges have no test (mutant M33 survives).** S1 runs first at generation, so
   the input's `bridges` is empty. The case matters for S1's water operator (M3a) and until §6.3's mint replaces the
   `bridge:<n>` ids (M0-d-05a). **Hardening test:** run with one input bridge and expect `bridge:1` first.
7. **KI — a tributary refused on both polygon paths is left out of L0 (3 of the bar's 100 seeds: 46, 62, 92).**
   * The stage reports it (`dropped`, reason `refused`), as C-0229 (2) declares, and the bar bounds it (≤ 3). It fails
     safely, but the tributary's carved bed stays in the terrain with no water face over it.
   * **Hardening:** fix the grazing-angle mouth (cut the mouth along the river's shore at a minimum angle, or extend
     the tributary's course to meet the shore at a steeper angle), then tighten the bar's bound to 0.
8. **KI — a stage refusal after the ring's commit leaves the ring committed.**
   * `runS1` commits the outer ring in its own batch before the water. If the water then fails on both paths for the
     first body, or the stage-end check fails, the stage returns an error while the arena holds the ring (and, for the
     stage-end case, the water too).
   * **Effect:** it fails safely, since the stage refuses. Whether the runner rolls the stage's batches back is
     M0-x-04's and M0-e-06's concern.
   * **Hardening:** state that rollback rule in M0-x-04's registration, or have `runS1` report the versions it
     committed with the refusal.
9. **Informational for the timing waves (never gated here) — S1's L0 batch on a full CITY frame takes seconds against
   §12.4's 25 ms S1 row.**
   * The author's figures (C-0229 (2)): about 0.1 s per 100 ha seed, and 2–50 s for a full CITY frame on the slow path.
     My NEAR run took 116 s for the 103 bar runs. **PLAUSIBLE** (a timing on this machine is informative only).
   * **For waves T and T2:** M0-e-06's S1 + S4 + S6 ≤ 50 ms bar will meet this cost; the kernel-buffer fallback is the
     slow path to look at first.

## Closing check (`check/M0-e-03-close-r1`, 2026-10-06)

10. **KI — a site's `deck` can differ from the committed deck by centimetres (reported by the fix round in C-0233; M4).**
    * Observation: C-0233 records bar seed 64 `bridge:7`, whose committed end 1 lies 25 cm from its site's `deck[1]`: the
      insertion moved it. `stage.test.ts` asserts the two equal on its seed 2 only. This seat's oracle probe measured the
      committed decks (948 over 103 runs) and found the worst 2.0° off the averaged flow's normal, so the ± 10° promise
      holds on the committed geometry. **CONFIRMED** for the angle; the 25 cm figure is the author's (**PLAUSIBLE** here).
    * Effect: it fails safely. The references resolve to the committed vertices; only the `CrossingSite` record can lag.
    * **Hardening:** after the commit, re-read each site's `deck` from its resolved `deck_end` vertices, or bound the gap
      by `attractCm` in a test over the bar's seeds. It belongs with note 1 (the same insertion attraction).
11. **Informational — two of this seat's flow mutants are caught only by the full CITY frames.** F03 (the flow from the
    adjacent-vertex chord) and F04 (averaged over half a width) pass the four fast files and the 100 bar seeds at 100 ha.
    The three full CITY frames kill them ("seed 4 bridge:27 11.9°"; "seed 10 bridge:20 15.6°"). The bar holds, but its
    margin rests on three frames. **Hardening (M4):** a hand-built course in `crossings.test.ts` whose adjacent-vertex
    chord and half-width chord both lie over 10° off the one-width chord, such as a bend with a short kink at the vertex.
