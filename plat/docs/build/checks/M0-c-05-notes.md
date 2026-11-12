# M0-c-05 — the checker's minor notes (lane `check/M0-c-05`, 2026-10-07)

These notes are for the hardening milestone M4 unless a note names an earlier one. None of them fails the item (J180,
N-45). The blockers are in `M0-c-05.md`, and the mutant and probe names refer to that file.

1. **N-1 M17 is equivalent.** Without the hit's own angle test (`legality.ts:470`), `armsSquare` still rejects the
   step, because it checks the met segment too (it lies within 52 cm of the meeting). No test needed. If `armsSquare`
   ever skips the met feature, restore the explicit test.
2. **N-2 Nothing pins the 30° rule at a meeting on a vertex (M16).** With `armsSquare` always true, every item test
   passes, including the four bar chunks. The checker's probe (`zz-probe16/arms.test.ts`: a step meeting a `primary`
   at a vertex whose other segment runs back at 20°) is accepted as a T with a 20° arm gap. Add a unit test of this
   shape to `legality.test.ts`.
3. **N-3 C-0254 (6)'s Y → T bend on a hit has no pinning test (M18).** `legality.test.ts`, which the row names, never
   puts the hit point off the perpendicular foot, and the junction row holds without the bend on the bar seeds. Add a
   case where the step meets a way obliquely within the curvature limit and must end at the foot.
4. **N-4 The first curvature's concern is pinned by no test (M27).** Drawing it from `growth.heading` instead of
   `growth.curvature` passes all 103 tests. The checker confirmed the concern by reading. Pin it, for example: the
   first proposal's κ equals s × the first normal of `growth.curvature` under S5 for the town key.
5. **N-5 The prune's dangling guard is reached only by rare input (M32).** On 40 fixture seeds, no short secondary is
   met by another way. Add a hand case in which a short secondary carries another street's T and must survive the
   prune.
6. **N-6 The walled top-up is staged without a marker.** C-0254 (11) stages the walled arc's re-trace to M1, and the
   record reports `topUp: 'skipped_walled'` with `why: 'walled'`. Neither says `notBuilt('M1')`. Name the milestone in
   the rung so a reader of the report sees the staging.
7. **N-7 The here-bar's size and its median reading.** The tests run 24 seeds in six-seed chunks (C-0254 (13)). The
   checker's 1 000-seed run holds every per-seed clause. Pooled over the 1 000 seeds, the median is 93.9°. Two of the
   167 six-seed chunks pool a median above 95° (seeds 241–246: 95.12°; 841–846: 95.52°), and per-seed medians run
   90.3–99.6°, so the chunked median clause is fragile. M0-c-06's 1 000-seed reading pools them.
8. **N-8 Header wording.** `proposals.ts:11` says the seeds' proposals run perpendicular "± the branch jitter", but
   the code and C-0254 (3) use no jitter.
9. **N-9 The slope rule is neither built nor declared.** §4.4 *Legality* includes "Slope ≤ the class's grade limit
   (… `rampMaxGrade`)". `legal` has no slope term. On M0's flat fixture it cannot be observed. Declare it for M1's
   relief runs.
10. **N-10 For the session (not this item's file).** `regimes.json` gives `dense_core.blockDepthFloorM` = [30, 45],
    while §4.4's regime table gives the dense core a floor of 37–45 m (to be re-fitted at M-1). The clearance
    (max(30 m, 80 m)) does not depend on it, but the prune's block width (30 m) does.
11. **N-11 The stand-in demand reduces S5d's per-band comparison.** With C-0254 (10)'s stand-in, the shortfall
    Σ_b max(0, d_b − l_b) equals built × max(0, quota ÷ land − 1). The band split only matters for a caller's demand,
    which `capacity.test.ts` drives. This is declared. Re-check it when M1's S2 supplies the demand.

## Closing check `check/M0-c-05-close-r1` (2026-10-07): further notes

These notes are for M4 unless a note names an earlier milestone. None of them fails the item. The blockers B-1 and B-4
are in `M0-c-05.md`.

12. **N-12 `metricDoc`'s origin reading is not pinned on the fixture (R14).** If `support.ts` reads the arena's order
    instead, the four bar chunks still pass. On the fixture, both readings meet the row (1 000 seeds: origin p50 21.15°,
    arena p50 21.08°, 0 above 90° either way). `drift-grown.test.ts` pins the origin reading with its own copy of the
    reader. Share one reader between the two files, or pin `metricDoc` on a street whose arena run is reversed.
13. **N-13 The seeds' quarter-spacing keep-away is not pinned (R15).** With the keep-away removed, `city.test.ts` and
    `growth.test.ts` stay green. It only matters where two arterials' seeds come close (near a junction). Add a hand case
    with two arterials meeting at a shallow angle.
14. **N-14 The dead-end share has moved past its declared figure.** Over the checker's 1 000 seeds, 72.9 % of S5c's
    33 389 streets end `dead`. C-0254 (14) declares about 55 – 65 %, a number from before C-0258's square first step
    and deflection limit. The result fails safe. Update the row's figure when B-1's fix lands, or hand it to M0-c-07a's
    dead-end row.
15. **N-15 The acceptance tally is tied to the GrowthState object (contract for M0-x-04).** `acceptedStreets` and
    `growthRecord` are WeakMaps keyed on the state object. A runner that ran S5d on a different object than S5c (a copied
    model) would read 0 and reuse the stage's lineage keys without saying so. For example: refuse in `capacityStep` when
    `acceptedStreets(state, k)` is 0 but the stage has an S5c record with streets, or carry the tally in the record.
    M0-x-04 should register S5c and S5d on one shared state.
16. **N-16 The fixture's drift pool is thin.** The 1 000 seeds give 59 windows, so the fixture's median rests on few
    streets, and the row is carried by the hand pool (`drift-grown.test.ts`). In that pool the ribbon sits at 0.9 %
    above 90°, against a 1 % limit (C-0258 (5), declared). M0-c-06's integrated run should report the window count with
    the row.

## Closing check r2 (lane `check/M0-c-05-close-r2`, 2026-10-07)

17. **N-17 C-0260 (1)'s "every way segment holding the step's start" is not pinned (S05).** Replacing `every` with
    `some` in `acrossOf` passes the targeted tests. It also changes no fixture output (digest probe P2, 30 runs), because
    a seed rarely lies exactly on an arterial vertex or on two ways. Suggested test: a step that starts at a vertex where
    two segments of the arterial meet at an angle, with a street across one segment's line but not the other's. M4,
    unless B-1's rework of `acrossOf` replaces the per-segment reading.
18. **N-18 S10 and S20 are equivalent.** Dropping or skipping the `Math.abs(e) < 1` guard in `acrossOf` changes nothing.
    A step whose end lies within 1 cm of the line of a way it starts on is already rejected `angle` by the start's
    leaving test (`legality.ts:463–467`), because steps are ≥ 20 m long. No test is needed.
19. **N-19 S19 is equivalent.** In `growthStep`, counting only the grown streets that are still live changes nothing,
    because the prune has not run yet and every grown street is live. No test is needed.

## Closing check r3 (lane `check/M0-c-05-close-r3`, 2026-10-07)

20. **N-20 U05 is equivalent.** Without the `f.way === g.way` guard in `leavesAcross`, a segment f of the arterial
    itself is still never read as across. Each end of f is held by f itself (`footOn` distance 0). Against f, the other
    end lies on the line (side 0, not ≤ −1 cm), so `across` turns false at once. The probe P2 digest is unchanged on
    30 of 30 fixture runs. No test is needed. Keep the guard as documentation.
21. **N-21 U06 (the side margin `≤ −1 cm` → `≤ +1 cm`) survives NEAR (128 / 128). It changes 0 of 30 fixture runs.**
    It matters only when f leaves the arterial and ends within 1 cm of the line of the arterial segment h where it
    leaves, so f runs collinear with h (for example a way continuing the arterial past a junction). The clearance then
    also needs the step to lie within 30° of parallel to f. A first step is square to g, so h must turn 60 – 90° from g
    within about one clearance (83 m) of the seed. Rule (a) already gives g's own line the same 1 cm tolerance.
    The fixer's MB2 "equivalent" label is not quite right: the case is contrived, not impossible. Suggested test (M4):
    an arterial bending about 70° within 60 m of a seed, with another way continuing collinear from the bend. The step
    parallel to that way keeps the clearance.
22. **N-22 U09 (the "on the way" tolerance 1 cm → 10 m in `leavesAcross`) survives NEAR (128 / 128). It changes 0 of
    30 fixture runs.** It matters only when a way segment ends within 10 m of g's way without touching it and its other
    end lies across. A secondary never crosses a `primary` or a `through`. A branch's first step leaves a secondary,
    though, and a secondary can be crossed (organic, collinear within 6°). So a crossing segment near a branch seed is
    the reachable shape, and it is rare. Suggested test (M4): a street segment crossing the parent street with its start
    5 m off it on the step's side. That segment keeps the clearance.
23. **N-23 Later steps still read no far side, so about a third of the streets leaving arterials stop after one
    step (declared, fail safe; triage before M0-c-06's statistics).** C-0260 (1) and C-0262 (1) state the limit "a step
    leaving no way (a later step) keeps the clearance", and `legality.test.ts` pins it (*a step leaving no way (a later
    step) reads no far side*). The design's literal clearance clause also supports it. On the flat fixture, though, the
    far-side street half a spacing along (77 – 83 m off, so inside the 83 m clearance) rejects the second step of
    the street opposite. The checker's probe P1c (a hook in a diagnostic copy that logs every `legal` call's first
    attempt and its final verdict; plain and 900 ha, seeds 1 – 10) found 823 streets leaving arterials with a later
    step. For 314 of them the first attempt was rejected `parallel` against the far-side street. 39 of those were
    deflected and accepted. **275 were rejected, so the street dead-ended: 270 at its second step and 5 at its third.**
    No thin strip is left, because the arterial lies between the two, so the rejection is conservative. It is
    not a wrong committed result, and every here-bar holds (the checker's 1 000-seed re-run: 0 misses; 25.9 % of all S5c streets there are single-segment). But it is not rare, and M0-c-06's integrated statistics
    (block sizes, dead-end share) will see it. Suggested handling: extend the far-side reading to a later step of a
    street whose first segment left the arterial (read the side from that arterial within the clearance), or record a
    choices row accepting the stubs. That is the session's call, before M0-c-06 judges the integrated run, rather than
    M4.

## Closing check S1 (lane `check/M0-c-05-close-s1`, 2026-10-07)

24. **N-24 (KI, test gap) The whole-life part of C-0263 (1), beyond the second step, is not pinned. V02 survives.** V02
    applies the skip only while `c.steps <= 1`. It passes `legality.test.ts` + `growth.test.ts` 58 / 58 and NEAR
    136 / 136. It changes S5's output on 15 of 30 fixture runs (P2), and probe Q1 under it finds 39 + 39 arterial
    streets dead at step 3 against the far-side street, where the tree has 0 + 0. The tree's behaviour is CONFIRMED by
    probe Q1, so under N-48 this is a test gap and not a blocker. Suggested test, one assertion: in `growth.test.ts`'s
    0.9-pitch test, also refuse stubs of three steps (`points.length <= 4`), or add a legality case with `steps: 2`
    beside the far-side street. Cheap enough to land before M0-c-06 judges the integrated run; otherwise M4.
25. **N-25 V08, V10, V12 and V12b survive and change 0 of 30 fixture runs (contrived shapes, M4).**
    * V08: `wayBetween`'s crossing branch without the 1 cm sides. It matters only when p or q lies on the way's line,
      for example a step ending on its own arterial in a T beside the far-side street. The mutant would then skip a
      clearance that the code keeps (fail safe).
    * V10: the nearest points taken from the step's start only. It differs only where the nearest pair lies at the
      step's end or at f's end.
    * V12: a q inside f accepted when the way holds it. That needs f lying along the way within 1 cm.
    * V12b: the `best ≥ 1` guard removed. It differs only at sub-2 cm separations.
    * Suggested tests: a step whose nearest point to f is its end, with the arterial crossing only there (V10), and a
      step ending on the arterial in a T beside a far-side street (V08), which keeps the clearance.
26. **N-26 V09, V19 and V14 are equivalent.** No test is needed.
    * V09: the step-meets-f guard removed. A meeting gives `best = 0`, which the `best ≥ 1` guard already refuses.
    * V19: the side read at the first step's last point rather than `points[1]`. Both lie on the one straight first
      step from the origin, so they share a side.
    * V14: `streetOrigin`'s 1 cm tolerance → 0. A first step is ≥ 25 m and leaves square, so its end never lies within
      1 cm of the arterial's line.
27. **N-27 The fixture's 1 000-seed drift pool fell from 35 to 6 windows (follows N-16).** The streets across now grow
    past their first step and meet in T's sooner, so fewer S5c streets run 600 m unbroken. The six windows give p50
    17.3° and none above 90°, but `driftRow` asserts the median band only from 20 windows. The row's assertable pools
    are `drift-grown.test.ts` (dense_core 192 windows, p50 20.3°; ribbon 644, p50 17.3°) and M0-c-06's integrated run,
    which re-judges the exit bar. Not a fail: the row holds on every pool. M0-c-06 should still see that the fixture
    alone cannot judge the median.

## The builder's notes, consolidation round C1 (lane `build/M0-c-05-consolidate-1`, 2026-10-13): R10 of `consolidation/layout-plan.md` §1.5.7 – §1.5.9, §2, §3

The round changes no behaviour. `legality.ts` reads `heading.ts`'s `RAD_PER_CDEG`, the growth files sort ids and keys
with the kernel's `compareKeys`, the comments that narrated rounds or misstated the streams' draws are rewritten, and
`test/growth/s5cd/`'s two table views become one in `support.ts`. No export was added, removed or renamed (J263 Q1,
J302 Q1): `growth/index.ts` is byte-identical, and the exported names with their kinds — the growth barrel 137, the
package barrel 692, and `heading` 11, `legality` 21, `proposals` 30, `prune` 4, `capacity` 18 — are identical before and
after (the TypeScript checker's listing of each module, sha256 `e8ffd70a…` both times). 1.5.10 is kept apart as the plan
says (`segSegD2`, `clamp01`, the bucket grids, `stageStops`).

**Old → new map (J263 Q8).** No file was renamed, split, merged or moved; the map is per helper and per comment.

| old (before this round) | new |
|---|---|
| `src/growth/legality.ts` `crossingMatrix`: `collinearCdeg * 0.00017453292519943296` | `collinearCdeg * RAD_PER_CDEG`, imported from `./heading.js` (heading.ts's export, the identical literal; never `PI / 18000`, J302 Q8) |
| `src/growth/proposals.ts` `newJunction`, `snapArm`, `joinState`: `(a, b) => (a < b ? -1 : a > b ? 1 : 0)` (the plan's :585, :860, :919) | `@plat/kernel` `compareKeys` (`kernel/src/arena/keys.ts`, the same body) |
| `src/growth/proposals.ts` `growthArea`'s enceinte sort `(x, y) => (x < y ? -1 : x > y ? 1 : 0)` (:371, not in the plan's list) | `compareKeys` |
| `src/growth/prune.ts` private `byId` (:63) | `compareKeys` (`byId` deleted) |
| `src/growth/capacity.ts` `sofar`'s and `faces`' key comparators (:221, :255, not in the plan's list) | `compareKeys(a.key, b.key)` |
| `src/growth/prune.ts:164` "the street ends at the cut, no longer provisional" | "the street ends at the cut and its record is final (a dead end, not provisional)" |
| `src/growth/proposals.ts` `GrowthStreams`' header: "`growth.heading` (each step's length and ξ, a seed's jitter)" (the N-8 misstatement: no seed draws a jitter) | each stream with what it draws, read from the code: `growth.heading` a step's length (one uniform) and, after a step that does not end its street, ξ (one normal); `retry` F-NUM's re-proposal's length and ξ; `growth.curvature` each proposal's first κ; `growth.branch` the test, then the side and the jitter (drawn even where the class grows no branch); a seed draws no jitter |
| `src/growth/proposals.ts` header, branching: "a child perpendicular ± the jitter" | "a child perpendicular to its parent on a side drawn at random, ± the branch jitter (… each one uniform of `growth.branch`)"; the seeds' line "(no jitter)" → "(no jitter is drawn for a seed)" |
| `src/growth/heading.ts` `RAD_PER_CDEG`'s doc "(π ÷ 18 000)" | the literal's status stated: one ulp above the double `PI / 18000` other modules compute; S5c's readers take this one; never swapped (1.0.6) |
| `src/growth/legality.ts` header lines 7–9 (a broken line) | re-flowed, the same words |
| `test/growth/s5cd/heading.test.ts`, `legality.test.ts`: `const tables = tableView()` | `test/growth/s5cd/support.ts` `export const tables: TableView = tableView()`, imported by both; `handCase` reads it too (a frozen view over `loadTable`'s cached tables, so one view and three are the same tables) |
| `test/growth/s5cd/capacity.test.ts:190` "(B-4)", `growth.test.ts:160` "(N-23)", `legality.test.ts:301` "(the residual N-50 named: N-23's dead ends at step 2)" | the check ids dropped; legality's line names N-50's residual by its rule (C-0263 (1)) |

`handCase`, `bentArterial`, `fixtureGrown`, `SMALL` and the oracles (`segDist`, `properCross`, `insideRing`,
`lineAngleDeg`, `polyLength`, `roleEdges`) stay. Every describe / it title is kept: 25 describe and 87 `it` calls in the
six test files (95 tests at run time, the loops counted), the sorted title lists identical and each file's title order
unchanged. One assertion was added inside an existing `it` (capacity.test.ts *faces: built land = …*): the record lists
its faces in key order (mutant C4 below).

**Equivalence.** 1.5.7: `RAD_PER_CDEG` is `0.00017453292519943296`, the literal the matrix spelt (`heading.ts:25` now),
so `limit` is the same double. 1.5.8: `compareKeys(a, b)` is `a < b ? -1 : a > b ? 1 : 0`, the comparators' own body,
on the same strings (`Id` is a branded string; `FaceInfo.key` a string); `Array.prototype.sort` with the same
comparator gives the same order (`.sort(compareKeys)` calls it with the same two arguments). The comments change no
code. §3: `tableView()` builds a frozen `View` over `loadTable(id)`, which caches each parsed table, so the shared view
reads the same `Table` objects the three views did.

**NO-SHIFT (J268, J260 (3)).** A probe (a scratch vitest file placed only in the lane's mirror) ran S3 → S4 → S5 through
the testkit harness's `fixtureRun` on the registered families — the four bar chunks' seeds 1 – 24 (plain fixture), and
P2's runs: plain, 900 ha and small (400 ha frame, 60 ha walled) × seeds 1 – 10 — 44 runs, and hashed each run's S5c, prune
and S5d records, the state's ways and junctions and the arena's way lines, with the bar's readings (junction p5, median,
4-way share, the drift windows, the 10 m turn steps). On the pre-round mirror and on the same mirror with this round's
files the JSON output is byte-identical (sha256 `be2d0a43ad845d3a…`; P2's 30 run digests aggregate `11adbe8e61cb7171`).

**Refusals (J264 (5), N-58), before = after.** 0 of 44 runs refused (no `runS5` error, no S5c batch refused whole, no
prune or rim refusal). Inside the runs the same six reported refusals stand before and after, each the item's own visible
outcome on our own intermediate geometry: `W_END_UNMARKED` ×4 (plain seeds 9, 17, 20, 23: the kernel declined the
`splitThrough` that marks a dead end's `end` junction, so the street's `to` is a bearing, counted in `refused`) and
F-NUM `reject` ×2 (plain seeds 20, 23: an optional chain refused by a precision code twice, re-proposed then rejected
with its report line, §5.2). Class: OUR OWN INTERMEDIATE; verdict under N-58: MAKE-IT-SUCCEED belongs to a fix round, not
to this zero-change pass, so they are routed to the session with their seeds (finding R10-1 below) and left as they are.

**Self-check (J183), in the lane's one mirror, each mutant run as `vitest run --maxWorkers=1 --bail=1
packages/layout/test/growth/s5cd/`, the file restored from the tree and `cmp`-clean after each.**

| id | mutation | promise | result |
|---|---|---|---|
| K1 | `crossingMatrix`'s limit × 10 (`RAD_PER_CDEG * 10`) | 1.5.7: the 6° collinearity through the shared constant | killed: legality *organic crosses only a lower-or-equal class collinear within 6°* |
| M15′ | the matrix's rank test dropped (crosses any class) — this round's reconstruction; the first check names M15 killed without its text | 1.5.7 oracle | killed: the same test |
| R08 / R09 | no deflection limit / the limit × 2 | 1.5.7 oracle | killed: legality *a step converging on a spine needs more than the legal angle …* |
| S11 / S12 | the bias's turn limit removed / × 2 | 1.5.7 oracle | killed: legality *a spine 20° off the heading turns the step to its foot …* |
| U01 – U04 | `leavesAcross` off; its hairpin guard off; `held > 0` dropped; h of any way | 1.5.7 oracle | killed: legality *on a bent arterial …* (U01, U04), *… a hairpin …* (U02), *a street on the step's own side …* (U03) |
| M25 | the lineage's index + 1 | 1.5.8 oracle | killed: capacity *the rim's streets continue …* in the folder run, and city *the growth stage keys its ways in acceptance order* run alone (1 failed / 10 passed) |
| M31 | the trim takes arterials | 1.5.8 oracle | killed: prune *an arterial handed to the trim as a provisional street is never trimmed* |
| C1 | `newJunction`'s arms sorted in reverse | 1.5.8 (the swapped comparator) | killed: growth *grows streets whose records agree with the arena …* |
| C2 | `pruneAndTrim`'s `setJunction` arms sorted in reverse | 1.5.8 | survives the folder (95 / 95); changes 0 of the 44 registered runs (the probe under it byte-identical): a pruned street's origin junction keeping ≥ 2 arms is unreached there — KI test gap R10-2 |
| C3 | `joinState`'s snapped junction's arms left unsorted | 1.5.8 | survives the folder; 0 of 44 runs changed (a snap onto a standing junction whose new arm sorts first is unreached) — KI test gap R10-2 |
| C4 | `capacityCheck`'s faces sorted in reverse | 1.5.8 | survived the folder and changed the S5d record (its face list order) on 44 of 44 runs, nothing else; **pinned this round** by the assertion above, then killed: capacity *faces: built land = …* (1 failed / 11 passed) |
| S07, S08, S09 | the earlier rounds' far-side tolerance 0; the across skip on every kind; `acrossOf` reads its own street | NO-SHIFT sample (r2) | killed, each on its own legality test |
| U07, U08 | `leavesAcross` reads only f's a-end; the far end against g's line | NO-SHIFT sample (r3) | killed, each on its own legality test |
| V01 | C-0263 (1)'s skip removed | NO-SHIFT sample (s1) | killed: legality *a later step beside the street across …* |

22 mutants: 20 killed (C4 after its pin), C2 and C3 survive as unreached test gaps. Every mutant of the plan's oracles
(R08/R09, S11/S12, M15, U01 – U04, M25, M31) is red.

* **R10-1 (for the session; N-58 routing, not this round's to change).** The registered families meet six reported
  refusals of our own intermediate geometry, identical before and after: `W_END_UNMARKED` on plain seeds 9, 17, 20, 23
  and F-NUM `reject` on plain seeds 20, 23 (default plain fixture, `flatFixture(seed)` through `runS5`). Each fails
  safe (the street stays, its end reported); under N-58 an intermediate of our own making is MAKE-IT-SUCCEED in a fix
  round.
* **R10-2 (KI, hardening, J273).** The arms order of `pruneAndTrim`'s re-armed junction and of `joinState`'s snapped
  standing junction has no pin (C2, C3). Both paths are unreached on the 44 registered runs; a hand case — a street
  snapping onto a standing T whose id sorts after the new way's, and a pruned street leaving a junction that keeps two
  arms — would pin them.

**Gates (tree, 2026-10-13).** `install --frozen-lockfile` 0; `lint` 0 (eslint 1 155 files, 0 errors, 0 warnings;
`lint: probe-red ok`; 9 whole-tree checks); `build` 0 (`tsc -b`, then the bundles); NEAR at full strength
(`packages/layout/test/growth/s5cd/` + `packages/testkit/test/layout/growth-s5cd/`, the four bar chunks included) 14
files 136 / 136; RELATED at `PLAT_FUZZ_RUNS=1000` over the five changed sources 218 files 2 637 / 2 637, exit 0 (W = 1
by `tools/test_budget.py`). Choices row C-0353, CLEAN-ROOM row L-0493.

## Closing check C1 (lane `check/M0-c-05-consolidate-close-1`, 2026-10-13): consolidation round R10

Verdict PASS (`checks/M0-c-05-c1.md`). None of these rows is a blocker. Each goes to the hardening pass (M4) unless it
says otherwise.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-c1-1 | The arms order of junctions S5c re-arms has no pin at three sites: `snapArm` (`proposals.ts:868`; Z19), `joinState`'s snapped standing junction (`:927`; Z20) and `pruneAndTrim`'s `setJunction` (`prune.ts:214`; Z21). Each reversed comparator survives `test/growth/s5cd/` (95 / 95) and changes 0 of the 44 registered runs: all three paths are unreached there. The kill of the same reversal at `newJunction` (Z18) shows the probe would see it. This extends the builder's R10-2, which lists Z20's and Z21's sites but not Z19's. | One hand case per site, each asserting the record's `arms` in `compareKeys` order: a street snapping onto an S5c junction whose existing arm sorts after the new way, the same onto a standing T, and a pruned street leaving a junction that keeps two arms. | M4 |
| N-c1-2 | J302 Q8's "the two radians-per-centidegree doubles are never swapped" is held only by `legality.ts` importing `heading.ts`'s `RAD_PER_CDEG`. Z25 (`collinearCdeg * (PI / 18000)`) survives the folder, yet the two limits differ: `600 * RAD_PER_CDEG` = `0.10471975511965978`, `600 * (PI / 18000)` = `0.10471975511965977`. | A boundary pin in `legality.test.ts`: `crossingMatrix('organic').act('secondary', 'secondary', 600 * RAD_PER_CDEG)` is `'cross'`; the next double up is `'T'`. | M4 |
| N-c1-3 | Two comparator mutants are equivalent. Z22 reverses the enceinte feature order (`proposals.ts:373`), but an M0 town has one enceinte, so the sort has one element. Z23 reverses `sofar`'s key tiebreak (`capacity.ts:221`), but that reorders only equal `value`s, and the cut point read is the value itself; at most the float sum `total` moves in its last bit, and only on a tie. | None. Z22 becomes reachable when a site has two enceintes (M1's presets), and the order is then fixed by `compareKeys` already. | — |
| N-c1-4 | Refusals met (J264, J290, N-58). M0-c-05's 44 registered runs refuse 0 runs, before and after the round. Inside them: `W_END_UNMARKED` ×1 on plain seeds 9, 17, 20, 23 and F-NUM `reject: E_BELOW_MIN_EDGE` ×1 on plain seeds 20, 23 (`flatFixture(seed)`, defaults, via `fixtureRun`). Class: our own intermediate. Verdict: MAKE-IT-SUCCEED. The count did not rise. Separately, RELATED's bench output printed `site: relief-60 (default): 2 runs, S6 ok 1; refused S5 E_SELF_INTERSECT ×1` (the `site` harness, seeds 1 – 2, test size), outside c-05's families. | For the session: a fix round for the six inner refusals, the builder's R10-1. Triage the relief-60 S5 refusal by its owner (which S5 step refuses, and whether the input is lawful). | session (fix queue) |

## Hardening round S2 (lane `build/M0-c-05-fix-s2`, 2026-10-14): R-36 / Q55, N-c1-1, N-c1-2, queue L29

The session opened this round as M0-c-05's hardening round (J237 (2)) on the inventory's two FIX-NOW rows (N-c1-1,
N-c1-2), the refusal census's line R-36 (queue Q55) first, and the queue row L29. Every edit lies inside the item's
owns: `src/growth/proposals.ts` and `src/growth/index.ts`; the tests `test/growth/s5cd/{legality,growth,prune}.test.ts`
and the new `testkit/test/layout/growth-s5cd/intermediates.test.ts`. `legality.ts`, `prune.ts`, `heading.ts` and
`capacity.ts` are unchanged. Choices row C-0384; CLEAN-ROOM row L-0575. No git.

| row | outcome | change | pin (test) | mutant → result |
|---|---|---|---|---|
| R-36 / Q55 | **FIXED (the reporting) and PINNED; Q55 DONE by the pin** | `proposals.ts`: a dead end the kernel will not mark (`W_END_UNMARKED`) is counted under the S5c record's new key `intermediates`, no longer in `refused`; `refused`'s doc says what it holds (kernel refusals of a step's insert other than F-NUM's precision codes). The walk is unchanged. | testkit `intermediates.test.ts` *S5c absorbs its own intermediates on the registered plain seeds (census R-36)*: plain 9, 17, 20, 23 each run whole; every S5c and rim record's `refused` is `{}`, no batch and no prune refused; one unmarked end per seed under `intermediates`, its street standing (`ends` `dead`, `to` a bearing); at 20 and 23 F-NUM's `re_propose` then `reject` (`E_BELOW_MIN_EDGE`) on that street's proposal; over the four, 4 unmarked and 2 rejects | R1 (the count back in `refused`, the line's mutant) red; R0 (the round-start `proposals.ts`) red, both at *plain seed 9 … stage 1's refused: expected { W_END_UNMARKED: 1 } to deeply equal {}* |
| N-c1-1 | **PINNED at `joinState` (Z20) and `pruneAndTrim` (Z21); `snapArm` (Z19) EQUIVALENT by unreachability, its premise PINNED** | none to the code | growth.test.ts *joinState: the arms of the junction snapped to are sorted by compareKeys (`way:10` before `way:5`), its kind X at four arms*; prune.test.ts *a short dangling secondary pruned from a junction of three arms leaves its two others sorted by compareKeys (`way:10` before `way:7`)*; legality.test.ts *a junction a way runs through is never snapped to: the step meets the way there in a T* | Z20 (reversed) red, Z20b (left unsorted) red, Z21 (reversed) red, P1 (a snap taken before the hit at t = 1) red on the premise test; Z19 (snapArm reversed) survives the folder, 100 / 100 |
| N-c1-2 | **PINNED** | none to the code | legality.test.ts *the 6° limit to the bit: a turn of 600 · RAD_PER_CDEG crosses, the next double up stops in a T (heading.ts's constant, never π ÷ 18 000)*: both signs, on `crossingMatrix('organic', 600)` and on the regime rules' matrix; the test also asserts `600 · (π ÷ 18 000)` lies below the limit, so it reads which double was taken | Z25 (`collinearCdeg * (π ÷ 18 000)`) red; N2b (`≤` → `<` at the limit) red |
| L29 | **FIXED** (the row's own API-surface change: the index lists names; none added, removed or renamed) | `growth/index.ts`: the seven `export *` lines → one `export { … }` and one `export type { … }` per module, the names the `export *` lines gave | growth.test.ts *its values are the 68 its modules gave through `export *` before it listed them*; the types by the TypeScript checker's census below | L29a (`wrapAngle` dropped from the list) red |

**R-36 in detail.** Before the round `deadEnd` counted `W_END_UNMARKED` in the record's `refused`, the key whose doc read
"Kernel refusals other than F-NUM's codes, by code (each step left out)": the report read as a refusal, though nothing
was refused — the step stands, the street stands with a bearing for its `to`, and the run succeeds (census R-36: our own
intermediate, verdict (a)). No other report carries it: S5c writes no warning for it and calls no `report.bug`; a
pipeline `bugs` row is written only for a refused stage run (`report.ts` `stageRefused`) or a stage's own `bug` call, and
S5c returns ok. F-NUM's `reject` is §5.2's own report line in `rungs`, the ladder's key, and stays there. The record gains
one required key, `intermediates: Record<string, number>` (an additive field of `S5cRecord`; no export added, removed or
renamed; the record is in memory only — the model digest covers the arenas, so no digest, golden or register moves). Its
readers in the tree: none read S5c's `refused` but `growth.test.ts`'s planted `E_INVARIANT` (unchanged, green). This is a
vetoable call: if the session reads the new key as a record-format change (rule (3)), the fallback keeps the count in
`refused` and the pin asserts `refused` holds `W_END_UNMARKED` alone — the walk and the census are the same either way.

**Census (J264 (5), N-58), before = after, measured.** The 44 registered runs (`fixtureRun` = `flatFixture(seed)` → S3 →
S4 → `runS5`: plain 1 – 24, 900 ha 1 – 10, small 1 – 10), each run on the round-start `proposals.ts` and on the round's,
in the lane's mirror:

| | before | after |
|---|---|---|
| runs refused (S3, S4 or S5) | 0 / 44 | 0 / 44 |
| S5c / rim `refused` | `W_END_UNMARKED` 4 (plain 9, 17, 20, 23) | none |
| S5c / rim `intermediates` | (no key) | `W_END_UNMARKED` 4 (plain 9, 17, 20, 23) |
| F-NUM `reject` (`rungs`) | 2: plain 20 proposal 35, plain 23 proposal 20, `E_BELOW_MIN_EDGE` | the same 2 |
| batch refused / prune refused | 0 / 0 | 0 / 0 |
| streets ending `snap` | 0 | 0 |

Lawful-input refusals 0 → 0; the reported refusals of the family 4 → 0 (the four were never refusals: reporting fixed);
the intermediates 6 → 6, each now under its own key. NO-SHIFT: every run's S5 output hashed with `refused` and
`intermediates` folded into one unmarked count (the S5c and rim records' other fields, the prune and S5d records, the
state's ways and junctions, the arena's way lines) — aggregate `58802231b599ab93` before and after, 44 of 44 run digests
equal.

**N-c1-1 in detail: why `snapArm` is unreachable.** `legal` takes a snap only when no hit ended the step first
(`ends === null && snapped !== null`), and the snap moves the step's end exactly onto the junction. Every junction S5c
makes is an exact end of one of its own streets' segments — the origin T is the street's first point, an X a vertex the
street lays at the crossing, an end T its last point — and every standing junction `growthArea` hands it is an arena
vertex of a way whose segments end there. On lattice (integer) coordinates the hit parameter of such a segment is exactly
t = 1, so the hit loop meets that way in a T before the snap is read. A segment escapes the hit only when `ignored` — it
passes through the step's start (then it is collinear with the step, and the snap's square test refuses the junction) —
or when it is the street's own (the own-street test refuses it) or parallel to the step (the square test again). So a
snap happens only onto a junction with no way within 1 cm: a hand-built area's free point (legality.test.ts's
`junction:5`), never one S5c made. `snapArm` (it looks the snapped id up among the record's own junctions) and
`joinState`'s snap branch run only on hand-built input; the 44 registered runs end 0 streets by a snap. `joinState` is
exported, so its own contract is pinned directly; `snapArm` is private and no lawful input reaches it, so Z19 is
equivalent on every lawful input. The premise is pinned instead: if a later change lets a snap reach a junction on a way
(P1), the premise test turns red first, and `snapArm` then needs its hand case (M1, when squares or free junction points
enter S5c's area).

**L29: the export census (TypeScript checker, `getExportsOfModule`, names with value / type kind).** Before and after
byte-identical (sha256 `e4e7d99c…`): `growth/index.ts` 137 (boundary 28, mainRoads 26, heading 11, legality 21, proposals
30, prune 4, capacity 18; `GrowthStage` is mainRoads' and re-exported by proposals, listed once), the package barrel 692.
Values 68, types 69.

**Self-check (J183), in the lane's one mirror** (`waves/selfcheck-build-M0-c-05-fix-s2`, isolated: no link into the
tree, `@plat/*` realpaths inside it), each mutant `vitest run --maxWorkers=1 --bail=1` on `packages/layout/test/growth/s5cd/`
(R0, R1: `packages/testkit/test/layout/growth-s5cd/intermediates.test.ts`), the file restored from the tree and
`cmp`-clean after each. The clean folder: 6 files, 100 / 100.

| id | mutation | promise | result |
|---|---|---|---|
| R0 | the round-start `proposals.ts` (the count in `refused`) | R-36: an intermediate is never a refusal | red: *plain seed 9 … stage 1's refused* |
| R1 | `rec.intermediates[…]` → `rec.refused['W_END_UNMARKED']` (the unmarked end promoted to a refusal) | R-36 (the line's mutant) | red: the same |
| Z25 | `crossingMatrix`'s limit `collinearCdeg * (π ÷ 18 000)` | N-c1-2 | red: *the 6° limit to the bit …* |
| N2b | `Math.abs(turnRad) <= limit` → `<` | N-c1-2 (the boundary) | red: the same |
| Z20 | `joinState`'s arms sorted in reverse | N-c1-1 | red: *joinState: the arms of the junction snapped to …* |
| Z20b | `joinState`'s arms left in append order | N-c1-1 | red: the same |
| Z21 | `pruneAndTrim`'s `setJunction` arms sorted in reverse | N-c1-1 | red: *a short dangling secondary pruned from a junction of three arms …* |
| P1 | the hit loop skips a hit at t ≥ 1 when a junction was snapped (the snap reaching a junction on a way) | N-c1-1 (Z19's premise) | red: *a junction a way runs through is never snapped to …* |
| Z19 | `snapArm`'s arms sorted in reverse | N-c1-1 | survives (100 / 100): equivalent, unreachable (above) |
| L29a | `wrapAngle` dropped from the index's list | L29 | red: *its values are the 68 …* |

10 mutants: 9 red, Z19 equivalent (unreachable; its premise P1 red).

**Gates (J193 relative locality, W = 1).** `install --frozen-lockfile` 0; `lint` 0 (eslint 1142 files, 0 errors; the
`probe-red` check reports every planted line of `zz-probe.ts`); `build` 0 (`tsc -b` and the bundles); NEAR (the item's
own test files, full strength): 15 files, 146 / 146, exit 0 (re-run 2026-10-18 on the relaunched container, the owned
files as above); RELATED@1000 over `src/growth/proposals.ts` and `src/growth/index.ts`: 210 files, 2573 / 2573, exit 0
(2026-10-14, W = 1, the sources unchanged since). The lane's mirror is deleted.

## Closing check S2 (lane `check/M0-c-05-close-s2`, 2026-10-18 – 19): hardening round S2

Verdict PASS (`checks/M0-c-05-s2.md`). Q55 is DONE by the R-36 pin. None of these rows is a blocker; each goes to the
hardening pass (M4) unless it says otherwise. The mutant names are the verdict file's.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s2c-1 | Z21b (`pruneAndTrim`'s `setJunction` arms left as filtered, no sort) survives `test/growth/s5cd/` 100 / 100. The seat judges it equivalent: every arm list reaching the prune is already sorted (`newJunction`, `snapArm`, `joinState` and the prune each sort), and a filter keeps the order. Z21 (the comparator reversed) is red on the round's prune pin, so the sort's direction is held. | None while every writer of a junction's arms sorts. If a later stage hands the prune a junction it did not sort, add a hand case with unsorted entry arms. | M4 |
| N-s2c-2 | Z19 (`snapArm`'s arms reversed) survives the folder 100 / 100, and Z19t (`snapArm` throws on entry) passes NEAR's 15 files 146 / 146; the 44 registered runs end 0 streets by a snap. Judged by this seat (not from the builder's label): equivalent by unreachability on M0's lawful inputs, because every junction S5c meets is an exact end of an indexed way segment, `crossParams` accepts t = 1, and the step meets that way in a T before a snap is read (the verdict file's §(2)). The premise is pinned: P2 (a snap taken before the hit at t = 1) is red on *a junction a way runs through is never snapped to …*. | When squares or free junction points enter S5c's area (M1's presets), `snapArm` becomes reachable: add N-c1-1's hand case for it then (a street snapping onto an S5c junction whose existing arm sorts after the new way). | M1 |
| N-s2c-3 | NO-SHIFT was not re-measured byte for byte by this seat: no pre-round image of `proposals.ts` exists in the tree without git. The seat's after-image aggregate over the state's ways, lines and junctions, the streets and the prune of the 44 runs is `9030605526592793` (its own field set, not comparable with the builder's `58802231b599ab93`, which folds `refused` and `intermediates` into one count). Every count and proposal id equals the C1 check's recorded before-figures, RELATED's goldens are green, and the round's code change is one counter's key, so the claim is PLAUSIBLE. | Optional for the session: re-run the census probe on main's `proposals.ts` (fetched read-only) at the round's commit to make it CONFIRMED. | session (optional) |
| N-s2c-4 | Refusals met (J264, J290, N-58). M0-c-05's 44 registered runs (plain 1 – 24, 900 ha 1 – 10, small 1 – 10, `fixtureRun`) refuse 0 runs after the round, as before. The six inner events (`W_END_UNMARKED` ×1 at plain 9, 17, 20, 23 under `intermediates`; F-NUM `re_propose` + `reject E_BELOW_MIN_EDGE` at plain 20 proposal 35 and 23 proposal 20, in `rungs`) are lawful input, class OUR OWN INTERMEDIATE, absorbed inside S5c (verdict (a)); reported refusals 4 → 0, runs refused 0 → 0, the census did not rise. Separately, RELATED's bench output printed `site: relief-60 (default): 2 runs, S6 ok 1; refused S5 E_SELF_INTERSECT ×1` (the `site` harness, relief-60 × default, seeds 1 – 2, test size), outside c-05's families. | For the session: the relief-60 S5 refusal stays with its owner (Q46's class, M0-c-02), replayable by the `site` harness at relief-60 default seeds 1 – 2. Nothing for c-05. | session (fix queue) |


## Hardening round S3 (lane `build/M0-c-05-fix-s3`, 2026-11-10): Q150 (R13), Q98, Q149

The session opened this round as M0-c-05's hardening round S3 (J237 (2), J238; the second re-triage's entry M0-c-05,
class COMPOUNDS, J722; rulings J751) on three open queue rows: Q150 (the session's line, under R13) first, then Q98 and
Q149. **No source file changed.** The six owned growth sources hash as round S2's landed record has them
(`proposals.ts` e98c7926…, `heading.ts` a7151d06…, `legality.ts` 806db60f…, `capacity.ts` 30c60abe…, `prune.ts`
25ae79b2…, `index.ts` 3cef1142…). The edits are tests inside the owns: `test/growth/s5cd/prune.test.ts` (changed) and the
new `test/growth/s5cd/through.ts` (support), `draws.test.ts` (Q150) and `seeds.test.ts` (Q149). `boundary.ts`,
`mainRoads.ts` and `test/growth/s5ab/` (M0-c-04's) and M0-x-04's `pipeline/base.ts` were read, never edited. No export,
index or message text moved; no digest, golden or register is re-recorded, because no output moves. Choices row
C-0495; CLEAN-ROOM row L-0814. No git.

| row | outcome | change | pin (test) | mutant → result |
|---|---|---|---|---|
| Q150 (R13) | **MEASURED; outcome (a): the frame is the cause; NO source change; CARRIED to M1** (J238 (1)'s proof in C-0495 and below) | none to the code | `draws.test.ts`: *Q150: the growth stage draws at every seed of the site fixture from the sweep's boundary frame (1 100 ha, 50 ha walled)* (seeds 1 – 12: stage 1 seeded, proposals made, the growth stage's own streams drawn); *… below the boundary, at M0-d-09's test frame (400 ha, 12 ha walled), the growth stage has nothing to draw for* (seeds 1, 4, 9: no seed in any stage, no top-up, 0 draws; at seed 4 the `{ S5: 1 }` reroll moves S5's root with 0 growth draws, so the move is S5b's) | Q150-a (S5c's stage reads `growthStreams(slice)`, never its own `ctx.stream`) red; Q150-b (no seed ever pushed) red; both at *seed 1 … expected 0 to be greater than 0* (Q150-a at `draws.test.ts:31`, the draws; Q150-b at `:29`, stage 1's seeds) |
| Q98 | **FIXED and PINNED** | `prune.test.ts:83` (now :85, under a two-line comment): the dense core's (and every regime's) prune block width is derived from regimes.json — `tables.table('regimes').pair(gs.regime, 'blockDepthFloorM')[0] × 100` — and is no longer the literal 3 000 / 4 500 / 3 000 cm | the test itself: green on the shipped table (6 / 6); green on a mirror copy of regimes.json with the dense core's floor at 37 m (6 / 6; the prune then runs at 3 700 cm) | Q98-a (the literal restored, floor at 37 m) red: *seed 1 … expected 3700 to be 3000* |
| Q149 | **JUDGED: the EXPECTED OUTCOME of the frame under C-0254 (3), not a growth defect; PINNED with its reason; the seed lattice's phase REPORTED (N-s3-1)** | none to the code | `seeds.test.ts`: *Q149: no secondary street at flat seeds 2, 3 and 6 on the 900 ha / 30 ha walled frame — the frame, not a defect* (per seed: the replay equals the registered run's S5 root; 0 growth draws; every stage's S5c record `[k, 0 seeds, 0 proposals, 0 streets]`; stage 1's clear stretches each shorter than the 80 m pitch; stages 2 and 3 with no arterial point clear by D; the same seed at 1 100 / 50 ha grows secondaries) | Q149-a (the seeds' clearance from bands and reservations dropped) red: *expected 38 to be +0*; Q149-b (the pitch halved, S / 4) red: *expected 19 to be +0* (both at `seeds.test.ts:156`, the run's growth draws) |

**Q150: the sweep.** The probe ran in the lane's mirror. It used the base registration (M0-x-04's `registerBase`) with S6
and S8 as no-op stages, and S5's context wrapped so that every call on a stream S5 opens is counted. Each draw is
assigned to its sub-stage by the call stack (`capacityStep` → S5d, `growthStep` → S5c, `mainRoadsStep` → S5b). Each
seed ran at reroll 0 and under `{ S5: 1 }`, and S5's stage root was read. The site fixture (`RIVER_BLUEPRINT`), seeds
1 – 12, on eight frames (frame ha / walled ha), each frame at reroll 0 and 1 (192 runs):

| frame (ha / walled ha) | seeds run | S5c draws (seeds) | S5d draws (seeds) | S5b draws (seeds) | S5 root moved under {S5: 1} (seeds) | moved with no S5c / S5d draw | stage-1 seeds min-max | stage-2 seeds | stage-3 seeds min-max | refusals | ms per run |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 400/12 | 12 | 0 | 0 | 6: 1, 2, 4, 6, 8, 9 | 2: 4, 9 | 2: 4, 9 | 0-0 | [0] | 0-0 | 0 | 7 s |
| 900/30 | 12 | 9: 1, 2, 4, 6, 7, 8, 10, 11, 12 | 0 | 12: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 | 10: 1, 2, 3, 6, 7, 8, 9, 10, 11, 12 | 1: 9 | 0-2 | [0] | 0-1 | 0 | 17 s |
| 1000/40 | 12 | 10: 1, 2, 3, 4, 6, 7, 9, 10, 11, 12 | 0 | 12: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 | 11: 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12 | 1: 5 | 0-2 | [0] | 0-3 | 0 | 28 s |
| 1100/50 | 12 | 12: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 | 0 | 9: 1, 2, 3, 6, 7, 8, 9, 10, 11 | 12: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 | 0 | 3-7 | [0] | 0-7 | 0 | 25 s |
| 1200/60 | 12 | 12: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 | 0 | 12: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 | 12: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 | 0 | 5-7 | [0] | 0-12 | 0 | 31 s |
| 1600/100 | 12 | 12: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 | 0 | 12: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 | 12: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 | 0 | 7-16 | [0] | 0-22 | 0 | 45 s |
| 2000/160 | 12 | 12: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 | 0 | 12: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 | 12: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 | 0 | 23-28 | [0] | 2-44 | 0 | 56 s |
| CITY 2500/220 | 12 | 12: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 | 0 | 12: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 | 12: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 | 0 | 35-42 | [0, 1] | 15-52 | 0 | 72 s |

The fusion fixture (`FLAT_BLUEPRINT`) on the same frames (1 000 / 40 and 1 100 / 50 aside; 144 runs), and at 1 100 / 50
apart (24 runs: S5c draws at 12 / 12, the root moved at 12 / 12, stage-1 seeds 6 at every seed):

| frame (ha / walled ha) | seeds run | S5c draws (seeds) | S5d draws (seeds) | S5b draws (seeds) | S5 root moved under {S5: 1} (seeds) | moved with no S5c / S5d draw | stage-1 seeds min-max | stage-2 seeds | stage-3 seeds min-max | refusals | ms per run |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 400/12 | 12 | 0 | 0 | 8: 1, 2, 3, 5, 6, 9, 11, 12 | 2: 6, 9 | 2: 6, 9 | 0-0 | [0] | 0-0 | 0 | 1 s |
| 900/30 | 12 | 9: 1, 4, 5, 7, 8, 9, 10, 11, 12 | 0 | 12: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 | 12: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 | 3: 2, 3, 6 | 0-2 | [0] | 0-0 | 0 | 2 s |
| 1200/60 | 12 | 12: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 | 0 | 12: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 | 12: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 | 0 | 8-8 | [0] | 0-1 | 0 | 3 s |
| 1600/100 | 12 | 12: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 | 0 | 12: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 | 12: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 | 0 | 15-18 | [0] | 0-1 | 0 | 4 s |
| 2000/160 | 12 | 12: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 | 0 | 12: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 | 12: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 | 0 | 28-30 | [0] | 0-3 | 0 | 6 s |
| CITY 2500/220 | 12 | 12: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 | 0 | 12: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 | 12: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 | 0 | 42-44 | [0] | 2-9 | 0 | 8 s |

Over the 360 runs no stage was refused. **The verdict, outcome (a).** S5c draws only for a proposal. Every proposal
draws its first curvature and its first step's length, and a proposal comes only from a seed. S5d draws only when an
unwalled stage's top-up grows its rim. The draws vanish below **1 100 ha with 50 ha walled**. In the sweep's frames, the
growth stage draws at every seed of the sample from 1 100 / 50 up (1 100, 1 200, 1 600, 2 000 and CITY: 12 / 12 each,
and the reroll moves S5's root at 12 / 12 each). Below it the count falls: 10 / 12 at 1 000 / 40, 9 / 12 at 900 / 30
and 0 / 12 at M0-d-09's test frame, 400 / 12.

**Why a small frame gives S5c and S5d nothing to draw for:**
- **Seeds (C-0254 (3)).** A seed is a point every S / 2 (80 m at walled CITY) along an arterial run, from S / 2. It must
  lie at least the clearance D (83 m walled, 33 m ribbon) from setback lines, walls, shores and reservations, and at
  least S / 2 from standing junctions.
- **Stage 1 on a small frame.** The radial runs go from the plaza to past the wall. They are clear only on a stretch
  shorter than the pitch, between the plaza's clearance and the wall's. The seed points at 80 m and 160 m fall inside
  the two clearances. This was traced at the fusion fixture's seed 2 on 900 / 30: three runs of 251 – 274 m, clear from
  88 – 112 m to 140 – 160 m.
- **The walled ring and the ribbon.** No arterial point of the region is clear by D at all. The ring's best is 24 – 28 m
  against D = 83 m; the ribbon's is 8 – 22 m against 33 m.
- **S5d draws at no seed of any frame.** On the fixture's stand-in demand no unwalled stage is short by more than 5 %
  (`topUp` `none` in all 360 runs), and a walled stage's top-up is M1's (C-0254 (11)). That is the design's "a stage
  within 5 % takes none". **No seed of the sample fails to draw at or above the boundary.**

**For M0-d-09's pair.** At its test frame the growth stage proper (S5c, S5d) draws at no seed. The `{ S5: 1 }` pair's
moves there come from S5b's draws alone: site seeds 4 and 9, fusion seeds 6 and 9 (`growth.mainroad`, M0-c-04's). This
matches the queue row's figures. The session's seam at seed 4 (J712) therefore reads an S5b re-draw. No file of another
item moves (no source change). `bench/test/determinism/runner.test.ts` was read, never edited.

**Carried to M1 (J238 (1)).** The question for the growth stage's owners, whether S5c and S5d should draw at every seed
of a small frame, is answered: by its rules they have nothing to draw for there. Whether a small frame should seed
otherwise (N-s3-1) is a change of S5c's seeding contract, carried with S2's real demand to M1.

**Q98 in detail.** The literal was the only reading of the floor in the item's tests. `legality.test.ts`'s clearances
(83 m walled, 33 m ribbon) and seed spacings are unchanged by a 37 m floor: max(37, 80) + 3 = 83 m. A 37 m floor moves
the prune's block width to 3 700 cm and the prune with it; the test follows the table.

**Q149 in detail.** The rows are integration-g15's N-2 and CP's hand-back. On the 900 ha / 30 ha walled frame the fusion
fixture's seeds 2, 3 and 6 hold no S5c seed in any stage. This holds in the base run and in the replay alike.

| seed | stage 1 (dense core, ≈ 18.6 ha): clear stretches (m) vs the 80 m pitch | stage 2 (walled rings, ≈ 11 ha): best clearance vs D 83 m | stage 3 (ribbon, ≈ 4 ha): best clearance vs D 33 m |
|---|---|---|---|
| 2 | 65, 55, 65 (sampled every 5 m; none holds a seed point) | 24.6 m | 22.3 m |
| 3 | 65, 60, 45 | 24.5 m | 8.0 m |
| 6 | 45, 40, 50 | 25.8 m | 21.3 m |

(seeds 1, 4, 5 on the same frame: stage-1 stretches 40 – 60 m, and a seed point fell in one, 1 – 2 seeds, 1 – 2
streets.)

Read against §4.4 S5c, the outcome follows the design's rules:
- walled regimes grow district-scale secondaries only, with a separation floor of 160 m at CITY;
- legality forbids a run within D of a wall, a setback band or a reservation within 30° of parallel, and a seed's
  proposal leaves square to its radial arterial, along the plaza and the wall;
- "a stage with no seed inside its boundary … grows nothing".

The frame is a seventh of §12.2's 220 ha walled. On Q150's boundary frame the same three seeds seed stage 1 (6 seeds
each) and grow 7, 4 and 8 streets (the pin's witness). **The refusal census does not rise:** no refusal is involved,
and growing nothing is not a refusal.

**The refusal census (J264 (5), N-58), before = after.** No source changed, so the census holds by construction. It was
also measured on the round's tree (round S2's 44 registered runs in the mirror: `flatFixture` → S3 → S4 → `runS5`, plain
1 – 24, 900 ha 1 – 10, small 1 – 10): runs refused 0 / 44; S5c and rim `refused` {} everywhere; `intermediates` `W_END_UNMARKED` 4; F-NUM `re_propose` then `reject` (`E_BELOW_MIN_EDGE`) 3 — plain 20 p35 and plain 23 p20 as round S2 measured, and small 6 p4, new on the current base since round S2 (M0-c-04 S5's and M0-c-02 S6's landings moved S5's input there; this round changed no source): OUR OWN INTERMEDIATE, absorbed by F-NUM's ladder (C-0085), the run whole; batch and prune refused 0 / 0; streets ending `snap` 0. Over the sweep's 360 pipeline runs: 0 stages refused. Lawful-input
refusals 0 → 0.

**Notes for the session (not built here).**
- **N-s3-1 (REPORTED; C-0254 (3) contract; carried to M1 with Q150).** The seed lattice is anchored at each arterial
  run's start, with its first point at S / 2 = 80 m. That point lies inside the clearance D = 83 m of whatever the run
  starts on (the plaza, or the wall where a run starts there). A stage-1 stretch between the plaza's clearance and the
  wall's is therefore seeded only where a lattice point (160 m, 240 m, …) falls in it. A lattice anchored on each clear
  stretch would seed stage 1 at the fusion fixture's seeds 2, 3 and 6 on 900 / 30 (traced: their stretches exist). The
  frames' other seeds that do not draw were not traced: the site fixture's 3, 5 and 9 on 900 / 30, and 5 and 8 on
  1 000 / 40. Such a lattice would also move every S5 output at every frame. That is a change of S5c's seeding contract (rule (3) of the round),
  for the session's ruling. Each case fails safe: the stage grows nothing, reported by its record.
- **N-s3-2 (PLAUSIBLE, read from the code; M0-x-04 / M0-c-05 contract).**
  - In the pipeline, `s5cStage(k)` and `s5dStage(k)` open the growth streams afresh through `ctx.stream` at each stage
    k (`proposals.ts:1015 – 1016`, `capacity.ts:404 – 405`). The stream key holds no k (`runner.ts` `ctx.stream`), so
    each stage's S5c, and S5d's rim, starts the same draw sequence.
  - `runS5`, this item's composition outside the runner, continues one set of streams across the stages. C-0254's "the
    rim grows from them, continued" reads as that.
  - Both are deterministic, with no refusal. The draws are correlated across stages in the pipeline only.
  - Not this round's to change, because it touches the stage's contract with the runner. Reported.
- **N-s3-3 (informative).**
  - The walled-rings stage holds no seed at any frame up to 2 000 / 160, and at most one at CITY (site; none on the
    fusion fixture). A ring between two walls is narrower than about twice the clearance, so the design's legality
    leaves it nothing to grow (its lanes are S8's).
  - `draws.test.ts` costs about 5 minutes at W = 1 (12 site runs at 1 100 / 50, 4 at 400 / 12).
- **N-s3-4 (for the session: foreign RELATED reds, not this item's).**
  - RELATED@1000 (2026-11-11) failed four tests in two bench files, all on relief-60 default seed 2 at the test size:
    `bench/test/site/compose.test.ts:268` (Q122's "refuses at S5": expected 1 refused stage, got 0) and three in
    `bench/test/site/spike.test.ts` (the water-gate count, expected 2 got 4; the strip receipt, expected 138 got 466;
    `:545`, "S5 refused, S6 not reached": `s6` is now defined).
  - Cause: S5 no longer refuses at relief-60 seed 2 (the `site` harness printed `relief-60 (default): 2 runs, S6 ok 2;
    refused none`; rounds S1 – S2 met `refused S5 E_SELF_INTERSECT ×1` there, N-c1-4 / N-s2c-4, Q46's class, M0-c-02).
    These tests pin that old refusal. The move came with the base of 2026-11-10 07:17 (M0-c-04 S5's held enclosure,
    M0-c-02 S6's landing, `boundary.ts`, `pipeline/base.ts`, `enceinte/*`), or with M0-c-01 S4's siting in flight. It
    did not come from this item: none of its sources changed in this round, and they hash as round S2's record.
  - Refusal census: one lawful S5 refusal fewer outside c-05's families (good news). The bench tests' owners re-pin
    relief-60 seed 2. Replay: the `site` harness, relief-60 default, seeds 1 – 2, test size.

**Mutant table (the lane's mirror, W = 1, `--bail=1` on the pin's file; each mutated file restored by copy and `cmp`
before the next).**

| mutant | where | pin | result |
|---|---|---|---|
| Q98-ctl (control) | regimes.json dense core `[37, 45]` | `prune.test.ts` | green 6 / 6 |
| Q98-a | the literal restored, floor `[37, 45]` | `prune.test.ts` | **red**: seed 1, expected 3700 to be 3000 (`prune.test.ts:85`) |
| Q150-a | `s5cStage.run`'s streams from `growthStreams(slice, reroll)`, not `ctx.stream` | `draws.test.ts` | **red**: seed 1, expected 0 to be greater than 0 (`:31`, the draws) |
| Q150-b | `growthArea` pushes no seed | `draws.test.ts` | **red**: seed 1, expected 0 to be greater than 0 (`:29`, stage 1's seeds) |
| Q149-a | `growthArea`'s seed clearance only from shores | `seeds.test.ts` | **red**: seed 2, expected 38 to be +0 (`:156`, the growth draws) |
| Q149-b | the seed pitch S / 4 | `seeds.test.ts` | **red**: seed 2, expected 19 to be +0 (`:156`) |

**Gates (W = 1, in the tree, after the last test edit).** install --frozen-lockfile 0; lint 0 (eslint 1302 files, 0 errors, the probe red on every planted line, 9 whole-tree checks); build 0 (tsc -b ok) — re-run 2026-11-11 after a container restart, no file under `packages/`, `bench/` or `tools/` changed since NEAR; NEAR (full strength) `test/growth/s5cd/` + `testkit/test/layout/growth-s5cd/` 17 files 164 / 164 exit 0 (1 203 s); RELATED@1000 over the six owned growth sources: exit 1, 273 files (271 passed, 2 failed), 3 442 tests (3 438 passed, 4 failed), 9 540 s (2026-11-11 18:49 – 21:28, W = 1, re-run after the container restart killed the 2026-11-10 09:00 run). Every one of the item's own test files is green; the four reds are foreign (N-s3-4), none on a file this item changed (it changed no source). The lane's mirror was deleted once the mutants were done.

## Closing check S3 (lane `check/M0-c-05-close-s3`, 2026-11-11 – 12): hardening round S3

Verdict PASS (`checks/M0-c-05-s3.md`). Q150 is confirmed at outcome (a) and carried to M1; Q98 is fixed and pinned; Q149
is judged and pinned. None of these rows is a blocker. The mutant and log names are the verdict file's.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s3c-1 | **The seed lattice's phase decides the band below Q150's boundary** (confirms the builder's N-s3-1 with the seat's own figures). K7t (the same rules, the lattice shifted by S / 4 = 40 m) seeds stage 1 at flat 900 / 30 seeds 2, 3 and 6 (3 seeds each) and leaves 2, 3 and 1 secondaries after the prune (31 – 167 m; at seeds 2 and 3 one reaches the wall's band; one more pruned at each seed; 19 / 36 / 10 draws; 0 refusals). The site fixture's seeds that draw nothing below the boundary are the same case: at 900 / 30 seeds 3, 5 and 9 and at 1 000 / 40 seeds 5 and 8, stage 1 holds clear stretches of 3 – 63 m on one to three primaries (e.g. 900 / 30 seed 9: 90 – 117 m and 89 – 102 m along the run; 1 000 / 40 seed 8: 166 – 222, 84 – 147, 89 – 137 m), each shorter than the 80 m pitch, with every lattice point (80 / 160 / 240 m) inside the clearance (0.6 – 82 m from the reservation or the band against D = 83 m); stages 2 and 3 hold no arterial point clear by D (greatest 2 – 45 m against 83 m; 4 – 38 m against 33 m, one 5 m stretch without a lattice point). At M0-d-09's test frame (400 / 12) the cause is the geometry whatever the lattice: no arterial point of any stage is clear by D at seeds 1 – 12 (stage 1's greatest clearance 34.7 – 73.5 m). | The session's ruling with Q150 at M1: whether C-0254 (3)'s lattice should be anchored on each clear stretch (a change of S5c's seeding contract; every S5 output moves). Each case fails safe today (the stage grows nothing, its record says so). | M1 (session's ruling) |
| N-s3c-2 | **One sentence of the builder's section and of C-0495 is inaccurate.** "`topUp` `none` in all 360 runs" / "none is short on the fixture's stand-in demand": on the site fixture at 400 / 12, seed 11, stage 3 (the ribbon) is short and S5d's top-up runs — `topUp: 'grown'` at reroll 0 and under `{ S5: 1 }` (`sweep-river-400x12.jsonl`, and the seat's replay) — with a rim of 0 seeds, 0 proposals and 0 draws. The claim that matters stands: S5d draws at no seed of any frame (the seat's tally holds no growth draw at 400 / 12 at all). `draws.test.ts` reads seeds 1, 4 and 9 only, where `topUp` is `none`. | Correct the sentence at the item's next round (text only): "S5d's top-up ran once in the sweep (site 400 / 12 seed 11, stage 3) and its rim held no seed". | M1 (with Q150) |
| N-s3c-3 | **Q98's class in two other lines of the item's tests.** `legality.test.ts:44` reads the ribbon's floor as the literal `3_000` (`Math.max(3_000, 750) + 150`) and `:51` the walled rings' block depth as `4_500`. Neither is the dense core's row Q98 names: under a mirror regimes.json with the dense core's floor at 37 m the item's other 15 NEAR files stay green, 146 / 146 (F37), so M0-b-05a's re-signed dense-core floor turns no other test of this item red. | Derive both from regimes.json if M0-b-05a (or a later table round) re-signs the ribbon's or the walled rings' floor. | M4 (or b-05a's wave if it moves those rows) |
| N-s3c-4 | **RELATED's foreign reds (confirms the builder's N-s3-4).** RELATED@1000 over the six owned growth sources (tree, W = 1, run seed `PLAT_FUZZ_SEED=-1222870520`): 271 of 273 files, 3 438 of 3 442 tests. The four reds are `bench/test/site/compose.test.ts:268` (*relief-60 default seed 2 (test size) refuses at S5 …*: expected 1 refused stage, got 0) and three in `bench/test/site/spike.test.ts` (`:201` expected 2 water-gate wall edges, got 4; `:341` the strip receipt, expected 138, got 466; `:545` *relief-60, seed 2 (S5 refused, S6 not reached)*: `s6` is defined). All four pin an S5 refusal at relief-60 seed 2 that the base no longer makes (`site: relief-60 (default): 2 runs, S6 ok 2; refused none`). No test of this item is red and the round changed no source (the six sources hash as the landed record; their files carry the tree's restore time, before the round). | The owners of the two bench files re-pin on the current base (one lawful S5 refusal fewer). Nothing for c-05. | session (fix queue) |
| N-s3c-5 | **A refusal met outside the registered families (J264, J290, N-58): the trim's `removeEdges` answers `E_DEGENERATE` ('stretch') when the cut falls on the street's own end.** Site fixture, 2 000 / 160, seed 5, reroll 0, stage 3 (the ribbon): `way:65` (a provisional secondary of 33 m ending at the boundary) has its first exit, rounded to the lattice, at its end vertex (41442, 61855); `pruneAndTrim` splits there and asks `removeEdges` for the stretch from that point to itself; the kernel refuses; the prune counts `refused: { E_DEGENERATE: 1 }`, takes its new junction row back and leaves the street as it stood — still `provisional: true` in the S5 record, `ends: 'boundary'` (`degen.jsonl`; the same count at CITY seeds 4 and 8 under `{ S5: 1 }`, stage 3). The run is whole (0 stages refused, 13 trims and 11 prunes of the same batch committed) and the geometry is right (nothing lies beyond the boundary); the record's flag and the counted refusal are the shortfall. Input LAWFUL; class OUR OWN INTERMEDIATE; verdict MAKE-IT-SUCCEED. Not in the item's 44 registered runs (prune `refused` {} at all 44). Not this round's (no source changed). | A fix round of c-05: in the trim, a cut that equals the street's end is "nothing to trim" — mark the street final (`provisional: false`, an `end` junction as a trimmed street gets) without a `removeEdges` call; pin on site 2 000 / 160 seed 5. | session (fix queue; M0 hardening) |
| N-s3c-6 | **The census's inner events on the current base** (the 44 registered runs, `fixtureRun`: plain 1 – 24, 900 ha 1 – 10, small 400 / 60 1 – 10): 0 / 44 runs refused; S5c, rim, batch and prune `refused` {} everywhere; `intermediates` `W_END_UNMARKED` × 1 at plain 9, 17, 20, 23 (as round S2); F-NUM `re_propose` then `reject` (`E_BELOW_MIN_EDGE`) at plain 20 proposal 35 and plain 23 proposal 20 (as round S2) and at small 6 proposal 4 (not in round S2's figures), and one `re_propose` that then succeeds at plain 19 proposal 36; `topUp` `none` at every stage of the 44; 0 streets ending `snap`. These are the builder's figures. The third reject came with the base between rounds S2 and S3 (M0-c-04 S5's and M0-c-02 S6's landings), not with this round, which changed no source: before = after. LAWFUL input, OUR OWN INTERMEDIATE, absorbed by F-NUM's ladder (the proposal ends, the run whole). | With N-c1 / N-s2c-4's class at the hardening pass: the short-edge re-proposal that still rejects (three proposals in 44 runs). | M4 |
