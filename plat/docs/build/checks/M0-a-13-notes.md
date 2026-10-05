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
