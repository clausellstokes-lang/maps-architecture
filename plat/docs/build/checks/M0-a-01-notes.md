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
