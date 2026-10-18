=== REPLACE ### 3.1 Build-versus-adopt, per primitive ===
### 3.1 Build-versus-adopt, per primitive

| primitive | decision | candidate (licence) | degenerate input; where specified |
|---|---|---|---|
| lattice, snapping, attraction | **build** | — | §3.2 (numeric policy), §3.6 (insertion, contact and move semantics) |
| exact predicates | **build** `orient2d` (exact in doubles under §3.2 (1)); **adopt** `incircle` (J-K36) | `robust-predicates` **3.0.3, Unlicense** — licence confirmed against the public registry (`docs/validation/redteam-improve.md` §5.1), version pinned and re-checked by §17.4's licence checker on every upgrade; *pre-decided fallback* if a future version fails the checker: an in-house BigInt `incircle` (exact, slower) | `incircle` is the adaptive predicate and is never on the topology path; ties and float rules §3.2 (3), orientation and areas §3.2 (6) |
| planar subdivision (§2.2) | **build** — the core asset: **struct-of-arrays, allocation-free hot loops** (G-R7: in the profile of the NG 1.2.2 build, creating points (385–561 k calls) and intersecting lines (147–213 k) dominate) | — | transactions §3.3, insertion and slivers §3.6, storage §3.9, invariants §3.10 |
| polygon booleans; buffers, offsets, insets and bands | **build on the kernel's arrangement** (§3.7; J-K4) | Clipper2 (BSL-1.0) and `polygon-clipping` (MIT): CI oracles, shipped only under §3.7's fallback | §3.7 |
| straight skeleton | **build** (§3.8; J-K5, J-A21.31) | none adopted: no permissive, mature JS/TS skeleton that could be held to §3.8's numeric contract is known to this design; CGAL's is GPL (the rest of CGAL LGPL), which §17.4's permissive-only production closure excludes (the module's licence stays the owner's, §17.3), and it fails the stack and one-engine grounds besides — a C++ library is not the TypeScript kernel every host runs (D-4; no WASM kernel, §3.7) and its doubles could not be made byte-identical to §3.8's validated construction | §3.8 |
| OBB, convex hull, largest inscribed rectangle | **build**: monotone chain + rotating calipers; LIR sampled deterministically over four candidate axes — OBB long axis, frontage normal, ± 45° (G-R13) | — | **one contract (GEO-7):** fewer than 3 distinct points or a collinear hull returns `E_DEGENERATE` (detail `collinear`), never `ok` with a zero extent, so no caller can divide by a zero minor axis; callers branch on the typed result |
| best-fit regular polygon | **build** `regularFit` (§3.4; J-A45.31) | — | a ring of fewer than 3 vertices or of zero area, or one whose first component vanishes (radius below 1 cm), returns `E_DEGENERATE` (detail `fit`); a clockwise ring is read in reverse; cosines, sines and angles through `dmath` (§6.5) |
| Delaunay / Voronoi | **adopt** | `delaunator` (ISC), `d3-delaunay` (ISC) | duplicate points merged first; used only for site sampling, Lloyd relaxation, field seeds and medial axes — never as the street source (S4's routing lattice is `hexLattice`, §3.4) |
| Poisson-disc / blue noise | **build**: Bridson with **k = 50 candidates, all evaluated**, each drawn in §8.10's candidate annulus (`poisson.annulus`) about its active point, on a torus — the sampler of four builds as their code reads — MFCG build 12710731, VG build 1.6.9, NG build 1.2.2, Dwellings itch 17195045 (P14; k = 50 as `_critic.md` C2 measured it; read in the code, its "warp" is the tile's wrap-around; G-P17) — run at product build time to make §8.10's stamp tiles; per-instance placement: §8.1 (2), §8.10 | — | domain clipped to any polygon with holes; an empty domain returns empty; **a ragged wood edge comes from thinning the stamped points by the domain-warped density noise (§4.9), never from warping the sampler** (COV-VG-WC3) |
| noise (fBm, domain warp, ridged) | **adopt + build** | `simplex-noise` (MIT); seeding, fBm and warp ours | seeded from sub-streams (§6.1); octaves and lacunarity are table values (VG's 5-octave field, `_critic-vg-ng.md` V7) |
| curves: Chaikin, centripetal Catmull-Rom → cubic, pinned-vertex Laplacian, Visvalingam–Whyatt, circular fillets | **build** | — | results re-enter through `insertChain`; smoothing committed geometry is a `warp` (§3.4, §3.6); Visvalingam–Whyatt is the topology-preserving `simplify` (§3.4); fillets are skipped when a leg is shorter than the chord |
| spatial index | **adopt + build** | `flatbush` (ISC) static partitions and a uniform grid per level (§3.3); `rbush` (MIT) only for the screen-space label collision index (§9) | §3.3 |
| marching squares / distance transform | **adopt** marching squares; **build** the distance transform | `d3-contour` (ISC; §17's licence table) | linear time; VG 1.6.9's costliest terrain routine is a field that pushes its roads and its highway entrance away from water, not shore extraction — not reproduced: S4's lattice keeps roads off water by its own crossing penalty (§4.3) — and its coastlines are grid-cell staircases smoothed in two passes and resampled, which our contour extraction replaces; contours are extracted per render tile, not in S1, and are never plat edges (§2.3, §8) |
| path search | **build**: binary-heap A\* / Dijkstra on rasters and on the subdivision graph (the 2017 "A\*" and MFCG 12710731's street search are both first-in-first-out searches with no heuristic — not reproduced; J-A53.31) | — | `E_NO_PATH` with the closest reached point |
| triangulation (render, fields) | **adopt** | `earcut` (ISC) | holes supported; degenerate triangles skipped and reported |
| deterministic math | **build** `dmath` (§6.5 (2); J-11) | — | a division by a computed value goes through `ratio()` (§3.2 (8)) |
| RNG and hashing | **build** (§6.1) | — | — |

Every primitive returns a **typed result** and never throws for a geometric reason:

```ts
type KernelResult<T> = { ok: true; value: T; warnings: Warning[] } | { ok: false; code: KernelError; detail: string; partial?: T };
type KernelError =
  | 'E_OUT_OF_RANGE'       // snap(): non-finite, or |coordinate| ≥ 2^23 cm — a caller bug, reported with its stream key, never stored (§3.2 (7))
  | 'E_DEGENERATE'         // ratio() with a vanishing denominator; OBB / hull of collinear or < 3 distinct points; an empty or collapsed boolean, buffer or inset; a StretchRef whose ends are not two distinct vertices of one part of its chain (detail 'stretch', §3.4); a transient arena's seed or fixed ring that would break minEdge, clearance or simplicity, or input rings that overlap, or a seed clip's piece left with a hole (detail 'seed', 'fixed' or 'overlap', §3.4); a regular fit of fewer than 3 vertices, of a zero-area ring or with a vanishing first component (detail 'fit', §3.4)
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
type Warning = { code: 'W_ATTRACTED'|'W_STRETCH_SHARED'|'W_WEDGE_ROUTED'|'W_PLACED'|'W_PROMOTED'|'W_SNAP_PASSES'|'W_ACUTE_CORNER'|'W_SLIVER_RETYPED'|'W_STEINER'|'W_HEIGHT_CLAMPED'|'W_DOWNGRADE'|'W_CUT_SLID';
  count: number; at?: LatticePoint };   // W_PLACED: §3.6's placement rule; W_PROMOTED: a finer vertex promoted (§2.2 rule 3) — prepared vertices and stretch ends included; W_CUT_SLID: §4.6 step 8 (c)'s slid always-succeeding cut, count = the slide's steps (J-Fredteam-1)
```

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
   `minEdge` plus 1 cm of lattice slack, so a vertex split onto an edge lies at least `attractCm` − 0.71 cm = 25.29 cm
   from both of the edge's endpoints (a vertex whose exact foot lies within `attractCm` of an endpoint moves onto that
   endpoint instead, §3.6 step 2); `minFaceAngle = 5°` (500 centidegrees; hard or soft by chain class, §3.10); the range
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

   **Frame growth at an epoch (item 81 (b); J-A81.31).** A frame only grows, and only where §4.11 grows it at an epoch.
   The new frame is the one this rule gives the epoch's population target — taken at most at the cap, as §1.1 clamps a
   request — at the frame's own `aspect`, centred on (0, 0), so it encloses its predecessor; the range bound of (1),
   taken at the cap and the extreme aspect, holds for every grown coordinate. The growth inserts coarse chains into
   finished fabric and deletes others, so it runs as §3.3's declared sequence of single-level batches sharing one clear
   region, each with `rederivesFrom` S1. A **lapsing stretch** is a stretch of the old `margin` ring or of the old
   `border` rectangle that carries no other row of its chain's level or a coarser one; the **region** unites the L1
   faces beside a lapsing stretch with those the new frame rectangle will cross — whole L1 faces, as a carve's footprint
   is (§3.3).
   * (a) *Clearing (L1).* One L1 batch removes the content finer than L1 of every face of the region (§3.3 rule 1), a
     locked or pinned owner returning as a conflict (F-EDIT, §5.2), so no deletion of the committed growth joins two
     faces finer than L1 and its new rectangle crosses none.
   * (b) *The margin (L0).* One L0 batch inserts the new outer ring as the `margin` chain, then S1's water faces in the
     band between old and new ring (§4.11), then strips the old ring's `margin` rows by `removeEdges` on two
     `StretchRef`s that together cover it (§3.4). A stretch left with no row is deleted, joining the faces either side —
     land with land, water with water, each cleared L1 face beside it with the ring's; a stretch that keeps a row keeps
     its edge, re-levelled by §2.2 rule 3 (a), as where S1 lays a shore along it, the ring's water meeting the old land.
     `Plat.frame` takes the new frame as this batch commits.
   * (c) *The border (L1).* One L1 batch inserts the new frame rectangle as the `border` chain by §3.6's insertion (a
     way it crosses sharing the crossing vertex) and strips the old rectangle's `border` rows alike; a stretch that also
     carries another L1 row — the settlement perimeter or a reservation boundary running along the frame (§2.2 rule 1) —
     stays.

   A vertex of an old chain that keeps a row or another edge stays — a through-road's end on the old ring is an antenna
   end until §4.11 continues its way — and every other dissolves or stays by §2.2 rule 3. Every underground part whose
   outer ring is the frame with its margin (II.7.3) grows by (a) and (b) on its own key, the `margin` rows of its own
   record (§2.2 rule 1) instead of the `Terrain`'s, with no water and no border. Each raster of §2.3 extends by whole
   cells on each side until it covers the grown arena, keeping its `cellCm` and the alignment of its cells, so every old
   cell keeps its place and every stored height its value; S1 fills the new cells, and the `hydro` fields — flow
   direction, flat rank and accumulation — are recomputed over the grown grid by §2.3's mechanism, because an old edge
   cell gains neighbours and the ring may drain inward, every river's traced course inside the old arena unchanged. What
   changes is the region's faces, the faces beside a deleted stretch and the ring's new faces, at each level that sees
   them — §4.11's stages continue the ways and re-derive them; every other face keeps its ring, owner and nested faces
   (re-parented where its parent was joined, §3.3). The kernel's part draws no stream, so a replay of the log re-grows
   the frame byte for byte, and where §7.4 allows an epoch's undo, its undo record restores the old frame and what the
   three batches removed. *Pre-decided fallback* if M4's memory measurement of the extreme growth — a TOWN grown in one
   epoch to the cap, whose kept 5 m heights over the cap's arena are ≈ 15.7 M cells (≈ 63 MB, where a METROPOLIS made at
   the cap holds ≈ 3.9 M; our count) — exceeds §12.8's METROPOLIS line: a growth that changes the rung re-grids each
   raster at the new rung's `cellCm`, heights by the sampler's bilinear read of the old grid and the flow fields
   recomputed, every standing entity keeping its stored `baseCm`, and the generation report (§5.4) names the re-grid.

=== REPLACE ### 3.4 Kernel operations the pipeline needs (complete list) ===
### 3.4 Kernel operations the pipeline needs (complete list)

```ts
// @plat/kernel — the only writers of any arena. `tx` is the open KernelTx (declared or callback form, §3.3); write ops charge its work count.
// Writers (level = tx.level; semantics §3.6)
insertChain(tx, points: Point[], roles: RoleRow[], cls: 'mandatory'|'optional', opts?: { closed?: boolean;
  pinned?: number[] /* chain indices exempt from decimation (§3.6 step 1); it does not set the kernel pinned flag, which only pinVertices sets */;
  knots?: { index: number; role: RoleName; ordinal: number; entity?: Id /* default: the chain's own entity (a knot); another entity for a vertex role such as a bridge's deck_end or a gate's gate_end */ }[] /* every vertex role row the chain's own vertices take */ }): KernelResult<ChainInsert>
interface ChainInsert { placed: VertexId[] /* one per input point, in input order: the vertex the point became after snapping, attraction and sharing (§3.6); valid until the next commit — S11's first wing carry reads it (§2.6) */ }
splitThrough(tx, at: HalfEdgeId, p: Point, row?: RoleRow /* a vertex role row the placed vertex takes — e.g. a cut end's anchor contact name; an `anchor` row given without an ordinal gets its ordinal from the kernel (§3.3 rule 2); any other indexed row must carry its ordinal, an assertion otherwise */): KernelResult<VertexId>   // a vertex on an existing edge, placed by §3.6's placement rule; a Steiner vertex when the edge is coarser (§2.2 rule 3)
removeEdges(tx, ref: ChainRef | EdgeSetRef | StretchRef | VertexRef): KernelResult<void>   // strips (role, entity) from the ref's edges — a StretchRef's only, after cut knots at its ends (below) — or, for a VertexRef, that vertex role row; deletes edges left with no role; then re-levels and dissolves by §2.2 rule 3, so removing a lane that ended on a spine restores the spine exactly and removing the street a neighbour step served returns the plot-line end it promoted to its level
clearFiner(tx, faces: FaceRef, level: Level): KernelResult<Conflict[]>     // removes content finer than `level` inside the faces, subject to kept content and — with tx.clearRegion — to clear-region rule 1 (§3.3); kept content stays silently; re-levels and dissolves as removeEdges does; locked or pinned owners are returned, not removed
retypeEdges(tx, ref: ChainRef | EdgeSetRef | StretchRef, add: RoleRow[], remove: RoleName[],
            rekey?: { from: Id; to: Id; profiles?: { from?: ChainProfile; to?: ChainProfile }[] /* both entities' profiles, paired by knot role */ })
  : KernelResult<{ profiles: { knotRole: RoleName; from?: ChainProfile | number | string; to: ChainProfile | number | string }[] }>
  // the EVO conversion primitive (wall → way) on role sets; an added row coarser than an edge of the ref is E_LEVEL, and `remove` re-levels as removeEdges does.
  // `rekey` moves the ref's (role, from) rows, knot rows and vertex roles to `to` (for a StretchRef, the stretch's, its ends being the cut vertices),
  // renumbering each entity's knots from 0 in chain order; at every vertex where the moved edges meet edges that keep `from` it first
  // cuts each profile there (cut knots), and at every vertex where they meet edges already carrying `to` it joins them (§2.2 rule 5);
  // it returns both entities' new profiles — a scalar where a part has no knots left — which the caller writes into both records in the same edit
setOwner(tx, faces: FaceId[], owner: Id): KernelResult<void>
splitFace(tx, face: FaceId, cut: Point[] /* a bent cut is 2–3 vertices */): KernelResult<[FaceId, FaceId]>   // children ordered: left of the directed cut first (§3.6)
connectHole(tx, face: FaceId, cut: Point[]): KernelResult<FaceId>          // outer ring → hole slit: same face count, one hole fewer (§3.6)
mergeFaces(tx, a: FaceId, b: FaceId): KernelResult<FaceId>                 // deletes shared partition edges only; a structural shared edge → E_STRUCTURAL
absorbSliver(tx, face: FaceId, floor: { minWidthCm: Cm; minAreaCm2: number }): KernelResult<FaceId>   // never deletes a structural edge (§3.6)
claimSubFace(tx, claim: { ring: Point[] } | { areaCm2: number; within: FaceRef | FaceId[] /* as corridorUnion takes: S7b passes a district's coarse faces less its wall_strip faces, §4.5 */; score: RasterRef }, owner: Id): KernelResult<FaceRef>   // may span several faces (a reservation that crosses coarse faces, a precinct, a bailey)
radialSplit(tx, face: FaceId, apex: Point, raysCdeg: number[]): KernelResult<FaceId[]>   // a fan from a centroid or a vertex (groves, chapter houses)
ringBand(tx, face: FaceId, widthCm: Cm): KernelResult<{ band: FaceId[]; core: FaceId }>  // an inner band around a court (cloister, quadrangle)
corridorUnion(tx, l1Faces: FaceRef | FaceId[]): KernelResult<BandResult>   // the corridor use of bandUnion: L2 half-corridor strips, junction wedges and built blocks for those L1 faces only (§3.7); kept faces inside them are holes (§3.3)
bandUnion(tx, chains: { ref: ChainRef; halfWidthCm: Cm | ChainProfile; ends: 'round'|'square' }[], faces: FaceId[], edgeRole: 'kerb'|'band', owner: Id): KernelResult<BandResult>   // the axis chain splits the band per side; corners get corridor_split; a profile is sampled per segment end (§3.7)
warp(tx, field: DisplacementField, fromLevel: Level, region: Point[], recordCheck?: (step: MoveReport) => boolean /* the edit layer's check of the records standing on the moved ground — held point records (§7.4) and carried wings (§2.6); false fails the step's validation */): KernelResult<MoveReport>   // the edit layer computes the field from a WarpStroke or a moveVertex (§7.1), the smoother from a smoothing pass; semantics §3.6
pinVertices(tx, refs: VertexRef[]): KernelResult<void>                    // sets the kernel `pinned` flag — the only writer of it: smoothing, simplification and cutting keep the vertex, warp does not (§3.6); released only as §2.2 rule 3 (b) states
// Services (read-only; values, never arena slots that outlive a commit)
resolve(ref: FaceRef | ChainRef | EdgeSetRef | VertexRef, key: ArenaKey): Resolved   // current slots, stamped with the arena's key and version — valid until that arena's next commit (a debug build asserts both, below)
resolveVertexAt(key: PlatKey, at: LatticePoint, sig: VertexSig, carry: CarryMap /* §6.3's supersedes table: old address → successor */): { vertex: VertexId } | { orphaned: true; nearest?: LatticePoint }   // a log position → a vertex, never by distance alone (§2.2 rule 5)
signature(key: PlatKey, v: VertexRef | LatticePoint): VertexSig             // what an edit stores beside a position
sampleProfile(p: ChainProfile, owner: Id, key: PlatKey, atCm: Cm | 'perVertex'): number[] | string[]   // a knot profile sampled by arc length along the owner's own-level route
kerb(face: FaceId /* L1, committed or in the open overlay */): KernelResult<Ring[]>   // §3.7's kerb: what corridorUnion commits
booleans(op: 'union'|'intersection'|'difference'|'xor', a: Ring[], b: Ring[], fill: 'nonzero'|'evenodd'): KernelResult<Ring[]>
tileRings(rings: Ring[] /* world lattice rings, counter-clockwise, in the caller's clip order (§2.6) */): KernelResult<Ring[][]>   // the seed clip (below): per input ring its pieces — the faces of one overlay of all the rings that it contains and no ring before it contains, united — counter-clockwise, none where the rings before it cover it
buffer(chains: Point[][], halfWidthCm: Cm | Cm[] /* per input point of these transient chains */, joins: 'round'|'square'|'miter', ends: 'round'|'square'|'flat'): KernelResult<Ring[]>
offsetFace(face: FaceId, perEdgeCm: Cm[]): KernelResult<Ring[]>             // face − ⋃ buffer(edgeᵢ, dᵢ)
insetRing(face: FaceId, dCm: Cm): KernelResult<Ring[]>                      // uniform; half-plane path only for a face checked convex (§3.7)
skeleton(rings: Ring[], use: 'roof'|'spine'|'regions'): KernelResult<Skeleton>   // §3.8: validated output (arcs, nodes with offset times, the face of each input edge) or a typed downgrade
simplify(chain: Point[], minSegmentCm: Cm, minAngleCdeg: number, obstacles: Ring[], pinned: number[]): KernelResult<Point[]>   // Visvalingam–Whyatt, topology-preserving: refuses a removal whose new edge would touch or cross another edge of the ring, its face's other rings or an obstacle (checked in the index), or that would move a pinned vertex
hexLattice(region: Ring[], spacingCm: Cm, jitterCm: Cm, rng: Stream): { points: Point[]; adjacency: Int32Array }   // S4's routing lattice with adjacency by construction
obb(ring) · hull(points) · lir(ring, axes) · sideRuns(face, turnTolCdeg): Run[] /* maximal boundary runs with chord directions */ ·
sampleBoundary(face, stepCm) · pointLocate(key: ArenaKey, level, p) · faceNeighbours(key: ArenaKey, face, level) · area2(ring) · area2Big(ring) · orient(a, b, c)
regularFit(ring: Ring): KernelResult<RegularFit>   // the ring's best-fit regular polygon (below): §4.8's castle repair and §7.1's `equalize` brush read it (item 45)
interface RegularFit { n: number /* the ring's vertex count */; centre: { x: number; y: number } /* the ring's area centroid, cm */; radiusCm: number;
  phaseCdeg: number /* the polar angle, about `centre`, of the fit's corner that the ring's lowest-leftmost vertex goes to */;
  targets: { x: number; y: number }[] /* per input vertex, in input order: its place on the fit, cm — values, never arena coordinates; a caller's warp field rounds them at its step (§3.6) */;
  compactness: number /* 4π·A ÷ P² of the ring */ }
```

`insertChain` is the only door for new edges in a plat (a transient arena's opening builds its input rings as exact
topology, below); `removeEdges` and `clearFiner` the only doors for removing them;
`insertChain`'s vertex rows (`opts.knots`) and `splitThrough`'s `row` the only doors for adding a vertex role row (with
`retypeEdges`' `rekey`, which moves rows between entities); `removeEdges` on a `VertexRef` the door for stripping one
(an S8 portal whose lane is removed, §4.6; a tower `wallToWay` removes, §4.11); and `warp` the only door for moving
existing vertices (a `moveVertex` edit is a `warp` whose field displaces one vertex, resolved by `resolveVertexAt`, and
smoothing of committed geometry is a `warp` whose field the smoother computes from the chain's current vertices). Every
other writer is built from these, which is why planarity, `minEdge`, clearance and the kept-content rule are
properties of this list rather than of every stage (§3.10). Each op has documented preconditions, work local to the
touched faces, a typed result, a declared operation count and fuzz tests with constructive degeneracies (§13.1).

`sideRuns` gives stages a side notion that survives curved, round-joined kerbs (maximal runs within a cumulative
turning tolerance, each with its chord direction), which the bent cut needs (§4.6). `setOwner` and `retypeEdges` are
the calls §6.3's succession uses: when a re-derivation hands a carried address to a successor, the same batch re-owns
the successor's faces and roles under that address, so geometry and address always move together. `buffer`'s
per-point half-widths apply only to the transient chains a caller passes in (a stroke being previewed, a skeleton
arc); a stored chain's varying width is always a `ChainProfile`, sampled by `kerb` and `bandUnion` (§2.2 rule 5). A
chain that carries a profile is inserted with its knots (`opts.knots`: the chain index of each knot vertex with its
knot role and ordinal); a knot that attraction lands on an existing vertex is carried to that vertex, so the profile
keeps its knot. A chain cut into parts owned by different entities, a ring opened, or two chains joined go through
`retypeEdges`' `rekey`, which inserts and drops cut knots by §2.2 rule 5, renumbers each entity's knots in chain order
itself and returns the new profiles.

**The regular fit (item 45; J-A45.31).** `regularFit` is the one computation of a ring's best-fit regular polygon, so
the castle repair (§4.8) and the `equalize` warp brush (§7.1) cannot drift apart. It reads the ring counter-clockwise
(a clockwise ring in reverse) from its lowest-leftmost vertex p₀ through p₁ … pₙ₋₁; takes as centre c the ring's
area centroid, summed from `area2`'s shoelace terms on bounding-box-relative coordinates in that order and divided
through `ratio()` (§3.2 (6), (8)); forms the first Fourier component a = (1 ÷ n) · Σₖ (pₖ − c) · e^(−2πik/n), each
vertex read as a complex number and the terms summed in ring order; and returns the radius |a|, the phase arg a and,
for every vertex, its target tₖ = c + a · e^(2πik/n). That is the regular n-gon about c whose corners lie nearest
the ring's own in the least-squares sense, vertex k going to the fit's k-th corner; the targets do not depend on
which vertex is read first (starting one vertex later turns a by one step of 2π ÷ n and every target stays put), so
the fixed start fixes only the summation order. Taking the area centroid, rather than the vertices' average, keeps a
side cut into many short edges from pulling the centre. Cosines, sines and the phase come from `dmath` (§6.5 (2)) and
lengths from `Math.sqrt`, exact by specification, so every host returns the same doubles; `compactness` is
4π·A ÷ P², A from `area2` and P the summed side lengths. The service is O(n), reads no arena and writes nothing: a
caller moves vertices toward their targets only through `warp` (§3.6) — whose rounding, whole-step validation,
halving and held vertices apply — or, for a ring not yet committed (a castle claim at S3), by building the moved ring
and inserting it as any claim; a vertex the caller pins (§4.8's pinned vertices: an `on_enceinte` claim's weld pair and,
once the gate is fixed, the two corners of the claim's side that holds the town-side gate) gets no displacement, while every
target is still computed from the whole ring. Degenerate input is refused as §3.1's row states. Fixture: §13.1.

**Stretches (J-K31).** Every operator edit on part of a chain names the part by a `StretchRef` (§2.2 rule 5) and
hands it to `removeEdges` or `retypeEdges`, so it passes through the listed doors and their invariant coverage. The op
resolves the ref at the batch's current state: each end must be a vertex of the chain — named by a vertex role or by
its lattice point — and both must lie on one part of it, else `E_DEGENERATE` with detail `stretch`; an end finer than
the chain is first promoted to the chain's level (`W_PROMOTED`, listed in the commit record; its `split` flag cleared),
because it becomes an end of the remaining parts. `removeEdges` then gives each remaining part of a profiled chain a
cut knot at the stretch's end on its side (§2.2 rule 5) before the stretch's rows and its interior knot rows leave, so
every remaining sample is unchanged; `retypeEdges`' `rekey` cuts at the two ends as at any cut vertex. A removal that
would leave a linear entity in more parts than it declares fails role consistency at commit (§3.10), so an operator
that cuts a way in two first hands the far part to a new entity with `rekey` on that part's `StretchRef`. A cut end
that is not yet a vertex is placed first by `splitThrough`, with the vertex role row the operator wants on it (an
`anchor` contact name, given without an ordinal, §3.3 rule 2). Fixtures: §13.1.

**Arenas, keys and services (J-A12.32).** Every writer acts on the arena its transaction's `key` names, and every
service that reads an arena takes it by key: `resolve`, `pointLocate` and `faceNeighbours` an `ArenaKey` (a `PlatKey`,
or a transient arena's `TransientKey`, below); `resolveVertexAt`, `signature` and `sampleProfile`, which read a plat's
role rows, a `PlatKey`. The arenas share no topology (§2.2 rule 2), so an op handed a slot of another arena is a
programming error: every slot a caller holds comes from a result stamped with its `ArenaKey` and arena version
(`Resolved`, a query result, a commit record, `ChainInsert.placed`), valid until that arena's next commit (§2.2 rule 5),
and a debug build carries each such slot as a handle stamped with both and asserts, wherever the slot is passed, that
its key is the arena the call acts on — the transaction's `key` for an op and for a service handed a slot alone (`kerb`,
`offsetFace`, `insetRing`, `sideRuns`, `sampleBoundary`, which read the open transaction's arena and are called only
inside one), the `key` argument otherwise — and that its version is current, as `resolve` already asserts the version; a
cross-arena link is an entity id, never a slot. A stage on one arena reads another through the services alone and never
writes it: the underground stage tests what it lays against the ground by `pointLocate` and `resolve` on the ground's
`PlatKey` — what it tests, and what excludes a sample, are II.7.3's surface constraint (item 12) — and a sky island's
shadow footprint is the same query the other way.

**The underground layer's several arenas (item 65; J-A65.31).** An arena is one planar subdivision: its faces never
overlap, and two of its chains that cross share a vertex (§3.6's insertion; §3.10: no two edges cross), so
inside an arena every crossing is a junction. Underground systems that pass over or under one another without
meeting — a catacomb gallery beneath a sewer main, an undercity's chamber below the tunnels, a quarry's workings beneath
a catacomb's galleries — therefore never share an arena: each is its own part of the `underground` layer, keyed
`{ layer: 'underground', part }` (§2.2's `PlatKey`; the sewer network is part 0, II.7.2; a further system's part number
is allocated once, when the system is first created, and is never renumbered or reused — it is part of its entities'
keys and addresses (§2.1, §6.3) — which system takes which number is II.7.6's), and inside one part depth stays per
entity (J-A12.45), because what shares a part may meet. The kernel adds no operation for this: J-A12.32 holds across
the parts as between the ground and the underground. A transaction writes the one part its `key` names; a stage that
derives one system reads the ground and every other part only through the services, by key — a catacomb laid under a
churchyard reads the ground's faces there, and where a link to another system can land is a `pointLocate` in that
system's part; a place where two systems meet, or a stair or shaft that joins them, is a record naming one vertex in
each part by its role (II.7.6's link, as `AccessPoint` names a ground point and a kerb vertex, II.7.4), never a vertex
two arenas share. Every entity's faces, chains and vertices lie in the one part its `Identity.key` names (§2.8), so a
`FaceRef`, `ChainRef` or `VertexRef` resolves in one arena — with one exception, a link between two parts (II.7.6's
`UndergroundLink`, §2.7), whose two `link_end` vertices lie one in each part it joins, each end naming its part
(`{ part; at }`) so that `resolve` reads it with that part's key, and each placed or stripped by a transaction on that
part alone; a grouping that spans systems — an undercity neighbourhood and its outskirts, the plots along the sewer
tunnels that lead into it (II.7.5) — is a link between records in different parts, never one entity with faces or chains
in two arenas. Each part has its own index partitions (§3.3), snapshot block (§3.9) and level digests under §6.2's
per-arena `plats` node, and a system's derivation opens transactions on its own part alone, so re-deriving one system
leaves the ground and every other part byte-identical (§3.10's arena-isolation row) but for the `link_end` vertices of
the links that end on it: the connection stage (II.7.6) re-derives those links, placing, keeping or stripping each far
end by one transaction on each part it touches — a link whose element has no successor is removed, its far `link_end`
row stripped by `removeEdges` on its `VertexRef`, which, by §2.2 rule 3, dissolves the vertex and restores the edge it
split unless other geometry has met the vertex since.

**Transient arenas (J-A28.31).** The composition rungs — a stage-3 `compose()` and the plan's storeys, one at a time
(§2.6) — partition rings that are no plat faces: rooms cut into the L4 arena would enter its index partitions and the
model digest on every click, so a click would change the model (§4.1, §6.2). They cut on a **transient arena**
instead: a one-level scratch subdivision on the world lattice under §3.2's numbers, §3.6's insertion rules and
§3.10's invariants, opened for one derivation call and gone at its end.

```ts
type TransientKey = { transient: true; owner: Id /* the entity whose derivation opened it */; n: number /* per call, never persisted */ };
type ArenaKey = PlatKey | TransientKey;   // what KernelTx.key and CommitRecord.key name (§3.3), and what `resolve`, `pointLocate` and `faceNeighbours` accept; `resolveVertexAt`, `signature` and `sampleProfile` read a plat's role rows and take a `PlatKey`
transientArena(owner: Id, seed: Ring[] /* world lattice rings, counter-clockwise, tiling: interiors pairwise disjoint, two rings meeting only along sides or at vertices — tiled wings share each joint's vertices by §2.6's wing-carrying rule 1, while a vertex one ring has on another's side splits that side (below) */,
               fixed: { ring: Ring; owner: Id }[] /* world lattice rings, counter-clockwise — faces made before any cut and never cut by one, each inside one seed ring (a room never spans a joint between wings), interiors pairwise disjoint, a ring that coincides with its seed ring allowed: a stair core's bay, a hearth's chimney stack, a spanned passage's room (item 30), a composer's room (a hall, a tower's round room: §2.6's `Composition.rooms`) less any stair bay or chimney stack standing in it (§2.6: the contract of stage 3) — and, on a re-cut, the rooms §2.6's interior ladder keeps (item 28 (f)) */,
               workLimit: number): KernelResult<TransientKey>   // E_DEGENERATE (detail 'seed' | 'fixed' | 'overlap') names the offending vertex — for 'overlap', a vertex of the offending ring; the construction moves nothing
readBack(key: TransientKey): { faces: { ring: Ring; holes: Ring[]; owner: Id | null; fixed: boolean }[];
  edges: { a: LatticePoint; b: LatticePoint; left: number; right: number | 'outside' /* face indices in this result */;
           seed?: { ring: number; side: number } /* the seed ring whose side the edge lies on with that ring's interior on its left — for a joint, whichever of its two rings lies on that side — and which side of it (by that side's first vertex index) */; joint: boolean /* on a side two seed rings share */ }[] }
release(key: TransientKey): void
```

Its L0 faces are the seed rings and then the `fixed` rings, each a face of its own, inserted as exact topology the way
§3.9's load inserts stored chunks: a lattice point two rings share is one vertex, a side two rings share is one edge
(the wall at the joint between two wings — an interior wall of the building, never a `party` wall, §2.6), a vertex
within the hot pixel (0.71 cm) of another ring's side splits that side there, and no attraction moves any of them; an
input ring that would break `minEdge`, clearance or simplicity is refused with `E_DEGENERATE` (detail `seed` or `fixed`)
naming the vertex, which F-PLAN's tier 1 takes (§5.2), so a planner places an anchor on a wall or at least `minEdge`
from it. Seed rings that overlap, and a fixed ring that crosses a seed ring's side, lies outside the seeds' union or
overlaps another fixed ring, are refused with `E_DEGENERATE` (detail `overlap`): two input sides that cross are refused
where the construction meets them, and it then labels every face with how many seed rings and how many fixed rings
contain it, by the booleans' winding walk (§3.7), so a face inside two seed rings, a face inside a fixed ring and no
seed ring or inside two fixed rings, and a fixed ring whose inside is more than one face are found exactly, in one walk.
A caller whose wings overlap (§2.6 rule 4 (iii)) passes them clipped to tile by `tileRings`, the **seed clip**: the
faces of one overlay of the storey's rings on the arrangement (§3.7's boolean machinery), each face going to the first
ring in the order passed (§2.6's clip order) that contains it and each ring's faces united. Each ring is thereby minus
every ring before it — a ring the earlier ones cover has no piece, one they cut in two has two — and every ring, an
earlier one included, carries each crossing vertex the overlay placed on its sides, so the joints are shared sides
vertex for vertex, and the overlay moves no vertex where the rings keep §2.6's composition contract (at least
`attractCm` apart except at their joints). A piece left with a hole — earlier rings lying inside a later one without
reaching its sides — is refused (`E_DEGENERATE`, detail `overlap`, naming a vertex of the hole), because a seed is one
ring. §2.6's clip order puts a contained wing after its container, and a composed tower wholly inside a wing before
that container only where an earlier wing the tower overlaps carries its cut to the container's sides, so the refusal
marks a caller's bug (F-PLAN, §5.2). The opening's exact
insertion is the one way edges enter a transient arena other than through its face partitioners, as §3.9's load is for a
stored plat (J-A28.34). The seed rings' and the fixed rings' edges are the arena's **fixed edges**: `mergeFaces` refuses
to delete one (`E_STRUCTURAL`) and `absorbSliver` never deletes one — a sliver bounded only by fixed edges stays a face,
`W_SLIVER_RETYPED` (§3.6) — and no writer moves a vertex there — a wall moves by `mergeFaces` and then `splitFace` at
its new line (the plan's `moveWall`, §7.1), so `warp` is not offered — which is what makes §3.10's seed-tiling row hold
by construction. Its batches are §3.3's transactions, their fields as §3.3 fixes them for a transient arena (either op
form, the caller's `workLimit`); its writers are the face partitioners of this list — `splitFace`, `connectHole`,
`radialSplit`, `ringBand`, `mergeFaces`, `absorbSliver`, `setOwner` — with `booleans`, `offsetFace`, `insetRing`, `obb`,
`lir`, `sideRuns`, `skeleton`, `faceNeighbours` and `area2` as services on its faces; `insertChain`, `splitThrough`,
`removeEdges`, `clearFiner`, `retypeEdges`, `claimSubFace`, `corridorUnion`, `bandUnion`, `warp` and `pinVertices` are
not offered on it. It has no static partitions (its dynamic grid serves every query), no stage ranks, no kept content,
no role rows beyond the owners the caller sets, no `PlatKey` and no entity; it is never persisted (§3.9), digested
(§6.2) or frozen (§3.3), and no slot of it outlives `release`. `readBack` returns rings and edges as values in §3.3's
canonical order, so the caller's records — the plan's storeys, rooms, walls and openings (§2.6) — depend on the input
rings and the op sequence alone, whichever worker cut them. A caller may plan its cuts on a coarser module of its own
(the plan rung's wing-local module, a table row, §2.6): the module is the planner's grid, never a second lattice — every
point enters through `snap` and the placement rule, so a cut's ends lie on the fixed edges within the hot pixel of their
input sides (below) and the tiling holds exactly. Opening costs O(seed vertices) and each op what this list states, on
tens of vertices per storey; §12.7's stage-3 rows count it.

**The input sides are the arena's routes (J-A28.34).** A side of a seed or fixed ring as passed is an **input side**,
and no split changes it: it is the route of every fixed edge on it, as a plat's coarser route is the route of the
Steiner vertices a finer batch places on it (§2.2 rule 3), and the arena's grid holds it as one route-edge item, its box
the side's padded by the hot pixel (§3.3). That route is read by placement and by its grid item and is never the unit of
an answer: a query and `readBack` return each of the arena's edges as an item of its own — a grid hit on an input side
expanding into its pieces that meet the query's box (§3.3) — keyed by §3.3's canonical key read on that edge's own
endpoints, every vertex of the arena being of its one level, so no two edges share a key and an edge on more than one
input side needs no choice between them. Every vertex a face partitioner places on a fixed edge — a cut's end, a ray's,
a band's cross edge's — is therefore placed by §3.6's placement rule against the input side that edge lies on, never
against a sub-edge an earlier split left: the rule's test (i) reads that side's line, and on an edge that lies on more
than one input side it reads each: a joint lies on two, a fixed ring's side along a seed side on two, a fixed ring's
side along a joint — a kept room's, or the passage room's (a span ring, both seed and fixed, §2.6) — on three, and two
fixed rings' sides back to back across a joint on four. So every vertex on a fixed edge stands within the hot pixel of
the line of each input side it lies on, however many walls end on that side, and a kept ring's vertices meet the
construction's split test when it re-enters (below).

**A re-cut is the same call (item 28 (f); J-A28.33).** The plan derived again for new occupants under §2.6's interior
ladder opens a fresh arena from the same seed rings — the shell that item 31's geometry floor fixed (§4.11) — passes as
`fixed` rings the rings §2.6's re-cut rule fixes (the stair core's bay, the chimney stacks, the passage room, the
composer's rooms, each less a bay or stack it holds, and the rooms the ladder keeps), and cuts the rest; after item 18's mutation the seeds are the mutated
shell's rings, and a room is kept only where its seed ring — its wing's extent at that storey, clipped to tile — is
unchanged (§2.6's kept-room rule). A kept ring re-enters exactly on the lattice points it left with and keeps its
polygon: every vertex unmoved and in order, any vertex a new wall adds lying within the hot pixel of one of its sides
(§3.6's placement rule). Its vertices on a seed ring's side or on another fixed ring's side lie within the hot pixel of
that side's line (the routes above), so the construction splits the side at each of them. It was valid in the arena that
read it back, and the only geometry beside it that can differ is such a side straightened — by at most the hot pixel —
where an unkept wall ended on it, so the exact insertion accepts it unless that straightening brings the side within
`minEdge` of one of its vertices, which is refused as above (J-A28.34). Nothing of an earlier cut is edited, because no
arena outlives its call: the model derives the plan as a chain of least-disruption steps (§2.6's canonical chain,
J-A28.26; §7.3), each step its own open, cut and read-back, counted by §12.7's plan row. The seed rings never change
with the occupants, so the interior changes while the shell cannot — §3.10's seed-tiling row holds on every re-cut as on
the first cut. The unit-door rule of §2.6 (its §5.3 check) reads `readBack`'s edges: a door's edge has the unit's room
on one side and a circulation face or `outside` on the other.

=== REPLACE ### 3.7 One geometry engine on every host — booleans, buffers and the kerb on the arrangement ===
### 3.7 One geometry engine on every host — booleans, buffers and the kerb on the arrangement

**Decision (GEO-9, DEF-2; J-K4).** Booleans, buffers, per-edge insets and bands are built on the kernel's own
arrangement — the machinery of `insertChain` on a scratch overlay — and no second geometry engine ships (the one
exception is the pre-decided fallback below). A boolean overlays both operands' rings, labels every face with its
winding numbers (a breadth-first walk from the unbounded face that adds each crossed edge's ring orientation), keeps
the faces the operation and fill rule select (non-zero or even-odd, declared per call), and removes the edges that
separate two kept faces; an empty result is `E_DEGENERATE` with detail `empty`. A buffer is the union of per-segment
strips and per-vertex join discs: round joins as chords of at most 2 cm sagitta (about 27 chords per full circle at a
3 m radius), square ends where declared (gates, bridgeheads); where the half-width varies along a stored chain it is
sampled from the chain's knot profile at each segment's two ends and the segment's strip is the trapezoid between them
(§2.2 rule 5). Every output takes and returns integer coordinates and is produced by the same insertion rules as every
other chain, so it obeys the same attraction, placement, `minEdge` and clearance (GEO-35) with no re-snap round trip,
and on every host it is the same TypeScript code producing the same integers — no host can compute a different town.

**The kerb, defined once (GEO-20).** For an L1 face F, `kerb(F) = F − ⋃ buffer(spineᵢ, half-widthᵢ)` over F's bounding
spines, each half-width sampled from the width the spine's linear entity declares — a way's width profile (§2.4); on the
underground layer a sewer tunnel's corridor half-width, `widthCm ÷ 2 + wallCm` — half its bore plus its wall (`Tunnel.widthCm`,
II.7.2's profile row) — and another system's gallery's, `Gallery.widthCm ÷ 2 + Gallery.wallCm` (§2.7; their defaults
from its system's row, II.7.6) — with round joins on the union's convex side and square ends where declared; the union's
concave corners — the block corners at junctions — are sharp by construction. `corridorUnion` commits exactly this
geometry at L2: the kerb rings as `kerb` edges; the spine inside the band, already an L1 edge, splits it into the two
half-corridor strips; a `corridor_split` edge from each junction vertex to the kerb corner separates the junction wedge;
on a side where the spine passes straight through a junction vertex (a T-junction whose street arrives from the other
side) there is no kerb corner and no wedge: one `corridor_split` edge from the vertex to the foot of its perpendicular
on that side's kerb separates the half-corridor strips of the spine's two sub-edges (§2.2 rule 1) — the edge II.1 (3)'s
neighbour step inserts alone into a finished neighbour's strip; the faces outside the band are the built blocks. A finer
face an earlier stage made inside F is kept (§3.3): it must lie wholly inside one resulting L2 face, and a kerb or
`corridor_split` edge that would cross one or come within `attractCm` of it returns `E_KEPT`. The one-click order leaves
none inside the faces S9 bands — a wall's band, setback and glacis parts are built after S9 inside their own L1 strip
faces (§4.7 S10 (0), §4.8) — and a strip ends at the corridor of the way through each gate, so every gate passage stays
open by construction. `kerb` is also a read-only service on the faces of an open transaction's overlay: S8 plans every
cut on `kerb(F)` of the current L1 faces, inserts each accepted lane at L1 in its own district transaction and recurses
on the children's kerbs; S9 then commits `corridorUnion` for those L1 faces — the same function on the same inputs — so
the block S8 cut and the block S9 keeps are one face (tested, §13.2). Because a way's width is a knot profile, the
T-junction S8 inserts into a crossed spine (§4.6 step 7) adds a vertex that carries no knot and changes no half-width,
so the two sides of that contract read the same widths. `corridorUnion` takes a set of L1 faces and re-derives only
those, which is also how an edit re-derives the corridors around a changed street. The per-edge half-plane inset of the
2017 idea survives only as `insetRing`, for a uniform inset of a face whose convexity is checked exactly (`E_NON_CONVEX`
otherwise; an inset larger than the inradius returns `E_DEGENERATE` with detail `collapsed` and the last non-empty
distance); per-edge distances on any face use the buffer difference (`offsetFace`), so a concave, mixed-class face — the
usual face of organic growth — has one correct construction, and a 2° kink between a 6 m and a 3 m half-width no longer
lets the wider offset govern ≈ 86 m of the narrow edge. Wall bands, glacis, tower and gatehouse footprints use
`bandUnion` with the `band` role: the wall chain, already an L1 edge, splits the band, so a band is a `FaceRef` of
per-side L3 parts and never straddles its L1 edge. **The same functions on every arena (J-A12.31).** `kerb`,
`corridorUnion` and `bandUnion` take the arena from the transaction's `key` (§3.3) and a chain from its `(role, entity)`
row, so they run on the sewer network's part of the underground layer (part 0, §3.4) on `tunnel` chains as on the
ground's `way` chains; a sky island's arena needs nothing of its own (its ways are ways): `corridorUnion` over that
part's L1 faces commits each tunnel's band — its bore plus a wall on each side — as its two half-corridor strips with a
junction wedge at every tunnel junction, and the faces between the bands as that part's built blocks (that part's level
mapping is §2.2 rule 1's; which of those blocks is plotted, and how deep, is II.7.3's); the band's outer ring, the
tunnel's external wall, is the `kerb` edge every underground frontage plot's lines end on (§4.7 S10's frontage-first cut
on that kerb), so a plot stands flush against the wall by construction (item 12; the frontage rule and its invariants
are II.7.3's (U1–U3) and §5.3's). **One cut for every underground part (item 65; J-A65.32).** On the other systems'
parts (§3.4) `corridorUnion` commits each gallery's or walkway's band from the half-width its `Gallery` record declares
(the kerb above), as it commits a tunnel's, and the faces between the bands are that part's blocks (which of them are
plotted is II.7.5's and II.7.6's, as II.7.3 decides it for the sewer); a **chamber** — a void wider than a band (a
cavern hall, a quarry chamber, an undercity's main chamber) — is a closed chain carrying the structural `chamber_wall`
role (§2.2 rule 7), inserted by `insertChain` (`closed`) at the part's L1 (§2.2 rule 1's underground mapping), so the
chamber's floor and the rock around it are separate L1 faces; the outline declares no half-width, as a shore declares
none, so its own edge is the kerb a plot on the floor may end on, and a walkway laid across the floor is a gallery chain
like any other, banded by `corridorUnion`; S9–S11 then cut the floor's faces as they cut a ground L1 face. A place where
two parts meet is a record, never a band (§3.4). No arena-specific band operation exists.

**Oracles, not fallbacks — compared where the comparison means something (J-K19).** Clipper2 (compiled to
WebAssembly, run in Node) and `polygon-clipping` are dev dependencies of `@plat/testkit` only; no product bundle loads
either unless the M0 speed fallback below fires. Our engine attracts features closer than `attractCm` onto each other
and the oracles do not, so B-FUZZ splits every boolean and buffer case by what our engine reports for it:
* **unattracted cases** — the operation reports no `W_ATTRACTED`, `W_STRETCH_SHARED`, `W_WEDGE_ROUTED` or `W_PLACED`,
  so nothing moved beyond the hot pixel: our result and each oracle's must have **equal face counts after both are
  snapped** (zero-area faces dropped) and a **symmetric-difference area of at most the perimeter × 1 cm**, the perimeter
  being the summed boundary length of both operands;
* **attracted cases** — the thin, near-collinear and near-touching inputs §13.1's random family and constructive set
  deliberately include: our result must pass every hard invariant of §3.10, and its symmetric difference from each
  oracle must be at most the perimeter × √2 · `attractCm` (≈ 36.8 cm), the farthest any boundary point can move under
  attraction, placement or wedge routing (a wedge-routed tip sweeps at most half a `minEdge` per unit of arm length);
  face counts are not compared, because merging features closer than `attractCm` is the designed difference.

The harness's draw count, which keeps the strict comparison from being vacuous, is §13.1's. There is no runtime
fallback, so no host produces a different model hash and no fallback path needs a budget (SCL-22). The generation report
names the engine that ran — the arrangement engine, `plat-arrangement@<version>` (§5.4); an engine change: §6.5 (7).

**Confirmation at M0 and the pre-decided fallback.** M0 (a) measures (i) differential correctness on 10⁶ fuzzed and
constructive inputs per operation — 0 crashes, 0 invalid outputs, and the split oracle agreement above — and (ii) speed:
S9's corridor bands over the CITY face set against §12.4's S9 row and **one district ≤ 3 ms on reference hardware**, and
**S11's geometry share** against its §12.4 row on B-CITY-lite's S11 workload. S11's geometry share is every kernel call
S11 makes for one plot — the base outline builder's frontage-band intersection or OBB / LIR fit (§2.6, §4.7), per-edge
setbacks by `offsetFace`, the yard partition's splits and the footprint's insertion into the block's L4 batch — the
geometry part of S11's single §12.4 row, whose remainder is S11's rule evaluation (the designation template, heights,
materials, entrance), so this bar cannot pass while the stage misses its row. Criterion (i) has no fallback: a failure
there is a kernel bug, fixed before M1, and with the split comparison it tests only what the design promises. If (ii)
fails after one optimisation pass, the shipped engine becomes **Clipper2 compiled to WebAssembly as the only engine on
every host**: its outputs still enter the arena through `insertChain`, so attraction, placement, `minEdge` and clearance
still hold; WebAssembly becomes a stated requirement of the embed contract (§11); a host that cannot instantiate it
receives §11.2's `E_ENGINE_UNAVAILABLE` — never a different town; and the switch is a declared golden shift whose shift
records name every stage that reads a boolean, buffer, inset or band (S1 outline repair, S3 reservations, S8 kerbs, S9
corridors, S10 step (0)'s wall and margin bands, S11 footprints, S12b greenery faces). Clipper2 does not reproduce the
arrangement engine's integers, so §6.5 (10)'s cross-implementation byte-identity test applies to the WebAssembly
accelerator only, and Clipper2's determinism check is §6.5 (9)–(10)'s cross-host digest identity.

**No WASM kernel (DEF-13; J-K8).** The kernel is TypeScript on every host. M0 (a) measures its per-op costs against
§12.4's rows — insert + snap + attract + re-walk per growth proposal (S5), `splitFace` per bent cut (S8), and the band
and S11 costs above. **What a miss triggers**, for each hot loop after one optimisation pass:
* a miss by **more than 2×**: that loop — and only that loop — is compiled from the same integer algorithm into a
  WebAssembly accelerator behind the kernel façade;
* a miss by **up to 2×**: the measured cost is carried into its stage's row of §12.4; if that pushes the row over its
  budget the accelerator is built for the loop as above, and otherwise the measured cost replaces the row's figure as a
  **declared budget amendment** (recorded in §12.4 and in the M0 record, with the critical path re-summed);
* an accelerated loop that still misses, or a re-summed critical path above its rung's p95 (§12.3), re-declares the
  model budget at the measured p95 as a D-18 amendment for the owner's veto — the same path the fusion gate uses (§16).

The accelerator must pass §6.5 (10)'s cross-implementation test byte-identically on the golden suite (§16's M0 exit
names this rule), and the TypeScript loop stays in every bundle, so a host without WebAssembly is slower and never
different.

=== REPLACE ### 3.10 Kernel invariants — what is checked, when, and at what cost ===
### 3.10 Kernel invariants — what is checked, when, and at what cost

| invariant | class | scope (when checked) | how |
|---|---|---|---|
| every coordinate is a lattice point inside the range invariant | hard | at `snap` | by construction (§3.2 (7)) |
| no edge shorter than `minEdge`, whichever writer made or moved it (insertion, boolean, buffer, offset, smoothing, warp) | hard | batch-local | the commit record's new edges and moved edges — every edge incident to a vertex in its `moved` list, Steiner re-seats and slides included (§3.3, §3.6) |
| clearance: every vertex lies at least `minEdge` from every edge outside its one-ring (the edges incident to it or to its neighbours); acute corners inside the one-ring are governed by `minFaceAngle` and the class floors | hard | batch-local | new, placed and moved vertices and their incident edges against the index |
| one vertex per lattice point: no two vertices share a lattice point | hard | batch-local | by construction for insertions (coincidence is attraction); the moved vertices against the index for a `warp` or smoothing step |
| faces simple except declared antennae; no two edges cross | hard | batch-local | touched faces |
| nesting: every face of level n + 1 has exactly one parent at level n, and each of its boundary edges is of level n + 1 or a sub-edge of a level-≤ n edge | hard | batch-local | touched faces and re-parented kept faces, by index — never by coordinates |
| placement bound: every vertex a batch places, re-seats or slides onto a coarser edge lies within 0.71 cm of that edge's route at the edge's own level when it is placed (a later same-level change of the route moves no finer vertex, §3.6); on a transient arena every vertex a batch places on a fixed edge lies within 0.71 cm of the line of each input side the edge lies on — its route, which no split changes and no writer there moves, so the bound stands for the arena's life (§3.4) | hard | batch-local | the placed, re-seated and sliding vertices |
| level consistency: every edge's birth level is the lowest level among its role rows; no vertex is coarser than every edge and vertex role at it; a vertex finer than an incident edge lies inside that edge's run — its incident edges coarser than it are exactly two, of one level, with identical rows of that level (§2.2 rule 3) | hard | batch-local | the commit record's new, changed, demoted and removed edges and the vertices at them, and its promoted and demoted vertices |
| held vertices: no vertex of a `warp` or smoothing step's held set moved (§3.6) | hard | batch-local | the commit record's `moved` list against the held set |
| prepared contacts: a clear-region batch met finer geometry only at its `KernelTx.prepared` vertices, promoted exactly those, stripped their `anchor` contact names, and shared no finer edge (§3.3, §3.6) | hard | batch-local | the commit record's `promoted` list against the resolved prepared set, and its new edges' birth levels |
| kept content: no finer face made by a stage before the batch's `rederivesFrom` — nor, in a clear-region batch, any finer face outside the region — was cleared, crossed, split or re-owned (moves keep nothing, §3.6) | hard | batch-local | the stage ranks and region test of the commit record's removed and changed finer faces (§3.3) |
| role consistency: every role the registry declares linear (`way`, `wall`, `shore`, `tunnel` …) forms, per entity, the connected simple chains or rings the entity declares; no structural role is lost by an absorption or merge | hard | batch-local | the commit record's role keys |
| every stored reference resolves — each `FaceRef`, `ChainRef`, `EdgeSetRef`, `VertexRef` held by a live entity finds geometry, every indexed role of §2.2 rule 7's registry other than a knot role finds exactly one vertex or edge set per ordinal (a link's two `link_end` ordinals each in the part its end names, §3.4), every `ChainProfile`'s knots lie on its chain in ordinal order with at least one knot per ring, and no geometry carries a dead entity | hard | stage end, save | the reverse indexes |
| frozen base complete: at every pool freeze, after the freeze has rebuilt each static partition whose grid or tombstone set was not empty (§3.3 pool step 1), every level's dynamic grid and every partition's tombstone set is empty — every item lives in a static partition the copy carries | hard | at the freeze, at every pool size | two counts per level, O(levels), after the rebuild |
| index levels and freshness: a batch wrote no index of a level coarser than its own, except the promotions and demotions it made, and left no static item of what it deleted, re-levelled, changed or moved to another partition unfiltered — each is tombstoned in the partition its home entry named and its successor lives in the grid of its current level (§3.3) | hard | batch-local | the commit record's index writes against its level and its `promoted` and `demoted` lists; each deleted, re-levelled, changed or re-partitioned item that had a static copy found in the tombstone set of the partition that held it (in a pool worker, the overlay's set for that partition) |
| pool scope: no district overlay wrote outside its district's scope; no two overlays, and no concurrent eager write, touched one base record | hard | at the pool merge | the overlays' copied-record lists against each other and against the live arena's changes since the freeze (§3.3) |
| arena isolation: a batch wrote only the arena its `key` names, and no vertex, edge or face of one arena references a slot of another — the arenas (the ground, each part of the underground layer, each sky island) share no topology and every cross-arena link is an entity id, a link between two underground parts included (§2.2 rule 2; the services read any arena by its key, §3.4) | hard | by construction; debug-build assertion | each slot passed to an op or service checked in a debug build against the key and version it was stamped with (§3.4); the multi-arena stages' property tests, the underground reroll-isolation fixture and its per-part twin among them (§13.2) |
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

=== J-ROWS ===
| J-A65.31 | several arenas on the underground layer — a `PlatKey` part per system that may pass over or under another without meeting, its number allocated once and never reused — with J-A12.32 carried across the parts and every entity's geometry in one part (a link's two ends excepted, one vertex in each part), over grade separation inside one arena (amends J-A12.45 for systems; depth stays per entity inside a part) | §3.4, §3.10 |
| J-A65.32 | every underground part cut by the same functions: galleries' and walkways' bands by `corridorUnion` from their `Gallery` records, a chamber as a closed outline chain at the part's L1 whose floor S9–S11 cut; no underground-specific operation | §3.7 |
| J-A81.31 | a frame grows at an epoch, never shrinks, by three single-level batches sharing one clear region — an L1 batch clearing the whole L1 faces beside the old chains' lapsing stretches or under the new rectangle, an L0 batch inserting the new ring with S1's water and stripping the old ring, an L1 batch inserting the new rectangle and stripping the old one — over two batches that delete without clearing; the rasters extended on their own grids, the re-grid the M4 fallback | §3.2 |

=== RATIONALE-A ===
| J-A65.31 | Chose to let the underground layer hold several arenas — a `PlatKey` part per system that may pass over or under another without meeting, the sewer network keeping part 0 and each further system taking a number allocated once at its creation and never renumbered or reused, because the number is part of its entities' keys and addresses — and to carry J-A12.32 across them unchanged (a transaction writes one part; a stage reads the ground and every other part by key; a meeting of two systems, or a stair or shaft joining them, is a record that names one vertex in each part; every entity's geometry lies in the one part its `Identity.key` names (a link's two ends excepted, one vertex in each part), and a grouping that spans systems — an undercity neighbourhood and its outskirts along the sewer tunnels — is a link between records in different parts, over one entity with faces in two arenas, which would give `Identity` a second key and every reader of a reference a choice of arena), over grade separation inside one arena (a crossing vertex that joins nothing, or faces allowed to overlap where their depths differ), because every kernel guarantee — faces that never overlap, every crossing a vertex, nesting checked by index, `minEdge` and clearance tested against the index — rests on an arena being one planar subdivision, so an exception for depth would have to be carried through every writer, query and invariant, while a separate part costs only its index partitions, snapshot block and level digests and keeps a re-derivation of one system from touching another beyond its links' far ends; it amends J-A12.45's "one underground arena" for systems and keeps its depth per entity inside each part (§3.4, §3.10; item 65 (a), (d), (e); the kernel's confirmation asked by ruling 1 of the route's item 65; amendments-c, kernel seat). |
| J-A65.32 | Chose to cut every underground part with the functions the ground and the sewer already use — `corridorUnion` over galleries and walkways with the half-width their `Gallery` record declares, as J-A12.31 reads a tunnel's, and a chamber as a closed outline chain at the part's L1 whose floor S9–S11 cut like a ground L1 face, the outline declaring no half-width as a shore declares none — over an operation of their own for voids or galleries, because item 65 (e) asks for the surface's engine underground, because the band and chain machinery already makes a gallery's wall the kerb its frontage plots end on and a chamber's floor a face the plot model can divide, and because a second construction would bring a second attraction and placement behaviour to test (§3.7; item 65 (b), (e); amendments-c, kernel seat). |
| J-A81.31 | Chose to grow a frame at an epoch, and never shrink it, by three single-level batches that share one clear region — an L1 batch that clears the content finer than L1 of every whole L1 face beside a lapsing stretch of the old margin ring or border rectangle (one that carries no other row of its chain's level or a coarser one) or under the new rectangle, an L0 batch that inserts the new outer ring and S1's continued water, then strips the old ring's `margin` rows, and an L1 batch that inserts the new frame rectangle and strips the old one's `border` rows — over one L0 batch writing both chains, and over two batches that strip and delete without clearing, because §3.3 allows one level per transaction and the border is an L1 chain (§2.2 rule 1), and because the levels are views of one arena (§2.2 rule 2): an edge deleted with finer faces along it would join each of them, at every finer level, with the ring's face — all of them into one face whose one owner leaves the others' references resolving to nothing (§3.10) — while the new rectangle lies inside the old arena whenever the grown frame's side is under 1.6 times the old one's (a CITY of 25 km² crossing to METROPOLIS at 30 000 people grows to 38.4 km², a 6.2 km side inside the old 8 km arena), so it would cross finer faces; clearing whole L1 faces first is the clear-region rule a carve's footprint follows (J-I10) and hands the stages whole faces to re-derive — the hinterland's, whose siting reads the frame anyway (§4.9). Chose to delete the lapsing stretches over keeping the old chains as lines, because an old margin kept at L0 would split the land of the L0 view, which stays land and water only (§2.2 rule 3 (a)), and one kept at L1 would need an untyped line of the kind J-DET-14 declines and would stay drawn across the countryside. Chose to extend each raster on its own grid, its cell size kept, over re-gridding it at the new rung's resolution, because re-gridding moves every stored height under the standing fabric; the cost is a finer grid than a town made at the new rung — at the extreme, a TOWN grown in one epoch to the cap keeps its 5 m heights over the cap's 393 km² arena, ≈ 15.7 M cells (≈ 63 MB), where a METROPOLIS made there holds ≈ 3.9 M (≈ 16 MB), and its 16 m `hydro` grid ≈ 1.5 M cells (≈ 14 MB at 9 B a cell) where the METROPOLIS's 32 m grid holds ≈ 0.38 M (our count, PLAUSIBLE until M4 measures it) — so M4 measures that case and the re-grid is the pre-decided fallback (§3.2 (9); item 81 (b); VKC-02, VPR0-07, VD0-27; the kernel seat's finding 9; amendments-c, repair-kernel-r1). |

=== END ===
