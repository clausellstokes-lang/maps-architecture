# M0-c-04 — the checker's minor notes (lane `check/M0-c-04`, 2026-10-06)

These notes are for the hardening milestone M4 unless a note names an earlier one. None of them fails the item (J180,
N-45). The blocker is in `M0-c-04.md`, and the mutant and probe names refer to that file.

1. **N-1 `resettleT`'s `lowered` list on exact ties.** Mutant B05 changes the propagation's `cand < dist[v]` to `<=`.
   It survives `resettle.test.ts`. T stays bit-equal to a full recompute. The only effect is that a node reached by an
   equal-cost path is marked lowered, which inflates `GrowthStage.lowered`. Add a test on a lattice with a symmetric
   tie, for example two equal road branches.
2. **N-2 Nothing pins "to the frame at its bearing" (§4.4 S5b).** Mutant M12 routes every outer course to the
   least-cost rim. It survives, because the checks only require the road's end to lie on the frame. The probe measured
   end deviations from the pick's radial bearing of 0–308 cdeg on most roads, and up to 1 090 and 1 579 cdeg, which
   are presumably the `out-frame` fallback. Add a check that the end lies at the rim node at the bearing, or that the
   fallback is recorded as such.
3. **N-3 Guards no tested seed exercises.**
   * The checks verify the outcomes: no road meets a wall, and every way–wall meeting is a gate. The guard paths
     themselves are never reached on the tested seeds, which is why these mutants survive:
     - M14: `roadFault` always null.
     - M15: the outline-once rule off.
     - M29: walls dropped from the road obstacles.
     - B15: the trace's core dropped.
   * Every road on seeds 1–12 kept level 0. The simplified and lattice fallbacks, and the `invalid` refusal, have no
     end-to-end test.
   * No check verifies C-0244 (6)'s "an S5b road never crosses a way (no unrecorded X junction)".
   * Add a unit fixture per guard, and a check that S5b roads meet standing ways only at their junction vertex.
4. **N-4 Defensive fixes no seed now needs.**
   * The gate's snap to a way vertex within 52 cm (B10, for seed 30) and `APPROACH_NODES` (M16, for seeds 48, 53 and
     77) can each be removed without failing those seeds.
   * The fixes those seeds do need are `squareGates` (B11, killed) and the 35° radial filter (M05, killed).
   * Either add fixtures that need the two mechanisms, or record them in C-0244 as defensive.
5. **N-5 Branches the integrated runs never take.**
   * On every CITY seed probed, stage 2 is N 8 against c 7 and stage 3 is N 14–15 against c 8.
   * So "N_k ≤ c → none" is tested only at `spawnPrimaries`' unit level.
   * A capped but unfolded stage's S5b, including the destination `short` record, is never run end to end: M32 forces
     `short` to 0 and survives.
   * C-0244 (13) records the small-frame trace refusal as a KI.
   * A fixture where c ≥ N_k (for example a wider spacing) and a capped stage that still adds land would cover both.
6. **N-6 "Never recomputed per stage" is checked only by reading.** A full `fieldT` recompute is bit-equal to the
   re-settlement, so no output test can tell them apart. The checker confirmed the incremental path by reading:
   `growth/` calls no `fieldT` and no `dijkstraTree`. A test could spy or count the Dijkstra runs, or assert that
   `lowered` is a strict subset of the nodes.
7. **N-7 `s5aStage` declares `txForm: 'declared'` while its trace runs callback batches.** The trace's gate-vertex
   split and the strategy's trace and strips are callback batches at S5's rank (C-0226 (2), C-0244 (8)). §4.1 lists S5a
   as declared. Either the declaration or the choices row should say which form the registration (M0-x-04) is to
   enforce.
8. **N-8 The bar's §13.2 descriptive rows are not visible.** `bar.ts` prints the per-seed primary length per km² with
   `console.log`. The NEAR run's output (vitest 5, default reporter) holds no such row, only the 14-line summary. So
   C-0244 (12)'s "reports the length density per seed" leaves no durable record. Write the rows to a report file under
   `docs/build/`, or print them in a failing message on demand.

## Closing round (lane `check/M0-c-04-close-r1`, 2026-10-06)

9. **N-9 c counts a meeting, not a crossing, and the recount shares that reading.** `boundaryCrossings` counts every
   point where a standing way's segment meets the outline (`crossParams` with endpoints included, two points on one way
   within one lattice point counted once). `recountC` in `test/growth/s5ab/checks.ts` (C-0248) counts the same way
   (`meetings()`, endpoints included, two within 1 cm once). A way that only grazes the outline at a vertex, touching it
   without passing from inside to outside, therefore counts as one crossing in both, so the recount cannot tell a graze
   from a crossing. Whether any of the 100 bar seeds has a graze is not known, because the two counts agree either way.
   This reading is PLAUSIBLE (reasoned from the code, not executed). If a graze occurs, S5b spawns one primary fewer. That is a quality
   shortfall that fails safe, with no throw and no wrong commit. Suggested handling: count a meeting as a crossing only
   when the way's neighbouring vertices lie on opposite sides of the outline, in the code and in the recount, with a
   fixture of a way tangent to a boundary vertex. Milestone M4.
