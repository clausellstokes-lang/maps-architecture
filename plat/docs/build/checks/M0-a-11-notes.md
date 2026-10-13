# M0-a-11 — the checker's notes (for the hardening pass; N-45)

Lane `check/M0-a-11-close-s1` (flow flow-7, stage group S), 2026-10-08. These notes do not fail the item (N-45, J180).
The one blocker of this round, the M13 survivor, is in `checks/M0-a-11-s1.md`, which also defines the mutant ids (M…)
and probe ids (Z…, P…) used below. The probes ran in the checker's scratch mirror
`~/maps-scratch/waves/check-M0-a-11/plat` (probe file `packages/kernel/test/skeleton/zzcheck.test.ts`, scripts under
`~/maps-scratch/waves/check-M0-a-11/dbg/`), never in the real tree.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-1 (KI) | **Asymmetric spur walks can be refused.** The pre-clean's two removals do not commute. A spur may go out and come back over different vertex sets, with an extra collinear vertex on one side only. If the spur also continues an adjacent boundary edge straight on, `mergeCollinear` removes the spur's root before `dropSpurs` sees a tip. The tip is then left with two different neighbours and is refused `sharpCorner`. That refusal is fail-safe: the reader takes its downgrade. Repros (CONFIRMED, probe Z1 and `dbg/d1.ts`): `[[(200,200),(200,100),(100,300),(300,300),(200,0),(200,100),(200,300)]]` is refused `sharpCorner` at (200, 300); a naive reduction that drops spurs first accepts it as the quadrilateral. The hole ring of `dbg/d1.ts`, a spur tree whose return path holds a vertex its outward path lacks, is refused at (1850, 7671). In 60 000 random small-grid ring sets, 5 are refused this way and **0** are accepted wrongly (every ring set both accept is equal to the reference). A planar arrangement's face walk is symmetric, because both sides of an edge hold its vertices, so this input does not come from S6/S8 faces. CITY fusion seed 1 has 0 such spurs among 30 exact spur tips (P2). | In the hardening pass, either let a spur tip outrank a straight-on merge of its root, or define a spur geometrically: a fold-back whose return point lies on the outgoing segment and whose walk continues along the boundary. Then pin the two repros. | M4 |
| N-2 (KI) | **Non-simple rings: the refusal code depends on the reduction order.** On 5 of the 60 000 random ring sets of Z1, `prepareRings` and the naive reference refuse with different codes, for example `sharpCorner` against `holeContact` on a self-touching hole. Both refuse, so nothing runs and nothing is wrong. | None needed. Pin a code only if a reader ever branches on it for non-simple input. | M4 |
| N-3 | **A spur that crosses its ring or a hole is dropped, and the face is accepted.** CONFIRMED by `dbg/d4.ts`. The rectangle with the spur (1200,1000) → (1200,−500), which crosses the bottom edge, is accepted as the rectangle. An outer-ring spur reaching into a hole, (800,1000) → (800,500), is accepted as rectangle plus hole. Before the round, both took `sharpCorner`. The spur encloses no area, so the skeleton of the accepted face is correct for the region. The author's property test generates such spurs on purpose ("crossing what it may"). An arrangement face cannot hold a crossing spur. | Record in C-0276 that a spur's crossings are not checked, because it is dropped before `simple`/`ringsMeet`. Alternatively, refuse `notSimple` when a dropped spur meets another edge. Choose when an outside caller (M1 footprints) can pass such rings. | M4 |
| N-4 | **The seam edge map is not pinned (survivor M14, judged equivalent).** M14 keeps `out[0]` instead of `out[n−2]` in `dropSpurs`'s first seam case. That changes only `SkeletonGraph.edges` across the seam. For the walk `[R, P1, P2, P3, R, T]` the code gives edges `{3→4}, {4→1}`; M14 gives `{3→0}, {0→1}` (`dbg/d3.ts`). Both satisfy `types.ts`'s interface statement ("a merged run, or a dropped spur, spans the vertices between"), and no M0 reader consumes `from`/`to`. They differ only from the wording of C-0276 (1) and (3): the first visit in walk order is kept, and the spur lies in the edge that *starts* at it. `spur.test.ts:78` (the seam test) strips the edge map, so C-0276's "the edge map pinned" holds for the non-seam pins only. | Pin the seam edge map, for example with the walk above, when a roof reader first consumes `SkeletonEdge.from`/`to`. Alternatively, loosen C-0276 (3) to "an edge adjacent to the root's kept visit". | M1 (RoofSpec, the first edge-map reader) |

## Consolidation round C1 (build/M0-a-11-consolidate-1, 2026-10-13): the builder's map and evidence (J263 Q8, J183)

Round R13's skeleton part of `consolidation/kernel-plan.md` (§1.12 S-1, §2's skeleton rows and index rule, §3.4: no
merges); rulings J260 (3), J263 Q1, Q6, Q8, J264 (5), J270 (a), (b), J290; choices row C-0354. The mutant ids below
(A…, H…) are this round's; K… are `checks/M0-a-11.md`'s and M… `checks/M0-a-11-s1.md`'s, re-planned on today's lines.

**What changed.** (1) S-1, N-2: `prepare.ts`'s `segmentsMeet(a, b, c, d)` keeps its name and point-typed signature
(`test/num/copies.ts` imports it by path) and becomes a one-line adapter to `num/exact.ts`'s `segmentsMeet(ax … dy)`.
(2) S-1, N-3: `prepare.ts`'s `insideRing(ring, p)` keeps its name and signature and becomes a one-line adapter to
`num/exact.ts`'s `insideLatticeRing(ring, p.x, p.y)`. (3) S-1, half-plane: `roof.ts`'s and `engine.ts`'s private
`half(x, y)` are gone; both import `halfPlaneOf` from `num/exact.ts` (by path; nothing added to any index). (4) §2:
`prepare.ts`'s module comment and `dropSpurs`'s doc cite C-0276 / C-0283 in place of the N-52 (3) narration (the seam
rule stated: a tip keeps the root's visit just before it); `types.ts`'s `SkeletonEdge` doc likewise; `skeleton/index.ts`
drops the scaffold sentence (export lines byte-identical). (5) Test comments lose their round history (fix round 1,
F-1 / F-2, session fix round S1, "before that round", the checker's probe provenance); no describe or it title changed.
(6) New pin `test/skeleton/golden.test.ts` (§3.8 *Decision*: a skeleton code change that moves any output is a declared
shift): six faces' whole `skeleton(rings, 'roof')` results pinned by SHA-256, the rings written out as lattice literals.

### Old file → new file map (J263 Q8)

No file was renamed, merged or split; every describe and it title is kept (contract 12, downgrade 5, fixtures 8,
known 15, property 2, roof 20, spur 14, translation 3, validator 18, worklimit 7 title lines, identical before and
after); one file added.

| old file | new file | change |
|---|---|---|
| `src/skeleton/prepare.ts` | same | S-1 adapters (`segmentsMeet`, `insideRing`); module comment, `dropSpurs` doc |
| `src/skeleton/roof.ts`, `src/skeleton/engine.ts` | same | private `half` → `num/exact.ts`'s `halfPlaneOf` |
| `src/skeleton/types.ts` | same | `SkeletonEdge`'s doc (C-0276, C-0283 (2)) |
| `src/skeleton/index.ts` | same | the scaffold sentence dropped; export lines byte-identical |
| `src/skeleton/{coalesce,skeleton,validate}.ts` | same | unchanged (byte-identical) |
| `test/skeleton/{contract,downgrade,spur,translation}.test.ts` | same | comments only |
| `test/skeleton/{fixtures,known,property,roof,validator,worklimit}.test.ts`, `support.ts` | same | unchanged |
| — | `test/skeleton/golden.test.ts` | new: the §3.8 *Decision* digest pin (6 cases) |

### S-1: each site's convention and its equivalence (CONFIRMED by execution, the reading by inspection)

| site | convention | old body | new body | why identical |
|---|---|---|---|---|
| `prepare.ts segmentsMeet` (N-2) | lattice points, closed segments (a touch at an end and a collinear overlap count) | `Math.sign` of the four `orient2d`s; proper crossing `o1·o2 < 0 && o3·o4 < 0`; then `oᵢ === 0` and the closed box | exact.ts: `(o1 > 0 && o2 < 0) ∥ (o1 < 0 && o2 > 0)` for each pair; then `oᵢ === 0 && inClosedBox` | the sign product is negative exactly when the signs are strictly opposite (−0 and 0 neither, in both forms); the four collinear cases test the same point against the same closed box |
| `prepare.ts insideRing` (N-3) | lattice (undoubled); the OFF-RING reading, even–odd | edges (ring[j], ring[i]); straddle `(a.y > p.y) !== (b.y > p.y)`, side `b.y > a.y ? o > 0 : o < 0` | `insideLatticeRing`: `crossingStep` ≠ 0 toggles | an upward edge (a.y ≤ p.y < b.y) counts iff o > 0, a downward one (b.y ≤ p.y < a.y) iff o < 0, in both; the same edge set, and parity is order-free. The point is never on the ring: `prepareRings` asks only a hole's first vertex after `ringsMeet` refused every contact |
| `roof.ts half`, `engine.ts half` | an integer direction vector (engine: an edge vector or its negation) | `y > 0 ∥ (y === 0 && x > 0) ? 0 : 1` | `halfPlaneOf`: the same expression | textually identical |

### NO-SHIFT and API (J260 (3), J263 Q1)

* **Before-image:** the tree before the first edit, equal file for file to `landed/M0-a-11.json` (lane
  build/M0-a-11-fix-s2), kept in the lane's scratch outside plat/; the mirror built from it.
* **Probe** (a script outside plat/, run in the mirror on the before-image and then on the round's sources): for each
  face, `prepareRings`, `skeleton(rings, use)` for roof, spine (an injected stand-in axis) and regions, and
  `convexNearRectangle` (+ `exactRoof` hip / gable / pyramid × both ridge axes where it passes), every number written
  exactly (−0 marked); the faces: the 2 000 corpus footprints (`bench/fixtures/skeleton-corpus/`), §13.1's holed polygons
  at seeds 1, 2, 3 (3 × 1 000), rectangles 20 × 10 m every 0.07°, squares every 0.13°, n-gons 3 – 64, L / T / U and the
  notched rectangle every 11°, 300 rotated squares (7 473 faces); plus prepare.ts's two file-level predicates on 200 000
  random small-grid segment quadruples and 50 000 ring / point pairs. 60 731 lines, sha256 `d99cb7155091c0e9…` before
  and after, byte-identical.
* **Differential probe** (the before-image's skeleton folder beside the round's in one process): 60 000 random
  small-grid ring sets (1 – 3 rings), refusal-rich — `notSimple` 25 294, `sharpCorner` 18 515, `degenerate` 5 326,
  `holeOutside` 1 111, `holeContact` 884, ok 8 870 — `prepareRings` on every set and `skeleton(…, 'roof')` and
  `convexNearRectangle` on every tenth: 0 differences.
* **The corpus record** (`corepack pnpm bench -- skeleton`, mirror, PLAT_BENCH_OUT in the scratch): the summary
  `docs/build/summaries/M0-a-12.json` byte-identical to the committed one before and after; the full report
  `skeleton-corpus.json` byte-identical before and after (`70d20e31bfe9f198…`): roof and spine 1 998 validated, 2
  downgrades, 0 work-limit hits, 0 failures, events 13 450.
* **Exports** (the TypeScript checker's `getExportsOfModule`): the barrel `src/index.ts` 673 names, `skeleton/index.ts`
  28, and file level `prepare.ts` 6 (`Prepared PreparedRings TAN_5_DEG insideRing prepareRings segmentsMeet`), `roof.ts`
  10, `engine.ts` 10, `types.ts` 13, `skeleton.ts` 3, `coalesce.ts` 3, `validate.ts` 2 — identical before and after.
* **The fixture bar** (here): `fixtures.test.ts` at PLAT_SKELETON_SEED 1, 2, 3: 1 000 runs each, 0 crashes, 0 validator
  failures, 0 arcs outside, 0 over the work law (max events per (n + r) 0.85 / 0.82 / 0.82).

### Refusals (J264 (5), J290, N-58)

Contract refusals over the registered families (the corpus and the §13.1 fixtures of the probe, 7 473 faces): **0
before, 0 after**; work-limit hits 0 → 0. Validator downgrades 2 → 2 per use, corpus faces 1144 (`arc 3 crosses arc
10`) and 1840 (`arc 6 crosses arc 9`), planarity, the same before and after and the 2 the committed M0-a-12 summary
records: LAWFUL input (corpus footprints), not a contract refusal; the reader takes its typed downgrade (§3.8, within
the corpus bar's 0.5 %). Its verdict under J290 is MAKE-IT-SUCCEED (an engine repair), which moves output and so is not
this no-shift round's: routed to the session as R-c1-1 below. The random ring sets of the differential probe are
UNLAWFUL by construction (self-crossing, touching, sharp); their verdict is REFUSE, typed (`contract` with its refusal
and vertex, events 0) and visible as each reader's downgrade (§3.8 names the alternative per reader).

### Mutants (the lane's mirror, `test/skeleton/` with `--bail=1`, `--maxWorkers=1`; each file restored and `cmp`-clean)

| id | fault | result |
|---|---|---|
| A1 | `segmentsMeet` adapter never meets | KILLED — contract 'a hole touching the outer ring …' |
| A2 | adapter reads c–c (d dropped) | KILLED — the same |
| A3 | adapter loses the collinear cases | KILLED — the same |
| A4 | `insideRing` negated | KILLED — the same (first red in file order) |
| A5 | `insideRing` always inside | KILLED |
| A6 | `insideRing` on the doubled convention | KILLED |
| A7 | `insideRing` reads (y, x) | KILLED — fixtures '1 000 holed polygons' |
| H1 | roof's wraps counted at the 0 → 1 crossing | survives — EQUIVALENT: in a cyclic 0/1 sequence the 1 → 0 and 0 → 1 transitions are equally many (probe: 0 lines move) |
| H2 | roof's half-plane on swapped coordinates | survives — EQUIVALENT: any half-open split of the directions by a line through the origin counts the winding of a turn sequence with every step in [0, π) (fold-backs are refused before) (probe: 0 lines move) |
| H3 | engine: the spokes' half order reversed | KILLED (by golden.test.ts 'corpus 556'); before the golden it survived and moved 42 probe lines (14 faces) |
| H4 | engine: p's half on swapped coordinates | KILLED — fixtures 'equal-width strips'; golden 'corpus 1236' |
| H5 | `halfPlaneOf`: the y = 0 boundary on the −x ray | KILLED (golden 'holed 1.137'); before the golden it survived and moved 135 probe lines |
| H6 | `halfPlaneOf`: the whole x-axis in half 0 | KILLED — fixtures 'holed'; golden 'holed 1.189' |
| K01 | the 5° threshold halved | KILLED |
| K03 | hole contact not refused | KILLED |
| K04, K04b | a hole outside the outer ring / inside another hole not refused | KILLED (contract 'the input checks …') |
| K05 | not simple not refused | KILLED |
| K06 | no collinear merge | KILLED (spur 'a spur of two segments …') |
| K07 | the canonical start at the highest vertex | KILLED |
| K08 | the work law + 1 | KILLED (worklimit 'the law') |
| K16b | an unvalidated graph returned | KILLED (downgrade '(a) the natural input …') |
| K38 | the micro-ridge never an apex | KILLED (roof 'a hip ridge shorter than minEdge …') |
| M04, M05, M12 | spur: both duplicates dropped / the seam's last-vertex case / no spur pass | KILLED |
| M13, M14 | merge before the spur pass / the seam keeps `out[0]` | KILLED (spur.test.ts's S2 pins) |

28 mutants (H1 – H6 run a second time with the golden in place): 26 red, H1 and H2 equivalent (above).

### Notes

| id | observation | handling | milestone |
|---|---|---|---|
| R-c1-1 | Two corpus footprints (1144, 1840) take the validator's planarity downgrade on every reader: lawful input, recorded by M0-a-12's summary since its landing, unchanged by this round. | Session finding (J264, J290): an engine repair (MAKE-IT-SUCCEED) is a declared output shift, outside a no-shift round. | hardening |
| R-c1-2 | `golden.test.ts` pins whole results by digest: a deliberate engine change turns it red by design (§3.8 *Decision*'s declared shift); the change's round re-records the six digests with its choices row. | None. | — |

## Closing check C1 (check/M0-a-11-consolidate-close-1, 2026-10-13)

The closing checker's notes; none fails the round (N-45, J180). Its verdict is `checks/M0-a-11-c1.md`, which defines
the mutant ids (A…, H…, W0; K… and M… re-planned from `checks/M0-a-11.md` and `-s1.md`) and the probes
(`zzc-probe`, `zzc-diff`, `zzc-wraps`, run only in the checker's scratch mirror).

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-c1c-1 | **`roof.ts`'s half-plane split is unobservable.** `convexNearRectangle` reads `halfPlaneOf` only to count wraps, and with every turn in [0, π) (a clockwise turn and a fold-back are refused first) the 1 → 0 steps across any half-open split of the circle by a line through the origin number the turning number. So the mutants H1 (the split on swapped coordinates) and H3 (the closed split `y ≥ 0`) survive and are EQUIVALENT: CONFIRMED by execution on 12 232 left-turning rings (every {n/k} star for n ≤ 13, every start, both orientations, and 4 000 rectangles with a collinear mid-edge vertex): the results' digest is identical under both, while dropping the wrap check (W0) moves it and is killed by roof.test.ts's pentagram case. The engine's use of the split is pinned (H4 – H7 red, by `golden.test.ts`). | None: no test can or need pin the split in `roof.ts`; `halfPlaneOf` itself is pinned in `test/num/exact.test.ts`. | — |
| N-c1c-2 | **The lawful-input validator downgrades, re-measured.** Corpus footprints 1144 (`arc 3 crosses arc 10`) and 1840 (`arc 6 crosses arc 9`), seed 20261004, take the planarity downgrade on every reader, 2 → 2 across the round (the checker's probe and `corepack pnpm bench skeleton`, before and after); the count did not rise. LAWFUL input, verdict MAKE-IT-SUCCEED (an engine repair, a declared output shift). | Session finding, as R-c1-1 above; nothing new to route. | hardening |
