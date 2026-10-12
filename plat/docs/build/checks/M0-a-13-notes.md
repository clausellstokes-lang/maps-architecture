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
