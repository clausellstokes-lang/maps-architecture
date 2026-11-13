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
merges); rulings J260 (3), J263 Q1, Q6, Q8, J264 (5), J270 (a), (b), J290; choices row C-0359. The mutant ids below
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

## Hardening round S3 (build/M0-a-11-fix-s3, 2026-10-14): the builder's row-by-row outcome (J237 (2), J264, J290 / N-58)

The round's lines: Q67 / census D-01 / RQ7 (A) and (B) (N-61 (7); `rulings-hardening-1.md` §7, §8 (1), (2), (5); §3.8
*Numeric contract* as amended by item 130 (f)), Q63 / census D-02, Q73 (rulings §7, §8 (2)). The inventory assigns this
item no FIX-NOW row of its own. Choices row C-0377. Every probe ran in the lane's scratch mirror (`cp -a` of `plat/`, 0
links back into the tree, removed after) with the before-image of `src/skeleton/` beside the round's. The relief faces
are the 16 derivations of `bench/src/site`'s two fixtures at CITY, default config, seeds 1 – 8 (`deriveSpike`,
`spikeFaces`: 1 104 district and 16 water faces), dumped once and read by every probe.

### Diagnoses

* **D-02 (corpus 1144, 1840; and the 14-vertex ring of `downgrade.test.ts` (a)).** Each is a lattice-snapped cross. Two
  of its straight sides are near-collinear lines 1.9 mm apart and within 0.8 mrad of one direction (1144: input
  edges 7 and 11). The exact skeleton (60-digit decimal) then has a face less than 1 mm wide along 85 cm. Node 14 of
  1144 lies 0.9 mm from arc 8 → 17, on the correct side. The engine's doubles reproduce this to about 0.2 mm, so there
  is no numeric step, tie or event-order error. The validator's millimetre rounding then moves node 14 across the arc:
  `arc 3 crosses arc 10`. The cause is a sub-millimetre face that the engine's strict event resolution keeps.
  §3.8's 1 cm position coalescing is applied only to the finished graph, and that pass contracts short arcs, not
  narrow faces.
* **Q73 water faces (all 7 failing relief-60 water faces, and relief-3000 seed 4's).** The engine run ends with status
  `pairing`, not `ok`. The validator's `face 0 is open at node 1` describes the incomplete graph, not its cause. A
  river ring is two banks of hundreds of near-collinear chords. At half the river's width, the banks meet all along
  the centre line within a millimetre of one another. A near-fold vertex (relief-60 seed 1: k = 78 871) crosses the
  remaining width in 10⁻⁵ of offset time. At one node, three edges then leave within 0.02° of one direction. Their
  angular order is below the coordinates' precision and does not alternate, so the engine stops. The cause belongs to
  the engine.
* **Q73 `degenerate` ring (relief-60 seed 3, district 23, at (32 770, −86 089)).** Its holes 1 (34 vertices) and 2
  (48) have zero area. Each is a dead-end street network inside the face that does not touch the outer ring, walked
  out and back. The spur pass reduces such a hole to fewer than three vertices, and the ring set was refused
  `degenerate`. Measured over the 16 derivations, 16 district faces belong to this class (relief-3000: 15). The cause
  belongs to the pre-clean.
* **D-01's residual (RQ7).** The ruling's P3 finding holds: the district faces' sub-5° corners are genuine 1.3° – 5°
  corners with tips 33 – 104 cm wide. Criterion (A) reaches one of them (relief-3000 seed 7, district 80: a 1.45° tip
  20.7 cm wide).

### Rows

| line | outcome | evidence (CONFIRMED by execution unless marked) | pin and its mutant (mirror, `test/skeleton` with `--bail=1`, W=1, restored `cmp`-clean) |
|---|---|---|---|
| Q67 / D-01 / RQ7 (A) | **FIXED, with the criterion read as the corners the contract refuses (the ruling's literal criterion shown wrong)**. `prepare.ts` gains `dropInexactSpurs`. It marks every vertex where the ring folds back sharper than 5° and the shorter arm's end lies within `attractCm` (26 cm, inclusive, exact in BigInt) of the longer arm's segment, with its foot strictly inside it. It removes every marked vertex at once, unless that would leave fewer than three vertices or no area: then it removes none, and the contract refuses the ring at its sharp corner. The fixpoint runs exact spurs, then inexact spurs, then the collinear merge, until no pass removes a vertex. **Why "sharper than 5°" and not the ruling's dot > 0:** the literal criterion removed a 26 cm edge at an 88° corner (relief-60 seed 5, district 28, so a validated result moved). It also refused a validated 19 cm-wide sliver triangle as `degenerate` (relief-60 seed 7, district 42, so refusals rose). **Why the guard:** without it, a triangle whose tip lies within 26 cm collapsed to `degenerate`. That happened to M0-k-02's `limit/degen-skeleton-sharp-corner` draws (5 of 6 reached `sharpCorner`) and turned 8 tests red in RELATED #1 (testkit `ladders/coverage`, `runner/ladders`, `runner/deferred`; bench `fuzz-bar/entry`, `ladder-coverage/entry`). With the guard all 5 files pass 38/38. | Over the 16 derivations, the 2 000 corpus footprints, §13.1's fixtures and 3 × 1 000 holed polygons (61 034 face × use lines, sha256 `3b9131de27d45599…`): 0 validated results moved, and sharpCorner → validated on 1 face (relief-3000-7 #80). N-1's asymmetric walk now cleans to the quadrilateral from every start and orientation, so N-1 is closed. The corpus is unchanged (0 contract refusals). `golden.test.ts`'s six digests are unchanged. | `spur.test.ts`: the S1 pins flipped (1 cm beside: the rectangle; 1 cm short: the tip goes and a 1 cm jog stays); exact and inexact spurs together; the inclusive bound (26 cm cleaned, 27 cm refused at the tip, 30 cm-wide spike refused); 5° only (an 88° corner with a 26 cm edge, and the 19 cm sliver triangle, untouched); the clean never collapses a ring (a 20 cm triangle and relief-3000-3 #104's 1.5 cm one stay `sharpCorner`); a tapered needle needing three rounds; a zigzag of mutually adjacent tips, one cleaned ring from every start; order-freedom over 5 fixtures. `contract.test.ts`: the spike pair moved to 30 cm. Mutants M6 (no inexact pass), M7 (one pass only), M8 (inexact pass in the first round only), M9 (bound 27 cm), M10 (bound strict), M11 (the literal dot > 0), M12 (tips removed one at a time), M17 (no guard): **all red**. |
| Q67 / RQ7 (B) | **MEASURED, then REPORTED (contract change, other items' files).** Over the round's code, 32 faces are refused `sharpCorner` (all in the relief derivations; the corpus and holed polygons have 0). Of these, 28 have their sharpest corner in [1°, 5°). Under a 1° bound for `spine`, 27 validate and **1 is rejected** by the validator (relief-3000 seed 7, district 56, 4.64°: `planarity arc 42 crosses arc 46`), a share of **1/28 = 0.036**. The other 4 are refused under the 1° bound too: 3 are not simple (relief-3000-2 #36, relief-3000-3 #43, relief-60-3 #12) and 1 has a 0.018° tip (relief-3000-3 #104). (B) changes `skeleton`'s contract for two readers. Applied in the mirror, it turned 4 tests red in other items' files: `bench/test/skeleton/runner.test.ts` (M0-a-12; the 2.9° `spine` spike, and the bar-fail corpus) and `testkit/test/runner/ladders.test.ts` (M0-k-04's `invariants/ladders.ts`, over M0-k-02's `limit/degen-skeleton-sharp-corner`, which draws tan θ ≤ 0.08 for `spine` too). Rule (1) leaves (B) at REPORTED. The code keeps 5° for every use. That deviates from the amended §3.8, which now says 1° for `spine` / `regions`, and is declared in C-0377. | The probe `measB` in the mirror. | none (no code). |
| Q63 / D-02 | **FIXED (engine; a declared shift)**. `engine.ts` gains a second reading, `tolerant`. `skeleton()` takes it only after the strict reading gives no validated graph, under what is left of the same work law. In it, a vertex next to an event's vertices that stands within 1 cm of the event's point joins the event (§3.8's 1 cm). An order within 1° of one direction that does not alternate takes the adjacent swap that makes it alternate. A face the strict reading validates never reaches the tolerant one. | Corpus 1144 and 1840 validate on every reader (strict 10 + tolerant 9, and 10 + 7 events). The corpus record (mirror, `corepack pnpm bench -- skeleton`) goes from roof 1 998 validated / 2 downgrades (planarity 2) to **2 000 / 0**, spine the same, events total 13 450 → 13 466, max 18 → 19. No other footprint moves. | `tolerant.test.ts` (1144, 1840, every reader; the strict reading ran to the end and failed, `finished` = 2); `golden.test.ts` gains corpus 1144 (`a7c4044236e1e203`) and 1840 (`48327635fc860a42`); `downgrade.test.ts` (a) flipped (the 14-vertex ring validates, events 9 + 7). Mutants M1 (no tolerant reading), M2 (no join), M13 (join radius 1 mm): **red**. M15 (the tolerant reading always taken) red (first in `fixtures.test.ts`'s n-gons; on the final re-run, with `--bail=1`, first in `tolerant.test.ts`'s 1144 / 1840 test, which asserts the strict reading ran and failed), so the strict reading is needed. |
| Q73 water | **FIXED (engine, the same reading)** | All 16 water faces of the 16 derivations validate, against 8 before (relief-60: 1 → 8 of 8; relief-3000: 7 → 8 of 8). Synthetic rivers (a probe, 72 parameter sets) fail strict on 8 sets, and the tolerant reading validates 7 of those 8. | `tolerant.test.ts`: a 12 m river (82 vertices) and an 8 m river (42 vertices) whose order needs 1° and not 1 mrad. Mutants M3 (no alternation) and M14 (alternation within 1 mrad, red only after the 8 m pin was added): **red**. |
| Q73 `degenerate` | **FIXED (pre-clean)**. A hole that cleans to fewer than three vertices is dropped. It encloses no area, as dropped spurs do (C-0276). The outer ring stays `degenerate`. `SkeletonEdge.ring` keeps the caller's ring index. | relief-60-3 #23 validates, with 14 relief-3000 faces of the class. relief-3000-7 #56 then meets its outer ring's sharp corner (`degenerate` → `sharpCorner`). Over the 16 derivations, `degenerate` falls 16 → 0. | `spur.test.ts` 'a hole that is all spur cleans away' (a segment and a tree, before and after the real hole; the edge map's ring indices; an all-spur outer ring with a hole stays `degenerate`). Mutants M5 (not dropped) and M16 (the outer ring dropped too): **red**. |
| budget | — | The tolerant reading charges the same law (`events` = both readings'). | `tolerant.test.ts` 'one work law for both readings' (hook: the tolerant reading's events all left unresolved, so `events` = law + 1, cause the strict failure). Mutant M4 (a law per reading): **red**. |

17 mutants, M1 – M17, all red. M14's first run survived, and a probe showed 5 relief water faces failing under it, so
the 8 m river was added. M5 – M12, M16 and M17 were re-run after the guard landed. On resuming the lane (06:21), the mirror was rebuilt from the
tree (0 links back) and all 17 were re-run once more on the final code: **17 / 17 red**, each restored `cmp`-clean (M14
by `tolerant.test.ts`'s constant-width river test).

### Refusal census of the item's registered families (J264 (5); per use, roof and spine identical)

| family | faces | before | after | classes before → after |
|---|---|---|---|---|
| §13.1 fixtures (rectangles 0.01°, n-gons, strips, L/T/U, notched, rotated squares) | 24 397 | 0 | 0 | — |
| §13.1 holed polygons, seeds 1, 2, 3 | 3 000 | 0 | 0 | — |
| skeleton corpus (seed 20261004) | 2 000 | 2 | **0** | validator planarity 2 → 0 |
| relief-60 district, seeds 1 – 8 | 514 | 16 | **15** | sharpCorner 14 → 14, degenerate 1 → 0, notSimple 1 → 1 |
| relief-60 water | 8 | 7 | **0** | validator faces 6 → 0, planarity 1 → 0 |
| relief-3000 district, seeds 1 – 8 | 590 | 43 | **28** | sharpCorner 18 → 18 (#80 out, #56 in), degenerate 15 → 0, notSimple 10 → 10 |
| relief-3000 water | 8 | 1 | **0** | validator faces 1 → 0 |
| **total** | 30 517 | **69** | **43** | the count fell; nothing rose |

Classes of the 43 still refused (J290):

* **sharpCorner 32**: LAWFUL district faces, with genuine 1° – 5° corners or slivers narrower than `attractCm`. For the
  27 that validate under a 1° bound, the verdict is MAKE-IT-SUCCEED, held by (B), which is REPORTED. Until (B) lands
  they REFUSE, typed, with each reader's downgrade as the layer (§3.8). The other 5 are the 1 face (B) leaves to the
  validator, 3 not-simple faces and 1 sliver of 0.018° (relief-3000-3 #104); they REFUSE, with the downgrade as the
  layer.
* **notSimple 11**: LAWFUL district faces whose boundary walk visits a vertex twice (a pinch; an arrangement face is
  lawful with one). Verdict REFUSE, typed, with the reader's downgrade as the layer, as ruled ("for a face the clean
  cannot make simple … as today", rulings §7).

### RELATED

RELATED #1 (PLAT_FUZZ_RUNS=1000, W=1, 4 956 s) ran on the round's code before the guard: 331 files, 4 077 / 4 085 tests.
Its 8 reds are the guard's case above, and they are the item's. After the guard, the five files pass 38 / 38.
RELATED #2 (PLAT_FUZZ_RUNS=1000, W=1, over `src/skeleton/{prepare,engine,skeleton,types}.ts`, 04:45 – 06:11, 5 157 s) is
the gate: **331 files, 4 086 / 4 086 tests, exit 0** (no J176 file red, no foreign red). Gates re-run in the tree on the
final code at 06:25: install --frozen-lockfile 0, lint 0 (eslint 1 141 files, probe-red ok, 9 whole-tree checks), build
0, NEAR (`test/skeleton` + `test/num/equivalence.test.ts`) 13 files 125 / 125, holed polygons at PLAT_SKELETON_SEED 1, 2,
3 green.

### Notes

| id | observation | handling | milestone |
|---|---|---|---|
| N-s3-1 | RQ7 (B) is measured but not built. Its code is a few lines: `prepareRings(input, use)` with the `sharpCorner` bound tan 1° for `spine` / `regions`. It must land together with other items' lines: M0-a-12's `bench/test/skeleton/runner.test.ts` (the `spine` spike at 2.9°, and the bar-fail corpus's sharp face), and M0-k-02's `constructive/cases/limits.ts` `buildSharpCorner` with M0-k-04's `invariants/ladders.ts` spine row (tan θ ≤ 0.08 drawn for `spine`; under (B) the `spine` draw needs tan θ < tan 1°), plus `constructive/coverage.ts:161`'s clause text. The measured share is 1/28 (relief-3000-7 #56 rejected by planarity). | Session ruling: assign the lines (C-0104's form) to one round, or keep the census's (c) reading. | hardening |
| N-s3-2 | The census's 16-derivation figures are confirmed on today's tree (default config, CITY; the census quoted 2026-10-08's): relief-60 district 16/514, water 7/8; relief-3000 district 43/590, water 1/8. The `notSimple` (11) and `degenerate` (16 before) classes were not named by the census or the rulings. They are counted above. | Census's phase-end re-run (§5) to carry the per-class figures. | hardening |
| N-s3-3 | The tolerant reading is not complete for the synthetic river class. One of 8 synthetic rivers that fail strict also fails tolerant (162 vertices, 12 m wide, 80 chords of 1.5 m, a bend of amplitude 0.2 rad over 53 chords: `planarity arc 64 crosses arc 232`). It fails safe: a typed downgrade. | KI for the hardening pass. A third reading, or a coalescing of the river's centre-line structure, would be new engine work. | M4 |
| N-s3-4 | `summaries/M0-a-12.json` (M0-a-12's file) is stale after this round: a fresh `bench -- skeleton` gives roof and spine 2 000 validated, 0 downgrades, events 13 466 (max 19), against the committed 1 998 / 2 / 13 450. No test reads the committed summary. | M0-a-12's owner, or the session, re-records it. | hardening |
| N-s3-5 | The literal RQ7 (A) criterion (dot > 0) is unsafe (Q67 row above), and so is a clean that may collapse a ring. The amended §3.8 sentence ("inexact ones whose shorter arm's end lies within `attractCm` of the longer arm") says neither "a fold-back sharper than the bound" nor "never below three vertices". The code reads it so, and C-0377 records the reading. | Amendments round: add "(a fold-back sharper than the contract's 5°; a ring the clean would collapse is left to the contract)" to §3.8's sentence. | hardening |

## Closing check S3 (check/M0-a-11-close-s3, 2026-10-14)

The closing checker's notes; none of these rows fails the round (N-45, J180). The round's blockers (the survivors K6,
T3 and T13) are in `checks/M0-a-11-s3.md`, which also defines the mutant ids (K…, T…) and the probes (`measure`,
`compare`, `spurs`, `diag`), run only in the checker's scratch mirror over the before-image (main 889d3a7), the tree's
code and mutant copies.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s3c-1 | **K11 is equivalent.** Removing `inexactTip`'s foot test (`0 < foot < l2`) changes nothing: with dot = (s − v)·(l − v) > 0 already required, foot = dot > 0, and foot ≤ \|s − v\|·\|l − v\| ≤ \|l − v\|² with equality only when s = l (an exact spur, removed by `dropSpurs` earlier in the same round). The NEAR set passes it (13 files, 125/125). | None; the test may be kept as documentation of the ruling's wording. | — |
| N-s3c-2 | **The literal RQ7 (A) criterion, re-measured.** The mutant K5 (any fold, dot > 0) moves one validated face on the 16 derivations of today's tree: relief-60 seed 5, district #28, on every reader (validated → validated, other output). The builder's second instance (relief-60 seed 7, district #42 refused `degenerate`) does not recur with the collapse guard in place. C-0377 (1)'s restriction is therefore needed for "0 validated results moved"; its pin is the blocker K6 of `M0-a-11-s3.md`. | The amendments round's sentence of N-s3-5 stands. | hardening |
| N-s3c-3 | **The lawful-input refusals left after the round (J264, N-58), per use (roof = spine = regions), with seeds** (CITY, default config, `deriveSpike` seeds 1 – 8): **sharpCorner 32** — 27 validate under a 1° bound (relief-60-2 #13, #40; relief-60-3 #0, #1, #3, #8, #28, #37; relief-60-4 #0, #19; relief-60-6 #3; relief-60-7 #0, #12; relief-3000-2 #14, #20, #31; relief-3000-3 #3, #11, #42, #98, #100; relief-3000-5 #25, #53; relief-3000-6 #44, #62; relief-3000-7 #8, #110), 1 fails the validator under it (relief-3000-7 #56, planarity), 3 are refused `notSimple` under it (relief-60-3 #12, relief-3000-2 #36, relief-3000-3 #43) and 1 is sharper than 1° (relief-3000-3 #104); **notSimple 11** (relief-60-6 #49; relief-3000-2 #15, #94, #106; relief-3000-3 #26, #87; relief-3000-5 #1, #60; relief-3000-6 #22; relief-3000-7 #15, #126). | Session finding, with N-s3-1 ((B) and its other items' lines) and the census's phase-end re-run (§5). | hardening |
| N-s3c-4 | **An all-spur hole is dropped before the contact and containment checks.** A zero-area hole that touches or crosses the outer ring, or lies outside it, now cleans away and the face runs (before the round: `degenerate`). It encloses no area, so the face's skeleton is still right for the region, and an arrangement face's walk cannot produce such a hole (N-3's class). | Record it in C-0377 (2), or refuse `holeContact` / `holeOutside` when a dropped hole meets or leaves the outer ring, when an outside caller (M1 footprints) can pass such rings. | M4 |
| N-s3c-5 | **The tolerant reading's outputs on the water class are not digest-pinned.** `golden.test.ts` pins 1144 and 1840; no relief water face (627 – 2 900 vertices) or constructed equivalent is pinned by its whole result, so an engine change that moves the water faces' validated output leaves every test green (T13's case). | Part of the blocker on Q73 in `M0-a-11-s3.md`; listed here so the hardening pass keeps a digest pin of the class. | hardening |

## Hardening round S4 (build/M0-a-11-fix-s4, 2026-10-14): the builder's row-by-row outcome (J237 (2), J264, J290 / N-58)

The round's lines are the two that the closing check S3 (`checks/M0-a-11-s3.md`) left failing. Both are about pins
only. Q67 / D-01 / RQ7 (A): the survivor K6, the clean's fold-back bound moved from 5° to 10°. Q73: the survivors T3
(the tolerant join radius 1 cm → 0.5 cm) and T13 (the join no longer excluding the ends of an edge the event splits).
The round changes no source file. `src/skeleton/` is byte-identical to the S3 landed record (each SHA-256 checked
against `landed/M0-a-11.json`). So no output moves, no digest is re-recorded and no choices row of S3 changes.
The round adds pins under `test/skeleton/`. Choices row: C-0378. Every mutant ran in the lane's scratch mirror (a
`cp -a` of `plat/`, 0 links back into the tree, every `@plat` dependency resolving inside it), on
`packages/kernel/test/skeleton` with `--maxWorkers=1 --bail=1`. Each mutated file was copied back from the tree and
checked `cmp`-clean before the next mutant.

### Rows

| line | outcome | evidence | pin and mutants |
|---|---|---|---|
| Q67 / D-01 / RQ7 (A) — the clean's 5° bound | **PINNED** (no code change) | The S3 test 'only a corner sharper than 5° is a tip' held two sub-cases that never met the literal criterion. The 88° ring has dot ≤ 0 at every vertex. The sliver triangle's shorter arms end about 1.9 m from the longer ones. The checker showed this (K5 passed the test), so both sub-cases are **replaced**. The new test uses a spike on the rectangle's top edge, (1 200, 1 000) → (1 200, 850) → (1 200 + dx, 1 000). Its shorter arm ends within `attractCm` for every dx, so only the angle bound decides. **dx 13** (4.95°; \|cross\| 1 950 < tan 5° · dot 1 968.5) is cleaned to the plain rectangle, and its skeleton is the rectangle's. **dx 14** (5.33°) and **dx 18** (6.84°, the checker's ring, its shorter arm ending 17.9 cm from the longer one) are not cleaned. Two notches are not cleaned either: **30°** (a 26 cm arm ending 13 cm from a 30 cm one) and **45°** (a 20 cm arm ending 14.1 cm from a 28 cm one). For these four rings the cleaned ring is the input ring, and every reader (roof, spine, regions) validates the face with its tip; the skeleton differs from the rectangle's. The probe ran in the mirror before the test was written, and the five rings give exactly these results. | `spur.test.ts` 'only a corner sharper than 5° is a tip: a fold-back at 5.3° or 6.8°, or at 30° or 45°, whose shorter arm ends within attractCm stays; one at 4.95° goes (hardening round S4)'. Mutants (CONFIRMED, `test/skeleton`, W=1, `--bail=1`): **K6** (`inexactTip`'s bound tan 5° → 0.17632698070846498, i.e. 10°) **red**. **K5** (the literal criterion `dot > 0`, no angle) **red**, and now on this test too, not only on the 1 cm-short jog. **K6b** (the bound narrowed to 0.0855, 4.89°) **red**, because dx 13 is no longer cleaned. |
| Q73 — the water class's dependence on the tolerant join | **PINNED** (no code change) | relief-60 seed 3's water face, the face this line names, is written out as `test/skeleton/relief-60-3-water.json`. It holds 1 599 vertices: `deriveSpike(relief-60, 3, 'default', 'city')`, `spikeFaces(…).water[0]`, dumped by this lane's own probe in the mirror. The dump is identical to the closing checker's (compared ring for ring). Its whole result is pinned on every reader by the SHA-256 of `golden.test.ts` (the JSON with −0 marked, first 16 hex digits). The digests are roof `5a9d3bb6690c0709`, spine `4f9f6abc3bf42fd0` and regions `5bb448fc1a8603c7`, the closing checker's three figures exactly. The test also asserts three more things. Only the tolerant reading finishes (the `finished` hook counts 1: the strict reading stops at its pairing). The graph passes `validateSkeleton`, with 2 745 nodes, 2 744 arcs and 1 698 events and no warnings. The public `skeleton()` call gives the same digest. | `golden.test.ts` '§3.8 *Decision*: the tolerant reading's water class pinned by a whole face on every reader (hardening round S4)', three cases. Mutants (CONFIRMED, `test/skeleton`, W=1, `--bail=1`; the S3 checker's text): **T3** (`JOIN_CM` 1 → 0.5) **red**. **T3b** (`JOIN_CM` 1 → 2) **red**. **T13** (the join no longer excluding a split edge's ends: `!splits.some((u) => u === w \|\| u.next === w)` removed) **red**. **T13b** (only the split edge's start excluded: `u.next === w` removed) **red**. Each fails all three readers' cases of the new test (run on `golden.test.ts` alone: 3 failed, 8 passed). |

### Refusal census of the item's registered families (J264 (5))

No source file changed, so every family's outcome is the S3 tree's: per use, roof = spine = regions, **43 → 43**,
nothing rose, nothing moved. The figures are the closing check S3's, which re-measured them (corpus 0, holed polygons
0, relief-60 district 15 / water 0, relief-3000 district 28 / water 0). The remaining lawful-input refusals are listed
with their seeds in N-s3c-3 and routed to the session there. This round adds none and removes none.

### Gates (in the tree)

`install --frozen-lockfile` 0. `lint` 0 (`eslint 1141 files, 0 errors, 0 warnings`; `probe-red ok`; 9 whole-tree
checks). `build` 0. NEAR at W=1 (`packages/kernel/test/skeleton` + `test/num/equivalence.test.ts`): 13 files,
128/128. The holed polygons at `PLAT_SKELETON_SEED` 1, 2 and 3 are green. RELATED@1000 for the four
skeleton sources at W=1 (09:28 to 10:54, 5 165 s): 331 files, 4 089/4 089, exit 0. A re-check of K5 (the literal
any-fold criterion) filtered to the 5° test alone: red.

### Notes

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s4-1 | C-0377 (1) names, as its evidence against RQ7 (A)'s literal criterion, "a 26 cm edge at an 88° corner" (relief-60 seed 5, district 28) and a validated 19 cm-wide triangle (seed 7, district 42). The rings S3 extracted for those cases do not meet the literal criterion (the closing check S3). N-s3c-2 shows that the literal criterion does move relief-60-5 #28's validated output, so the conclusion stands, but its example was wrong. C-0378 records the constructed pins (5.33°, 6.84°, 30°, 45°) as the evidence instead. C-0377's text is left as committed: an append-only row is never edited. | None beyond C-0378. | — |
| N-s4-2 | The water class now has one whole-face digest pin, relief-60-3's water face (N-s3c-5). The other water faces the tolerant reading validates (relief-60 seeds 1, 2, 4, 5, 7, 8; relief-3000 seed 4) are not pinned one by one. T3 and T13 move several of them, and both are now red through seed 3. | A further face per fixture is hardening, not a fix (N-45). | hardening |

## Hardening round S5 (build/M0-a-11-fix-s5, 2026-10-18): the builder's row-by-row outcome (J237 (2), J264, J290 / N-58)

The round's brief names two failing lines and says the closing checker `checks/M0-a-11-s4.md` failed them. **That file
does not exist.** The lane `check/M0-a-11-close-s4` wrote only its opening CHECKPOINT (2026-10-14 11:06) and never
landed. The two lines and their evidence match the closing check S3's verdict (`checks/M0-a-11-s3.md`) word for word:
NEAR 13 files 125/125 is the S3 count, and the round S4 tree has 128 tests. The round S4 (`build/M0-a-11-fix-s4`, C-0378)
had already built the required change for both lines. `landed:verify -- flow-7 --item M0-a-11` prints ok, so the tree
is S4's landed record unchanged. The round therefore **changes no file under `packages/`**. It re-proves each line's pin
against the mutants the line names, re-runs the item's whole test set and the gates, and re-lands the record. Choices
row: C-0379. Mutants ran in the lane's scratch mirror (a `cp -a` of `plat/`; 0 links back into the tree; every `@plat`
dependency resolves inside it), at `--maxWorkers=1`. Each mutated file was copied back from the tree and checked
`cmp`-clean before the next mutant. The mirror is deleted.

### Rows

| line | outcome | evidence | mutants (CONFIRMED in this round) |
|---|---|---|---|
| Q67 / D-01 / RQ7 (A): the clean's 5° bound | **PINNED** (S4's pin re-proved; no change) | `spur.test.ts` 'only a corner sharper than 5° is a tip … (hardening round S4)'. dx 13 (4.95°) is cleaned to the plain rectangle. dx 14 (5.33°), dx 18 and the 30° / 45° notches all have a shorter arm ending within `attractCm`, and all stay: the cleaned ring equals the input ring, and roof, spine and regions each validate the face with its tip. dx 18 is the checker's ring `[(0,0),(2000,0),(2000,1000),(1218,1000),(1200,850),(1200,1000),(0,1000)]` (6.84°, 17.9 cm). The 88° and sliver-triangle sub-cases that S3 named were replaced in S4 (N-s4-1). The guard test 'the clean never collapses a ring' is a separate test with a separate claim, and it meets that claim: its 1.15° tip's short arm ends 20 cm from the long one. | `test/skeleton` with `--bail=1`: **K6** (`inexactTip`'s bound tan 5° → tan 10°, 0.17632698070846498) is red on this test. **K5** (the literal `dot > 0`) is red, but on the 1 cm-short-jog test first. Re-run filtered to the 5° test alone (`-t 'only a corner sharper than 5'`): K5 red, K6 red, **K6b** (bound 0.0855, 4.89°) red. |
| Q73: water faces, the 1 cm join and the split-end exclusion | **PINNED** (S4's pin re-proved; no change) | `golden.test.ts` '§3.8 *Decision*: the tolerant reading's water class pinned by a whole face on every reader (hardening round S4)'. The pin uses relief-60 seed 3's water face, `relief-60-3-water.json` (1 599 vertices). Only the tolerant reading finishes. The result validates with 2 745 nodes, 2 744 arcs and 1 698 events, and no warnings. Its digests are roof `5a9d3bb6690c0709`, spine `4f9f6abc3bf42fd0` and regions `5bb448fc1a8603c7`, the line's three figures. | **T3** (`JOIN_CM` 1 → 0.5) is red on `test/skeleton --bail=1`, and red 3/3 on `golden.test.ts` alone (8 others pass). **T13** (`!splits.some((u) => u === w \|\| u.next === w) && ` removed) is red on `test/skeleton --bail=1`, and red 3/3 on `golden.test.ts` alone. |

### Refusal census of the item's registered families (J264 (5))

No source file has changed since S3's landed code, so every family's outcome is the S3 tree's. Per use (roof = spine =
regions) the census is **43 → 43**. Nothing rose and nothing moved. No digest is re-recorded and there is no declared
shift.

### Gates (in the tree, 2026-10-18)

* `install --frozen-lockfile`: 0.
* `lint`: 0 (`eslint 1141 files, 0 errors, 0 warnings`; probe-red ok; 9 whole-tree checks).
* `build`: 0.
* NEAR at W=1 (`test/skeleton` + `test/num/equivalence.test.ts`): 13 files, 128/128.
* `fixtures.test.ts` at `PLAT_SKELETON_SEED` 1, 2 and 3: 7/7 each.
* RELATED@1000 at W=1 over `src/skeleton/{prepare,engine,skeleton,types}.ts` (16:53 to 18:50, 7 026 s): 331 files, 4 089/4 089, exit 0. No J176 file and no foreign file was red.

### Notes

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s5-1 | This round's brief cites `checks/M0-a-11-s4.md` as the verdict that failed the round, but no such file exists. The closing check S4 (`check/M0-a-11-close-s4`) started on 2026-10-14 and never landed. The round's two lines repeat the closing check S3's text, and S4 has already answered them. | The session runs (or re-runs) the closing check S4/S5 against S4's pins. If the check names a new defect, that is a new round. | — |

## Closing check S5 (check/M0-a-11-close-s5, 2026-10-18)

The closing checker's notes. No row here fails the round (N-45, J180). The verdict is in `checks/M0-a-11-s5.md`.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s5c-1 | **The 5° pin fixes the clean's bound to a band of about 0.4°.** `spur.test.ts`'s spikes are at 4.95° (cleaned) and 5.33° (kept). Any bound from about tan 4.95° to tan 5.33° passes, while 5.4° (K6c), 10° (K6) and the literal criterion (K5) are red. The contract's own `sharpCorner` test uses the same `TAN_5_DEG`, which a contract pin holds. So an off-by-a-fraction bound only between the two can survive, and it would move nothing the contract accepts outside that band. | None needed. If the hardening pass wants the bound exact, it can add one spike each side within 0.05° of 5°. | M4 |
| N-s5c-2 | **N-s3c-5 is closed.** `golden.test.ts` now pins relief-60 seed 3's water face by its whole result on every reader. `relief-60-3-water.json` equals this seat's own `deriveSpike(relief-60, 3, 'default', 'city')` dump, ring for ring. T3, T3b (0.9 cm) and T13 are red 3/3 on it. | None. | — |

## Hardening round S6 (build/M0-a-11-fix-s6, 2026-11-10): the builder's row-by-row outcome (J237 (2), J264, J290 / N-58; RL5 / J749)

The round has one line: **Q67 (B)**, the skeleton's contract angle (docs/M0-FIX-QUEUE.md row Q67, read whole; RQ7 (B),
N-61 (7), J358; RL5 ruled at J749, OWNER-VETOABLE). §3.8 *Numeric contract* and §3's edge table ('degenerate geometry')
already say "5° for `roof`, 1° for `spine` and `regions`"; the code held 5° for every use (C-0377 (4), a declared
deviation). The round followed the ruling's order: (1) measure, no source change; (2) adopt only if the validator passes
every face the 1° bound newly admits; (3) otherwise adopt nothing and report. Choices row: C-0493. Every probe and mutant
ran in the lane's scratch mirror /home/user/maps-scratch/waves/selfcheck-build-M0-a-11-fix-s6/plat (a `cp -a` of
`plat/`, node_modules included; `find … -type l -lname '/home/user/maps-architecture*'` printed nothing; `realpath` of
`bench/node_modules/@plat/kernel` lies inside the mirror). The mirror is deleted.

### (1) The measurement (today's tree, the mirror, before any change in `plat/`)

The probe (`bench/probe-s6/measure.ts`, mirror only) ran every face of each family through `skeleton(rings, 'roof')`
with the tree's code (5°, which was every use's bound before the round), and through `skeleton(rings, 'spine')` and
`skeleton(rings, 'regions')` with the mirror's `prepare.ts` reading tan 1° for those two readers. The clean was unchanged.
For each face that roof refused `sharpCorner`, the probe took the cleaned rings' sharpest corner (atan2, probe only). A
face counts **in band** when that corner lies in [1°, 5°). The probe then checked that every face not refused
`sharpCorner` gave spine and regions results equal to roof's apart from `use` (and, for a downgrade, `to`).

| family | faces | roof `sharpCorner` | in [1°, 5°) | validated under 1° (spine = regions) | rejected by the validator | below 1° (still `sharpCorner`) |
|---|---|---|---|---|---|---|
| skeleton corpus (`bench/fixtures/skeleton-corpus/`, seed 20261004) | 2 000 | 0 | 0 | — | — | 0 |
| §13.1 holed polygons (seeds 1, 2, 3) + 3 000 snapped rotated squares | 6 000 | 0 | 0 | — | — | 0 |
| M0 (b) face set (`bench/src/bentcut/faces.ts` `faceSet`, 7 kinds × 500, seed 1) | 3 500 | 12 | 11 | **11** | **0** | 1 |
| M0 (b) face set (7 kinds × 2 000, seed 2) | 14 000 | 41 | 36 | **36** | **0** | 5 |
| fusion harness, test size (900 ha / 30 ha), flat and river × fusion and integrated, seeds 1 – 8: L1 district faces (`ins.districtFaces`) and water faces | 481 | 5 | 5 | **5** | **0** | 0 |
| the same, seeds 9 – 24 | 1 023 | 38 | 36 | **36** | **0** | 2 |
| site spike CITY, default config, relief-60 and relief-3000, seeds 1 – 8 (`deriveSpike`, `spikeFaces`: district and water) | 1 025 | 39 | 36 | **36** | **0** | 3 |
| the same, relief-60 seeds 9 – 16 | 164 | 6 | 6 | **6** | **0** | 0 |
| the same, relief-3000 seeds 9 – 16 | 434 | 16 | 15 | **15** | **0** | 1 |
| **total** | **28 627** | **157** | **145** | **145** | **0** | **12** |

All of the 145 faces the 1° bound newly admits validate, on spine and on regions alike. They range from 1.011° (M0 (b)
curved #69, seed 1) to 4.996° (fusion river integrated seed 7, district #23). They include triangles of 3 vertices,
district faces of up to 365 vertices, and two relief water faces (relief-60 seeds 2 and 7: 887 and 878 vertices, at 3.01°
and 4.25°). The 12 below 1° are still refused for every use (curved #70, #185, #906, #998, #1336, #1723; fusion river seed
15's district #2 / #0; relief-3000-5 #42, #45, #73; relief-3000-11 #30). **0 faces moved** that the 5° bound did not refuse:
the 28 482 others gave equal results on every reader. The §13.1 fixtures (24 397 faces) are `fixtures.test.ts`'s, which
asserts that every reader validates every one; it is green on the round's code (NEAR below).

**The earlier failure, and why it does not decide this round.** The round S3's probe (2026-10-14; N-s3c-3, which the
closing check S3 confirmed) found one face out of 28 in band that the validator rejected under a 1° bound: relief-3000
seed 7, district #56, at 4.64° (`planarity arc 42 crosses arc 46`). That face **cannot be derived on today's tree**. With
the other items' in-flight edits restored from the WSL tree (M0-e-03 s1 site/water, M0-e-04 s2 layout/districts; the
session's note), relief-3000 seed 7 derives **0** district faces. So do relief-60 seeds 1 and 11 – 16, relief-3000
seeds 4, 6, 9, 10, 12 and 13, and fusion river seeds 8, 14, 19 and 23 (both runs). No copy of that ring exists under `plat/`. The
ruling sets the measurement on today's tree and families, and there all 145 validate, so by (2) the bound is **adopted**.
The validator stays the net (pinned below). A face like #56 therefore takes its reader's downgrade, `W_DOWNGRADE` with
cause `validator planarity` and events > 0, in place of `contract sharpCorner` with events 0. That is fail-safe: never
unvalidated output and never a refusal count above today's. N-s6-1 reports it to the session, who can veto (RL5 is
OWNER-VETOABLE).

### (2) The adoption (inside the item's owns)

* `src/skeleton/prepare.ts` gains `TAN_1_DEG` (0.017455064928217585, the double nearest tan 1°; checked against a
  60-digit series) and `SHARP_TAN` (roof → `TAN_5_DEG`, spine and regions → `TAN_1_DEG`). `sharpCorner` takes the bound.
  `prepareRings(input, use = 'roof')` checks the cleaned rings against `SHARP_TAN[use]`. **The pre-clean does not
  change.** `inexactTip` keeps the roof's 5° for every use, because §3.8 makes the clean "a function of the ring alone":
  every reader reads the same cleaned rings, and the validated graphs of spine and regions are equal apart from `use`.
  Neither `prepare.ts` nor the barrel exports anything new to callers (`index.ts` is unchanged; the API is frozen, J263
  Q1).
* `src/skeleton/skeleton.ts` passes `use` to `prepareRings`. The validator path is unchanged, so a face the bound admits
  and the validator rejects still takes the reader's downgrade.

### Rows

| line | outcome | evidence | pin and mutants (mirror, `packages/kernel/test/skeleton`, `--maxWorkers=1 --bail=1`, each file restored and `cmp`-clean) |
|---|---|---|---|
| Q67 (B): the contract angle, 1° for spine and regions, 5° for roof | **FIXED** (a declared shift; the measurement above) | §3.8 and §3's edge table are the source; the code now follows them, and C-0377 (4)'s deviation is closed. | `contract.test.ts` 'the use's bound: 5° for roof, 1° for spine and regions (… hardening round S6)', three tests. **(i)** A 2.98° apex, a 357.6° slit notch and a 3.4° spike whose tip ends 30 cm from its root: roof refuses each `sharpCorner` without running (events 0, at the corner). Spine and regions each validate with no warning, and their graphs are equal apart from `use`. **(ii)** A 0.86° apex is refused for every use, and a 1.09° apex runs for spine and regions while roof refuses it. **(iii)** The validator stays the net: the 2.98° face, admitted for spine and regions, with its finished output corrupted by an interior node with no arc (`EngineHooks.finished`) in both readings, takes the reader's downgrade (`validator topology`, events > 0, the spine's injected axis, one `W_DOWNGRADE`). Mutants, **all red**: **B1** spine and regions left at 5° (the code before the round) red on (i). **B1r** regions alone left at 5°: red on (i). **B2** roof lowered to 1°: red, first on the existing '4.81° apex is refused' test. **B3** the validator's net removed for spine and regions (`!verdict.ok && use === 'roof'`): red on (iii). **B3b** the net removed only for faces the 5° bound refuses (`!verdict.ok && prepareRings(rings, 'roof').ok`): red on (iii). **B4** bound 0.5°: red on (ii). **B5** bound 1.2°: red on (ii). **B6** `use` not passed to `prepareRings`: red on (i). |

The item's own test that read the old contract changed with the shift. `contract.test.ts` 'the typed downgrade per
reader' used a 4.81° triangle as its "sharp" ring for all three readers. Spine and regions now validate that triangle,
so the test reads a 0.86° apex instead: `[(0, 0), (2 000, −15), (2 000, 15)]`, whose far end lies 30 cm from the other
arm, so the clean keeps it. `downgrade.test.ts`'s 4.81° hook test reads roof and is unchanged.

### Declared shift (§3.8 *Decision*; J237 rule (3))

* **This item's moved output.** `skeleton(rings, 'spine')` and `skeleton(rings, 'regions')` on a face whose sharpest
  corner (after the clean) lies in [1°, 5°). Before the round: the reader's downgrade (`W_DOWNGRADE`, cause
  `contract sharpCorner` at the corner, events 0; spine → the injected medial axis, regions → `reflexPreCut`). After:
  the validated `SkeletonGraph`, with no warning (or the validator's downgrade where the net rejects it). In the
  measured families that is 145 faces per reader. Unmoved: every roof result, and every spine and regions result on a
  face the 5° bound did not refuse (28 482 faces probed, 0 moved). **Nothing to re-record in this item:**
  `golden.test.ts`'s digests (corpus 556, 1236, 1144, 1840, the relief-60-3 water face's roof `5a9d3bb6690c0709`,
  spine `4f9f6abc3bf42fd0` and regions `5bb448fc1a8603c7`, and the rest) are unchanged and green, because none of their
  faces has a corner below 5°.
* **Other items' files that move (NOT this item's; for the session's seams):** the six RELATED reds below and the
  summaries named in N-s6-2.

### Refusal census of the item's registered families (J264 (4), N-58)

Per use, before → after (today's tree). Roof is unchanged on every family. Spine = regions:

| family | roof | spine = regions |
|---|---|---|
| §13.1 fixtures (24 397) | 0 → 0 | 0 → 0 |
| holed polygons 3 × 1 000 + squares 3 000 | 0 → 0 | 0 → 0 |
| skeleton corpus (2 000) | 0 → 0 | 0 → 0 |
| relief CITY seeds 1 – 8 (1 025; the S3 family) | 46 → 46 (sharpCorner 39, notSimple 6, validator faces 1) | **46 → 10** (sharpCorner 3, notSimple 6, validator faces 1) |
| M0 (b) seed 1 (3 500) | 12 → 12 | **12 → 1** |
| fusion test size seeds 1 – 8 (481) | 9 → 9 (sharpCorner 5, notSimple 2, validator planarity 2) | **9 → 4** (notSimple 2, validator planarity 2) |

The count fell and nothing rose. The registered families of the S3 table give 46 → 46 for roof and **46 → 10** for
spine and regions. The census's 43 of S3 was taken on the 2026-10-14 tree's derivations, and the relief faces differ
today (above). The fall comes from LAWFUL faces that now succeed (MAKE-IT-SUCCEED, N-58). The remaining refusals, by
verdict:

* **sharpCorner below 1°** (12 across the measured families): LAWFUL slivers sharper than the engine's fold threshold.
  REFUSE, typed, with each reader's downgrade as the layer (§3.8, as ruled).
* **notSimple** (relief 6 + 1 + 4; fusion 2): LAWFUL pinched faces. REFUSE, with the reader's downgrade as the layer, as
  ruled (rulings §7; S3).
* **validator** (unchanged by the round, on every use): relief-60-3 #9 (`faces: face 5 is open at node 6`),
  relief-3000-11 #25 (`planarity arc 6 crosses arc 8`), and the fusion harness's river seed 7 water face #0, in both
  runs (`planarity arc 34 crosses arc 36`). LAWFUL. MAKE-IT-SUCCEED is an engine repair (N-s3-3's class) and a session
  finding (N-s6-3).

### Gates (in the tree)

* `install --frozen-lockfile`: 0.
* `lint`: 0 (`eslint 1291 files, 0 errors, 0 warnings`; `lint: probe-red ok`; 9 whole-tree checks).
* `build`: 0.
* NEAR at W=1 (`packages/kernel/test/skeleton` + `test/num/equivalence.test.ts`): 13 files, 131 / 131.
* `fixtures.test.ts` at `PLAT_SKELETON_SEED` 1 (in NEAR), 2 and 3: 7 / 7 each.
* RELATED@1000 at W=1 over `src/skeleton/prepare.ts` and `skeleton.ts` (05:16 – 08:16, 10 764 s): **397 files, 5 127
  passed, 6 failed, exit 1**. No J176 file is red. All six reds are in other items' files. Each pins the old 5° bound
  for `spine`. The **attribution replay** confirms this: in the mirror, with the bound set back to 5° for every use (B1,
  the code before the round), the five files `bench/test/fuzz-bar/entry.test.ts`, `bench/test/site/summary.test.ts`,
  `bench/test/skeleton/runner.test.ts`, `testkit/test/runner/ladders.test.ts` and `testkit/test/runner/constructive.test.ts`
  pass 194 / 195. The one failure is `constructive.test.ts`'s bundle check, which needs `packages/testkit/dist`, and a
  copied mirror has none; it is green in the tree. The red files, by owner:

  | owner | file and test | why it is red | the seam (the session's) |
  |---|---|---|---|
  | M0-a-12 | `bench/test/skeleton/runner.test.ts:264–269` 'spine: a face the contract refuses downgrades with the kernel's sampled medial axis' | its 2.9° spike `[(0,0),(4000,0),(4000,200)]` now validates for `spine` (`sharpCorner` 0, expected 1) | a spike below 1° (e.g. `(4000, 60)`, 0.86°), or the same face read by `roof` |
  | M0-k-02 (the draw) / M0-k-04 (the judge) | `packages/testkit/test/runner/constructive.test.ts` 'limit/degen-skeleton-sharp-corner' (seed 2: "expected the reader's downgrade, got the skeleton path") | `constructive/cases/limits.ts` `buildSharpCorner` draws tan θ ≤ 0.08 and the use from {roof, spine}; a `spine` draw at θ ≥ 1° now validates | `buildSharpCorner`: tan θ < tan 1° when the use is `spine` (or roof only for the 1° – 5° band), its validity predicate (`limits.ts:851–855`) likewise; `coverage.ts:161`'s clause text "a corner sharper than 5°" → "than its use's bound (5° roof, 1° spine and regions)" |
  | M0-k-04 | `packages/testkit/test/runner/ladders.test.ts:71` 'every built row run here reaches its rung on every draw' (the spine row reached 1 of 6 draws) | `invariants/ladders.ts`'s spine row reads `limit/degen-skeleton-sharp-corner` with use `spine` | follows the draw above |
  | M0-x-05 | `packages/testkit/test/ladders/coverage.test.ts:45` 'every built stage rung is reached …; covered' (`kernel.covered` false) | the same spine row, uncovered | follows the draw above |
  | M0-k-04 | `bench/test/fuzz-bar/entry.test.ts:90` 'a whole toy run …, the bar decided' (`pass` false; the run prints "kernel ladders 16 rows, covered false") | the same spine row | follows the draw above |
  | M0-e-06 | `bench/test/site/summary.test.ts:196` 'the canary CITY record re-derived on this tree is the run's' (relief-60 coarse seed 46: `4c9647bf15914e6d…`, the summary's `eb2046ddce3ce2c1…`) | the canary's record carries the corpus receipts, whose `spine` downgrade counts on district and water faces fall | `summaries/M0-e-06.json` re-run by the Q36 procedure (the session's) |

### Notes

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s6-1 | **The 1° bound's one known validator rejection is not on today's tree.** S3 recorded relief-3000 seed 7, district #56 (4.64°), and the closing check S3 confirmed it (N-s3c-3): under a 1° bound the validator rejects it (`planarity arc 42 crosses arc 46`). Today relief-3000 seed 7 derives no district faces, because of the other items' in-flight edits, so that face could not be measured. The 145 faces that today's tree admits under 1° all validate. If the edits are reverted, or the face comes back, it takes the reader's downgrade through the validator. That is a typed `W_DOWNGRADE` with cause `validator planarity` and events > 0, never unvalidated output (the net is pinned by B3 and B3b). The census does not rise: the face was a refusal before, and it is a downgrade now. | Session: confirm the adoption against the ruling's (2) / (3) split, or veto it (RL5 is OWNER-VETOABLE). If the committed tree derives relief-3000-7, re-measure #56 there. If it still fails, pin it as a fixture in a later round. | hardening |
| N-s6-2 | **The declared shift's seams in other items' files** (rule (1): not built here). Tests: the six RELATED reds above, owned by M0-a-12, M0-k-02 / M0-k-04 and M0-x-05 (one draw fixes four of them), and M0-e-06. Committed records that go stale with no test red: `summaries/M0-e-06.json` (district and water `spine` downgrade counts and causes: on today's tree relief CITY seeds 1 – 8 fall from 46 to 10, `contract.sharpCorner` 39 → 3), and `summaries/M0-c-06.json`'s `corpusSpine` (the fusion gate's corpus rows: test size seeds 1 – 8, 9 → 4; seeds 9 – 24, 38 → 2). The roof rows of both stay. `summaries/M0-a-12.json` is unchanged: its corpus has 0 `sharpCorner`, and its runner test reads only the roof count. `bench/test/worklimits/fixtures/summaries/*.json` are frozen fixtures and do not move. No layout or site test pins a `W_DOWNGRADE` count from a real skeleton run (`layout/test/pipeline/core/runner.test.ts` stubs its warnings). | Session's seams, in the round's commit or right after it, before the closing check runs RELATED. | hardening |
| N-s6-3 | **Lawful-input validator downgrades the round does not touch, every use** (N-58, J264): relief-60 seed 3 district #9 (`faces: face 5 is open at node 6`); relief-3000 seed 11 district #25 (`planarity arc 6 crosses arc 8`); the fusion harness's river seed 7 water face #0, in both the fusion and integrated runs (`planarity arc 34 crosses arc 36`). | MAKE-IT-SUCCEED is an engine repair (N-s3-3's class). Session finding with these seeds. | M4 |
| N-s6-4 | **Derivations with no district faces on today's tree** (the session's note, not this item's). relief-60 seeds 1 and 11 – 16, relief-3000 seeds 4, 6, 7, 9, 10, 12 and 13 (CITY, default config), and the fusion harness's river runs at seeds 8, 14, 19 and 23 (both runs), derive 0 district faces. The 2026-10-14 tree had districts at those seeds (S3's census). These seeds come from the other items' in-flight edits restored from the WSL tree. | Session: attribute the seeds when M0-e-03 s1 and M0-e-04 s2 land. | — |

| N-s6-5 | **J761 (2026-11-10, the session's ruling on the 08:23Z hand-back): the block is lifted; the build returns ready-for-check.** The adoption is confirmed (28 627 faces; 145 in [1°, 5°) all validate for spine and regions; 12 below 1° still refused; roof unchanged). The six reds are the declared shift's, not the round's failing lines: five are closed by the session's seam (lane session/a11s6-seams-1), which is the session's and not this item's edit: `packages/testkit/src/constructive/cases/limits.ts` (sha256 9089535e...ed25fcedb5d2... as given: 9089535ed22030e01858443968cd66ad20b07ac58a10b181bd4c6e25fcedb5d2), `packages/testkit/src/constructive/coverage.ts` (0bb46598c2d12b43affbc7ad02dc78722e54020bcf791f597e0c6fc6ff48cd35) and M0-a-12's `bench/test/skeleton/runner.test.ts` (2b1f6675b501d370b91173467bd57298174451a6b058b1de37d9c19fc5112d6a); hashes re-read on this tree and equal. The sixth, `bench/test/site/summary.test.ts`'s canary (M0-e-06), is the stale-summary class, a declared red until the summary re-run (N-s6-2). N-s6-1's face is re-measured by the session on the merged tree. Returned from disk; nothing rebuilt. |

## Closing check S6 (check/M0-a-11-close-s6, 2026-11-10 to 2026-11-11)

The closing checker's notes. No row here fails the round (N-45, J180). The verdict is in `checks/M0-a-11-s6.md`: PASS. The
probe sources and their results are in `checks/M0-a-11-s6-evidence/` (claimed by the record `check-M0-a-11-notes`):
`band-lib.mjs`, `measure-band.mjs`, `stress-band.mjs`, `stress-results.json`, `stress-rejections.json`. Run from `plat/`:
`corepack pnpm exec tsx --conditions=plat-source docs/build/checks/M0-a-11-s6-evidence/measure-band.mjs <out.json> <family> [args…]`
(families: `corpus`, `holed <seeds>`, `squares <seeds>`, `faceset <seed> <n>`, `fusion <seeds>`, `relief <fixture> <config> <seeds>`).

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s6c-1 | **The builder's measurement probe was not quoted in its notes** (RL5 asked for it quoted; the builder's mirror is deleted). This seat re-measured with its own probe, committed above. The two agree where they overlap: the fusion harness's test-size faces, seeds 1 – 8, are 481 faces with 5 in band, all 5 validated on spine and on regions, and 9 → 4 downgrades, figure for figure. The relief CITY rows agree too: 1 025 faces (518 + 507), 36 in band (16 + 20), all validated, 46 → 10 downgrades on spine and regions. Every band face this seat measured validates (100 of 100 over 39 506 faces). On relief-3000, seeds 4, 6 and 7 derive no district on this tree, so N-s6-1's district #56 is not readable here either. | None for the round. The session runs `measure-band.mjs relief relief-3000 default 7` on the merged tree to read N-s6-1's district #56 (J761 (1)). | — |
| N-s6c-2 | **The band's validator rejections under stress: 21 of 88 180 band faces (0.024 %)**, typed `W_DOWNGRADE` on spine and on regions alike (planarity 16, faces 5; 17 at a convex tip, 4 at a reflex one; kinds: star 11, multi-feature rectangle 7, holed slab 2, spike 1; 3 lie within 0.01° of 1° and 1 within 0.01° of 5°). Each face is kept in `stress-rejections.json` with its rings, cause and detail. The same generator just above the band ([5.05°, 9°)) has 9 rejections in 24 034 faces (0.037 %) on roof and spine alike, so this is the engine's spike-shaped class, not the band's. LAWFUL input; verdict MAKE-IT-SUCCEED (N-58). | An engine repair, with N-s6-3's seeds; the 21 faces are fixture candidates. | M4 |
| N-s6c-3 | **The 1° edge is pinned to a band of about 0.23°.** `contract.test.ts` reads a 0.86° apex (refused) and a 1.09° apex (runs). A bound of 0.95° (M4b) survives the item's own tests and is red only on M0-a-12's `runner.test.ts` (its 0.9548° spike); a bound of 1.05° (M5b) survives every test this seat ran. | Add one lattice triangle on each side within 0.01° of 1° to `contract.test.ts` (the stress drew 8 295 faces in [1°, 1.01°) with no surprise). | M4 |
| N-s6c-4 | **The use's bound is pinned on the outer ring's convex and slit corners only.** Three deliberate-writer mutants survive: a hole's corners checked at roof's 5° for every use (M9), a hole's corners not checked for spine and regions (M9b), and spine and regions checked on the convex side only, so a slit above 359° is admitted (M10a). The honest code passes one bound to every ring through one `Math.abs(cross)`, which roof's 357.6° slit pins. The stress read 20 682 holed band faces, a wedge-shaped hole among their kinds, and 21 809 reflex ones on the real code. | Pin a holed face whose hole has a 3° corner (validates for spine and regions, refused for roof), a hole with a 0.86° corner (refused for every use), and a slit above 359° (refused for spine and regions). | M4 |
| N-s6c-5 | **The seam's fixture no longer draws roof's own band.** The session's `buildSharpCorner` draws tan θ ≤ 0.017 (under 0.98°) for either use, where it drew up to tan θ = 0.08 before. The fixture is sound (the verdict's seam section). The roof reader's refusal between 1° and 5° is now exercised only by the kernel's `contract.test.ts` (the 2.98° apex, the 357.6° slit and the 3.43° spike, each refused for roof). | None needed. If the ladder should reach it, a second roof-only draw in [1°, 5°). The session's file. | — |
| N-s6c-6 | **A band face that also breaks a later check changes its refusal's name, not its outcome.** The contract checks the sharp corner first. A face with a corner in [1°, 5°) that is also not simple, or whose hole touches a ring, was `contract sharpCorner` for every use and is now `contract notSimple` (or `holeContact`) for spine and regions: 2 397 and 254 of the stress's 104 000 draws. It downgrades either way and the total never rises, but a summary's per-cause counts move between classes (`contract.sharpCorner` falls, `contract.notSimple` may rise) — one more figure for N-s6-2's stale summaries. In the measured pipeline families (fusion, relief-60, relief-3000: 1 506 faces) no face changed its cause this way (0); the 8 `notSimple` faces there have no corner under 5°. | The session's summary re-run reads the new split; no code change. | — |
| N-s6c-7 | **The refusals that remain on spine and regions in the measured families, classed (N-58, J264).** Of 39 506 faces: 9 `contract sharpCorner` below 1° (M0 (b) face set 6, relief-3000 3) — LAWFUL slivers; REFUSE as the design's edge table has it, typed and visible, the reader's downgrade the layer that gives the alternative. 8 `contract notSimple` (fusion 2, relief-3000 6) — OUR OWN INTERMEDIATE, pinched faces an earlier stage made; MAKE-IT-SUCCEED upstream. 3 `validator` rejections (fusion planarity 2, relief-60 faces 1) — LAWFUL; MAKE-IT-SUCCEED, the engine's repair. None is new with the round and the census fell (72 → 15 on spine and on regions over the four families read before and after; roof 72 → 72). | The session routes the `notSimple` faces to the stage that makes them (the probe's `groups` name the family: `measure-band.mjs … fusion 1 … 8`, `… relief relief-3000 default 1 … 8`) and the validator's three to the engine's repair with N-s6-3. | M4 (the `notSimple` faces earlier, if a stage round owns them) |

## Hardening round S7 (build/M0-a-11-fix-s7, 2026-11-12): the builder's row-by-row outcome (J237 (2), J264, J290 / N-58; Q180 (a), (b))

The round's three lines are queue row Q180 (a) and (b) (read whole; J772, J774): LINE 1 = N-s6c-3 (the 1° edge), LINE 2 =
N-s6c-4 (the bound on holes and on both sides of a corner), LINE 3 = N-s6-3, N-s6c-2 and N-s6c-7's validator class (the
engine's spike class). Lines 1 and 2 are tests only. Line 3 was diagnosed first, with no change to the tree's source,
and the table below was written before any source change. Every probe and mutant ran in the lane's mirror
`/home/user/maps-scratch/waves/selfcheck-build-M0-a-11-fix-s7/plat` (a `cp -a` of `plat/`, node_modules included;
`find … -type l -lname '/home/user/maps-architecture*'` printed nothing; `realpath` of
`packages/layout/node_modules/@plat/kernel` and `bench/node_modules/@plat/kernel` lie inside the mirror). The probes are
the mirror's own (`probe-s7/`): a copy of `engine.ts` with a trace of every candidate event and of the arc each event
makes (`engine-traced.ts`), and a re-reading of the committed S6 probes (`band-lib.mjs`, `stress-band.mjs`,
`measure-band.mjs`) extended to keep every face the validator rejects on any use. The committed evidence folder was not
edited.

### LINE 3 (i): the diagnosis, before any source change

**Which faces.** Every kept face was re-run on today's head (the tree as it stood at the round's start):

* the 21 faces of `checks/M0-a-11-s6-evidence/stress-rejections.json`: **all 21 still reject**, with the S6 checker's
  check and detail on spine and on regions, roof `contract sharpCorner`;
* N-s6-3's three, re-derived on today's head (`deriveSpike(relief-60, 3)`, `deriveSpike(relief-3000, 11)`, CITY, default;
  the fusion harness `derive(kind, 7, { frameHa: 900, walledHa: 30, river: true })`): **all three still reject**, same
  indices, same check and detail, on roof, spine and regions — relief-60 seed 3 district #9 (`faces: face 5 is open at
  node 6`), relief-3000 seed 11 district #25 (`planarity arc 6 crosses arc 8`), the river seed 7 water face #0 in both
  the fusion and integrated runs (`planarity arc 34 crosses arc 36`). Each is the only validator rejection of its
  derivation;
* **the 9 just above the band** (N-s6c-2): the S6 checker's run `stress-band.mjs <out> <seed> <draws> 5.05 9` is not
  recorded with its seed, and none of the seeds this seat tried reproduces its counts (24 034 faces, 9 rejections):
  seeds 1, 2, 3, 4, 5, 6, 13 × 2 000 per kind give 23 995 – 24 057 faces at or above 5° and 5, 8, 8, 11, 6, 9, 10
  validator rejections. The class was therefore re-derived on seeds 1 – 3 (21 faces, in the table) and the fix was also
  read on seeds 4, 5, 6 and 13 (36 more faces). Every one of these faces is lawful input (snapped lattice rings, simple,
  no contact).

**How each was traced.** Each face ran through `prepareRings`, then `runEngine` in the strict and the tolerant reading
with the trace on, then `coalesce` and `validateSkeleton`, exactly as `skeleton.ts` composes them. For a planarity
failure the trace names the event that made each of the two crossing arcs; for an open face, the event at which the
angular order failed to alternate (`pairing`). At every event the trace lists every other candidate event within 1 mm in
offset time and 1 cm in position of the one taken, and whether the resolution joined it, and every split whose point
lies within 1 cm of an end of the edge it splits.

**The text.** §3.8 *Numeric contract*: "Events closer than 1 mm in offset time and 1 cm in position are coalesced into one
multi-edge event; ties are broken by the input vertex's index in the ring". The engine applies this sentence in three
places: in the strict reading it coalesces only events coincident to the coordinates' rounding scale (`eps`, 10⁻⁹ of the
extent) plus its two millimetre rules (C-0168 (4)); the 1 cm is applied to the finished graph by `coalesce.ts`, which
contracts arcs shorter than 1 cm; the tolerant reading (S3) joins a neighbouring vertex standing within 1 cm of the
event's point, but never an end of an edge the event splits (T13's pin), and does not join a second event by its time.

**The cause classes found** (the strict reading's first wrong event; the tolerant reading fails at the same kind of event
later, or at the same one):

* **(1) Events within §3.8's 1 mm and 1 cm resolved apart — the engine departs from the sentence above.** Three forms, one
  sentence:
  * **(1a) two or three collapses resolved apart.** A sharp spike's tip (a convex vertex moving at 1 / sin(θ / 2), 11 to
    57 cm per unit of offset time) meets both of its base vertices within a fraction of a millimetre: star-12#510's event
    1 takes the collapse of edge 11 at t = 569.593213 and leaves the collapse of edge 10 at t = 569.594094, 0.0088 mm
    later in offset time and 0.20 mm away. A 0.2 mm wavefront edge is left; its two ends move almost in parallel, so it
    collapses only 728 units later, and the two arcs that run in between (here 1 009 cm and 1 791 cm long) cross the
    tip's arc — `planarity`. The tolerant reading joins this pair (the 1 cm join), and fails later at a (1b).
  * **(1b) a split taken alone beside the collapse at its edge's end.** spike-2#1510's event 3: the near-straight vertex
    8 (lines 1 and 5, k = −8.4 · 10⁻⁶) reaches line 6 at t = 5 314.285677; the collapse of the wavefront edge from 8 to
    vertex 6 — the start of the edge split — falls at t = 5 314.291700, 0.06 mm later and 0.065 mm away, and vertex 6
    stands 0.26 mm from the split point. The split is resolved alone, 0.26 mm past the edge's start, so the order at the
    node is in6 out5 out6 in1 — it does not alternate — `pairing`, and the face is open (`faces: face 0 is open at node
    1`). The tolerant reading does the same, because its join excludes the ends of a split edge.
  * **(1c) a split within 1 cm of the split edge's end vertex.** relief-3000 seed 11 district #25's event 4: the reflex
    vertex 133 reaches line 125 at t = 193.186871, and the reflex vertex 126, the end of the edge it splits, stands 1.7 mm
    from that point at that moment (two reflex vertices meeting). The engine splits the edge 1.7 mm from its end; the
    1.7 mm edge left collapses only at t = 227.25 (event 5), and its arc crosses the arc of event 4 — `planarity arc 6
    crosses arc 8`. relief-60 seed 3 district #9 has the same at events 17 and 22 and fails to alternate at event 66.
* **(2) A near-straight vertex born off one of its lines (residual after (1)'s repair; not decided by the text).** A
  vertex between two lines within about 10⁻⁵ rad of one direction cannot be solved from its lines (their meeting point is
  ill-conditioned), so it starts at its event's node (`anchor`, C-0168 (2)); when that node lies up to a few millimetres
  off one of its lines it keeps that offset for its whole life. A later event at the same point then falls more than 1 mm
  apart in offset time: multi-1#1383, in the repaired reading's event 13, has a split at t = 15 665.142 and the collapse
  at the split edge's end at t = 15 665.586 — 4.4 mm apart in time, 0.04 mm in position. §3.8 joins events closer than
  1 mm in time *and* 1 cm in position, so the text does not join these. multi-2#257 (above the band) ends the same way:
  vertices 19 and 20 are born 0.25 and 0.80 cm off a line, and a cascade of folds at t = 9 418 between nearly parallel
  lines puts node 30 9 419 cm from its edge's line (`heights`).
* **(3) A fast reflex vertex meeting another, within 1 mm in time but beyond 1 cm in position (not decided by the
  text).** multi-2#9: the tip of a 1.1° slit (vertex 2, k = −104, moving 104 cm per unit of offset time) and the tip of a
  second slit (vertex 6) meet at t = 224.2: vertex 6 reaches the edge vertex 2 bounds 1.61 cm from vertex 2, which is
  0.155 mm in offset time at vertex 2's speed. §3.8's 1 cm in position does not join them; the split leaves a 1.6 cm
  edge, and vertex 2's arc (events 3 and 4) crosses vertex 6's — `planarity arc 3 crosses arc 4`.
* **(4) A collapse spread over just more than 1 cm (not decided by the text).** The fusion harness's river seed 7 water
  face (332 vertices): at the strict reading's event 29 (t = 500.1115) four vertices collapse within 0.4 mm in offset
  time, three within 0.15 mm in position and the fourth 1.08 cm away. §3.8's 1 cm does not join the fourth; a 1.08 cm
  ridge is left (longer than `coalesce.ts`'s 1 cm, so not contracted), and a 41 m arc entering one end of it crosses the
  arc entering the other at the validator's millimetre — `planarity arc 34 crosses arc 36` (the coalesced graph's
  numbering; arcs 47 and 49 in the engine's). The tolerant reading fails the same way.

**The table** (the use's check and detail are the same on every use that runs: spine and regions for a band face, whose
roof is `contract sharpCorner`; roof, spine and regions for the others; "first wrong event" is the strict reading's;
"the class repaired" reads the face again with a third reading that applies §3.8's sentence at the event — a probe copy
of the engine in the mirror, before the tree changed):

| face | kind, sharpest corner | uses | the validator's check: detail | first wrong event (strict) | cause class | the class repaired |
|---|---|---|---|---|---|---|
| multi-1#180 | multi 1.9107° reflex | spine, regions | planarity: arc 2 crosses arc 17 | event 1; the crossing arcs made at events 2 and 11 | (1a) | validates |
| multi-1#1383 | multi 1.0083° convex | spine, regions | planarity: arc 4 crosses arc 18 | event 1; the crossing arcs made at events 3 and 12 | (1a), then (2) | still rejected: faces: face 1 is open at node 2 |
| multi-1#1385 | multi 1.0210° reflex | spine, regions | planarity: arc 0 crosses arc 8 | event 1; the crossing arcs made at events 1 and 5 | (1a) | validates |
| star-1#515 | star 2.1705° convex | spine, regions | planarity: arc 0 crosses arc 3 | event 1; the crossing arcs made at events 1 and 2 | (1a) | validates |
| star-1#529 | star 2.8382° convex | spine, regions | planarity: arc 0 crosses arc 2 | event 1; arcs made at events 1 and 2 | (1a) | validates |
| star-1#867 | star 4.9667° convex | spine, regions | planarity: arc 0 crosses arc 5 | event 1; arcs made at events 1 and 3 | (1a) | validates |
| star-1#1749 | star 4.9910° convex | spine, regions | planarity: arc 0 crosses arc 3 | event 1; arcs made at events 1 and 2 | (1a) | validates |
| spike-2#1510 | spike 4.6921° convex | spine, regions | faces: face 0 is open at node 1 | event 3; the order fails to alternate at event 3 | (1b) | validates |
| multi-2#9 | multi 1.1006° reflex | spine, regions | planarity: arc 3 crosses arc 4 | events 3 and 4 (the two slit tips) | (3) | still rejected: planarity: arc 4 crosses arc 5 |
| multi-2#1550 | multi 1.0130° convex | spine, regions | planarity: arc 2 crosses arc 8 | event 1; arcs made at events 2 and 5 | (1a) | validates |
| multi-2#1828 | multi 1.2348° convex | spine, regions | planarity: arc 5 crosses arc 31 | event 1; arcs made at events 5 and 17 | (1a) | validates |
| star-2#426 | star 1.1052° convex | spine, regions | planarity: arc 0 crosses arc 3 | event 1; arcs made at events 1 and 2 | (1a) | validates |
| star-2#982 | star 4.8323° convex | spine, regions | faces: face 1 is open at node 21 | event 7; fails to alternate at event 7 | (1b) | validates |
| holed-slab-2#1318 | holed slab 4.7666° convex | spine, regions | faces: face 0 is open at node 1 | event 9; fails to alternate at event 9 | (1b) | validates |
| multi-3#223 | multi 1.3395° reflex | spine, regions | planarity: arc 0 crosses arc 10 | event 1; arcs made at events 1 and 7 | (1a) | validates |
| star-3#1072 | star 4.7831° convex | spine, regions | planarity: arc 0 crosses arc 4 | event 1; arcs made at events 1 and 3 | (1a) | validates |
| star-3#1900 | star 4.6713° convex | spine, regions | planarity: arc 0 crosses arc 4 | event 1; arcs made at events 1 and 3 | (1a) | validates |
| star-11#401 | star 1.0024° convex | spine, regions | planarity: arc 0 crosses arc 4 | event 1; arcs made at events 1 and 3 | (1a) | validates |
| star-11#547 | star 1.0042° convex | spine, regions | faces: face 1 is open at node 19 | event 5; fails to alternate at event 5 | (1b) | validates |
| holed-slab-11#413 | holed slab 1.0068° convex | spine, regions | faces: face 0 is open at node 1 | event 13; fails to alternate at event 13 | (1b) | validates |
| star-12#510 | star 4.9984° convex | spine, regions | planarity: arc 0 crosses arc 2 | event 1; arcs made at events 1 and 2 | (1a) | validates |
| relief-60 seed 3 district #9 (N-s6-3) | district 11.18° | roof, spine, regions | faces: face 5 is open at node 6 | event 17 (and 22); fails to alternate at event 66 | (1c) | validates |
| relief-3000 seed 11 district #25 (N-s6-3) | district 19.56° | roof, spine, regions | planarity: arc 6 crosses arc 8 | event 4; arcs made at events 4 and 5 | (1c) | validates |
| fusion river seed 7 water #0, fusion and integrated runs (N-s6-3; one ring set) | water 44.64° | roof, spine, regions | planarity: arc 34 crosses arc 36 | event 29 (both crossing arcs) | (4) | still rejected: the same |
| spike-1#249 | spike 6.9103° convex | roof, spine, regions | faces: face 2 is open at node 3 | event 3; fails to alternate at event 3 | (1b) | validates |
| spike-1#1946 | spike 7.2795° convex | roof, spine, regions | faces: face 2 is open at node 3 | event 3; fails to alternate at event 3 | (1b) | validates |
| star-1#1843 | star 6.8010° convex | roof, spine, regions | planarity: arc 0 crosses arc 2 | event 1; arcs made at events 1 and 2 | (1a) | validates |
| holed-slab-1#1401 | holed slab 8.9777° convex | roof, spine, regions | faces: face 2 is open at node 3 | event 8; fails to alternate at event 8 | (1b) | validates |
| holed-slab-1#1859 | holed slab 6.7664° convex | roof, spine, regions | faces: face 0 is open at node 1 | event 14; fails to alternate at event 14 | (1b) | validates |
| spike-2#1971 | spike 5.6537° convex | roof, spine, regions | faces: face 0 is open at node 1 | event 3; fails to alternate at event 3 | (1b) | validates |
| multi-2#257 | multi 5.2339° convex | roof, spine, regions | planarity: arc 4 crosses arc 6 | event 1; arcs made at events 3 and 4 | (1a), then (2) | still rejected: heights: node 30 lies 9 419 cm from edge 13's line |
| star-2#30 | star 5.8024° convex | roof, spine, regions | planarity: arc 0 crosses arc 3 | event 1; arcs made at events 1 and 2 | (1a) | validates |
| star-2#1229 | star 7.3874° convex | roof, spine, regions | planarity: arc 0 crosses arc 2 | event 1; arcs made at events 1 and 2 | (1a) | validates |
| star-2#1517 | star 8.6960° convex | roof, spine, regions | planarity: arc 0 crosses arc 4 | event 1; arcs made at events 1 and 3 | (1a) | validates |
| star-2#1906 | star 6.9676° convex | roof, spine, regions | planarity: arc 0 crosses arc 4 | event 1; arcs made at events 1 and 3 | (1a) | validates |
| holed-slab-2#1177 | holed slab 5.8703° convex | roof, spine, regions | planarity: arc 10 crosses arc 13 | event 8; arcs made at events 8 and 9 | (1a) | validates |
| holed-slab-2#1277 | holed slab 5.2615° convex | roof, spine, regions | faces: face 0 is open at node 1 | event 9; fails to alternate at event 9 | (1b) | validates |
| multi-3#283 | multi 5.9028° convex | roof, spine, regions | planarity: arc 4 crosses arc 14 | event 1; arcs made at events 3 and 9 | (1a) | validates |
| multi-3#418 | multi 6.5583° reflex | roof, spine, regions | planarity: arc 0 crosses arc 10 | event 1; arcs made at events 1 and 6 | (1a) | validates |
| multi-3#1161 | multi 5.3252° convex | roof, spine, regions | planarity: arc 4 crosses arc 18 | event 1; arcs made at events 3 and 11 | (1a) | validates |
| multi-3#1756 | multi 6.2440° reflex | roof, spine, regions | planarity: arc 4 crosses arc 16 | event 3; arcs made at events 3 and 10 | (1a) | validates |
| star-3#443 | star 5.8457° convex | roof, spine, regions | planarity: arc 0 crosses arc 4 | event 1; arcs made at events 1 and 3 | (1a) | validates |
| star-3#1186 | star 8.4831° convex | roof, spine, regions | planarity: arc 0 crosses arc 2 | event 1; arcs made at events 1 and 2 | (1a) | validates |
| star-3#1887 | star 7.0308° convex | roof, spine, regions | planarity: arc 0 crosses arc 2 | event 1; arcs made at events 1 and 2 | (1a) | validates |
| holed-slab-3#1609 | holed slab 8.0546° convex | roof, spine, regions | faces: face 0 is open at node 1 | event 8; fails to alternate at event 8 | (1b) | validates |

(The band faces' ids are the S6 checker's, from `stress-rejections.json`; the faces above the band are this seat's,
`stress-band.mjs`'s generator at seeds 1 – 3, 2 000 per kind, angles in [5.05°, 9°).)

**The classes counted** over the 46 rows (45 ring sets; the river face counted once per run): **(1a) 27** (of which 2 meet
(2) after (1) is repaired), **(1b) 12**, **(1c) 2**, **(2) 2** (both after a (1a)), **(3) 1**, **(4) 2** (one ring
set). On the 36 further faces above the band (seeds 4, 5, 6, 13) the same repaired reading validates 32; the 4 left
(multi-4#380, multi-5#659, multi-13#231, multi-13#1800) are all multi-feature rectangles, the shape of (2) and (3).
**No face of the table no longer rejects on today's head.**

**What this decides (LINE 3 (ii)).** Class (1) is the engine departing from §3.8's sentence at the event: the events are
within 1 mm in offset time and 1 cm in position and the engine resolves them apart. It is this item's to FIX. Classes
(2), (3) and (4) are the engine doing what the text says — the two events are more than 1 mm apart in time ((2)) or the
vertices more than 1 cm apart in position ((3), (4)) — and the doubles' error then gives a graph the validator rejects.
They are REPORTED with their faces and traces for the session's ruling, and their faces are pinned at today's outcome.

### LINE 3 (ii): the fix (inside the item's owns; a declared shift)

The sentence §3.8 states and the engine did not apply at the event — "Events closer than 1 mm in offset time and 1 cm in
position are coalesced into one multi-edge event" — is applied in a **third reading**, `coalescing`, which `skeleton()`
takes only when the strict and the tolerant readings both give no validated graph, under what is left of the same work
law. It is the tolerant reading with two additions, both at the event:

* every candidate event of the current wavefront within 1 mm in offset time (`NEAR_CM`) and 1 cm in position
  (`JOIN_CM`) of the earliest joins it — its vertices are forced into the event and its split target with them (the
  strict and tolerant readings join only events within `eps`, the coordinates' rounding scale) — classes (1a) and (1b);
* a split whose point lies within 1 cm of an end of the edge it splits is that end vertex's event: the nearer end joins
  and nothing is split (the strict and tolerant readings split whenever the point is strictly inside) — class (1c).

`engine.ts`: `EngineReading` gains `'coalescing'` (`tolerant` is every reading but `strict`), the forced-join test and the
split test read the two tolerances under `coalescing` and are unchanged otherwise. `skeleton.ts`: the readings are
`['strict', 'tolerant', 'coalescing']`. Nothing else changes: the clean, the contract, the validator, `coalesce.ts`, the
work law, every export of the folder index and the barrel (the API is frozen, J263 Q1; `EngineReading` is a module type of
`engine.ts`, not exported by `skeleton/index.ts`). A widening of the split candidates' look-ahead to 1 mm, tried in the
prototype, moved no face of the class (57 faces read with and without it) and was dropped, so the change is the smallest
the class needs.

**Why a third reading and not the tolerant one changed:** the tolerant reading validates the water class and corpus
1144 / 1840 today (golden digests); applying the sentence there first moves those outputs (mutant L8 below: the order
swapped turns the digests of corpus 1144 and relief-60 seed 3's water face red). Taken last, the reading cannot move any
output either earlier reading validates — it runs only on a would-be downgrade.

### Rows

| line | outcome | evidence | pin and mutants (mirror; `packages/kernel/test/skeleton`, `--maxWorkers=1 --bail=1`; each file restored from `plat/` and `cmp`-clean) |
|---|---|---|---|
| LINE 1 — Q180 (b) / N-s6c-3: the 1° edge | **PINNED** (tests only, no source change for the line) | `contract.test.ts` 'the use's bound at its edges, on every ring and on both sides of a corner (… hardening round S7)': **'the 1° edge within 0.01°'** — the apex (0, 0) with arms (1 722, ∓15): cross 51 660, dot 2 965 059, 0.998159° (in [0.995°, 1°)), refused `sharpCorner` for every use without running; arms (1 716, ∓15): cross 51 480, dot 2 944 431, 1.001649° (in [1°, 1.005°)), refused for roof, validated for spine and for regions with no warning and equal graphs apart from `use`. **'a corner exactly at the bound as the contract computes it'** — apex (−8 388 000, −8 388 000), arms (8 213 921, 10 684 686) and (9 525 818, 11 953 519): cross 3 595 113 485 149, dot 205 963 913 622 412; cross / dot exceeds tan 1° by 2.3 · 10⁻¹⁹, and the double product 0.017455064928217585 · dot rounds to the cross exactly (found by a continued-fraction search over lattice arms; the test asserts the equality with its own literal), so the contract's strict test (`\|cross\| < tan · dot`) admits it: refused for roof, validated for spine and regions. Every angle computed from the definition (exact integer cross and dot; atan2), never with the code under test. | **M4b** (spine and regions bound tan 0.95°) red on the edge test alone (the item's own tests; it was red only on M0-a-12's runner test before); **M5b** (tan 1.05°) red; **M4c** (tan 0.995°) red; **M5c** (tan 1.005°) red; **Mle** (`<` → `<=` in `sharpCorner`) red on the exact-bound test — **killed**, not equivalent: the lattice reaches the equality. |
| LINE 2 — Q180 (b) / N-s6c-4: holes and both sides | **PINNED** (tests only) | the same describe, over a 60 × 60 m square: **(a)** a hole whose apex (2 000, 3 000) has arms (2 000, ∓52): cross 208 000, dot 3 997 296, 2.9787° (the face's angle there 357.02°) — refused `sharpCorner` for roof, validated for spine and regions (no warning, the two graphs equal apart from `use`); **(b)** a hole whose apex has arms (2 000, ∓15): cross 60 000, dot 3 999 775, 0.8594° — refused for every use; **(c)** a slit notch whose floor (2 000, 1 000) has arms (15, 2 000) and (−15, 2 000): 0.8594° on its far side, an interior angle of 359.1406°, 30 cm wide at its mouth (beyond `attractCm`) — refused for spine and regions as for roof. | Each mutant red **on its pin alone** (`-t` filtered to the one test): **M9** (a hole's corners at roof's 5° for every use: `sharpCorner(pts[k], k === 0 ? SHARP_TAN[use] : TAN_5_DEG)`) red on (a); **M9b** (a hole's corners not checked for spine and regions) red on (b); **M10a** (spine and regions checked on the convex side only: `cross >= 0 && cross < tan · dot` below roof's bound) red on (c) (and, on the whole folder, first on (b): the hole's corner is reflex from the face). |
| LINE 3 — Q180 (a): the spike class | **(1) FIXED and PINNED** (a declared shift); **(2), (3), (4) REPORTED**, their faces pinned at today's outcome | The diagnosis above. After the fix: of the table's 41 class-(1) faces, **41 validate** on every use they failed on; on 36 more faces above the band (seeds 4, 5, 6, 13) 32 validate. The 4 left in the table are the reported classes. | `spikeclass.test.ts` with `spike-class.json` (the 45 ring sets): each of the **41** class-(1) faces validates for every use it failed on, its whole result pinned by digest per use (golden.test.ts's digest), spine equal to regions apart from `use`, a band face still refused `sharpCorner` for roof; each of the **4** reported faces gives today's outcome on every use it runs (`W_DOWNGRADE`, cause `{ validator, check, detail }`, events > 0). Mutants, **all red on the final code** (the folder with `--bail=1`, re-run after the look-ahead was dropped); the counts in brackets are `spikeclass.test.ts` without `--bail`, read before the drop: **L1** the fix reverted (two readings) — red (41 of 41 fixtures); **L2** no event join by 1 mm / 1 cm — red (29 of 41); **L3** no split-end join — red (4, both (1c) faces among them); **L5** time 0.5 mm and **L10** time 2 mm — red; **L6** position 0.5 cm and **L11** 2 cm — red; **L7** split-end radius 2 cm — red (on the reported (3) face, whose outcome it moves); **L8** the third reading taken before the tolerant one — red on the class's digests and on golden.test.ts's corpus 1144 and the relief-60-3 water face (the no-shift guard); **L9** the third reading not tolerant — red; **L12** the split's end chosen as the strict reading chooses it (`s <= sa`) instead of the nearer — red (relief-60 seed 3 #9). `contract.test.ts` 'the validator stays the net' and `downgrade.test.ts`'s corrupted-output helper count the `finished` hook 3 times now (all three readings run on a corrupted face, and the validator still downgrades it). |

### Declared shift (§3.8 *Decision*; J237 rule (3)) and LINE 3 (iii): it moves nothing else

* **This item's moved output.** A face whose strict and tolerant readings both fail the validator and whose third
  reading validates now returns that validated graph, with no warning, for every use; before, the reader's downgrade
  (`W_DOWNGRADE`, cause `validator`). A face that fails all three readings keeps its downgrade and its cause (the strict
  reading's, as before) and now charges the third reading's events too, under the same law (`events` rises; the fusion
  river seed 7 water face: 590 → 781 on every use). Nothing a strict or tolerant reading validates moves: the third
  reading never runs on it.
* **Measured before and after** (the mirror; every face dumped once from today's head, then read with the head's
  `src/skeleton/` and with the round's, per face and use the outcome and the SHA-256 of the whole value): the skeleton
  corpus (2 000), §13.1's holed polygons and snapped rotated squares at seeds 1, 2, 3 (3 000 + 3 000), the M0 (b) face sets
  (`faceAt`, 6 kinds × 2 scales: seed 1 × 500 = 6 000, seed 2 × 2 000 = 24 000), the fusion harness at test size (flat
  and river, both runs, seeds 1 – 8: 542 faces) and the site spike CITY, default config (relief-60 seeds 1 – 8: 612;
  relief-3000 seeds 1 – 8: 841) — **40 995 faces × 3 uses: 0 validated results moved (equal digests), 3 validator
  downgrades became validated (relief-60 seed 3 district #9 on roof, spine and regions), 6 changed only their downgrade's
  `events` (the fusion river seed 7 water face, both runs, every use; cause and detail unchanged), no throw, no
  `E_WORK_LIMIT`.** §13.1's fixtures (24 397) are validated by the strict reading (`fixtures.test.ts` green, seeds 1, 2, 3).
  `golden.test.ts`'s digests (corpus 556, 1236, 1144, 1840, the four holed faces, the relief-60-3 water face on every
  reader) are unchanged and green: **nothing re-recorded**.
* **Time.** The slowest call of the 122 985 is the same face before and after — relief-60 seed 1's water face, validated
  by the first two readings, so untouched — 2 376 ms before, 2 568 ms after (this shared container, CONTENDED; noise).
  A face that reaches the third reading pays for it: the fusion river water face 31 → 43 – 51 ms per call.

### Refusal census of the item's registered families (J264 (4), N-58), per use, before → after

| family | faces | roof | spine | regions |
|---|---|---|---|---|
| skeleton corpus | 2 000 | 0 → 0 | 0 → 0 | 0 → 0 |
| holed polygons, seeds 1 – 3 | 3 000 | 0 → 0 | 0 → 0 | 0 → 0 |
| snapped rotated squares, seeds 1 – 3 | 3 000 | 0 → 0 | 0 → 0 | 0 → 0 |
| M0 (b) face set, seed 1 | 6 000 | 17 → 17 | 1 → 1 | 1 → 1 |
| M0 (b) face set, seed 2 | 24 000 | 48 → 48 | 5 → 5 | 5 → 5 |
| fusion harness test size, seeds 1 – 8 | 542 | 13 → 13 (validator planarity 2) | 4 → 4 (validator planarity 2) | 4 → 4 |
| relief-60 CITY, seeds 1 – 8 | 612 | 19 → **18** | 1 → **0** | 1 → **0** |
| relief-3000 CITY, seeds 1 – 8 | 841 | 48 → 48 | 13 → 13 | 13 → 13 |
| **total** | **40 995** | **145 → 144** | **24 → 23** | **24 → 23** |

**Correction (2026-11-13, build/M0-a-11-fix-s8; Q197 (e), N-s7c-7):** the eight family rows above sum to **39 995** faces (2 000 + 3 000 + 3 000 + 6 000 + 24 000 + 542 + 612 + 841, re-added by round S8's builder), so **119 985** calls over three uses — not the total row's and the shift paragraph's 40 995 (122 985 calls), which C-0500 repeats; every family row and every refusal count (145 → 144, 24 → 23, 24 → 23) stands, and the table is left as written (the round's choices row states the figure).

The census fell by the fixed face and nothing rose. By verdict (N-58), what remains: `contract sharpCorner` (roof's 5°
band and below 1°) — LAWFUL, REFUSE as §3.8's edge table has it, the reader's downgrade the layer; `contract notSimple`
(relief-3000 10, fusion 2) — Q180 (c), the corpus readers' (J774), not this round's; `validator planarity` 2 — the fusion
river seed 7 water face, class (4), REPORTED below. On the stress families (not registered; the S6 checker's generator):
the band's 21 rejections → 2 (multi-1#1383, multi-2#9), the 21 above the band at seeds 1 – 3 → 1 (multi-2#257).

### Notes

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s7-1 | **Class (2), REPORTED: a near-straight vertex born off one of its lines.** A vertex between two lines within about 10⁻⁵ rad of one direction starts at its event's node (its lines' meeting point is ill-conditioned; `anchor`, C-0168 (2)) and keeps the node's offset from one line — up to the 1 cm an event may be coalesced over. A later event at the same point then falls more than §3.8's 1 mm apart in offset time (multi-1#1383: 4.4 mm apart, 0.04 mm in position) and is resolved apart (`faces`, `planarity`), or a fold cascade between nearly parallel lines lands a node at the wrong time (multi-2#257: `heights`, node 30 9 419 cm from its edge's line). Faces: `spike-class.json` `reported` (multi-1#1383, multi-2#257; 4 more of the shape on seeds 4, 5, 13 above the band). Fail-safe: a typed downgrade, cause `validator`. | Session ruling (a design question): whether such a vertex starts on one of its lines (projected onto the line of the edge it bounds) or the coalescing reads a near-straight vertex's events by position alone. | hardening (M4) |
| N-s7-2 | **Class (3), REPORTED: a fast reflex vertex meeting another, within 1 mm in time but beyond 1 cm in position.** multi-2#9: a 1.1° slit's tip (k = −104) is 1.61 cm from the point where the other slit's tip reaches the edge it bounds — 0.155 mm in offset time at its speed. §3.8's 1 cm in position does not join them. (The mutant L7, a 2 cm split-end radius, changes this face's outcome; §3.8 says 1 cm, so the fix keeps 1 cm.) | Session ruling: whether §3.8's position tolerance is read along a vertex's travel (1 mm of offset time × its speed) for a fast vertex. | hardening (M4) |
| N-s7-3 | **Class (4), REPORTED: a collapse spread over just more than 1 cm.** The fusion harness's river seed 7 water face (both runs; N-s6-3): four vertices collapse within 0.4 mm in offset time, the fourth 1.08 cm from the others; the 1.08 cm ridge left is beyond both the event coalescing and `coalesce.ts`'s 1 cm, and a 41 m arc entering one end crosses the arc entering the other at the validator's millimetre. | Session ruling with N-s7-2 (the same tolerance question for a cluster). | hardening (M4) |
| N-s7-4 | **The S6 checker's run above the band is not recorded with its seed** (`stress-band.mjs … 5.05 9`; 24 034 faces, 9 rejections). Seeds 1 – 6 and 13 at 2 000 per kind give 23 995 – 24 057 faces and 5 – 11 rejections each, none the recorded pair. The class was read on seeds 1 – 3 (21 faces, all in the table) and 4, 5, 6, 13 (36). | None needed; a later stress run records its arguments with its counts. | — |
| N-s7-5 | **One more figure for the session's batched summary re-run (Q180 (d)).** relief-60 seed 3 (CITY, default) district #9 now validates on every use: `summaries/M0-e-06.json`'s district `validator` downgrade count for that derivation falls by one per use (roof, spine, regions). A face downgrading on all three readings charges more `skeleton.events` (the fusion river seed 7 water face 590 → 781), which `summaries/M0-c-06.json`'s rows may carry. Neither summary is this item's; no test of the item reads them. | The session's batched re-run (R25, Q36) after the stage rounds land. | hardening |
| N-s7-6 | **Met, not this round's:** the `contract notSimple` district faces (relief-3000 seeds 1 – 8: 10 per use; fusion 2) are Q180 (c), the corpus readers' (J774); the M0-k-02 sharp-corner fixture (N-s6c-5) is the session's. Nothing built for either. | — | — |

### Gates (in the tree, 2026-11-12)

* `install --frozen-lockfile`: 0.
* `lint`: 0 (`lint: eslint 1308 files, 0 errors, 0 warnings`; `lint: probe-red ok`; `lint: 9 whole-tree checks`), run
  again after the last source edit: the same.
* `build`: 0.
* NEAR at full strength (`PLAT_FUZZ_RUNS` unset), W=1 (`test_budget.py`): `packages/kernel/test/skeleton` +
  `packages/kernel/test/num/equivalence.test.ts`: **14 files, 182 / 182**, exit 0 (run seed 1523479374). The item's
  folder alone: 13 files, 157 / 157.
* `fixtures.test.ts` at `PLAT_SKELETON_SEED` 2 and 3: 7 / 7 each (seed 1 in NEAR): 0 crashes, 0 validator failures on
  3 × 1 000 holed polygons.
* M0-a-12's `bench/test/skeleton` (the corpus runner, its seam test): 4 files, 24 / 24.
* `landed:verify -- flow-7 --item M0-a-11`: ok (1 record).
* RELATED@1000, W=1, over `packages/kernel/src/skeleton/engine.ts` and `skeleton.ts`: **404 files, 5 259 passed, 1 failed, exit 1** (`Duration 11947.83s`; run seed -2066755226 (`PLAT_FUZZ_SEED` unset); W=1; 03:44:09Z – 07:03:34Z, run by the waiter's chain and read by the continuing seat; a first launch at 03:26Z died with a container restart and is not a result). The one red is DECLARED and not the item's: `bench/test/site/summary.test.ts` 'the canary CITY record re-derived on this tree is the run's' (M0-e-06's; relief-60 coarse seed 46 received `4c9647bf15914e6d…`, the summary's `eb2046ddce3ce2c1…`) — the stale summary of Q180 (d) / J772 (7), with the SAME received digest as at S6's closing check (row above), so this round's third reading did not move the canary's record. No test of `packages/kernel/test/skeleton/` and no other test whose import path runs through `engine.ts` / `skeleton.ts` fails; S6's seam reds (M0-a-12 runner, M0-k-02/-04 sharp-corner draw and ladders, M0-x-05 coverage, fuzz-bar entry) are not among the reds: the canary's file is the run's only failing file of 404 (the reporter lists failing files only).


## Closing check S7 (check/M0-a-11-close-s7, 2026-11-12)

The closing checker's notes. No row here fails the round (N-45, J180). The verdict is in `checks/M0-a-11-s7.md`. The
probes are the committed S6 ones (`checks/M0-a-11-s6-evidence/`, not edited) read through this seat's own before/after
wrapper in its probe mirror; every run's arguments are in the verdict's table. Two seats of one lane (J714): the
first ran the probes, the mutants and the short gates; the second read the long runs and wrote the verdict.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s7c-1 | **The third reading's work law is pinned only through the second.** A mutant that runs the `coalescing` reading under a fresh law (`limit` instead of `limit − spent`, L10) survives the item's tests: `tolerant.test.ts` 'one work law for both readings' exhausts the law in the second reading only. The honest loop passes one `limit − spent` to every reading, so the escape is a deliberate writer's. It is observable only on a face that fails all three readings within reach of 4 · (n + r) + 64; the seven such faces measured spend 17 – 38 % of the law over three readings. | Extend the work-law test to the third reading: with the `skipResolution` hook burn the law in the third reading and expect the first reading's `validator` cause, `events` ≤ the law + 1. | M4 |
| N-s7c-2 | **The lawful-input validator downgrades that remain after the round, with their seeds** (N-58: LAWFUL, MAKE-IT-SUCCEED; each a typed `W_DOWNGRADE`, cause `validator`, on every use that runs). The S6 generator (`stress-band.mjs <out> <seed> <draws> [lo hi]`), read before and after on 299 000 draws: spine 87 → 5. The five: multi-1#1383 (`1 2000`), multi-2#9 (`2 2000`), multi-2#257 (`2 2000 5.05 9`) — the three pinned as reported — and two on seeds the builder did not read, multi-31#1001 (`31 2000`; `planarity arc 2 crosses arc 5`) and multi-33#1763 (`33 2000 5.05 9`; `planarity arc 2 crosses arc 7`). All five are multi-feature rectangles, the shape of classes (2) and (3). In the registered families: the fusion harness's river seed 7 water face (class (4), both runs). | With the session's ruling on N-s7-1 … N-s7-3; the two new faces are fixture candidates for that round (re-derive with the arguments given). | M4 |
| N-s7c-3 | **The header's words against the split candidates' look-ahead.** `engine.ts` says of the third reading that "every candidate event of the wavefront within 1 mm in offset time and 1 cm in position of the earliest joins it"; the queue gathers a reflex vertex's split candidates only up to the earliest event plus `eps` (`if (c.t > bt + eps) break`), so a split later than the earliest by more than the rounding scale and less than 1 mm is not a candidate and does not join. Every edge collapse is gathered. The builder tried the wider look-ahead and dropped it (no face of 57 moved). Fail-safe either way (the validator is the net). | Reword the header to what the queue gathers, or widen the look-ahead with the classes (2) – (4) ruling and a measured face. | M4 |
| N-s7c-4 | **The third reading is sound only as the last reading.** Taken alone on every face the contract admits it ends `pairing` on faces the strict reading validates: 947 of 317 877 probe faces (0.1 % of the stress faces, 131 of 6 000 and 462 of 24 000 of the M0 (b) face sets, 12 of 540 of the fusion harness's). `skeleton()` never reaches it for those (the order is pinned: L7a, L7b red on `golden.test.ts`). | None for the round. A later proposal to apply §3.8's sentence in an earlier reading has to measure this first. | — |
| N-s7c-5 | **A validated graph with two arcs inside the validator's millimetre** (not the round's: the strict reading's, byte-equal before and after). multi-1#563 of `stress-band.mjs <out> 1 2000 5.05 9` (10 vertices, sharpest corner 5.56°; rings `[[-280034,125555],[-271104,124891],[-269106,151773],[-271243,151932],[-271681,153663],[-271431,151946],[-275686,152263],[-275134,154555],[-275922,152280],[-278035,152437]]`): arcs 4 and 9, 37.6 m and 48.8 m long, run within 1.5 mm of each other at 0.0018° and cross 1.47 cm from their ends by a double-precision reading (`band-lib.mjs`'s independent check); the validator's planarity, on nodes rounded to the millimetre, passes it on every use. One face of 299 000 draws. | A fixture candidate for the engine's hardening with N-s7-1 … N-s7-3 (the two spikes' ridges meet within the coalescing tolerances); no change to the validator (§3.8 defines its millimetre). | M4 |
| N-s7c-6 | **N-s7-4 confirmed.** The S6 check's run above the band (24 034 faces, 9 rejections) was recorded without its seed; `stress-results.json` holds the five band runs only. This check's runs are recorded with their arguments (the verdict's table): above the band at seeds 1 – 3 the "before" reading gives 5, 8 and 8 rejections (21) and the round's 0, 1 and 0. | None. | — |
| N-s7c-7 | **The builder's total of faces is 1 000 too high.** 'Hardening round S7' (the shift paragraph and the census table's total row) and C-0500 give 40 995 faces × 3 uses (122 985 calls); the eight family rows — 2 000 + 3 000 + 3 000 + 6 000 + 24 000 + 542 + 612 + 841 — sum to 39 995 (119 985 calls), which is what this check's own probe read. Every per-family row and every refusal count (145 → 144, 24 → 23, 24 → 23) is right. | Correct the figure where the session next touches the row (a later choices row may state it; rows are append-only). | — |
| N-s7c-8 | **RELATED@1000 of the closing check** (W=1, run seed 1191642842, 07:37 – 10:58): 404 files, 5 259 passed, 1 failed — `bench/test/site/summary.test.ts`'s canary alone (relief-60 coarse seed 46 received `4c9647bf15914e6d…`, the digest the S6 round recorded on its head, row above in 'Hardening round S6': the third reading did not move the canary's record). DECLARED (Q180 (d), J772 (7)); for the session's batched summary re-run with N-s7-5. | The session's (R25, Q36). | hardening |

## Hardening round S8 (build/M0-a-11-fix-s8, 2026-11-13): the builder's row-by-row outcome (J237 (2), J264, J290 / N-58; Q197 (b), (c), (e); J800)

Leg 3 of the merged round M0-d-08 S2 → M0-f-02a S4 → M0-a-11 S8 (J443), on queue row Q197 (read whole by its own grep)
at pass B: (b) N-s7c-1, (c) N-s7c-3, (e) N-s7c-7. The session's ruling (J800) keeps Q197 (a) — the three reported
classes, N-s7-1 … N-s7-3 — and (d) (N-s7c-5) out of this round: **no executable line of
`packages/kernel/src/skeleton/` changes**, no tolerance of §3.8 changes, no digest or golden moves. LINE 1 is tests only,
LINE 2 a comment, LINE 3 text. Mutants and probes ran in the lane mirror
`/home/user/maps-scratch/waves/selfcheck-build-M0-a-11-fix-s8/plat` (a `cp -a` of `plat/` taken before any edit,
node_modules included; `find … -type l -lname '/home/user/maps-architecture*'` printed nothing; `realpath` of
`packages/layout/node_modules/@plat/kernel` and `bench/node_modules/@plat/kernel` inside the mirror; deleted after the
mutants).

### Rows

| line | outcome | evidence | pin and mutants (mirror; `packages/kernel/test/skeleton`, `--maxWorkers=1 --bail=1`; `skeleton.ts` restored from `plat/` and `cmp`-clean after each) |
|---|---|---|---|
| LINE 1 — Q197 (b) / N-s7c-1: the third reading's work law | **PINNED** (tests only; the existing hooks reach the third reading — no seam needed, nothing in `src/` changed) | `tolerant.test.ts` › 'one work law for all three readings: the third runs under what the first two left (hardening round S8; Q197 (b), N-s7c-1)', two tests in the note's shape — the `skipResolution` hook leaves every event of the THIRD reading unresolved (readings counted by the hook's `events === 1`), the law read from the service itself (the `E_WORK_LIMIT` cause's `limit` of a first reading whose every event is skipped): **(i)** the reported spike face multi-1#1383 (`spike-class.json`, spine and regions; it fails all three readings unhooked, 49 events of its law 208): strict spends **23**, tolerant **13**, the third the **172** they left (the hook sees each) plus the one event that reaches the law (charged, not handed to the hook); the downgrade carries the FIRST reading's cause (`validator planarity`, 'arc 4 crosses arc 18', equal to `spike-class.json`'s) and `events` = **209** = the law + 1 (asserted equal and ≤); **(ii)** the L of `downgrade.test.ts` (law 92 = 4 · 7 + 64), its first two readings' finished output corrupted through the `finished` hook (an interior node with no arc), every use: strict **3**, tolerant **3**, third **86**, cause `validator topology`, `events` **93** — robust to any later engine repair of (i)'s face (Q197 (a)). | **S8-M1** — the note's L10, a fresh law for the third reading (`runEngine(input, reading === 'coalescing' ? limit : limit - spent, …)`): **red**, and red by the new tests alone — the folder without `--bail`: 2 failed (the two new tests; (i) third 208 for 172, (ii) 92 for 86), 157 passed. **S8-M2** — the third reading's law one more (`limit - spent + 1`): red ((i) 173 for 172). **S8-M3** — the third reading's events not charged (`if (reading !== 'coalescing') spent += run.events`): red ((i) `events` 36 for 209). |
| LINE 2 — Q197 (c) / N-s7c-3: the header against the split look-ahead | **FIXED** (comment only; no pin — rule (2)) | `engine.ts`'s header paragraph on the third reading now says what the queue gathers: a gathered event within 1 mm in offset time and 1 cm in position of the earliest joins it; the queue gathers **every edge collapse** of the wavefront, but a reflex vertex's splits only in time order up to the earliest event found so far plus `eps` (the edge collapses first, then the vertices in order; one split per vertex, its first hit) — so every edge collapse within the millimetre joins, while a split later than the final earliest by more than `eps` and less than 1 mm is no candidate and does not join, unless the earlier event was found only after its vertex was read; the wider look-ahead (split candidates read up to 1 mm) is not taken — tried in round S7, it moved no face of the 57 measured — and is Q197 (a)'s decision. The in-loop comment at the join ("every event within 1 mm") now reads "every gathered event …, the split candidates gathered only as the header says". **Where the code shows the session's wording too narrow:** "a split only within the rounding scale of the earliest" holds against the earliest event found *when the split's vertex is read* (`bt` is a running minimum: `if (c.t > bt + eps) break`), not the final earliest — a split gathered before a later vertex's earlier split lowered `bt` can lie up to 1 mm after the final earliest and joins; the header says so. **The notes' repetition** of the old claim — 'Hardening round S7' › 'LINE 3 (ii)' first bullet ("every candidate event of the current wavefront within 1 mm … of the earliest joins it") and C-0500's "every candidate event within 1 mm in offset time and 1 cm in position of the earliest joined into it" — is superseded by this row's sentence (append-only: neither is edited; the round's choices row names both). | **Comment only, shown:** `engine.ts` with every `//` comment line blanked is identical before and after (`diff` of the stripped files: only 8 blank lines added); `skeleton.ts` and every other source file of the folder unchanged (SHA-256 below); the built kernel bundle `packages/kernel/dist/index.js` **byte-identical**: SHA-256 `7be9532b5a52d16c39cbd33f5eb3078d6f86676dcb581efac1238588f01525c7` in the base mirror (built before any edit) and in the tree after the round's last edit (927 040 bytes both); `dist/types/src/skeleton/engine.d.ts` identical — of the declaration output only `engine.d.ts.map` (the header's 8 more lines shift its mappings) and the two `tsconfig.tsbuildinfo` (file hashes) differ. |
| LINE 3 — Q197 (e) / N-s7c-7: the census total | **FIXED** (text) | Re-added by this builder: 2 000 + 3 000 + 3 000 + 6 000 + 24 000 + 542 + 612 + 841 = **39 995** faces, × 3 uses = **119 985** calls (not 40 995 / 122 985). The per-family rows and the refusal sums re-added too: roof 0 + 0 + 0 + 17 + 48 + 13 + 19 + 48 = 145 (→ 144), spine and regions 0 + 0 + 0 + 1 + 5 + 4 + 1 + 13 = 24 (→ 23) — they stand. One dated correction line beneath the S7 census table (the table unchanged); the round's choices row states 39 995 / 119 985 and names C-0500's figure superseded. | Text; no pin (rule (2)). |

### Refusal census of the item's registered families (J264 (4), N-58), per use, before → after

No executable line changed and the built bundle is byte-identical, so every outcome of every registered family is the
round's head's by construction: **144 / 23 / 23 → 144 / 23 / 23** (roof / spine / regions, over the 39 995 faces of
round S7's table, as S7 left them); lawful-input refusals unchanged in count and class (N-58: `contract sharpCorner`
LAWFUL REFUSE per §3.8's edge table; `contract notSimple` Q180 (c), the corpus readers'; `validator planarity` the fusion
river seed 7 water face, class (4), REPORTED under Q197 (a)). NEAR's `spikeclass.test.ts` (41 fixed faces' digests, 4
reported faces' downgrades) and `golden.test.ts` (corpus 556 / 1236 / 1144 / 1840, the holed faces, the relief-60-3
water face) green: nothing moved, nothing re-recorded.

### Source hashes after the round (`packages/kernel/src/skeleton/`)

`engine.ts` changed (comments only); unchanged: `coalesce.ts` 7f481be5…, `index.ts` b932d267…, `prepare.ts` e0a4477f…,
`roof.ts` 363ed28d…, `skeleton.ts` db156c67…, `types.ts` 7da3ffa3…, `validate.ts` bdd1630b…. No export of the folder index
or the barrel changed; no message text changed.

### Gates (in the tree, 2026-11-13, W = 1 by `test_budget.py`)

* `install --frozen-lockfile`: 0.
* `lint`: 0 (`lint: eslint 1316 files, 0 errors, 0 warnings`; `lint: probe-red ok`, its ten planted lines reported;
  `lint: 9 whole-tree checks`), after the round's last source edit.
* `build`: 0 (the bundle hash above).
* NEAR at full strength (`PLAT_FUZZ_RUNS` unset): `packages/kernel/test/skeleton` +
  `packages/kernel/test/num/equivalence.test.ts`: **14 files, 184 / 184**, exit 0 (run seed -1973788657; S7's 182 plus
  the two new tests).
* `fixtures.test.ts` at `PLAT_SKELETON_SEED` 2 and 3: 7 / 7 each, exit 0 (seed 1 in NEAR): 0 crashes, 0 validator
  failures on 3 × 1 000 holed polygons.
* M0-a-12's `bench/test/skeleton`: 4 files, 24 / 24, exit 0.
* RELATED@1000 over `packages/kernel/src/skeleton/engine.ts` (the round's only changed source file): **407 test files,
  5 316 passed, 1 failed**, `PLAT_FUZZ_RUNS=1000`, `PLAT_FUZZ_SEED=20261113`, W = 1 — RELATED's own list (`vitest related
  --run`, JSON reporter, `-t '^__no_such_test__$'`) split into 34 chunks of 12, each `vitest run --passWithNoTests` with its
  JSON report and exit code beside it, totals summed from the reports (the chain
  `/home/user/maps-scratch/waves/build-M0-a-11-fix-s8-related/`, 2026-11-13 02:20–06:32 UTC; two container restarts, at
  03:08 and 05:08, each resumed the chain at the unfinished chunk, no finished chunk re-run). Chunk exit codes: 33 × 0,
  chunk 004 × 1. Four files ran twice (vitest's file filters are substrings: `kernel/test/insert/step3-5/insertChain`,
  `kernel/test/tx/forms`, `savepoint`, `write-door`), so the reports hold 411 file results over the 407 distinct files.
  **The one red** is `bench/test/site/summary.test.ts` › 'the canary CITY record re-derived on this tree is the run's' —
  "relief-60 coarse seed 46 moved: re-run the summary (Q36)", received `4c9647bf15914e6d…`, expected `eb2046ddce3ce2c1…`:
  the head's declared J772 (7) red (the committed site summary stale until the session's re-run; the same received hash
  round S7 saw), not the item's — the item changed no file on its path in an executable token (the bundle above is
  byte-identical). Q152's bands tests, the J176 reference-machine tests and Q202 were not reached or were green at this
  size. No new finding.
