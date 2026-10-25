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
