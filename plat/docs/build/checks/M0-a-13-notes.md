# M0-a-13 — minor notes for the hardening milestone M4 (check/M0-a-13, 2026-10-05)

These are the checker's MINOR findings (J180): none fails the item. Each names its evidence; mutant ids refer to the
targeted mutants listed in `checks/M0-a-13.md` (run one at a time in a scratch mirror, `--maxWorkers=1`,
PLAT_FUZZ_RUNS=2000).

1. **The path check and the rotation check shadow each other on the fixtures.** Removing the mover-path check
   (`validate.ts` "swept: the path of …", M12) or the rotation check (`rotationKept` call in `stepProblem`, M14) alone
   leaves every test green: the found case of seed 137587846 is now also caught by the nesting check, and the fixture
   "a lane end swung from east of its junction to west of it, crossing nothing at its end" is caught by the path check
   (the end's path crosses the spine edge x = 2 000). Each check is the author's addition beyond §3.6's list (C-0193 (4));
   a fixture that isolates each one (a rotation flip whose path crosses no unmoved edge; a jump the nesting rule cannot
   see) would pin them.
2. **The placement-bound call site is untested** (M20: removing `placementBoundProblem` from `attempt` survives).
   `validate.test.ts` tests the predicate directly; no fixture places a re-seat before an end of its own route that is
   itself placed elsewhere. §3.10's placement bound is not in the item's §3.10 scope list, so this is a note.
3. **The region fixture is vacuous on its own claim** (M22: displacing re-seated vertices outside the region survives).
   In "a displace brush over a grid of ways moves only vertices inside the region" the brush (radius 800 cm about
   (1 500, 1 500)) is already zero at every vertex outside the region box (y = 500 and 2 500 are 1 000 cm away), so the
   region does no work. A brush wider than the region would make the test bite.
4. **The smoother's weight is untested** (M29: adding 3 cm to every x displacement survives). `smooth.test.ts` checks only
   that the amplitude falls. The weight is C-0193 (6)'s own reading (§3.1 names none); a pinned expected position for
   one pass would hold it.
5. **simplify's tie-break and ring floor are untested** (M34 `<` → `<=` survives; M35 removing the ≥ 3-vertex ring guard
   survives). Both are C-0193 (7)'s readings; the ring guard may be unreachable because the triangle and fold checks
   refuse the collapsing removals first — a note either way.
6. **Equivalent survivors (no test needed):** M36 (simplify's chain-segment crossing test) — on a simple input a
   segment crossing the new one must enter the cut-off triangle through a–c and leave through a–i or i–c, so the
   triangle test already refuses it; M38 (the fold-back test) — a collinear fold leaves the next vertex on the new
   segment, inside the closed triangle; M39 (re-seat projection unclamped to the route) and M40 (placement's strictly-
   inside test) — a point at or beyond a route end fails minEdge to that end in `vertexProblem`.
7. **simplify is O(n³)** in the worst case (each removal rescans every vertex and every segment). Fine for §4.4's
   traces; a heap and a packed index over the chain's own segments would make it O(n log n) for long chains.
8. **B-FUZZ never draws `fromLevel = 0`** (`fc.constantFrom(1, 2, 3)`) and locks only chains (`{ role, entity }`), never
   a face, so held (2)'s fromLevel = 0 branch and held (1)'s face branch (with `neighbourSteiners`) are covered by the
   fixtures only.
9. **§13.1's "a `warp` with fromLevel = 1 over finished fabric gives 0 `E_KEPT`"** and the water-gate fixture (a generated
   and an edited gate) are not among the item's listed tests; the fixtures run every warp with `rederivesFrom` = 0 and
   cover `gate_end` holding with a knot fixture only. A warp batch opened at a later `rederivesFrom` over kept content is
   the caller's misuse (§3.6: a move batch's `rederivesFrom` is the first stage), so this is coverage, not a defect.

## Closing round (check/M0-a-13-close-r1, 2026-10-05) — new minor notes (none fails the item)

Mutant ids K01 – K23 are this round's (`checks/M0-a-13.md`, closing round); probes P2 and P3 ran in a scratch mirror
outside the tree (deleted afterwards).

10. **The held-vertex slide clamp is tested on one side only.** Mutant K10 (`warp.ts` `projected()`: `if (tw < t0) lo =
    Math.max(lo, tw)` → `Math.max(lo, 0)`, i.e. a held vertex *behind* the slider along its route is ignored) survives
    every test, B-FUZZ included. The item's code is right on the mirrored input: probe P2 (L0 shore (0, 2000)–(4000,
    2000), L1 way:1 foot at (2000, 2000), locked L1 way:2 foot at (1900, 2000), the foot dragged −90 cm) gives `slide
    1926,2000` (26 cm clear); under K10 it gives `slide 1925,2000`. Suggested handling: add P2 beside the fixture "a slide
    keeps attractCm from every held vertex on its fixed route". M4.
11. **held (5)'s closure is tested to one round only.** Mutant K15 (`held.ts` `frontier = next` → `frontier = []`, the
    closure stops after its first round) survives every test. The item's code is right on a two-round input: probe P3
    (L2 kerb (1000, 1000)–(2000, 1000), L3 plot line (1500, 1000)–(1500, 1500), L4 wall (1500, 1250)–(1700, 1250) locked,
    an L2 drag (0, 40)) holds the kerb's ends, `halvings` 0, nothing moves. Under K15 the kerb's ends are not held, the
    step halves 7 times on "held placement bound: (1500, 1000) …" (C-0197 (2)'s check catches it — no invalid arena is
    committed) and the report's held list differs. Suggested handling: add P3 as a fixture asserting the held list and
    `halvings` 0. M4.
12. **The tx doc comment is attributed by row, not by hash.** `tx/tx.ts` and `tx/state.ts` with C-0197's lines reverted
    hash to M0-a-06's landed sha256 exactly (4fb14c0d…, 22eec609…), so those two files changed only on the re-assigned
    lines. `tx/types.ts`'s original doc comment could not be reconstructed (the file grew 61 bytes, comment only by
    reading); `landed:verify --item M0-a-06` names the three files until the steward attributes them (C-0197 (1)).
    Suggested handling: the steward's commit names the three lines under build/M0-a-13-fix1. Session (this flow's commit).

## Consolidation round R10 (build/M0-a-13-consolidate-1, 2026-10-12) — the builder's map, diff and NO-SHIFT record

The round applies `docs/build/consolidation/kernel-plan.md` §1.9 W-1 – W-6, §1.12 S-1's warp copy, the warp sites of §1.0
N-3 and N-4, §2's comment rule and §3.4's T-warp-new-1 (choices C-0334). Probes and mutants ran only in the lane's mirror
(`scratchpad/waves/selfcheck-build-M0-a-13-consolidate-1/`), with the before-image of `src/warp/` kept beside it.

**Old → new map (J263 Q8).** No test file moved or was renamed; every describe/it title is kept (54 → 59 tests: five
added in `validate.test.ts`). The source:

| before | after |
|---|---|
| `validate.ts` `closerThan` (a private body) | `export { segmentCloserThan as closerThan } from '../num/exact.js'`; its two callers read `segmentCloserThan` (W-1) |
| `validate.ts` `MIN_EDGE = 25`; `warp.ts` `ATTRACT = 26` | `LATTICE.minEdgeCm`, `LATTICE.attractCm` (W-2) |
| `validate.ts`, `warp.ts` `HOT_PIXEL_SQ = HOT_PIXEL_CM * HOT_PIXEL_CM` | `insert/placement.ts`'s exported `HOT_PIXEL_SQ`, by path (W-2) |
| `view.ts` `BOX_RANGE = 16_777_216` | `num/exact.ts`'s `BOX_RANGE`; `padBox` stays in view.ts (W-2) |
| `warp.ts` `nearestLattice` (a body) | `export const nearestLattice = nearestLatticePoint` (placement.ts), doc comment kept (W-3) |
| `warp.ts` `placeOnRoute` | unchanged but its doc comment (W-4 not adopted, below) |
| `held.ts` `check` | kept; comment says why (W-5, J270 (a)) |
| `validate.ts`, `simplify.ts` `segmentsMeet` from `../insert/decimate.js` | from `../num/exact.js` (W-6) |
| `validate.ts` `ascents()`'s lambda `half` | `halfPlaneOf(d[0], d[1])` — the branch "M0-a-01 c2 landed" applied: `num/exact.ts` exports `halfPlaneOf` (C-0333) (W-S1) |
| `validate.ts` private `winding(px, py, xs, ys)` | `num/exact.ts` `windingNumber(ring, qx, qy)`; nestingProblem reads its rings as `RingPoint`s (N-3) |
| `held.ts` `insideRegion` (a body) | `region.length >= 3 && insideOrOnRing(region, x, y, 'evenOdd')`, the exported name kept (N-3's closed reading) |
| `simplify.ts` `PI = 3.141592653589793` | `num/exact.ts`'s `PI` (N-4) |
| `index.ts` "The scaffold created this index empty (M0-s-01, C-0013); it belongs to M0-a-13." | dropped; the description, the item id and C-0193 kept; the export block byte-identical |

**W-4: the diff (J263 Q2, N-c1-2, N-c2-2).** Both sequences were enumerated at every `placeOnRoute` call of the warp
fixtures (22 calls), B-FUZZ at 10⁴ (PLAT_FUZZ_SEED 20261012, the two found cases included; 7 237 calls), the invariants
fuzz's 100 warp steps (72 calls) and the invariants fixtures (2 calls): 7 333 calls, 501 854 candidates, 21 656 charges —
the sequence (set and order) and the charge count identical at every call. The two loops differ in one place: the
generator drops band points that fail test (i) before its caller charges them, placeOnRoute charges each and tests (i)
after. The band is computed from the rounded `mid ± half`, so its edge can hold a point (i) refuses. A search over
near-boundary offsets (|10 000·o² − 5 041·|u|²| ≤ 4, |u| ≤ 2·10⁴) found such inputs, and the kernel's own code confirms
one (a mirror probe, `placementCandidates` against a transcription of placeOnRoute's loop): the route (−8 300 000,
8 300 000)–(−8 295 221, 8 303 574) and the exact point (−8 295 502.8, 8 303 364.1) give 77 candidates against 76; the
extra point (−8 295 507, 8 303 361) (o = 4 237, o² = 17 952 169 > 0.71² · 35 612 317 = 17 952 168.9997) is charged at
rank 16 by placeOnRoute and skipped by the generator; the shared 76 come in the same order. A lawful input (inside
±2²³), so adopting the generator would shift `insert.placementCandidates` counts there: **W-4 is reported and kept**
(comment only), as N-c2-2 and J263 Q2 ask. Random routes (2·10⁶ routes, 1.7·10⁸ band points) found none, so the class
is rare and fail-safe either way (only a work count differs, never a placement).

**NO-SHIFT.** The same probe appended to the before-image's and the after-image's `warp.ts` logged every `warp()` call —
its MoveReport or result code, its work per counter and a fingerprint of the arena's vertex columns after the call — over
the warp folder, B-FUZZ at 10⁴ (seed 20261012), the invariants fuzz's warp steps and the invariants fixtures: 10 151
calls, every log byte-identical (bfuzz 10 002 lines sha256 33f9513f…, fixtures 40 6712fd00…, smooth 7 eefa1318…,
invariants fuzz 100 6f19199b…, invariants fixtures 2 b20bc7e4…). The new tests run against the before-image's sources:
57 of 59 green, the two red being the identity pins of the unification (`nearestLattice` is `nearestLatticePoint`,
`closerThan` is `segmentCloserThan`), so every other new pin holds behaviour the before-image already had.

**Refusals (J264, J290).** The item's families before = after: B-FUZZ warp 0 of 10 002 cases; invariants warp steps 0 of
100; the fixtures 2 E_WORK_LIMIT (`warp.halvings` under a caller-set work limit — LAWFUL input with a budget, REFUSE
typed and visible, the caller's budget is the alternative) and 1 programming-error throw (a fromLevel other than the
batch's level, a misuse of the door, not a geometric outcome). No lawful-input refusal.

**Mutant map** (each in the mirror, `--maxWorkers=1 --bail=1` over `test/warp/`, B-FUZZ at 10⁴; the file restored from
the tree and `cmp`-checked after each):

| mutant | what it re-introduces | red on |
|---|---|---|
| W1-copy | a private `closerThan` back, non-strict at r | validate.test.ts "closerThan and inTriangle on lattice points" |
| W2-attract / W2-minedge | `ATTRACT = 25` / `MIN_EDGE = 24` spelt locally | fixtures "… stops 26 cm short of it" / "control: … lands 25 cm from the foot" |
| W2-hotpixel (validate.ts) | `HOT_PIXEL_SQ = 0.7 * 0.7` spelt locally | the new "the placement bound is the hot pixel, 0.71 cm …" (it survived the folder before that pin) |
| W2-hotpixel-warp | the same in warp.ts | `test/num/equivalence.test.ts` "each site's constant equals its home's, or the site imports the name" |
| W2-boxrange | `BOX_RANGE = 2²³` spelt locally | the new constants pin (padBox clamps at ±2²⁴) |
| W3-K08 | M0-a-04's K08, the last on a tie, in placement.ts | T-warp-new-1 "the four tie classes …" (fixtures' "two re-seats whose rounded targets collide …" stays green under it: its targets are no ties) |
| W6-meet | a contact test missing touches and overlaps | B-FUZZ (warp) |
| WS1-half | a half-plane rule putting −x in the upper half | fixtures "a step of free moves and slides (the locked plot) …" |
| N3-winding | the after-winding read on the arena's points | the new "nesting: a free chain moved with the ring around it …" (it survived the folder before that pin) |
| N3-region | the closed reading by non-zero winding, no three-point floor | `test/num/equivalence.test.ts` N-3's ring sets |
| M01, M03, M04, K01, K09, K14, K19 (`checks/M0-a-13.md`) | order by slot; plain rounding; no end clamp; the moved journal removed; held vertices ignored by the slide clamp; no closure; seven halvings | each red on its original case (two re-seats …; control: … 25 cm; … 26 cm short; B-FUZZ; … locked way's foot …; an L2 drag over a locked L3 plot line …; the no-op after 8 halvings) |

K15 (the closure stops after one round) still survives, as note 11 records: unchanged by this round.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-r10-1 | **W-4's differing class.** `placeOnRoute` and `placementCandidates` differ only where the band's rounded edge holds a point test (i) refuses (the input above): the warp charges it, the generator skips it. Rare (none in 2·10⁶ random routes) and fail-safe (a work count, never a placement). | If the session wants one enumerator, placement.ts (M0-a-04's owns) grows an option that keeps (i) out of the generator (the nearest first, then the raw band), and the warp adopts it with a re-run of this diff; else nothing. | session (J263 Q2) |
| N-r10-2 | **K08 through warp's door is red on T-warp-new-1, not on the collision fixture.** With placement.ts's `nearestLatticePoint` mutated to "the last on a tie" (`d <= nd`), a run of `fixtures.test.ts` and `validate.test.ts` without `--bail` gives 2 red of 42: T-warp-new-1's two its ("the four tie classes …", "is placement.ts's nearestLatticePoint, and agrees with the oracle …"). The fixture "two re-seats whose rounded targets collide: the lower (y, x) is placed first" stays green: its targets (501.55, 501.55) and (519.35, 519.35) are no ties, so the brief's expectation that it goes red does not hold; T-warp-new-1 is the pin that holds the tie rule through warp's door. | The closing checker re-kills K08 on T-warp-new-1. | — |
| N-r10-3 | **A foreign red in RELATED.** `PLAT_FUZZ_RUNS=1000 vitest related` over the six changed warp files (332 files, 4 142 tests, W = 1, 8 140 s) has one red: testkit `test/edge/repins.test.ts` "EP-01/S8/zero-length at 2521534151: S8's seam-portals row refuses lawful input …" (expected `refused-lawful`, received `laddered` — the lawful input now succeeds). It is red with the before-image of `src/warp/` too (the lane's mirror), as M0-a-01's closing check of 2026-10-12 found: a stale pin of M0-x-06's, not this item's. | The session (M0-x-06's pin; replay with PLAT_FUZZ_SEED is not needed: the case is a named seed). | session |

## Closing check of R10 (check/M0-a-13-consolidate-close-1, 2026-10-12) — new minor notes (none fails the item)

The checker's own mutants (W1a – N3e, U-*) and probes ran in its mirror `scratchpad/waves/check-M0-a-13/` (verdict:
`checks/M0-a-13-c1.md`). Each row is a further hardening test or a judged equivalence; the code is right on every input
named (the NO-SHIFT logs byte-identical before and after, and the probes below).

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-r10c-1 | **warp's per-candidate charge is unpinned.** Mutant W4b (placeOnRoute's `chargeTx(t, INSERT_PLACEMENT_CANDIDATES, 1)` removed) survives test/warp at 10⁴ and test/num, test/invariants and testkit's constructive tests at 10³. The code's counts are right: the closing NO-SHIFT logs carry every warp call's per-counter work, byte-identical before and after (14 565 placeOnRoute calls, each call's charge logged). | Pin `insert.placementCandidates` on the §13.1 kerb fixture (the re-seat's charge count) and on a W_PLACED case. | M4 |
| N-r10c-2 | **nesting's before-side read is unpinned.** Mutant N3b (`windingNumber(pts1, x0, y0)`: the mover's before point read against the moved ring) survives the same set; the new pin kills only its twin N3a. Probe P-N3b (the square ring (1 000, 1 000)–(2 000, 2 000) and a free chain (1 100, 1 500)–(1 200, 1 500) all moved 800 cm east): the code gives null, the mutant `nesting: the vertex (1100, 1500) moved to (1900, 1500) changes its side …`. | Add P-N3b beside validate.test.ts's "nesting: a free chain moved with the ring around it …". | M4 |
| N-r10c-3 | **warp's own test (i) threshold is unpinned.** Mutant W2c (placeOnRoute's `o * o > HOT_PIXEL_SQ * len2` read at 0.75²) survives. Only N-r10-1's rounded-edge class reaches it (the nearest of four lies ≤ 0.707 cm from the exact point, which is on the line), and it fails safe: `placementBoundProblem` re-reads 0.71² and the step halves. | A placeOnRoute pin on N-r10-1's input (77 candidates, the rank-16 point refused by (i)). | M4 |
| N-r10c-4 | **The band's tie-break among equidistant candidates is unpinned** (mutant W4a, `a.x − b.x` before `a.y − b.y`, survives), as round 1's M34 was. | A slide whose exact point lies on a lattice line midway between two band points. | M4 |
| N-r10c-5 | **Survivors judged equivalent** (no test needed). W4c (`tq < 0 \|\| tq > len2`): a route end is an occupied lattice point (vertexProblem's one-vertex-per-point), and any other point with its projection at an end lies ≥ 1 cm from the line, beyond test (i). WS1a (ascents' half-plane read on (y, x)): the count of descents of a cyclic direction sequence is its total turning ÷ 360°, independent of where the order is cut — 300 000 random direction sets, 0 differences. W6a (validate.ts's contact test reduced to proper crossings): a touch or overlap puts a vertex at distance 0 from the other segment, which the clearance rows refuse first, or, for a one-ring vertex, the shared-end overlap test. W6b (the same in simplify.ts): a touch puts a vertex on the new segment, on the closed triangle it cuts off, which the triangle test refuses (PLAUSIBLE). | None. | — |
| N-r10c-6 | **K08 through warp's door is red on T-warp-new-1 only**, as N-r10-2 says: in the checker's run the two T-warp-new-1 its fail and "two re-seats whose rounded targets collide …" stays green (no tie among its targets). The warp's own rounding in `attempt()` reads `nearestLattice`, but no fixture rounds a tie there. | A warp fixture whose re-seat target is exactly x.5 (a tie), asserting the y-then-x pick. | M4 |
| N-r10c-7 | **bfuzz.test.ts's found-case comments keep fast-check seed tokens** (137587846, −17487670) and a dated measurement ("measured 2026-10-05, CONTENDED") at lines 136–155. They are replay records, not round narration. §2 of the plan puts seeds in checks/*.md, and validate.ts's copies were rewritten. | Optional: move the seeds to this file and keep the shrunk inputs. | session |
| N-r10c-8 | **HOT_PIXEL_SQ's home.** C-0314 (4) names `index/items.ts` (R5) as its home. The warp imports placement.ts's export, as the R10 brief says; it is one value and one expression. | When R5 moves it, placement.ts keeps re-exporting the name so the warp's import by path stays valid. | session (R5) |

## Hardening round S1 (build/M0-a-13-fix-s1, 2026-10-14) — the builder's outcomes, mutants, NO-SHIFT and census

The round takes the FIX-NOW rows `checks/hardening-inventory.md` assigns this item (§3 item 15: notes 1 – 5, 8 – 11,
N-r10c-1 – 3, N-r10c-6; N-r10c-4 rides with note 5 as its DUPLICATE) and closes each with a pin (choices C-0364). Every
probe of the notes gives the designed result on the code, so no output moves. Mutants ran one at a time in the lane's
mirror (`scratchpad/waves/selfcheck-build-M0-a-13-fix-s1/`), each as `vitest run --maxWorkers=1 --bail=1` over
`test/warp/` (B-FUZZ at 10⁴) and once more without `--bail` over the four fixture files (B-FUZZ alone for H1face, H2zero,
H2gate), the file restored from the tree and `cmp`-checked after each. Every new test is green on the code.

| row | outcome | pin (test) | mutant: the fault it re-introduces → red on |
|---|---|---|---|
| 1 (M12, M14) | pinned | fixtures 'the rotation alone: two ends of a junction swung past each other, their paths crossing no unmoved edge, halve on the rotation'; 'the mover path alone: a free chain carried whole over an unmoved edge, no ring but its own, halves on the path'; validate 'the mover path: a chain carried whole over an unmoved edge fails though no other check of the step sees it' | M14 (`rotationKept` loop off) → 'the rotation alone' only; M12 (path check off) → 'the mover path alone' and validate's 'the mover path' only |
| 2 (M20) | pinned | fixtures '§3.10's placement bound at the step: … the re-seat reads the sliding end at its rounded target, the end steps aside, the bound fails and the step halves once' (lastFailure `placement bound: (2045, 1496) …`) | M20 (`placementBoundProblem` call → null) → that test only |
| 3 (M22) | pinned | the region fixture's brush 800 → 1 600 cm, with each outside way vertex's field asserted non-zero and the vertex kept; new 'a finer vertex outside the region, on a run a region vertex ends, is re-seated with no field of its own' (`reseat 1500,1100->1537,1098`) | M22 (every candidate displaced, the region gate off) → the new test only; M22b (`regionVertices` reads its box padded 10 m, unfiltered) → 11 fixtures, the widened one among them |
| 4 (M29) | pinned | smooth 'one pass at the weight ½: each interior vertex half-way to its neighbours' mean (C-0193 (6))' (y = 1 150 at ½, 1 225 / 1 075 at ¼) | M29 (+3 cm on every x displacement), M29b (`SMOOTH_WEIGHT` 1) → that test only |
| 5 (M34, M35; N-r10c-4 W4a) | pinned (the floor: reported unreachable on distinct points, pinned where reachable) | simplify 'two removable vertices of equal effective area: the lower input index goes first'; 'a ring keeps three vertices: a ring of three with a repeated point comes back whole'; validate 'the band's ties: equidistant points come y, then x' | M34 (`<` → `<=`) → the tie test only; M35 (the ring floor removed) → the ring test only (the mutant throws `Cannot read properties of undefined`); W4a (band sort x before y) → 'the band's ties' only |
| 8 | pinned | B-FUZZ widened: fromLevel drawn 0 – 3; lock none / a way / an L1 block (owned first, `locked:1`, when unowned); an L1 chain whose first vertex carries `deck_end` or `gate_end`, the brush centred on it; the held set read independently (a locked block's route vertices ⊆ held; a crossing end in the region held unless fromLevel = 0; held = [] at fromLevel 0 with nothing locked); the run asserts each branch reached | H1face (a locked face's own rings not held) → B-FUZZ (counterexample: fromLevel 0, a block lock) — the fixtures stay green, their locked faces' corners held through nested L4 faces; H2zero (`fromLevel !== 0` dropped) → B-FUZZ (fromLevel 0, a `deck_end`) and the old deck_end fixture; H2gate (`gate_end` dropped from rule (2)) → B-FUZZ (fromLevel 1, a `gate_end`), the old knot fixture and the new water-gate fixture |
| 9 | pinned | fixtures '§13.1: a warp with fromLevel = 1 over a generated and an edited water gate moves neither gate's bank vertices' (held: the generated gate's L1 banks and their shore runs' ends; the edited gate's L0 banks unmoved as level < fromLevel); '§13.1: a warp with fromLevel = 1 over finished fabric gives no E_KEPT — a move batch keeps nothing (J-K27)' (block, cell, plot owned at S4; the control insertion at rederivesFrom S8 refuses E_KEPT; the warp commits at the first stage and at S8 alike) | H2gate → the water-gate test; Kkept (warp refuses E_KEPT when a finer owned face is ranked below `keptBelow`) → the finished-fabric test only |
| 10 (K10) | pinned | fixtures 'the held vertex behind the slide: … stops 26 cm short of it' (probe P2: `slide 1926,2000`) | K10 (`lo = Math.max(lo, 0)`) → that test only |
| 11 (K15) | pinned | fixtures 'two rounds: a locked L4 wall ending on the L3 plot line holds the plot line's ends, then the kerb's; nothing moves, no halving' (probe P3: six held, halvings 0, lastFailure '') | K15 (`frontier = []`) → that test only |
| N-r10c-1 (W4b) | pinned | fixtures describe 'the placement rule's work: every candidate charged to insert.placementCandidates (N-r10c-1)': a slide whose nearest qualifies 1; the §13.1 kerb's re-seat (W_PLACED at (1 517, 1 004)) 2; a slide beside an unlocked foot (W_PLACED at (2 075, 2 000)) 30 — the batch's per-counter work read through `openTx(o).work.counts` | W4b (the charge 1 → 0) → the three tests only |
| N-r10c-2 (N3b) | pinned | validate 'nesting: a free chain moved with its ring keeps its side though its old point lies outside the moved ring (P-N3b)' | N3b (the old point read against the moved ring) → that test only |
| N-r10c-3 (W2c) | pinned | validate 'N-r10-1's input: 77 candidates; test (i) refuses the nearest (P off the line) and the band's 16th, (−8 295 507, 8 303 361)' and 'test (i): strictly between the ends, within 0.71 cm of the line — exact at the boundary' | W2c (`onRoutePixel` at 0.75²) → those two tests |
| N-r10c-6 | pinned | fixtures 'a re-seat whose target is x.5 rounds to the lower x, and the re-seat placed before it reads that point' (`reseat 1530,1000->1525,1000`, W_PLACED at (1 500, 1 000)) | K08 (placement.ts's nearest, the last on a tie) → this test, T-warp-new-1's two and 'the band's ties'; Watt (attempt()'s rounded target by `Math.round`, ties up) → this test only |

21 targeted mutants, 21 red, each on its row's new test and green with the file restored.

**The refactor (the one code change).** N-r10c-3's and N-r10c-4's pins need placeOnRoute's test (i) and band order, which
were closures inside it. They are now warp.ts's module-level `onRoutePixel(ax, ay, bx, by, qx, qy)` (strictly between
the ends, `o² ≤ HOT_PIXEL_SQ · len²`) and `hotPixelCandidates(ax, ay, bx, by, px, py, near)` (the band's points within
`attractCm`, `near` left out — the old `tried` set held only it — nearest first, ties y then x); placeOnRoute charges
each candidate, then tests (i), then `vertexProblem`, in the old order. `warp/index.ts` and the barrel are unchanged.

**NO-SHIFT.** The same probe was appended to the before-image's (`scratchpad/session-fix/a13-before/`) and this round's
warp.ts in the mirror: every `warp()` call's result (report or refusal), its per-counter work and a sha1 of the arena's
vertex columns; every placeOnRoute call's vertex, route, exact point, result and the batch's placement-candidate count.
Run per file at PLAT_FUZZ_SEED 20261014 over the before-image's tests (set A: fixtures, smooth, validate, B-FUZZ old) and
this round's (set B: fixtures, smooth, B-FUZZ widened): 20 111 warp calls and 13 756 placeOnRoute calls, every log
byte-identical before/after — A fixtures 269816221e5d…, A smooth c57ee2ec7bbe…, A bfuzz f45fd16141f8… (10 002 calls),
B fixtures e4035917dbe1…, B smooth 6eef24849a08…, B bfuzz 0a5bdc213f1c… (10 002 calls). This round's fixtures, smooth
and B-FUZZ files pass on the before-image's sources (44/44, 5/5, 3/3); validate.test.ts's new describe reads the two new
functions, so it does not load there.

**Refusals (J264, J290), the item's families before → after.** B-FUZZ (the old generator) 0 of 10 002 on both images;
the widened B-FUZZ 0 of 10 002 (seed 20261014: 2 528 fromLevel-0 cases, 2 464 block locks, 926 crossing ends of which
528 held by rule (2), 7 323 committed, 239 after halving, 0 no-ops); the fixtures 2 E_WORK_LIMIT (`warp.halvings` under a
caller-set work limit — LAWFUL with a budget, REFUSE typed and visible, the caller's budget is the alternative) and the
fromLevel misuse throw (a programming error), the same on both images. No lawful-input refusal; the census does not rise.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s1-1 | **The ring floor is a guard for repeated points only.** On rings of distinct points simplify's fold test refuses the removal that would leave two (2 518 861 random rings of 3 – 6 distinct points: the floor never decides); on a ring with a repeated point (`(150, 200), (300, 150), (300, 150)`) it does, and without it the removal loop throws. Such a ring is degenerate input simplify accepts (≥ 2 distinct points). | None now (pinned). A hardening pass may refuse or de-duplicate repeated consecutive ring points before simplifying (a REPAIR by J290's rule). | hardening |
| N-s1-2 | **held.ts's comment cites C-0334** for `check` — the id C-0338 carried before the session's renumbering. warp.ts's and validate.test.ts's citations of C-0338 (4) were corrected in this round; held.ts was not otherwise touched. | Comment only, at the next round that edits held.ts. | — |

## Closing check of S1 (check/M0-a-13-close-s1, 2026-10-14) — new minor notes (none fails the item)

The checker's own 30 targeted mutants and probes ran in its mirror `scratchpad/waves/check-M0-a-13/` (verdict:
`checks/M0-a-13-s1.md`); every row's pin was re-killed there. The three survivors below sit on behaviour this round did
not change (the before-image gives the same results), and the code is right on each input named.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s1c-1 | **placeOnRoute's charge before test (i) is unpinned.** Mutant W4e (tryOne tests `onRoutePixel` first, then charges) survives `test/warp/` at 10⁴: every pinned count (1, 2, 30) comes from candidates that all pass (i). C-0338 (4) keeps the loop because it charges an (i)-refused point. Probe: shore (0, 2 000)–(4 000, 2 000), way:1 foot (2 000, 2 000) dragged −1 990 cm (P clamped to (26, 2 000)), an unlocked L1 way:2 foot at (40, 2 000) outside the region. At full strength every candidate fails; the band holds the route's end (0, 2 000), which (i) refuses. The code charges it: `insert.placementCandidates` 54, `warp.halvings` 1, then `slide 1005,2000`. Under W4e the count is 53. | Add the probe as a fixture that pins 54 (it pins N-r10-1's class through the warp's door). | M4 |
| N-s1c-2 | **The attractCm boundary of the band is unpinned.** Mutant R2attr (`hotPixelCandidates`: `d > ATTRACT_SQ` → `d >= ATTRACT_SQ`, a point exactly 26 cm from P dropped) survives. The code keeps the point, like placement.ts's `placementCandidates` (`d > reach2`). No fixture places a slide or re-seat on a point exactly attractCm away. | A fixture whose qualifying point is the first one exactly 26 cm from P. | M4 |
| N-s1c-3 | **Test (i)'s `<=` at the hot-pixel boundary.** Mutant R4le (`o * o < HOT_PIXEL_SQ * len2`) survives. On the lattice, exact equality o² = 0.71² · len² needs o = 71m and len = 100m. A route of length 100m has both components divisible by 2^(2+v₂(m)), so o is too, while 71m is divisible only by 2^(v₂(m)): impossible. Only float rounding of `HOT_PIXEL_SQ * len2` can tie, and only for len² beyond about 2³⁸, so the mutant is equivalent below that size. The title "exact at the boundary" of validate.test.ts's 'test (i)' claims more than its asserts (705 and 712). | Optional: retitle, or pin a float-tie input if one is found. placementBoundProblem uses the matching `>`. | M4 |

## Hardening round S2 (build/M0-a-13-fix-s2, 2026-11-10) — the builder's outcomes, mutants and census

The round takes the two rows the second re-triage left open on this item (N-s1c-1, N-s1c-2; leg 2 of a merged round
after M0-a-04 S6, J443, J733) and closes each with a pin (choices C-0487). Both are pins only: no source file changes,
no output moves, no export changes (`warp/index.ts` and the barrel untouched). Both probes give the designed result on
the code, which is right on each input: the charge comes before test (i) (C-0338 (4)), and the band keeps a point
exactly `attractCm` from P (`d > ATTRACT_SQ`, like placement.ts's `placementCandidates`' `d > reach2`). The mutants ran
one at a time in the lane's mirror `/home/user/maps-scratch/waves/selfcheck-build-M0-a-13-fix-s2/plat` (built by
`cp -a`; no link out of it, every `@plat/*` link resolving inside it), each as `vitest run --maxWorkers=1 --bail=1
packages/kernel/test/warp/` (B-FUZZ at 10⁴ included), the mutated file restored from the tree and `cmp`-checked after
each; the mirror was deleted after.

| row | outcome | pin (test, `test/warp/fixtures.test.ts`) | mutant: the fault it re-introduces → red on |
|---|---|---|---|
| N-s1c-1 (W4e) | pinned | 'a point test (i) refuses is charged before it is tested: the shore's end in the band of a slide clamped beside it (N-s1c-1)' in the describe 'the placement rule's work …' — the checker's probe as a case (`clampedSlideArena(40)`: shore (0, 2 000)–(4 000, 2 000), way:1's junction (2 000, 2 000) dragged −1 990 cm, clamped to P = (26, 2 000), an unlocked L1 way:2 foot at (40, 2 000) outside the region): counts `{ insert.placementCandidates: 54, warp.halvings: 1 }`, no warning, `slide 1005,2000` after one halving, healthy; plus `onRoutePixel` refusing (0, 2 000) and the band holding 52 points | W4e (`tryOne` tests `onRoutePixel` first, then charges) → that test only (the folder with `--bail`: 1 failed, 47 passed; `insert.placementCandidates` 54 → 53) |
| N-s1c-2 (R2attr) | pinned | new describe 'the placement rule's band reaches attractCm inclusive: a slide seated on the one point exactly 26 cm from P (N-s1c-2)' — `clampedSlideArena(27)`, the same drag: every point 1 … 51 lies within minEdge of the shore's end or of the foot at (27, 2 000), (0, 2 000) fails (i), so the slide seats at (52, 2 000), 25 cm from the foot and exactly 26 cm from P (the band's last point): `W_PLACED 52,2000`, 53 candidates, no halving, `slide 52,2000`, the foot unmoved, healthy; plus the band's last two points (0, 2 000), (52, 2 000) | R2attr (`d > ATTRACT_SQ` → `d >= ATTRACT_SQ`) → this test (the band's ends (1, 2 000), (51, 2 000); with that direct assert removed in the mirror, still red through the warp's door: no `W_PLACED 52,2000`) and N-s1c-1's band length (52 → 50) |

2 targeted mutants, 2 red on their rows' new tests; the tree (the code unchanged) green: fixtures 46/46, `test/warp/`
81/81 at full strength.

**Refusals (J264, J290), the item's families before → after.** No source file changed, so the census is the same by
construction; measured: B-FUZZ 0 of 10⁴ plus its two found cases (every case asserts `r.ok`; seed 1300328005, the NEAR
run), unchanged from S1's 0 of 10 002; the fixtures' refusals are S1's (two E_WORK_LIMIT under a caller-set work limit —
LAWFUL with a budget, REFUSE typed and visible, the caller's budget the alternative — and the fromLevel misuse throw, a
programming error): the two new cases commit and add none. No lawful-input refusal; the census does not rise.

**Gates (J193, W = 1).** `install --frozen-lockfile` 0; `lint` 0 (eslint 1 283 files, 0 errors; `lint: probe-red ok`;
9 whole-tree checks); `build` 0; NEAR `vitest run packages/kernel/test/warp/` at full strength (B-FUZZ at 10⁴, seed
1300328005) 5 files 81/81; RELATED `PLAT_FUZZ_RUNS=1000 vitest related --run` over `packages/kernel/src/warp/warp.ts`
(the file the pins hold; unchanged this round) 386 files 5 103/5 103, exit 0 (seed 140048441, 8 833 s).

## Closing check of S2 (check/M0-a-13-close-s2, 2026-11-10) — new minor notes (none fails the item)

The checker's own 13 targeted mutants ran in its mirror `/home/user/maps-scratch/waves/check-M0-a-13/s2/mirror` (deleted
after; verdict: `checks/M0-a-13-s2.md`): all 13 red on the round's two pins, the two note mutants W4e and R2attr also
with the pins' direct helper asserts deleted (red through the warp's door alone), and both green again on the base's
`fixtures.test.ts` (the before-image: the pins are what kill them). Two rows, neither on a fault of the code.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s2c-1 | **The builder's table understates W4e's reach.** "W4e → that test only" was read under `--bail=1`. Without it W4e turns both new cases red: N-s1c-1's count 54 → 53 and N-s1c-2's 53 → 52 (its 53 also counts the (i)-refused end (0, 2 000), tried before (52, 2 000) by the tie order y, then x). The same holds for the checker's W4f, W4nocharge and W4late. The pins are stronger than the table says; nothing is wrong. | None; a record for whoever reads the table. | — |
| N-s2c-2 | **Both pins sit on one geometry.** The (i)-refused charge and the `attractCm` boundary are pinned on a slide along an axis-aligned shore, the boundary point on the route's axis (d² = 26² as 26² + 0²). A re-seat, a steep route (the band's other branch of `shallow`) and an off-axis boundary point (10² + 24² = 26² on a sloped route) run the same lines of `placeOnRoute` and `hotPixelCandidates`, so every mutant of those lines tried dies; a mutant that tells the branches apart would have to be written on purpose. | Optional: one sloped-route case with an off-axis point exactly 26 cm from P. | M4 |

## Hardening round S3 (build/M0-a-13-fix-s3, 2026-11-12) — the builder's outcomes, mutants and census

The round takes queue row Q179 (b) (J764): the S2 closing check's note N-s2c-2 (leg 2 of the merged round M0-a-04 S7 →
M0-a-13 S3 → M0-c-01 S6, J443) and closes it with a pin (choices C-0514). A pin only: no source file changes, no output
moves, no export changes (`warp/index.ts` and the barrel untouched). N-s2c-1 is a record (the builder's table of S2
understated W4e's reach) and needs nothing; this round's table reads every pin without `--bail` for that reason. The
probe gives the designed result on the code: on a steep route the band's rows of y keep the off-axis point exactly
`attractCm` from P and drop its neighbour beyond. The mutants ran one at a time in the lane's mirror
`/home/user/maps-scratch/waves/selfcheck-build-M0-a-13-fix-s3/plat` (built by `cp -a`; no link out of it, the `@plat/kernel`
link resolving inside it), each as `vitest run --maxWorkers=1 --bail=1 packages/kernel/test/warp/` (B-FUZZ at 10⁴
included) from the mirror's `plat/` and, without `--bail`, the three band pins (`-t "N-s1c|N-s2c"`); the mutated file
restored from the tree and `cmp`-checked after each; the mirror deleted after (logs kept in
`/home/user/maps-scratch/waves/build-M0-a-13-fix-s3/mutlogs`).

| row | outcome | pin (test, `test/warp/fixtures.test.ts`) | mutant: the fault it re-introduces → red on |
|---|---|---|---|
| N-s2c-2 (Q179 (b)) | pinned | new describe 'the band reaches attractCm inclusive on a steep sloped route: an off-axis point exactly 26 cm from P (N-s2c-2)' — `steepShoreArena()`: the L0 shore (1 000, 1 100)–(2 000, 3 500), along (5, 12) · 200 (steep: \|Δx\| 1 000 < \|Δy\| 2 400, the band's rows-of-y branch; the end's x ≠ y), way:1's junction (1 500, 2 300) dragged (−1 000, −2 400), clamped 26 cm from the shore's end to P = (1 010, 1 124); an unlocked L1 way:2 foot at (1 010, 1 125), 0.38 cm off the line, outside the region. The band holds 76 points, its last two (1 000, 1 100) (the route's end, (i)-refused) and (1 020, 1 148) — both 10² + 24² = 26² from P, ties y then x — and no point of rows 1 149, 1 098, 1 099 ((1 020, 1 149) is 10² + 25²); every nearer point fails minEdge to the end or the foot ((1 020, 1 147), 25.08 cm from P, is 24.17 from the foot), so the slide seats on (1 020, 1 148): `W_PLACED 1020,1148`, `insert.placementCandidates` 77 (the nearest + 76), no halving, `slide 1020,1148`, the foot unmoved, healthy | **R2attr** (`d > ATTRACT_SQ` → `d >= ATTRACT_SQ`) → red on the new case (band 76 → 74) and on both S2 pins; with the new case's direct band asserts removed, still red through the warp's door (no `W_PLACED 1020,1148`). **Be0** (the steep branch's `e0` reads `px`: `shallow ? px : px`) → red on the new case only (band 0 points); S2's two cases green. **Bab** (the steep branch's `a0`, `b0` read the shallow branch's axes: `ax`, `ay`) → red on the new case only; S2's green. (A first fixture with the shore's end at (1 000, 1 000) let Bab survive — x = y there makes the swap equivalent — so the arena was moved to (1 000, 1 100).) **Bq** (the steep branch's `qx`, `qy` swapped: `shallow ? i : i`, `shallow ? j : j`) → red on the new case only; S2's green. **Binv** (`shallow` inverted: `\|ux\| < \|uy\|`) → red on both S2 cases (a horizontal route then divides by `along` = 0: no band), **green on the new case**: an equivalent on a sloped route, since the column band of the other branch with half-width `HOT_PIXEL_CM · len / \|along\|` holds the same hot-pixel points; S2's cases kill it. Be0, Bab, Bq also red through the warp's door alone (no `W_PLACED 1020,1148`). **W4e** (S2's, charge after (i)) → red on all three pins (77 → 76 here). |

6 targeted mutants: 5 red on the new case (R2attr, Be0, Bab, Bq, W4e), the sixth (Binv) an equivalent there, red on
round S2's cases; the branch-telling mutants Be0, Bab and Bq leave round S2's cases green — the new case is the only
one that sees them. The tree (the code unchanged) green: `test/warp/` 82/82 at full strength.

**Refusals (J264, J290), the item's families before → after.** No source file changed, so the census is the same by
construction; measured: B-FUZZ 0 of 10⁴ plus its two found cases (every case asserts `r.ok`; seed −187401529, the NEAR
run), unchanged from S2's 0 of 10⁴; the fixtures' refusals are S1's (two E_WORK_LIMIT under a caller-set work limit —
LAWFUL with a budget, REFUSE typed and visible, the caller's budget the alternative — and the fromLevel misuse throw, a
programming error): the new case commits and adds none. No lawful-input refusal; the census does not rise (0 → 0).

**Gates (J193, W = 1).** `install --frozen-lockfile` 0; `lint` 0 (eslint 1 311 files, 0 errors, 0 warnings; `lint:
probe-red ok`; 9 whole-tree checks); `build` 0; NEAR `vitest run packages/kernel/test/warp/` at full strength (B-FUZZ at
10⁴, seed −187401529) 5 files 82/82, exit 0; RELATED `PLAT_FUZZ_RUNS=1000 vitest related --run --maxWorkers=1` over
`packages/kernel/src/warp/warp.ts` (the file the pins hold; unchanged this round) 402 files (401 passed, 1 failed),
5 302 tests (5 301 passed, 1 failed), exit 1 (seed −935875887, 13 964 s; log
`/home/user/maps-scratch/waves/build-M0-a-13-fix-s3/chain/related.log`). The one red is the head's declared foreign
canary, not the item's (no test of `test/warp/` fails and no source of the item changed): `bench/test/site/summary.test.ts`
'the canary CITY record re-derived on this tree is the run's …' (J772 (7)) — relief-60 coarse seed 46's record digest
`4c9647bf…665ac05d`, the summary's `eb2046dd…b6b0e2b0`; a note for the session with seed −935875887. Q152's six bands
tests, the J176 reference-machine tests and Q153's dilation flake did not fail in this run (or were not reached).

## Closing check of S3 (check/M0-a-13-close-s3, 2026-11-12) — new minor notes (none fails the item)

The checker's own mutants ran in its mirror `/home/user/maps-scratch/waves/check-M0-a-13/s3/mirror` (verdict:
`checks/M0-a-13-s3.md`), one at a time on `test/warp/fixtures.test.ts` without `--bail`, each restored and `cmp`-checked.
On the round's pin (N-s2c-2): R2attr, R2lo, R2hi (the neighbour kept), the loop's two ends, the half-width, the tie
order, W4e, W4nocharge, the `W_PLACED` warning and the five axis swaps of the steep branch (`e0`; `a0`; `b0`; `qx`/`qy`;
`along`/`across`) are all red on the new case; the five swaps, R2hi and the tie order are green on round S2's two cases
and on the base's `fixtures.test.ts` (the before-image), so the new case is the only one that sees them. R2attr, the
`e0`, `a0`+`b0` and `qx`/`qy` swaps, the tie order and W4e are still red with the case's six direct helper lines deleted
(through the warp's door alone). Two rows, neither on a fault of the code.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s3c-1 | **The steep branch's SELECTION is pinned on a horizontal route only; on a vertical route nothing holds it.** The two branches of `shallow` in `hotPixelCandidates` describe ONE strip (perpendicular distance ≤ `HOT_PIXEL_CM`), so on every sloped route they return the same list: the checker's differential probe (a copy of lines 96 – 122 with the test made a parameter, proved equal to the real function first) over 185 015 random sloped routes — any slope, near-diagonal, 1 : 4 000, short — found 0 differences for the test inverted, forced true and forced false. So no sloped case can tell which branch ran; the new case pins the steep branch's AXES (the five swaps die on it only), not the need for the branch. The need shows on an axis-aligned route, where the other branch divides by `along` = 0 and returns null (no band; the step halves — it fails safely). Horizontal: round S2's cases kill the test inverted and forced false. Vertical: the mutant `const shallow = true` (the steep branch never taken) **survives the item's whole NEAR folder at full strength** — 5 files, 82/82, B-FUZZ at 10⁴, seed −807604782. It is not an equivalent: the checker's probe case (round S2's N-s1c-2 fixture turned a quarter — shore (2 000, 0)–(2 000, 4 000), way:1's junction (2 000, 2 000) dragged (0, −1 990) over `clampRegion`, an unlocked foot at (2 000, 27)) gives on the code `W_PLACED 2000,52`, 53 candidates, no halving, `slide 2000,52`, and is red under that mutant (`expected [] to deeply equal [ 'W_PLACED 2000,52' ]`) and under the test inverted. The row N-s2c-2 asked a SLOPED route and its telling mutant "inverted OR the other branch's axis swapped": delivered (the swaps). This is the remainder, outside what that row stated. | One pin, tests only: the probe case above as a case of `fixtures.test.ts` (the values are measured on the code), red under `shallow = true`. Small enough to ride as a leg of the next merged kernel round. | M4, or M0-a-13's next touch |
| N-s3c-2 | **The neighbour "just beyond" is held by the case's direct band asserts only.** With the band keeping d ≤ 725 (`d > ATTRACT_SQ + 49`: (1 020, 1 149) and (1 000, 1 099) kept) the case is red on `band.length` (78 for 76) and on the `q.y === 1149` line; with the six direct helper lines deleted the same mutant is green through `warp`, because the kept boundary point (1 020, 1 148) sorts before its neighbour and qualifies first. That is inherent to a fixture whose boundary point qualifies (round S2's N-s1c-2 case reads its band's tail the same way); nothing is wrong. | None; a record for whoever reads the mutant table. | — |
