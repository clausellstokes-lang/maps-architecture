# Diagnosis of Q53 — the phantom L1 record B-FUZZ found at seed 745761989 (M0-a-09 round S5's blocker)

Seat `session/diagnosis-a09-sliver-1` (Fable 5.1, a diagnosis seat in the session's cloud container — Linux x64, 4 cpu,
Node 24.12.0; flow flow-7), 2026-10-13. Clean room: no git; every experiment in the seat's own mirror
`/tmp/claude-0/-home-user-maps-architecture/1b20c628-d0db-54ea-adbb-006cd0594bce/scratchpad/diag-a09-sliver/plat`
(a copy of the live tree at main c0ce412c, `corepack pnpm install --offline --frozen-lockfile` exit 0); the live tree
touched only by this file, one CLEAN-ROOM.md row and the landed record. Rulings in force: N-45 (a), J264, N-58.

## 1 Summary

| field | finding |
|---|---|
| writer module | `packages/kernel/src/insert/rewalk.ts` (the insertion's step-5 re-walk; M0-a-05) |
| writer function | `materialiseParent` (rewalk.ts:410–429; the `allocFace` at line 421), called from `rewalk`'s `parentAt` (line 316) at line 366 for a `virtual` region that `coarserRegion` (lines 272–303) built from the **L0 frame face** instead of L1 f4 |
| mechanism | `coarserRegion` asks `query(p, key, 1, 1 cm box at the new edge's midpoint, {faces})`, whose face filter reads L1 records on the **level-1 route** (query.ts:9–12, 164–169; items.ts `faceRouteRings`), then tests the candidates with `insideRing(faceWalk(p, 1, f))` — the walk through the L2 Steiner vertices. Inside a sliver thinner than the hot pixel the two readings put the point in different L1 faces (f1 by the route, f4 by the walk), so the query returns only f1, the exact test rejects it, the loop falls to L0 and materialises a bogus "own child" of the frame face at L1 |
| lawful | **yes** — three round-ended chords of a random street network, each accepted by `insertChain` at L1, `network()` healthy; nothing in §3.10 or §3.11 names the case for refusal |
| verdict (N-58) | **(a) MAKE-IT-SUCCEED** — a fix round that makes `corridorUnion` commit correctly; not (b) REPAIR (the input is not unlawful) and not (c) REFUSE |
| owning item | **M0-a-05** (insertChain / rewalk.ts; M0-work.json `owns` line 1147) — not M0-a-09, M0-a-07, M0-a-06 or M0-a-08 |
| fix shape | make `coarserRegion` find the coarser record in the batch's own (level-n) reading: at least a candidate box widened past the hot pixel before the exact walk test (the tested candidate below), or, better, the parent by topology — the coarser face on the left of one of the cycle's old sub-edges (as `reparent` does at rewalk.ts:470–478; §3.10's nesting row: "by index — never by coordinates") |
| candidate tested | a 5-line change in the mirror's rewalk.ts (`coarserRegion`'s query box ±1 cm): the case commits with `allProblems` `[]`, `checkIndexState` `[]`, `tilesExactly` `[]`; the bands folder at the PR size green (9 files, 58 tests; §9); reported as a candidate, not a fix |

## 2 Reproduction

Mirror, the seeded replay (the S5 checker's command):

```
PLAT_FUZZ_SEED=745761989 corepack pnpm exec vitest run --maxWorkers=1 packages/kernel/test/arr/bands/bfuzz.test.ts
```

It runs the whole 10⁴-case draw before reporting (the counterexample is run 6695), so the seat also built the
three-chord case directly with the test file's own helpers (`network`, `widthsOf`, `spec(2, AT_S9)`, `corridorUnion`,
`tx`, `allProblems`, `checkIndexState` — bfuzz.test.ts lines 75–112 read whole; support.ts 374–390) in a mirror-only
probe `packages/kernel/test/arr/bands/zz-diag.test.ts` (deleted from the mirror's test folder before the folder run; kept
in the scratch dir). Its output on the unchanged engine:

```
table {"way:0":{"knotRole":"width_knot","values":[5,239],"interp":"linear"},
       "way:1":{"knotRole":"width_knot","values":[275,446],"interp":"linear"},
       "way:2":{"halfWidthCm":1,"ends":"round"}}   faces [0,1,2,3,4]
before problems [] []
---- BEFORE
L1 f0 outer=20 parent=0 owner=4 stage=8 :: (3967,3941) (3073,4000) (0,4000) (0,0) (4000,0)
L1 f1 outer=25 parent=0 owner=4 stage=8 :: (3967,3941) (4000,384) (4000,3939)
L1 f2 outer=21 parent=0 owner=4 stage=8 :: (3073,4000) (3967,3941) (3967,4000)
L1 f3 outer=19 parent=0 owner=4 stage=8 :: (3967,3941) (4000,3939) (4000,4000) (3967,4000)
L1 f4 outer=24 parent=0 owner=4 stage=8 :: (4000,384) (3967,3941) (4000,0)
result {"band":[1,3,2,8],"strips":[1,3],"wedges":[2,8],"blocks":[0,7],"whole":[],"wholeBand":[4,3,2]}
closings []
---- AFTER
L1 f0 outer=20 parent=0 owner=4 stage=8 :: (3967,3941) (3774,3954) (3073,4000) (2627,4000) (0,4000) (0,0) (4000,0) (3970,3616)
L1 f1 outer=25 parent=0 owner=4 stage=8 :: (3970,3641) (4000,384) (4000,3666) (4000,3939) (3967,3941)
L1 f4 outer=24 parent=0 owner=4 stage=8 :: (4000,384) (3970,3641) (3967,3941) (3970,3616) (4000,0)
L1 f5 outer=0  parent=0 owner=-1 stage=0 :: (0,0) (4000,0) (3970,3616) (3967,3941) (3774,3954) (3073,4000) (2627,4000) (0,4000)
L2 f4 outer=52 parent=5 owner=-1 stage=0 :: (3970,3641) (3970,3616) (4000,0) (4000,384)
L2 f5 outer=53 parent=5 owner=-1 stage=0 :: (3970,3616) (3970,3641) (3967,3941)
L2 f6 outer=0  parent=5 owner=-1 stage=0 :: (0,0) (4000,0) (3753,3639) … (2627,4000) (0,4000)   [= L2 f0's ring]
after problems ["two L1 records share one view face",
                "L2 face 4 does not lie in its parent (L1 face 5)",
                "L2 face 5 does not lie in its parent (L1 face 5)",
                "two L2 records share one view face"]
index []
```

The same four problems the S5 check quotes. The phantom L1 f5 carries `outer = 0` (the frame's first half-edge, whose
L1 walk is f0's ring), `kind 0`, `owner −1`, `stage 0`, `parent 0` — the L0 frame face's attributes, not f0's.

## 3 The chords and the sliver (the geometry at the lattice)

`onFrame` (support.ts:360–365) maps the arc positions to the frame: way:0 `(3974,0) → (3967,4000)`, way:1
`(4000,3939) → (3073,4000)`, way:2 `(4000,384) → (3983,4000)`. Way:0 and way:2 run nearly parallel 16–26 cm apart
and way:1 crosses both near `(3967..3983, 3939..3941)`; L1 attraction (`attractCm` 26) merged their crossings and
way:0's and way:2's upper parts into one junction vertex `(3967,3941)` and one edge to `(3967,4000)`, and attracted
way:0's start onto the frame corner `(4000,0)`. What is left between way:0's and way:2's lower parts is L1 f4, the
triangle `(4000,0) (4000,384) (3967,3941)`: 384 cm wide on the frame, 1.75 cm wide at y = 2000, **0.27 cm wide at
y = 3641 and 0.29 cm at y = 3616** — thinner than the hot pixel (0.71 cm) for its last 3–4 m. The network is healthy
before the batch: every §3.10 row passes (`allProblems` `[]`); the clearance row holds because the sliver has no
vertex except its three corners.

`corridorUnion` (corridorUnion.ts:35–51 → `bandCore`, bandUnion.ts:529) reads kerb(F) for each L1 face. For f0 its
junction J = `(3967,3941)` has `hwIn` from way:0's profile and `hwOut` from way:1's (275 at J), and `splitChain`
(kerb.ts:619–672) draws the corner wedge `[fa, K, fb]` (kerb.ts:675–691): K = the kerb corner `(3753,3639)`, fa = the
foot of K's perpendicular on the spine edge A→J (way:0, `(4000,0)→(3967,3941)`), fb = its foot on J→B. fa is
`(3969.51, 3641)` exactly, snapped to **`(3970,3641)`** — 0.49 cm off way:0's route and **0.22 cm off way:2's**, the
other side of the sliver. So the chain `[(3970,3641), (3753,3639), (3774,3954)]` goes to `insertChain` at L2
(bandUnion.ts:625–637, the `corridor_split` rows named for f0's owner).

The insertion lands the first point on the nearest route, way:2, as an L2 Steiner vertex (`placed[0]` = `(3970,3641)`,
level 2, flags split|steiner), so the chain must cross way:0 to reach K. The exact crossing is `(3969.51, 3641)`, whose
lattice point is the start vertex itself; one vertex per lattice point and `minEdge` rule it out, and the router's
"route across a sliver" reading (snapRound.ts:21, 623–626; crossings.ts `placeAcross`, C-0209) places the far side's
crossing on way:0 **at least `minEdge` away**: `(3970,3616)` (`W_PLACED` at (3970,3616); plus `W_ACUTE_CORNER` ×2 at
(3970,3641)). The committed chain is `(3970,3641) → (3970,3616) → (3753,3639) → (3774,3954)`: its first 25 cm edge
runs **inside L1 f4**, splitting the sliver into the two L2 cycles `(3970,3641) (3970,3616) (4000,0) (4000,384)` and
`(3970,3616) (3970,3641) (3967,3941)`. No §3.10 row is broken by this: both Steiner vertices lie within 0.71 cm of
their route, the sub-edge polylines of way:0 and way:2 do not cross, clearance holds (the cross edge makes the two
chords' vertices one-ring neighbours), `minEdge` holds (25 cm). The two L2 splits at `(3970,3616)` / `(3970,3641)`
are therefore a **consequence of the sliver** (the kerb corner's foot falls inside the hot pixel of both chords) and
the **trigger** of the record defect: they put the first L2 edge ever into L1 f4, so the re-walk must materialise
f4's L2 records (§2.2 rule 2) and find f4 as their parent.

## 4 The trace (every module read whole)

1. **bandUnion.ts `writeOutlines`** (lines 625–637) → `insertChain(t, pts, split, 'mandatory')` at 630, the chain of §3.
2. **insertChain.ts** `insertChain` (1095) → `attempt` (1084) → `run` (1056) → step 5 `rewalk(tx, touched)`.
3. **rewalk.ts `rewalk`** (108–402). (1) walks the L2 cycles through the new pairs; (2) collects the L2 records whose
   stored half-edges the index finds round the new edges (`addRecord`, 161–177: L2 f0 and f1 here); (3) gives each
   cycle its old region: `viaOld`/`propagate` find none for the cycle `(3970,3641) (3970,3616) (4000,0) (4000,384)` —
   its old half-edges are L1 sub-edges of the sliver, on no L2 record's ring, and no L2 record's old ring contains the
   doubled midpoint `(7940, 7257)` = `(3970, 3628.5)` (`insideRegion`, 187–192). So line 258 calls
   **`coarserRegion(qx2, qy2)`** (272–303).
4. **`coarserRegion` at m = 1** (277): `query(p, tx.key, 1, {3970,3628 … 3971,3629}, {faces: true})`. The query
   (query.ts:220–253) hands every L1 face item whose stored box meets the query box to `faceMeetsBox` (243; 164–169),
   which reads the face's rings with **`faceRouteRings(p, 1, f, n = 1)`** (items.ts:212–229: "the vertices of level ≤ n
   of its walk") — the **level-1 route**, the straight chords without the two level-2 Steiner vertices — and keeps a
   face whose route boundary meets the box or whose route interior holds the box corner. Probe at that moment:

   ```
   L1 f0 meetsBox=false routeRings=[(3967,3941) (3073,4000) (0,4000) (0,0) (4000,0)]
   L1 f1 meetsBox=true  routeRings=[(4000,384) (4000,3939) (3967,3941)]
   L1 f4 meetsBox=false routeRings=[(4000,384) (3967,3941) (4000,0)]      ← the sliver, without (3970,3641)/(3970,3616)
   query faces=[1]
   ```

   On the level-1 route, way:2 passes x = 3969.90 and way:0 x = 3969.62 at y = 3628; the point x = 3970 lies **0.10 cm
   to the right of way:2's route, i.e. inside f1** and outside f4. The query is correct by its own contract (query.ts:9–12,
   §2.2 rule 3: "every level-n query … reads [the level-n route]"); it is answering a level-1 question.
5. **`coarserRegion`'s exact test** (278–283) then reads `faceWalk(p, 1, f1)` — the arena's walk, which (walk.ts
   `nextAt`, 14–23) follows the sub-edge pairs of level 1 **through** the level-2 Steiner vertices:
   `(3970,3641) (4000,384) (4000,3939) (3967,3941)`. In that reading the point is left of way:2's sub-edge
   `(4000,384)→(3970,3641)` (x = 3970.11 at y = 3628.5): **not in f1** (`inside=false`). The only candidate is
   rejected; **f4, which does hold the point in this reading, was never a candidate**; the loop continues to m = 0.
6. **`coarserRegion` at m = 0** finds the frame face L0 f0 (`inside=true`) and builds a **`virtual` region** from it
   (291–296): `base = {kind 0, owner −1, stage 0, parent −1}`, `stored = [half-edge 0]`. Its premise — "no level-n edge
   was inside it, or level n would hold a record there" (288–289) — is false: L1 is fully partitioned under this L0 face.
7. **The writes** (317–396). For that region, line 366: `parentAt(n − 1 = 1, from = L0 f0, fromLevel = 0, base)` →
   **`materialiseParent(tx, 1, …)`** (410–429): m ≠ fromLevel, so after `materialiseParent(tx, 0, …)` returns L0 f0,
   line 421 **`allocFace(p, 1, {outer: Ff.outer[from] = 0, kind 0, owner −1, stage 0, parent 0})`** — **L1 f5, the
   phantom**: half-edge 0 at L1 bounds f0, so f5's walk is f0's ring (problem "two L1 records share one view face").
   Then line 386 writes the two cycles as **L2 f4 and f5 with `parent 5`** and the L0 base (problems "L2 face 4/5 does
   not lie in its parent"); and because the region's stored outer half-edge 0 is on no new cycle it is `untouched`
   (322–323) and pushed as an `old` outer (330), so line 386 also writes **L2 f6 = allocFace({outer: 0, parent: 5})**,
   a duplicate of L2 f0 (problem "two L2 records share one view face"). `allocFace` (arena/plat.ts:543–577) writes
   exactly the fields seen. The stack traces from an instrumented `allocFace` in the mirror name these four lines
   (`materialiseParent` rewalk.ts:421 ← `parentAt` 316 ← `rewalk` 366 ← insertChain.ts:1056/1084/1095 ←
   bandUnion.ts:630 ← 529 ← corridorUnion.ts:41; and rewalk.ts:386 ×3).

Nothing in bandUnion.ts, kerb.ts, the transaction (tx/) or faces/ (M0-a-07's declared partition ops, which also go
through `insertChain`) writes a face record on this path; `bandCore` only classes the records the insertion left. That
is why K0 shows the same four problems: the writer is the re-walk, below the item.

## 5 The mechanism, in one paragraph

Two L1 chords converge so nearly tangentially that the L1 face between them (f4) is thinner than the hot pixel for its
last metres. `corridorUnion`'s corner wedge for the neighbouring face f0 has a foot on way:0 whose lattice point lies in
the hot pixel of both chords; the insertion lands it on the nearer chord (way:2), routes the crossing of way:0
`minEdge` away by its route-across-a-sliver reading, and so commits a lawful 25 cm `corridor_split` edge inside f4 —
the first L2 edge there. The re-walk must then find the L1 record holding that edge. `coarserRegion` finds its
candidates with a level-1 face query, whose filter reads each L1 face on the level-1 route (chords as straight lines),
and verifies them with the arena walk, which reads each face through the new level-2 Steiner vertices. Inside a face
thinner than the hot pixel these two readings disagree on which face holds a point: the query returns only f1, the
walk rejects f1 and never sees f4, and the search falls through to L0, where the frame face "holds" the point. The
re-walk then treats L1 as if it had no record there (§2.2 rule 2's own-child case), materialises a phantom L1 child of
the frame face with the frame's attributes and half-edge 0 (f0's ring), hangs the two new L2 records from it, and —
since the phantom's stored ring is untouched — writes a third L2 record duplicating L2 f0. The commit is otherwise
sound (`checkIndexState` `[]`; every geometric row holds), so the result is silently wrong (N-45 (a)).

## 6 Lawfulness and the verdict

**LAWFUL.** The input is three round-ended chords of a random street network across the framed square (the B-FUZZ
domain, J264 (1)); each chord is accepted by the kernel's own door `insertChain` at L1 in its own batch (support.ts
374–385), the L1 faces are owned, and `network(chords)` is healthy under every oracle before the batch. The design's
rows say the batch should **COMMIT cleanly**, not refuse: §3.10's one-vertex-per-point, clearance, minEdge, placement
bound and no-crossing rows all hold on the committed geometry (the probe's `allProblems` names only the four record
rows); §3.11's degenerate-geometry row refuses "a zero-area or pinched face", and neither L2 face in the sliver is
zero-area (f5 is the triangle `(3970,3616) (3970,3641) (3967,3941)`) or pinched (its three edges are ≥ 25 cm).
§2.2 rule 2 defines exactly what should have happened: "a level's face records inside a parent face are materialised
when the first edge of that level is inserted there" — L1 f4's L2 records, with f4 as their parent and its kind,
owner (district:1) and stage, as §2.2 rule 4 inherits them. The §3.10 nesting row even states the method: a level-(n+1)
face's parent is found "by index — never by coordinates". So the defect is **the record maintenance**, not a missing
refusal, and a detect-and-refuse post-condition (the S5 check's option (b)) would convert a lawful commit into a
lawful-input refusal that J264 forbids.

**Verdict (N-58): (a) MAKE-IT-SUCCEED.** The operation must commit, correctly; no repair of the input applies (it is
not unlawful), and no refusal is admissible.

**Owning item: M0-a-05** — `plat/packages/kernel/src/insert/rewalk.ts` is in its `owns` (M0-work.json line 1147), the
re-walk is its interface `rewalk(touched)` and its sections include §3.10's nesting and level-consistency rows. The
sliver, the foot in the double hot pixel and the route-across-a-sliver placement are not defects of M0-a-09 (kerb /
bandUnion / corridorUnion) or of the insertion's routing (M0-a-05's steps 2–4 behave as designed); M0-a-07 (faces/),
M0-a-06 (tx/) and M0-a-08 write nothing on this path.

## 7 The fix shape and the candidate change (mirror only)

**Fix shape (M0-a-05, `coarserRegion` in rewalk.ts).** The coarser record holding a new level-n edge must be found in
the batch's own reading, consistently with the exact test that follows:

* **Topological (preferred; §3.10 "by index — never by coordinates").** A cycle with no level-n region always holds an
  old half-edge that is a sub-edge of a level-m edge (m < n) — here way:0's and way:2's sub-edges — and the level-m
  face on its left is the parent. Find it as `reparent` already does (rewalk.ts:470–478): query level m with the
  sub-edge's segment box, keep the record whose `faceWalk(p, m, f)` contains that half-edge. No midpoint, no second
  reading. Fall back to the midpoint only for a cycle made of new edges alone.
* **Minimal (the tested candidate).** Keep the midpoint but make the holding record a candidate whatever the route
  reading says: widen the level-m query box past the hot pixel (±1 cm > 0.71 cm), since a face's walk through Steiner
  vertices lies within 0.71 cm of its route; the existing exact `insideRing(faceWalk(…))` then decides. Equivalent in
  spirit to `pointLocate`'s own coarser fallback (query.ts:271–280), which reads the coarser record on the **query's**
  level-n route (`faceRouteRings(p, lm, slot, level)`), not on level m's.

**Candidate applied in the mirror** (`candidate-rewalk.diff` in the scratch dir; the live tree untouched):

```diff
@@ -274,7 +274,12 @@ rewalk.ts coarserRegion
       const x0 = Math.floor(qx2 / 2);
       const y0 = Math.floor(qy2 / 2);
-      for (const f of query(p, tx.key, lm, { minX: x0, minY: y0, maxX: x0 + 1, maxY: y0 + 1 }, { faces: true }).faces) {
+      // DIAG CANDIDATE (Q53): the level-m query filters on the level-m route; the test below reads the walk through
+      // every Steiner vertex (the level-n reading); they differ by up to the hot pixel, so widen the box by 1 cm.
+      for (const f of query(p, tx.key, lm, { minX: x0 - 1, minY: y0 - 1, maxX: x0 + 2, maxY: y0 + 2 }, { faces: true }).faces) {
```

**Mirror result on the case** (the probe with `expect(allProblems(p)).toEqual([])`, `checkIndexState`, `tilesExactly`):

```
result {"band":[4,1,3,5,2,7],"strips":[1,3],"wedges":[4,5,2,7],"blocks":[0,6],"whole":[],"wholeBand":[3,2]}
L2 f4 outer=52 parent=4 owner=4 stage=8 :: (3970,3641) (3970,3616) (4000,0) (4000,384)
L2 f5 outer=53 parent=4 owner=4 stage=8 :: (3970,3616) (3970,3641) (3967,3941)
after problems []      index []      tilesExactly []       Tests 1 passed
```

The two L2 records now hang from L1 f4 with district:1 and stage 8, no phantom and no duplicate; `bandCore` classes
them as wedges and drops f4 from `wholeBand`.

**Mirror result on the bands folder at the PR size** (`corepack pnpm exec vitest run --maxWorkers=1
packages/kernel/test/arr/bands/`, unseeded, the probe removed): **green — 9 files, 58 tests, exit 0** (the output in §9). It holds
at the PR size; the nightly size (10⁶) was not run.

This is a candidate for M0-a-05's fix round, not a fix: it is the minimal form; the topological form is the one the
design's nesting row describes, and the item should also pin the case (the three chords above, or a smaller fixture
with one sub-hot-pixel sliver and a split foot inside it) as a committed-and-healthy fixture.

## 8 Open questions

1. **For M0-a-09 (secondary, not the blocker).** With the parent right, f0's `corridor_split` chain still starts on
   way:2 and its first edge lies inside L1 f4, so a `corridor_split` row naming f0's owner sits in the neighbour face,
   and the two L2 records it makes under f4 are classed by `bandCore` from the records it finds, not from f0's reading
   (here they come out as wedges; f4 leaves `wholeBand`). Whether a wedge foot that lands on the far chord of a
   sub-hot-pixel sliver should be drawn from the junction instead (kerb.ts `wedge`'s `[J, K]` form) is the item's
   call; the probe's `tilesExactly` and N-57 (2) bounds pass either way.
2. **Are there other level-m queries answering level-n questions?** The seat read rewalk.ts whole: `addRecord` (176)
   and `reparent` (465) query at the batch's own level or the level above, where the route reading is the batch's own.
   `pointLocate` (query.ts:271–280) reads coarser records on the query's level. Other callers of `query(…, {faces})` at
   a coarser level than their batch were not surveyed (outside this diagnosis).
3. **The box widening's cost.** ±1 cm admits every face whose level-m route passes within 1 cm of the point; on a
   dense network that is at most the faces round one vertex, each exactly tested — O(degree), within SCL-1. The
   topological form avoids the question.
4. **The `virtual`-from-coarser premise** (rewalk.ts 288–289) is unguarded: a `check` that the coarser record is really
   its own child at level n (no level-n record under it) would have turned this silent commit into a typed E_INVARIANT
   at the fault, which N-45 prefers to silence — worth adding in the fix round as a fail-safe, not as the fix.

## 9 Mirror runs

* **Seeded replay (unchanged engine)**, `PLAT_FUZZ_SEED=745761989 corepack pnpm exec vitest run --maxWorkers=1
  packages/kernel/test/arr/bands/bfuzz.test.ts` in the mirror — **red, as the S5 check reports** (exit 1, 1336 s on the
  shared 4 cpu):

  ```
  FAIL |kernel| test/arr/bands/bfuzz.test.ts > B-FUZZ (§13.1) … > kerb, corridorUnion and bandUnion on random street networks
  Error: Property failed after 6695 tests
  { seed: 745761989, path: "6694:8:1:1:1:2:1:9:12:…:31" }
  Counterexample: [[{"a":3974,"b":8033,"hw":30,"knots":[5,239],"ends":"round"},
                    {"a":7939,"b":8927,"hw":30,"knots":[275,446],"ends":"round"},
                    {"a":4384,"b":8017,"hw":1,"knots":null,"ends":"round"}]]
  Shrunk 101 time(s)
  - []
  + [ "two L1 records share one view face",
  +   "L2 face 4 does not lie in its parent (L1 face 5)",
  +   "L2 face 5 does not lie in its parent (L1 face 5)",
  +   "two L2 records share one view face" ]
   ❯ healthy test/tx/support.ts:100:26
  Tests  1 failed | 1 passed (2)   Duration  1336.07s
  ```
* **Bands folder at the PR size with the candidate** (`corepack pnpm exec vitest run --maxWorkers=1
  packages/kernel/test/arr/bands/`, unseeded, the probe removed, the instrumentation reverted) — **green**: exit 0,
  9 files, 58 tests, 1373 s on the shared 4 cpu:

  ```
  Test Files  9 passed (9)
  Tests  58 passed (58)
  Duration  1373.47s (tests 100%)
  ```

## 10 What the seat read

Whole: bfuzz.test.ts, test/arr/bands/support.ts, test/tx/support.ts (to line 150), corridorUnion.ts, insert/rewalk.ts,
tx/savepoint.ts, index/query.ts, arena/plat.ts 355–700, index/items.ts 205–236, arena/walk.ts 14–41, kerb.ts 340–374
and 560–700, bandUnion.ts 600–640, insertChain.ts 1–60, snapRound.ts 21 and 786–800, faces/ops.ts and faces/split.ts
headers, docs/ARCHITECTURE.md §2.2 rules 2–3, §3.10, §3.11's degenerate-geometry row, M0-work.json M0-a-05 (1120–1175),
checks/M0-spec-notes.md N-58, checks/M0-a-09-s5.md BLOCKER, CLEAN-ROOM.md §2 (format), tools/landed/landed.mjs
header. Instrumentation (mirror only, reverted before the folder run): `allocFace`/`freeFace` stack traces,
`coarserRegion`'s candidates and readings, `writeOutlines`' split insertions with `placed` and warnings.
