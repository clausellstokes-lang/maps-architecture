# Round 2B of amendment z — what is served as a face's kerb: the design made exact (re-draft v2, 2026-11-12)

Status: a SPEC SEAT's re-draft for the managing session. Nothing here is ruled or bound. It replaces the first draft's
design P (refused, `rulings-after-measurement.md` ruling 1) with the design the session ruled at 11:50Z: **the
lay-planned read P′ with a pure resolution rule R** — X(F) computed exactly, brought to the arena's resolution by R,
served as the door lays it (`kerb()`), committed through the same engine (`corridorUnion`).

Markers. **[OPEN: An.k]** — an open question of this file, listed in section 9 with options and a recommendation.
**[MEASURE: …]** — a figure the measurement seat has not produced yet (section 11 is the request). **[S20: Tn]** — a
figure of M0-a-09 S20's tables (unconfirmed by its closing check). Every claim about the code names a file and a symbol;
line numbers are those of the head read (repository HEAD db9e68ea; S20's `kerb.ts` / `kerbExact.ts` from
`origin/wip/child-a09s20` @ 854faa89, unchanged in those two files since 9e5022ff per review.md's header) and are not
binding. Where a source and the code disagree the file says which it trusted.

Sources read, in the order asked: the folder's README, `rulings-after-measurement.md` whole, `rulings-after-review.md`;
`measurement/` (step1, step3-s9, step3-r8, step4-bfuzz, step5-xxu, step6-cost, step8-pprime, step9-replays,
rising-table, p.diff, pprime-full.diff); the measurement seat's `kerb.Pprime.ts`, `pprime.diff`, `probeR`'s rule
(`resolutionRule`, probeR kerb.ts :2290-2338), `results/REPORT.md` (its summary still empty), `results/step2/` (P's red
list; P′'s red list partly run); `review/review.md` (R-1 … R-21, A – E), `review/review-2.md` (S-1 … S-14, A – E);
`draft.md` and `spec-2b.json`; ARCHITECTURE §3.6 (attraction, the fidelity bound), §3.7, §3.10, §4.6, §13.2; AMENDMENTS z
items 986, 989, 991 (b); ledger rows J742, J759, J769, J785, J786; the code listed in section 0. Copies of what I used
from the measurement seat's folders are in `ref/`; my two read-only probes are in `probes/`.

---

## 0. Findings that bear on the design (new in this re-draft)

**F1-1. The class-by-class refusal bar fails on rule (b)'s own figures.** Under rule (b) the B-FUZZ census reads
`{"corridorUnion":{"replays":4},"bandUnion":{"replays":3}}` against BASE's bandUnion 'replays' 1
(`ref/bfuzz-rule-b.log` line 12; `measurement/step4-bfuzz.md`). Of the three bandUnion refusals, two are networks BASE
also refuses, under another cause: input `{a 12219, b 7983, …}` BASE refuses in `kerb` and `corridorUnion` as
'displaced'; input `{a 6561, b 26, …}` BASE refuses in `bandUnion` as 'no-route' (my read of
`results/step9/b-refusals.json`). The third (`{a 3698, b 7999, …}`) is the L3-over-L2 network (section 5). The base's
'no-route', 'displaced' and 'merged' causes are the construction's dry-run causes and vanish with it, so the same
refused network changes its cause string. A bar "never above the base, class by class" therefore fails a design that
refuses no network the base commits. Section 8 proposes the bar on NETWORKS and per operation, with the classes
REPORTED.

**F1-2. Rule (b) as prototyped is order-dependent, drops holes wrongly and is not the spike rule the README states.**
In `probeR` kerb.ts `resolutionRule`: (1) `thin` filters outer rings only (`a2 > 0`), so a hole inside a removed thin
component is left as an orphan clockwise ring; (2) `spikes` sweeps each ring from its index 0 and splices in place, so
the result depends on the ring's start and direction; (3) the spike test is `ab < A && h > ab` — the vertex's distance
from the chord greater than the chord's length (an apex angle below about 53°), not "farther than attractCm"; (4) it is
applied to hole rings too (so it fills thin cracks of band into the kerb as well as cutting thin tips of kerb); (5) a
dropped vertex's chord is never checked against other rings (an ear whose triangle holds another ring's vertex would
make rings cross).

**F1-3. The construction's shell cannot carry the engine as typed, but the engine needs no MINTED transaction once
it is handed its read.** The construction lays its parts on `insertTx(p, d.level)` (insert/classes.ts `insertTx`
:132 — its own work, warnings and journal, workLimit `Number.MAX_SAFE_INTEGER` by default) under `opSave(d.t)` of the
batch (S20 kerb.ts `dryInsert` :1406-1414, `dryClose` :873). `bandCore` and below need an `OpenTx`, not an `InsertTx`:
`chargeTx(t, TX_FACES_WALKED, …)` (bandUnion.ts :554; tx/state.ts `chargeTx` :164 — it also sets `t.failed`),
`dropSpurs` → `rewriteRows(t, …)` (tx/relevel.ts :348 — it charges `t.work` and journals into `t.log`), `noteRow(t, …)`
(tx/state.ts :149), `opSave` / `rollback` (faces/common.ts :459, :485 — `mark(t)` needs `t.batch`). But nothing in
`bandCore`'s call graph checks the open set except `readOn` → `readKerb` → `openTx(o)` (kerb.ts :2154 is the only
`openTx(` in arr/, insert/, faces/; `isOpenTx` is read only by facade/kernel.ts :170). With the face's read handed in
(S-9) and `offRead` retired (R-3), the engine runs on an OpenTx-SHAPED VIEW that is never minted: the batch's
plat/key/spec/env/ranks/batch frame shared, its own level, work, warnings, journal, log, `failed` and `closed`
(section 3, kernel form K2). The prototype's `{ ...t, level: 2 }` + `markOpen` (pprime.diff `layRead`) failed only
because its engine called `readKerb` on the copy (step8 "what stands in the way" 2).

**F1-4. `rollback` restores neither `work` nor `failed`.** faces/common.ts `rollback` :485-528 cuts the journals, the
chain journal, the log and the warnings back to the savepoint; the batch's `work` and `failed` are untouched (and
`opSave` does not record them). So any charge the lay makes to the batch stays, and a charge past the limit dooms the
batch (`chargeTx` sets `t.failed`). The prototype's hand restore (`t.work.total = w0.total`) hid the first and could not
undo the second. A lay must never charge the batch: section 3.

**F1-5. A refused kerb read silently passes S8's needle floor.** layout/src/infill/bentCutFabric.ts :938-939:
`if (!kc.ok || needleTips(...).length === 0) continue;` — a child whose kerb read refuses is treated as having no
needle, so the cut stands. Under the construction this was already so; under P′ a lay refusal on a child does the
same. Counted and REPORTED (section 4), not changed (layout is M0-b-03's).

**F1-6. A lay's read-back scans every slot of its level.** `readBack` (bandUnion.ts :866-872) and `dropSpurs`
(:749-765) loop `for (let c = 0; c < p.slots.face[n].top; …)` and keep the faces whose L1 ancestor is in the op. A lay
therefore costs O(L2 face slots) besides its insertions — nothing at S8 time (L2 holds no record in a stage run at M0,
[MEASURE: S-6 (i) count]) and linear in the arena's L2 size on an edit's re-derivation at M1. REPORTED; a queue row for
M1 (a face-local read-back by the index) if the cost shows.

**F1-7. B-FUZZ's kerb row classifies a lay refusal as 'own'.** step9-replays.md §1: bfuzz replays a refused kerb read
with the construction's dry run (bands/replay.ts), which does not refuse there, so the eight lay refusals were classed
'own' and the file's own cap (`refusals.kerb.own ≤ 1`) failed. Under P′ a kerb refusal is the engine's, so its replay
is the engine's (the corridorUnion replay class). This is a line of the round (line 12).

**F1-8. No M0 caller lays a band at L3.** The production callers of `bandUnion` are the façade (facade/kernel.ts :210,
a writer member) and none in layout/ or bench/ (grep); model/src/schema/staged.ts :39 stages `Enceinte.band` ("L3
half-bands built by bandUnion at S10's step (0)") at M1. At M0 the L3 commit runs in `bfuzz.test.ts` (its bandUnion
step after corridorUnion) and in the bands folder's fixtures only. Section 5.

**F1-9. The design paragraph is buildable; three of its words need correcting.** (1) "Wedge tips thinner than the
attraction distance removed", read as "every tip narrower than attractCm", would cut every acute block corner the arena
holds (section 1, candidate C2) and so contradicts "and nothing else"; R must remove the tips the door itself folds.
(2) "R(X) differs from X only by pieces thinner than the attraction distance" holds, but R(X) is not a subset of X: the
snap absorbs band slivers along F's boundary into the kerb. (3) "One face wherever the arena beside the face is the same
at both times": S9 lays all of a district's faces in ONE op (bandUnion.ts `writeOutlines` :628-697, then the cross-face
tips :715-721), so a face's commit meets its batch-mates' L2 work that its lone lay never saw — at M0 too. The B-FUZZ run
found 1 network where the lone lay refuses and the district commits, and 8 the reverse (step9 addendum). "The arena
beside the face" must include the other faces of the same commit. Nothing in the ruled design is impossible in the code.

**F1-10. The architecture's §3.7 never received 986 (c)'s text.** ARCHITECTURE.md :5359-5362 still reads the
pre-986 sentence ("S9 then commits `corridorUnion` for those L1 faces — the same function on the same inputs — so the
block S8 cut and the block S9 keeps are one face"); "Kerb state and the derived kerb" is nowhere in the file. So the
amendment item withdraws 986 (c) (never applied) and edits the CURRENT sentences (section 6).

**F1-11. The tx tests keep their dry-run generator for good under P′.** Under P `kerb()` opened no frame and M0-a-06's
`savepoint.test.ts` :470-483, `cost.test.ts` :164-203 and `oracle.test.ts` :226-232 went red (P's red list:
cost.test.ts:203, oracle.test.ts:402, savepoint.test.ts:425). Under P′ `kerb()` opens a savepoint and frames again —
the lay's. They stay a generator after the construction is removed, which answers the review's worry (review.md D,
"re-breaks when the construction is removed"). Their frames are classed by `kernel/test/tx/support.ts` :383-386
(`stack.includes('dryInsert') ? 'dry-run' : 'op'`), so the lay's frames are classed 'op' unless that test helper also
recognises the lay (section 3.6). P′'s tx chunk has not been run in the red list yet [MEASURE: red list].

**F1-12. P′'s red list so far** (results/step2/L, run 11:32Z – , still going): the bands chunk 001 — 17 of 22 files red
(the folder is M0-a-09's own; expected, since the prototype's S9 commits X); kernel-boundary.test.mjs (chunk 105) red
on the prototype's kerb.ts (imports of `bandCore` / `'./bandUnion.js'`, `blocks`, two more `kerb` strings); chunks
093 – 109 otherwise green; the tx, layout, testkit and bench chunks [MEASURE: red list]. P's red list (P-table.md) named
15 files of 7 other owners (M0-a-06 3, M0-b-03 5, M0-b-04 1, M0-c-06 2, M0-c-07 1, M0-d-07 1, M0-x-05 2; besides
M0-a-09's 16 and M0-f-01's 5 Mac-reference files, declared red by J176) — past R-11's threshold — but P′'s S8 outcome is close to BASE's (1 203 cuts against
1 207 at CITY fusion 3), so P′'s list is expected far shorter [MEASURE: red list].

---

## 1. (A1) THE RESOLUTION RULE R

### 1.1 What the arena cannot hold, in its own terms

The door resolves geometry by VERTEX rules (§3.6; ARCHITECTURE.md :5150-5200, :4380-4388; §3.10 :5580-5600): an
incoming vertex within `attractCm` (26 cm) of an existing vertex moves onto it; one within `attractCm` of an edge is
placed on it; no edge shorter than `minEdge` (25 cm) is created; every vertex stands at least `minEdge` from every edge
outside its one-ring; a mandatory chain for which no route keeps that clearance within the fidelity bound
(2·√2·`attractCm`) is refused `E_INVARIANT`. So what the door cannot hold is not "every part narrower than 26 cm" (it
holds a 30° corner, and a 1.3° wedge whose two sides carry no vertex within 26 cm of each other — the apex's one-ring
covers both edges): it is a configuration where vertices on two sides of a part stand within `attractCm` of each other
or of the opposite edge. Where that happens the door folds the part (P′ measured it: every lay that differs from X
differs by thin pieces, step 8 (b)) or, where folding would move an L1 edge or break clearance beyond the bound, refuses
(step 9: 36 of the 37 rising networks). R's job is the second case only: remove, before the lay, what would make the
door refuse, in the door's own terms, and nothing that the door would hold.

The dissection's classes (rising-table.txt; step9 §2): a vertex within `attractCm` of F's boundary and not on it (32
networks); a thin component (32); an edge under `minEdge` (29); a spike tip (18). Rule (b) — thin components removed,
spikes eaten — left 2 of the first class and the L3 network; rule (a) — short edges merged — made rings cross.

### 1.2 The candidates

For each: its definition, its guarantees, its cost, and the wrong output it can produce.

**C1 — the morphological opening of X by a disc of radius `attractCm`/2, with the exact routine's own buffers.**
open(X) = (X ⊖ D) ⊕ D: X ⊖ D = `exactRegion(X's rings, the strips and round joins of X's boundary at half-width 13 cm)`
(`exactRegion`, kerbExact.ts :541; `bufferParts`, buffer.ts), then its union with the buffer of its own boundary.
*Guarantees:* every point of the result lies in a disc of diameter 26 cm inside X (up to the round joins' 2 cm sagitta);
lattice vertices (snap-rounded); rings simple; R ⊆ X only up to the chords' sagitta; symmetric in ring direction and
start; a function of X alone; NOT idempotent after rounding (a second opening re-cuts the chords). *Cost:* two more
arrangements of X with one part per X edge — X's own final `exactRegion` is 1.81 ms a read at CITY with far fewer parts
(step6-cost.md), so plausibly +4 – 10 ms a read, on every read. *Wrong output:* it rounds EVERY convex corner of X. A
rectangular block loses a curved cusp 13·(√2 − 1) ≈ 5.4 cm deep at each right-angle corner, and a 30° corner one
13·(1/sin 15° − 1) ≈ 37 cm deep, each cusp replaced by arc chords about 14 cm long (shorter than `minEdge`). Every block
at CITY is changed by it although the arena holds every one of those corners. **Rejected** as R; usable only as a
detector (C1 is the definition of "thin" P1 below uses for whole components).

**C2 — wedge clipping at the width station.** At each convex vertex, where its two boundary chains come within
`attractCm` of each other, cut the wedge by the chord at the station where its width reaches `attractCm`. *Guarantees:*
lattice only after rounding the station points (new vertices); start- and direction-symmetric; a function of X alone;
R ⊆ X. *Cost:* small (a walk along both chains per acute vertex). *Wrong output:* the acute block corner. At a Y-junction
whose block corner is 30°, the width reaches 26 cm 48.5 cm from the apex: C2 cuts 48.5 cm off the corner of a block the
arena holds (two long kerb edges meeting at 30°, committed with no warning; below 5° with W_ACUTE_CORNER for a mandatory
chain, §3.6 *Chain classes*). It also cuts the long 1.3° wedge whose sides carry no vertex for metres — which the door
holds — over its first ~11 m. **Rejected**: it removes what the arena can hold. (This is why I read the reviewer's
"rule (b) does not cut a long wedge between two long edges" as a property of the right rule, not a defect: section 1.4.)

**C3 — the prototype's rule (b), made precise** (P1 and P2 below). It removes whole components with no disc of
diameter `attractCm` (P1) and eats spike tips whose two neighbours stand within `attractCm` of each other — exactly the
places the door folds by vertex attraction (P2). Its precise form fixes F1-2.

**C4 — the snap of near-boundary vertices onto F's boundary** (S below): a vertex of X within `attractCm` of F's
boundary and more than the 1 cm boundary reading off it is moved onto it, as the door would move it. Not tried by the
prototype; the two corridorUnion networks rule (b) leaves are its class (step9 §2).

### 1.3 The recommended rule: R = the fixpoint of S, P1, P2

Inputs: X (canonical rings of `exactRegionOfKey`: outer rings counter-clockwise, holes clockwise) and B, F's own L1
route rings as the read holds them (`f.rings`, kerb.ts `readFace` :342) — the same record X is computed from, so R(X) is
a function of the read's own face record and nothing else. [The L3 variant adds content to B: section 5.] A = `attractCm`
(26), M = `minEdge` (25). Every distance test is the kernel's own exact predicate: a vertex within r of a segment is
insert/stretch.ts `withinSegment(px, py, ax, ay, bx, by, r)` (inclusive; the door's test), two vertices within r is
`dist2 ≤ r²` on lattice integers, sides are `orient2d` — no float decides (§3.2 (3)).

```
R(X, B):
  repeat until a pass changes nothing:
    S  (snap; vertices in lattice order — y, then x; ties: ring order of the canonical X)
       for each vertex q not within 1 cm of B (withinSegment(q, e, 1) for no edge e of B):
         target := the nearest vertex b of B with dist2(q, b) ≤ A²            (§3.6 step 2: an endpoint first)
                   else snap(the foot of q on the nearest edge e of B with withinSegment(q, e, A))  (kernel snap: half away)
                   else none
         if target: move q to it; drop a vertex equal to its predecessor; keep the move only if the ring stays simple
                    (kerb.ts ringSimple), crosses no other ring (chainCrosses / segmentsMeet, exact) and keeps the sign
                    of its area (a ring whose area becomes 0 is dropped); else put q back
    P1 (thin components and thin holes)
       components := each outer ring with the holes inside it (a hole's first vertex inside the outer ring, exact winding)
       for each component C with area2(C) ≤ (A + 1) · perimeter(C)              (a sound pre-filter, 1 cm of slack)
         if exactRegion(C's rings, bufferParts(each ring of C as a closed chain, half-width A/2, round joins)) is empty:
           remove C, its holes with it
       for each hole H of a kept component with |area2(H)| ≤ (A + 1) · perimeter(H)
         if exactRegion([H reversed], bufferParts(H closed, A/2, round)) is empty: remove H (fill it)
    P2 (spike tips; every ring of 4 or more vertices, outer and hole alike)
       for each vertex v in lattice order, with a, b its neighbours in its ring:
         if dist2(a, b) < A²  and  |orient2d(a, b, v)| > dist2(a, b)      (v farther from the line ab than a is from b)
            and no other vertex of any ring lies in the closed triangle (a, v, b)   (exact orient2d)
         then drop v
  return the rings with 3 or more vertices and area2 ≠ 0, each canonicalRing, sorted by compareRings
```

"Thin" for a component is a definition in the architecture's terms: C holds no disc of diameter `attractCm` — its
erosion by half the attraction distance, with §3.7's own buffers (strips, round joins of at most 2 cm sagitta), is empty.
The pre-filter is sound: if every point of C lies within A/2 of its boundary, C's area is at most (A/2)·perimeter, so
area2 ≤ A·perimeter. 2A/P is NOT the test (the reviewer's point; F1-2): a 300 cm × 40 cm-based triangle has 2A/P 18.8 cm
and an inscribed disc 37.5 cm across — the door holds it, rule (b) removed it, P1 keeps it.

### 1.4 What R guarantees, and what it does not

* **Every vertex a lattice point.** P1 and P2 only drop vertices; S moves a vertex to a vertex of B or to `snap` of a
  foot (kernel `snap`, half away from zero).
* **Rings simple and non-crossing.** P1 removes whole components or holes; P2 drops an ear whose triangle holds no other
  vertex, so its chord crosses nothing (the ear-clipping condition); each S move is kept only if no crossing results.
  Rule (a)'s crossings (5 RING_CROSSES on 3 networks, step 9) cannot arise.
* **Idempotent.** R is defined as a fixpoint: R(R(X)) = R(X). The loop ends: S moves a vertex from off B onto B and
  never off it again; P1 and P2 only drop; each pass that changes something lowers (vertices off B) + (vertices) — at
  most twice X's vertex count of passes.
* **Symmetric in ring direction and start.** Every order is the lattice order of vertices, never a ring index; P2's
  test is symmetric in a and b; the output is canonical.
* **Not a subset of X.** S absorbs into the kerb the band sliver between X and B where it is thinner than `attractCm`
  (the door's own attraction of a kerb vertex onto F's L1 edge); P1 on holes and P2 on hole rings fill thin cracks of
  band. R(X) ⊆ X ∪ {points within A of B} ∪ {thin cracks}, and R(X) ⊇ X − {parts with no disc of diameter A}.
* **R(X) differs from X only by pieces thinner than `attractCm`.** Each piece of X Δ R(X) is an S sliver (within A of
  B), a P1 component or hole (no disc of diameter A), or a P2 ear chain (each ear's base under A). As a TESTED property:
  every component of `exactRegion` of the symmetric difference (both ways) has an empty erosion by A/2 — the same P1
  test; the bar of line 14.
* **A function of X and F's ring.** S reads B; P1 and P2 read X only.
* **What R keeps on purpose.** A wedge whose two sides carry no vertex within `attractCm` of each other or of the other
  side (the door holds it, with W_ACUTE_CORNER below 5°); every block corner of any angle whose neighbours stand 26 cm
  or more apart; necks (two lobes joined by a neck thinner than A — the lay closes them as the construction did, S-13,
  and the plan equals the commit); short edges (the door merges them without refusal: rule (b) had none of their
  refusals left).

**The wrong outputs it can produce.** (1) P2 at a sharp but holdable corner: a 30° block corner K with a rounding vertex
a 20 cm along one side and b 30 cm along the other — |ab| ≈ 16 cm, K 18.8 cm from ab — loses the triangle K-a-b
(150 cm²). The door would fold the same tip (b within 26 cm of a merges onto it), so the plan still equals the commit; the
block loses an 18 cm corner tip that the definition holds. (2) S beside a narrow way whose half-width is under 26 cm:
every kerb vertex along it stands within A of the spine edge (F's boundary) and is snapped onto it, so that half-band
vanishes from the served kerb — exactly what the door does on the commit (B-FUZZ draws half-widths of 1 – 29 cm; CITY's
lanes are wider). (3) S at a junction whose kerb corner stands within 26 cm of the junction vertex J (half-widths under
about 18 cm at a right angle): the corner is snapped onto J and the wedge vanishes. I found no face where R removes a
part the door would hold apart from (1), whose loss the door shares.

**Cost of a read** (an estimate to be measured): S is O(n·m) `withinSegment` calls (n X vertices, m F edges; a few
hundred × a few dozen ≈ 10⁴ predicates, ≈ 0.05 – 0.1 ms) plus a crossing check per kept move (rare); P1 runs one
small `exactRegion` per candidate component (narrow components on 12 of 2 767 CITY reads, step3-r8.md); P2 is O(n) a pass
plus an O(n) triangle test per candidate (rare). Expected ≈ 0.1 – 0.3 ms a read beside X's 3.5 ms [MEASURE: R's ms a read].

**What would confirm it**: the MEASUREMENT REQUEST (section 11): on the B-FUZZ population at seed 20261112 no network
the base commits refused (rule (b) left three: S is meant for two, section 5 for the third), the refusals per operation
at or below the base, rings simple, R idempotent and start-free on every read, every piece of X Δ R(X) thin; at CITY
the same S8 ≡ S9 figures as P′ (the exact share ≥ the base's, `beyond` 0).

---

## 2. Where R sits in the reads

* **`readKerb(o, face, widths, cache?, vertexContacts = true): KernelResult<KerbRead>`** — signature and result type
  unchanged (API freeze). It returns: `face`, `rings: f.rings`, `edges: f.edges`, `spines` = the edge spines plus the
  `through` spines in X's reaching set (DESIGN-10; the prototype's `spines`), `kerb` = `splitsOn(p, f.edges, spines,
  R(X)).rings`, `splits` = its splits, `warnings: []`, `region` = R(X), `census` where `f.through.length > 0` as the
  prototype builds it. `CENSUS.set(p, …)` as the prototype (`refusedAt: null`, `faithful: 'none'`). It opens nothing and
  writes nothing (`openTx(o)` for the arena only). This is S9's read (bandUnion.ts `readOn` :584) and the lay's input.
* **`kerb(o, face, widths): KernelResult<Ring[]>`** — `readKerb`, then the lay of that read (section 3). X is computed
  ONCE a `kerb()` call (S-9): the engine is handed the read.
* **`KerbRead.region`** keeps its meaning ("the region the read computed, before the splits' ends were spliced in",
  S20 kerb.ts :222-223): R(X). X itself is no field; the shadow hands it to the observer (line 6).

---

## 3. (A2) THE LAY'S KERNEL FORM

### 3.1 Where it lives

The engine (`bandCore` → `writeOutlines` → `dropSpurs` → `readBack`) and everything a lay needs of it are
module-local to bandUnion.ts (:549-932); `kerb()` is kerb.ts's (:2256 on S20). Three placements:

* **L-A (recommended): the lay is a function of bandUnion.ts, `kerb()` imports it.** bandUnion.ts gains one export
  with a noun-free name (sketched as `layOne(o, face, read, widths)`); kerb.ts's `kerb()` becomes `readKerb`, then
  `return layOne(tx, face, r.value, widths)`. kerb.ts gains `import { layOne } from './bandUnion.js'` — an ES-module
  cycle kerb.ts ↔ bandUnion.ts (bandUnion.ts imports kerb.ts at :80). The cycle is benign at runtime: neither module's
  top level calls the other's exports (bandUnion.ts's top-level constants read `LATTICE` and `HOT_PIXEL_CM` only; its
  uses of `RING_CROSSES` and `readKerb` are inside functions; kerb.ts's top level calls nothing of bandUnion.ts) — the
  build and a production-bundle pin decide (line 3).
* L-B: the lay in corridorUnion.ts, beside the spec it shares. It saves the `'kerb'` literal but costs kerb.ts a
  `corridor` string row and corridorUnion.ts a `band` ident raise and a new `block` ident row. Not better.
* L-C: a side-effect registration (kerb.ts holds a hook bandUnion.ts sets at load). **Refused** (S-10):
  `packages/kernel/package.json` :8 declares `"sideEffects": false`, so a bundle that imports `kerb` and nothing of
  bandUnion.ts drops the module and `kerb()` would silently serve R(X) unlaid.

### 3.2 The transaction the lay runs on

**K2 (recommended): an OpenTx-shaped VIEW, made in bandUnion.ts and never minted.**

```
const v: OpenTx = { ...t,                         // plat, key, spec, env, stageRank, keptBelow, batch (frames), indexLog
  level: max(2, t.level),                         // as the construction's dryLevel (S20 kerb.ts :864)
  work: { total: 0, counts: new Map() },           // the lay's own; workLimit stays the batch's declared limit
  warnings: [], journal: { vertices: [], pairs: [], split: [], steiner: 0, changed: [] },
  log: emptyLog(), failed: null, closed: false, op: 'lay' };
```

Why it is sound: every writer below `bandCore` takes the transaction by argument and reads only these fields
(`insertChain`, `planSplitThrough`, `applySplitPlan` type it as `InsertTx`; `chargeTx`, `noteRow`, `rewriteRows`,
`opSave` / `rollback` as `OpenTx`). Its marks go on the batch's own frame stack (`mark(v)` reads `v.batch`, tx/frames.ts
:304), so the arena, the index and the index batch log are put back by the batch's undo (`undoTo` :320, the index half
cutting the batch log); its charges, `failed`, journals, chain journal (keyed by the object, insert/stretch.ts
`chainJournal` :116) and log are its own and are dropped with it. It is never in the open set (no `markOpen`), so
`isOpenTx(v)` is false throughout and the open set cannot change (S-4 (d)); the façade's guard (facade/kernel.ts :170)
refuses it if it ever reached a public writer. The engine meets `openTx` only in `readOn` (bandUnion.ts :584) — never
called by the lay (its read is handed in) —, in `offRead` (retired) and in `setOwner` (readBack :927-930), which runs
only where the spec names an owner (corridorUnion's spec names none, corridorUnion.ts :49). The spread copies `spec`,
`env`, `stageRank` and `keptBelow`: the insertion's kept-content test does not read them (it reads finer vertices and
face records, insert/stretch.ts :785-823), and what `rewriteRows` stamps with `stageRank` (tx/relevel.ts :1040)
is arena state, undone with the rest — the pins of line 3 decide.

**K1 (the fallback): a minted dry view in tx/.** `tx/state.ts` gains a function that mints such a view (`markOpen`)
and closes it, with its own pins. It is M0-a-06's directory (M0-work.json owns `plat/packages/kernel/src/tx/`), so it is
a LEG on M0-a-06 before the M0-a-09 round. Take K1 if the session (or M0-a-06's reading of RQ4, tx/state.ts :88-93's
"the one place an OpenTx is minted") holds that no OpenTx-typed object may be made outside tx/. [OPEN: A2.1]

K2 is not the construction's shell: `insertTx` cannot carry `bandCore` as typed (F1-3), and the lay must be the
commit's engine with nothing left out (`dropSpurs` included).

### 3.3 What the lay does

```
layOne(o, face, read, widths):                                   // bandUnion.ts; o the caller's open transaction
  t := openTx(o); p := t.plat
  entity := F's owner (idOf(p, p.faces[1].owner[face])) where it has one, else a fixed kernel placeholder id   (S-3)
  v := the view (3.2)
  save := opSave(v)
  try:
    r := bandCore(v, [face], { widths, edgeRole: 'kerb', entityOf: () => entity, owner: null, vertexContacts: true,
                               reads: { face → read },  quiet: true })                              (S-9; S-4 (e))
    if r refused: return r's code and detail                                   (kerb()'s refusal codes widen: S-7)
    rings := []
    if face ∈ r.whole: rings += simple loops of F's own L1 walk                 (S-2: its own child at L2 is F)
    for each c in r.blocks: rings += simple loops of c's walk at v.level
    return ok(rings sorted by compareRings, the lay's warnings)
  finally:
    rollback(v, save, …); v.closed := true
```

The engine's two new options: `reads` — `writeOutlines` uses the handed read for a face it holds and reads the others
as today (:628-632); `quiet` — `writeOutlines` does not set `CLOSINGS` (:625). The corridor spec is `corridorUnion`'s
(corridorUnion.ts :41-50) but for the entity and the read. A face `wholeBand` reads back no ring (an empty kerb; S8's
`kerbFace` then reads the face empty, as today).

**The read-back** (S-2, the step 9 fix): each block face's walk (`faceWalk(p, level, c)`) split into simple loops
(winding.ts `simpleLoops`: a hole touching the outer ring at a vertex is a loop of its own), spikes dropped (kerb.ts
`unspiked`), rings of 3 or more vertices with area kept, each canonical. Outer rings come out counter-clockwise and holes
clockwise (the face lies left of its walk), which is what `kerbComponent` (bentCutFabric.ts :703, the largest outer
ring with the holes inside it), `kerbSeed` (:742) and the harness (measure.ts :572-576) read. Islands are block faces of
their own; a kerb of several components reads back several outer rings; the largest-component rule is unchanged. A
neck the lay closes reads back as two components and the smaller gets no seed (S-13: Q102's seedless class, REPORTED).

**Warnings**: `kerb()` returns the lay's insertion warnings, as it returned the construction's shell's (S20 kerb.ts
`kerb` :2256-2260); no stage reads them (draft F0-3: `bentCutFabric.ts` calls `warn` with S8's own codes only); the
façade passes them. [OPEN: A2.2 — or `[]`.]

**Work and its limit.** The lay's work is charged to the view, from 0, under the batch's DECLARED limit (`t.workLimit`)
— so a lay's E_WORK_LIMIT is the lay's own refusal and never depends on what S8 charged before it; the batch's work,
headroom and `failed` are untouched (F1-4). (The construction's shell had no limit at all: insertTx's default.) The
lay's work units a read are REPORTED.

**Level.** `max(2, t.level)`, as `dryLevel`: S8's L1 batch lays at L2, where `corridorUnion` commits; a lay inside an
L2 batch (a test, the harness) lays at L2 too. At an L3 or L4 batch (no M0 caller reads `kerb()` there) it lays at the
batch's level, as the construction did.

**An unowned face** is laid under the placeholder (S-3): `savepoint.test.ts` :464-485 reads `kerb()` on an unowned
face; the testkit primitive (testkit/src/invariants/primitives.ts :596-606) reads arbitrary faces. The placeholder's
handle, if interning it writes the arena's handle table, is undone with the rest (the bits pin sees it).

### 3.4 What a lay leaves untouched, and how a test sees each (S-4)

| what | how a test sees it |
|---|---|
| the arena's bits and state | kernel/test/tx/support.ts `bits(p)` / `state(p)` before and after `kerb()` equal (step 1's form) |
| the batch's work and headroom | `t.work.total` and every `t.work.counts` entry equal before and after; a batch one unit under its limit reads `kerb()` ok and then commits |
| the batch's `failed` / `closed`, `op` | equal (null / false / the caller's) |
| the batch's warnings, journal, chain journal, log | deep-equal snapshots before and after (`chainJournal(t)` read by path) |
| the open set | the view never enters it: a mock of `insertChain` (dryrun.test.ts's mock form) records the transaction it is handed; after `kerb()` returns, `isOpenTx` of that object is false and it is not the batch's |
| the frame stack | the batch's frame count equal before and after (M0-a-06's frame observer, `setFrameObserver`) |
| the index batch log | `indexOf(p).log.writes.length` equal |
| `CLOSINGS` | `bandClosings(p)` before and after equal (the lay is quiet) |
| `CENSUS` | `kerbCensus(p)` after `kerb()` equals it after `readKerb()` of the same face (one write, the read's) |
| M0-a-06's frame classes | a lay's frames are classed 'dry-run': `savepoint.test.ts`'s `clean('dry-run', 2)` green with `kerb()` as the generator (support.ts's stack test gains the lay's function name — a test-side seam in M0-a-06's file, section 8) |
| a lay on an arena that holds L2 content | the same checks on a fixture with a committed neighbour (line 9) |

### 3.5 The lint arithmetic for L-A + K2

Counted with the lint's own `scanText` (tools/lint/kernel-boundary.mjs) on S20's files and on the head's bandUnion.ts
and corridorUnion.ts, and on a sketch of the new and removed code (`probes/tokens.mjs`, `probes/sketch/*.ts`). The
lint fails a count above its row AND a count below it (slack must be tightened in the same change, kernel-boundary.mjs
:139-148), so every change below is an allowlist edit (M0-d-07's file, the session's seam).

| file | noun / kind | now (row) | after | change |
|---|---|---|---|---|
| arr/kerbExact.ts | kerb ident 2, kerb string 1 | 2 rows | file deleted (W2) | two rows removed |
| arr/kerb.ts | kerb ident | 20 (20) | ≤ 20: the fold leaves 20 (review probe); `kerb()`'s `r.value.kerb` goes (−1); the new readKerb / constructionRead / provider must hold the rest (R-21) | lowered to what the seat's lint prints, or unchanged |
| arr/kerb.ts | kerb string | 8 (8) | 8 (the fold removes no message; the lay's `'kerb'` role lives in bandUnion.ts) | unchanged; R's names are noun-free |
| arr/kerb.ts | band string | — | 1 (`'./bandUnion.js'`) | **a new row** |
| arr/bandUnion.ts | kerb ident | 14 (14) | 13 (`offRead`'s `r.value.kerb` goes) | lowered |
| arr/bandUnion.ts | band ident | 28 (28) | 29 (the lay's call of `bandCore`) | **raised by 1** |
| arr/bandUnion.ts | kerb string | 6 (6) | 7 (the lay's `edgeRole: 'kerb'`) | **raised by 1** |
| arr/bandUnion.ts | block ident | 5 (5) | 6 (the lay's `r.value.blocks`) | **raised by 1** |
| arr/corridorUnion.ts, arr/index.ts | — | — | unchanged | — |

So L-A + K2 needs one new row and three raises by one, all on M0-a-09's files, plus two rows removed and up to two
lowered. Each new or raised row is a boundary change only the session makes, with an owner-visible reason (§3.4/§3.7:
"`kerb(F)` is the door's lay of the exact kerb: the lay reads back the engine's built blocks"). The three bandUnion.ts
raises could be avoided by indirection (a noun-free alias of `bandCore`, one type alias for `'kerb' | 'band'`, a
read-back through a sink) — I do not recommend it: it hides real uses from a ratchet whose purpose is to show them.
[OPEN: A2.3 — accept the rows, or ask the seat to restructure.] The seat's own lint run decides the exact counts;
a need beyond these rows STOPS the seat.

### 3.6 What the construction's shell gives the lay, and what stays

Kept and reused: the op savepoint discipline (`opSave` / `rollback` on the batch's frames), the level rule (`dryLevel`'s
"at least L2"), `readFace`, `splitsOn`, and X's fold (W2). Not reused: `dryRun` / `dryClose` / `insertTx` (the shell
cannot carry the engine), `dryInsert`, `dryRegion`, `censusRead`, `restagedRead`, kerb.ts's `readOn`, the faithful read,
`readQuality`, `stepped` / `steppedAt`, `sharedPath`, `coincident`, `keptDeep`, `clipWindow` — all of which stay in the
tree one round only behind `constructionRead` (debug-only; line 5) and leave with it.

---

## 4. (A3) THE L2-CONTENT DEPENDENCE

**What the lay reads beyond level ≤ 1** (the code paths): `insertChain` at the view's level queries every vertex and
edge of level ≤ 2 within `attractCm` of each segment it lays (attraction, placement, clearance; §3.6); `pinContact` and
`runVertex` query level ≤ 2 vertices and edges at each contact (bandUnion.ts :326, :346); the insertion's kept-content test refuses
E_KEPT on any finer vertex (level 3 or 4) off every route of level ≤ 2 within `attractCm`, and on a finer face record
round a segment (insert/stretch.ts :785-823, insertChain.ts :251); `readBack` and `dropSpurs` read the L2 faces whose
L1 ancestor is F. R(X) reads level ≤ 1 only (X and F's ring). So the lay is a function of: F's level ≤ 1 record, the L2
records within `attractCm` of R(X)'s outline, splits and contacts, any finer content within `attractCm` of them, and
its work limit.

**Two equal L1 states give two laid kerbs** wherever that L2 or kept content differs: (1) a neighbour district's
committed L2 kerb on a shared seam (its pinned contacts on the seam edge stand within `attractCm` of this face's
contacts); (2) the other faces of the same S9 commit — the district's faces are laid in one op in canonical order, so
face B's pieces meet A's (Steiner vertices on a shared spine-less L1 edge, along-closings, tips left across a face
boundary for another face to reach: bandUnion.ts :420-422, :687-696, :715-721), which B's lone lay never meets; (3) L2
content of an earlier batch inside or beside F — kept content on an edit's re-derivation at M1 (`rederivesFrom`);
(4) at M0 in a stage run, nothing: S8 runs before any L2 write (S9 is not a registered stage; measure.ts :544-546 runs
its `corridorUnion` after the derivation). The same dependence existed for the construction (its dry run laid at L2,
`dryLevel`; its own comment names "an earlier batch's kerb", S20 kerb.ts :30).

**What must be pinned** (line 9):
* (i) at M0, no L2 record within `attractCm` of any lay's outline, contacts or splits at S8 time — a CITY count,
  FAILING 0 (S-6 (i));
* (ii) `kerb()` equal on a slot-renumbered copy and on a decoded copy of an arena that HOLDS L2 content
  (representation.test.ts's method extended to `kerb()`; the arena with a committed corridor beside the face);
* (iii) a two-district seam fixture: district A committed, then B's lay beside the seam — its difference from B's lay
  on the arena without A REPORTED with the fixture's rings, and the M1 queue row: "all of a district's S8 lays before
  any neighbour's S9 on a shared seam, or the dependence declared" (S-6 (iii));
* (iv) a two-face fixture of one district sharing a spine-less L1 edge whose lone lays differ from the district's
  commit — the cross-face case — with each face's lone lay, the commit's block, and their difference printed: the
  sentence "one face wherever the arena beside the face is the same at the commit" holds with "the arena beside the
  face" counting the commit's other faces;
* (v) the same S8 ≡ S9 figures after a save and load between S8 and S9 (the harness run once with an encode / decode
  between derive and `s8s9`) — REPORTED, expected identical at M0 (L2 empty at S8 time).

**What S8 does with a refused lay**: `kerbFace` returns `{ error }` and the face becomes an 'unresolved' block
(bentCutFabric.ts :1373-1377: `rungs.push({ rung: 'unresolved', outcome: 'block', why: kr.error })`; `makeBlock(run,
null, …)`); `kerbSeed` returns null (no seed); the needle floor skips the child (F1-5). Counts: FAILING — S8's
kerb-caused 'unresolved' rungs per seed never above the base's (0 at CITY under BASE, P and P′, step 9 §3); REPORTED —
every face whose lone lay refuses while its district's commit succeeds, and every district commit that refuses while
each of its faces' lone lays succeeds, listed one by one (B-FUZZ under P′ without R: 1 and 8 [MEASURE: under R]); the
needle-floor reads refused.

---

## 5. (A4) `bandUnion` AT L3 OVER A COMMITTED L2 KERB

**The case** (step9 §2, ref/bfuzz-rule-b.log line 5): B-FUZZ's bandUnion step lays a band at L3 in a face where
corridorUnion has just committed its kerb at L2. bandUnion's read (`readOn` → `readKerb`, `vertexContacts` false) is X,
which reads level ≤ 1 content; the L3 commit's piece `4000,3853 → 3805,1271` converges at a shallow angle on the L2
kerb edge `4000,3707 – 3848,1981`, and no route keeps clearance within the bound. The construction's L3 read was a dry
run at L3 (`dryLevel(3) = 3`) that met the L2 kerb and was attracted to it.

**Whose it is.** No M0 stage lays a band at L3 (F1-8); the L3 commit runs at M0 only in B-FUZZ and the folder's
fixtures. But B-FUZZ is the item's registered refusal census (J264 / N-58), so a network the base commits and the tree
refuses there fails the round's census bar whichever milestone the caller belongs to.

**The options.** (a) **R's boundary set at a read of level n ≥ 3 includes the coarser content inside F**: B := F's L1
rings plus the edges of levels 2 … n−1 inside F (read from the face record the read already walks; at an L2 read B is
F's rings alone, so S9's corridor read and every S8 lay are unchanged). S then puts a vertex of X within `attractCm` of
the committed L2 kerb on it, as the construction's dry run was attracted. The read at level n then depends on content
of levels < n — as `readFace` already depends on levels ≤ 1 — and an L2 op can change no input of an L2 read, so
`offRead`'s retirement argument stands (it fires only at L2). (b) **Declare it**: the network is listed as a declared
class of the census with its cause, and a queue row for M1 (S10 step (0)'s wall bands) carries the design. (c) The L3
lay reads L2: the lay already does (it inserts at L3 and meets L2), but bandUnion has no lay — its commit IS the
engine, and the commit refuses.

**Recommendation: (a)**, if the measurement shows it commits that network and moves no other (section 11, run M3);
else (b). [OPEN: A4.1] Either way the folder gains the network as a literal pin.

---

## 6. (A5) THE CONTRACT TEXT

### 6.1 The amendment item (a new file, `docs/AMENDMENTS-2026-11-12ac.md`, numbered from the next free number — 1007 if
file ab's 997 – 1006 is the last)

**1007. The served kerb is the door's lay of the exact kerb brought to the arena's resolution (supersedes item 986 (c);
re-declares 986 (d), 986 (e) (1) – (3) and (5), and the first clause of 991 (b)).**

(a) *What is decided.* `kerb(F)` stays §3.7's definition. It is computed in three steps: X(F), the definition's region,
exactly, by a lattice boolean that writes no arena (S18 – S20's routine); R(X), X brought to the arena's resolution by a
pure rule — every component and hole holding no disc of diameter `attractCm` removed, every spike tip dropped (a vertex
farther from the line of its two neighbours than they stand apart, they nearer than `attractCm` to each other), every vertex within `attractCm` of F's boundary and not on it put on it,
and nothing else — so that R(X) differs from X only by pieces thinner than `attractCm`; and the lay: the service
`kerb(F)` returns R(X) as `corridorUnion`'s own engine lays it for F alone at L2 in the open transaction, the built blocks
read back and everything undone. `corridorUnion` (S9) commits R(X) through the same engine.

(b) *What it replaces.* 986 (c) (the kept kerb state, the derived children, "read once by the construction and kept") is
WITHDRAWN: never applied to §3.7, never built. 986 (d)'s ruling "the derived kerb is §3.7's definition computed exactly;
the construction's attraction … the arena's reading of it" is RE-DECLARED: the exact region is the definition's value and
the ORACLE of every kerb served or committed; what is served and committed is the door's lay of R(X). 986 (e) (1) (a
derived read ≤ 50 µs) is WITHDRAWN (there is no derived read; the lay costs 15.3 ms a read in source mode at CITY,
step8-pprime.md (d) [MEASURE: under R, prod]); 986 (e) (2) (S8 ≤ 16 ms a cut) is WITHDRAWN as a bar and the S8 figure
carried to item 989's re-declaration (P′: 42.2 ms a cut in source mode); 986 (e) (3)'s share between the derived kerb and
the construction (0.91 / 0.95 in `derived.test.ts`) is MOOT — replaced by the S8 ≡ S9 share of the fusion harness
(M0-c-06's floor 0.95, unchanged) and by the bar that every served and committed kerb differs from X only by pieces
thinner than `attractCm`; its "0 blocks outside N-43's bound" stands as the harness's `beyond` 0. 986 (e) (4) (the
declared model shift) stands, re-stated: the shift is "the lay of R(X) in place of the construction", shown by a control
that serves the construction and moves nothing. 986 (e) (5) is re-stated: "no construction in S9's reads — each face's
X and R computed once a read, 0 construction calls". 991 (b)'s first clause ("kerb(F) is §3.7's definition computed
exactly on the kerb state, the construction's arena-attracted read being its oracle") is REPLACED by (a); its second
clause (the S8 ≡ S9 contract as KI-13 states it, the ratchet 0.91, the target 0.95) STANDS — measured 0.973 – 1.000
under P′ (step 8) [MEASURE: under R].

(c) *Why.* The exact region served as it stands (design P) was measured: S8 plans on needles up to 2.3 m long and 4 cm
wide that no arena can hold, so S9's commit misses the plan beyond N-43's bound on 171 – 318 blocks a CITY seed, the
exact share falls from 0.99 to 0.06, and two refusal classes of the door rise threefold to thirtyfold on B-FUZZ (step 3,
step 4). Laid by the door, the exact region gives the plan back (0.973 – 1.000, `beyond` 0); brought first to the
arena's resolution, the door's refusals fall below today's on B-FUZZ (step 9, rule (b): 8 networks refused against
BASE's 34) [MEASURE: under R].

(d) *Contract and bars.* §3.7, §4.6 and §13.2 as 6.2; GEO-9's exception as 6.2; the M1 ordering requirement as a queue
row (section 4 (iii)).

### 6.2 The replacement sentences

**§3.7, the decision paragraph** (ARCHITECTURE.md :5321-5323). Replace "and no second geometry engine ships (the one
exception is the pre-decided fallback below)" by:
> and no second geometry engine ships, with two exceptions: the pre-decided fallback below, and the outline of
> `kerb(F)`, which an exact lattice boolean computes on the face's own rings — it writes no arena and no caller receives
> its output: every kerb served (`kerb`, S8) or committed (`corridorUnion`, S9) is that outline brought to the arena's
> resolution and laid by `insertChain`, and so obeys attraction, placement, `minEdge` and clearance like every other
> chain.

**§3.7, *The kerb, defined once*** — the definition (:5338-5347) and the commit sentences (:5347-5359) unchanged. Replace
the service sentence (:5359-5362, "`kerb` is also a read-only service … so the block S8 cut and the block S9 keeps are
one face (tested, §13.2).") by:
> `kerb` is also a read-only service on the faces of an open transaction's overlay, computed in three steps: X, the
> region this paragraph defines, exactly, by a lattice boolean that writes no arena; R(X), X brought to the arena's
> resolution — every part or hole of X that holds no disc of diameter `attractCm` removed, every spike tip — a
> vertex farther from the line of its two neighbours than they stand apart, they nearer than `attractCm` to each other —
> dropped, every vertex within `attractCm` of F's
> boundary and not on it put on it, and nothing else, so that R(X) differs from X only by pieces thinner than
> `attractCm`; and the lay — R(X)'s outline and junction splits laid for F alone by `corridorUnion`'s own engine at L2 in
> the open transaction, the built blocks read back, and everything undone. S8 plans every cut on `kerb(F)` of the current
> L1 faces, inserts each accepted lane at L1 in its own district transaction and recurses on the children's kerbs; S9
> then commits R(X) for those L1 faces through the same engine, so the block S8 cut and the block S9 keeps are one face
> wherever the arena beside the face — the commit's other faces included — is the same at the commit (tested, §13.2).
> The kerb served omits the parts of the definition no arena can hold: slivers and needles thinner than `attractCm`, up to
> a few metres long where a flat junction end meets a width-less edge at a shallow angle.

**§3.4's signature comment** (quoted in 986 (b)): "`// §3.7's kerb: what corridorUnion commits`" →
"`// §3.7's kerb as the door lays it: what corridorUnion commits`".

**§4.6** (:7301-7303). Replace "S9's `corridorUnion` then commits exactly those kerbs (contract test "S8's working block ≡
S9's committed block, Hausdorff 0", §13.2)" by:
> S9's `corridorUnion` then commits those kerbs through the same engine (contract test "S8's working block ≡ S9's
> committed block", §13.2: one face wherever the arena beside the face is the same at the commit)

**§13.2** (:19088). Replace "S8's working block equals S9's committed block (Hausdorff 0; §3.7)." by:
> S8's working block equals S9's committed block wherever the arena beside the face is the same at the commit — no block
> beyond N-43's bound (2 · √2 · `attractCm`), the exact share at or above KI-13's ratchet (0.91, target 0.95) — and every
> kerb served or committed differs from §3.7's exact region only by pieces thinner than `attractCm` (§3.7).

### 6.3 For the owner, in plain words

On 28 October you accepted, under your delegation, that the kerb of a block — the line where the street's reserved
width ends and the block begins — would be computed exactly by geometry and served that way, with the kernel's own trial
insertion kept only as a check. We built that exact calculation and measured it at full city size. It is right to the
centimetre, but it is too fine for the map to hold: in places it draws slivers a few centimetres wide and metres long
that the map's own rules (points closer than 26 cm merge) fold away when the streets are committed, so the block that
was planned and the block that was built stopped matching on most blocks, and the commit refused some street layouts it
used to accept. So we are reversing the core of that decision. The exact calculation stays as the reference, but what the
planner is served is that shape tidied of what the map cannot hold and then laid by the same code that commits the
streets, tried and undone; the commit lays the same shape the same way. Measured, plan and build match on 97 – 100 % of
blocks again with no block outside the allowed tolerance, and with a first version of the tidying rule the refusals
fell below today's (the final rule is being measured). It costs about two-fifths
of today's time per kerb, not the near-zero cost we had hoped for, so the speed target attached to the old decision is withdrawn
and carried into the budget re-declaration you already hold. You may veto this; a veto keeps today's trial-insertion
kerb.

---

## 7. (A6) THE FRAME-SIDE END RULE, Q152's SIX, THE ORACLE, `offRead`, THE MEMO, THE COST

**The frame-side end rule (Q178 (b); J769 (2) OQ-1).** As the first draft's section (3), unchanged in substance: the
code's reading — an end on another chain's level-1 line is a junction end, flat, also where that line is a way laid
along the frame; the cap is kept where only level-0 content passes the end; `definition.ts`'s `endsOf` corrected to that
reading (test-side, M0-a-09's; M0-a-05 S14's tests that import it run after the change and any that moves is REPORTED).
What changed since: the needle such an end makes beside a width-less edge (step 3's 173 cm × 4 cm) is still kerb by the
definition, and R and the lay omit it (it is thinner than `attractCm`); the contract text says so (6.2). S20 met no
frame-side end at CITY [S20: T3]; the literal pin and S18's 15 networks of row 181 judged, as the draft's line 7.

**Q152's six (J742 R-C).** Re-judged once in this round, on the served path as it now is: the bands folder's served
values are the lay's (`kerb()`) or S9's commit of R(X) (`corridorUnion`, `bandUnion`). The two-sided check (BARS-14) of
each re-pin judges the region between the old and new value by the definition oracle; a difference lying wholly in
pieces thinner than `attractCm` where the old and new values both differ from X is listed UNJUDGED-THIN (R-17), never
re-pinned silently. Group B's cause comes from M0-a-05 S14's verdict. They leave the declared red set at the landing or
the round fails.

**The oracle (R-7).** The definition oracle judges X (S20's runner, arena form, J785's local arbitration), its
half-widths and ends from the run's own width table (the bench's `widthMap(d)`), never from the read; a stated sample of
CITY keys (every face under 2 000 m², at most 300 keys a seed) judged at the uncapped 20 cm grid. Two relations beside
it: R(X) against X and the lay against X — every piece of the difference thinner than `attractCm` (the P1 test), necks
listed.

**`offRead` (R-3, R-4, S-11).** Retired. Under P′ + R S9's own reads (`readOn` → `readKerb`) are R(X): a function of
F's level ≤ 1 record (and, at L3, of levels < 3: section 5) that an L2 op cannot change, so the re-read after an L2 run
equals the first read and the run vertex `far` (chosen by `runVertex` on that same outline) is on it by construction.
What holds in its place: a pin that in an L2 batch every face's re-read after the op equals its first read (key, R(X),
splits); `closeEnds`' outcomes (chord / along / pinned / folded / retry, with their causes) and the splits not drawn
(`onOutline` gate, :703-705; R-18) REPORTED; the review's replacement fixture for the draft's line 6 (ii) (an open
piece whose end the door places 1 – 26 cm off its contact; R-4). The lay depends on L2 content, but `offRead` never read
the lay.

**The memo (S-14).** None. A memo of the lay is unsound (it depends on L2 content and on the batch); a memo of X or R(X)
by S18's key is sound but saves little (the key is 52 % of X, step 6; S8 repeats a key on about 4 % of its reads, draft
F0-1 (b)). The hit rates by caller are REPORTED.

**The cost, REPORTED** (J558 (2): a cloud box's timing is informative): ms a read split into X, R and the lay; the lay's
insertChain and its work units a read; S8 ms a cut; source mode and the prod bundle (plain), S8's count window; GC
share; base → tree. 986 (e) (1) and (2) quoted, never a bar.

---

## 8. (A7) ONE ROUND OR LEGS, THE ORDER, THE SCOPE

**Recommendation: ONE round on M0-a-09 (S21), with session seams**, if K2 is ruled (section 3.2) and the measured red
list stays under R-11's threshold (10 files or 3 owners outside the folder) [MEASURE: red list]. With K1 the round is a
merged round: leg 1 M0-a-06 (the minted dry view in tx/state.ts, its pins in kernel/test/tx/, the frame-class tag in
support.ts — NO-SHIFT, may land alone), leg 2 M0-a-09. No leg on M0-a-05: R is the remedy, the door is unchanged.

**The order of the lines** (each needs the ones before it): 1 the fold (W2; its pin on the fold alone) → 2 R → 3 the
lay's kernel form → 4 the served reads switched (`readKerb` = R(X), `kerb()` = the lay; derived.test.ts's construction
reads re-pointed to `constructionRead`, R-2) → 5 the construction debug-only and the control → 6 the shadow → 7 X's
typed refusals → 8 S9's commit and `offRead` → 9 the L2 dependence → 10 the L3 read → 11 the end rule → 12 the bands
folder, Q152's six and B-FUZZ's kerb row → 13 the declared shift, its control and the measured list → 14 the CITY and
B-FUZZ bars → 15 the cost.

**The cross-item scope** (none built by a seat; each the session's seam in the landing commit, or a leg where marked):

| file | owner | change | seam or leg |
|---|---|---|---|
| plat/tools/lint/kernel-boundary.allow.json | M0-d-07 | the rows of 3.5: kerbExact.ts's two removed; kerb.ts `band` string 1 added; bandUnion.ts `band` ident 29, `kerb` string 7, `block` ident 6 raised, `kerb` ident 13 lowered; kerb.ts `kerb` ident lowered to the lint's count | seam (a boundary change: the session's, with a choices.md row) |
| plat/docs/build/M0-work.json | the session (`session-m0-work`) | the kerbExact.ts owns line removed (W2) | seam (J744 (3)'s form) |
| plat/packages/kernel/test/tx/support.ts | M0-a-06 | the frame classifier (:383-386) also classes a frame whose stack holds the lay's function as 'dry-run' | seam (one test-side predicate, no assertion) — or leg 1 under K1 |
| plat/packages/kernel/test/tx/savepoint.test.ts, cost.test.ts, oracle.test.ts | M0-a-06 | none expected under P′ (the lay is their generator) | [MEASURE: red list]; if red, a seam re-pointing nothing — the cause is reported first |
| plat/packages/kernel/src/tx/state.ts (+ its pins) | M0-a-06 | only under K1: the minted dry view | leg 1 |
| plat/bench/src/fusion/measure.ts, bench/test/fusion/hausdorff.test.ts | M0-c-06 | none: the floor 0.95 stands; the round's runner lives in scratch and kernel/test/arr/bands/ | — |
| other items' kerb-derived literals (fabric seeds, signature, drift fixtures, rungs, …) | as the measured list names them | re-recorded, each with the two-sided check (R-11) | seams if the list is short; per-owner legs past 10 files or 3 owners [MEASURE: red list] |
| docs/ARCHITECTURE.md §3.4, §3.7, §4.6, §13.2; the new amendment file | the session | 6.1 – 6.2 | at the landing; the owner's veto |
| docs/M0-FIX-QUEUE.md | the session | the M1 rows: the seam order (section 4 (iii)); the face-local read-back (F1-6); A4's design if (b) is ruled | at the binding |

---

## 9. Open questions (each with options and a recommendation)

* **A1.1 — R's definition.** C1 opening / C2 station clip / C3 rule (b) made precise / C4 snap / R = fixpoint(S, P1,
  P2). **Recommend R**, confirmed by the measurement (section 11).
* **A1.2 — P1's thinness test.** Exact erosion by `attractCm`/2 with §3.7's buffers (recommended) / 2A/P < `attractCm`
  as the prototype. The measurement reports the components the two tests disagree on and whether any sits in a refused
  network.
* **A1.3 — P2 on hole rings and P1 on holes.** Symmetric (recommended: the door folds thin cracks of band as it folds
  thin tips of kerb) / outer rings only.
* **A2.1 — the transaction of the lay.** K2, an unminted OpenTx-shaped view in bandUnion.ts (recommended: no leg, the
  engine unchanged) / K1, a minted view in tx/ (a leg on M0-a-06).
* **A2.2 — `kerb()`'s warnings.** The lay's (recommended, as the construction returned its shell's) / `[]`.
* **A2.3 — the boundary rows.** Accept one new row and three raises by one (recommended) / restructure to avoid them.
* **A3.1 — the M1 seam order.** A queue row now (recommended) / declared in the contract text.
* **A4.1 — the L3 read.** (a) R's boundary set includes the coarser content inside F at a read of level ≥ 3
  (recommended if measured clean) / (b) declared, M1's.
* **A6.1 — the S8 ≡ S9 share bar.** Not below the base's on any seed, FAILING (the session's proposal; measured
  margins 0.009 – 0.022 above the base at every measured seed) / ≥ 0.95 FAILING and ≥ base REPORTED (the reviewer's
  caution: a correct build can lose one block to the base on an unmeasured seed). **Recommend the session's**, on the
  four test-size and two CITY seeds named, with any other seed REPORTED.
* **A6.2 — the B-FUZZ bar.** Networks and per operation FAILING, classes REPORTED (recommended, F1-1) / class by class
  FAILING (fails rule (b)'s own figures).
* **A7.1 — one round or legs.** One round with seams under K2 (recommended) / legs under K1 or a long red list.
* **A7.2 — the round number.** S21, re-keyed at render if S20 takes a fix round (render.mjs).

---

## 10. Every review finding answered

| finding | answer |
|---|---|
| R-1 (constructionRead's census) | line 5: an internal option leaves the census unset when the observer calls it; the shadow's `done` is handed the overlay (rulings-after-review) |
| R-2 (derived.test.ts) | line 1: the fold's pin on the fold alone; line 4 re-points derived.test.ts's construction reads to `constructionRead` |
| R-3, R-4, S-11 (`offRead`) | retired, line 8, section 7 |
| R-5, R-6, S-5 (plan ≠ commit; the contract) | P refused; P′ restores the share; the contract text and the owner's paragraph, section 6 |
| R-7 (oracle widths) | section 7; line 14 (a) |
| R-8, R-9, S-12 (sub-resolution geometry; GEO-9) | R (section 1); GEO-9's exception and the omitted needles in §3.7's text (6.2) |
| R-10 (the cost bar) | line 14 (h): the zero-call half FAILING; the rest REPORTED |
| R-11 (re-pins outside the folder) | line 13; section 8; [MEASURE: red list] |
| R-12 (`readOn` in the bundle pin) | line 5: functions named by a file-resolving probe (S20's bundle method) |
| R-13 (the control's mutant) | line 13: the mutant in shared code (a junction's reach changed by 1 cm in `junctionsOf`) |
| R-14 (X's checks) | line 7: a test-only plant; every `check` reachable from X or R listed and typed or justified |
| R-15 (build order) | the fold first (section 8) |
| R-16 (the end rule's pin) | line 11: which property; the 3 retracing networks dropped; the literal hand-computed |
| R-17 (re-pins thinner than the grid) | line 12: UNJUDGED and UNJUDGED-THIN listed |
| R-18 (undrawn splits) | line 8 REPORTED |
| R-19 (X ≠ X_U) | answered by step 5 (needles; X right to the lattice, wrong by ≤ 0.94 cm at witnesses); no line needed beyond line 14's oracle |
| R-20 (`reaches`, `coveredBy`) | a module-comment note (line 1) |
| R-21 (token discipline) | section 3.5; line 1 and line 3 |
| S-1 (blocker: the commit's refusals) | R, section 1; the measurement request; the B-FUZZ bar (line 14) |
| S-2 (`whole` read-back) | section 3.3; line 3 pin |
| S-3 (unowned face) | placeholder entity, section 3.3; line 3 pin |
| S-4 (nothing left behind) | K2 and the table of 3.4; line 3 pins and line 14 (g) |
| S-6 (L2 dependence) | section 4; line 9 |
| S-7 (refusals both directions) | section 4; line 14 (f) and REPORTED lists |
| S-8 (a wrong read-back) | line 14 (c) the lay against X; line 3's pin that every returned ring is a block face of the lay or F |
| S-9 (X twice) | the engine's `reads` option; line 3's count pin (one X a `kerb()`) |
| S-10 (the boundary and the cycle) | section 3.1, 3.5; line 3's bundle pin that a production S8 calls the lay |
| S-13 (necks; seedless parts) | REPORTED (line 14) |
| S-14 (memo) | none; section 7 |
| review A (X is the definition's value) | stands; the oracle on X (line 14 (a)) |
| review B (P's callers) | the callers table of the first draft (F0-3) stands, with `kerb()` now the lay and `readKerb` R(X) |
| review C, review-2 C (contract) | section 6 |
| review D, review-2 D (lines) | section 8's line list; the spec |
| review E, review-2 E (measurement doubts) | B-FUZZ under P′ measured (step 9); lay on an L2-holding arena: line 9; slot-renumbered lay: line 9 (ii); the 2 + 1 residual CITY blocks: REPORTED one by one in line 14 |
| review-2 B (the kernel form) | section 3 (K2 recommended; K1 the fallback) |

The first draft's findings: F0-1 (figures read from the wrong column) and F0-2 (untimed parts) stand as cost notes
(line 15 measures them); F0-3 stands with the changes above; F0-4 (GEO-9) → 6.2; F0-5 (986 (e) (3)) → 6.1 (b); F0-6
(S9's commit never run) — measured (steps 3, 4, 9); F0-7 (single-read tests move) — P′'s list [MEASURE: red list];
F0-8 (B-FUZZ) — measured (step 9) and the request; F0-9 (oracle coarse) → line 14 (a)'s 20 cm sample; F0-10 → step 5;
F0-11 — withdrawn (rulings-after-measurement ruling 1); F0-12 → 3.5; F0-13 → A7.2. The draft's sections (3) and (6)
survive as section 7 and section 8; its section (4)'s grep list is superseded by the measured list.

---

## 11. MEASUREMENT REQUEST

For the measurement seat, self-contained. Mirrors: P+R = `probeR` with `resolutionRule` replaced by R below (the rule in
`readKerb`, so S9 commits R(X)); P′+R = the lay-planned mirror with its `readKerb` using R (the lay then lays R(X) and S9
commits it), with the lay's read handed to `bandCore` (no second X) and its `whole` / simple-loop read-back as step 9's
second run. Seed 20261112, PR size (10 000 main + 2 000 widened) for B-FUZZ; CITY fusion 3 and integrated 4; the four
test-size seeds. One process at a time, under `nice`.

The rule, exactly (A = 26, lattice integers, exact predicates):

```
R(X, B):                            # X: exactRegionOfKey's rings (outer ccw, holes cw); B: f.rings (F's L1 route rings)
  loop:
    changed = false
    # S: snap, vertices in lattice order (y, x)
    for q in vertices(X) sorted by (q.y, q.x, ring, index):
      if any edge e of B: withinSegment(q, e, 1): continue
      cand = [b for b in vertices(B) if dist2(q, b) <= A*A]
      if cand: t = min(cand, key=(dist2(q,b), b.y, b.x))
      else:
        es = [e for e in edges(B) if withinSegment(q, e, A)]
        if not es: continue
        e = min(es, key=(exact distance² of q to e, e's lattice order)); t = snap(foot of q on e)   # half away
      move q to t; remove a vertex equal to its predecessor in its ring
      if its ring is not simple (ringSimple) or crosses another ring (segments meeting off shared vertices)
         or its area2 changed sign: undo the move
      elif the ring's area2 == 0: drop the ring; changed = true
      else: changed = true
    # P1: thin components and thin holes
    for each component C (an outer ring with the holes whose first vertex it winds round):
      if area2(C) <= (A + 1) * perimeter(C) and
         exactRegion(rings(C), bufferParts(each ring of C closed, A / 2, round joins)) == []:
        remove C (its holes too); changed = true
    for each hole H of a kept component:
      if |area2(H)| <= (A + 1) * perimeter(H) and exactRegion([reverse(H)], bufferParts(H closed, A / 2, round)) == []:
        remove H; changed = true
    # P2: spike tips, rings of >= 4 vertices
    for v in vertices(X) sorted by (v.y, v.x, ring, index)   (re-read after each drop):
      a, b = v's neighbours in its ring
      if dist2(a, b) < A*A and abs(orient2d(a, b, v)) > dist2(a, b)
         and no other vertex of any ring lies in the closed triangle (a, v, b):
        drop v; changed = true
    if not changed: break
  return [canonicalRing(r) for r in rings if len(r) >= 3 and area2(r) != 0] sorted by compareRings
```

(The L3 variant M3: at a read whose batch level n ≥ 3, B also holds every edge of levels 2 … n−1 whose both ends lie on
or inside F's rings.)

Runs and figures:
* **M1 (P+R, B-FUZZ):** the census lines; the networks refused, each with operation and cause, joined with BASE's and
  rule (b)'s (the refused-network sets and their differences — the bar is "no network BASE commits is refused");
  refusals per operation and family against BASE; RING_CROSSES / own refusals; per read: R's step counts (vertices
  snapped, components and holes removed by P1, vertices dropped by P2, passes), the components rule (b)'s 2A/P removes
  and P1 keeps (and whether any lies in a refused network); R idempotent on every read (R(R(X)) = R(X)), start- and
  direction-free on a 1 % sample (rings rotated and reversed); every component of X Δ R(X) with an empty erosion by
  A/2 (count the exceptions; dissect any).
* **M2 (P′+R, B-FUZZ):** as M1, plus the kerb row (lay refusals) and the lists of section 4: faces whose lone lay
  refuses while the district's commit succeeds, and commits refused where every lone lay succeeds.
* **M3 (the L3 variant):** the network `{a 3698, b 7999, hw 22}, {a 11642, b 5116, hw 596, knots [597, 596]}, {a 14212,
  b 42, hw 26}` and the whole B-FUZZ main family under M3: committed or not, and the census against M2.
* **M4 (P′+R, CITY fusion 3 and integrated 4; the four test-size seeds):** S8 ≡ S9 exact share, `beyond`, max cm, the
  non-exact blocks each with its cause; lay reads refused; S8's kerb-caused 'unresolved' rungs; the lay against X and
  R(X) against X (every difference piece thinner than A: count the exceptions, necks listed); L2 records within A of a
  lay at S8 time (expected 0); ms a read split into X, R and the lay; insertChain and the lay's work units a read; S8 ms
  a cut; S8's cuts and blocks against BASE.
* **M5 (the red list):** the whole suite under P′+R (the remaining chunks of results/step2/L, re-run with R), red files
  by owner and class.
