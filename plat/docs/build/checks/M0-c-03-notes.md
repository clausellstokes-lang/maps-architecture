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

## The closing checker's notes (lane `check/M0-c-03-close-s1`, 2026-10-09), session fix round S1 (Q24, N-54 (2)), for M4

Mutants run in this seat's own mirror `~/maps-scratch/waves/check-M0-c-03/close-s1/mut`, one at a time, `--maxWorkers=1`,
against the backbone folder (NEAR) and against the related tests that run S4 through the chain (`testkit/test/ladders/`,
`ladders/rungs-route.test.ts`, `ladders/chain.test.ts`, `layout/test/pipeline/base/run.test.ts`,
`testkit/test/edge/control.test.ts`, `PLAT_FUZZ_RUNS=1000`). "Honest seeds" means the 61 seeds of the 1 000-seed plain
small-river chain (`edgeSeed('cell/bridge×frame', 0..999)`, through S4) that fire an F-ROUTE rung or build a span.

13. **Note 3 above is closed by this round.** C-0297 (2) makes every deck beyond the band of the first deck given up
    impassable to the ladder's later searches. Mutant Z04 (that exclusion removed) is killed by `route.test.ts` 'no
    other site within the band … then unserved'. The 1 000-seed population is unchanged by it. CONFIRMED.
14. **The band is measured once, from the first deck given up (mutant Z10 survives).** A second give-up on the same
    part, for example at a second river, adds only that deck to the excluded set. The exclusions stay those of the
    first deck's band. Z10 recomputes the band about each deck given up. It changes no honest seed and survives NEAR
    and the S4 subset. §5.2 reads the band per crossing ("another crossing site on the reach within its search band"),
    so a course with two failing approaches on two reaches can lose a usable site on the second reach. Harden: a
    synthetic two-river part whose second crossing fails its approach, with a usable site within the second deck's
    band but beyond the first's, served after the fix. CONFIRMED (survival), PLAUSIBLE (the effect).
15. **The band rule's details are unpinned: Z09, Z11 and Z16 survive.** Z09 keeps every other crossing of the course,
    usable or not. Z11 makes the band's edge strict (`<` for `<=`). Z16 measures the band to a deck's end `a`
    instead of its midpoint. None of them changes an honest seed, and each needs a contrived layout: two failing
    crossings on one course, a deck midpoint exactly on the band's edge, or a deck whose end and midpoint straddle the
    edge. Harden: one synthetic fixture each. CONFIRMED (survival).
16. **The slope rung after a failed band search is unpinned: Z17 and Z18 survive.** Z17 skips the slope rung once a
    deck has been given up. Z18 keeps the given-up deck after `another_site` fails, so the rung is reported again after
    the slope rung. M0 runs with no grade limits (C-0158, C-0236 (2)), so neither path runs on an honest input. Z17
    also survives `rungs-route.test.ts` 'route/slope'. Z18's subset run was cut, and its result is not claimed.
    Harden: a synthetic part with grade limits whose given-up deck has no usable site in the band and whose relaxed
    class reaches the destination. CONFIRMED (Z17 survival; unreachable at M0 by C-0158), PLAUSIBLE (Z18).
17. **The run's report never receives S4's unserved parts or its F-ROUTE rungs.** `runS4` ignores its
    `StageContext`, and the base registration (`pipeline/base.ts` `stageS4`) writes `s4` to the model without calling
    `ctx.report.unserved` or `ctx.report.ladderUse`; only S1's river report is forwarded (`forwardRiverReport`). On seed
    3207739920 the run's `report.unserved` is `[]` and S4's `ladderUses` is `[]`, while S4's own report holds
    `unserved: ['gate:1/out']` and its three rungs (probe `zz-c03s1-report.ts`, after mirror). The outcome is reported
    and counted in S4's output in the model, which the ladder readers (`ladderReadModel`) and the tests read, so it fails
    safely. The forwarding belongs to the base registration (M0-x-04's `pipeline/base.ts`), not to M0-c-03's files; `stageS3`
    reads the same way (code read, PLAUSIBLE). Suggested handling: a fix-queue row for the session (forward
    S3's and S4's rungs and unserved parts to the run report), M4 at the latest. CONFIRMED for S4 (probe output).

## The builder's notes, consolidation round C1 (lane `build/M0-c-03-consolidate-1`, 2026-10-12): R7 of `consolidation/layout-plan.md` §1.4, §2, §3

The round changes no behaviour: the backbone adopts siting's, plane's and the kernel's helpers by path, exports
`heightsOf` file-level for R11, folds three test helpers into `test/backbone/support.ts`, and rewrites the comments that
narrated rounds. No folder index or barrel changed (`src/backbone/index.ts` and `src/index.ts` byte-identical; exported
names with their types: barrel 692, backbone index 83, identical before and after; the only new name is the
file-level `stage.ts` `heightsOf`).

**Old → new map (J263 Q8).** No file was renamed, split, merged or moved; the map is per helper.

| old (before this round) | new |
|---|---|
| `src/backbone/junctions.ts` private `PI` (3.141592653589793), `CDEG_PER_RAD` (5729.5779513082325) | `src/siting/geom.ts` `PI`, `CDEG_PER_RAD` (file-level, the same literals), imported by path |
| `src/backbone/route.ts` private `COS30` (0.8660254037844387) | `src/siting/lattice.ts` `COS30` (the same literal) |
| `src/backbone/route.ts` private `class WorkLimitReached` | `src/siting/routes.ts` `WorkLimitReached` (the bodies identical: `constructor(readonly count: number) { super('route.nodes reached'); }`, no other member) |
| `src/backbone/route.ts` private `dist(a, b)` | `src/enceinte/plane.ts` `dist` |
| `src/backbone/graph.ts` private `footDist` | `src/siting/geom.ts` `distToSegment` |
| `src/backbone/graph.ts` private `orient` and the body of `meets` | `src/siting/geom.ts` `segmentsMeet`, called by `meets`, now a two-line `Seg` adapter |
| `src/backbone/stage.ts` private `unit` | `src/enceinte/plane.ts` `unitOf` |
| `src/backbone/stage.ts` private `heightsOf` | the same function, exported file-level (R11's) |
| `src/backbone/commit.ts` the `Junction.arms` comparator `(a < b ? -1 : a > b ? 1 : 0)` | `@plat/kernel` `compareKeys` (`kernel/src/arena/keys.ts`, the same body) |
| `test/backbone/{classify,junctions,route}.test.ts` `const T = tableView()` | `test/backbone/support.ts` `T` |
| `test/backbone/{backbone,water}.test.ts` `key`, and `support.ts` `wayLine`'s inner `key` | `test/backbone/support.ts` `key` |
| `test/backbone/route.test.ts` `nearest(lattice, p)`, `span.test.ts` `nearest(points, p)` | `test/backbone/support.ts` `nearest(points, p)` (route.test passes `lattice.points`) |

**Kept, because the bodies differ** (the plan's §3 row moves only equal bodies): `FAR` ×3 (`route.test.ts` `bridge:2` at
y −40 000; `span.test.ts` `bridge:1` at y 60 000; `water.test.ts` `bridge:1` at (40 000 … 44 000, 26 000)); `SITE` ×2
(`span.test.ts` (50 000 … 54 000, 0); `water.test.ts` (44 000 … 46 000, 0)); `route` ×3 (`classify.test.ts` takes `to`
and `from`; `graph.test.ts` defaults `inward`/`primary` and ends at `gate:<id>`; `junctions.test.ts` pins its first
point `attach` and its last `gate`); `CACHE` ×2 (`support.ts` `Map<string, Run>` keyed `city:<seed>` for `cityRun`;
`span.test.ts` `Map<number, Run>` for its `riverRun`). The oracles `segDist`, `insideRing`, `segsMeet` and `angleDeg`
stay in `support.ts`, independent of the code; `runSite`, `cityRun`, `handBuildRiver` and `wayLine` stay.

**Equivalence, finding by finding.**
* 1.4.1, 1.4.2: the same literals. 1.4.3: the class bodies are identical; `solve` throws and catches inside one
  function, so `instanceof` matches the one imported class.
* 1.4.4: `distToSegment` runs the same operations in the same order (`t` through `quot(…, 'area', …)`, clamped to
  [0, 1], `fx`, `fy`, `Math.sqrt`); the guards `l2 > 0` and `len2 === 0 ? 0 :` agree on every length; the `quot` texts
  ('foot', 'segment foot') are unreachable, `l2` being an integer ≥ 1 on lattice ends (J302 Q10).
* 1.4.5: on lattice points (integers below 2²³) every difference is below 2²⁴ and every product below 2⁴⁸, so the double
  determinant of `orient` is exact and its sign is `orient2d`'s; `meets`' five clauses are `segmentsMeet`'s in the same
  order. Confirmed lattice-only: the `avoid` sides are the plaza's, wall's and water's rings (`LatticePoint[]`,
  `commit.ts` `ringSegs`), the route points `LatticePoint`s; an instrumented mirror run over the backbone folder and the
  NO-SHIFT probe saw 6 419 `meets` and 3 867 fold-distance calls, every coordinate an integer below 2²³ (0 others).
* 1.4.6: `unitOf` is `unit`'s statements; its `quot` text ('unit' for 'last edge') is unreachable behind `l < 1 → null`.
* 1.4.7: `dist`: `(a − b)²` and `(b − a)²` are the same double (IEEE subtraction is sign-symmetric); `compareKeys` is the
  comparator's body; `heightsOf` gains the `export` keyword only.

**NO-SHIFT.** The before-image is the tree at the round's start, whose owns equal M0-c-03's s2 landed record (21/21
hashes). A probe in the lane's mirror ran S4 before (the s2 owns) and after (this round's owns) on: the CITY flat
fixture seeds 1–12 and `smallSite` 1–6 (ways, junctions, bridges, report, routes, the S4 output's SHA-256 and the
arena's `arenaPrint` SHA-256), C-0076's hand-built river seeds 1–3, and the base chain through S4 (S5 idle, as
`frame.test.ts`) on M0-x-06's small river frame at seeds 1–30 and the registered 3535584350, 1192931101, 3207739920,
3418200249 (S4's output and the model root). 359 lines, byte-identical (SHA-256 8c84e01f19ea3822…). Describe/it titles:
22/61 before and after, identical.

**Refusals (J264 (5), N-58).** S4 refused 0 of 54 runs before and 0 after. One run refuses upstream of S4, identically
before and after: the base chain on the small river frame at seed 27 stops at S3 with `E_INVARIANT` (bug row
`S3@town:10bqcwtcw044g`); S4 never runs. Input LAWFUL (a registered blueprint and seed), verdict MAKE-IT-SUCCEED, owner
S3 (M0-c-01's slice, M0-c-02's `commitS3Slice`), routed to the session with its seed (N-c1b-3). F-ROUTE's `unserved`
outcomes (seed 26 and 3207739920 `gate:1/out`) are the ladder's designed rung (C-0304), not refusals; equal before
and after.

**Gates** (the tree, this round's final files): `install --frozen-lockfile` 0; `lint` 0 (eslint 1 154 files, probe-red ok, 9 whole-tree checks); `build` 0; NEAR `packages/layout/test/backbone/` 11 files 88/88 at full strength; RELATED at `PLAT_FUZZ_RUNS=1000` over `graph.ts`, `junctions.ts`, `route.ts`, `stage.ts`, `commit.ts`: 217 files, 2 628/2 628, 0 red.

**Mutants** (targeted, in the lane's mirror, `vitest run --maxWorkers=1 --bail=1 packages/layout/test/backbone/`, each
file restored and `cmp`-checked):

| id | where | the fault | result |
|---|---|---|---|
| A01 | junctions `directionCdeg` | × 0.99 | survives, before and after (N-c1b-1) |
| A02 | junctions `angleBetweenCdeg` | `CDEG_PER_RAD` ÷ 1.2 | killed (backbone 'junctions — …') |
| A03 | junctions `rotate` | π ÷ 9 000 (the rotation doubled) | survived before and after; killed by the new bound in junctions 'deflects … to just over 30°' |
| A04 | route `routeGraph` | its own cone 60° | survives, before and after (N-c1b-2) |
| X38 | siting `COS30` (now read by `routeGraph` too) | 0.5: the shared deck cone 60° | survived; killed by the new 30° assertion in route 'every edge that carries the deck meets a water face' |
| A05 | route `routeGraph` | cone 15° | killed (frame 3418200249) |
| A06 = X22 | route `solve` | `count > nodeLimit` | killed ('route.nodes reached …') |
| A07 | route `solve` | catches `RangeError` | killed (same) |
| A08 | route `solve` | `charged: e.count + 1` | killed (same) |
| A09 | graph `foldParallel` | `distToSegment(a, p.at, b)` | killed |
| A10 | graph `meets` | the adapter's x and y swapped | killed (graph 'leaves runs …') |
| A11 | graph `meets` | never met | killed (same) |
| A12 | graph `meets` | the side degenerate | killed (same) |
| A13 | stage frame stub | direction reversed | killed (backbone 'roads leaving …') |
| A14 (≈ X16) | stage frame stub | no stub | killed (backbone 'through-roads …') |
| A15 | route ladder | the band never empty | killed |
| A16 (≈ X20) | route ladder | a new crossing's band unchecked | killed |
| A17 | commit `Junction.arms` | `compareKeys` reversed | survived before and after; killed by the new order assertion in backbone 'the Way and Junction records (§2.4)' |
| X01, X02, X03, X07, X08, X23, X25, X35, X36 | graph, junctions | the first check's mutants | killed |
| N02, N14, N15, N07, N07m | commit, junctions | B-6, B-7's mutants | killed |
| Z20 | route `routeGraph` | `deckOf` on dry edges | killed (frame 3418200249) |

Three assertions were added inside existing `it`s (no title changed): the deflected angle below the minimum plus twice
`DEFLECT_MARGIN_CDEG`, each junction's arms in code-unit order, and each deck-carrying edge within 30° of the deck.

**Notes for M4 (hardening; no change here).**
* **N-c1b-1** `directionCdeg`'s scale is unpinned (A01 survives before and after). Its one reader sorts arms by it, which
  a positive scale leaves unchanged, so the code's outcome is equivalent; the exported value (§4.3's arm bearing) has no
  test. Harden: assert `directionCdeg` on the four axis directions. CONFIRMED (survival).
* **N-c1b-2** `routeGraph`'s own 30° cone is redundant with the lattice's (A04 survives before and after): a wet edge is
  passable only along a deck within 30° (siting `alongDeck`), so the backbone's check changes `deckOf` only where two
  decks within one spacing of an edge lie more than 30° apart. Harden: a two-deck synthetic lattice. CONFIRMED (survival),
  PLAUSIBLE (the case).
* **N-c1b-3** (for the session, J264) the base chain on M0-x-06's small river frame (CITY, 30 ha, 6 ha walled, the river
  from the west), S5 idle as in `frame.test.ts`, refuses at S3 with `E_INVARIANT` at seed 27 (bug row
  `S3@town:10bqcwtcw044g`), before and after this round. A lawful input: MAKE-IT-SUCCEED, S3's owners. CONFIRMED (probe).

## The closing checker's notes, consolidation round C1 (lane `check/M0-c-03-consolidate-close-1`, 2026-10-13), for M4 and the session

The verdict is in `checks/M0-c-03-c1.md` (PASS). The mutants ran in this seat's own mirrors under
`scratchpad/waves/check-M0-c-03/` (`m1` after, `m0` before), one at a time with `--maxWorkers=1 --bail=1`, against
`packages/layout/test/backbone/`. "The 55 probe runs" are `zz-c1close-probe.test.ts`'s cases:

* CITY flat 1 – 12;
* `smallSite` 1 – 6;
* the base chain through S4 on the small river frame, seeds 1 – 30 and the four registered seeds;
* `runBase` FLAT 900 / 30 ha seed 1 and RIVER 900 / 30 ha seeds 1 and 5.

Each case records the arenas' `bits` / `contentPrint`, S4's output and report, and the model and stage roots.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-c1c-1 | **The fold's nearness measure is unpinned.** Mutant R04 survives NEAR (88 / 88) on the consolidated sources and, as `footDist` → the same, on the pre-round ones. It replaces `graph.ts` `foldParallel`'s `distToSegment(p.at, a, b)` with the distance to the segment's first vertex, `a`. Under it the 55 probe runs are byte-identical. C-0236 (16) reads "within the class separation … of an earlier part", which is the distance to the part's segments. Only the fold's outcome on the CITY seeds is pinned (X23 is red), not its measure. The round did not create the gap: its change on this line is bit-identical over 400 000 cases. CONFIRMED (survival, both images; probe identity). | Add a `graph.test.ts` fold fixture whose later part runs parallel to the middle of an earlier part's long segment. The later part should be within the separation of the segment but beyond it from both of the segment's vertices, and the test asserts the fold. | M4 |
| N-c1c-2 | **`routeGraph`'s own 30° cone is redundant with the lattice's** (confirms N-c1b-2 with this seat's evidence). Mutant X38 at `route.ts:78` (`< 0.5 *`) survives NEAR before and after the round, and under it the 55 probe runs are byte-identical. A wet edge is passable only along a deck within 30° (siting `alongDeck`, the same `COS30`), and `routeGraph` skips impassable edges. So the backbone's cone matters only where two decks within one spacing of an edge lie more than 30° apart. The plan's oracle "X38 (60° deck cone) killed" names a mutant that no c-03 check record defines. In the form this round created (the shared siting `COS30` = 0.5, X38s), it is red on the new 30° assertion in `route.test.ts`. CONFIRMED (survival, probe identity); PLAUSIBLE (the two-deck case). | A synthetic lattice with two decks less than one spacing apart at more than 30° to each other. Assert `deckOf` names the deck each edge runs along. | M4 |
| N-c1c-3 | **For the session.** (a) J264 / N-58: the base chain on M0-x-06's small river frame (CITY, 30 ha, 6 ha walled, the river from the west, S5 idle) refuses at S3 at seed 27, identically before and after this round. The refusal is `E_INVARIANT` "trace: gate gate:1 is not on the committed trace at its point (§4.2 S3 (9))". The input is LAWFUL and the verdict MAKE-IT-SUCCEED, owned by S3 (M0-c-01's slice, M0-c-02's `commitS3Slice`). This independently confirms N-c1b-3. (b) The builder's L-0482 discloses one grep of `docs/PROGRESS.md` for the ruling ids J260 – J302, whose output was cut to a preview. `docs/PROGRESS.md` is on neither of rule 1's lists, and nothing from rule 2's list was read. Following `checks/M0-a-01-notes.md` N-c3c-4, this seat does not judge it a breach of the item. CONFIRMED (a: probe); PLAUSIBLE (b: the classification). | (a) a fix round for S3's owners with the seed; (b) the session decides whether ruling-log lookups are added to rule 1's read list. | session |

## Hardening round S3 (lane `build/M0-c-03-fix-s3`, 2026-10-14 and 2026-10-18): the builder's row-by-row outcome

The session's hardening round S3 of M0-c-03 (J237 (2)): the refusal census's line Q52 A / R-35 first, then the
fourteen FIX-NOW rows the inventory (`checks/hardening-inventory.md`, J355) assigns to the item. Choices row C-0374,
ledger row L-0558. The seat ran in two parts in Claude Code cloud containers: 2026-10-14 06:13 – 11:04 (the
reproduction, the fixes, the pins, the mutants, the census before and after, the NO-SHIFT probe and RELATED) and, after
its container was replaced, 2026-10-18 (the gates, the mutant table re-run, an instrumented attribution probe, e-06's
seeds, an edge sweep, RELATED again, these notes). The first part's mirror and drafts went with its container; its
numbers are quoted from its lane-events lines and marked (L 10-14). No before-image of the sources exists in the
second part (no git), so its probes ran on the round's code with each behaviour-changing branch instrumented in the
mirror (a counter where it fires); a case where none fires runs as before the round, and the first part's
byte-for-byte NO-SHIFT comparison names the same shifted cases.

**Q52 A / R-35 — FIXED (make it succeed).** All seven census seeds reproduced (L 10-14), each through the base chain
(M0-x-04's registration, S5 idle) on its fixture's frame at the fixture seed. The input is lawful, and the branching
geometry is OUR OWN INTERMEDIATE (S4's route parts), so the verdict is MAKE-IT-SUCCEED. There are two causes, both
inside c-03's owns:
* **A1, the attach end** (EP-01/S4/self-touching 4078456246, EP-01/S5a/zero-area 1104735897, EP-01/S6/zero-length
  2787492733, EP-05/S5d 1625622056; the small flat frame). The inward part leaves the plaza's attach point for a
  lattice node beyond it, and its next segment passes the attach point within `attractCm` (≤ 22 cm). §3.6 step 3's
  attraction routes that segment through the attach point, so the way meets itself there (`(way, way:n) branches`).
  The fix: `commitRoutes` cuts each spur before the graph (`withoutSpurs`). A free point is dropped when one of its
  neighbours lies within `attractCm` of its segment to the other, unless the shortcut would meet the plaza's, the
  wall's or the water's sides off its ends.
* **A2, the gate end** (EP-20/M0 1334794515, 3068986432, 3296267945; and e-06's relief-3000 seed 8 in both
  configurations, whose inward parts held 4 nodes beyond the trace). The inward part's corridor node next to its gate
  lies beyond the wall S3 committed, so its last edges ran along the wall's and the setback's lines and folded onto
  them. The fix: `routesFromSlice` holds each gate part to its side of the committed wall at its gate (`onGateSide`).
  The points next to the gate that lie on the wrong side, or on the wall, are dropped. The gate is joined to the first
  point on its side, where that segment meets the wall at the gate only.

The design text taken: §4.3 *One graph, then one smoothing* (each chain inserted once "as a spine — a mandatory chain
carrying the way role"), §3.10's role consistency (a linear role forms simple chains or rings), §4.3 *Routes* and
C-0236 (1), (9) (each gate route split at its gate into the street in and the road out). Of the brief's options the
round takes **route around**. The part is cleaned deterministically before the graph, so each way stays one simple
chain. No way is split or merged, and the Way and Junction records and the batch's form are unchanged.

The pins:
* `spines.test.ts` (new): the seven seeds through the base chain. Each asserts that S4 commits with no bug, that every
  way walks as one simple open path (`wayLine`), and that the class's precondition holds (A1: a spur at an attach point
  in S4's routes, its node absent from the graph's course; A2: a gate route's corridor node beyond the trace, no inward
  point keeping it).
* `commit.test.ts` 'a route part's spur is cut before the graph': the smallest synthetic. The attach point sits on the
  plaza's side, the first node 9 m beyond it, and the edge back passes 23 cm below it.

Both are red under QA1 / QA2 (the table below) and green after.

The census (J264, N-58):
* x-06's five class-A fixtures at 1 000 seeds each, before and after (L 10-14, mirror, W=1): class A **7 → 0**
  (EP-01/S4/self-touching 1 → 0, EP-01/S5a/zero-area 1 → 0, EP-01/S6/zero-length 1 → 0, EP-05/S5d 1 → 0, EP-20/M0
  3 → 0). Class B (M0-c-02's `layStrips`) is 2 = 2, and every other outcome of the 5 000 runs is unchanged.
* Two S4-only 300-seed sweeps (L 10-14; the line names their frames 'mid' and 'river'): S4 refusals 0 = 0, S3's 4 = 4
  on the river frame. The seeds with `offGate` > 0 went 2 → 0 ('mid') and 109 → 32 ('river').
* This part: every built edge fixture (72) at the PR size, 10 seeds each, after the round with the branches
  instrumented. Of the 720 runs, refused-lawful 0, problems 0, throws 0 (refused-safe 140, laddered 213, absorbed 257,
  left-out 20, defined 90). A branch fires on 73 of them: the report-only count (`stretchShared`) on 47, the fallback's
  kind re-read on 20, the gate-side hold on 7 and the spur cut on 1 (EP-04/S5b 3264554892); two runs fire two.
* e-06's relief-3000 fixture (bench `spikeRegistry`, S5 idle, S6 dropped; CITY seeds 1 – 8 × default and coarse): S4
  refused seed 8 before, in both configurations (L 10-14; the census's 1 of 8), and **0 of 16 after**. S3 refuses seeds 1 (`E_INVARIANT`) and
  4 (`E_SELF_INTERSECT`) in both configurations, upstream of S4. These are e-06 finding 6's S3 refusals, S3's owners'
  (M0-c-01 / M0-c-02), and are unchanged by this round. The e-06 instance is this class (A2), fixed here.

No count rose. The full x-06 bar (72 fixtures × 1 000 seeds, about 78 worker-hours at fix round 2's rate) was not run
on this 4-core machine. The scope taken is the class's five fixtures at 1 000, every fixture at 10, and RELATED's edge
suite. The whole bar is the milestone seat's (N-s3-5).

**The declared shift (rule (3)).**
* The seven census seeds now commit, where before they were refused. Their S4 output on the small flat frame
  (4078456246, 1104735897, 2787492733, 1625622056) is 4 ways each; on EP-20 (1334794515, 3068986432, 3296267945) it is
  14 ways each. Every one has `offGate` 0, `stretchShared` 0, `unsmoothed` 0 and no part unserved; the probe prints
  (SHA-256 of the way edges, the network and the report, 16 hex) are 828c24f4f2a05e30, 6f44f1e071845952,
  bd4016e0b6954544, a7d6567f277ab925, e427e9b67ddb68fe, a77ddf6ea2584941 and 4fb32e1fd08abb2a.
* Elsewhere, the first part's NO-SHIFT probe (L 10-14, before against after, 125 cases) found 101 cases byte-identical
  and 2 report-only (`stretchShared` 1 → 0 on small:5 and smallFlat:7). It found 22 arena shifts: the 7 census seeds,
  smallFlat:26 (a spur cut) and 14 gate-side repairs.
* This part's attribution probe ran on 122 cases: CITY 1 – 12, `smallSite` 1 – 6, the hand-built river 1 – 3, the
  small river frame 1 – 30 and its 4 registered seeds, the small flat frame 1 – 30 and the 4 census seeds, and EP-20
  1 – 30 and its 3. An arena-changing branch fires on exactly 22 of them: the 7 census seeds, smallFlat:26 (the spur,
  `gate:0/in`), and the gate-side hold on small river 8, 9, 14, 16, 19, 20, 21, 24, 29 and 3207739920, small flat 6, and
  EP-20 4, 12 and 29. Report-only: small:5 (1 → 0), smallFlat:7 (1 → 0) and EP-20:23 (2 → 0). The fold's loop cut, the
  per-crossing band and the fallback's kind re-read fire on none of the 122.
* On the brief's NO-SHIFT set (CITY 1 – 12, small 1 – 6, river 1 – 3, small river 1 – 30): CITY, small and river are
  identical except small:5's report count. On the small river frame, 9 seeds move by the gate-side hold (8, 9, 14, 16,
  19, 20, 21, 24, 29). Each is a seed that committed before with a part meeting the wall off its gate, now held to its
  side: the defect fixed, not a seed refused before. Seed 27 refuses at S3 before and after (N-c1b-3's).
* No golden or digest in the owns records S4's output (the backbone's tests assert properties), so none is re-recorded.

**The fourteen rows.**

| row (source note) | outcome | evidence |
|---|---|---|
| 1 (note 1) `report.offGate` positive control | PINNED | `stage.test.ts` 'counts each outward part … and each inward one': S3's committed wall scaled about its centre by 1.02 (every gate inside it: every outward part's first segment meets it off its gate) and 0.98 (every inward part's), `wallCrossings` = every main gate's `/out`, then `/in`; 0 on the wall as committed. X29 (the outward count removed) and X29i (the inward one) red. |
| 2 (note 2) `stretchShared` mixes shares with a non-way ring | FIXED | The first alternative, the count of way–way shares: the report now counts the way edges two or more ways share, read from the arena after the batch (`k.resolve` of each way's runs). The second alternative (keeping the chain's second vertex `attractCm` off the plaza ring) would move geometry §3.6's attraction lays by design. §4.3's "never braided near-duplicates" is a way–way measure. Pins: `commit.test.ts` 'counts only the shares between ways … (smallSite 5)' (precondition: an edge carries a way row and the plaza's reserved row; no edge two ways' rows; the count 0) and the positive control now asserting the count equals the shared edges. S2 (the old warning count) red. The field's meaning narrows as the row asks; its name and type are unchanged (J263 Q1). |
| 4 (note 4) the fold's splice can make a loop | FIXED | `foldParallel` cuts a loop its splice makes (the merge's `cutLoops`, when the spliced course revisits a point not in place). Pin: `graph.test.ts` 'cuts a loop the splice makes …'. F4 (no cut) red. Live on e-06's relief-3000 (seeds 2, 3, 5, 6, 7), on none of the 122 probe cases. |
| 6 (note 6) §4.3 *Test*: every deck's way within ± 10° of the channel normal | PINNED | `frame.test.ts` '<seed>: every deck's way — its span — within ± 10° of the channel normal' on x-06's small river frame (the base chain's S1 river from the west) at 22 and 3418200249. The normal is that of S1's course chord at the vertex nearest the span's midpoint, and each span is its way's one edge between the deck ends, its bridge built with that way. Not on M0-e-06's fixture, as the inventory reads: that fixture is bench code, and a layout test reads only its own package (C-0114, C-0122). The clause is the same, on the same S1 river law, at plain relief. D6 (the span's far end moved to the dry node after the run) and D6b (its near end to the node before) red there and in `span.test.ts`. |
| 8 (note 8) §13.2's walk follows arena edge order | FIXED (test) | `backbone.test.ts` `worstParallelRun` walks each way's `wayLine(...)`. Pin: 'a run is summed along the way, whatever order the arena lists its edges in' (two 10 m near runs split by a far middle, listed first, last, middle). W8b (the walk over the edge list in its order) red. W8, a flattened point-list walk, survives: its doubled-back stretch ends at the other way's end, which the measure excludes (N-s3-3). |
| 9 (note 9) the T band's edges | PINNED | `commit.test.ts` 'a branch 74° or 106° … is a Y; 76° or 104° a T': [Y, T, T, Y]. N04 (70° – 110°) red. |
| 10 (note 10) class from the first chain; knot on the run's first chain | PINNED | `commit.test.ts` 'a primary run of two chains, then a through chain …': three inward parts, the first way's chains primary, primary, through. The way is through, its profile [primary, through], and its two knots on the vertex (100 m, 0) where the class changes. N08 (the class from the first chain) and N09 (the knot pair on the run's first chain) red. The fixture shares its gate end (r1, r2) as the inventory asks, and a third part (r3) crossing r1 makes the two-chain run. |
| 12 (note 12) junction kinds from the smoothed courses after a fallback | FIXED | After the kernel refuses the smoothed batch and the lattice courses commit, the kinds are re-read from the lattice courses (`junctionsOn(raw)`). Pin: `commit.test.ts` 'junction kinds after the fallback …': a 45° branch the Y → T rule bends is a T when the smoothed batch commits, and a Y when a planted refusal of the first S4 `tx` sends it to the lattice courses (two `tx` calls). K12 (no re-read) red. Live in the edge sweep: EP-01/S4/zero-length and self-touching, 20 of 20 runs (S4's home plants a degenerate chain the smoothed batch refuses), every outcome within its home's allowed handlings. |
| 14 (note 14) the band measured once from the first deck given up | FIXED | §5.2 read per crossing: every crossing of the course whose approach cannot meet the radius is given up at once. A deck is impassable beyond the band of each deck given up so far, except the decks the course crossed with a usable approach (`route.ts` `routeLadder`). Pin: `route.test.ts` 'two rivers, both crossings failing their approach …'. The second river's usable site lies in its own crossing's band and beyond the first's; the course takes the usable site on each river, the rung `another_site` held. ZB (the band from the first deck only, Z10's form) red. It fires on none of the 122 probe cases or the 720 sweep runs. |
| 15 (note 15) Z09, Z11, Z16 | PINNED (Z11, Z16); Z09 EQUIVALENT | `route.test.ts` 'the band's edge is inclusive …' (a site exactly the band away is taken; Z11 `>=` red) and 'the band is measured between the decks' midpoints …' (Z16, the distance to the deck's end `a`, red on both). Z09 ('keep every crossing of the course passable') survives and is equivalent under the per-crossing rule. Every crossing whose approach fails is given up after the kept set is filled, so the kept set is the same on every input. No test is needed. |
| 16 (note 16) the slope rung after a failed band search | PINNED | `route.test.ts` 'after a failed band search the slope rung runs …'. The river stops short of the frame's north edge, the ground beyond its end stands 1 m higher (too steep for through at 0.01, not for primary), and the only other site lies beyond the band. The rungs are exactly another_site (held: false, 'no other site in the band'), extra_bridge (notBuilt(M1)), slope through → primary (held). Z17 (the slope rung skipped once a deck is given up) and Z18 (the given-up deck kept, so the rung is reported again) red. |
| N-c1b-1 `directionCdeg`'s scale | PINNED | `junctions.test.ts` 'is counter-clockwise from +x in cdeg …': 0, 9 000, 18 000, 27 000 on the axes, 31 500 on (1, −1). A01 (× 0.99) red. |
| N-c1b-2 / N-c1c-2 `routeGraph`'s own 30° cone | PINNED | `route.test.ts` 'two decks 10 m apart at their west ends, 45° to each other: every carried edge within 30° of its own deck', each deck carrying ≥ 2 edges. A04 (the cone 60°) red. |
| N-c1c-1 the fold's nearness measure | PINNED | `graph.test.ts` 'measures the run's nearness to the earlier part's segments, not its vertices …': a part 20 m off the middle of a 200 m segment, beyond the 40 m separation from both its ends, folds. R04 (the distance to the segment's first vertex) red. |

**Mutants** (targeted, re-run in this part in the lane's one mirror
`scratchpad/waves/selfcheck-build-M0-c-03-fix-s3`, isolation proved, each run over the backbone folder with
`--maxWorkers=1`, without `--bail` so that every red test is named, then each file restored and `cmp`-checked; the
unmutated folder 113/113). The first part's line (L 10-14) records the same kills.

| id | where | the fault | result (passed / 113, the reds) |
|---|---|---|---|
| QA1 | commit `commitRoutes` | no spur cut | 108: `spines` 4 attach-end seeds, `commit` spur synthetic |
| QA2 | stage `onGateSide` | returns the part as given | 110: `spines` 3 gate-end seeds |
| X29 | stage `routesFromSlice` | the outward part's off-gate count removed | 112: `stage` off-gate count |
| X29i | stage `routesFromSlice` | the inward part's removed | 112: same |
| S2 | commit report | `stretchShared` = the kernel's `W_STRETCH_SHARED` count | 112: `commit` smallSite 5 |
| F4 | graph `foldParallel` | no loop cut after the splice | 112: `graph` note 4 |
| D6 | stage `pointsOf` | the span's far end at the dry node after the run | 108: `frame` 22, 3418200249; `span` 1 – 3 |
| D6b | stage `pointsOf` | the span's near end at the node before | 109: `frame` 22; `span` 1 – 3 |
| W8b | test `worstParallelRun` | the walk over the arena's edge list in its order | 112: `backbone` note 8 |
| W8 | test `worstParallelRun` | the walk over the flattened edge list | survives (N-s3-3) |
| N04 | commit `junctionKind` | the T band 70° – 110° | 112: `commit` note 9 |
| N08 | commit way record | the class from the first chain | 112: `commit` note 10 |
| N09 | commit way record | the knot pair on the run's first chain | 112: same |
| K12 | commit fallback | the kinds not re-read | 112: `commit` note 12 |
| ZB | route `routeLadder` | the band from the first deck given up only | 112: `route` note 14 |
| Z09 | route `routeLadder` | every crossing kept passable | survives, equivalent (row 15) |
| Z11 | route `routeLadder` | the band's edge strict | 112: `route` note 15 (Z11) |
| Z16 | route `routeLadder` | the band to the deck's end `a` | 111: `route` note 15 (Z11, Z16) |
| Z17 | route `routeLadder` | the slope rung skipped once a deck is given up | 112: `route` note 16 |
| Z18 | route `routeLadder` | the given-up deck kept after the failed band search | 112: same |
| A01 | junctions `directionCdeg` | × 0.99 | 112: `junctions` N-c1b-1 |
| A04 | route `routeGraph` | its cone 60° | 112: `route` N-c1b-2 |
| R04 | graph `foldParallel` | the distance to the segment's first vertex | 112: `graph` N-c1c-1 |

**API (J263 Q1, Q6).** No export of `src/backbone/index.ts` or `src/index.ts` was added, removed or renamed. Both files
are byte-identical to the C1 landed record (`7d48495b…` for the folder index). `S4Report.offGate` and `stretchShared`
keep their names and types; their doc comments now say what they count. No row asks for a message change, and none
was made for one.

**Gates** (the tree, this round's final files; 2026-10-18): `install --frozen-lockfile` 0; `lint` 0 (eslint 1 162
files, 0 errors, probe-red ok, 9 whole-tree checks); `build` 0; NEAR `packages/layout/test/backbone/` 12 files 113/113 at
full strength (W=1); RELATED@1000 over `commit.ts`, `graph.ts`, `route.ts`, `stage.ts`, `types.ts` (the tree, W=1, 2026-10-18 22:49 –
2026-10-19 00:25, 5 757 s; a first attempt from 22:11 was killed by a container restart and gave no verdict): exit 0,
219 test files / 2 662 tests passed, no red (none of the J176 bench files or the known foreign reds failed), on the
final sources (SHA-256 of the nine backbone sources checked unchanged before and after the run).

**Notes for the session and M4.**
* **N-s3-1** (for S3's owners; fails safe) `offGate` stays above 0 after the gate-side hold where the committed trace
  lies far from the lattice route at the gate: 32 of 300 small-river seeds (L 10-14), small river 21 (1), and e-06's
  relief-3000 seeds 2 – 8 (4 – 6 parts each). The parts commit valid and are counted, and none is refused. The shape is
  S3's trace and S3's gate route split at different places. One fix shape is the trace's gate vertex and the route's
  split agreeing (M0-c-01 / M0-c-02); another is S4 re-solving a part's stretch beyond the corridor against the
  committed wall (a later hardening of c-03). CONFIRMED (the counts), PLAUSIBLE (the cause beyond the A2 seeds).
* **N-s3-2** (for the session) e-06's recorded summary (`summaries/M0-e-06.json`, e-06's file) is stale for S4's
  output on relief-3000. Seed 8 now commits, and seeds 2, 3, 5, 6 and 7 shift (the gate-side hold, and on 2, 3, 5, 6, 7
  the fold's loop cut). It is not edited here, and e-06's next run re-records it. Likewise x-06's EP-01/S4 outcomes
  (`testkit/src/edge/ep01.ts`) quote `stretchShared` in their rung text, which now reads the way–way count: 0 where the
  kernel's warning count read 1 – 11 (zero-area, collinear, coincident). Their handling is unchanged (absorbed), and
  x-06's summary does not record the count.
* **N-s3-3** (M4) W8 survives row 8's pin. A walk over the flattened edge list doubles back over a way's end stretch,
  and in the pin's fixture that stretch ends at the other way's end, which the measure excludes. The code walks
  `wayLine`. The note's fault (W8b) is red. A second fixture with the other way's ends far from the runs would kill W8.
  CONFIRMED (survival).
* **N-s3-4** (for the session; disclosure) In this seat's second part the seat ran four read-only git commands before
  it re-read the working rules: `git status --short`, `git log --oneline | head`, and a `git log` and `git diff --stat`
  against `23d13d5` (both refused: bad revision). The rules forbid any git command. Nothing was written, and their output
  (the tree's modified-file list and main's last five subjects) shaped no change. It is recorded in L-0558.
* **N-s3-5** (for the milestone seat) the x-06 edge bar at 1 000 seeds over all 72 fixtures was not run (scope above).

## Closing check of S3 (lane `check/M0-c-03-close-s3`, 2026-10-19), for M4 and the session

The verdict is `checks/M0-c-03-s3.md`: FAIL, on two blockers in the gate-side hold, B-N1 and B-N2, which go back to the
fix round. The rows below are this seat's non-blocking findings (ledger L-0559).

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-c3-1 | **The spur cut's side guard is unpinned (QA1g survives).** QA1g drops `withoutSpurs`'s `if (!avoid.some((side) => meetsOff(a, b, side, [a, b])))`, so a spur is cut even when the shortcut meets the plaza's, the wall's or the water's sides. NEAR stays 113 / 113. It is byte-identical to the tree on NO-SHIFT's 122 cases and on e-06 relief-3000 seeds 2, 3 and 8, and no honest probe reaches it. It fails safe: a lattice course that crosses one of those sides after the fallbacks is refused `E_INVARIANT` (`commit.ts` header, `:446`). CONFIRMED (survival, the probes); PLAUSIBLE (fail-safe, by reading). | A synthetic `commitRoutes` part whose spur's shortcut would cut the plaza's corner, asserting that the point is kept | M4 |
| N-c3-2 | **`partLeavesWall` excuses every segment that meets the wall on the gate's own wall edge.** That covers a segment running along that edge, or within cm of it, from the gate. So neither the gate-side hold's guard nor `offGate` sees a gate street laid along the wall. The function predates S3 (main's text is the same). The round's hold made it live on honest seeds (B-N1: small river 9, EP-20 3068986432). CONFIRMED (the committed edges); PLAUSIBLE (the mechanism). | Close it with B-N1's fix: count a segment that overlaps, or runs within `attractCm` of, the gate's wall edge beyond the gate. If the fix round closes B-N1 another way, this row stays for M4 | with B-N1; else M4 |
