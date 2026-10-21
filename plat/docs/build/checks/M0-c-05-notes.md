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
