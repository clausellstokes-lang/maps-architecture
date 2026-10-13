# M0-a-12 — notes (not failing lines)

## Consolidation round R13, the medial folder's share (lane `build/M0-a-12-consolidate-1`, flow-7, 2026-10-13)

The round applies M-1 of `plat/docs/build/consolidation/kernel-plan.md` §1.12 (on R1's `num/exact.ts`, N-2) and §2's
module-index rule inside M0-a-12's owns (J260, J263 Q1, Q6, Q8, J270 (a), (b)). The row is C-0355. Nothing is added to,
removed from or renamed in any folder index or the barrel; no behaviour changes.

### Old file → new file map (J263 Q8)

| old file | new file | what moved |
|---|---|---|
| `packages/kernel/src/medial/axis.ts` | the same file | its private `segmentsMeet` (the closed-segment contact test, 16 lines) deleted; `crossesRing` calls `num/exact.ts`'s `segmentsMeet`, imported by path (M-1); the comment above `crossesRing` names the shared test and its convention |
| `packages/kernel/src/medial/index.ts` | the same file, comment only | the scaffold's provenance sentence dropped (§2); the description, the item id and the adapter re-export note kept; C-0176 cited beside C-0172; the exports byte-identical |
| `bench/src/skeleton/index.ts` | the same file, comment only | the same provenance sentence dropped (the folder index of the bench harness; §2's rule); nothing else |
| `bench/test/skeleton/medial.test.ts` | the same file, comment only | the header's round token "fix round 1;" dropped; every `describe` / `it` title verbatim |
| `packages/kernel/test/medial/{support,delaunay.test,axis.test,dual.test}.ts`, `bench/test/skeleton/{corpus,runner,timing}.test.ts` and its fixture, `src/medial/dual.ts`, `src/adapters/delaunator.ts`, `bench/src/skeleton/{corpus,runner}.ts`, `bench/fixtures/skeleton-corpus/footprints.json` | the same files, byte-unchanged | nothing (§3.4: test/medial/ has no merges; the adapter and the harness carry no round narration) |

The grep for round narration over the owns (`fix round|round [0-9]|\bround\b|retired|is gone|used to|replaced|\bS[0-9]\b|N-[0-9]+|mutant|probe|first pass|scaffold|checker|seat|no longer|instead of|earlier`): the two
provenance sentences and the test header's token above are the only round narrations; the other hits are the design's
own words (S1 the pipeline stage, the refinement's rounds, "the replaced rule (C-0172 (5))" naming the superseded row a
test guards against, "the file-open log the checker reads" stating the log's purpose) and stay.

### M-1: the two bodies diffed, and the convention

The deleted copy and `num/exact.ts`'s `segmentsMeet` are the same algorithm statement for statement: the same four
`orient2d` calls with the same argument order (the same `orient2d`: `num/index.ts` re-exports `num/predicates.ts`'s, which
exact.ts imports); the same proper-crossing test `((o1 > 0 && o2 < 0) || (o1 < 0 && o2 > 0)) && ((o3 > 0 && o4 < 0) ||
(o3 < 0 && o4 > 0))`; the same four collinear clauses `oK === 0 && <closed box>(segment, end)` in the same order, the
closure `within(px, py, qx, qy, rx, ry)` and exact.ts's `inClosedBox(ax, ay, bx, by, qx, qy)` being the same four
`Math.min` / `Math.max` comparisons. The convention: closed segments — a proper crossing, an end of one on the other (a
touch, a T), a collinear overlap, and a one-point segment as a point test all meet. The medial axis calls it with ring
edges in the local frame (lattice integers) and arc ends that are circumcentres (doubles off the lattice), where the
signs are `orient2d`'s double evaluation — the identical expression on both sides, so the identical answer.
Executed: the verbatim pre-round body against exact.ts's on 4 006 561 inputs (tiny lattice windows rich in collinear,
touching and one-point cases, the full ±2²³ range, doubles as the axis passes, half-lattice doubles, NaN / ±∞ / ±0, and
the exhaustive 3⁸ window of {−1, 0, 1}): 861 845 meeting, 0 differ. `test/num/equivalence.test.ts`'s copy table
(`N-2 medial`) now finds no private copy and asserts the import instead (`importsShared`): `test/num/` 13 files
108 / 108 green.

### NO-SHIFT (J260 (3), J264 (5)) — before-image: a copy of the tree before the round's first edit

| measure | before | after |
|---|---|---|
| exported names (TypeScript checker): `src/index.ts` 673, `medial/index.ts` 18, `medial/axis.ts` 12, `medial/dual.ts` 3, `adapters/delaunator.ts` 3, `bench/src/index.ts` 0, `bench/src/skeleton/index.ts` 27 | listing sha256 `0b99761b…0e257d` | identical |
| `medialAxis` over the corpus at steps 100 / 50 / 400 (2 000 each), M0-a-11's §13.1 holed polygons seeds 1 – 3 (1 000 each), 200 notched footprints, 6 000 seeded random ring sets (crossing and touching rings, steps 100 / 40): sha256 of every result's JSON | corpus@100 `94133ffe…2133a`, @50 `7c69e27c…08aab`, @400 `19923622…143fd`; holed 1 `7d56724c…3ec9f`, 2 `79d0a277…08171`, 3 `a7890b2c…43aa8`; notched `b3f49203…5a9fa`; random@100 `8f4fd219…8b568`, @40 `b68bdcb2…52a8`; report sha256 `f5da40b7…240a4` | identical, byte for byte |
| refusals of the registered families (lawful) | 0 of 15 200 calls | 0 |
| the unlawful family (off-lattice, two inputs) | 2 × `E_OUT_OF_RANGE` | the same |
| unresolved (answered, not refused: self-crossing random ring sets) | 2 712 @100, 2 730 @40 of 3 000; 0 elsewhere | the same |
| `corepack pnpm bench -- skeleton` summary `docs/build/summaries/M0-a-12.json` | `c8f82f39…a09225` | byte-identical (exit 0: roof / spine 1 998 validated, 2 downgrades 0.10 %, 0 work-limit, 0 failures, inputs 2, outside plat/ 0) |
| the item's tests | 7 files 64 / 64 (close-r1's count, checks/M0-a-12.md) | 7 files 64 / 64 (the tree; the mirror with the round's files 64 / 64 too) |

Refusal verdicts (J290, N-58): the one class met is UNLAWFUL — an off-lattice coordinate — REFUSE `E_OUT_OF_RANGE` typed
and visible; snap is the kernel's door (§3.2 (7)), so no user reaches the class through §11.4's doors. No LAWFUL and no
OUR-OWN-INTERMEDIATE refusal exists in the families.

### Mutants re-killed (J183; the item's own folders `test/medial/` and `bench/test/skeleton/`, `--maxWorkers=1 --bail=1`, one at a time in the lane's mirror, each file restored and `cmp`-checked)

| id | mutant | origin | result |
|---|---|---|---|
| MS1 | `crossesRing`'s `segmentsMeet` guard deleted (the changed line) | M-1 | red: "merges a centre only with centres inside the face: the random property's counterexample, every node inside" |
| X15 | both crossing guards deleted (today's code) | checks/M0-a-12.md r0 | red: the same test |
| MS3 | exact.ts's proper crossing read as a line crossing (one side test) | M-1's convention | red: "M0-a-11's §13.1 holed polygons at seeds 1, 2 and 3 …" |
| MS4 | the call's arguments wired to the arc alone (`segmentsMeet(u, v, u, v)`) | M-1's call | red: the same holed-polygons test |
| MS2 | exact.ts's four collinear clauses dropped (proper crossings only) | M-1's convention | survives in the medial folder — equivalent there: every contact that is not a proper crossing is a distance 0 < MEDIAL_TOUCH_CM, which `crossesRing`'s second guard reads (the mutually-covering guards of the first build, X07 / X15); red at its home, `test/num/exact.test.ts` 3 failed (the touch / T / overlap cases, the 4 × 4 grid and the property against the BigInt reference) |
| X1 | `MEDIAL_PRUNE_RATIO` π → 1 | r0 | red: the axis-aligned rectangles' ridge test |
| X6 | `MEDIAL_MERGE_CM` 0.1 → 0 | r0 | red: "a square is one node at its centre …" |
| X9 | the node sort deleted | r0 | red: the ridge test |
| X10 | the arc sort deleted | r0 | red: the ridge test |
| X14c | `MEDIAL_STEP_CM` 100 → 80 | r0's survivor, close-r1 | red: "the default step is 100 cm …" |
| X17 | the fallback node of least clearance | r0 | red: "a ring set whose inside triangles give no arc at all is its one inside node of greatest clearance (C-0176 (3))" |
| R9 | the per-file outside-plat refusal disabled | r0's survivor, close-r1 | red: "refuses a corpus file that resolves outside plat/ …" |

## Closing check C1 (lane `check/M0-a-12-consolidate-close-1`, flow-7, 2026-10-13) — notes, not failing lines

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-c1-1 | The closing check's mutant MB4 — `num/exact.ts`'s proper-crossing test read non-strictly (`>=` / `<=`), so two collinear but disjoint segments "meet" — leaves the item's folders green (`test/medial/` + `bench/test/skeleton/` 64 / 64) and every `medialAxis` digest of the check's families identical (corpus at 100 / 50 / 200 cm, §13.1 holed seeds 1 – 3, 300 notched at 100 / 37 cm, 2 598 random ring sets, frames and wedges); it is red only at the predicate's home (`test/num/` 7 failed, the N-2 equivalence table). Under it an arc whose two circumcentre ends lie exactly on a ring edge's line beyond that edge would be dropped; no medial test builds such an arc. Not a fail: the shared contact test is pinned where it lives (C-0314 (2)), the medial folder reads it unchanged, and the class was not met on any input probed. MB2 (the end-on / collinear clauses dropped) and MB3 (the closed box made open) are equivalent in the medial folder — a contact that is not a proper crossing puts an end of one segment on the other, at clearance 0 < `MEDIAL_TOUCH_CM`, which `crossesRing`'s second guard reads — and red at the home too (7 and 14 failed). | A medial-level pin: a face built so that an arc's ends fall on the extension of a ring edge (an axis-aligned T or notch whose circumcentres sit on an edge's line), asserting the arc is kept and the graph is the same with the contact test read strictly. | M4 |
