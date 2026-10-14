# M0-a-07 — the first check's notes (minor findings, for the hardening milestone M4)

These notes come from the independent check of item M0-a-07, the face partitioners (lane `check/M0-a-07`, flow flow-7,
stage group 8, 2026-10-05). Under J180, none of them fails the item. The verdict, its blockers and its evidence are in
`checks/M0-a-07.md`. The mutant ids (M01 – M32) and probe ids (P1 – P12) refer to that file.

| # | finding | evidence | handling |
|---|---|---|---|
| N-1 | The B-FUZZ property's `tiles` check (`test/faces/bfuzz.test.ts`) cannot fail. It compares the children's summed `area2` with the `area2` of their own joint boundary, which is the half-edges of the two children whose twins bound neither child. The two sums differ only by the interior twin pairs, and those cancel exactly (cross(u, w) + cross(w, u) = 0), so the equality holds for any two disjoint face walks. The listed tiling test is still non-vacuous in `split.test.ts`, where the straight cut, the bent cut and the fold's negative control compare the children with the parent's area taken before the split. The same tautology appears without a parent comparison in `split.test.ts`'s slanted-cut, attraction, antenna and holed-face cases. | This is algebra (PLAUSIBLE, by reasoning), together with the `.toBe(before)` lines read in `split.test.ts`. | M4: in the fuzz, compare the children's sum with the parent's ring at the child level, read before the merge. One way is the parent's `area2` taken before the split, plus the hot-pixel moves of the split landings, which are exact on the lattice. |
| N-2 | The ± 1 lattice-unit fixtures do not pin the `attractCm` radius of the vertex rule or the interior-point rule. M01 (the vertex rule's radius 26 → 1) and M02 (the interior point's edge radius 26 → 1) survive every deterministic test in the folder. B-FUZZ kills both (CONFIRMED with `PLAT_FUZZ_RUNS=2000`), so the promise is held, but only by the fuzz. | The mutant log: `M01 vertex rule radius: SURVIVED`, `M02 interior pt near edge radius: SURVIVED` (the deterministic files); `M01 … KILLED`, `M02 … KILLED` (with `bfuzz.test.ts`). | M4: add deterministic fixtures. One is probe P1: on the L-shaped face, a cut 14.1 cm from the reflex vertex is refused, and one 28.3 cm from it splits. Another is an interior point 15 cm from the top way on a steep cut, e.g. `[[1000, 0], [1500, 1985], [2000, 0]]`, which must be refused. |
| N-3 | §3.6 (6) ("a face's exported area boundary omits its antennae", §11.1) is among the clauses the item names (§3.6 (1) – (6)). It has no test, and C-0192 gives no named reason or milestone for it. The export (§11.1) is not built at M0, and the kernel's `faceArea2` cancels an antenna's two sides anyway. | `grep -n "exported\|§11.1" packages/kernel/src/faces/*.ts packages/kernel/test/faces/*.ts` and C-0192: no hit. | M4 or the export's milestone: name the clause's milestone in a choices row, or test the export's ring omission once §11.1 is built. |
| N-4 | `ringBand`'s width refusal at the boundary (`widthCm <= attractCm`; M26: `<=` → `<`) is not pinned. The test uses 20 cm, not 26 cm. | `M26 band width boundary: SURVIVED`. | M4: add a fixture at exactly 26 cm (E_BELOW_MIN_WIDTH) and at 27 cm. |
| N-5 | Three guards are redundant (equivalent survivors), so they need a note but no test. M03 removes the one-vertex check: the later minEdge check refuses the same cut with the same code. M29 removes the refusal of a landing on another face's vertex: the inside-face and segment checks refuse such a cut first. M32 removes the core sides' vertex-clearance check in `coreClear`: the core of a convex face inset by more than `attractCm` keeps its sides that far from every boundary corner. | M03, M29 and M32 SURVIVED both the deterministic files and B-FUZZ at 2000 runs. These are PLAUSIBLE equivalents. | None (noted). |
| N-6 | `fan.ts` `rayHit` finds a ray's boundary hit through parameters in doubles (`ratio`, `s > 1`, `0 ≤ u ≤ 1`). This is not the contact decision, which `planCut` then makes exactly on the snapped hit, and C-0192 (7) declares it. A ray grazing a boundary vertex can therefore pick either incident edge, but `planCut` judges the result in both cases. | `packages/kernel/src/faces/fan.ts` lines 63 – 85. | None (noted). A comment in `rayHit` that names C-0192 (7) would help a reader. |

## Round C1 — consolidation round R7 (lane `build/M0-a-07-consolidate-1`, flow flow-7, 2026-10-13)

The round applies F-1 – F-5 of `plat/docs/build/consolidation/kernel-plan.md` (§1.6, with §1.0 N-2, N-3, N-4, §1.2 I-8,
§1.3 T-4, T-5), §2's comment rule for the files of `src/faces/` and §3.4's `test/faces` row (no merge) as fix round C1
of the item's consolidation lines (J260, J263 Q1, Q6, Q8; J264 (5); J270 (a), (b)), after R1 (`num/exact.ts`), R3, R5
(`index/items.ts` `faceArea2`) and R6 (`tx/state.ts` `enterWriter` / `overLimit`). It changes no behaviour. Its choices
row is C-0351.

### What changed, and the equivalence shown

| finding | change | equivalence |
|---|---|---|
| F-1 | `common.ts` `insideRing(p, ring, qx2, qy2)` keeps its name, signature, doc and typed-array loop; per edge it calls `num/exact.ts` `crossingStep(2 * X[a], 2 * Y[a], 2 * X[b], 2 * Y[b], qx2, qy2) !== 0` in place of its own straddle test and `orient2d` side test. `insideRegion` unchanged (it only composes `insideRing` over the outer ring and the holes). | The four cases, the old toggle `(ay > qy) !== (by > qy)` then `by > ay ? o > 0 : o < 0` against `crossingStep` (`ay ≤ qy`: `by > qy && o > 0 ? 1 : 0`; else `by ≤ qy && o < 0 ? −1 : 0`), on the same doubled arguments: (ay ≤ qy, by ≤ qy) no straddle / 0; (ay ≤ qy, by > qy) straddle, by > ay so `o > 0` / `o > 0` → 1; (ay > qy, by ≤ qy) straddle, by < ay so `o < 0` / `o < 0` → −1; (ay > qy, by > qy) no straddle / 0. Toggle iff ≠ 0 in all four; `orient2d`'s arguments are the same doubles, so the same sign. Held by the new `shared.test.ts`: exhaustively on the window [−2, 2]⁶ of doubled coordinates (15 625 edges and points, every case each side and on the line) against the old toggle written out, and `insideRing` against the old body on 300 random star faces (with and without a hole) at 32 points per ring — lattice, half-lattice, and at a ring vertex's height (the y-ties). M0-a-01's `test/num/equivalence.test.ts` 'N-3 faces' site still compares `insideRing` with `insideDoubledRing` on the fuzz arenas (green). |
| F-2 | `segmentsTouch` → `export { segmentsMeet as segmentsTouch } from '../num/exact.js'`; the private `sign` and `onSegment` deleted; `planCut`'s two calls read `segmentsMeet` (imported). | The argument order agrees (a–b, c–d, eight coordinates). The truth table is the same: old d1 = sign(orient(c, d, a)), d2 = sign(orient(c, d, b)), d3 = sign(orient(a, b, c)), d4 = sign(orient(a, b, d)) are num's o3, o4, o1, o2; the proper crossing `d1·d2 < 0 && d3·d4 < 0` is num's pairwise opposite-sign test; the four collinear ends (`dk === 0 && onSegment`) are num's `ok === 0 && inClosedBox` with the same closed boxes (`onSegment` re-tested `orient2d === 0`, implied). Held by `shared.test.ts`: exhaustively on [−1, 2]⁸ (65 536 segment pairs) and on 10⁴ random lattice pairs within ± 4·10⁶ cm drawn to include shared ends, ends on the other segment and collinear overlaps, against the old body written out; M0-a-01's 'N-2 faces' site green. |
| F-3 | `enter` / `overLimit` → `export { enterWriter as enter, overLimit } from '../tx/state.js'`; `lp` and `comparePoints` → `export { comparePoints, lp } from '../num/exact.js'`; `faceArea2` → `export { faceArea2 } from '../index/items.js'` — each copy deleted (`openTx`, `doomed`, `area2`, `Cm` imports dropped). | `enterWriter` / `overLimit` are the same bodies with the same texts (`'the batch exceeded its work limit'`, `TX_FACES_WALKED`); `lp` the same cast; `comparePoints` the same expression (−1 / 0 / 1); `faceArea2` the same sum of `area2` over `faceRouteRings(p, level, f, level)` on `lp` points, in ring order. Pinned by identity in `shared.test.ts` (each public name `toBe` the shared function). |
| F-4 | `fan.ts`'s π literal → `import { PI } from '../num/exact.js'`. | The same double (`3.141592653589793`). `shared.test.ts` scans the folder for a π literal and fan.ts for the import. |
| F-5 | `merge.ts` `neighbours(t, f)` stays private under its name; its doc says "faces sharing an edge with it … not a vertex one-ring". `claim.ts` `carries` → `edgeCarriesRow` (private), its doc naming `carriesRow` in `insert/splitThrough.ts` (M0-a-04's, untouched) as its vertex-row twin. | Renames and comments only. |
| §2 | `index.ts`: the scaffold sentence dropped (nothing else). `common.ts`: the module comment cites C-0214 (1), (2) for the isolated-point rule and the bent-cut refusal (no "integration g8 B-1"), and states where the shared predicates live; the fold comment cites C-0192 (1) in place of a B-FUZZ seed; `insideRing`'s doc names `crossingStep`. `split.ts`: C-0214 (2) in place of the round's name. `fan.ts`: `rayHit`'s doc names C-0192 (7) (doubles locate the hit; `planCut` judges it exactly — note N-6's suggestion). | Comments only; every refusal detail verbatim (J263 Q6). |

**API frozen (J263 Q1).** The exported names and their types, listed by the TypeScript checker over the pre-round mirror
and the tree, are identical for `src/faces/index.ts` (21), the package barrel `src/index.ts` (673) and every file of
the folder (`common.ts` 28, `split.ts` 5, `fan.ts` 2, `merge.ts` 3, `claim.ts` 5, `ops.ts` 8): `diff` empty. Every path
importer of a re-exported name resolves (`tsc -b` 0), by grep inside `plat/`: `src/arr/bandUnion.ts` (`enter`,
`opSave`, `overLimit`, `refuse`, `rollback`), `src/arr/corridorUnion.ts` (`enter`, `refuse`), `src/faces/split.ts`
(`comparePoints`, `enter`, …), `fan.ts` (`enter`, `insideRegion`, `lp`, …), `merge.ts` (`enter`, `faceArea2`, `lp`,
`overLimit`, …), `claim.ts` (`enter`, `lp`, `overLimit`, `segmentsTouch`, …), `test/num/copies.ts` (`comparePoints`,
`insideRing`, `segmentsTouch`), `test/index/items.test.ts` (`faceArea2`).

**NO-SHIFT (J260 (3), J264 (5)).** A probe (a copy of `bfuzz.test.ts` in the lane's mirror only, recording every
trial of both draw families: the op, its result or refusal code and detail, the SHA-256 of the arena bit for bit
(`test/tx/support.ts` `bits`) and the recomputed level digest of every level after each commit) ran on the pre-round
mirror and on the round's sources: PLAT_FUZZ_SEED=424242 × 4 000 — 61 817 trial lines, sha `3390e4d8…` before and after;
PLAT_FUZZ_SEED=7 × 2 000 — 30 948 lines, sha `87e4de55…` before and after; the line files byte-identical (`cmp`). The
refusal tallies per family, op and code are equal (below). The deterministic tests (the goldens: exact areas, child
order, record ids, refusal codes and pinned details) are green on both.

**Refusals of the registered families, before = after (J264 (5), J290).** Seed 424242 × 4 000 per family (seed 7 × 2 000
gives the same picture at half the counts):

| family / op | refusals (code: count) — identical before and after | input kind | verdict |
|---|---|---|---|
| main / splitFace | E_NOT_TWO_CROSSINGS 2 248 | UNLAWFUL (a random chord between two star vertices that §3.6 (1) – (3) refuses: through or near a vertex, outside, along an edge) | REFUSE: §3.6 (2) — "the stage's ladder picks another cut" |
| iso / splitFace | E_NOT_TWO_CROSSINGS 2 950 | UNLAWFUL (as above, and the isolated-point antenna, C-0214 (1)) | REFUSE (the ladder) |
| main / iso connectHole | E_NOT_TWO_CROSSINGS 1 184 / 1 384 | UNLAWFUL (a slit chord §3.6 refuses) | REFUSE (the ladder) |
| main / iso radialSplit | E_DEGENERATE `empty` 696 / 696; E_NOT_TWO_CROSSINGS 2 633 / 2 849; E_HOLE_CONTACT 79 / 63 | UNLAWFUL (no ray; one ray from an interior apex, rays §3.6 refuses, a ray into a hole) | REFUSE (the caller's rays; connectHole for a hole) |
| main / iso ringBand | E_NON_CONVEX 3 586 / 3 602 | LAWFUL (a concave or holed face) | **finding to the session** (N-c1-4): ringBand is built on §3.7's convex path only (C-0192 (8)); a REFUSE without a numbered `notBuilt` milestone |
| main / iso ringBand | E_BELOW_MIN_WIDTH 61 / 58 | UNLAWFUL (a band within attractCm) | REFUSE |
| main / iso ringBand | E_DEGENERATE `collapsed` 46 / 83 | UNLAWFUL (an inset core that collapses or meets the boundary, or an isolated point) | REFUSE |
| main / iso ringBand | E_NOT_TWO_CROSSINGS 39 / 72 | OUR OWN INTERMEDIATE (a corner cut from a convex face's corner to its own inset core corner, refused by the contact decision: 21 near a boundary vertex, 12 a segment outside, 6 touching an edge, in the main family) | **finding to the session** (N-c1-4), seed below |
| main / iso claimSubFace | E_DEGENERATE `collapsed` 133 / 135, `empty` 3 / 3 | LAWFUL ring drawn together by attraction (C-0192 (9)) / UNLAWFUL empty ring | **finding to the session** for `collapsed` (N-c1-4) |
| mergeFaces, absorbSliver, pinVertices | none | — | — |

### Old file → new file map (J263 Q8)

No test file was merged, split, renamed or deleted (§3.4: one subject per file). `support.ts`'s oracles are unchanged.
Every `describe` / `it` title is kept: 134 titles before, 143 after, none missing. Added: `test/faces/shared.test.ts`
(one describe, five its: the shared predicates against the folder's old bodies, the identity pins, the source pins);
`fan.test.ts` 'an apex inside a hole lies outside the face (insideRegion reads the holes): E_NOT_TWO_CROSSINGS';
`merge.test.ts` 'the area floor reads the face less its holes: …'; `split.test.ts` 'the vertex rule's radius is
attractCm: grazing the reflex vertex at 14.1 cm is refused by the judgement, at 28.3 cm the cut splits' (note N-2's
probe P1) and, in 'a cut crossing the antenna is refused', the refusal's detail (the contact rule's, not the bent
insertion's).

### Self-check (J183): the faults re-introduced in the lane's mirror

`--maxWorkers=1 --bail=1` over `test/faces` (B-FUZZ at the PR size 10⁴), each file restored from the tree and `cmp`-checked
after its run. The checks' earlier mutants are reconstructed from their descriptions in `checks/M0-a-07.md` (M01 – M15)
and the integration fix round's lane lines (M1 – M7 as G1 – G7).

| id | fault | result |
|---|---|---|
| C1 | F-1's fault: `insideRing` back on a private straddle / `orient2d` copy | KILLED — 'insideRing counts by crossingStep, …' |
| C2 | `crossingStep(…) !== 0` → `> 0` | KILLED — 'insideRing equals the folder's own ring test …' |
| C3 | `insideRegion` reads no hole | survived the sweep (pre-existing: no test drew an apex inside a hole) → pin added; KILLED — 'an apex inside a hole lies outside the face …' |
| C4 | F-2's fault: a `segmentsTouch` copy beside `segmentsMeet` | KILLED — 'the public names are the shared functions themselves …' |
| C5 | `num/exact.ts` `segmentsMeet` drops its fourth collinear end | KILLED — 'segmentsTouch equals the folder's own contact test …' |
| C6 | F-3's fault: an `enter` copy | KILLED — identity pin |
| C7 | `tx/state.ts` `overLimit`'s own detail changed | survived — PLAUSIBLY equivalent for the partitioners: each of their `overLimit` calls follows a `chargeTx` that set the failure, or a `work.total` test no charge since the last `chargeTx` can have moved (M0-a-06's T5d reading); the text is `tx/state.ts`'s, pinned by M0-a-06's tests |
| C8 | `index/items.ts` `faceArea2` sums the outer ring only | survived the sweep (pre-existing: no holed area floor) → pin added; KILLED — 'the area floor reads the face less its holes …' |
| C9 | `comparePoints` x before y | KILLED — B-FUZZ (`mergeFaces ∘ splitFace` restores the record) |
| C10 | fan.ts π back as a literal 3.1416 | KILLED — the π pin |
| C11 | `edgeCarriesRow` ignores the row's level | survived — pre-existing gap (a claim marker of the same key at another level is not drawn); note N-c1-2 |
| M01 | the vertex rule's radius `ATTRACT` → 1 | survived the sweep, and survives the PRE-ROUND code and tests as well (replayed: 123 / 123) — since C-0214 (2) an insertion bent through the vertex is refused with the same code → pin added (the 14.1 / 28.3 cm graze, the judgement's detail); KILLED |
| M04 | the one-point refusal off | KILLED — 'splitFace charges one face walk per ring …' |
| M05 | the boundary-touch rule off | survived the sweep, and the PRE-ROUND code and tests (123 / 123) — the bent insertion's refusal gives the same code → the antenna test now pins the contact rule's detail; KILLED |
| M08 | the fold rule off | KILLED |
| M10 | the record keeper → null | KILLED — B-FUZZ |
| M11 | splitFace's two-ring check off | KILLED — B-FUZZ |
| M12 | connectHole's outer-to-hole check off | KILLED |
| M14 | E_STRUCTURAL off | KILLED |
| M15 | the residue owner from the shortest boundary | KILLED — the residue-owner test (fix round 1's) |
| G1 | `planCut`'s isolated-point refusal off (M1) | KILLED |
| G3 | the bent cut thrown (M3, the original fault) | KILLED |
| G4 | ringBand's core-side isolated-point check off (M4) | survived, and the PRE-ROUND code and tests (123 / 123): equivalent at the result — the core inserted bent is put back and refused E_DEGENERATE `collapsed` by the side-by-side unbent check (C-0214 (2)); only the work charged differs; note N-c1-3 |
| G5 | the bent cut's rollback off (M5) | KILLED |
| G6 | `strayNear`'s closed-segment rule off (M6) | KILLED |
| G7 | the judged-position check off (M7) | KILLED |

26 faults: 19 killed in the sweep, 4 more after their pins (C3, C8, M01, M05), 3 equivalent or pre-existing (C7, C11, G4).
The first check's kills M04, M08, M10, M11, M12, M14, M15 stand; its M01 and M05 had stopped being killed before this
round (C-0214's bent-cut refusal answers both with the same code; replayed on the pre-round sources) and are killed again.

### Gates (in the tree, 2026-10-13)

| gate | command | result |
|---|---|---|
| install | `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 corepack pnpm install --frozen-lockfile` | exit 0, "Already up to date" |
| lint | `corepack pnpm lint` | exit 0: `lint: eslint 1137 files, 0 errors, 0 warnings`, the ten planted probe lines reported, `lint: probe-red ok`, `lint: 9 whole-tree checks` |
| build | `corepack pnpm build` | exit 0 (`tsc -b`, the esbuild bundles) |
| NEAR (full strength, B-FUZZ at 10⁴) | `corepack pnpm exec vitest run --maxWorkers=1 packages/kernel/test/faces packages/kernel/test/num packages/kernel/test/index/items.test.ts` | exit 0: `Test Files 25 passed (25)`, `Tests 247 passed (247)` (`test/faces` 12 files 131 tests, with the num copy table and the index's `faceArea2` site that import `faces/common.ts`) |
| RELATED (PLAT_FUZZ_RUNS=1000) | `corepack pnpm exec vitest related --run --maxWorkers=1 packages/kernel/src/faces/{common,split,fan,merge,claim,index}.ts` | exit 0: `Test Files 343 passed (343)`, `Tests 4274 passed (4274)` (6 898 s at one worker) |

### Notes (round C1; none fails the item)

| # | note | handling |
|---|---|---|
| N-c1-1 | M01 (the vertex rule's radius) and M05 (the boundary-touch rule), killed by the first check, had stopped being killed before this round: since C-0214 (2) an insertion bent through a vertex or across an antenna is refused with the same code (E_NOT_TWO_CROSSINGS), so a test that reads the code alone cannot tell the judgement's refusal from the insertion's. Replayed on the pre-round sources and tests (123 / 123 green under each). | Fixed in this round by two pins that read the judgement's detail (`split.test.ts`); both killed again. |
| N-c1-2 | C11: `claim.ts` `edgeCarriesRow` ignoring the row's level survives `test/faces` (no claim draws a marker of the same key at another level). | M4: a claim crossing an edge that carries the same `(claim, owner)` key at a coarser level. |
| N-c1-3 | G4 (the integration round's M4: ringBand's core-side isolated-point check off) survives the folder and the pre-round code: the core inserted bent through the point is put back and refused E_DEGENERATE `collapsed` by the side-by-side unbent check (C-0214 (2)) — the same result; only the work charged differs (the insertion's queries stay charged). | None (an equivalent at the result; the early check saves the insertion's work). |
| N-c1-4 | Refusals of the registered families that are not unlawful input (J290), unchanged by this round (NO-SHIFT binds it) and routed to the session with their seeds (`PLAT_FUZZ_SEED=424242 PLAT_FUZZ_RUNS=4000`, `test/faces/bfuzz.test.ts`, either family): (a) ringBand E_NON_CONVEX on a concave or holed face (3 586 main) — C-0192 (8) builds §3.7's convex path only, a REFUSE with no numbered `notBuilt` milestone; (b) ringBand E_NOT_TWO_CROSSINGS (39 main, 72 iso) — a corner cut from a convex face's corner to its own inset core corner refused by the contact decision: geometry of our own making (21 near a boundary vertex, 12 a segment outside, 6 touching an edge); (c) claimSubFace E_DEGENERATE `collapsed` (133 main) — a lawful ring whose sides the insertion's attraction draws together (C-0192 (9)). | The session (fix rounds outside a consolidation pass). |

## Round C1 — the closing check's notes (lane `check/M0-a-07-consolidate-close-1`, flow flow-7, 2026-10-14)

None of these notes fails the item; the verdict is in `checks/M0-a-07-c1.md`. The mutant and probe ids are that
file's: X01 – X17 are this checker's own, and M01 – M14 are the first check's mutants rebuilt.

| # | finding | evidence | handling |
|---|---|---|---|
| N-c1c-1 | **M02** is the first check's "interior point's edge radius `ATTRACT` → 1". The first check killed it, through B-FUZZ only (its N-2). It now survives `test/faces` and B-FUZZ at 10⁴, on the round's sources and on the pre-round sources and tests alike. The cause is the C-0214 (2) bent-cut refusal. A cut whose interior point the insertion draws onto the edge is now refused with the same code and nothing written, where it used to be thrown. So no test that reads only the code can tell the judgement's refusal from the insertion's. This is the class the author's N-c1-1 fixed for M01 and M05. | Pre-round, under M02, at `PLAT_FUZZ_SEED=20261014`: `Tests 123 passed (123)`. Probe on the code: [[1000, 0], [1500, 1985], [2000, 0]] → "the cut's point (1500, 1985) lies within attractCm of the boundary". The same probe under M02: "the insertion bent the judged cut between (1000, 0) and (1500, 1985) …", with the arena unchanged. [[1000, 0], [1500, 1970], [2000, 0]] splits in both. | M4, or the item's next fix round: pin the judgement's detail for an interior point 15 cm and 25 cm below an edge, as `split.test.ts` does for M01. The probe's three cuts are ready fixtures. |
| N-c1c-2 | **X05** turns `planCut`'s self-crossing test off. It survives `test/faces` and B-FUZZ at 10⁴. 'the cut doubling back within attractCm of itself, and crossing itself' reads only the code. Under X05 the insertion's bent-cut check (C-0214 (2)) refuses the figure-eight with the same code and nothing written. So the decision moves from the judgement (C-0192 (1): before any write) to the insertion's backstop, and the work it charges differs. | Probe on the code: three self-crossing cuts → "the cut crosses itself (§3.6 (2))", nothing written. Under X05: "the insertion bent the judged cut between …", nothing written. | M4: pin the detail 'the cut crosses itself' in that test. |
| N-c1c-3 | **X04** makes `planCut`'s boundary contact a proper crossing only, dropping touches and collinear overlaps. It survives `test/faces` and B-FUZZ at 10⁴. It is plausibly equivalent (PLAUSIBLE): a touch at a boundary vertex is caught by the vertex rule, an interior cut point on an edge by the attractCm rule, and a collinear overlap by the vertex rule or the along-an-edge rules. The whole check off (M05) is killed by the antenna test's detail pin. | Mutant log `mut-X04` and `mut-X04-fuzz`: exit 0. | None (noted), like the first check's N-5. |
| N-c1c-4 | **X13 / X14** make `claim.ts` `edgeCarriesRow` ignore the ordinal / the level. Both survive `test/faces` and B-FUZZ at 10⁴. X13 is equivalent for the default `(claim, owner)` marker, because the claim role is not indexed: a claim row with ordinal 1 throws "role claim is not indexed: its ordinal is 0 (§2.2 rule 7)". It differs only for caller `opts.rows` of an indexed role that shares an entity. X14 is the author's C11 / N-c1-2, and this checker's probe adds a finding. Owner `x:1` claims [1000, 3000] × [500, 1500] at L1, then [1000, 2000] × [500, 1000] at L2, sharing a corner and two sides. The code refuses the second claim `E_DEGENERATE collapsed`, before this round and after it, since the body is untouched. Under X14 it commits and owns L2 records outside the L2 ring. | Probe `zz-claimrow` on the code: `LEVEL a=ok b=E_DEGENERATE collapsed`. Under X14: `b=ok`, and the records at (2500, 1200) and (2500, 700), outside the L2 ring, are owned. | M4: a test of a claim whose marker key also lies on edges at another level. **To the session (J290)**: the input kind of one entity's claim at two levels sharing sides. If it is LAWFUL, the `collapsed` refusal is a make-it-succeed fix round for M0-a-07, with the probe above as its fixture. If it is UNLAWFUL, the refusal stands. Pre-existing; this round left it unchanged. |

## Round C2 — the closing check's blocker B-c1-1 (lane `build/M0-a-07-consolidate-2`, flow flow-7, 2026-10-14)

The fix is comment-only in the source, with one new pin. No file moved, none was merged or split (J263 Q8: the
old → new map is the identity). No export changed: `faces/index.ts`, the barrel and every faces file are untouched but
for `common.ts`'s two doc comments. The esbuild bundle `packages/kernel/dist/index.js` is byte-identical when built
from the source before and after (sha256 19c0d024081eb9d2…), so no digest, golden, refusal or pinned text can move,
and the refusal counts of the registered families are the closing check's 22 570 before = after.

| id | what | evidence | where it stands |
|---|---|---|---|
| N-c2-1 | **B-c1-1**: `insideRing`'s doc said the point is a half-lattice point no edge passes through. It now says what the callers pass: a doubled lattice point (a vertex, a cut point, an apex, a core corner) or a cut segment's doubled midpoint. Off the ring the parity decides (C-0314's off-ring reading, doubled). On a ring edge the answer is the half-open parity's, not a rule, and `planCut` (interior points, segment midpoints), `radialSplit` (the apex) and `ringBand` (`coreClear`, the core corners) refuse or land such a point by their own attractCm and along-an-edge tests. `insideRegion`'s "strictly inside" now reads "inside … by `insideRing`'s parity; off the rings strictly inside". | New `it` in `test/faces/shared.test.ts`: "insideRing on a ring edge gives the half-open parity's answer, not a rule: planCut and radialSplit refuse or land such a point by attractCm". On the lower face of `halves()` it pins the on-edge answers (bottom and left inside, top and right outside; equal to `insideDoubledRing`), the checker's `splitFace` cut [(0, 1000), (2000, 0), (4000, 1000)] refused by the attractCm detail verbatim, and `radialSplit` from the apexes (2000, 0) and (0, 1000) with one ray landed on the boundary (two sectors). Mutants in the lane's mirror, each red on the new `it` and green without: K1 `planCut`'s interior attractCm test off; K2 / K2b `radialSplit`'s apex-on-an-edge test off; K3 `insideRing` closed on its edges (also red on "insideRing equals the folder's own ring test …"). | fixed |
