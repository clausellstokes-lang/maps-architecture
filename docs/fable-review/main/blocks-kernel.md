# Blocks — lane fable-review/main/kernel (Fable reviewer, 2026-09-27)

Text before the first "=== " line is ignored by the assembler. Each REPLACE block below is the complete current subsection of
docs/ARCHITECTURE.md (sha256 1c23190f…) with the changes docs/fable-review/main/kernel.md rules applied by script
(scratch make_blocks.py: every replaced passage asserted to occur exactly once; every other line carried over verbatim).
Every block is closed with "=== END ===" as soon as it is written (kill-safe). The J-ROWS and RATIONALE-A blocks at the
end carry the two rulings J-Fkernel-1 and J-Fkernel-2.

=== REPLACE ### 3.1 Build-versus-adopt, per primitive ===

### 3.1 Build-versus-adopt, per primitive

| primitive | decision | candidate (licence) | degenerate input; where specified |
|---|---|---|---|
| lattice, snapping, attraction | **build** | — | §3.2 (numeric policy), §3.6 (insertion, contact and move semantics) |
| exact predicates | **build** `orient2d` (exact in doubles under §3.2 (1)); **adopt** `incircle` (J-K36) | `robust-predicates` **3.0.3, Unlicense** — licence confirmed against the public registry (`docs/validation/redteam-improve.md` §5.1), version pinned and re-checked by §17.4's licence checker on every upgrade; *pre-decided fallback* if a future version fails the checker: an in-house BigInt `incircle` (exact, slower) | `incircle` is the adaptive predicate and is never on the topology path; ties and float rules §3.2 (3), orientation and areas §3.2 (6) |
| planar subdivision (§2.2) | **build** — the core asset: **struct-of-arrays, allocation-free hot loops** (G-R7: NG's measured profile is dominated by point allocation, 385–561 k calls per generation, and line intersection, 147–213 k) | — | transactions §3.3, insertion and slivers §3.6, storage §3.9, invariants §3.10 |
| polygon booleans; buffers, offsets, insets and bands | **build on the kernel's arrangement** (§3.7; J-K4) | Clipper2 (BSL-1.0) and `polygon-clipping` (MIT): CI oracles, shipped only under §3.7's fallback | §3.7 |
| straight skeleton | **build** (§3.8; J-K5, J-A21.31) | none adopted: no permissive, mature JS/TS skeleton that could be held to §3.8's numeric contract is known to this design; CGAL's is GPL (the rest of CGAL LGPL), which §17.4's permissive-only production closure excludes (the module's licence stays the owner's, §17.3), and it fails the stack and one-engine grounds besides — a C++ library is not the TypeScript kernel every host runs (D-4; no WASM kernel, §3.7) and its doubles could not be made byte-identical to §3.8's validated construction | §3.8 |
| OBB, convex hull, largest inscribed rectangle | **build**: monotone chain + rotating calipers; LIR sampled deterministically over four candidate axes — OBB long axis, frontage normal, ± 45° (G-R13) | — | **one contract (GEO-7):** fewer than 3 distinct points or a collinear hull returns `E_DEGENERATE` (detail `collinear`), never `ok` with a zero extent, so no caller can divide by a zero minor axis; callers branch on the typed result |
| Delaunay / Voronoi | **adopt** | `delaunator` (ISC), `d3-delaunay` (ISC) | duplicate points merged first; used only for site sampling, Lloyd relaxation, field seeds and medial axes — never as the street source (S4's routing lattice is `hexLattice`, §3.4) |
| Poisson-disc / blue noise | **build**: Bridson with **k = 50 candidates, all evaluated** (the references' measured variant, `_critic.md` C2; G-P17), run at product build time to make §8.10's stamp tiles; per-instance placement: §8.1 (2), §8.10 | — | domain clipped to any polygon with holes; an empty domain returns empty; **a ragged wood edge comes from thinning the stamped points by the domain-warped density noise (§4.9), never from warping the sampler** (COV-VG-WC3) |
| noise (fBm, domain warp, ridged) | **adopt + build** | `simplex-noise` (MIT); seeding, fBm and warp ours | seeded from sub-streams (§6.1); octaves and lacunarity are table values (VG's 5-octave field, `_critic-vg-ng.md` V7) |
| curves: Chaikin, centripetal Catmull-Rom → cubic, pinned-vertex Laplacian, Visvalingam–Whyatt, circular fillets | **build** | — | results re-enter through `insertChain`; smoothing committed geometry is a `warp` (§3.4, §3.6); Visvalingam–Whyatt is the topology-preserving `simplify` (§3.4); fillets are skipped when a leg is shorter than the chord |
| spatial index | **adopt + build** | `flatbush` (ISC) static partitions and a uniform grid per level (§3.3); `rbush` (MIT) only for the screen-space label collision index (§9) | §3.3 |
| marching squares / distance transform | **adopt / build** | `d3-contour` (ISC) or our own | linear time; VG's `createDeflection` hot spot avoided by construction; contours are extracted per render tile, not in S1, and are never plat edges (§2.3, §8) |
| path search | **build**: binary-heap A\* / Dijkstra on rasters and on the subdivision graph (the 2017 "A\*" is a FIFO BFS, not reproduced) | — | `E_NO_PATH` with the closest reached point |
| triangulation (render, fields) | **adopt** | `earcut` (ISC) | holes supported; degenerate triangles skipped and reported |
| deterministic math | **build** `dmath` (§6.5 (2); J-11) | — | a division by a computed value goes through `ratio()` (§3.2 (8)) |
| RNG and hashing | **build** (§6.1) | — | — |

Every primitive returns a **typed result** and never throws for a geometric reason:

```ts
type KernelResult<T> = { ok: true; value: T; warnings: Warning[] } | { ok: false; code: KernelError; detail: string; partial?: T };
type KernelError =
  | 'E_OUT_OF_RANGE'       // snap(): non-finite, or |coordinate| ≥ 2^23 cm — a caller bug, reported with its stream key, never stored (§3.2 (7))
  | 'E_DEGENERATE'         // ratio() with a vanishing denominator; OBB / hull of collinear or < 3 distinct points; an empty or collapsed boolean, buffer or inset; a StretchRef whose ends are not two distinct vertices of one part of its chain (detail 'stretch', §3.4); a transient arena's seed or fixed ring that would break minEdge, clearance or simplicity, or input rings that overlap, or a seed clip's piece left with a hole (detail 'seed', 'fixed' or 'overlap', §3.4)
  | 'E_LEVEL'              // a batch wrote a level other than its own, added a row coarser than the edge or vertex it lands on, or — in a clear-region batch — met finer geometry inside its region away from its prepared contacts (§3.3)
  | 'E_LOCKED'             // the op would cut, move or delete geometry owned by a locked or pinned entity — returned to the dry run as a conflict (§7.1)
  | 'E_KEPT'               // an insertion or clear would cross, clear or come within attractCm of kept content (§3.3) — a stage-domain bug in generation, a conflict in an edit's dry run
  | 'E_SCOPE'              // a pool district overlay wrote outside its district's scope, or two overlays touched one record (§3.3)
  | 'E_STRUCTURAL'         // a merge or removal would delete an edge carrying a structural role (§2.2 rule 7) or a transient arena's fixed edge (§3.4)
  | 'E_NOT_TWO_CROSSINGS'  // splitFace contact semantics violated (§3.6)
  | 'E_HOLE_CONTACT'       // connectHole post-condition violated (§3.6)
  | 'E_SELF_INTERSECT'     // a ring whose role requires a simple polygon (a claim, a drawn boundary) crosses itself
  | 'E_BELOW_MIN_EDGE'     // optional chains only; its two triggers are §3.6's
  | 'E_BELOW_MIN_ANGLE'    // optional chains only: a face corner below minFaceAngle (§3.6)
  | 'E_BELOW_MIN_AREA' | 'E_BELOW_MIN_WIDTH'   // a class floor declared by the caller
  | 'E_NON_CONVEX'         // the half-plane inset path was asked for a non-convex face (§3.7)
  | 'E_NO_PATH'
  | 'E_WORK_LIMIT'         // an operation-count budget was exhausted — counted in operations, never measured by a clock (§3.3)
  | 'E_INVARIANT';         // a declared hard invariant failed at commit (§3.10)
type Warning = { code: 'W_ATTRACTED'|'W_STRETCH_SHARED'|'W_WEDGE_ROUTED'|'W_PLACED'|'W_PROMOTED'|'W_SNAP_PASSES'|'W_ACUTE_CORNER'|'W_SLIVER_RETYPED'|'W_STEINER'|'W_HEIGHT_CLAMPED'|'W_DOWNGRADE';
  count: number; at?: LatticePoint };   // W_PLACED: §3.6's placement rule; W_PROMOTED: a finer vertex promoted (§2.2 rule 3) — prepared vertices and stretch ends included
```

=== END ===

=== REPLACE ### 3.2 Numeric policy ===

### 3.2 Numeric policy

```ts
interface Frame { widthCm: Cm; heightCm: Cm; aspect: number /* width / height, 0.5–2 */; marginShare: 0.3 /* context margin per side */ }
```

1. **Integer world and range.** All persisted geometry is integer cm. Intermediate rational points (crossings, offsets,
   circumcentres, skeleton nodes) are computed in doubles and immediately placed on the lattice — by §3.6's placement
   rule for points on existing edges, by nearest-point rounding otherwise. **The range invariant is `|x|, |y| < 2²³` cm
   (83.9 km)**, enforced by `snap` (7): every coordinate difference is then < 2²⁴, every `orient2d` term < 2⁴⁸ and the
   determinant < 2⁴⁹, so the sign of `orient2d` is exact in ordinary doubles. The largest arena is METROPOLIS at the
   population cap of 120 000 (§12.2: 153.6 km²) at aspect 2 — 17.53 km × 8.76 km plus the 30 % margin on every side, so
   |x| ≤ 0.8 × 17.53 km ≈ 1 402 000 cm ≈ 2^20.4 — which leaves ≈ 6× headroom (≈ 9× at the METROPOLIS target: 11.31 km ×
   5.66 km at aspect 2, |x| ≤ 905 097 cm ≈ 2^19.8). Every exactness argument below rests on the range invariant, never
   on the frame table, so a rescaled frame (§13.7 O14 (e)) cannot break one.
2. **Tolerances are world lengths, never parameter-space** (the OS `DELTA = 1e-6` on line parameters is the
   anti-pattern). The lattice values (§2.2 `LatticeSpec` names the fields): `minEdge = 25 cm`; `attractCm = 26 cm` —
   `minEdge` plus 1 cm of lattice slack, so a vertex split onto an edge lies at least `minEdge` from both of the edge's
   endpoints — `attractCm` − 0.71 cm = 25.29 cm where the nearest lattice point qualifies, and never less than `minEdge`
   where the placement rule's (ii) seats it a few centimetres along the edge instead (§3.6); a vertex whose exact foot
   lies within `attractCm` of an endpoint moves onto that endpoint instead (§3.6 step 2);
   `minFaceAngle = 5°` (500 centidegrees; hard or soft by chain class, §3.10); the range
   2²³ cm of (1). The class floors come from the stage tables: `minPlotWidth = 2.5 m`, `minInteriorAnglePlot = 12°`
   (FTG's sheared quads at p95 22.9° corner deviation stay legal — invariants police validity, not regularity),
   `minCorridor` per class. **Face-size floors are a minimum width and a minimum area, angle floors are angles, and none
   is `minEdge`.** **One minimum-edge rule for every writer (GEO-35):** `insertChain`, booleans, buffers, offsets,
   smoothing and `warp` create or move edges only through §3.6's insertion semantics or move validation, and §3.10
   checks the same `minEdge` on new *and moved* edges. There is no weld tolerance: coincidence is lattice-point
   equality, proximity is attraction (§3.6; J-K2).
3. **No float comparisons for topology.** Equality is index equality; "same place" is a lattice test; collinear and
   cocircular ties are broken deterministically on lattice positions, never on slot ids, and no predicate compares a
   float with `== 0`. Any float that decides a topology operation is quantised to integer cm or to a 16-bit binary
   angle first. A distance comparison against `attractCm` or `minEdge` on a computed point (an exact foot, a crossing)
   uses + − × ÷ √ only, so every IEEE engine gives the same answer; a borderline case may fall either way without
   breaking any bound, because the 1 cm between `attractCm` and `minEdge` exceeds the 0.71 cm of any single rounding.
4. **Cross-platform reproducibility** is §6.5's policy (integer-derived random floats §6.1; the nightly
   cross-platform golden run §13.3). The kernel's part: integer geometry, exact predicates, one geometry engine on every
   host (§3.7) and a deterministic op order in every batch (§3.3).
5. **Angles and directions** are unit vectors in doubles derived from integer endpoints; growth headings are stored as
   centidegrees.
6. **Exact areas and orientation (GEO-32; J-K13).** `area2(ring)` returns twice the signed area as an exact
   integer for **every ring `snap` can produce**: each shoelace term `xᵢ·yᵢ₊₁ − xᵢ₊₁·yᵢ` is taken on coordinates
   relative to the ring's bounding-box minimum corner, which lie in [0, 2²⁴) by the range invariant, so each product is
   an exact double below 2⁴⁸ and |term| < 2⁴⁸; terms are summed in a double partial that is flushed into a BigInt accumulator
   whenever its magnitude reaches 2⁵² (one comparison per term), so every partial stays below 2⁵² + 2⁴⁸ < 2⁵³ and every
   addition is exact. Faces at the frame table's sizes never reach the flush (their terms are < 2⁴³). The value is
   returned as an exact double, because a simple ring's twice-area is below 2⁴⁹ (every face ring is simple, §3.10); a
   self-crossing ring — only a boolean operand before its overlay can be one — has `area2Big`, which returns the BigInt.
   Receipt: three star rings of radius 2²³ − 2 whose terms all share one sign are exact
   (`docs/validation/bench/fixall_kernel_r2_attract.out` E). Ring orientation is `orient2d` at the ring's
   lowest-leftmost vertex; no orientation, sliver or degeneracy decision reads the sign of a float sum; area statistics
   in m² are derived from the exact integer.
7. **The finite and range check lives at the one door (GEO-7).** `snap(x, y)` is the only way a number becomes an arena
   coordinate, and in every build — not only in debug — it rejects `!(Math.abs(v) < 2**23)`, one comparison per
   coordinate that also catches NaN and ±∞, with `E_OUT_OF_RANGE`. NaN, ±∞ and values past 2³¹ therefore never reach an
   `Int32Array`, which would store them silently as 0, 0 and a wrapped value (executed in GEO-7), so the null-`rect`
   crash class cannot return as a vertex at the world origin. (Height and depth rasters have their own check, §2.3.)
8. **Checked ratios.** In model packages a division by a computed value goes through `ratio(num, den, kind)`, which
   returns `E_DEGENERATE` when |den| is below the quantity's floor (length 1 cm, area 1 cm², angle 1 centidegree, count
   1); a lint rule flags every other division whose divisor is not a non-zero literal.
9. **Frames are rectangles (COV-VG-VN-156).** A rung declares its frame *area* at its target population,
   A_target = `frameAreaKm2AtTarget` (§1.1) — TOWN 4 km², CITY 25 km², METROPOLIS 64 km² (squares of 2, 5 and 8 km at
   the default aspect) — scaled within the band by the requested population, A = A_target · population ÷ target (the
   side with its square root; item 9; the cap figures: §12.2); the blueprint's `aspect` ∈ [0.5, 2] (default 1) gives
   `width = √(A · aspect)` and `height = √(A / aspect)`, centred on (0, 0) with `+y` north; the arena spans the frame
   plus `marginShare` on every side, and every raster's `cols × rows` follows width × height. The range bound of (1) is
   taken at the population cap and the extreme aspect, so a non-square town — the shape a village product and many river
   and coast towns want — needs no other change. The arena's outer ring and the frame rectangle are the `margin` and
   `border` chains of §2.2 rule 1.

=== END ===

=== REPLACE ### 3.5 Why this kernel closes the creators' failure classes ===

### 3.5 Why this kernel closes the creators' failure classes

| creator-admitted failure (via `docs/IMPROVEMENTS.md` O3 and the critics) | kernel answer |
|---|---|
| collapsed / intersecting edges on concave shapes (MFCG 87882877) | snap rounding, attraction and the clearance invariant; cuts are `splitFace` transactions with stated contact semantics, validated before commit (§3.6, §3.10) |
| a silent no-op when the face cut finds other than two crossings, and unbounded recursion (`os-model.md` §13.4) | `E_NOT_TWO_CROSSINGS` under exact contact rules — vertex grazes, overlaps and antennae defined, slits are `connectHole` (§3.6); recursion bounded by the class band and a depth cap, every rejection logged (§4.6) |
| the null-OBB / null-rectangle crash (61026228) | one OBB contract (§3.1); `snap` rejects NaN, ±∞ and out-of-range values in every build; computed divisors go through `ratio()` (§3.2 (7)–(8)) |
| "two intersections with the same world position" (FTG 153121107) | exactly one vertex per lattice point; points within `attractCm` (26 cm) of a vertex or an edge are attracted onto it; near-coincident stretches are one shared edge with merged roles (§3.6) |
| stale graph state after edits breaking district re-roll (FTG 153121107) | no record outside the kernel stores an arena slot (§2.2 rule 5) |
| hourglass / sliver footprints (FTG 133016301) | the invariant suite — simple faces, clearance, class floors in width and area (§3.10); frontage-first construction (§4.7); sliver absorption that never deletes a street, wall or shore edge (§3.6) |
| self-intersecting user strokes breaking the server (FTG 2026-03) | `insertChain` decimates to `minEdge`, splits self-touching input into simple runs and validates at the authoring boundary (§3.6) |
| "Alternative cut" / "Trying again" loops of unknown cap (NG RA-3) | the bent cut's declared ladder (§4.6 (8)), each rung under an operation-count work limit (§3.3) |
| boolean "thorns" (VG 50688261) | booleans and buffers on the kernel's own arrangement, under the same attraction, `minEdge` and clearance as every chain, with no re-snap round trip (§3.7) |
| "weird steps" of per-edge buffers and "not so much concave ones" for shrinking (2017 author, `os-geometry.md` §2.1.4) | one kerb function, committed by `corridorUnion`; the half-plane inset only for uniform convex insets (§3.7) |
| skeleton "glitches in special cases" (MFCG 101173551) | a stated numeric contract, exact OBB roofs for convex near-rectangles, a validator on every output and typed downgrades (§3.8) |
| identity-keyed topology, un-serialisable state (OS §1.1) | indexed arenas; one arena per layer serialised once (§3.9) |
| NG's point-allocation and line-intersection hot spot | a struct-of-arrays kernel with allocation-free intersection and orientation routines (§3.1), measured in M0 |

=== END ===

=== REPLACE ### 3.6 Insertion, contact and move semantics — attraction instead of a weld dead band ===

### 3.6 Insertion, contact and move semantics — attraction instead of a weld dead band

**Attraction (GEO-3; J-K2).** `insertChain` processes each chain of a batch in the batch's order —
canonical for a declared op set, issue order in a callback-form stage (§3.3) — in five steps. Its **candidates** are:
(a) the vertices and edges of level ≤ the batch's level; (b) the **finer vertices lying on those edges' routes** where
the chain ends on or joins such a route (a neighbour's plot-line end on the kerb where II.1 (3)'s neighbour step lands
its `corridor_split` edge, a close-up's kept fabric beside a new junction); (c) **in a batch that declares a clear
region, its prepared vertices** (`KernelTx.prepared`, §3.3 rules 2–3). Nothing finer is a candidate. A finer vertex of
(b) or (c) that a chain vertex lands on, or that a chain segment is routed through, is promoted to the batch's level
(§2.2 rule 3; `W_PROMOTED`, listed in the commit record), its finer edges kept. A (c) promotion clears the vertex's
`split` flag, because it is a vertex of the new coarse chain from then on, and strips an `anchor` contact name, whose
work is done; a (b) promotion keeps the flag, because the vertex still lies on the edge it split, and removing the
promoting chain later returns it to its level by demotion (§2.2 rule 3; J-K28). A clear-region batch never shares a
finer edge (§3.3 rule 2). Kept geometry, and inside a clear region every finer vertex and edge other than the prepared
contacts, is an obstacle: a chain that would cross it or come within `attractCm` of it returns `E_KEPT` or `E_LEVEL`
(§3.3). A chain is inserted run by run, and the part of it already inserted counts as existing geometry for its later
parts, so a chain that doubles back near itself attracts onto itself like onto any other edge.

1. *Snap and decimate.* Every point passes `snap` (§3.2 (7)). Consecutive points closer than `minEdge` are decimated —
   the later one is dropped unless its index is in `opts.pinned` or it is a knot (§3.4); two such points closer than
   `minEdge` merge at the first, reported, and a merged knot vertex carries both ordinals (a step in its profile). A
   chain that touches or crosses itself is split into simple runs.
2. *Vertex attraction.* A chain vertex within `attractCm` of an existing vertex moves onto it (nearest; ties to the
   smaller lattice position, y then x). Otherwise, within `attractCm` of an existing edge (the nearest; ties by the
   edges' canonical keys, §3.3), take the exact foot of the vertex on that edge: **if the foot lies within `attractCm`
   of one of the edge's endpoints, the vertex moves onto that endpoint** (the nearer; ties y then x), because a split
   there would leave a sub-edge shorter than `minEdge`; otherwise it moves onto the edge at the foot's placement point
   (below) by `splitThrough` — a Steiner vertex if the edge is coarser. Example: a vertex at (20, 20) beside the edge
   (0, 0)–(1 000, 0) is 28.3 cm from (0, 0), so not vertex-attracted, and 20 cm from the edge; its foot (20, 0) lies
   20 cm from (0, 0), so the vertex moves onto (0, 0) instead of splitting off a 20 cm edge. Chain vertices that
   attraction brings within `minEdge` of each other merge, the later into the earlier, as in step 1.
3. *Segment and stretch attraction.* A chain segment that passes within `attractCm` of an existing vertex is routed
   through it. Where a segment runs within `attractCm` of an existing edge over a stretch — a near-parallel approach, or
   a crossing shallower than `minFaceAngle` — the stretch is shared: the chain joins the edge where the stretch begins,
   follows it and leaves where it ends, and the shared edges gain the chain's roles (`W_STRETCH_SHARED`). A join or
   leave point whose exact position lies within `attractCm` of an endpoint of the edge it joins moves onto that
   endpoint, as in step 2; any other join or leave point is placed by the placement rule; a stretch whose join and
   leave points would lie closer than `minEdge` collapses to one contact point, handled by step 2.
4. *Crossings.* The remaining crossings are computed exactly, placed by the placement rule and resolved by iterated
   snap rounding (≤ 3 passes; each pass leaves a planar arrangement, so an unconverged result still commits, reported
   `W_SNAP_PASSES`; the sub-centimetre re-routes of Steiner vertices are snap-rounding re-routes with the same
   guarantee). Two consecutive crossings closer than `minEdge` lie on the two arms of an acute corner — the clearance
   invariant forbids any other way for two edges to come that close — and are resolved at that corner instead of
   cutting a sliver off its tip (`W_WEDGE_ROUTED`): when the corner is the existing arrangement's (two crossings along
   one new segment) the chain is routed through the corner's vertex; when it is the chain's own (two crossings along
   one existing edge) the chain's corner vertex moves onto that edge at the placement point of its foot. Either way the
   chain moves at most `minEdge / (2 tan(θ/2))` for a corner of angle θ: 0.47 m at the 30° junction floor, 1.2 m at the
   12° plot floor. An optional chain that would move more than `attractCm` this way is rejected with
   `E_BELOW_MIN_EDGE`.
5. *Re-walk.* Only faces incident to touched edges are re-walked; face records, owners, parents and stage ranks are
   updated — a kept face is re-parented into the new face that contains it (§3.3); the commit record lists them.

**The placement rule (GEO-3, GEO-35; J-K17).** Every new vertex on an existing edge — a split foot, a stretch's join or
leave point, a crossing — is placed at the lattice point nearest its exact position among the points that (i) lie
within 0.71 cm of the existing edge's route at the edge's own level (one index item, §3.3), so that edge moves no more
than its hot pixel; (ii) lie at least `minEdge` from the endpoints of the edge being split and, for a crossing, from
the endpoints of the crossing segment; and (iii) keep every vertex and edge around the split at least `minEdge` from
the new vertex and from every edge incident to it (clearance, checked in the index); ties y then x. The search runs
outward from the exact position, never beyond `attractCm`, and charges each candidate to the work count. The nearest
lattice point qualifies almost always; it fails only where a vertex already stands between `minEdge` and `minEdge` +
0.71 cm from the edge — a gap a previous rounding or a warp can leave — and a point rounded towards it would bring it
inside `minEdge`; then a qualifying point lies a few centimetres along the edge, because that vertex is at least
`minEdge` from the edge's line and a point ≈ 5 cm along the edge's hot-pixel band is at least `minEdge` from it.
Measured (`docs/validation/bench/fixall_kernel_r2_attract.out` C): 200 000 crossings placed next to a vertex 25–26 cm
from the crossed edge — plain nearest-point rounding leaves 1 361 edges shorter than `minEdge`; the placement rule
leaves none, moves a crossing at most 0.84 cm and keeps it within 0.71 cm of the crossed edge. If no candidate
qualifies, the incoming vertex moves onto the nearer endpoint of the edge (a crossing routes its segment through that
endpoint) and the new segments re-enter step 3; each such re-route lands on an existing vertex, so the loop ends within
the work limit. **`W_PLACED`** reports every vertex the rule places away from its nearest lattice point: a new,
re-seated or sliding vertex seated at a qualifying non-nearest point, and an incoming vertex moved onto the edge's
endpoint because no candidate qualified. Snap rounding is the same rule for points that lie on no existing edge
(nearest lattice point).

The rule gives every vertex it places, re-seats or slides onto a coarser edge §3.10's placement bound. A later
same-level change of that route — a split, a promotion, a demotion or a dissolution (§2.2 rule 3) — moves no finer
vertex and may leave one farther off (J-K32): one promotion in ten leaves another finer vertex up to
≈ 1.25 cm from its new route edge, a same-level split about as often, and successive changes up to ≈ 1.36 cm after two
and ≈ 1.49 cm after three or four (`docs/validation/bench/fixall_kernel_r4_checks.out` A,
`fixall_kernel_r5_checks.out` B). Nothing reads that standing distance but the index, whose route-edge boxes cover it
(§3.3).

**Existing geometry wins, and no edge shorter than `minEdge` can be created.** An incoming chain vertex moves at most
√2 · `attractCm` ≈ 36.8 cm (onto an edge's endpoint from beside the edge), or by the corner bound of step 4 at an acute
tip; no existing vertex moves; an existing edge moves only by its hot pixel (≤ 0.71 cm) where a vertex is placed on it.
Every edge a batch creates is one of four kinds, and each is at least `minEdge` long: (a) a chain segment between
consecutive chain vertices — decimation and the merge rule keep them at least `minEdge` apart; (b) a sub-edge of a
split existing edge — the placement rule's (ii); (c) a chain segment ending at a split point or a crossing — (ii) again
for a crossing segment's own endpoints, and the merge rule when the chain's previous vertex is an existing vertex beside
the split; (d) the span between two crossings — resolved at the acute corner by step 4. Clearance holds by steps 2–3
for every new vertex and segment and by (iii) for every placed vertex. So no two vertices of an arena are ever closer
than `minEdge`, whether an edge joins them or not: every new vertex either lands on a vertex within `attractCm` or stands
at least `minEdge` from every vertex around it, no existing vertex moves, and a move that would bring two within `minEdge`
halves (the whole-step validation below; §3.10; J-Fkernel-1). Measured
(`docs/validation/bench/fixall_kernel_r2_attract.out` A–B): over 400 000 vertices dropped in the attraction band of
random lattice edges, 0 sub-edges shorter than `minEdge` (shortest 25.50 cm; 5 729 moved onto an endpoint; largest
displacement 36.72 cm); on cut endpoints of Chaikin×2 spines with 7.9 m median segments (`fixall_kernel_r2_attract.py`
B), 6.38 % attracted, displaced p50 12.9 cm and at most 26 cm, shortest resulting edge 25.6 cm. Constructive fixtures:
§13.1.

**Chain classes.** `mandatory` chains — coast, shore, bank, river, wall trace, arterial, band and kerb edges, plot
lines, user-drawn geometry — cannot fail for a precision reason: after attraction and placement no precision error is
left, only §3.1's non-precision codes can reject one, and a corner below `minFaceAngle` commits with `W_ACUTE_CORNER`.
`optional` chains — growth proposals, optional lanes, decorative lines — are also rejected with `E_BELOW_MIN_ANGLE`;
with `E_BELOW_MIN_EDGE` when the chain collapses below one edge after decimation or when wedge routing would move it
more than `attractCm` (step 4); or with `E_SELF_INTERSECT` where their role requires a simple ring: a proposal that
cannot be inserted is not a street. The F-NUM ladder of §5.2 applies to optional chains; mandatory chains never reach
it.

**Clearance.** Attraction and the placement rule maintain §3.10's clearance invariant for insertions, and `warp`
checks it for moves. One consequence stages rely on: a setback smaller than `minEdge` collapses to zero (a building
front drawn 10 cm behind the kerb lands on the kerb), so a stage that wants a visible setback draws at least `minEdge`
(§4.7).

**Roles on shared stretches, and slivers (GEO-4).** When a chain shares an edge — by stretch attraction or an exact
collinear overlap — the edge's role set gains the chain's `(role, entity, level)` row: never a duplicate edge, never an
overwrite. A wall pulled onto a river bank is one edge carrying `bank` and `wall`; a quay on a shore carries `shore` and
`way`. A face below its class floor (width or area — never `minEdge`) is resolved by `absorbSliver`: it merges into the
neighbour across its longest shared boundary whose edges carry only partition roles; if every candidate boundary
carries a structural role, no edge is deleted and the sliver stays as a face of kind `residue` owned by the neighbour
across its longest boundary (`W_SLIVER_RETYPED`). A street, wall, shore or border can therefore never lose a stretch to
sliver repair; `mergeFaces` across a structural edge returns `E_STRUCTURAL`.

**`splitFace` contact semantics (GEO-6).** A cut is a polyline whose interior lies in the face's open interior and
which touches the face boundary exactly at its two endpoints, decided by exact `orient2d` on lattice points — never by
a parameter-space epsilon.
1. Each endpoint is a boundary vertex or a point on a boundary edge inserted by `splitThrough`; with attraction, an
   endpoint within `attractCm` of a boundary vertex lands on that vertex, and so does an endpoint whose foot on a
   boundary edge lies within `attractCm` of that edge's endpoint (step 2).
2. Any other contact is `E_NOT_TWO_CROSSINGS`: the cut passing through or within `attractCm` of a boundary vertex,
   grazing a reflex vertex, running within `attractCm` of a boundary edge anywhere but where it arrives at an endpoint,
   overlapping a boundary edge, or crossing the boundary more than twice. `splitFace` never lets attraction bend a cut
   into a pinch; the stage's ladder picks another cut (§4.6).
3. An antenna — a dangling chain inside the face such as a cul-de-sac spine or a dead-end lane — counts as boundary: a
   cut may end on it (a declared T-junction, the natural end against a dead-end street) and may not cross it.
4. A cut from the outer ring to a hole does not split the face; it is `connectHole(face, cut)`, whose post-condition is
   the same face count and one hole fewer (the slit of §4.6); a violation is `E_HOLE_CONTACT`.
5. The two children are returned in canonical order, the face left of the directed cut first, so an anchor lying
   exactly on the cut belongs to the left child (the tie-break of the anchor rule, §6.3).
6. A face's exported area boundary omits its antennae, so a GeoJSON ring never retraces a slit (§11).

**Moves: warp and smoothing (GEO-10, GEO-35, GEO-5 (c)).** `warp(field, fromLevel, region)` applies
a displacement field to every vertex of level ≥ `fromLevel` inside the region. Shared boundaries are single vertices,
so the streets, blocks, plots and footprints under a brush move together (the property MFCG's warp had through shared
points), and vertices of level < `fromLevel` stay fixed — a street warp does not move the coast unless `fromLevel = 0`.
Smoothing of committed geometry is a `warp` whose field the smoother computes (§3.4), under the same rules. **A move
batch keeps nothing** (J-K27): `E_KEPT` governs insertion and clearing only (§3.3), and a move batch's
`rederivesFrom` is the first stage of §4.1's order (J-K33); what a move may not displace is decided by the held set
below, and what it may not break by the whole-step validation. The rules, in the order the step applies them:
* **Held vertices (GEO-5 (c)).** Before the step the kernel computes the **held set**: (1) every vertex of
  the geometry a locked or pinned entity's references resolve to (§7.2) — the level-n route vertices of every ring of
  its `FaceRef` faces, outer rings and holes, of its `ChainRef` and `EdgeSetRef` edges, and its `VertexRef` vertices —
  and of every finer face nested in its faces, because §7.2 makes every finer face under a locked or pinned entity a
  fixed input; (2) closed downwards by level: the two endpoints of every coarser edge that carries a held Steiner
  vertex are held too, so that edge does not move and its held vertex keeps its place beside the route; each round
  adds endpoints of a strictly coarser level, so the closure ends within four rounds. The field is zero at every held
  vertex and the dry run lists the held entities, so a locked plot, block or building keeps every corner although none
  of them carries a vertex role. Kernel-pinned vertices — gates, junctions, portals, the vertices smoothing,
  simplification and cutting keep — move with everything else unless held, because a warp is the user's explicit move
  and every entity names its vertices by role (§2.2 rule 5), so a moved gate is still its gate. A bridge's `deck_end`
  vertices and a water gate's `gate_end` vertices are held unless `fromLevel = 0`, because the step that made the
  crossing fixed it across the water (§2.7) — a deck perpendicular to the flow, a water gate's wall edge from bank to
  bank — whatever level its bank vertices have: L0 for a deck and for an edited water gate, L1 Steiner vertices on the
  shores for one the trace made at generation, which would otherwise slide along the shore under a street warp and
  skew the gate's edge across the water (§2.2 rule 7; J-K35); with `fromLevel = 0` the banks and the crossing
  move together.
* **Vertices on fixed routes slide (J-K18).** A route is **fixed** when its edge is of level
  < `fromLevel` or both its endpoints are held. A vertex of level ≥ `fromLevel` that lies on a fixed route and is not
  held — a street ending on a shore, a bridgehead, a riverside junction (level-1 Steiner vertices on L0 edges under
  §7.1's default `fromLevel`), a neighbour's footprint corner on a locked plot's line — moves only along that route:
  its displacement is projected onto the route's direction at the vertex, the projected point is kept at least
  `attractCm` from the route's endpoints and from every held vertex on it, and the vertex is seated at the lattice
  point the **placement rule** chooses for that point — (i) within 0.71 cm of the route, (ii) at least `minEdge` from
  the route edge's endpoints and from its neighbours on the route, (iii) clearance — never at the plain nearest lattice
  point, so the slid vertex keeps §3.10's placement bound and a slide beside a vertex 25.0–25.7 cm from the route
  commits instead of rounding into it. A brush over a quay road therefore drags its junctions along the quay instead
  of halving itself to a no-op against the shore (fixture: §13.1).
* **Re-seats (J-K17).** Each Steiner vertex on a moved coarser edge is re-seated at the lattice point the
  placement rule chooses for its projection onto the moved route, with (i)–(iii) read on the moved geometry, because
  two roundings stack here exactly as they do on insertion; where no lattice point within `attractCm` of the projection
  qualifies, the step fails validation and halves, like any other invalid step. Measured
  (`docs/validation/bench/fixall_kernel_r3_checks.out` A): over 200 000 re-seats beside a vertex standing 25.0–25.7 cm
  from the route, plain nearest-point rounding breaks `minEdge` or clearance in 12.9 % of cases and the placement rule
  in none, moving the vertex at most 4.3 cm along the route and keeping it within 0.71 cm of it; in the constructive
  case — a kerb warped to run (0, 0)–(1 000, 9) past a vertex at (517, 30), 25.35 cm from it, with a plot-line end
  re-seated at that vertex's foot — plain rounding lands 24.999 cm from the vertex and fails validation, while the
  placement rule lands 25.999 cm from it and the step commits.
* **Order within a step (J-K30).** Re-seats and slides read vertices that may be moving in the same step — two
  Steiner vertices on one warped kerb, a slide beside a re-seat — so they are placed one at a time in canonical order,
  by each vertex's lattice position before the step (y, then x), each reading the vertices already placed at their
  placed points and every other moved vertex at its rounded target (a re-seat's or slide's rounded target being the
  nearest lattice point to its projected point); the whole-step validation then checks the result. The order is a
  function of positions alone, never of slots (§3.3). Measured (`docs/validation/bench/fixall_kernel_r4_checks.out` B):
  for two Steiner vertices re-seated onto one warped route with projections 25.0–26.5 cm apart, the two possible
  orders place different points in 6.8 % of pairs.
* **The `split` flag under moves (J-K26).** A step clears the `split` flag (§2.2 rule 3) (b) of every
  vertex it moves, **except** a Steiner vertex re-seated onto its coarser edge's route and a vertex sliding along a
  fixed route — both still lie on the route of the edge they split, and dissolving either restores that edge exactly,
  because the edge is the segment between its endpoints (a re-seated Steiner vertex keeps its flag, so a later
  `clearFiner` dissolves it and the next derivation meets the clean coarser edge); and (b′) of every flagged vertex it
  does **not** move that is of the same level as a run it split — a same-level split foot or crossing, or a vertex
  promoted onto that run — when the nearest vertex of that level or coarser beside it along that run moves in the step
  (a re-seat or a slide included): the run's line has moved from under it, so dissolving it, or restoring it by
  demotion, would no longer give the edge it split. A Steiner vertex of a coarser run keeps its flag, because it is
  re-seated with that run. So a warped same-level T-junction or crossing becomes a shape vertex of the warped chains —
  whether the warp moved it or only the chain around it — and removing the lane that ended there never straightens
  the warped spine. The commit record lists the (b′) vertices in `unflagged`, and the edit's undo record restores their
  flags (§3.3, §7.4).
* **Whole-step validation (GEO-10, GEO-35).** Each target is rounded to the lattice (re-seats and slides by the
  placement rule, in the order above) and the **whole step** is validated: every edge incident to a moved vertex —
  including edges between two moved vertices and the edges at re-seated or sliding Steiner vertices — is at least
  `minEdge` long and is tested against the index for crossings; every unmoved vertex is tested against the triangles
  swept by the moved edges; no two vertices may lie closer than `minEdge`, whether an edge joins them or not — no two on
  one lattice point, and not the two far vertices of a corner, which clearance's one-ring exempts and a pinch of a
  short-armed corner would otherwise close (J-Fkernel-1); no held vertex moved; the clearance
  invariant holds; and the edit layer's `recordCheck` passes — every held point record inside its host face at its
  clearance (§7.4), and every building whose footprint the step moves valid under §2.6's wing-carrying rule, decided by
  §2.6 rule 4's tiered test after the kernel's own checks of the step pass, stopping at the first failing building in
  address order. On failure the step's strength is halved globally — deterministic, at most 8 halvings,
  after which the step is a reported no-op. The commit record lists every moved vertex (§3.3), and §3.10's `minEdge`
  row checks the new and moved edges it names, so a `pinch` or `swirl` that would shorten an edge to 10 cm, stack two
  vertices on one lattice point or close a corner until its two arms' far vertices stand within `minEdge` of each
  other, halves instead of committing.

Faces that a committed step leaves below a class floor are re-derived locally, each by its own batch whose
`rederivesFrom` is the stage that makes that face, and logged. The named brushes of §7.1 are displacement fields
supplied by the edit layer (a `moveVertex`: §3.4); a whole-map rotation is a view transform, never a vertex operation,
because it would re-snap every vertex in the arena.

=== END ===

=== REPLACE ### 3.10 Kernel invariants — what is checked, when, and at what cost ===

### 3.10 Kernel invariants — what is checked, when, and at what cost

| invariant | class | scope (when checked) | how |
|---|---|---|---|
| every coordinate is a lattice point inside the range invariant | hard | at `snap` | by construction (§3.2 (7)) |
| no edge shorter than `minEdge`, whichever writer made or moved it (insertion, boolean, buffer, offset, smoothing, warp) | hard | batch-local | the commit record's new edges and moved edges — every edge incident to a vertex in its `moved` list, Steiner re-seats and slides included (§3.3, §3.6) |
| clearance: every vertex lies at least `minEdge` from every edge outside its one-ring (the edges incident to it or to its neighbours); acute corners inside the one-ring are governed by `minFaceAngle` and the class floors | hard | batch-local | new, placed and moved vertices and their incident edges against the index |
| one vertex per lattice point, and no two vertices closer than `minEdge`, joined by an edge or not (the pair one vertex apart that clearance's one-ring exempts included; J-Fkernel-1) | hard | batch-local | by construction for insertions (coincidence is attraction; a new vertex is attracted onto a vertex within `attractCm` or placed at least `minEdge` from every vertex around it, §3.6); the moved vertices against the index for a `warp` or smoothing step |
| faces simple except declared antennae; no two edges cross | hard | batch-local | touched faces |
| nesting: every face of level n + 1 has exactly one parent at level n, and each of its boundary edges is of level n + 1 or a sub-edge of a level-≤ n edge | hard | batch-local | touched faces and re-parented kept faces, by index — never by coordinates |
| placement bound: every vertex a batch places, re-seats or slides onto a coarser edge lies within 0.71 cm of that edge's route at the edge's own level when it is placed (a later same-level change of the route moves no finer vertex, §3.6); on a transient arena every vertex a batch places on a fixed edge lies within 0.71 cm of the line of each input side the edge lies on — its route, which no split changes and no writer there moves, so the bound stands for the arena's life (§3.4) | hard | batch-local | the placed, re-seated and sliding vertices |
| level consistency: every edge's birth level is the lowest level among its role rows; no vertex is coarser than every edge and vertex role at it; a vertex finer than an incident edge lies inside that edge's run — its incident edges coarser than it are exactly two, of one level, with identical rows of that level (§2.2 rule 3) | hard | batch-local | the commit record's new, changed, demoted and removed edges and the vertices at them, and its promoted and demoted vertices |
| held vertices: no vertex of a `warp` or smoothing step's held set moved (§3.6) | hard | batch-local | the commit record's `moved` list against the held set |
| prepared contacts: a clear-region batch met finer geometry only at its `KernelTx.prepared` vertices, promoted exactly those, stripped their `anchor` contact names, and shared no finer edge (§3.3, §3.6) | hard | batch-local | the commit record's `promoted` list against the resolved prepared set, and its new edges' birth levels |
| kept content: no finer face made by a stage before the batch's `rederivesFrom` — nor, in a clear-region batch, any finer face outside the region — was cleared, crossed, split or re-owned (moves keep nothing, §3.6) | hard | batch-local | the stage ranks and region test of the commit record's removed and changed finer faces (§3.3) |
| role consistency: every role the registry declares linear (`way`, `wall`, `shore`, `tunnel` …) forms, per entity, the connected simple chains or rings the entity declares; no structural role is lost by an absorption or merge | hard | batch-local | the commit record's role keys |
| every stored reference resolves — each `FaceRef`, `ChainRef`, `EdgeSetRef`, `VertexRef` held by a live entity finds geometry, every indexed role of §2.2 rule 7's registry other than a knot role finds exactly one vertex or edge set per ordinal, every `ChainProfile`'s knots lie on its chain in ordinal order with at least one knot per ring, and no geometry carries a dead entity | hard | stage end, save | the reverse indexes |
| frozen base complete: at every pool freeze, after the freeze has rebuilt each static partition whose grid or tombstone set was not empty (§3.3 pool step 1), every level's dynamic grid and every partition's tombstone set is empty — every item lives in a static partition the copy carries | hard | at the freeze, at every pool size | two counts per level, O(levels), after the rebuild |
| index levels and freshness: a batch wrote no index of a level coarser than its own, except the promotions and demotions it made, and left no static item of what it deleted, re-levelled, changed or moved to another partition unfiltered — each is tombstoned in the partition its home entry named and its successor lives in the grid of its current level (§3.3) | hard | batch-local | the commit record's index writes against its level and its `promoted` and `demoted` lists; each deleted, re-levelled, changed or re-partitioned item that had a static copy found in the tombstone set of the partition that held it (in a pool worker, the overlay's set for that partition) |
| pool scope: no district overlay wrote outside its district's scope; no two overlays, and no concurrent eager write, touched one base record | hard | at the pool merge | the overlays' copied-record lists against each other and against the live arena's changes since the freeze (§3.3) |
| arena isolation: a batch wrote only the arena its `key` names, and no vertex, edge or face of one arena references a slot of another — the arenas share no topology and every cross-arena link is an entity id (§2.2 rule 2; the services read any arena by its key, §3.4) | hard | by construction; debug-build assertion | each slot passed to an op or service checked in a debug build against the key and version it was stamped with (§3.4); the multi-arena stages' property tests, the underground reroll-isolation fixture among them (§13.2) |
| seed tiling on a transient arena: the union of its faces equals the union of its seed rings as inserted, and every fixed edge — a seed ring's or a fixed ring's (§3.4) — survives every batch, so the rooms of each storey tile exactly the seed rings §2.6 passes — at and above the ground, the extents of the wings that reach the storey (a wing's ring, or above the ground its ring ∪ the span ring of the passage it spans), clipped to tile, plus, on the ground storey, every spanned passage's span ring; below the ground, the basement ring (§2.6's plan rung, steps 4 and 6) — with every outer wall on a seed-ring side, whether the storey was cut once or re-cut under §2.6's interior ladder (item 28 and 28 (f)); a stored plan's carried rooms tile its storeys' carried seed rings the same way | hard | at the open; batch-local; at `readBack`; at a stored plan's carry | at the open, §3.4's overlap test — no two input sides cross, no face lies inside two seed rings, and each fixed ring is one face inside one seed ring and no other fixed ring; the commit record's removed edges against the fixed edges (none); at `readBack`, `area2` summed over the faces against `area2` summed over the seed rings as inserted, and every face ring inside one seed ring by `orient2d`; for a stored plan's carried rooms (§2.6's carry check (4), §5.3), a transient arena opened with the carried shell's seed rings, formed as the plan rung forms them, and that storey's rooms as `fixed` rings, as §2.6 carries them: the overlap test of §3.4, then the faces' `area2` sum equal to the fixed rings' (no face outside a room), the arena then released |
| face corners ≥ `minFaceAngle` | soft for mandatory chains (`W_ACUTE_CORNER`), hard for optional chains | batch-local | touched corners |
| Euler characteristic per level (V − E + F = 1 + components) | hard | CI (B-FUZZ, B-EDIT) | whole arena |

These rows are the kernel's part of the §5.3 suite. Batch-local checks read only the commit record's faces, its moved,
promoted and demoted vertices, its changed and demoted edges and their one-ring, so a batch costs O(touched), never
O(model) (SCL-1); whole-arena checks run at stage end, at save or in CI; the freeze check runs once per freeze and the
pool check once per merge in O(overlay size). Class floors are the stages' invariants, stated as §3.2 (2) says (GEO-35).

**Nesting admits no exception (J-A30.31).** Nothing the plot model adds needs one. A passage under a building's wing
(item 30) is an L3 face of kind `passage` in one parent — §2.5's `Passage`, cut by S10 along one side line of the front
plot (§4.6, §4.7 S10 (9)) by `splitFace` or `claimSubFace` as any alley face is; the wing overhead is a composition
ring (§2.6), never a plat face, so no footprint straddles it and no level is crossed; the rear plots it serves carry
their `access` rows on the edges they share with it, and §5.3's reachability walk crosses passage, alley and court
faces through `faceNeighbours` (§3.4). A passage is never an L1 way: its L2 corridor would cut the footprint above it
and split the block, and S10 never writes L1 (§4.1). A sealed passage (item 30 (e)) keeps its face and its edges — the
seal is `Passage.sealed`, the one bit of the passage's record (§2.5), from which the sealed access edges and the plots'
exposure `sealed` are read (§4.6); its geometry is unchanged. A building's rooms (item 28) are never plat faces either:
they are cut on a transient arena (§3.4), so no clicked building's plan enters an arena, an index partition or the model
digest.

=== END ===

=== J-ROWS ===

| J-Fkernel-1 | no two vertices closer than `minEdge`, joined or not — a hard row, checked on a warp's moved vertices | §3.6, §3.10 |
| J-Fkernel-2 | reference identifiers paraphrased out of the kernel's own tables (J-Fcode-1 applied inside the kernel) | §3.1, §3.5 |

=== END ===

=== RATIONALE-A ===

| J-Fkernel-1 | Chose a hard vertex-separation row — no two vertices of an arena closer than `minEdge`, whether or not an edge joins them, checked on a warp's or smoothing step's moved vertices — over leaving the pair one vertex apart to the soft `minFaceAngle` floor alone, because insertion already keeps every pair apart by construction (a new vertex is attracted onto a vertex within `attractCm` or placed at least `minEdge` from every vertex around it, and no existing vertex moves), while a `pinch` on a corner with arms under ≈ 50 cm could close its far vertices below `minEdge` under the clearance row's one-ring exemption and the soft angle floor, after which the next chain attracted onto one of them and routed through the other would create an edge the hard `minEdge` row rejects — a mandatory chain failing for a reason §3.6 says is closed; the new test costs the same index query the lattice-point test already makes, and it subsumes that test (ruled by the kernel lane's Fable review of 27 September 2026, on GEO-35's whole-step validation) (§3.6, §3.10). |
| J-Fkernel-2 | Chose to paraphrase the reference identifiers the kernel's own text still carried — NG's profile names for point allocation and line intersection in the build-versus-adopt table and the failure-class table, and the 2017 generator's face-cut routine and null-rectangle names in the failure-class table — over keeping them as citations, because the owner's clean-room rule (amendments b of 25 September 2026, items 21 (b) and 32) and J-Fcode-1 (reference strings are citation-only in reader-tier files and never enter the design) admit no identifier of theirs in the design, the measurements they label are ours and keep their numbers, and the document's identifier check (C1) sees only FTG's payload names, so the gate would never have caught them (ruled by the kernel lane's Fable review of 27 September 2026) (§3.1, §3.5). |

=== END ===
