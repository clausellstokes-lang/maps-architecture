# M0-a-01 — notes (not failing lines)

## Consolidation round R1 (lane `build/M0-a-01-consolidate-1`, flow-7, 2026-10-11)

The round applies findings N-1 – N-4 of `plat/docs/build/consolidation/kernel-plan.md` §1.0 (J260, J263). It creates
the one shared exact-predicate module `packages/kernel/src/num/exact.ts`, with its tests under `test/num/`. The later
rounds R2 – R13 import it by path. No caller changed in this round, and nothing was added to `num/index.ts` or the barrel
(J263 Q1). The row is C-0314.

### Old file → new file map (J263 Q8)

| old file | new file | what moved |
|---|---|---|
| `test/num/{area2,bfuzz,direction,frame,incircle,orient,orient2d,ratio,result,snap}.test.ts`, `test/num/support.ts` | the same files, byte-unchanged | nothing: every `describe`/`it` title stands, so the earlier rounds' mutants (checks/M0-a-01.md r0 – r2) keep their killing cases |
| `test/types/types.test.ts` | the same file, byte-unchanged | nothing |
| — | `test/num/exact.test.ts` (new) | exact.ts's own pins against BigInt references: the closed-segment distance, the shared point, the ray crossing at its rational intercept; the three boundary readings; the constants; "imported by path, never re-exported" |
| — | `test/num/equivalence.test.ts` (new) | exact.ts ≡ every copy of the table below: exhaustive small windows, the fuzz arenas (tx's B-FUZZ batch generator, insertion-heavy mixes), the copies' own pinned inputs, fast-check properties at PLAT_FUZZ_RUNS |
| — | `test/num/copies.ts` (new) | the copy table: each site, its reading and its call; private copies read from the module's source with the TypeScript compiler and evaluated with the real `orient2d` / `ratio` |
| `src/num/{index,frame,predicates,snap}.ts`, `src/types/index.ts` | the same files, comments only | the comment rewrite of §2: review-record tokens (COV-VG-VN-156, GEO-7, GEO-32) replaced by the design sections they stand for; the scaffold's provenance sentence in `types/index.ts` dropped; `num/index.ts` names exact.ts as imported by path. The emitted JavaScript of each file with comments removed is identical before and after (CONFIRMED, `ts.transpileModule` with `removeComments`) |

### The copy table (every caller → its reading in exact.ts)

When a later round deletes a copy, `equivalence.test.ts` stops comparing it. It then requires the module to import the
shared name (the ratchet in `copies.ts`'s `importsShared`).

| finding | site (file: symbol) | exported? | reading / convention | exact.ts |
|---|---|---|---|---|
| N-1 | `insert/placement.ts: segmentCloserThan` | file | strict `<` at r, inclusive ends (dot ≤ 0 → a, dot ≥ \|ab\|² → b), one-point segment → a | `segmentCloserThan` |
| N-1 | `tx/tx.ts: closer` | private | same | `segmentCloserThan` |
| N-1 | `warp/validate.ts: closerThan` | file (test imports it) | same; view coordinates (integer doubles) | `segmentCloserThan` (keep `export { segmentCloserThan as closerThan }`) |
| N-1 | `invariants/common.ts: compareDist2` | — | a BigInt three-way compare with num/den, another function | not merged |
| N-2 | `insert/decimate.ts: segmentsMeet` | file | closed segments, proper crossing or an end on the other | `segmentsMeet` |
| N-2 | `faces/common.ts: segmentsTouch` | file | same (sign products, an `onSegment` that re-tests orient) | `segmentsMeet` |
| N-2 | `invariants/common.ts: segmentsMeet` | file | same (sign products) | `segmentsMeet` |
| N-2 | `medial/axis.ts: segmentsMeet` | private | same; called with arc ends that are doubles, so the same arithmetic gives the same answer | `segmentsMeet` |
| N-2 | `skeleton/prepare.ts: segmentsMeet(a, b, c, d)` | file | same, point-typed (`Math.sign`) | an adapter over `segmentsMeet` (S-1, R13) |
| N-3 | `index/query.ts: insideRing` | private | open (off the rings only), even–odd, lattice; VertexId ring | `insideLatticeRing` |
| N-3 | `skeleton/prepare.ts: insideRing` | file | open, even–odd, lattice; points | `insideLatticeRing` |
| N-3 | `faces/common.ts: insideRing` | file | open, even–odd, doubled; HalfEdgeId ring (`O[h]`, `O[h ^ 1]`) | `insideDoubledRing` (arena adapter, R4) |
| N-3 | `insert/rewalk.ts: insideRing` | private | open, even–odd, doubled; HalfEdgeId ring (`O[ring[i]]`, `O[ring[i + 1]]`) | `insideDoubledRing` (arena adapter, R4) |
| N-3 | `insert/snapRound.ts: insideDoubled` | private | open, even–odd, doubled; VertexId ring | `insideDoubledRing` (arena adapter, R4) |
| N-3 | `tx/relevel.ts: insidePoints` | private | open, even–odd, doubled; points | `insideDoubledRing` |
| N-3 | `warp/held.ts: insideRegion` | `warp/index.ts` | closed (on the boundary inside), even–odd, lattice; a ring of fewer than three points is outside (the site's own guard) | `n < 3 ? false : insideOrOnRing(…, 'evenOdd')` |
| N-3 | `invariants/whole.ts: inside` (in `seedTilingProblems`) | nested | closed, non-zero, lattice | `insideOrOnRing(…, 'nonZero')` |
| N-3 | `geom/hex-lattice.ts: strictlyInside` | private | strict (on the boundary outside), even–odd, lattice, a ring set as one flat edge list | `strictlyInsideRings(…, 'evenOdd')` (G-2, R13) |
| N-3 | `arr/kerb.ts: strictlyInside` | private | strict, non-zero, lattice rings, any double query, a ring set | `strictlyInsideRings(…, 'nonZero')` |
| N-3 | `warp/validate.ts: winding` | private | the signed winding number (Sunday's rule), xs / ys arrays | `windingNumber` |
| N-4 | `PI` in `insert/{stretch,wedge}.ts`, `tx/tx.ts`, `faces/fan.ts`, `invariants/batch.ts`, `warp/simplify.ts`, `geom/common.ts` (exported, not in `geom/index.ts`) | — | 3.141592653589793 | `PI` (G-1 moves geom's definition here, R13) |
| N-4 | `BOX_RANGE` in `insert/{placement,stretch,crossings}.ts`, `index/query.ts`, `warp/view.ts` | private | 2²⁴ | `BOX_RANGE` |
| N-4 | `SCALE` in `arr/{kerb,buffer,insetRing}.ts`, `insert/wedge.ts`; `div` in `arr/kerb.ts` (exported), `arr/buffer.ts` | — | 2²⁰; `ratio(num·2²⁰, den·2²⁰, 'length')` → value or null | `POW2_20`, `divScaled(·, ·, 'length')` (the inline uses in `wedge.ts` and `insetRing.ts` also read kind `length`) |
| N-4 | `HOT_PIXEL_SQ` in `insert/placement.ts` (exported), `warp/{warp,validate}.ts`; `HOT_SQ` in `tx/relevel.ts` | — | `HOT_PIXEL_CM * HOT_PIXEL_CM` = 0.5041 | its home is `index/items.ts` beside `HOT_PIXEL_CM` (R5), not exact.ts: num sits below index, so a second definition of the hot pixel here would be a second home. `invariants/batch.ts`'s 5041 / 10000 is another representation (BigInt-safe) and stays |
| N-4 | `MIN_EDGE = 25` in `warp/validate.ts`; `ATTRACT = 26` in `warp/warp.ts` | private | the literals | `LATTICE.minEdgeCm`, `LATTICE.attractCm` (`num/lattice.ts`) |

### Equivalences shown, and the nuances held

* **N-1.** All three bodies are the same algorithm token for token. `r2 * l2` and `r * r * l2` both evaluate `(r·r)·l2`.
  Shown on: every lattice point of a 13 × 13 window around every segment with ends in a 5 × 5 grid, at r 0, 1, 2, 3, 5
  and 6 (633 750 inputs: ties, inclusive ends, point segments); the fuzz arenas (every live vertex and its eight
  neighbours against every live edge, at 25 and 26 cm); the copies' own pinned inputs (`validate.test.ts`,
  `warp/fixtures.test.ts`); and 10⁴ random inputs, half of them in the r-band. Nuances: strict `<`; `dot <= 0` and
  `dot >= l2` are inclusive. Changing either to strict is an equivalent mutant: at dot = 0, o² = \|ap\|²·\|ab\|² exactly.
  `l2 === 0` is redundant too, because dot = 0 there.
* **N-2.** decimate and medial write the crossing as `(o1 > 0 && o2 < 0) || …`. invariants, faces and skeleton write it
  as a product of signs. The two forms agree on every finite input: the orientations are the same four calls, and faces'
  `onSegment` re-tests `orient2d === 0`, which is already known. Shown exhaustively on all 65 536 segment pairs of a 4 ×
  4 grid, on every pair of live fuzz-arena edges, and on 10⁴ random, collinear and end-sharing pairs plus 10⁴ pairs of
  finite doubles (medial's domain). The forms differ only on NaN coordinates, which no caller can produce.
* **N-3.** Every site's crossing test is one rule: half-open in y, side by the edge's direction. `crossingStep` writes it
  once. The even–odd form `(ay > qy) !== (by > qy)` and Sunday's `ay <= qy … by > qy` select the same edges with the same
  sign on finite inputs. The three boundary readings stay distinct predicates: open (`insideLatticeRing`,
  `insideDoubledRing`), closed (`insideOrOnRing`) and strict (`strictlyInsideRings`), with a fill rule where the sites
  differ (held: even–odd, whole: non-zero; hex: even–odd, kerb: non-zero). Shown on 3 000 small random ring sets
  against every lattice and doubled query of their box, on every face ring of every level of the fuzz arenas (alone,
  and as one ring set) against vertices, doubled vertices and edge midpoints, and on 10⁴ random rings and ring sets
  across the range. Kerb's double queries were checked on 10⁴ more inputs.
* **N-4.** Each spelt constant is pinned to its home's value, read from the module's source. Each `div` equals
  `divScaled(·, ·, 'length')` with `Object.is` (NaN, ±∞ and the 2⁻²⁰ floor included).

### Notes for the later rounds and the hardening pass

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-c1-1 (KI) | `segmentCloserThan` (every copy alike) compares o² with r²·\|ab\|² in doubles. Both are exact only while r²·\|ab\|² ≤ 2⁵³; for r = 26 that means segments up to about 36 km. The arena allows segments up to about 237 km (±2²³ cm). Beyond the bound, a near-tie (a point within a rounding of exactly r from a very long segment) can read as "clear" when it is closer by a fraction of a ulp. A clear answer never flips. No committed output is known to depend on it: frames at M0 are far smaller, and the fuzz arenas are 40 m. | A BigInt fallback when r²·l2 > 2⁵³ (detect-and-refuse is not needed: the comparison has an exact answer). It must land in exact.ts once every copy imports it, so all callers change together, as a one-time shift row if any output moves. | hardening pass (M4) |
| N-c1-2 | `copies.ts` reads private copies from source text, by name. A later round that renames a private copy without importing the shared one fails the table test, by design: the site must be either a copy equal to exact.ts or an importer. A round that changes a copy's signature changes its `call` adapter in `copies.ts`, a file of M0-a-01's owns. | The session routes such an edit as a permitted cross-owns change, or the later round deletes the copy outright (its site then reads as consolidated). | R2 – R13 |
| N-c1-3 | The plan's G-1 also asks for `lp`, `isLatticeCoord` and `distinctRing` in exact.ts, and S-1 for `halfPlaneOf`. Neither is in this round's findings (N-1 – N-4). | R13's seat, with exact.ts's owner's row (exact.ts is in M0-a-01's owns). | R13 |
| N-c1-4 | The arena-indexed point-in-ring adapters (`HalfEdgeId[]` / `VertexId[]` rings) belong to `arena/walk.ts` (R4), per the plan. exact.ts takes points. | R4 | R4 |

## Closing check of round R1 (lane `check/M0-a-01-consolidate-close-1`, flow-7, 2026-10-11)

New findings that are not blockers (the blocker rule of the brief), for the later rounds and the hardening pass:

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-c2-1 | A twelfth copy of the crossing rule stands outside the plan's N-3 list and outside `copies.ts`'s `RING_SITES`: `arr/bandUnion.ts:166–180` `insideKerb` sums Sunday's crossings over every kerb ring at a face's interior point and tests `wind !== 0`, with no on-edge test. That is a fourth reading (open, non-zero, a ring set), which exact.ts does not offer by name: it equals the sum of `windingNumber` over the rings, tested `!== 0`. | R9 (M0-a-09, which owns `bandUnion.ts`) adds the site to the copy table and points it at `windingNumber` summed over the rings. The site is then held by `equivalence.test.ts` like the other eleven. | R9 |
| N-c2-2 | `divScaled`'s `kind` argument is not pinned to reach `ratio()`. The mutant that hard-codes `'area'` survives (D4), and is equivalent today because `RATIO_FLOOR` is 1 for every kind. | A unit pin that tells the kinds apart, added in the same change as any floor table where the kinds differ. | M4 |
| N-c2-3 | The comment rewrite removed the tokens GEO-32 (`num/predicates.ts:1`) and GEO-7 (`num/snap.ts:1`), and C-0314 (6) calls them review-record tokens. They are also clause tags in docs/ARCHITECTURE.md §3.2 (6) "(GEO-32; J-K13)" and §3.2 (7) "(GEO-7)". The comments still cite §3.2 (6) and (7), so no rule is lost; only a design tag is gone. | The session decides whether design clause tags stay in source comments. If they stay, R13 or any later touch restores them. | session |
| N-c2-4 | `wedge.ts:39` and `insetRing.ts:70` call `ratio(x·SCALE, y·SCALE, 'length')` inline, with no `div` function. `DIV_SITES` therefore compares only kerb's and buffer's `div`. Both inline uses have kind `'length'`, so `divScaled(·, ·, 'length')` is their reading too. | R3 and R8 replace the inline calls with `divScaled(·, ·, 'length')`, and the existing `SCALE` pins guard the constant meanwhile. | R3, R8 |
| N-c2-5 | Three mutants of exact.ts survive. This checker judges each equivalent: A4 (`dot >= l2` → `dot > l2`: at dot = \|ab\|² the foot is b, so o² = \|pb\|²·\|ab\|² exactly within the exactness contract); A7 (`l2 === 0` dropped: l2 = 0 forces dot = 0); D4 (N-c2-2). | None. A4 is open to the same near-tie blur beyond 2⁵³ that N-c1-1 records. | — |

## Consolidation round R1, second part (lane `build/M0-a-01-consolidate-2`, flow-7, 2026-10-12; J298, fix round C2)

The S-1 and G-1 homes of kernel-plan.md §1.12 (noted as N-c1-3 above), landed in `num/exact.ts` before the rounds that
import them (J270 (b)); C-0330.

### Old file → new file map (J263 Q8)

| copy today (stays until the named round imports the shared name) | shared name in `src/num/exact.ts` | round that swaps it |
|---|---|---|
| `src/geom/common.ts:47–49` `isLatticeCoord` | `isLatticeCoord` (body identical) | R13, M0-a-10 |
| `src/geom/common.ts:65–67` `lp` | `lp` (body identical) | R13, M0-a-10 |
| `src/geom/common.ts:88–97` `distinctRing` | `distinctRing` (body identical) | R13, M0-a-10 |
| `src/skeleton/roof.ts:61` `half` (private) | `halfPlaneOf` (body identical) | R13, M0-a-11 |
| `src/skeleton/engine.ts:210` `half` (private) | `halfPlaneOf` (body identical) | R13, M0-a-11 |
| `src/warp/validate.ts:106` lambda `half` in `ascents` | `halfPlaneOf` (the same rule on `d[0]`, `d[1]`) | R10, M0-a-13 |

Tests: no file renamed, merged or split; every existing `describe`/`it` title unchanged. New: `test/num/exact.test.ts`
describe 'halfPlaneOf: the direction half-plane (kernel-plan.md §1.12 S-1)' (4 its); `test/num/equivalence.test.ts`
describe 'G-1: isLatticeCoord, lp and distinctRing ≡ geom/common.ts's (kernel-plan.md §1.12)' (5 its); the
not-re-exported test's name list grows from 13 to 17. NEAR: test/num + test/types 13 files, 94 → 103 tests.

### Mutants of this round (the lane's mirror, each over `packages/kernel/test/num`, `--bail=1`)

| id | line | mutant | result (first failing test) |
|---|---|---|---|
| S1a | S-1 | `y > 0` → `y >= 0` | red: the eight compass directions |
| S1b | S-1 | `x > 0` → `x >= 0` (the origin reads 0) | red: the axes at every scale … the origin reads 1 |
| S1c | S-1 | `? 0 : 1` → `? 1 : 0` | red: the eight compass directions |
| S1d | S-1 | `x > 0` → `x < 0` | red: the eight compass directions |
| S1e | S-1 | the rule transposed (`x > 0 \|\| (x === 0 && y > 0)`) | red: the eight compass directions |
| S1f | S-1 | `x > 0` → `x !== 0` | red: the eight compass directions |
| G1a | G-1 | `< LATTICE.rangeCm` → `<=` | red: isLatticeCoord fixtures |
| G1b | G-1 | `Number.isInteger` dropped | red: isLatticeCoord fixtures |
| G1c | G-1 | `Math.abs(v)` → `v` | red: isLatticeCoord fixtures |
| G1d | G-1 | `lp` swaps x and y | red: lp fixtures |
| G1e | G-1 | the closing-repeat loop dropped | red: distinctRing fixtures |
| G1f | G-1 | `out.length > 1` → `> 0` | red: distinctRing fixtures |
| G1g | G-1 | repeat test on x only | red: distinctRing fixtures |
| G1h | G-1 | pushes a copy of each point | red: distinctRing fixtures (the same point objects) |
| G1i | G-1 | `while` → `if` on the closing repeat | alive, equivalent: consecutive repeats are gone first, so after one pop the new last point differs from its neighbour, the old last, which equals the first |
| A1 | API | `num/index.ts` re-exports the four names | red: exact.ts is imported by path, never re-exported |
| A2 | API | `num/index.ts` re-exports `lp` | red: the same |
| E1 | NO-SHIFT | `segmentCloserThan` `<` → `<=` at r (an earlier round's) | red: is strict at r |
| E2 | NO-SHIFT | `crossingStep` `ay <= qy` → `ay < qy` (an earlier round's) | red: counts a vertex at the query's height |
| E3 | NO-SHIFT | `dot >= l2` → `dot > l2` | alive, equivalent (N-c2-5's A4) |

### NO-SHIFT and refusals

The emitted JavaScript with comments removed (TypeScript `transpileModule`) of 154 of the kernel's 155 source files is
identical to the before-image taken at the round's start; exact.ts's 19 earlier top-level declarations print identical.
No index file changed, so the exported names of every index and of the barrel are those of the before-image. The
refusal counts of M0-a-01's B-FUZZ families (snap, ratio, frameOf) on one seeded 10⁴ sample are identical before and
after: snap 2 668 (E_OUT_OF_RANGE x 1 445, y 1 223), ratio 7 770 (E_DEGENERATE ratio), frameOf 7 290 (E_OUT_OF_RANGE
area 478, aspect 6 093, range 719). Every one is an UNLAWFUL input (a coordinate outside ±2²³ or not finite, a
denominator below its floor, an area or aspect outside the frame's range), verdict REFUSE (typed; snap is the door that
names the coordinate, and the frame's caller picks the area and aspect, §3.2 (1), (7)); 0 lawful-input refusals. The
four new functions are total and refuse nothing.

## Closing check of round R1's second part (lane `check/M0-a-01-consolidate-close-2`, flow-7, 2026-10-12; J298)

New findings that are not blockers (the blocker rule of the brief), for the later rounds and the hardening pass. The
verdict is `checks/M0-a-01-c2.md`.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-c3-1 | No test pins the barrel's export set. The mutant A2 adds `export { lp as lpExact } from './num/exact.js'` to `src/index.ts` and survives test/num + test/types. The not-re-exported test in exact.test.ts checks exact.ts's names only, so an alias under a new name escapes it. Today the freeze (J263 Q1) is held by the before/after diff of every index: `num/index.ts`, `types/index.ts`, `src/index.ts` and `API.md` are byte-identical to main 5f8bb163. This needs a deliberate writer. | A ratchet test that pins the barrel's runtime export names to API.md Appendix B's list, or a recorded list, so that any addition fails by name. | the consolidation's API freeze (session), else M4 |
| N-c3-2 | exact.ts being a leaf (it imports only `./predicates.js`, `./ratio.js`, `./lattice.js` and the type-only `../types/index.js`) is held by reading, not by a test. The mutant G19 replaces `isLatticeCoord` with `export { isLatticeCoord } from '../geom/common.js'`. It survives test/num + test/types and lint, because the lint's kernel-boundary check does not order the kernel's folders. Once R13's a-10 round makes geom's copy a re-export of num/exact.ts, that edit would become a circular re-export. | An import-specifier ratchet on exact.ts in exact.test.ts. copies.ts already parses kernel sources with the TypeScript compiler, so the ratchet can reuse that parsing. | before or with R13 (M0-a-10), else M4 |
| N-c3-3 | No test holds the three S-1 copies (`skeleton/roof.ts:61` `half`, `skeleton/engine.ts:210` `half`, the `warp/validate.ts:106` lambda) equal to `halfPlaneOf` while they coexist with it. The S-1 pins judge `halfPlaneOf` against a rule written out in the test, as the brief asks, and they do not cover the copies. C-0330 (3)'s "held equal by the pins below" is true for G-1 (equivalence.test.ts imports geom's copies), but for S-1 it holds only through the side-by-side reading. This checker executed the three copies' return expressions, read from source, against `halfPlaneOf` on 100 081 cases (the ±2²³ and special-value grid with NaN and −0, plus 10⁵ seeded vectors with a third on an axis): 0 disagreements, and the origin reads 1 in all four. | Add S-1 rows to `copies.ts`'s table, with the `importsShared()` ratchet after the swap. Or leave it: R13's a-11 round and R10's warp round replace the copies by imports. | R10 / R13 |
| N-c3-4 | Three small wording points. (a) The header says `halfPlaneOf` "reads an integer direction vector by two comparisons with 0", but the code makes up to three comparisons (`y > 0`, `y === 0`, `x > 0`) on its two coordinates. Read as "comparisons of its two coordinates with 0" it is true. (b) In equivalence.test.ts's G-1 describe, `agree(id, got, want)` is called with exact.ts's value as `got` and geom's as `want`. Its failure text "<got> where exact.ts gives <want>" therefore names the two sources the wrong way round. It affects only a failure message. (c) The module's first paragraph still lists only the segment and ring tests and the constants. The brief kept it unchanged ("no other comment changes"), so it does not yet name the lattice inputs or the half-plane. | Reword at the next touch of each file: (a) "by comparing its two coordinates with 0"; (b) the message, or the argument order, in the G-1 describe; (c) the first paragraph names all four groups. | next touch / M4 |
| N-c3-5 | This checker ran 41 targeted mutants. Two survivors are judged equivalent here. G11 (`while` → `if` on the closing repeat): consecutive repeats are removed first, so after one pop the new last point differs from the old last point, which equals the first point. G13 (`out.length > 1` → `> 2`): after consecutive repeats are removed, a two-point ring has two different points, so the dropped case never pops. | None. | — |

## Consolidation round R1, third part (lane `build/M0-a-01-consolidate-3`, flow-7, 2026-10-12; J308, fix round C3)

T-4's home (kernel-plan.md §1.3) in `num/exact.ts`, and queue row L32's two ratchets (N-c3-1, N-c3-2 above); choices
C-0337. No caller changed (J270 (b)): faces adopts `comparePoints` in R7, tx in R6, kerb in R9.

### Old file → new file map (J263 Q8)

| copy today (stays until the named round imports the shared name) | shared name in `src/num/exact.ts` | round that swaps it |
|---|---|---|
| `src/faces/common.ts:444` `comparePoints` (exported from the file) | `comparePoints` (body identical) | R7, M0-a-07 |
| `src/tx/relevel.ts:349` `pointCmp` (private) | `comparePoints` (body identical) | R6, M0-a-06 |
| `src/tx/tx.ts:234` `pointCmp` (a const arrow inside `dirtyFaces`; not in the plan's T-4 list — a fifth copy, found here) | `comparePoints` (body identical) | R6, M0-a-06 |
| `src/arr/kerb.ts:120` `comparePoints` (private; `a.y !== b.y ? a.y - b.y : a.x - b.x`, so the brief's `a.y - b.y \|\| a.x - b.x` in another spelling) | `comparePoints` (the same sign on every lattice pair; its value is a difference) | R9, M0-a-09 |
| `src/digest/levelDigest.ts:169` `cmpYX` | — stays (D-1: the digest's own canonical form on `[y, x]` tuples) | — |

Tests:
* `test/num/arenas.ts` (new): the fuzz-arena block of `test/num/equivalence.test.ts` (its lines 64–105 before this
  round: `FuzzArena`, `fuzzArena`, `GROW`, `GROW_ALONG`, `ARENAS`) moved verbatim and exported, so `exact.test.ts`
  reads the same arenas. No arena, seed, mix or step count changed.
* `test/num/api-surface.test.ts` (new): describe 'the public API is API.md Appendix B, name for name (J263 Q1;
  checks/M0-a-01-notes.md N-c3-1)' (4 its).
* `test/num/exact.test.ts`: describe 'comparePoints: §3.3's vertex key, y then x (kernel-plan.md §1.3 T-4)' (4 its); in
  'exact.ts is imported by path, never re-exported (C-0314)' the new it 'is a leaf of num: …' (N-c3-2), and the name
  list grows from 17 to 18.
* `test/num/equivalence.test.ts`: describe 'T-4: comparePoints ≡ faces' comparePoints, relevel's and tx's pointCmp;
  kerb's comparePoints by its sign (kernel-plan.md §1.3)' (3 its); the copy table counts `COMPARE_SITES` (4 sites).
  In the G-1 describe, `agree` now takes geom's value as `got` and exact.ts's as `want` (N-c3-4 (b): the failure text
  named the two sources the wrong way round; no verdict changes).
* `test/num/copies.ts`: `moduleLinks(file)` and `exportedNames(file)` on the same TypeScript parsing as `privateCopy`,
  and `COMPARE_SITES`.
* Every existing `describe`/`it` title unchanged; no file renamed. NEAR: test/num + test/types 13 → 14 files, 103 → 115
  tests.

Comments: exact.ts's first paragraph names all its groups (N-c3-4 (c)); THE EXACTNESS CONTRACT gains the
`comparePoints` sentence and reads "by comparing its two coordinates with 0" for `halfPlaneOf` (N-c3-4 (a)); the
import sentence ("Imported by path …; `num/index.ts` does not re-export it, so the package's public API is
unchanged.") is word for word as it was, and `num/index.ts`'s "imported by path and not re-exported" line is untouched.

### API.md Appendix B is four names behind the tree

Appendix B was generated on 2026-10-07 and says a later name "is not listed here until the document is regenerated".
Since then tx's index exports `restoreGeneration`, `restoreSavepoint`, `takeSavepoint` and the type `Savepoint`
(C-0287, C-0299). API.md is frozen (J263 Q1) and outside the item's owns, so `api-surface.test.ts` excuses exactly
those four by name in `AFTER_APPENDIX_B`, a list that only shrinks: each name in it must be absent from Appendix B, so a
regeneration that lists one fails the test until the name leaves the list. Every other folder's values and types
equal its Appendix B line exactly (the syntactic export walk reproduces all 21 lines; the header totals 669 = 419 +
250 hold).

### Mutants of this round (the lane's mirror, each over `packages/kernel/test/num` + `packages/kernel/test/types`, `--maxWorkers=1 --bail=1`)

Baseline in the mirror: 14 files, 115 tests, green. Isolation: no symbolic link in the mirror resolves into
/home/user/maps-architecture; `packages/testkit/node_modules/@plat/kernel` resolves inside the mirror. Each mutated file
was restored from the tree and checked with `cmp` before the next; the mirror's kernel was `diff -rq`-identical to the
tree at the end.

| id | line | mutant | result (first failing test) |
|---|---|---|---|
| N-c3-1 | L32 (a) | `export { lp as lpExact } from './num/exact.js'` appended to `src/index.ts` | red: the barrel re-exports every module folder's index and nothing else |
| N-c3-2 | L32 (b) | `isLatticeCoord` replaced by `export { isLatticeCoord } from '../geom/common.js'` in exact.ts | red: is a leaf of num |
| T1 | T-4 | x then y | red: y decides first, x only for one y |
| T2 | T-4 | y order reversed | red: the same |
| T3 | T-4 | x order reversed | red: the same |
| T4 | T-4 | the difference (kerb's form) | red: the same (the range {−1, 0, 1}) |
| T5 | T-4 | one position → −1 | red: the same |
| T6 | T-4 | y only | red: the same |
| T7 | T-4 | `a.y < b.y` → `a.y <= b.y` | alive, **equivalent**: it is read only when `a.y !== b.y` |
| T8 | T-4 | one position → 1 | red: T-4 equivalence, the 5 × 5 window |
| T9 | T-4 | x-only order when both y > 4 000 000 | red: T-4 equivalence property |
| T10 | T-4 | `export` dropped | red: T-4 equivalence |
| TC1 | T-4 copies | relevel's `pointCmp` x reversed | red: T-4 equivalence, the 5 × 5 window |
| TC2 | T-4 copies | kerb's x then y | red: the same |
| TC3 | T-4 copies | tx's inline `pointCmp` one position → −1 | red: the same |
| TC4 | T-4 copies | faces' `comparePoints` y reversed | red: the same |
| AS1 | L32 (a) | `export type { LatticePoint as LatticeXY }` in num/index.ts | red: each folder index's … types |
| AS2 | L32 (a) | `withinCm` dropped from num/index.ts | red: the barrel's runtime names |
| AS3 | L32 (a) | `withinCm` dropped from Appendix B's num line | red: the lines hold the counts they state |
| AS4 | L32 (a) | a type `PointXY` added to types/units.ts (`export type *` followed) | red: each folder index's … types |
| AS5 | L32 (a) | `export const GEOM_EXTRA` in geom/index.ts | red: the barrel's runtime names |
| AS6 | L32 (a) | `export const KERNEL_EXTRA` in src/index.ts | red: the barrel re-exports … nothing else |
| LF1 | L32 (b) | an extra import (`./snap.js`) in exact.ts | red: is a leaf of num |
| LF2 | L32 (b) | `import type` → `import { type … }` from ../types/index.js | red: the same |
| LF3 | L32 (b) | `export type { RatioKind } from './ratio.js'` in exact.ts | red: the same |
| S2 (c2) | NO-SHIFT | halfPlaneOf `y >= 0` | red: the eight compass directions |
| S4 (c2) | NO-SHIFT | halves swapped | red: the same |
| G1 (c2) | NO-SHIFT | isLatticeCoord `<=` | red: isLatticeCoord fixtures |
| G6 (c2) | NO-SHIFT | lp x↔y | red: lp fixtures |
| G10 (c2) | NO-SHIFT | distinctRing's closing loop dropped | red: distinctRing fixtures |
| A1 (c2) | NO-SHIFT | num/index.ts re-exports halfPlaneOf | red: neither num/index.ts nor the barrel exports any of its names |
| A1 (c1) | NO-SHIFT | segmentCloserThan `<=` at the perpendicular | red: is strict at r |
| C1 (c1) | NO-SHIFT | crossingStep `ay < qy` | red: counts a vertex at the query's height |
| C9 (c1) | NO-SHIFT | fill rules swapped | red: winds +1 counter-clockwise … |
| D1 (c1) | NO-SHIFT | π's last digit | red: holds π's nearest double |
| D5 (c1) | NO-SHIFT | divScaled null → 0 | red: divScaled: the quotient … |

36 mutants: 35 red, 1 equivalent (T7).

### NO-SHIFT and refusals

Before-image: `packages/kernel/{src,test,API.md}` copied and SHA-256-hashed at the round's start (386 files). After:
only `src/num/exact.ts` and `test/num/{copies,equivalence.test,exact.test}.ts` differ, plus the new
`test/num/{api-surface.test,arenas}.ts`. exact.ts's emitted JavaScript with comments removed (TypeScript
`transpileModule`, `removeComments`) is the before-image's plus the `comparePoints` function alone (127 → 130 lines,
one hunk). `num/index.ts`, `types/index.ts`, `src/index.ts` and `API.md` are byte-identical to the before-image (git
blob SHA-1 `1bf0320fa9fe`, `acfe6835b6af`, `230beb37a068`, `a6827cd5c6e7`, computed without git for the checker to
compare with main). No runtime file but exact.ts changed, and nothing calls `comparePoints` yet, so no digest, golden,
register JSON, refusal code or message text can move. A seeded census of M0-a-01's B-FUZZ families (10⁴ calls each over
doubles, specials and the range edges), run in the tree and in the mirror holding the before-image exact.ts, printed
byte-identical tallies: snap 5 171 refused (E_OUT_OF_RANGE x 3 087, y 2 084), ratio 2 650 (E_DEGENERATE ratio),
frameOf 7 228 (E_OUT_OF_RANGE area 2 531, aspect 3 680, margin 525, range 396; E_DEGENERATE ratio 96 — an area whose
frame is under 1 cm wide). Every refusal is an UNLAWFUL input, verdict REFUSE (typed; snap is the door that names the
coordinate, the frame's caller — the run's configuration — picks area, aspect and margin, §3.2 (1), (7), (9)); lawful
refusals 0 → 0. `comparePoints` is total and refuses nothing.

### Notes for the later rounds and the hardening pass

| id | note | proposed | when |
|---|---|---|---|
| N-c3b-1 | `tx/tx.ts:234` holds a fifth copy of T-4's comparator (a const arrow in `dirtyFaces`, ordering removed records by their kept keys), outside the plan's T-4 list. It is now `COMPARE_SITES`' 'T-4 tx (removed records' order)' row, held equal to `comparePoints`; R6 swaps it with relevel's `pointCmp`. | R6 imports `comparePoints` at both tx sites. | R6 (M0-a-06) |
| N-c3b-2 | API.md Appendix B lists 669 names; the tree exports 673 (tx's stage image, C-0287, C-0299). The ratchet excuses those four by name in a shrink-only list. | Regenerate Appendix B with the next API.md touch, then empty `AFTER_APPENDIX_B`. | the session (API.md's owner) |
| N-c3b-3 | `exportedNames` reads exports syntactically. A plain `export { T } from …` of a type counts as a type only because it is absent at run time; under `isolatedModules` such a re-export must already be `export type`. | None while `isolatedModules` stays on. | — |

Gates of round C3 (in the tree, 1 worker): install --frozen-lockfile 0; lint 0 (probe-red ok, 9 whole-tree checks);
build 0; NEAR test/num + test/types 14 files, 115 tests, 0 failed; RELATED (PLAT_FUZZ_RUNS=1000) over
`src/num/exact.ts`: 444 files, 5 721 tests, 1 red — testkit `test/edge/repins.test.ts` 'EP-01/S8/zero-length at
2521534151' (expects refused-lawful, receives laddered), replayed red in the lane mirror with the before-image exact.ts,
so not this round's (M0-x-06's pin, already reported by rounds C2 and its check).

## Closing check of round C3 (lane `check/M0-a-01-consolidate-close-3`, flow-7, 2026-10-12)

New findings that are not blockers under the brief's blocker rule (each is a tightening of a claim), for the later
rounds and the hardening pass. The verdict is `checks/M0-a-01-c3.md`.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-c3c-1 | The sentence added to `test/num/exact.test.ts`'s header says "nothing re-exports it". The test only checks that neither `num/index.ts` nor the package barrel exports exact.ts's names. Two kernel files re-export exact.ts's names by design: `insert/placement.ts:36` (`export { segmentCloserThan } from '../num/exact.js'`, R2's N-1) and `insert/decimate.ts:74` (`segmentsMeet`, R2's I-6). R7 adds faces' `comparePoints`. The describe title 'exact.ts is imported by path, never re-exported (C-0314)' predates this round and has the same scope; it is kept because checks cite it. | Reword the header to "neither `num/index.ts` nor the package barrel re-exports it". Comment only. | the next round that touches `test/num/` (R13's a-10 half), else M4 |
| N-c3c-2 | `comparePoints`' docstring in `num/exact.ts` says "The comparator every canonical sort of points reads (a face's key, a removed record's key, a ring's start)". As a statement of the order it is true: every one of those sorts orders by (y, then x). As a statement about this function it is not yet true. No caller imports it (J270 (b)). The sorts named use their own copies: `faces/common.ts` (and `faces/split.ts` through it), `tx/relevel.ts`, `tx/tx.ts`, `arr/kerb.ts`. | Say "the order every canonical sort of points uses (…)", or leave it until R6, R7 and R9 adopt the function. Comment only. | R6 / R7 / R9, else M4 |
| N-c3c-3 | Two of this checker's mutants survived, and both are judged equivalent. C6 replaces `<` with `<=` on y. It is reached only under `a.y !== b.y`, and there `<=` is the same as `<`. K5 doubles kerb's difference but keeps its sign. The T-4 reading compares signs only, as the plan's EQUIVALENCE says ("sorting with a comparator uses the sign only"). | None. | — |
| N-c3c-4 | For the session: clean-room disclosures. (a) The builder's row L-0471 discloses one `ls` of the project's `docs/` folder, which printed entry names only and opened no file. Rule 2 forbids listing those folders, but no content reached the seat. Following the precedent of `checks/M0-c-02-s3.md` (N-29), this checker does not judge it a clean-room breach of the item. (b) This checker built its before-image from the project's own GitHub repository by blob. The recursive tree listing of main 9ba492ca was held in memory and filtered to `plat/packages/kernel/` before anything was saved or printed. (c) This checker read `docs/PROGRESS.md` rows J263, J270, J273 and J308, found by grep on the row id. These are the rulings the brief cites; the file is outside plat/ but is not on rule 2's list. All three are recorded in L-0472. | The session confirms or rules. | the session |

## Hardening round S1 (lane `build/M0-a-01-fix-s1`, flow-7, 2026-10-14; J237 (2), J264, J290 / N-58; choices C-0361)

The session opened this round as M0-a-01's hardening round on the inventory's FIX-NOW rows `M0-a-01:305 N-c3c-1` and
`M0-a-01:306 N-c3c-2` (`checks/hardening-inventory.md` lines 230 – 231) and the queue row L19 (`docs/M0-FIX-QUEUE.md`;
its source note N-c1-1 above, inventory line 146). Every change is inside the item's owns: `src/num/exact.ts` and
`test/num/exact.test.ts`. No folder index or barrel changed (J263 Q1): `num/index.ts`, `types/index.ts`, `src/index.ts`
are untouched, exact.ts's 18 exported names are the same, and the one new constant (`EXACT_BELOW`) is file-private.

### Row by row

| row | outcome | evidence |
|---|---|---|
| N-c3c-1 (`test/num/exact.test.ts:6`) | **fixed** (comment only, no pin, per the row) | The header now reads "neither `num/index.ts` nor the package barrel re-exports it", which is what the describe 'exact.ts is imported by path, never re-exported (C-0314)' tests. The note was right and still is: `insert/placement.ts:36` re-exports `segmentCloserThan`, and now also `warp/validate.ts:17` (`export { segmentCloserThan as closerThan }`). The describe title is kept verbatim, because checks cite it. |
| N-c3c-2 (`src/num/exact.ts:205`) | **fixed** (comment only, no pin) | The docstring now reads "The order every canonical sort of points uses (a face's key, a removed record's key, a ring's start); a sort that has not yet adopted this function keeps its own copy of the order, held equal to it by `test/num/equivalence.test.ts` (T-4)". The note's fix shape is taken (the order, not the function). Since the note was written, the tree has moved: `tx/relevel.ts` and `tx/tx.ts` now import `comparePoints` (R6). `faces/common.ts` (with `faces/split.ts`) and `arr/kerb.ts` still keep copies. So the sentence names no file and stays true as R7 and R9 adopt the function. |
| L19 (queue; N-c1-1) | **fixed and pinned** | `segmentCloserThan` keeps its double comparison wherever that comparison is exact or decisive. Rounding is monotone, so two products that round to different doubles keep the exact order. Two products below 2⁵³ are exact. The only undecided case is o² and r²·\|ab\|² rounding to one double at or past 2⁵³. That tie is decided again in BigInt from the integers o, r² and \|ab\|² (exact for every lattice input under the range invariant). A non-integer input (no caller passes one) keeps the doubles' answer instead of throwing in `BigInt()`. The source note's condition "once every copy imports it" holds: `CLOSER_SITES`' three rows (placement, tx, warp) all reach the shared function now, so every caller changes together. Pins: 'segmentCloserThan past 2⁵³ (M0-FIX-QUEUE L19)' has 3 its plus a property. (1) Four 40 km segments at r = 25 cm (minEdge), each with a lattice point whose o is even and o² + 1 = 625·\|ab\|². The point is a hair inside r, but the doubles read it as clear. The it also checks that the fixture is that tie. (2) A point exactly 25 cm from a 40 km segment (a–b = 800 001·(3, 4)) is clear: the strict side, in BigInt. (3) A non-integer r whose doubles tie past 2⁵³ returns false and does not throw. (4) A property equal to `closerBig` on segments of any length in range at r 25, 26 and 51. |

Why the BigInt route and not a refusal: §3.2 (1) rests every exactness argument "on the range invariant, never on the
frame table", and (3) forbids float comparisons for topology on lattice points; the comparison has an exact answer, so
a refusal would refuse a lawful input (J264). The frame table does not keep callers inside the old bound at every r:
`insert/crossings.ts:219` reads r = MIN_EDGE + ATTRACT = 51 cm, whose old bound is about 18.6 km, below the largest
METROPOLIS arena's diagonal (§3.2 (1): 17.53 km × 8.76 km plus 30 % margins, about 31 km).

### Mutants (the lane's mirror; each over `packages/kernel/test/num` + `packages/kernel/test/types`, `--maxWorkers=1 --bail=1`)

The mirror is a real copy of `plat/` at the lane path. Isolation: `find … -lname '/home/user/maps-architecture*'` printed nothing, and
`packages/testkit/node_modules/@plat/kernel` resolves inside the mirror. Baseline in the mirror: 14 files, 118 tests
(119 after the off-lattice it was added and synced), green. Each mutated file was restored from the tree and checked
with `cmp`. At the end the mirror's kernel was `diff -rq`-identical to the tree.

| id | row | mutant | result (first failing test) |
|---|---|---|---|
| BEFORE | L19 | exact.ts replaced by its round-start image (sha256 35e7d505…) | red: decides the tie its doubles cannot in BigInt … |
| L19-M1 | L19 | the tie test dropped (`return o2 < bound` always) | red: the same |
| L19-M2 | L19 | BigInt `<` → `<=` | red: keeps the strict side in BigInt … |
| L19-M3 | L19 | the BigInt line → `return false` (the old answer) | red: decides the tie … |
| L19-M4 | L19 | `EXACT_BELOW` 2⁵³ → 2⁵⁴ | red: decides the tie … |
| L19-M5 | L19 | `o2 !== bound ||` dropped (BigInt for every pair past 2⁵³) | alive, **equivalent**: BigInt gives the exact answer, and the doubles' answer on a pair they keep apart is the same by monotone rounding (only slower) |
| L19-M6 | L19 | the non-integer guard returns true | red: a tie past 2⁵³ off the lattice … |
| L19-M7 | L19 | the BigInt comparison reversed | red: decides the tie … |
| L19-M8 | L19 | the doubles' `<` → `<=` | red: is strict at r … |
| L19-M9 | L19 | `o2 !== bound` → `o2 === bound` | red: decides the tie … |
| L19-M10 | L19 | the non-integer guard dropped (`BigInt(27.23…²)` throws RangeError) | red: a tie past 2⁵³ off the lattice … |
| C1 (c1) | re-kill | crossingStep `ay < qy` | red: counts a vertex at the query's height … |
| T1 (c3) | re-kill | comparePoints x then y | red: y decides first … |
| LF1 (c3) | re-kill | an extra import (`./snap.js`) in exact.ts | red: is a leaf of num … |
| A1 (c2) | re-kill | num/index.ts re-exports `halfPlaneOf` | red: neither num/index.ts nor the package barrel exports any of its names |

15 mutants: 14 red, 1 equivalent (L19-M5). N-c3c-1 and N-c3c-2 change comments only, so they have no mutant. Their
deliverable is the text, quoted above.

### Declared shift (L19), NO-SHIFT elsewhere, refusals

The shift: `segmentCloserThan` changes its answer only where o² < r²·|ab|² exactly while both round to one double at
or past 2⁵³. There the answer goes from false to true (a point inside r was read as clear). The four pinned 40 km ties
go from false to true. A differential probe in the mirror compared the round-start exact.ts with the new one on
1 877 068 calls: 877 068 on the fuzz arenas (every live vertex and its eight neighbours against every live edge, r 25
and 26) and 10⁶ seeded random calls across the range (segments of any length, points near the r-band, r 25 / 26 / 51).
No answer differed. No digest, golden, register JSON, refusal code or message text is re-recorded: none reaches such a
tie (the M0 arenas' edges are far below 36 km at r ≤ 26), and no test outside this item's pins changed.

Refusals (J264 / N-58): M0-a-01's registered B-FUZZ families are snap, ratio and frameOf. None of their modules imports
exact.ts. The census ran in the mirror over 10⁴ seeded calls per family (doubles, specials, range edges), once with the
new exact.ts and once with the round-start image, and the outputs were byte-identical (sha256 7e248ad5…): snap 5 668
refused (E_OUT_OF_RANGE x 3 446, y 2 222), ratio 5 906 (E_DEGENERATE ratio), frameOf 5 767 (E_OUT_OF_RANGE aspect
2 875, area 1 239, margin 464, range 269; E_DEGENERATE ratio 920). Every refusal is an UNLAWFUL input, verdict REFUSE:
snap is the door that names the coordinate, and the run's configuration picks area, aspect and margin (§3.2 (1), (7),
(9)). Lawful refusals: 0 before, 0 after. `segmentCloserThan` is total and refuses nothing.

### Reported, not built (other items' files)

| id | report | owner |
|---|---|---|
| N-s1-1 | `insert/stretch.ts`'s `withinSegment` and `passesWithin` (both inclusive, `o * o <= r2 * l2`) have the same 2⁵³ bound in the other direction. A pair whose doubles round to one value past 2⁵³ while the exact o² is the larger reads as within r. They are not copies of `segmentCloserThan` (inclusive, not strict), so L19's fix does not reach them. The same BigInt re-decision of the doubles' tie would make them exact. | M0-a-05 (insert/) — for the session's queue |

### Gates of round S1 (in the tree, 1 worker)

install --frozen-lockfile 0; lint 0 ("lint: probe-red ok", 9 whole-tree checks); build 0; NEAR test/num + test/types
14 files, 119 tests, 0 failed (full strength); RELATED (PLAT_FUZZ_RUNS=1000) over `src/num/exact.ts`: 453 files,
5 818 tests, 0 failed (exit 0, 8 330 s); landed:verify flow-7 --item M0-a-01 ok; lane mirror removed; no git.

## Closing check of round S1 (lane `check/M0-a-01-close-s1`, flow-7, 2026-10-14)

New findings that are not blockers under the brief's blocker rule (each concerns an input no caller passes, or another
item's comment), for the hardening pass. The verdict is `checks/M0-a-01-s1.md`.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s1c-1 | The builder's L19-M5 ("`o2 !== bound ||` dropped") is labelled equivalent. It is equivalent on lattice input only. This checker's L3 (the same mutant) and L4 (`o2 !== bound` → `o2 > bound`) survive NEAR, and both differ from the after-image off the lattice. Witness: p = (2 000 000, 24), a = (0, 0), b = (4 000 000, 0), r = 25.5. Here o² ≈ 9.2·10¹⁵ is past 2⁵³ and held apart from r²·\|ab\|² ≈ 1.04·10¹⁶. The after-image returns true (the doubles' answer, as the docstring promises); L3 and L4 return false. L15 (drop `!Number.isInteger(o)`) and L17 (drop `!Number.isInteger(l2)`) also survive. Each would throw `RangeError` in `BigInt()` on a tie past 2⁵³ with a non-integer o or \|ab\|². The off-lattice `it` pins a non-integer r² only. On 300 000 seeded lattice calls (r 25, 26, 51, 52) and the pinned 40 km ties, all four mutants equal the after-image. Every caller passes lattice coordinates and a whole r, so no honest input reaches the difference. | Pin the docstring's sentence "A non-integer input keeps the doubles' answer" in full: one non-tie off-lattice case past 2⁵³ (the witness above), and one tie each with a non-integer p and with a non-integer a–b. Or narrow the sentence to the r² case. | M4 (or the next round that touches `test/num/`) |
| N-s1c-2 | Two other items' comments describe `segmentCloserThan` as it was before L19. `invariants/common.ts:57` (M0-a-14) contrasts `compareDist2`, "exact beyond 2⁵³", with `num/exact.ts`'s `segmentCloserThan`, "a strict test against a whole radius in doubles". `insert/stretch.ts:232` (M0-a-05) calls `passesWithin` "exact where it can decide, as `segmentCloserThan`". `segmentCloserThan` is now exact on every lattice input, and `passesWithin` and `withinSegment` are not (the builder's N-s1-1, which this checker agrees with). The contrast between strict and three-way still holds. | Comment only: reword in the owners' next rounds (M0-a-14 for invariants/, M0-a-05 for insert/, together with N-s1-1). | M4 |
