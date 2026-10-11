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

## Closing check of session fix round S1 (lane `check/M0-c-04-close-s1`, 2026-10-08)

The blockers F-1 and F-2 are in `M0-c-04-s1.md`; the probe and mutant names (P1 – P7, X01 – X14) refer to that file.

10. **N-10 KI: the always-rejected planning batch shows as a refused S5 batch.** `traceStage` plans the gate vertices in
    an L1 batch that always returns `E_INVARIANT`. Every batch watcher sees it: the bench's `watchedKernel` records it,
    so `runRecord(d).batches.S5.refused` rises by one per walled stage k ≥ 2 (relief-60 seed 15: 0 → 1; the 16-seed
    probe's S5 sequence `ok E_INVARIANT ok ok ok`), and its work is spent twice. C-0285 states the version shift but not
    this one. Suggested handling: plan without a batch (C-0285's own `TraceOptions` prelude hook in M0-c-02's trace), or
    mark the planning batch so that receipts do not count it. M4. CONFIRMED.
11. **N-11 KI: the two-gates-at-one-bridgehead guard has no pin.** X11 (the guard off) survives NEAR. The only input the
    seat found that reaches it is P6, an outline with a 10 cm slot beside the bridgehead; there both codes refuse with
    nothing written (`E_INVARIANT` vs `E_SELF_INTERSECT`). Add P6 as a pin of the guard's message. M4. CONFIRMED.
12. **N-12 KI: two equivalent survivors leave dead or redundant code.** (a) X09: the bridgehead gate's recomputed
    `bearingCdeg` is never read — `baseEnceinte.trace` does not read `GateSite.bearingCdeg` and the gate record carries no
    bearing. (b) X08: the gate splits re-made in the trace batch are redundant on every observed input — without them
    insertChain's own crossing vertex stands at the same point (16 flat CITY seeds' prints identical; span.test 5/5).
    Either pin a case where the split matters, or record both as defensive in C-0285. M4. CONFIRMED.
13. **N-13 KI: a crossing within 2·TOUCH_CM of the far deck end gates at the far deck end.** The way-vertex snap runs
    before the span rule, so an outline crossing the span 20 cm from the east deck end (P4) puts the gate at (52000, 0),
    outside the outline as given. The result is lawful (the span stays whole, the gate on land, the outline moves at most
    26 cm), but it departs from C-0285 (1)'s wording "the deck end strictly inside the stage's outline". Record the
    precedence in C-0285, or apply the span rule first. M4. CONFIRMED.
14. **N-14 KI: the trace-batch seam assumes one callback batch.** `withinTraceBatch` arms only the first callback batch
    of the kernel it hands `baseEnceinte.trace` (M0-c-02's). Today that is the commit (`trace.ts:229`). If M0-c-02's trace
    ever opens an earlier callback batch (a probe, a dry run), the splits and the span proof would run there and be
    lost, and the item's tests would likely still pass for dry crossings (N-12 (b)). Add a test that the trace makes one
    callback batch, or take the prelude hook C-0285 names. M4. PLAUSIBLE (reasoned from the code).

## Closing re-check of session fix round S2 (lane `check/M0-c-04-close-s2`, 2026-10-08)

The verdict is in `M0-c-04-s2.md`. The probe and mutant names there (R1 – R3, Y01 – Y10) are the ones used here.

15. **N-15 KI: `stageStops` copies `stopsFromArena`'s way-stop rule, and only its half-width is pinned.** Two mutants
    test the copy:
    * Y07 halves the way stop's half-width. It is killed in RELATED by `bench/test/fusion/derive.test.ts`.
    * Y06 halves the reach (2·(inner + outer) instead of 4·). It survives NEAR and RELATED@1000. Its only effect is a
      1 cm shift of 2 – 3 strip cap points on 6 of the 43 probe outlines, because the reach moves only the rounded
      corridor ring's far ends. The seat judged it equivalent up to lattice rounding.

    The exact equality C-0292 (1) claims holds today: the two water-gate stages are digest-identical to the pre-round
    code. But nothing would notice if M0-c-02 changed `stopsFromArena` and the copy did not follow. Suggested handling:
    take C-0292 (1)'s own option and route a stops-merge (`extraStops`) option to M0-c-02's `layStrips`, deleting the
    copy; or pin `stageStops` against `layStrips`' arena-read stops on a stage with no extra ring. Best before M1, since
    it is a contract between items; at the latest M4. CONFIRMED.
16. **N-16 KI: the strips batch's water proof is a backstop no honest input reaches, and it checks vertices only.**
    Y04 (the proof off) and Y10 (its depth 2 cm → 5 m) are equivalent on all 43 probe outlines. Its stops and its rings
    are the same rings, and `clipOutside` cuts the lines at each stop ring, so only an M0-c-02 clip defect can reach
    it. `wetSetback` tests the vertices of `setback` edges. A setback edge that crosses a corner of a water ring with
    both ends dry would pass it. The pre-round code left five such one-edge differences on outlines with 0 wet
    vertices; the round's stops removed them. Suggested handling: test each setback edge's crossing with the ring (the
    receipt's segment form), and pin the proof with a stop deliberately withheld for one ring while the pond stays in
    the water set. M4. CONFIRMED (the equivalence; executed). PLAUSIBLE (the edge-crossing gap; reasoned, not
    constructed).
17. **N-17 cross-item (for the session, before `build/M0-c-02-fix-s2` lands): span.test.ts pin 5 goes red under
    M0-c-02's in-flight C-0295.** The `after` snapshot was run with only the tree's current
    `enceinte/{trace,water,index}.ts` copied in. Pin 5 ("a trace whose wall would put a vertex on a span is refused in
    its own batch") then fails:
    * Expected: `/put a vertex on bridge:1's span/`.
    * Received: "water: the water gate gate:w0's wall_gate run between 50000,-1000 and 52000,1000 is 2 edges, not its
      one chord (… N-54 (1); C-0295)".

    It is still refused `E_INVARIANT`, but before the trace batch's span proof is reached, so that proof would lose its
    only pin (S1's X05 class would then survive). Suggested handling, routed through the M0 fix queue:
    * Either M0-c-04 re-targets pin 5 to an input whose trace commits through the chord check and is caught only by
      `brokenSpan`.
    * Or the pin asserts either refusal while keeping the span whole and the version unchanged, and a new pin keeps
      `brokenSpan` reachable.

    Belongs to M0 (before M0-c-02-fix-s2's close). CONFIRMED (reproduced in a mirror).
18. **N-18 KI: N-14's single-batch seam now covers the strips too.** `withinTraceBatch` arms the first callback batch
    of the kernel it hands to `layStrips`. Today that is the strips' only batch (`strips.ts:330`). If M0-c-02's
    `layStrips` ever opens an earlier callback batch, the span and water proofs would run there, and Y02 / Y03 would
    show it only through pin 8. Handle it with N-14. M4. PLAUSIBLE (reasoned from the code).
19. **N-19 KI (closing check of session round S3, lane `check/M0-c-04-close-s3`, 2026-10-11): pin 5 now pins
    M0-c-02's refusal text verbatim, coordinates included.** span.test.ts pin 5 matches
    `/water: the water gate gate:w0's wall_gate run between 50000,-1000 and 52000,1000 is 2 edges, not its one chord/`,
    a message written by M0-c-02's `enceinte/trace.ts` (`looseGate`, C-0300). Any rewording there turns M0-c-04's test
    red again for a reason that is not M0-c-04's: the coupling that opened this round (N-17, now closed by S3). The pin's
    other asserts (E_INVARIANT, version, live vertices, span whole, no `gate_end`, no `enceinte:2` wall) carry the
    fail-safe promise. Mutant K2 (`looseGate` off) is killed by the code-plus-text match, so the text does work today.
    Suggested handling: M0-c-02 exports a typed reason (or a stable tag such as `water: loose-gate`) for its chord
    refusal and pin 5 matches that, or pin 5 matches only `/gate:w0's wall_gate run .* not its one chord/`. Belongs to
    M1 at the earliest (a contract between items); at the latest M4. CONFIRMED (read; K2 executed).
