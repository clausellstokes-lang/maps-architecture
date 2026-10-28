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

## The builder's notes, consolidation round C1 (lane `build/M0-c-04-consolidate-1`, 2026-10-13): R11 of `consolidation/layout-plan.md` §1.5.1 – 1.5.6, 1.5.9, §2's growth rows, §3's test/growth/s5ab row

The round changes no behaviour. `boundary.ts` and `mainRoads.ts` drop their private copies of six helpers and call the
package's one copy of each by path: the proposals' `idNumber`, the backbone's `heightsOf`, siting's `rimAtBearing`,
`boxOf`, `distToSegment2` and `HA_CM2`, and the enceinte's `traceWithStrips`. The comments that named a check's finding
id or narrated a round now state the rule and its row. No file was added, renamed, split, merged or moved; no exported
name was added, removed or renamed (`growth/index.ts` and `src/index.ts` were not edited; growth's barrel is `export *`,
so this round adds no file-level export, 1.5.0, J302 Q1).

**Old → new map (J263 Q8).** The map is per helper; the test files keep their names and titles.

| old (before this round) | new |
|---|---|
| `src/growth/mainRoads.ts` private `idNumber(id, prefix)` | `src/growth/proposals.ts` `idNumber` (public, unchanged; the same three statements), imported by path |
| `src/growth/mainRoads.ts` private `heightsOf(slice)` | `src/backbone/stage.ts` `heightsOf(site, points)` (file-level, R7), called as `heightsOf(site, slice.lattice.points)` |
| `src/growth/mainRoads.ts` private `rimAtBearing(lattice, p, bearing)` | `src/siting/routes.ts` `rimAtBearing(lattice, x, y, bearing)` (file-level, R1), called with `pick.at.x, pick.at.y` |
| `src/growth/mainRoads.ts` private `boxOf(pts)` | `src/siting/lattice.ts` `boxOf` (file-level, R1); no adapter |
| `src/growth/boundary.ts` `traceStage1`'s tail: `baseEnceinte.trace(…)` through `layStrips(…)` and the warnings | `src/enceinte/commit.ts` `traceWithStrips(slice, k, arena, water, opts.costField, s3.plaza)` (file-level, R8); `traceStage1` keeps its signature and defaults (`opts.key ?? GROUND`, `opts.water ??` no water) and returns `err(tail.code, tail.detail)` or `ok(tail.value, tail.warnings)` |
| `src/growth/boundary.ts` private `segD2(p, a, b)` | `src/siting/geom.ts` `distToSegment2` (file-level, R1) |
| `src/growth/boundary.ts` `export const HA_CM2 = 100_000_000` | `export { HA_CM2 } from '../siting/geom.js'` (the same name and value, still public through the barrel; `boundary.ts` imports it for its own use) |
| `test/growth/s5ab/span.test.ts` header and four comments naming rounds s1 – s3 and the check ids F-1 / F-2 | the rules and their rows (N-54 (3); C-0285, C-0292 (1) – (3), C-0300, C-0303) |

The tests: §3 says nothing to merge, and nothing was merged. `bar-1` … `bar-5.test.ts` still split the here-bar's
100 CITY seeds into five chunks of 20; `baseRun`, `grow`, `cityGrown`, `violations` and `recountC` are kept. The six test
files hold 11 describe / 41 it, and `bar.ts` holds 1 / 1 for each chunk. The titles were compared line for line before
and after (a grep diff): identical. `span.test.ts`'s diff is comment lines only (30 lines, none of them code).

**Equivalence, finding by finding.**
* 1.5.1 `idNumber`: the two bodies are the same three statements. The import closes a cycle: `proposals.ts` already
  imported `mainRoads.ts`'s `s5bWorkLimit`. The cycle is safe, because neither module reads the other's bindings at
  its top level. `idNumber` and `s5bWorkLimit` are hoisted function declarations, called only inside function bodies.
* 1.5.2 `heightsOf`: the same `terrainSampler(site.terrain, slopeQueryM × 100)` and the same loop. The only change in
  the body is that the old `const pts = slice.lattice.points` is now the parameter `points`.
* 1.5.3 `rimAtBearing`: the walk, the frame test and the nearest-rim search are the same statements. The angle factor
  is the same double: mainRoads' `quot(PI, 18_000, 'count', 'cdeg')` is `ratio(PI, 18 000).value`, which is
  `PI / 18_000` once |18 000| ≥ 1 (`kernel/src/num/ratio.ts`); siting's is `PI / 18_000`. `boxOf`: both return
  `[minX, minY, maxX, maxY]`, the shape the two call sites read (`wallClearance`'s box ± the clearance, `roadFault`'s
  near filter ± 1 cm). `Math.min`/`Math.max` and siting's if-chains differ only on NaN, which lattice points never hold,
  and on the sign of a zero. Every consumer adds to or subtracts from the bounds and compares them with `<` and `>`,
  where −0 == 0, so no adapter is needed.
* 1.5.4 `traceStage1`: its tail was statement for statement what R8 hoisted as `traceWithStrips`, so the call runs
  the same work in the same order on the same inputs. That is the trace with policy
  `{ waterfront: 'open', placement: 'aroundAll' }`, `siteContext(site)` and `{ key, costField? }`; then the way stops
  over `WAY_SPAN_NODES` with the frame extension, the water stops from `waterRings`, and `layStrips`. The value object
  has the same keys in the same order (`enceinte, gates, waterGates, traced, strips`) and the same references. The
  warnings are `[...traced, ...strips]`, and each refusal carries its code and detail unchanged.
  `commitS3ThenStage1` is unchanged and stays the growth-side public entry.
* 1.5.5 `segD2` → `distToSegment2`: the two bodies are textually equal: the same `=== 0` guard, the same
  `quot(…, 'area', 'segment foot')`, the same clamp and the same sum. So the plan's 1.3.2 guard argument is not even
  needed here. The inputs are `c.at`, a crossing rounded to the lattice by `lat`, and two arena vertices (lattice
  integers), so `l2` is 0 or an integer ≥ 1 and the `quot` text is unreachable (J302 Q10). The text is the same anyway.
* 1.5.6 `HA_CM2`: the same name and the same value. `capacity.ts`, `proposals.ts` and `mainRoads.ts` still import it
  from `./boundary.js`, and the tests (`spawn.test.ts`, `boundary.test.ts`) import it unchanged. The declaration
  `boundary.d.ts` now re-exports geom's `declare const HA_CM2 = 100000000`, so the literal type is kept.

A helper probe in the mirror ran each deleted body (copied verbatim) against the shared helper:
* `heightsOf`: 199 649 lattice nodes over six slices, two of them on a rough raster (heights in ±3 km, every node
  non-zero). 0 differences by `Object.is`.
* `rimAtBearing`: 124 576 cases, integer and fractional bearings over four lattices. 0 differences.
* `distToSegment2`: 400 000 cases, lattice and double `p`, zero-length and short segments. 0 differences.
* `idNumber`: 200 000 cases. 0 differences.
* `boxOf`: 200 000 point sets, with ±0 among them. 0 value differences under `===`; 1 366 differ only in the sign of
  a zero, which no consumer reads.

**API frozen (J263 Q1).** `growth/index.ts` and `src/index.ts` are byte-identical: neither was edited. The runtime
export names of the built bundle are 375 before and after, and the two lists are identical. The declarations
(`dist/types`) differ in two files only:
* `boundary.d.ts`: `HA_CM2` as a re-export of geom's const of the same literal type, and `traceStage1`'s doc comment.
* `mainRoads.d.ts`: `import type { S4Output }` is emitted as `import { type S4Output }`, an import form with no
  exported name.

**NO-SHIFT.** The before-image is the tree at the round's start. Its owns equal M0-c-04's s3 landed record (16 of 16
hashes), and a copy is kept in the lane's scratch. A probe in the lane's mirror ran before (those owns) and after (this
round's owns) on four families:
* (a) `commitS3ThenStage1` (that is, `traceStage1`) on the CITY flat fixture at seeds 1 – 12 and on the 400 ha / 30 ha
  site at seeds 1 – 12. It also ran on `span.test.ts`'s pond fixture with the water given to stage 1, with the decks
  and without. Read: `arenaPrint`, the level digests L0 – L4, the version, the value and the warnings.
* (b) `traceStage` on the pond fixture over 41 slanted outlines (x0 = 44 000 … 58 000 cm) × 3 water modes (pond given,
  bridge only, no decks): 101 commits and 22 typed refusals, details verbatim.
* (c) `runBase` FLAT and RIVER at seeds 1 – 3: the model root, the stage roots S1 – S6, the report and the bugs.
* (d) The CITY flat fixture at seeds 1 – 100 through S3 → S4 → S5a / S5b. These are the here-bar's 100 seeds; the
  CITY 1 – 12 probes and the 16-seed `arenaPrint` are among them. Read: `arenaPrint`, the level digests, the version,
  the stages, ways, junctions, field, enclosure and grade digests, the report, the folded quotas and the warnings.

The probe's 255 lines are byte-identical before and after (SHA-256 e7ab40ec119bb3f6…).

**Refusals (J264 (5), N-58).** The item's registered families, the here-bar's CITY seeds 1 – 100 (CITY 1 – 12 among
them), refused 0 before and 0 after.
* `runBase` FLAT 1 – 3: 0 refused before and after.
* `runBase` RIVER 3: one refusal, identical before and after. S5 refuses `E_SELF_INTERSECT` (bug key
  `S5@town:10bqcwtcw044g`). The input is LAWFUL (a registered blueprint and seed), so the verdict is MAKE-IT-SUCCEED. It
  is already routed: M0-c-02 notes N-33 name it an F-WALL self-touch of the trace, for M0-c-02 / M0-c-04's F-WALL
  rungs. A consolidation round changes no behaviour, so it is not this round's line.
* The probe's own span sweep: 22 refusals, identical before and after, all UNLAWFUL input with the verdict REFUSE
  (typed, nothing written):
  * 14 come from the bridge-only mode, `S5a's strips: … bridge:1's span`. The water set withholds the pond while it
    gives the pond's bridge, which is a caller's inconsistent water set. The pipeline's S1 hands S5 the whole water
    set, so no user reaches this through §11.4's doors.
  * 8 come from the no-decks mode: 5 × `lies in river:1 off every bridge span` and 3 × `layStrips: a side's lines
    closed no strip face`. A way is laid over the pond with no crossing site, against C-0250's dry-way law. S4 lays a
    way over water only on a deck.

**Mutants** (targeted, in the lane's one mirror). Each was run as `vitest run --maxWorkers=1 --bail=1` on the folder's
six non-bar test files and, when it survived those, on the whole folder `packages/layout/test/growth/s5ab/` (the bar
included). Each mutated file was restored from `plat/` and `cmp`-checked.

| id | where | the fault | result |
|---|---|---|---|
| N01 | boundary `placeGateVertices` | `distToSegment2(a, c.at, b)` (arguments swapped) | killed (growth.test 'every promise holds on seeds 1 – 3': the gate vertices could not be put on their ways) |
| N02 | siting `distToSegment2` (now read by boundary) | the clamp `t > 1` dropped | killed (span.test 'the gate is the bridgehead …') |
| N03 | boundary `traceStage1` | `traceWithStrips({ ...slice, gates: [] }, …)` (the stage-1 stops diverge from `commitS3Slice`'s; the B12 class re-aimed at the one copy) | killed (stage1.test 'commits S3's trace byte for byte': level digests differ) |
| B12s | enceinte `traceWithStrips` (M0-c-02's file) | the way stop's half-width × 25 instead of × 50 | survives the s5ab folder (1 441 s): stage1.test now compares two paths through the same function; killed on `test/enceinte/` (strips.test 'seed 3: the strips end at each gate's corridor …'; 1 failed / 64 passed) — N-21 |
| N06 | siting `HA_CM2` (re-exported by boundary) | 10 000 000 | killed (growth.test) |
| M01 | mainRoads `mainRoadCount` | N_k on the added land | killed (growth.test) |
| N07 | proposals `idNumber` (now read by mainRoads) | `n + 1` | killed (growth.test 'the S5b roads: ways after S4's …') |
| N08 | mainRoads lineage | `idNumber(wayId, 'way')` | killed (growth.test) |
| M19 | mainRoads | `provisional: true` | killed (growth.test) |
| M20 | mainRoads | `growthStage: k − 1` | killed (growth.test) |
| M10b | mainRoads `wallClearance` | `boxOf(wall.slice(0, 1))` (the quick reject on siting's `boxOf` broken) | killed (growth.test) |
| M11 | mainRoads `routing` | the junction candidates' clearance off | killed (growth.test) |
| M02 | mainRoads `mainRoadCount` | `Math.floor` for `Math.round` (the spacing law) | killed (bar-2.test, 367 s) |
| M13a | mainRoads `attempt` | one source (`sources.slice(0, 1)`), not the nearest junction | killed (growth.test) |
| M13b | mainRoads `addSources` | a ring node keeps its first candidate, not the nearer | survives the whole folder (1 522 s); not equivalent: the probe's CITY seeds 1 – 16 all change print — N-20 |
| B07 | boundary `resettleT` | one-way road edges | killed (growth.test) |
| B08 | boundary `resettleT` | no seeding | killed (growth.test) |
| B09 | boundary `boundaryCrossings` | the 1 cm dedupe off | killed (growth.test) |
| B11 | boundary `squareGates` | off | killed (boundary.test 'a way square to the side …') |
| B14 | boundary `traceStage` | gate ordinals from 0 | killed (growth.test) |
| X02 | boundary `placeGateVertices` | the span rule skipped | killed (span.test) |
| X03 | boundary | the gate at the far deck end | killed (span.test) |
| X04 | boundary | the span rule and the water refusal both skipped | killed (span.test) |
| X05 | boundary `traceStage` | the span proof off | killed (span.test, the twin 'by the span proof') |
| X06 | boundary | the water-off-span refusal off | killed (span.test 'a crossing in the water off every span …') |
| X07 | boundary | two deck ends inside accepted | killed (span.test 'crossing the span twice …') |
| X12 | boundary `withinTraceBatch` | the proof run before the caller's callback | killed (span.test, the twin) |
| N09 | mainRoads `growthStart` | `heightsOf(site, points reversed)` | not run on the folder: every s5ab fixture is flat (every height 0), so it is equivalent there. The probe on `runBase` FLAT 1 and RIVER 1 (relief) is identical too, because S5b's routes pass no `gradeLimits` (`routeLadder` reads the grade only under a limit). The equivalence of the shared `heightsOf` is shown by the helper probe on rough terrain |
| N10 | mainRoads `courses` | `rimAtBearing(lattice, pick.at.y, pick.at.x, …)` (x and y swapped) | not run on the folder: it is c-04 N-2's M12 class, a known survivor. The probe's CITY seeds 1 – 16 all change print, so the NO-SHIFT probe is the proof, as the plan's 1.0.4 says — N-22 |

That is 29 mutants: 25 killed on the s5ab folder; B12s killed on its owner's folder; M13b and N10 not caught by the
folder, though the probe catches both; N09 equivalent on every reachable input. The plan's oracle mutants M01, M02,
M13 (as M13a), M19, M20, B07, B08, B09, B11, B12 (as N03), B14, X02 – X07 and X12 are killed again.

20. **N-20 KI (consolidation round C1): the junction a road starts from has no pin.** The site is mainRoads
    `routing`'s `addSources`, where a ring node keeps its nearest candidate. Mutant M13b keeps the first candidate
    instead. It passes the whole s5ab folder, the bar included, yet changes all 16 probed CITY seeds' arenas. The checks
    test properties (a T junction on a standing way, the roads' rules), not which candidate a road starts from. The
    round leaves the site untouched, and the before/after outputs are identical, so the gap predates the round.
    Suggested handling: pin each S5b road's `from` junction on one CITY seed (growth.test), or assert in a hand case
    that the source node keeps the nearer of two candidates. Hardening pass (J273); at the latest M4. CONFIRMED (the
    survivor and the 16 changed prints, executed). PLAUSIBLE (that it survives on the pre-round sources too: reasoned
    from the untouched site and the identical outputs, not run).
21. **N-21 KI (consolidation round C1): stage1.test's digest test now compares two calls of one function.** Before the
    round, `traceStage1` was a copy of `commitS3Slice`'s tail, so stage1.test caught a fault in either copy (the
    original B12). Both now call `traceWithStrips`. The test still pins `traceStage1`'s own arguments (N03 killed),
    and the shared code's stop width is pinned by its owner's `test/enceinte/` strips test (B12s killed there), not by
    s5ab. No action needed unless the session wants s5ab to pin the stage-1 strips' widths independently (an assertion
    on `strips.value` against a hand-computed corridor). Note only. CONFIRMED (executed).
22. **N-22 KI (consolidation round C1): the outer course's rim at the bearing is still pinned only by the probe.** This
    is c-04 N-2 (M12) again, met through the new call `rimAtBearing(lattice, pick.at.x, pick.at.y, …)`. Mutant N10
    (x and y swapped) changes all 16 CITY seeds' prints. The plan accepts the 16-seed before/after as the proof
    (1.0.4); the test gap stays the hardening pass's (J302 Q12). CONFIRMED (the probe, executed).

**Gates** (in the tree, on this round's final files):
* `install --frozen-lockfile`: 0.
* `lint`: 0 (eslint 1 155 files, 0 errors, 0 warnings; probe-red ok; 9 whole-tree checks).
* `build`: 0.
* NEAR, `packages/layout/test/growth/s5ab/` at full strength: 11 files, 46/46 (W=1, 1 488 s).
* RELATED at `PLAT_FUZZ_RUNS=1000` over `boundary.ts` and `mainRoads.ts`: 218 files, 2 637 / 2 637, exit 0 (W=1, 8 232 s), no red.

## The closing checker's notes, consolidation round C1 (lane `check/M0-c-04-consolidate-close-1`, 2026-10-13)

None of these rows is a blocker. Each is a test gap or a wording to tighten that predates the round or sits beside it.
The round's own shift is ruled out by the NO-SHIFT probes in `checks/M0-c-04-c1.md`. Mutant ids are this checker's
(`checks/M0-c-04-c1.md`, the mutant table).

23. **N-23 KI (consolidation round C1): the lineage index of S5b's road batch has no pin.** The site is mainRoads
    `commitRoads`: `lineageHash({ …, index: idNumber(wayId, 'way:'), … })`, the call this round re-pointed at the
    proposals' `idNumber`. Mutant K04 (`index … + 1`) passes the whole s5ab folder, the bar included (1 155 s on the
    five chunks). The tests catch only a collision, as when every index is −1 (the builder's N08). They never read
    which index a road's chain carries (§6.3, the regeneration key). The mutant is not equivalent, because it changes
    every S5b way's lineage. Suggested handling: on one CITY seed, pin each S5b road's `insertChain` lineage to
    `lineageHash({ arena, unit: town, stage: S5, epoch: 0, index: n, reroll: 0 })` for `way:n`. Hardening pass (J273),
    M4 at the latest. CONFIRMED (the survivor, executed). PLAUSIBLE (that it also survives on the pre-round code:
    reasoned, since the call is the same).
24. **N-24 KI (consolidation round C1): stage1.test pins `commitS3ThenStage1` only without water, and never its
    warnings.** Mutant K11 drops the water given to `traceWithStrips` (`{ bodies: [], bridges: [] }`), and mutant K13
    drops the tail's warnings (`ok(tail.value)`). Both pass the six non-bar files of the s5ab folder (102 s and 103 s).
    The bar does not call `commitS3ThenStage1`: the pipeline commits stage 1 through `commitS3Slice`. The round's
    equivalence for water and warnings is shown by this checker's stage-1 probe instead. That probe ran on the CITY +
    river band at seeds 1 – 6 with the water given: before = after, byte for byte, and on every line the levels, the
    value and the warnings equal `commitS3Slice`'s. Suggested handling: add to stage1.test one water case (the river
    band) and `expect(cb.warnings).toEqual(ca.warnings)`. Hardening pass, M4 at the latest. CONFIRMED (both
    survivors, and the probe, executed).
25. **N-25 KI (consolidation round C1): `roadFault`'s near filter is N-3's class again.** Mutant K08 builds the
    obstacle/way box from the first two points only (`boxOf(pts.slice(0, 2))`). This is the call this round
    re-pointed at siting's `boxOf`. K08 passes the whole folder, the bar included (1 111 s), for N-3's reason (M14):
    `roadFault` never fires on the tested seeds. The round's `boxOf` equivalence is shown by reading: the same
    `[minX, minY, maxX, maxY]` the call site reads. The clearance call site's box is pinned: K06 (the box shrunk) and
    K07 (siting's `boxOf` returning x1 = x0) are both red in growth.test. Suggested handling: N-3's (a hand case whose
    smoothed level crosses a standing way, so `roadFault` must choose a later level). CONFIRMED (executed).
26. **N-26 (consolidation round C1): a stray copy of `courses`' header stands above `interface Routing`.** It is at
    `mainRoads.ts:593 – 602`. The doc comment "Each pick's course (S5b; see the header) …" is followed at once by the
    `Routing` interface's own doc comment, so it documents nothing. Its text is an older form of `courses`' header
    (`:706 – 714`). It names no nearest-frame fallback, and it says "An unwalled stage's road may leave the ring on its
    way to the destination". That holds only for the smoothed polyline, which on an unwalled stage meets no outline
    test. The lattice course itself is held to the ring (`innerMask`). The round's §2 rows do not name it (only the
    removed helpers' headers), so it is not a rewritten comment of this round. PLAUSIBLE: no before-image survived on
    this machine to show that it predates the round. Suggested handling: delete the stray block in the next comment
    pass of the growth pair (a consolidation follow-up, or M4).
27. **N-27 (consolidation round C1): two claims to tighten about the kept citations.** Choices C-0354 (7) says "the
    rule-stating N-54 (3), N-45, C-0244, C-0285 citations … kept". The plan's 1.5.9 (and the round's brief) lists
    boundary.ts's citations as "N-45, N-54 (3), N-55, C-0285, C-0292, C-0303". Today N-45, N-55 and C-0303 appear in
    neither file of the owns: `grep -E 'N-45|N-55|C-0303'` on `boundary.ts` and `mainRoads.ts` gives nothing. C-0303 is
    cited in `span.test.ts:1, :270`, and N-45 only in `proposals.ts:827` (M0-c-05's file). The plan's own count of
    boundary.ts comment lines citing an N-ruling (§0: "boundary 5", the pre-round tree) equals today's count (5 lines,
    each N-54 (3)). So no citing line is shown lost, and the lists name more than the file held. Suggested handling: the
    session reads C-0354 (7)'s "N-45" as "N-54 (3)" (or the builder's next row corrects it). Note only. CONFIRMED (the
    grep and the count). PLAUSIBLE (that the pre-round file held no N-45 / N-55 line: inferred from the plan's count).

## Hardening round S4 (lane `build/M0-c-04-fix-s4`, 2026-10-28) — the builder's row-by-row outcome

The session's hardening round of the item (J237 (2), J238, J264 / N-58, J290, J263 Q1 / Q6) on the inventory's FIX-NOW
rows (`checks/hardening-inventory.md` §3, entry 31), the queue row L31, Q66 / R-34 (the same guard) and the census row Q37
merged in. The gate (M0-c-02 S5's landing, `check/M0-c-02-close-s5` LANDED 12:12) was read first: c-02's 'Hardening round
S5' rows 47 (Q27, L31, M0-c-04:138 19) and 48 – 56. Choices row C-0449 names every row it closes; ledger row L-0702. The
before image is the owns at the round's start: all 16 files hash equal to the landed record `M0-c-04.json` (lane
`build/M0-c-04-consolidate-1`), kept in the lane's scratch. Every probe and mutant ran in the lane mirror
`/home/user/maps-scratch/waves/selfcheck-build-M0-c-04-fix-s4/` (isolation proved: no link into the tree, the workspace
packages resolving inside the mirror; removed at the end).

28. **N-28 row by row: the outcome, its evidence and its mutant (the table in row 31).**
    * **1 N-1 — PINNED.** `resettle.test.ts` "a node the new roads reach at exactly its cost is not lowered": a field
      priced with the roads already in it (T a full recompute over the extended road set) while its road flags are the old
      ones, so every relaxation from the new edges ties bit for bit (the case two equal branches make when one is priced
      in): `lowered` is empty and T unchanged; then a road set added in two steps lowers, at the second, exactly the nodes
      the second strictly improves. B05 (`<=` in the propagation) and B05s (`<=` in the seeding) killed.
    * **2 N-2 — PINNED.** `checks.ts`' `violations` (growth.test seeds 1 – 3, the bar's 100 seeds): each S5b road's lattice
      course ends at a rim node, and at the rim node its radial bearing from its destination meets (`rimAt`, written in
      the test: the ray walked in one-spacing steps out of the frame, the nearest rim node) unless that route found none
      and the nearest frame was taken — its `unserved` rung on the route `s5b:<k>/<pick>/out` recorded, the fallback named.
      Probe A over CITY 1 – 100: 4 courses end off their bearing, each with its `/out` rung (seed 11 way:19, and three
      way:21), and 0 off-bearing ends without one. M12 (every outer course to the least-cost rim) and N10 (x and y swapped)
      killed.
    * **3 N-3 — PINNED, each guard on its own fixture.** `guards.test.ts`: `roadFault` (file-level now; the barrel
      unchanged) has one fixture per fault — `start`, `self` (a crossing and a fold-back), `obstacle` (a wall segment; one
      beside the road is none), `way` (a standing way crossed off the junction, the first segment run along its own way, a
      later segment touching the junction's way), `outline` (out and back across the north side; once but off the
      destination; no outline test unwalled) — and `smoothestLawful` (the fallback loop lifted out of `courses`, the same
      statements) takes level 0, falls back to 1 and to 2, and returns none with every level's fault. End to end:
      `growth.test.ts` "a wall across every course" (stage 1's line replaced, for stage 3's S5b on the 900 ha frame, by a
      ring 100 m inside the frame: every destination unserved `invalid`, its faults named, no road, the version kept), and
      "a destination whose every course meets a standing way … (400 ha, seed 3)" — the frame's own `invalid`
      (`faults: way ×4`), reached with no hand edit. C-0244 (6) is now a promise of `violations`: an S5b road meets the other
      ways only at a T junction of one of the two roads. M14 (`roadFault` null), M15 (the outline-once rule off), FB (the
      fallbacks off), M29 (the walls dropped from the obstacles), WX (the standing ways neither blocked nor faulted) killed
      — WX by seed 2's junction pin (the courses move; on CITY seeds 1 – 3 no course crosses a way even unblocked, so the
      C-0244 (6) promise was shown to fire by probe D: a way laid across seed 1's way:14 is named "way:14 meets way:99 at
      (−134864, −73600), no junction of theirs"); B15 (the trace's core dropped) killed by span.test's refused-trace pin.
      The bar's new C-0244 (6) promise found a pre-existing defect on CITY seed 79 (this round's first NEAR run): way:21's
      first segment ended 20 cm off way:15, 1.9 m from its junction, so the insertion laid it along way:15 (one edge
      carrying both `way` rows) and the vertex where it branched off carried no junction row. `roadFault` now reads a
      meeting within the attraction distance as the insertion makes it (§3.6 step 2): a vertex of the road but its junction
      within TOUCH_CM (26 cm) of a standing way or an earlier road of the batch, or such a way's vertex but the junction
      within it of the road, is the fault `way`; the course then takes its next level or its next candidate. Seed 79's
      way:21 now leaves way:15 at (−51 268, −62 521), level 0 — the round's one DECLARED SHIFT (row 29). Pinned by
      `guards.test.ts` "'way': a vertex of the road within the attraction distance of a way, or a way's vertex within it of
      the road" (NEARW killed) and by the bar on seed 79.
    * **4 N-4 — B10 PINNED; APPROACH_NODES RECORDED defensive.** `span.test.ts` "a crossing 40 cm from a way vertex takes
      that vertex as its gate": the dry approach edge crossed 40 cm before the west deck end takes that deck end (the way's
      own vertex), nothing split at the crossing, the span whole (B10, the snap off, killed: the first red is P6's slot,
      whose two crossings no longer take the deck end).
      M16 (`APPROACH_NODES` 0) is killed only by seed 2's junction pin (N-20: the straight approach changes which
      junction a course leaves), a change detector, not the mechanism's purpose: no tested seed needs the approach to keep
      its wall crossing its road once (the first check's seeds 48, 53, 77 no longer do). It is kept as defensive in C-0449
      (4): the road's last two steps into its gate run inward, so the wall, which may depart 40 m from the boundary,
      crosses it once, at its gate.
    * **5 N-5 — PINNED.** `growth.test.ts` "the frames whose stages take the other branches": the 900 ha frame seed 1's
      stage 2 (walled, N 5, c 5) spawns none, its main gates the five crossings; the 240 ha frame seed 1's stage 3 is
      capped, adds land, is not folded, runs S5b and reports `short` 6 (N 14 − c 8 − 0 picks). Every promise of
      `violations` holds on both. M32 (`short` forced to 0) and NLC (N_k − c read as N_k) killed.
    * **6 N-6 — PINNED.** `growth.test.ts` "T is one field": stage 2's `lowered` is exactly the count of nodes whose T fell
      between the field stage 2 read and the one stage 3 read, every other node's T kept bit for bit, and a strict part of
      the lattice. FULL (the stage's `lowered` the whole lattice, as a recompute would report it) killed.
    * **7 N-7 — STATED (comment and choices text).** `s5aStage` keeps §4.1's declaration (declared); its batches — the gate
      plan, the trace's and the strips' — are callback batches at S5's rank (C-0226 (2), C-0244 (8)), always safe (§4.1).
      The registration takes each sub-stage's form as declared (`BASE_OP_FORMS` S5a 'declared', M0-x-04's table test) and
      pins S5a's callback batches as its one exception (`run.test.ts`: `off` = ['S5a:callback'], C-0264 (1)); the registered
      S5 stage is the combined 'callback'. So the declaration stays and the exception is the registration's: C-0449 (7).
    * **8 N-8 — FIXED, PINNED; the rows kept below.** `bar.ts` keeps the rows as data (`BarRow`), prints them, carries them
      in the bar's failure message, and appends them as one JSON line per seed to the file `PLAT_S5B_ROWS` names
      (`writeBarRows`); `guards.test.ts` pins the writer (ROWS, the writer off, killed). The 100 rows of this round's NEAR
      run are row 30.
    * **9 N-9 — FIXED, PINNED, NO SHIFT.** S5b's c counts crossings: `crossingsThrough` (file-level) keeps a meeting of
      `boundaryCrossings` only where the way passes from one side of the outline to the other — read 30 cm along the way
      before and after it (half the distance to a neighbouring meeting of the same run when nearer), a meeting at a run's
      end kept. `checks.ts`' `recountC` counts the same way with its own reading (`wayMeetings`: 5 cm along the way's own
      edges, or its two edges at a vertex it meets the ring at). The trace's gates stay every meeting: a graze, if one
      occurs, keeps its pin, so the wall meets the way there at a gate vertex and nowhere beside it; `violations` counts
      such a pin beside max(N_k, c). `boundary.test.ts` "a way tangent to the outline at a vertex of its own, or touching a
      corner from outside, is no crossing" and "every crossing is kept" (GRAZE, a graze kept, killed). Probe A: 0 grazes in
      the 200 stage boundaries of CITY 1 – 100 (and on the probed frames), so no c, no N_k − c and no print moved (row 29).
    * **10 N-10 — REPORTED (a contract between items).** The gate plan stays a batch that is always rejected. Planning
      without a batch needs where the kernel's split puts each gate vertex before the strategy's trace, which reads the gate
      points before its own batch opens (`trace.ts`: `withGates`, the pull, the smoothing, then `k.tx`), and only
      `splitThrough`'s plan knows them (`planSplitThrough` takes an open transaction; §3.6's attraction and placement).
      The three ways out are other items': a read-only split plan outside a batch (M0-a-05's insertion), a strategy that
      computes its line inside its own batch from points a prelude hook returns (M0-c-02's `TraceOptions`; C-0285's note;
      c-02 S5 built no such hook), or watchers that skip a marked planning batch (the bench's `watchedKernel`, the
      pipeline's `watched`). This round tried the in-owns form — S5a opening one L1 batch, making the splits on its overlay
      and handing the strategy a kernel whose one callback batch runs on that same overlay — and withdrew it before any
      test: it moves the strategy's post-commit read-back (the gate read-back, `wallInPieces`) inside the batch, ahead of
      the kernel's commit rows, so the planted S5a zero-area and collinear cells would be refused inside the batch instead
      of committing and being rolled back — M0-x-06's pinned facts (`repins.test.ts`: `rolledBack` → `batchCommitted`
      true; C-0278 (1)) — and the self-touching cell's words would change (PLAUSIBLE: reasoned from the code and the pins,
      not run). The receipts' shift is the planning batch's: one refused S5 batch per walled stage k ≥ 2, its work spent
      twice; nothing is written by it (the version kept, span.test's batch pin reads it). For the session.
    * **11 N-11 — PINNED.** `span.test.ts` "two gates at one bridgehead are refused, named, nothing written": a 10 cm slot
      from the north beside the west deck end (its two sides cross the way 50 and 40 cm before it, each taking that deck
      end) and the span crossed at mid-span, whose bridgehead is the same deck end — refused `S5a: the gate vertices could
      not be put on their ways: S5a: two gates at bridge:1's bridgehead (50000, 0) (N-54 (3))`, verbatim, the version and
      the vertices kept, the span whole (X11, the guard off, killed).
    * **12 N-12 — RECORDED defensive (C-0449 (12)).** (a) X09: the bridgehead gate's recomputed bearing is read by no
      consumer at M0 (`baseEnceinte.trace` reads no `GateSite.bearingCdeg`, the gate record carries none); kept so a later
      reader of the site's bearing reads the gate's own. (b) X08: the splits re-made in the trace's batch are what make each
      gate a vertex of its way before the wall's insertion, and what the batch's `moved` check reads against the plan;
      insertChain's own crossing vertex stands at the same point on every observed input, so the redundancy is a backstop,
      kept. No code change.
    * **13 N-13 — RECORDED (the precedence, C-0449 (13)), PINNED.** The way-vertex snap comes first: a crossing within
      2 · TOUCH_CM of a deck end is that deck end, the way's own vertex, even when it lies just outside the outline as
      given (the outline moves at most 52 cm to it; the span whole, the gate on land). Applying the span rule first would
      move such a gate 20 m to the other deck end for a 20 cm difference; the design (§4.4 S5a *Trace* (2): the gates
      pinned where the arterials cross the boundary) supports the nearer. `placeGateVertices`' comment states it;
      `span.test.ts` "a crossing 20 cm from the far deck end gates at that deck end" (SPAN1, the span rule first, killed).
    * **14 N-14 — FIXED, PINNED.** `withinTraceBatch` arms exactly one batch: a second batch through it, or a declared one,
      is refused E_INVARIANT, writing nothing (`… opened batch 2 through S5a's seam, which arms exactly one callback batch
      (C-0449 (14))`), so the splits and the proofs never run in a batch that is not the commit; and `traceStage` refuses
      a trace that committed through other than its one armed batch. `span.test.ts` "the trace makes one callback batch
      and the strips one, after the gate plan; nothing else is opened" pins the sequence a watching kernel sees: the plan
      (refused 'S5a: the gate plan (a batch always rejected)'), the trace's commit, the strips' commit. EXTRA (M0-c-02's
      trace opening a dry-run batch before its commit, mutated in the mirror) killed; ARM2 (the seam's strictness off)
      survives as a backstop no honest input reaches (one batch each today). Not closed by N-10's hook: none was built.
    * **16 N-16 — FIXED, PINNED.** `wetSetback` now proves every setback edge too: `wetPointOn` (file-level) finds a point
      of the edge deeper than STRIP_WET_DEPTH_CM in a water ring read with its holes, by halving (a stretch of half-length h
      about a point at depth d holds nothing deeper than d + h), to half a centimetre. `guards.test.ts`: an edge across a
      water corner with both ends dry is found; a graze of the corner and an edge 1 cm inside the bank are dry, 3 cm is not;
      an island hole is dry land (WPO, the halving off, killed). `proof.test.ts` withholds one water stop from the strip
      stand-in (a `vi.mock` of `layStrips` filtering the given stops) while the body stays in the water set: with the
      puddle's stop withheld — a triangle 15 m off the stage's south side reaching across the outer setback line between two
      of its vertices — the strips' batch is refused "S5a's strips: a setback edge of enceinte:2 (…) → (…) crosses river:3
      at (…)", no setback written (EDGE, the edge proof off, killed: the batch commits); with the pond's withheld, "a setback
      vertex … lies in river:1".
    * **20 N-20 — PINNED.** `growth.test.ts` "pins the junction each S5b road leaves on seed 2": the seven roads' way, the
      way each leaves and the junction point there (read on the before image by probe A and on the tree: identical). M13b
      (a ring node keeps its first candidate) killed.
    * **23 N-23 — PINNED.** `growth.test.ts` "each S5b road's op carries its way's lineage key (§6.3)": a kernel watching
      the S5 declared batches on the 900 ha frame seed 1 reads each road's `insertChain` op: index 0, lineage
      `lineageHash({ arena, unit: lineageHash(TOWN_ROOT), stage: S5, epoch: 0, index: n, reroll: 0 })` for `way:n`. K04
      (index + 1) killed.
    * **24 N-24 — PINNED.** `stage1.test.ts` "with a river band given": a river band through the town at x 300 – 340 m
      with a deck at y 0, laid on L0 by hand in each arena; `commitS3ThenStage1` with the water equals `commitS3Slice`
      level digest for level digest, its water gates, strips and line, and its warnings (seeds 1 and 2). K11 (the water
      dropped) and K13 (the warnings dropped) killed.
    * **26 N-26 — DONE (comment).** The stray copy of `courses`' header above `interface Routing` is deleted.
    * **M0-d-09:68 10 — EXPLAINED (text; C-0449 (d-09)).** At the test frame (`runBase` FLAT 400 ha, 12 ha walled, the
      d-09 seeds 1 – 3, old and `{ S5: 1 }`), S5's town-root streams draw nothing that can move: S5c grows nothing (seeds 0,
      proposals 0, streets 0 at every stage — no seed inside a boundary, §4.4 S5c; M0-c-05's to confirm), S5d prices what
      stands, stage 3 spawns no primary (N 3 = c 3), and stage 2 spawns one (N 3 − c 2) whose pick is the candidate with
      the largest angular gap — the score is the gap term (gap ÷ 18 000 to the nearest crossing) plus 0.05 · u, one
      uniform u per candidate (`PICK_JITTER`), flat ground adding no slope term. On the d-09 seeds 1 – 3 the best
      candidate's gap term leads the runner-up's by 0.068, 0.043 and 0.036: on seed 1 no draw can change the pick, and
      on seeds 2 and 3 only a runner-up's uniform beating the best's by more than 0.87 or 0.73 can (about 1 % and 4 % of
      draws for that one rival). The `{ S5: 1 }` pair therefore re-draws nothing at S5 on these seeds, and
      S6 / S8 read an unchanged S5 (probe B: no stage root moved, 0 refusals, both runs). At CITY (seed 1) stage 3 spawns
      six primaries among candidates within the jitter of each other after the first picks, so the reroll moves S5, S6 and
      S8 — as d-09's note saw. A test-frame pair is no matching workload for S5; the frame needs more primaries than
      crossings at a stage with more than one candidate near the best gap (a later fusion workload's choice, not S5's
      defect).
    * **L31 / Q66 / R-34 — FIXED (MAKE-IT-SUCCEED), PINNED.** `traceStage` no longer refuses `notBuilt('M1')` a trace that
      crosses water while an earlier enceinte holds water gates: each water gate takes the lowest `gate:w<i>` no earlier
      gate holds (C-0324 (3), c-02's `trace.ts`). `traceStep` hands no count on; `StageTraceOptions.earlierWaterGates` is
      read by nothing and kept for the frozen API. `span.test.ts` "a stage-3 trace over the water after stage 2's water
      gates commits with the lowest free ones, gate:w2 and gate:w3" (a river band across the frame: stage 2's two water
      gates gate:w0 and gate:w1, stage 3's gate:w2 and gate:w3, every gate_end on one vertex each) (L31G, the guard
      restored, killed: refused notBuilt('M1')). The guard fired on none of the census's runs before the round (stage 1's
      trace was never counted), so its removal lowers no count there; it makes a lawful class succeed.
    * **Q27 (c-04's half) — DONE, NO SHIFT.** `stageStops` no longer copies `stopsFromArena`'s water-gate reading: it gives
      each main gate's stub along the trace's normal (this stage's rule) and a water stop for every water ring, and
      `layStrips` merges them with the stops it reads (Q27): a read water-gate stop is dropped by its ring. The rings are
      the faces' own (the water gates' among them), so the stops `layStrips` lays from are the same (row 29's prints and
      census identical, span.test's water stages green).
    * **Q37 (census) — confirmed resolved by M0-c-02 S5.** The three EP-01/S5a/coincident seeds commit on their first state
      (`repins.test.ts`, RELATED green); this round's stops change nothing there (the strips of a stage with no water are
      laid from the same stubs).
    * **M0-c-04:138 19 N-19 (c-04's half) — DONE.** `span.test.ts`' chord pin matches c-02's stable tag: the detail ends
      with `[water: loose-gate]` (`LOOSE_GATE_TAG`), its coordinates no longer matched.
29. **N-29 the refusal census (J264 (4), N-58) and the shift, before → after.** The before image's sources in the lane
    mirror against the round's, the same probes and seeds (probe C: S3 → S4 → S5a / S5b through the item's `grow`; probe
    B: M0-x-06's `edgeChain` through S5 with the registered S5 — the base set — and `runBase` on the d-09 frame).
    | family (registered) | before | after | the refusals left |
    |---|---|---|---|
    | the here-bar: CITY flat fixture seeds 1 – 100 (probe C) | 0 | **0** | — |
    | the probed frames: 400 ha / 30 ha seeds 1 – 12, 900 ha / 90 ha seeds 1 – 6 (probe C) | 0 | **0** | — |
    | the base set through S5: FLAT 1 – 3, RIVER 1 – 6, RIVER 900 ha 1 – 15, RIVER from the north 900 ha 1 – 6 (probe B) | 12 | **12** | every one F-WALL `E_SELF_INTERSECT` "the trace touches itself after the re-offset and union-simplify rungs; the later rungs are M1's" — RIVER 3, 4 (S5), 5 (S3); 900 ha 3, 7, 10, 13 (S3), 9, 11 (S5); from the north 3, 5 (S3), 6 (S5): LAWFUL, REFUSE `notBuilt('M1')` (R-30's ruling); the S3 ones are stage 1's trace (M0-c-02's), the S5 ones stage 2's through M0-c-02's strategy |
    | the d-09 test frame, `runBase` FLAT 400 ha / 12 ha seeds 1 – 3, old and `{ S5: 1 }` | 0 | **0** | — |
    | L31's guard (`notBuilt('M1')`, R-34) on the above | 0 | **0** (removed) | — |

    The census never rose. L31's refusal class is removed outright: no registered run reached it (stage 1's trace was
    never counted, so it fired only for a third walled stage after a second with water gates, which no M0 fixture has);
    span.test's two-stage band now commits where it would have refused.
    * **DECLARED SHIFT — CITY seed 79's way:21 only (N-3's near rule).** Probe C over CITY 1 – 100: 99 seeds byte-identical
      (levels L0 – L4, version, stages, ways, junctions, T, the route report); seed 79's stage-3 road way:21 leaves way:15
      at (−51 268, −62 521) instead of (−37 726, −82 321) (its old course laid along way:15 for 1.9 m), level 0, so L1 – L4,
      the stages, the ways, T re-settled by it and the route report move there; the version (9), the junction records and
      every other road are unchanged (the after lines' sha b13ee6f0…). The 400 ha
      and 900 ha frames: identical. The base set: identical (probe B's 33 lines, d-09's included, before = after). No golden of the item's names seed 79; seed 2's junction pin
      (N-20) and every other pin read the same. Everything else in the round — L31, N-9's c, the seams, the edge proof, the
      stops — moves nothing: before the near rule the three probe-C families were byte-identical (sha 888fabd2…).
30. **N-30 the bar's §13.2 rows (N-8), this round's NEAR run (`PLAT_S5B_ROWS`).** Per CITY seed: the primary length per
    km² of the town's land (descriptive, no band at M0) and the gates on primaries (1 by the gate rule).
    | seed | km/km² | gates | seed | km/km² | gates | seed | km/km² | gates | seed | km/km² | gates |
    |---|---|---|---|---|---|---|---|---|---|---|---|
    | 1 | 4.032 | 15 | 26 | 4.195 | 15 | 51 | 4.185 | 15 | 76 | 4.015 | 15 |
    | 2 | 3.878 | 15 | 27 | 4.063 | 15 | 52 | 3.965 | 15 | 77 | 4.026 | 15 |
    | 3 | 4.187 | 15 | 28 | 3.948 | 15 | 53 | 3.823 | 15 | 78 | 4.124 | 15 |
    | 4 | 4.139 | 15 | 29 | 3.917 | 15 | 54 | 4.099 | 15 | 79 | 4.077 | 15 |
    | 5 | 4.041 | 15 | 30 | 4.167 | 15 | 55 | 4.150 | 15 | 80 | 3.905 | 15 |
    | 6 | 3.946 | 15 | 31 | 4.159 | 15 | 56 | 4.046 | 15 | 81 | 4.139 | 15 |
    | 7 | 4.026 | 15 | 32 | 4.012 | 15 | 57 | 4.006 | 15 | 82 | 3.896 | 15 |
    | 8 | 4.083 | 15 | 33 | 4.217 | 15 | 58 | 3.969 | 15 | 83 | 4.172 | 15 |
    | 9 | 3.974 | 15 | 34 | 3.992 | 15 | 59 | 3.899 | 15 | 84 | 4.009 | 15 |
    | 10 | 4.078 | 15 | 35 | 4.073 | 15 | 60 | 3.968 | 15 | 85 | 3.943 | 15 |
    | 11 | 3.846 | 15 | 36 | 4.031 | 15 | 61 | 4.097 | 15 | 86 | 3.974 | 15 |
    | 12 | 3.925 | 15 | 37 | 3.921 | 15 | 62 | 4.080 | 15 | 87 | 4.015 | 15 |
    | 13 | 4.049 | 15 | 38 | 3.948 | 15 | 63 | 3.934 | 15 | 88 | 4.104 | 15 |
    | 14 | 3.962 | 15 | 39 | 3.752 | 15 | 64 | 4.038 | 15 | 89 | 4.055 | 15 |
    | 15 | 4.064 | 15 | 40 | 4.201 | 15 | 65 | 3.949 | 15 | 90 | 4.126 | 15 |
    | 16 | 4.080 | 15 | 41 | 3.895 | 15 | 66 | 4.008 | 15 | 91 | 4.038 | 15 |
    | 17 | 4.085 | 15 | 42 | 4.028 | 15 | 67 | 4.040 | 15 | 92 | 4.179 | 15 |
    | 18 | 3.881 | 15 | 43 | 4.016 | 15 | 68 | 4.053 | 15 | 93 | 3.933 | 15 |
    | 19 | 3.883 | 15 | 44 | 3.985 | 15 | 69 | 4.043 | 15 | 94 | 4.071 | 15 |
    | 20 | 3.945 | 15 | 45 | 3.959 | 15 | 70 | 3.981 | 15 | 95 | 4.163 | 15 |
    | 21 | 4.060 | 15 | 46 | 3.981 | 15 | 71 | 4.267 | 15 | 96 | 3.806 | 15 |
    | 22 | 3.977 | 15 | 47 | 3.895 | 15 | 72 | 3.988 | 15 | 97 | 4.117 | 15 |
    | 23 | 4.030 | 15 | 48 | 3.879 | 15 | 73 | 4.056 | 15 | 98 | 3.981 | 15 |
    | 24 | 4.113 | 15 | 49 | 4.014 | 15 | 74 | 3.950 | 15 | 99 | 3.971 | 15 |
    | 25 | 4.058 | 15 | 50 | 4.032 | 15 | 75 | 4.036 | 15 | 100 | 3.917 | 15 |
    All 100 seeds: every gate on a primary (15 main gates each); the length density 3.752 – 4.267 km/km², mean 4.020.
    Seed 79 reads 4.077 (3.981 before the round: its way:21, row 29's shift); every other row as before the round.
31. **N-31 the round's mutant table (J183; the lane mirror, each on its pin files with `--bail=1`, `--maxWorkers=1`,
    restored by copy and `cmp -s` before the next, every one `restored=True`).** 30 targeted mutants, run on the round's
    final sources: 29 killed, 1 survivor judged (ARM2, a backstop).
    | id | row | file | the mutation | pin files | result (the first red test) |
    |---|---|---|---|---|---|
    | B05 | N-1 | boundary.ts | `resettleT`'s propagation `cand <= dist[v]` | resettle | KILLED — "a node the new roads reach at exactly its cost is not lowered: lowered lists strict falls only" |
    | B05s | N-1 | boundary.ts | `resettleT`'s seeding `cand <= dist[v]` | resettle | KILLED — "a node the new roads reach at exactly its cost is not lowered: lowered lists strict falls only" |
    | M12 | N-2 | mainRoads.ts | every outer course to the least-cost rim (`ladder(rims)`) | growth | KILLED — "every promise holds on seeds 1 – 3 (nesting, N_k − c, gates on their boundary, walls, roads, T)" |
    | N10 | N-2 | mainRoads.ts | `rimAtBearing` with x and y swapped | growth | KILLED — "every promise holds on seeds 1 – 3 (nesting, N_k − c, gates on their boundary, walls, roads, T)" |
    | M14 | N-3 | mainRoads.ts | `roadFault` always null | guards | KILLED — "'start': the polyline does not begin at its junction" |
    | M15 | N-3 | mainRoads.ts | the outline-once rule off | guards | KILLED — "'outline': a walled stage's road crosses its outline exactly once, at its destination" |
    | FB | N-3 | mainRoads.ts | `smoothestLawful` tries the smoothed course only | guards | KILLED — "falls back to the simplified course (level 1), then to a lattice course (level 2)" |
    | NEARW | N-3 | mainRoads.ts | the attraction-distance meeting off | guards | KILLED — "'way': a vertex of the road within the attraction distance of a way, or a way's vertex within it of the" |
    | M29 | N-3 | mainRoads.ts | the walls dropped from a road's obstacles | growth | KILLED — "a wall across every course: every destination unserved invalid, its faults named, no road committed" |
    | B15 | N-3 | boundary.ts | the trace's core dropped | span | KILLED — "a refused trace leaves the arena as it found it: no gate split, the span whole, the version unchanged" |
    | WX | N-3 | mainRoads.ts | the standing ways neither blocked for the router nor faulted | growth | KILLED — "pins the junction each S5b road leaves on seed 2" |
    | B10 | N-4 | boundary.ts | the gate's snap to its way's vertex off | span | KILLED — "two gates at one bridgehead are refused, named, nothing written" |
    | M16 | N-4 | mainRoads.ts | `APPROACH_NODES` 0 | the six non-bar files | KILLED — "pins the junction each S5b road leaves on seed 2" |
    | M32 | N-5 | mainRoads.ts | `short` forced to 0 | growth | KILLED — "a capped stage that still adds land runs S5b and reports the destinations no candidate was left for (240 ha, seed" |
    | NLC | N-5 | mainRoads.ts | N_k − c read as N_k | growth | KILLED — "every promise holds on seeds 1 – 3 (nesting, N_k − c, gates on their boundary, walls, roads, T)" |
    | FULL | N-6 | mainRoads.ts | a stage's `lowered` the whole lattice (a recompute's reading) | growth | KILLED — "T is one field: stage 2 reads S3's field itself, stage 3 the field S5b re-settled, never a new one" |
    | ROWS | N-8 | test bar.ts | `writeBarRows` writes nothing | guards | KILLED — "writes one JSON line per seed to the file PLAT_S5B_ROWS names, nothing when none is named" |
    | GRAZE | N-9 | boundary.ts | `crossingsThrough` keeps a graze | boundary | KILLED — "a way tangent to the outline at a vertex of its own, or touching a corner from outside, is no" |
    | X11 | N-11 | boundary.ts | the two-gates-at-one-bridgehead guard off | span | KILLED — "two gates at one bridgehead are refused, named, nothing written" |
    | SPAN1 | N-13 | boundary.ts | the span rule before the vertex snap | span | KILLED — "a crossing 20 cm from the far deck end gates at that deck end (the vertex snap first), the span whole" |
    | EXTRA | N-14 | enceinte/trace.ts (M0-c-02's; mirror only) | the strategy opens a dry-run batch before its commit | span | KILLED — "the gate is the bridgehead on the stage's side, the span stays one edge between its deck ends" |
    | ARM2 | N-14 | boundary.ts | the seam's one-batch rule off (every batch armed) | span, proof | SURVIVED — a backstop: no honest input opens a second batch through the seam (one each today, pinned by span.test's batch sequence) |
    | EDGE | N-16 | boundary.ts | `wetSetback`'s edge proof off | proof | KILLED — "the puddle's stop withheld: a setback edge crossing it between two dry vertices refuses the strips' batch, nothing written" |
    | WPO | N-16 | boundary.ts | `wetPointOn` tests the ends only (no halving) | guards | KILLED — "finds the edge across a water corner whose two ends are dry" |
    | M13b | N-20 | mainRoads.ts | a ring node keeps its first candidate, not the nearer | growth | KILLED — "pins the junction each S5b road leaves on seed 2" |
    | K04 | N-23 | mainRoads.ts | the lineage index + 1 | growth | KILLED — "each S5b road's op carries its way's lineage key (§6.3)" |
    | K11 | N-24 | boundary.ts | `traceStage1` hands no water | stage1 | KILLED — "with a river band given: the same arena, the same water gates and strips, the same warnings" |
    | K13 | N-24 | boundary.ts | `traceStage1` drops its warnings | stage1 | KILLED — "with a river band given: the same arena, the same water gates and strips, the same warnings" |
    | TAG | N-19 | enceinte/trace.ts (M0-c-02's; mirror only) | the chord refusal without `[water: loose-gate]` | span | KILLED — "a trace whose wall crosses a span over the water is refused in its own batch by the chord proof, nothing written" |
    | L31G | L31 | boundary.ts | the `earlierWaterGates` guard restored | span | KILLED — "a stage-3 trace over the water after stage 2's water gates commits with the lowest free ones, gate:w2 and gate:w3" |
32. **N-32 the gates (W = 1, `tools/test_budget.py`).** GATES
33. **N-33 new findings of this round (for the session).**
    * The near rule's cause is general: any S5b course whose vertex stands within 26 cm of a standing way meets it where
      the insertion lays it; CITY 1 – 100 had one (seed 79). Obstacles (walls, the plaza, the water) are still tested by
      exact meeting in `roadFault`; the bar's "meets no wall" promise holds on the 100 seeds, so no case is known — a
      hardening KI if one appears (the same reading would apply).
    * `flatFixture` 400 ha / 12 ha walled (the layout fixture, not the bench's `runBase` frame): seeds 2, 4, 5 leave stage 2
      and stage 3 one destination `short` on an uncapped stage (no approachable candidate: the ring between the previous
      wall's clearance and the boundary holds none) — fail-safe and reported, a quality shortfall of small walled towns,
      outside the registered families; the bar would flag it there.
    * N-10's planning batch (row 28, 10): for the session's ruling — the cleanest seam is a read-only split plan from the
      kernel or a strategy that traces inside its batch; either is another item's.
    * c-02's N-56 (1): every arena way read as an extra stop takes the widest given way stop's half-width; `stageStops`
      gives no way's own width (the kernel's spine widths would be the source) — fail-safe, left as c-02 recorded it.
