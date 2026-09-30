# Blocks — lane retrovalidate/base/kernel (Fable validator, 2026-09-28)

Text before the first "=== " line is ignored by the assembler. Each REPLACE block is the complete current subsection of
docs/ARCHITECTURE.md (sha256 87588d34…, 17 297 lines — the design after the bundled amendment pass c + d + e and
its hand fix) with the changes docs/retrovalidation/base/kernel.md rules applied by script (scratch make_blocks.py:
every replaced passage asserted to occur exactly once in its subsection; every other byte carried over verbatim). Every
block is closed with "=== END ===" as soon as it is written (kill-safe).

**Supersedes** docs/retrovalidation/blocks-kernel.md (the paused first run of 2026-09-27, generated from the
pre-amendment text, sha 1c23190f…, whose subsections have since changed) and the §3 blocks of
docs/fable-review/main/blocks-kernel.md: this file carries every change of those files that the current text still
needs — J-Fkernel-1 (§3.6, §3.10), the §3.2 (2) bound, the §3.3 copy figure, the §3.7 chord floor, the §3.9 freeze
clause (J-RVkernel-1) — plus this seat's own (§3.1's CGAL parenthetical and `W_STEINER`, §3.2 (7)'s and §3.5's
`rect`, §3.4's `splitFace` comment, §3.6's setback floor). J-Fkernel-2's other identifiers and RV-kernel-3's
marching-squares row were applied by pass c (items 53 and the identifier route) and are not repeated. The assembler
applies THIS file and neither earlier one. Lines changed per block are listed in docs/retrovalidation/base/kernel.md.

=== REPLACE ### 3.1 Build-versus-adopt, per primitive ===

### 3.1 Build-versus-adopt, per primitive

| primitive | decision | candidate (licence) | degenerate input; where specified |
|---|---|---|---|
| lattice, snapping, attraction | **build** | — | §3.2 (numeric policy), §3.6 (insertion, contact and move semantics) |
| exact predicates | **build** `orient2d` (exact in doubles under §3.2 (1)); **adopt** `incircle` (J-K36) | `robust-predicates` **3.0.3, Unlicense** — licence confirmed against the public registry (`docs/validation/redteam-improve.md` §5.1), version pinned and re-checked by §17.4's licence checker on every upgrade; *pre-decided fallback* if a future version fails the checker: an in-house BigInt `incircle` (exact, slower) | `incircle` is the adaptive predicate and is never on the topology path; ties and float rules §3.2 (3), orientation and areas §3.2 (6) |
| planar subdivision (§2.2) | **build** — the core asset: **struct-of-arrays, allocation-free hot loops** (G-R7: in the profile of the NG 1.2.2 build, creating points (385–561 k calls) and intersecting lines (147–213 k) dominate) | — | transactions §3.3, insertion and slivers §3.6, storage §3.9, invariants §3.10 |
| polygon booleans; buffers, offsets, insets and bands | **build on the kernel's arrangement** (§3.7; J-K4) | Clipper2 (BSL-1.0) and `polygon-clipping` (MIT): CI oracles, shipped only under §3.7's fallback | §3.7 |
| straight skeleton | **build** (§3.8; J-K5, J-A21.31) | none adopted: no permissive, mature JS/TS skeleton that could be held to §3.8's numeric contract is known to this design; CGAL's is GPL, which §17.4's permissive-only production closure excludes (the module's licence stays the owner's, §17.3), and it fails the stack and one-engine grounds besides — a C++ library is not the TypeScript kernel every host runs (D-4; no WASM kernel, §3.7) and its doubles could not be made byte-identical to §3.8's validated construction | §3.8 |
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
type Warning = { code: 'W_ATTRACTED'|'W_STRETCH_SHARED'|'W_WEDGE_ROUTED'|'W_PLACED'|'W_PROMOTED'|'W_SNAP_PASSES'|'W_ACUTE_CORNER'|'W_SLIVER_RETYPED'|'W_HEIGHT_CLAMPED'|'W_DOWNGRADE'|'W_CUT_SLID';
  count: number; at?: LatticePoint };   // W_PLACED: §3.6's placement rule; W_PROMOTED: a finer vertex promoted (§2.2 rule 3) — prepared vertices and stretch ends included; W_CUT_SLID: §4.6 step 8 (c)'s slid always-succeeding cut, count = the slide's steps (J-Fredteam-1)
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
   `Int32Array`, which would store them silently as 0, 0 and a wrapped value (executed in GEO-7), so the null-rectangle
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
   end until §4.11 continues its way — and every other dissolves or stays by §2.2 rule 3. Every underground part — its
   outer ring the frame with its margin (the sewer's, II.7.2; each further part's, §2.2 rule 1) — grows by (a) and (b)
   on its own key, the `margin` rows of its own
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

=== END ===

=== REPLACE ### 3.3 The transaction protocol — batches, one level each, canonical order, indexes rebuilt at stage end ===

### 3.3 The transaction protocol — batches, one level each, canonical order, indexes rebuilt at stage end

```ts
interface KernelTx { key: ArenaKey /* a PlatKey, or a transient arena's TransientKey (§3.4) */; level: Level; ops: KernelOp[] /* declared form only: independent ops, applied in canonical order (below) */;
  expect: Invariant[]; onFail: 'reject'|'repair'|'downgrade'; batch: BatchScope;
  stage: StageId /* the stage whose code issues the batch */;
  rederivesFrom: StageId /* the earliest stage this batch re-derives (kept content, below): = stage in generation; the start of the edit's re-derivation for an edit (§7.3); the first stage of §4.1's order for a warp or smoothing batch, which keeps nothing (§3.6; J-K33) */;
  clearRegion?: Ring[] /* a coarse batch inserted into finished fabric, and its preparation batches: clearFiner acts only on faces meeting it (clear regions, below) */;
  prepared?: VertexRef[] /* with clearRegion: the vertices earlier batches of the same edit or stage placed for this batch's contacts with finer geometry (rule 2 below) — the only finer vertices it may meet (§3.6 candidate (c)) */;
  workLimit: number /* operations, from the stage's declaration (§4.1, §14) */ }
type BatchScope = { kind: 'stage'; stage: StageId } | { kind: 'district'; id: Id } | { kind: 'block'; id: Id } | { kind: 'edit'; edit: EditId }
  | { kind: 'entity'; id: Id /* a transient arena's batches (§3.4): the entity whose derivation opened it */ };
interface CommitRecord {                 // returned by every commit; kernel-internal slots, never persisted
  version: number; key: ArenaKey; level: Level;
  faces: { level: Level; created: FaceId[]; changed: FaceId[]; removed: FaceId[] }[];   // the dirty set, per level ≥ the batch's level
  edgesAdded: number; edgesRemoved: number; steinerAdded: number; steinerDissolved: number;
  moved: VertexId[] /* vertices a warp or smoothing moved, Steiner re-seats included: their incident edges are the "moved edges" of §3.10 (GEO-35) */;
  promoted: VertexId[] /* finer vertices whose birth level this batch lowered (§2.2 rule 3) — contacts, prepared vertices, stretch ends; the edit's undo record keeps their lattice points, former levels and flags and the anchor contact names promotion stripped (§7.4) */;
  demoted: { vertices: VertexId[]; edges: HalfEdgeId[] /* one half-edge per pair */ } /* birth levels this batch raised (§2.2 rule 3's demotion); the undo record keeps the former levels */;
  unflagged: VertexId[] /* vertices whose split flag or kernel pin this batch cleared other than by moving them — a prepared contact's or a stretch end's promotion, a broken run, a pin released by §2.2 rule 3 (b), an unmoved vertex beside which a move displaced its run (§3.6); the undo record restores the flags */;
  owners: Id[] /* entities whose faces changed */; roles: RoleKey[] /* (role, entity, ordinal) keys whose chains changed */;
  warnings: Warning[]; work: number }
```

A stage builds a transaction whose `batch` is one growth stage, one district's infill, one block's plot subdivision or
one edit; every insertion is part of a batch. A transient arena's batches (§3.4) use this protocol with `level` 0 (its
one level); `batch` `{ kind: 'entity' }` naming the entity whose derivation opened it; `stage` and `rederivesFrom` both
the stage id under which the opening rung draws its streams (§6.1), so no face on it is kept content; and no
`clearRegion` or `prepared`. The kernel applies the ops to a scratch
overlay, serves every query inside the batch from the level's dynamic grid plus the static partitions, validates the
batch-local invariants on the touched faces and their one-ring (§3.10), and commits or rejects atomically. Local
repair (§5) runs inside the transaction on the overlay; for a batch an edit's dry run has already validated, see §5.3.

* **One level per transaction.** A batch creates vertices, edges, owners and roles of its own level only, plus the
  Steiner vertices, promotions and demotions of §2.2 rule 3; it may clear finer content inside its faces (`clearFiner`,
  subject to kept content below), and a `warp` batch moves vertices of every level ≥ its own (§3.6); anything else is
  `E_LEVEL`. A lane that a finer stage would like to add to a coarser level is therefore a separate, coarser
  transaction (§4.7), never a side effect of a finer one; a stage that writes two levels (S3: its carvings at L0, its
  reservations at L1) issues one transaction per level, in the order of §4.1's batch table.
* **Kept content (J-K14).** Every face records the rank of the stage whose batch created it (`LevelFaces.stage`,
  §2.2; the rank is the stage's position in §4.1's topological order, fixed per generator version). A batch clears
  finer content inside its faces only where that content's stage rank is at least that of `rederivesFrom`; finer faces
  an earlier stage made are **kept** — neither cleared nor re-owned — and their edges and vertices are obstacles: an op
  that would cross a kept edge, split a kept face or bring new geometry within `attractCm` of it returns `E_KEPT`,
  except where §3.6's candidate (b) attracts onto and promotes a finer vertex on a route the chain ends on or joins.
  `E_KEPT` governs insertion and clearing only; a move keeps nothing (§3.6). The re-walk re-parents each kept face into
  the new face that contains it — a kept face never straddles a new edge, because crossing it is refused — so nesting
  holds. In generation `E_KEPT` cannot arise on a correct pipeline, because the stage order builds no finer face before
  a coarser stage that could meet it (the wall's band parts: §4.7 S10 (0), §4.8; the hinterland's L3 content: §4.9);
  the rule turns a wrong stage domain into a typed failure that the stage property tests catch (§13.2). In an edit it
  returns to the dry run as a conflict (§7.1). How a re-derivation rebuilds the wall and margin bands in its scope,
  never writing the other side: §7.3 item 2. `clearFiner` never removes kept content and never reports it as a
  conflict; only locked or pinned content is a conflict (§2.2 rule 6).
* **A batch's faces are the faces it names or creates**. A same-level split of an edge those faces share
  with faces outside the batch — the neighbour step's kerb split beside finished plots and footprints (II.1 (3)) — adds
  that vertex to the outside faces' rings; they are not the batch's kept content, they are neither cleared nor
  re-owned, and each ring equals its prior ring with the vertex removed (the seam exception, §4.6 step 7, §7.3 item 1).
* **Clear regions and prepared contacts (LC-7; J-I10, J-I12, J-I13, J-K24).** A coarse batch
  inserted into finished fabric — §4.11's carve of a canal, moat or basin, §4.4's outer moat, S1's water operator
  re-carving a reach (§7.3 (b)), an epoch's frame growth (§3.2 (9)) — would under the plain rule clear every finer
  face of its level-n faces, and an L0 face is a whole land component, so one canal would clear the town. Such an
  insertion therefore runs as a declared sequence of single-level batches that share one **clear region**
  (`KernelTx.clearRegion`): the edit's **footprint**, which the operator computes in its dry run (§4.11 for the carve
  and the outer moat; §7.3 (b) 2–4 for the re-carved reach; for the frame growth, the whole L1 faces §3.2 (9) names
  instead) — its new chains buffered (`buffer`, §3.7) by
  `attractCm` plus the clearance of the chain's class (for a channel, its bank setback), **united with every L1 cell the
  edit's way rule touches**: the cells that buffer meets, the cells bordering a stretch the edit removes or prunes or a
  kept way's replaced stretch, the cells a re-routed way crosses, and — where the edit re-traces a wall run — the cells
  bordering the old run or the strip-line stretches it removes with it and the cells the re-traced run's new strips
  will take. The footprint is exactly the union of those cells, since the buffer lies inside the cells it
  meets. The kernel's part is three rules:
  1. *Clearing.* `clearFiner` in a batch that declares a clear region removes each finer face whose interior meets the
     region — whole, never part of one — with the partition edges and vertices no remaining face uses, and nothing
     else; locked and pinned owners return as conflicts; every finer face that does not meet the region is kept
     content, whatever its stage rank. **Structural finer edges inside the region** — ways, walls, setback and glacis
     lines, deck spans — are kept unless a preceding batch of the same edit removed them: `clearFiner` removes
     partition content only, and the preparation (rule 2) re-lays or cuts every structural edge the coarse chain would
     otherwise meet (§4.11 batch (1), §7.3 (b) 3). The coarse batch itself clears nothing; it only splits the
     finer faces that meet the region (rule 3).
  2. *Preparation.* One or more batches at the finer level, issued first in the same edit or stage, clear the region
     (rule 1) and place **every** point where the coarse chain will meet finer geometry as a vertex named by role (§2.2
     rule 7): on each way the operator keeps across the new water, a deck's two bank vertices carrying
     `('deck_end', bridge, 0 | 1)` under a fresh `Bridge`, the way's stretch between them one straight edge — the deck
     span; on each wall run the operator re-traces across the new water (S1's water operator, §7.3 (b) 3; a carve that
     crosses a wall, §4.11; J-I13), its water gate's two bank vertices carrying `('gate_end', gate, 0 | 1)` under a
     fresh `Gate`, which the `Gate` record built afterwards names (§2.7); on the map's `border` line (§3.2 (9)), which
     must stay closed, its two bank points as `anchor` contact names, the border's stretch between them — one straight
     edge, or several where the water takes in a corner of the frame or a vertex an earlier edit left on it
     — left across the water unchanged, as a deck span is (the arena's outer ring is L0, so new water meets it at its
     own level); and on every other finer edge the new water will cross that is no way — a settlement-perimeter or
     other district-boundary stretch, a wall strip's setback or glacis line — its two bank points as `anchor` contact
     names, the stretch between them removed. A contact name is placed by `splitThrough` with its row given without an
     ordinal: the operator names the entity by §2.2 rule 7, and the kernel allocates that entity's smallest free
     `anchor` ordinal — from 2 on an enceinte, whose 0 and 1 name an open trace's ends — as the op applies, so in the
     batch's canonical op order (below), and no two vertices carry one anchor key (§3.10's one-vertex-per-ordinal
     check); the name lives until the coarse batch strips it (rule 3). A coarse chain never shares a finer edge, so a
     finer edge the new water would run along is cut back by the preparation like any lesser way; a way cut back beyond
     its bank setback — every lesser way, and a quay or landing, which the operator extends to the new bank only once
     the water exists, its end an ordinary Steiner vertex on the L0 bank (§4.11 batch (3)) — leaves no contact and needs
     no prepared vertex. Every stretch the preparation removes — a cut stretch, a pruned remainder, a kept way's
     replaced stretch, the stretch between two contact names — is removed through a `StretchRef` (§3.4), and a way left
     in two parts is first split by `retypeEdges`' `rekey` on its far part, so role consistency (§3.10) holds after the
     batch.
  3. *Contact.* The coarse batch splits the finer faces that meet the region (their records are re-walked and keep
     their owners until a later batch of the operator re-owns them), lists the prepared vertices in `KernelTx.prepared`
     and may meet finer edges and vertices only there: §3.6's candidate (c) attracts it onto each prepared vertex and
     promotes it. The finer edges at a prepared vertex stay as they are — kept outside the region, the preparation's own
     inside it — so each kept way's straight L1 edge between its two promoted bank vertices now lies across the new
     water as the `Bridge`'s deck span, carrying `deck` beside `way` (§2.2 rule 7), each re-traced run's edge between
     its two `gate_end` vertices is its water gate, and the border's stretch between its two contact points is the
     closed frame: no L0 edge crosses the water, no deck splits the water body's L0 faces, and the way stays one chain
     through every batch — the structure S1, S3 and S4 build at generation (J-I12). Any other contact with finer
     geometry is `E_LEVEL` inside the region and `E_KEPT` outside it, and returns to the dry run (in generation, to the
     stage's property tests). So a carve costs its footprint, not the town (the re-derivation that follows: §4.11 step
     4, §7.3 (b) 8).

  The carve fixtures of §13.1–§13.2 confirm these rules (M3a). *Pre-decided fallback* if a fixture cannot be met: the
  batch clears the finer content of its whole L0 land face and re-derives it (the plain rule — correct, slower);
  `moat: 'all'` is then carved only before S5c of the outer stage, where L1 holds only arterials, and an edit carve
  becomes a declared town-wide re-derivation with the fate report (§7.3).
* **Two op forms (GEO-11; J-K15).** A transaction takes exactly one of two forms, fixed by its stage's
  registration (§4.1, §14); a transaction that supplies both `ops` and a callback is a programming error caught by an
  assertion.
  * **Declared** — `KernelTx.ops` lists independent ops, none reading another's result (S3's carvings, S4's routed
    arterials, S7's strip lines and furniture, S9's `corridorUnion`, S11's per-plot footprints, an edit's inserted
    feature). Before applying, the kernel sorts them by a stable key — op kind rank, then the owning entity's lineage
    key (§6.3), then the op's index within that entity's stream path — so the committed arena is a function of the
    prior arena and the op *set*, not of the order in which the stage issued them. Hot-pixel snap rounding is
    order-independent; attraction, the one order-sensitive rule, is deterministic under the canonical order (the
    op-permutation test: §13.1).
  * **Callback** — `tx(tx, fn)` (§14) hands `fn` the open overlay; each op `fn` issues applies at once, in issue order,
    and later ops read its result. S5c's growth queue (each proposal tested against the streets already grown), S8's
    bent-cut recursion (each cut planned on the kerbs of the faces the previous cut made) and S10's plot subdivision
    (claims, per-frontage regions, strips, joins in sequence) are callback-form stages. The issue order is
    deterministic because it is a function of the stage's inputs, its streams (§6.1) and canonically sorted query
    results (below) — never of slot numbers, worker scheduling or arrival order — and attraction within the sequence
    follows it (the issue-order test: §13.2).
* **No output depends on slot numbers.** Every tie-break in the kernel uses lattice positions (y, then x), canonical
  item keys (below) or entity ids, never a `VertexId`, `HalfEdgeId` or `FaceId`, so an arena compacted on save, one
  grown through a long session and one merged from pool overlays give identical results for the same next edit (the
  slot-renumbering test: §13.1).
* **Work limits instead of clocks (GEO-2).** Every op charges operation counts to its transaction — points snapped,
  attraction queries, placement candidates tried, crossings resolved, faces walked, skeleton events — and a transaction
  that exceeds its declared `workLimit` returns `E_WORK_LIMIT`. Counts are identical on a slow and a fast machine, so a
  budget can select a ladder rung without changing what the seed produces.
* **The commit record** lists what the batch created, changed, moved, promoted, demoted and removed per level. It is the
  input of the batch-local invariants (§3.10), of index maintenance (below), of the display list's dirty set (§8) and of
  the digest update — at commit the kernel re-hashes the leaves the batch touched (the per-level plat digests and the
  entity leaves) and the nodes on their paths to the root (§6.2, whose budget this maintenance keeps). It is never
  persisted, because it holds arena slots. Commit granularity is part of every stage's declaration (§4.1), so the ≈ 48
  s hazard of per-insertion commits the engineering judge computed — and its per-batch twin — cannot arise.

**The derivation pool's overlays (J-K16).** The per-district stages that run in the pool (S10, S10b, S11, S12b;
§4.1) use these same transactions on **district overlays**, in five steps:

1. *The frozen base (J-K25).* When the eager S10a and S10's **shared-edge step (0)** have
   committed — the step runs on the generation worker and builds, on both sides at once, the bands around every L1 edge
   that two overlays' face sets share without corridors (step 3; §4.7) — step (0) ends as an eager stage does, by
   rebuilding the static L3 partitions its batches touched (a finer batch writes no coarser index, so L3 is the only
   level it touches). **At the freeze the generation worker first rebuilds every static partition whose dynamic grid or
   tombstone set is not empty** — none on the one-click path, where every stage has just ended with its rebuild; after
   edits (an epoch's per-district stages, a Re-derive from a stage at or before S10, a verification replay folding
   either), the partitions the edits left dirty, each holding at most max(256, ¼ of its static size) grid items —
   **and then asserts every level's dynamic grid and every partition's tombstone set empty** (§3.10). The rebuild is
   the stage-end rebuild's code on the partition's live items, so it changes no output, and it runs at every pool size,
   0 included (step 5). Measured with the same build (`docs/validation/bench/fixall_kernel_r4_bench.out` B): ≈ 2 ms for
   one district's L3 and L4 partitions, ≈ 10 ms for five districts', ≈ 6 ms for the arena-wide L1 partition with one L2
   partition, ≈ 59 ms for every partition of a finished CITY. Step (0)'s own rebuild covers every L3 item it made — at
   CITY ≈ 9 000 vertices, edges and faces (both sides of ≈ 6 km of perimeter margin band and of the wall's band,
   setback, glacis and tower parts; our count) in ≈ 26 partitions — and costs ≈ 2.3 ms at CITY and ≈ 5.8 ms at
   METROPOLIS by the measured build rate (`docs/validation/bench/fixall_kernel_r3_bench.out` A), carried in §12.4's
   S10 (0) row.
   The generation worker then freezes the arena at that version and sends each pool worker one read-only copy as
   transferred `ArrayBuffer`s — the vertex, half-edge, role and face arrays, the role-head and owner-head tables (typed
   arrays, §2.2), the index's home column and **every non-empty level's static index partitions** (L0–L3 at the
   one-click freeze, where L4 is still empty; L0–L4 at a freeze after edits) — so a pooled plot line that must end on
   the inner edge of a wall band, a setback part or a margin band, S12b's greenery in setback and glacis residue, and a
   pooled re-derivation's kept locked or pinned content are found by the same indexed queries as everything else. No
   `SharedArrayBuffer` is used (§11.2). **The copy's size** is the arena and its tables — at most ≈ 12 MB at
   CITY (§2.2 *Size*) — plus the partitions at 38.4 B per item and the home column at 2 B per slot: at the one-click
   freeze ≈ 60 000–90 000 items (the L0–L2 view and step (0)'s parts; our count, PLAUSIBLE until M1), ≈ 2.2–3.3 MB plus
   ≈ 0.2 MB of home column, so ≤ ≈ 15 MB per copy and one memory copy of 1.67 ms per worker (5.02 ms for three,
   measured, `fixall_kernel_r4_bench.out` A); at a freeze after edits ≈ 20 MB (≈ 0.5 MB of it home column; ≈ 2 ms each).
   §12.4 carries the copies on CITY's critical path and §12.8 counts one copy per pool worker. *Pre-decided fallback* if
   M1's memory measurement — or M4's, on the epoch path — exceeds the rung's line with these copies: a copy made after
   edits carries only what a pooled stage may read under the laziness contract (§4.1) — the L0–L2 partitions, every L3
   partition (step (0)'s parts are eager) and the L4 partitions of the districts the pool derives (their kept content);
   another district's footprints are lazy output that no pooled stage reads — and then §12.8's pool-shrinking step
   applies.
2. *One overlay per district.* A worker derives each district it is given on a fresh overlay over the frozen base. New
   vertices, half-edge pairs, face records and role rows — and the interned handles of the entities the district
   creates — go to the overlay's own growable arrays in overlay-local slots numbered above the base's high-water mark
   and are remapped at the merge; a change to a base record (a kerb edge split by a plot line, a face ring re-walked) is
   a copy-on-write record in the overlay; an item of the frozen partitions that the overlay deletes, re-levels or
   changes is tombstoned in a set the overlay keeps for that partition and consults with it (the copy's own sets are
   empty, §3.10), which step 4's district-end rebuild consumes — a pooled stage changes only its district's L3 and L4
   items. Every district starts from the frozen base alone, never from another district's overlay, so its result is a
   pure function of the base, its allocation and its own sub-stream, whichever worker runs it and whatever ran on that
   worker before.
3. *The scope check.* A district's face set is its L1 faces and every face nested in them. Its **scope** is every face
   of the set, every edge with a face of the set on both sides, every vertex whose incident faces all lie in the set,
   and — for a split only (a vertex placed on the edge) — every edge on the set's boundary whose other side no overlay
   writes (a water face, the arena's outer ring), with the vertex placed on it, so waterfront plot lines may end on
   their own bank. A write of any kind — a split, a retype, a role row, a move, an owner change — outside the scope
   returns `E_SCOPE`. The L1 edges two overlays' face sets share are therefore never written in the pool: a shared
   spine is flanked by corridors whose kerbs each side's lines end on (avenue and street-tree rows are `Greenery.along`
   records in the planting district's own half-corridor strips, not roles on the way, §2.7, §4.9); a shared **wall
   trace** gets its band, setback, glacis, tower and gatehouse parts from step (0) before the freeze (step 1); and every
   other shared L1 edge without corridors — the settlement perimeter between the districts and the hinterland, and any
   reservation boundary two districts share — gets from the same step a **margin band** (§4.5), so the pooled plot and
   furlong lines on either side end on the band's inner edge, inside their own set (J-I9). The **hinterland unit**,
   which the generation worker runs while the pool works, is one more overlay of this kind (§4.1, §4.9). Each overlay
   also lists the base records it copied; at the merge, two overlays that copied the same base record, or a copied base
   record that the live arena changed after the freeze, fail the pool with `E_SCOPE` — defence in depth that a test
   asserts never fires.
4. *The merge.* The generation worker applies the overlays in district lineage order (§6.3): each overlay's new records
   are appended with a slot remap table (overlay-local slot → next free arena slot), its copy-on-write base records
   replace their originals, references inside the overlay are rewritten through the remap table, and only that
   district's faces are re-walked to validate rings and parents. The district's L3 and L4 static index partitions —
   built by the worker at district end from the base partition's live items (step (0)'s parts in that district
   included) and the overlay's new ones — travel with the overlay, have their item tables rewritten through the same
   remap and replace the base's partitions with empty tombstone sets, the home column taking their items' partition
   numbers, so the merged arena needs no index rebuild. The overlay's added and changed role-head and owner-head keys,
   kept in the overlay's own small tables and consulted before the base's, are inserted into the live tables through
   the same remap; the district's digest leaves (§6.2) travel with it too, and the root is finalised once after the
   last overlay. The cost is O(overlay size): the ≈ 200 000 records S10–S12b create at CITY merge within §12.4's 8 ms
   merge row.
5. *Pool size 0.* The single-worker configuration runs the same overlay-and-merge path inside the generation worker,
   district by district in lineage order, so pool sizes 0–3 execute the same code on the same inputs and give identical
   digests by construction; the golden suite's pool-size test (§6.5, §13.2) confirms it on every run.

**Spatial indexes (SCL-2; J-K6).** Each level has (a) **static packed indexes** (`flatbush`), partitioned — one
partition per arena at L0–L1; at L2–L4 one per district plus one for everything outside districts (hinterland, margin)
— each with a tombstone set, and (b) one **dynamic uniform grid** (cell 25 m at L0–L1, 10 m at L2, 5 m at L3–L4; table
values) with O(1) insert and delete.

**What each level's index holds.** The items of that level (their current birth level): its
vertices; its **route edges** — each maximal run of that level's sub-edges between two vertices of that level or
coarser is one item whatever finer vertices later split it, its box the bounding box of the vertices standing on the
run when its level's batch writes the item, padded by the 0.71 cm hot pixel, and its handle the half-edge leaving its
lower (y, x) endpoint (a split keeps that pair on the part at that end, so the handle never changes); and its face
records. The run's box holds every finer vertex on it by construction: one placed afterwards lies within the hot pixel
of the route edge (§3.6's placement rule (i)), and one placed before stands in the box however the route has changed
since (§3.6's placement bound; J-K32) — the endpoints' box, padded alike, missed 38 of 400 753 finer vertices under the
placement rule's non-nearest choices and the run's box none (`docs/validation/bench/fixall_kernel_r4_checks.out` A). A
finer batch that splits a coarser edge with a Steiner vertex therefore writes only its own level's index — S10's step
(0) and every pooled stage touch only the L3 and L4 indexes — while a promotion or a demotion, the coarser batch's own
change of a route, moves the vertex or edge to its new level's index and rewrites the route-edge items of the levels
whose routes it changes: a promoted vertex makes the route edge it now splits two items, a demoted vertex joins its two
items into one, and a demoted edge leaves its old level's item for its new level's (§2.2 rule 3).

**No item changes in place (J-K34).** Every item a batch deletes, re-levels, changes or moves to another
partition — a deleted vertex, edge or face; a promoted or demoted vertex or edge; a route edge whose run a vertex of its
level joins or leaves (a same-level split, a promotion, a dissolution, a demotion) or a move reshapes; a vertex a move
displaces; a face whose ring at its own level a re-walk or a move changes; **an item whose partition changes** — every
L2–L4 vertex, route edge and face under an L1 face that a batch re-owns to another district or to or from the
hinterland (S6's regroup, §7.3), and a vertex on an L1 edge two partitions share when that edge's partitions change —
is **tombstoned** in the static partition its home entry names (`Plat.indexHome`, §2.2), if it has one — the entry then
reads −1 — and its successor, if any, is inserted in the grid of its current level; an item already in a grid is
deleted from it or replaced there. A static item is therefore either exact or filtered, and no query sees an item at
its old level, place or extent or in its old partition: a promoted-then-demoted plot-line end answers an L2 query not
at all and an L3 query once, and a regrouped block's plots answer once, whichever partitions were rebuilt in between; a
regroup leaves both partitions dirty, so the next freeze rebuilds both (pool step 1).

**Queries.** Inside a stage every insertion and deletion goes to the grid. A level-n query reads the static partitions
of levels ≤ n that its box intersects and their grids, drops each static hit whose item key its partition has
tombstoned, expands each route-edge hit into the pieces of its level-n route that meet the box, and returns the
vertices of level ≤ n, each level-n route edge once (as its sub-edge leaving its lower endpoint) and the level-n faces,
**sorted by the canonical key of each item kind, read on the query's level-n route**: a vertex by its
lattice position (y, then x); an edge by the positions of the two endpoints of its level-n route edge, the lower (y, x)
first, never by a sub-edge's endpoints; a face by the positions of the first two vertices of level ≤ n on its outer
ring — the lowest-leftmost vertex of level ≤ n and the next vertex of level ≤ n counter-clockwise, finer vertices
skipped, and where the ring visits that vertex twice the smaller of its two successors; in a mixed result vertices come
before edges and edges before faces. The key is total — no two vertices share a lattice point, no two level-n route
edges share both endpoints, and a face's key is one directed level-n route edge, which bounds exactly one level-n face
— so neither which structure holds an item nor whether a finer level has been derived changes any answer (a key read on
the full ring reverses two L3 plots once S11 derives L4 in their block, `docs/validation/bench/fixall_kernel_r3_checks.out`
C), and no implementation ever needs a slot to break a tie.

**Tombstones and rebuilds.** A tombstone is an item key — kind · 2³² + slot, the kind a vertex, a route
edge or a face — held in one set per static partition: the items deleted, moved to another level or partition, or
changed since that partition's build. Tombstones filter **that partition's hits only**: a new item — the next occupant
of a slot freed and reused inside the stage, or an item's successor — lives in the dynamic grid, which tombstones never
filter, so neither slot reuse nor a level change can hide it, and the stale static copy never answers (J-K34). A
partition's rebuild indexes the live items that belong to it — every item of its level in its arena at L0–L1; at L2–L4
the items of its district, a vertex on an L1 edge two partitions share going to the partition with the smaller key (as
§3.9's chunks do) — sets their home entries, removes them from the grid and empties its tombstone set. The home column
(2 B per vertex, edge-pair and face slot; ≈ 0.5 MB at a finished CITY) lets a batch tombstone an item without searching
the partitions. **Static partitions are rebuilt at three moments, never per batch:** (1) when a stage ends — an eager
stage once, after its last batch; S10's eager step (0) once, before the pool's freeze; a lazy or pooled per-district
stage, the district's own partitions after that district's run; (2) during an editing session, when a partition's grid
overflow exceeds max(256, ¼ of its static size) — a count, never an idle timer; (3) at every pool freeze, for the
partitions edits left dirty (pool step 1). Measured flatbush construction (`docs/validation/bench/bench_index.out`):
0.24 ms at 1 000 items, 2.3 ms at 8 000, 4.9 ms at 17 000 — at CITY about one L3 and one L4 rebuild per stage (≈ 7 ms
together), or ≈ 0.2–0.3 ms per district partition, where a rebuild per block or per plot commit would cost 1.9 s (S10)
and 13.4 s (S11). A single plot edit rebuilds at most its district's L3 and L4 partitions (≤ 1 000 items each, ≈ 0.5
ms), inside §12.6's plot-edit budget; §13.2's cost-model test fails if rebuild work grows with the number of commits.

=== END ===

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
splitFace(tx, face: FaceId, cut: Point[] /* a straight or bent cut is 2–3 vertices; a filleted bent cut adds its arc's chords (§4.6 step 6) */): KernelResult<[FaceId, FaceId]>   // children ordered: left of the directed cut first (§3.6)
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

=== END ===

=== REPLACE ### 3.5 Why this kernel closes the creators' failure classes ===

### 3.5 Why this kernel closes the creators' failure classes

| creator-admitted failure (via `docs/IMPROVEMENTS.md` O3 and the critics) | kernel answer |
|---|---|
| collapsed / intersecting edges on concave shapes (MFCG 87882877) | snap rounding, attraction and the clearance invariant; cuts are `splitFace` transactions with stated contact semantics, validated before commit (§3.6, §3.10) |
| silent no-op of the 2017 cut routine whenever a cut did not make exactly two crossings, and its unbounded recursion (`os-model.md` §13.4) | `E_NOT_TWO_CROSSINGS` under exact contact rules — vertex grazes, overlaps and antennae defined, slits are `connectHole` (§3.6); recursion bounded by the class band and a depth cap, every rejection logged (§4.6) |
| the null-OBB / null-rectangle crash (61026228) | one OBB contract (§3.1); `snap` rejects NaN, ±∞ and out-of-range values in every build; computed divisors go through `ratio()` (§3.2 (7)–(8)) |
| "two intersections with the same world position" (FTG 153121107) | exactly one vertex per lattice point; points within `attractCm` (26 cm) of a vertex or an edge are attracted onto it; near-coincident stretches are one shared edge with merged roles (§3.6) |
| stale graph state after edits breaking district re-roll (FTG 153121107) | no record outside the kernel stores an arena slot (§2.2 rule 5) |
| hourglass / sliver footprints (FTG 133016301) | the invariant suite — simple faces, clearance, class floors in width and area (§3.10); frontage-first construction (§4.7); sliver absorption that never deletes a street, wall or shore edge (§3.6) |
| self-intersecting user strokes breaking the server (FTG 2026-03) | `insertChain` decimates to `minEdge`, splits self-touching input into simple runs and validates at the authoring boundary (§3.6) |
| the NG 1.2.2 build's silent rotated-frame retries and its hole-aware bisector's two logged loops (a balance retry, up to 20 in random frames, then accepted; a restart when no far edge exists) (NG RA-3; P7) | the bent cut's declared ladder (§4.6 step 8), each rung under an operation-count work limit (§3.3): its first rung re-plans in a turned frame a bounded number of times, and no rung restarts anything above the face |
| boolean "thorns" (VG 50688261) | booleans and buffers on the kernel's own arrangement, under the same attraction, `minEdge` and clearance as every chain, with no re-snap round trip (§3.7) |
| "weird steps" of per-edge buffers and "not so much concave ones" for shrinking (2017 author, `os-geometry.md` §2.1.4) | one kerb function, committed by `corridorUnion`; the half-plane inset only for uniform convex insets (§3.7) |
| skeleton "glitches in special cases" (MFCG 101173551) | a stated numeric contract, exact OBB roofs for convex near-rectangles, a validator on every output and typed downgrades (§3.8) |
| identity-keyed topology, un-serialisable state (OS §1.1) | indexed arenas; each arena — one per `PlatKey` — serialised once (§3.9) |
| the allocation hot spot of the NG 1.2.2 build in creating points and intersecting lines (its profile, G-R7) | a struct-of-arrays kernel with allocation-free intersection and orientation routines (§3.1), measured in M0 |

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
checks it for moves. One consequence stages rely on: a setback within `attractCm` of its line collapses to zero (a
building front drawn 10 cm — or 25 cm — behind the kerb is attracted onto the kerb and shares it, steps 2–3), so a stage
that wants a visible setback draws at least `attractCm` + 1 cm = 27 cm, clear of §3.2 (3)'s borderline (the floor of
§4.7's `jitter.minM`).

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

=== REPLACE ### 3.7 One geometry engine on every host — booleans, buffers and the kerb on the arrangement ===

### 3.7 One geometry engine on every host — booleans, buffers and the kerb on the arrangement

**Decision (GEO-9, DEF-2; J-K4).** Booleans, buffers, per-edge insets and bands are built on the kernel's own
arrangement — the machinery of `insertChain` on a scratch overlay — and no second geometry engine ships (the one
exception is the pre-decided fallback below). A boolean overlays both operands' rings, labels every face with its
winding numbers (a breadth-first walk from the unbounded face that adds each crossed edge's ring orientation), keeps
the faces the operation and fill rule select (non-zero or even-odd, declared per call), and removes the edges that
separate two kept faces; an empty result is `E_DEGENERATE` with detail `empty`. A buffer is the union of per-segment
strips and per-vertex join discs: round joins as chords of at most 2 cm sagitta and never shorter than `minEdge`
(about 27 chords per full circle at a 3 m radius; below a radius of ≈ 40 cm the `minEdge` floor sets the chord count
and the sagitta grows, since §3.6 step 1 decimates shorter chords), square ends where declared (gates, bridgeheads); where the half-width varies along a stored chain it is
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

=== END ===

=== REPLACE ### 3.9 Geometry in the document — each arena stored once ===

### 3.9 Geometry in the document — each arena stored once

The snapshot's geometry (§2.9) is **one block per `PlatKey`, never one per level** (SCL-11, kernel part); a boundary
seen by several levels — a kerb, a plot line, a shore — is written once:

* **vertices** — live vertices in slot order (slots are compacted on save; nothing outside the kernel stores a slot and
  no output depends on slot numbers, §3.3, so renumbering is free), coordinates as delta + zig-zag varint `Int32` pairs,
  with their current birth levels (after any promotion or demotion, §2.2 rule 3) and flags;
* **edges** — one (origin, destination, birth level) triple per edge pair, the level being the current one (the lowest
  among the edge's rows, §2.2 rule 3); `next`, `prev` and twins are not stored;
* **roles** — (edge or vertex, role, entity, level, ordinal) rows, entities as document ids — the rows of every role
  §2.2 rule 7's registry marks indexed, the knot roles among them, included (an edit's `anchor` contact names never
  reach a snapshot: the batch that promotes them strips them, §3.3 rule 3), so every entity-held vertex and every chain
  profile survives the round trip without a stored position (§2.2 rule 5);
* **faces** — per level, one (boundary half-edge, owner, kind, stage rank) row per face; parents are not stored. The
  stage rank is persisted because the kept-content rule (§3.3) must decide the same way after a reload as in the
  session that made the face.

No per-level digest is stored (§2.9 step 3). The ordinal and stage-rank columns — 2 bytes per role row, 1 byte per face
— are ≈ 0.45 MB raw at CITY, almost all of it zero ordinals and a handful of repeated ranks that the document's
compression removes; §2.9's document-size test measures the result at M1.

**Chunks.** The block is written as content-addressed chunks (§2.9). Per arena, the **level-≤ 1 routes**
are one chunk: every vertex of birth level ≤ 1 and every L0–L1 edge as one (origin, destination, birth level) triple
between its level-≤ 1 endpoints, with its roles of level ≤ 1 and the L0–L1 face rows — so no finer Steiner vertex is
part of it. Each static-index partition (§3.3) is one chunk holding **the vertices that belong to it by §3.3's rebuild
rule**, its edges of level ≥ 2 (every district boundary is an L1 edge, §2.2 rule 1, so each lies in one
partition), the **Steiner splits** its batches made on L0–L1 edges — each as the coarser edge's route endpoints and the
split vertex, by lattice point, with the split vertex's level — the finer roles those batches added to the coarser
edges' sub-edges, and its face rows of level ≥ 2. **Every reference to a vertex another chunk holds is its lattice
point**, never (chunk, index): a vertex is unique per lattice point in its arena (§3.10); a vertex on an L1 edge two
partitions share — the foot of a wall- or margin-band cross edge (§4.7) — is written in the chunk of the partition
with the smaller key and named by its lattice point from the other. On load the kernel inserts the level-≤ 1 routes,
then each partition chunk in partition-key order — its splits first, sorted along each coarser edge by position, then
its vertices and edges — resolving lattice-point references through the one-vertex-per-lattice-point index; the
rebuild below then yields the same arena and per-level digests (they read routes, not slots), and save → load → save
holds chunk by chunk. So an edit that renumbers one partition's vertices rewrites that partition's chunk alone (an
item whose partition changes, §3.3, rewrites both chunks); the level-≤ 1 chunk only when it changes a level-≤ 1 route,
promotes a vertex into one, or demotes a vertex or an edge out of one; and, when it changes a level-≤ 1 route edge,
also every partition chunk that holds a Steiner split on that edge, because each split names its route edge by the
edge's endpoints (J-DET-36) — the partitions whose faces border the edge, which an edit that changes a
coarse route (a carve's or a water edit's footprint, a seam amendment's two districts) mostly re-derives anyway, and
which §2.9's rebased-size test at M2a counts, with §2.9's block-group fallback pre-decided.

**Load.** The kernel rebuilds `next` / `prev` by sorting each vertex's outgoing edges by exact angle (quadrant, then
`orient2d`), re-walks faces level by level, recovers each face's parent from its boundary edges and rebuilds the role
reverse index and the static index partitions: O(E log d), deterministic. The per-level digests are recomputed from the
rebuilt arena within the load's digest check (§2.9 steps 2–3). *Pre-decided fallback for §2.9's open-to-editable
bar:* each L2–L4 static index partition is rebuilt at the first query that reads it instead of at load, and every
partition not yet rebuilt since the load is built by the next pool freeze's rebuild pass before its emptiness assertion
(§3.3 pool step 1), so a frozen copy carries every partition (J-RVkernel-1) — output-neutral, because every query
result is sorted by its canonical key whichever structure holds an item (§3.3).
Entities carry no slots (§2.2 rule 5), so the entity table needs no remapping on load. The round-trip test is §13.1's;
the compact twin carries the same block (§11.1).

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

=== END ===

=== J-ROWS ===

| J-Fkernel-1 | no two vertices closer than `minEdge`, joined or not — a hard row, checked on a warp's moved vertices | §3.6, §3.10 |
| J-RVkernel-1 | under §3.9's lazy-partition load fallback, the pool freeze builds every partition not yet rebuilt since the load | §3.9 |

=== END ===

=== RATIONALE-A ===

| J-Fkernel-1 | Chose a hard vertex-separation row — no two vertices of an arena closer than `minEdge`, whether or not an edge joins them, checked on a warp's or smoothing step's moved vertices — over leaving the pair one vertex apart to the soft `minFaceAngle` floor alone, because insertion already keeps every pair apart by construction (a new vertex is attracted onto a vertex within `attractCm` or placed at least `minEdge` from every vertex around it, and no existing vertex moves), while a `pinch` on a corner with arms under ≈ 50 cm could close its far vertices below `minEdge` under the clearance row's one-ring exemption and the soft angle floor, after which the next chain attracted onto one of them and routed through the other would create an edge the hard `minEdge` row rejects — a mandatory chain failing for a reason §3.6 says is closed; the new test costs the same index query the lattice-point test already makes, and it subsumes that test (ruled by the kernel lane's Fable review of 27 September 2026, on GEO-35's whole-step validation; re-derived and carried by the retrovalidation's kernel seats of 27 and 28 September: the distance AB = 2 × 30 × sin 20° = 20.5 cm after the step, the next segment 18.6 cm from B) (§3.6, §3.10). |
| J-RVkernel-1 | Chose to make the pool freeze's rebuild pass build every static partition not yet rebuilt since a lazy load — under §3.9's pre-decided fallback that rebuilds each L2–L4 partition at the first query that reads it — over marking such partitions dirty at load or leaving the fallback as written, because the freeze's pass rebuilds only partitions whose grid or tombstone set is not empty and then asserts §3.10's frozen-base row by two counts per level, which a never-built partition passes with its items indexed nowhere, so a frozen copy taken before any query touched a district (a load followed at once by an epoch or a Re-derive) would hide that district's kept content — its locked plots among §3.6's candidates — from every pooled query; the clause costs the same rebuild the load would have paid and changes no output (every query result is sorted by its canonical key), while marking at load would make the load pay the bookkeeping the fallback exists to defer (retrovalidation, kernel seat, 2026-09-27; carried 2026-09-28) (§3.9, §3.3). |

=== END ===
