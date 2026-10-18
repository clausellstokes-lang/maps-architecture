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

**Transient arenas (J-A28.31).** The composition rungs — a stage-3 `compose()` and the plan's storeys, one at a time
(§2.6) — partition rings that are no plat faces: rooms cut into the L4 arena would enter its index partitions and the
model digest on every click, so a click would change the model (§4.1, §6.2). They cut on a **transient arena**
instead: a one-level scratch subdivision on the world lattice under §3.2's numbers, §3.6's insertion rules and
§3.10's invariants, opened for one derivation call and gone at its end.

```ts
type TransientKey = { transient: true; owner: Id /* the entity whose derivation opened it */; n: number /* per call, never persisted */ };
type ArenaKey = PlatKey | TransientKey;   // what KernelTx.key and CommitRecord.key name (§3.3), and what `resolve`, `pointLocate` and `faceNeighbours` accept; `resolveVertexAt`, `signature` and `sampleProfile` read a plat's role rows and take a `PlatKey`
transientArena(owner: Id, seed: Ring[] /* world lattice rings, counter-clockwise, tiling: interiors pairwise disjoint, two rings meeting only along sides or at vertices — tiled wings share each joint's vertices by §2.6's wing-carrying rule 1, while a vertex one ring has on another's side splits that side (below) */,
               fixed: { ring: Ring; owner: Id }[] /* world lattice rings, counter-clockwise — faces made before any cut and never cut by one, each inside one seed ring (a room never spans a joint between wings), interiors pairwise disjoint, a ring that coincides with its seed ring allowed: a stair core's bay, a hearth's chimney stack, a spanned passage's room (item 30), a composer's room (a hall, a tower's round room: §2.6's `Composition.rooms`) — and, on a re-cut, the rooms §2.6's interior ladder keeps (item 28 (f)) */,
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
`attractCm` apart except at their joints). A piece left with a hole — an earlier ring wholly inside a later one — is
refused (`E_DEGENERATE`, detail `overlap`, naming a vertex of the hole), because a seed is one ring. §2.6's clip order
puts a contained wing after its container, so the refusal marks a caller's bug (F-PLAN, §5.2). The opening's exact
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
composer's rooms and the rooms the ladder keeps), and cuts the rest; after item 18's mutation the seeds are the mutated
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

=== RATIONALE-A ===
| J-A28.33 | Chose to give item 28 (f)'s interior re-cut no operation of its own — a re-cut is the ordinary `transientArena` call opened from the same seed rings (the shell that item 31's geometry floor fixed), with the rings §2.6's re-cut rule fixes (the stair core's bay, the chimney stacks, the passage room, the composer's rooms and the rooms the interior ladder keeps) passed as `fixed` rings and the rest cut, each step of §2.6's canonical chain (J-A28.26) its own open, cut and read-back — over a `repartition` operation that edits a kept arena, and over the route's "kernel: no new text", because no arena outlives its call (J-A28.31), so there is nothing to edit; a kept ring re-inserted exactly on the lattice points it left with keeps its polygon, its vertices unmoved and in order (the exact insertion of J-A28.34), which makes the least-disruption promise a property of insertion rather than of a new operation; the seed-tiling row then covers every re-cut without a new row, so the owner's "same building geometry but not the interior" is a checked invariant, not a convention; and the model seat, which runs next, needs the kernel form of a re-cut stated where the arena is defined, or it could assume a mutable arena against J-A28.31 (§3.4, §3.10; item 28 (f); amendments-b, kernel seat; restated by repair-kernel-r1 after verify-kernel-r0's VK-02 and VK-12; its fixed list aligned with §2.6 by repair-kernel-r3 after validate's VK2-03). |
| J-A28.34 | Chose to build a transient arena's input rings as exact topology — a lattice point two rings share one vertex, a side two rings share one edge, a vertex within the hot pixel of another ring's side splitting that side, no attraction — refusing with `E_DEGENERATE` (detail `seed`, `fixed` or `overlap`) a ring that would break `minEdge`, clearance or simplicity and any overlap, which one winding walk finds; to require seed rings that tile, a caller whose wings overlap passing each clipped against the wings before it; and to require each fixed ring inside one seed ring — over inserting the rings as `mandatory` chains under §3.6's attraction, as J-A28.31 first chose, and over accepting overlapping seeds, or fixed rings anywhere in the seeds' union. Attraction would move a kept room on a re-cut: an earlier cut may split a vertex onto a wall 25.29–26 cm from its corner (§3.2 (2)), and re-inserting it would move it onto that corner, so J-A28.33's promise that a kept room re-enters unchanged would fail for a share of rooms; a refusal is typed and caught by F-PLAN (§5.2) where a silent move would change a kept room. Overlapping seeds would count their overlap twice in the tiling check, enclose it in fixed edges no merge may delete (a forced room) and make `readBack`'s seed tags ambiguous; a fixed ring across the joint between two wings would be split by it into two faces, although a fixed ring is a face no cut divides. The construction is a second door for edges beside `insertChain`, confined to a transient arena's opening as §3.9's load is to a stored plat. Every vertex a face partitioner places on a fixed edge is placed against the input sides that edge lies on, as passed — the input sides are the arena's routes, as a plat's coarser route is for the Steiner vertices on it — over placing it against the sub-edge an earlier split left, because on a one-level arena each sub-edge would be its own route, and same-level splits of a rotated side then drift its later vertices beyond the hot pixel of the straight line, where the construction cannot split the side when a kept room re-enters and refuses the room (a model of §3.6's rule: one side in nine split four times, worst 1.6 cm, `docs/validation/bench/amendb_verify_kernel_r1_drift.out`; placed against the input side, no vertex beyond the hot pixel, no failed search and no refused kept corner over 400 000 splits, `docs/validation/bench/amendb_repair_kernel_r2_routes.out`). The input side is the route that placement and the grid read, never the unit of an answer: a query and `readBack` return and key every edge on its own endpoints, over keying a fixed edge by the input side it lies on, because one side carries every wall segment that ends on it and an edge can lie on two to four input sides, so a key read on the side would tie those segments and have no one value for such an edge, while an edge's own endpoints — every vertex of a one-level arena being of its level — give §3.3's total key. Overlapping wings are clipped as the faces of one overlay of the storey's rings, each face going to the first ring in the caller's clip order that contains it (`tileRings`), over one `booleans('difference', …)` per ring, because separate overlays leave an earlier ring without the crossing vertices a later one gains and can place a T's second crossing off the bar's straight side (1.3 % of cases, worst 1.06 cm), refusing a valid building's seeds; one overlay gives every ring each crossing vertex, so the joints are shared vertex for vertex. A piece left with a hole — an earlier wing wholly inside a later one — is refused, because a seed is one ring; the plan rung's clip order puts a contained wing after its container, which takes the enclosed rooms (§2.6), so the refusal marks a bug. It amends J-A28.31's insertion and J-A28.33's claim that a kept room reads back byte-identical: a new wall ending on a kept room adds a vertex within the hot pixel of its side, so the room keeps its polygon — its vertices unmoved and in order — rather than its bytes (§3.4, §3.10; items 28, 28 (f); repair-kernel-r1 after verify-kernel-r0's VK-02 and VK-03; amended by repair-kernel-r2 after verify-kernel-r1's VK1-01 and VK1-10, and by repair-kernel-r3 after validate's VK2-01 and VK2-04). |

=== END ===
