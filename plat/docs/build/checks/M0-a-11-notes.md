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
item no FIX-NOW row of its own. Choices row C-0362. Every probe ran in the lane's scratch mirror (`cp -a` of `plat/`, 0
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
| Q67 / RQ7 (B) | **MEASURED, then REPORTED (contract change, other items' files).** Over the round's code, 32 faces are refused `sharpCorner` (all in the relief derivations; the corpus and holed polygons have 0). Of these, 28 have their sharpest corner in [1°, 5°). Under a 1° bound for `spine`, 27 validate and **1 is rejected** by the validator (relief-3000 seed 7, district 56, 4.64°: `planarity arc 42 crosses arc 46`), a share of **1/28 = 0.036**. The other 4 are refused under the 1° bound too: 3 are not simple (relief-3000-2 #36, relief-3000-3 #43, relief-60-3 #12) and 1 has a 0.018° tip (relief-3000-3 #104). (B) changes `skeleton`'s contract for two readers. Applied in the mirror, it turned 4 tests red in other items' files: `bench/test/skeleton/runner.test.ts` (M0-a-12; the 2.9° `spine` spike, and the bar-fail corpus) and `testkit/test/runner/ladders.test.ts` (M0-k-04's `invariants/ladders.ts`, over M0-k-02's `limit/degen-skeleton-sharp-corner`, which draws tan θ ≤ 0.08 for `spine` too). Rule (1) leaves (B) at REPORTED. The code keeps 5° for every use. That deviates from the amended §3.8, which now says 1° for `spine` / `regions`, and is declared in C-0362. | The probe `measB` in the mirror. | none (no code). |
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
| N-s3-5 | The literal RQ7 (A) criterion (dot > 0) is unsafe (Q67 row above), and so is a clean that may collapse a ring. The amended §3.8 sentence ("inexact ones whose shorter arm's end lies within `attractCm` of the longer arm") says neither "a fold-back sharper than the bound" nor "never below three vertices". The code reads it so, and C-0362 records the reading. | Amendments round: add "(a fold-back sharper than the contract's 5°; a ring the clean would collapse is left to the contract)" to §3.8's sentence. | hardening |

## Closing check S3 (check/M0-a-11-close-s3, 2026-10-14)

The closing checker's notes; none of these rows fails the round (N-45, J180). The round's blockers (the survivors K6,
T3 and T13) are in `checks/M0-a-11-s3.md`, which also defines the mutant ids (K…, T…) and the probes (`measure`,
`compare`, `spurs`, `diag`), run only in the checker's scratch mirror over the before-image (main 889d3a7), the tree's
code and mutant copies.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s3c-1 | **K11 is equivalent.** Removing `inexactTip`'s foot test (`0 < foot < l2`) changes nothing: with dot = (s − v)·(l − v) > 0 already required, foot = dot > 0, and foot ≤ \|s − v\|·\|l − v\| ≤ \|l − v\|² with equality only when s = l (an exact spur, removed by `dropSpurs` earlier in the same round). The NEAR set passes it (13 files, 125/125). | None; the test may be kept as documentation of the ruling's wording. | — |
| N-s3c-2 | **The literal RQ7 (A) criterion, re-measured.** The mutant K5 (any fold, dot > 0) moves one validated face on the 16 derivations of today's tree: relief-60 seed 5, district #28, on every reader (validated → validated, other output). The builder's second instance (relief-60 seed 7, district #42 refused `degenerate`) does not recur with the collapse guard in place. C-0362 (1)'s restriction is therefore needed for "0 validated results moved"; its pin is the blocker K6 of `M0-a-11-s3.md`. | The amendments round's sentence of N-s3-5 stands. | hardening |
| N-s3c-3 | **The lawful-input refusals left after the round (J264, N-58), per use (roof = spine = regions), with seeds** (CITY, default config, `deriveSpike` seeds 1 – 8): **sharpCorner 32** — 27 validate under a 1° bound (relief-60-2 #13, #40; relief-60-3 #0, #1, #3, #8, #28, #37; relief-60-4 #0, #19; relief-60-6 #3; relief-60-7 #0, #12; relief-3000-2 #14, #20, #31; relief-3000-3 #3, #11, #42, #98, #100; relief-3000-5 #25, #53; relief-3000-6 #44, #62; relief-3000-7 #8, #110), 1 fails the validator under it (relief-3000-7 #56, planarity), 3 are refused `notSimple` under it (relief-60-3 #12, relief-3000-2 #36, relief-3000-3 #43) and 1 is sharper than 1° (relief-3000-3 #104); **notSimple 11** (relief-60-6 #49; relief-3000-2 #15, #94, #106; relief-3000-3 #26, #87; relief-3000-5 #1, #60; relief-3000-6 #22; relief-3000-7 #15, #126). | Session finding, with N-s3-1 ((B) and its other items' lines) and the census's phase-end re-run (§5). | hardening |
| N-s3c-4 | **An all-spur hole is dropped before the contact and containment checks.** A zero-area hole that touches or crosses the outer ring, or lies outside it, now cleans away and the face runs (before the round: `degenerate`). It encloses no area, so the face's skeleton is still right for the region, and an arrangement face's walk cannot produce such a hole (N-3's class). | Record it in C-0362 (2), or refuse `holeContact` / `holeOutside` when a dropped hole meets or leaves the outer ring, when an outside caller (M1 footprints) can pass such rings. | M4 |
| N-s3c-5 | **The tolerant reading's outputs on the water class are not digest-pinned.** `golden.test.ts` pins 1144 and 1840; no relief water face (627 – 2 900 vertices) or constructed equivalent is pinned by its whole result, so an engine change that moves the water faces' validated output leaves every test green (T13's case). | Part of the blocker on Q73 in `M0-a-11-s3.md`; listed here so the hardening pass keeps a digest pin of the class. | hardening |

## Hardening round S4 (build/M0-a-11-fix-s4, 2026-10-14): the builder's row-by-row outcome (J237 (2), J264, J290 / N-58)

The round's lines are the two that the closing check S3 (`checks/M0-a-11-s3.md`) left failing. Both are about pins
only. Q67 / D-01 / RQ7 (A): the survivor K6, the clean's fold-back bound moved from 5° to 10°. Q73: the survivors T3
(the tolerant join radius 1 cm → 0.5 cm) and T13 (the join no longer excluding the ends of an edge the event splits).
The round changes no source file. `src/skeleton/` is byte-identical to the S3 landed record (each SHA-256 checked
against `landed/M0-a-11.json`). So no output moves, no digest is re-recorded and no choices row of S3 changes.
The round adds pins under `test/skeleton/`. Choices row: C-0363. Every mutant ran in the lane's scratch mirror (a
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
| N-s4-1 | C-0362 (1) names, as its evidence against RQ7 (A)'s literal criterion, "a 26 cm edge at an 88° corner" (relief-60 seed 5, district 28) and a validated 19 cm-wide triangle (seed 7, district 42). The rings S3 extracted for those cases do not meet the literal criterion (the closing check S3). N-s3c-2 shows that the literal criterion does move relief-60-5 #28's validated output, so the conclusion stands, but its example was wrong. C-0363 records the constructed pins (5.33°, 6.84°, 30°, 45°) as the evidence instead. C-0362's text is left as committed: an append-only row is never edited. | None beyond C-0363. | — |
| N-s4-2 | The water class now has one whole-face digest pin, relief-60-3's water face (N-s3c-5). The other water faces the tolerant reading validates (relief-60 seeds 1, 2, 4, 5, 7, 8; relief-3000 seed 4) are not pinned one by one. T3 and T13 move several of them, and both are now red through seed 3. | A further face per fixture is hardening, not a fix (N-45). | hardening |
